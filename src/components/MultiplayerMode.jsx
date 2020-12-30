import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import RoomJoin from "./RoomJoin";
import RoomCreate from "./RoomCreate";


function MultiplayerMode() {
  const [userChoice, setUserChoice] = useState("");

  function displayRoomOptions() {
    return (
      <div>
        <Button size="md" variant="primary" onClick={handleCreateRoom}>
          Create Room
        </Button>

        <Button size="md" variant="primary" onClick={handleJoinRoom}>
          Join Room
        </Button>
      </div>
    );
  }

  function handleCreateRoom() {
    setUserChoice("create");
  }

  function handleJoinRoom() {
    setUserChoice("join");
  }

  function displayRoomJoin() {
    return <RoomJoin />;
  }

  function displayRoomCreate() {
    return <RoomCreate />;
  }

  return (
    <div>
      {userChoice === "" && displayRoomOptions()}
      {userChoice === "join" && displayRoomJoin()}
      {userChoice === "create" && displayRoomCreate()}
    </div>
  );
}

export default MultiplayerMode;
