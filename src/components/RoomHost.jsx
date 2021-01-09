import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, ListGroup, ListGroupItem } from "react-bootstrap";
//import socket from "../service/socket";
import socketIOClient from "socket.io-client";
import NumberGame3D from "./NumberGame3D";

function RoomHost(props) {

  // testing for now
  const roomCode = "GREAT";
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const socket = useRef();
  let history = useHistory();


  useEffect(() => {
    console.log("init socket");
    socket.current = socketIOClient("http://localhost:4001");

    socket.current.emit("hostRoom", roomCode, props.name);
    console.log("hostRoom in progress (emit)");

    socket.current.on("updatePlayers", (data) => {
      console.log("host: updatePlayers");
      // console.log(data);
      setPlayers(data);
    });

    socket.current.on("gameIsStarting", (data) => {
      console.log(data);
      setGameStarted(true);
    })
    
    return () => {
      console.log("unmounting");
      socket.current.disconnect();
    }
  }, [props.name]);

  function handleStartButton() {
    socket.current.emit("startGame", roomCode);
  }

  function handleLeaveButton() {
    socket.current.emit("hostLeaveRoom", roomCode);
    history.goBack();
  }

  function beforeStartGame() {
    return (
      <div>
        <h3 style={{ margin: "30px auto" }}>GAME CODE: {roomCode}</h3>

        <div className="listgroup-playerlist">
          <h3>Players</h3>
          <ListGroup>
            {players.map((player, index) => {
              return (
                <ListGroupItem key={index} className="playerlist-listitem">
                  <span>{player.name}</span>
                  <Button size="sm">Remove</Button>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>

        <ButtonGroup style={{ margin: "30px" }}>
          <Button onClick={handleStartButton}>Start</Button>
          <Button onClick={handleLeaveButton}>Leave</Button>
        </ButtonGroup>
      </div>
    );
  }

  function gameInProgress() {
    return (
      <NumberGame3D />
    );
  }

  return (
    <div>
      {gameStarted ? gameInProgress() : beforeStartGame() }
    </div>
  );
}

export default RoomHost;
