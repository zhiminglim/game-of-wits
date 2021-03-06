import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import NumberGame3D from "./NumberGame3D";

function RoomHost(props) {

  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = useRef();
  let history = useHistory();
  let socketURL;

  if (process.env.NODE_ENV === "development") {
    socketURL = "http://localhost:3001";
  } else {
    socketURL = process.env.REACT_APP_SERVER_URL;
  }

  useEffect(() => {
    socket.current = socketIOClient(socketURL);
    socket.current.emit("hostRoom", props.name);

    socket.current.on("updatePlayers", (code, list) => {
      setRoomCode(code);
      setPlayers(list);
      setLoading(false);
    });

    socket.current.on("gameIsStarting", (data) => {
      setGameStarted(true);
    });

    socket.current.on("updateRankings", (data) => {
      setRankings(data);
    })
    
    return () => {
      // console.log("unmounting");
      socket.current.disconnect();
    }
  }, [props.name, socketURL]);


  function handleStartButton() {
    socket.current.emit("startGame", roomCode);
  }

  function handleLeaveButton() {
    socket.current.emit("hostLeaveRoom", roomCode);
    history.goBack();
  }

  function isLoadingData() {
    return (
      <div style={{ "margin": "50px auto"}}>
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      </div>
    );
  }

  function loadPreGameComponent() {
    return (
      <div>
        {loading ? isLoadingData() : preGameComponent() }
      </div>
    );
  }

  function preGameComponent() {
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
      {gameStarted ? gameInProgress() : loadPreGameComponent() }
    </div>
  );
}

export default RoomHost;
