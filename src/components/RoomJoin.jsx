import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import NumberGame3D from "./NumberGame3D";
import socketIOClient from "socket.io-client";


function RoomJoin(props) {

  const [roomCode, setRoomCode] = useState("");
  const [roomFound, setRoomFound] = useState(false);

  const [players, setPlayers] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const socket = useRef();
  let history = useHistory();


  useEffect(() => {
    socket.current = socketIOClient(process.env.REACT_APP_SERVER_URL);
    
    socket.current.on("updatePlayers", (code, list) => {
      setPlayers(list);
    });

    socket.current.on("gameIsStarting", (data) => {
      setGameStarted(true);
    })

    socket.current.on("updateRankings", (data) => {
      setRankings(data);
    })

    socket.current.on("kickedFromRoom", () => {
      history.goBack();
    })

    return () => {
      console.log("unmounting");
      socket.current.disconnect();
    };
  }, [history]);


  function handleCodeEnter() {
    socket.current.emit("findAndJoinRoom", roomCode, props.name, (response) => {
      //console.log("client: findRoom " + response.status);
      if (response.status === "ok") {
        setRoomFound(true);
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
      <div style={{ marginTop: "10%" }}>
        <h2>Hi {props.name}, enter your friend's game code below:</h2>
        <InputGroup className="inputgroup-formcontrol">
          <FormControl
            placeholder="Room Code"
            aria-label="Room Code"
            aria-describedby="basic-addon"
            onChange={handleInputChange}
            maxLength={5}
            value={roomCode.toUpperCase()}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleCodeEnter}>
              Enter
            </Button>
          </InputGroup.Append>
        </InputGroup> 
      </div>
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

  function initRoom() {
    return (
      <div>
        { roomFound ? showLobby() : requestRoomCode() }
      </div>
    );
  }

  function initGame() {
    return (
      <div>
        <div className="ranking-container">
          <h2>Rankings</h2>
          <ListGroup>
            {rankings.map((player, index) => {
              return (
                <ListGroupItem key={index} className="playerlist-listitem">
                  <span>{index + 1} : </span>
                  <span>{player.name}</span>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
        <NumberGame3D
          socket={socket.current}
          multiplayer={true}
          roomCode={roomCode}
        />
      </div>
    );
  }

  return (
    <div>
      { gameStarted ? initGame() : initRoom() }
    </div>
  );
}

export default RoomJoin;
