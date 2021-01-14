import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, ListGroup, ListGroupItem } from "react-bootstrap";
//import socket from "../service/socket";
import socketIOClient from "socket.io-client";
import NumberGame3D from "./NumberGame3D";

function RoomHost(props) {

  const roomCode = "GREAT";
  const [players, setPlayers] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const socket = useRef();
  let history = useHistory();


  useEffect(() => {
    console.log("init socket");
    socket.current = socketIOClient();

    socket.current.emit("hostRoom", roomCode, props.name);
    console.log("hostRoom in progress (emit)");

    socket.current.on("updatePlayers", (data) => {
      console.log("host: updatePlayers");
      setPlayers(data);
    });

    socket.current.on("gameIsStarting", (data) => {
      console.log(data);
      setGameStarted(true);
    });

    socket.current.on("updateRankings", (data) => {
      setRankings(data);
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
      <div>
        <div className="ranking-container">
          <h2>Rankings</h2>
          <ListGroup>
            {rankings.map((player, index) => {
              return (
                <ListGroupItem key={index} className="playerlist-listitem">
                  <span>{index+1} : </span>
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
      {gameStarted ? gameInProgress() : beforeStartGame() }
    </div>
  );
}

export default RoomHost;