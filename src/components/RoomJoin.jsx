import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
//import socket from "../service/socket";
import socketIOClient from "socket.io-client";


function RoomJoin(props) {

  const [roomCode, setRoomCode] = useState("");
  const [roomFound, setRoomFound] = useState(false);
  const [players, setPlayers] = useState([]);
  const socket = useRef();

  let history = useHistory();

  useEffect(() => {
    console.log("init socket");
    socket.current = socketIOClient("http://localhost:4001");
    
    socket.current.on("updatePlayers", (data) => {
      console.log("updatePlayers listening");
      setPlayers(data);
    });

    return () => {
      console.log("unmounting");
      socket.current.disconnect();
    };
  }, []);

  function handleCodeEnter() {
    socket.current.emit("findRoom", roomCode, (response) => {
      console.log("client: findRoom " + response.status); // ok
      if (response.status === "ok") {
        setRoomFound(true);
        socket.current.emit("joinRoom", roomCode, props.name);
      }
    });
  }

  function handleInputChange(event) {
    setRoomCode(event.target.value.toUpperCase());
  }

  function handleLeaveButton() {
    socket.current.emit("guestLeaveRoom", roomCode);
    history.goBack();
  }

  function requestRoomCode() {
    return (
      <InputGroup className="inputgroup-formcontrol">
        <h2>Hi {props.name}, enter your friend's game code below:</h2>
        <FormControl
          placeholder="Room Code"
          aria-label="Room Code"
          aria-describedby="basic-addon"
          onChange={handleInputChange}
          maxLength={5}
          value={roomCode.toUpperCase()}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleCodeEnter}>Enter</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  function showLobby() {
    return (
      <div className="listgroup-playerlist">
        <h3 style={{ margin: "30px auto" }}>
          GAME CODE: {roomCode.toUpperCase()}
        </h3>
        <h3>Players</h3>
        <ListGroup>
          {players.map((player, index) => {
            return (
              <ListGroupItem key={index} className="playerlist-listitem">
                <span>{player.name}</span>
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <Button style={{ margin: "30px" }} onClick={handleLeaveButton}>
          Leave
        </Button>
      </div>
    );
  }

  return (
    <div>
      { roomFound ? showLobby() : requestRoomCode() }
    </div>
  );
}

export default RoomJoin;
