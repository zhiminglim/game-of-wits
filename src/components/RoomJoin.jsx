import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function RoomJoin() {

  const [roomCode, setRoomCode] = useState("");

  function handleJoinCode() {
    console.log(roomCode.toUpperCase());
  }

  function handleInputChange(event) {
    setRoomCode(event.target.value);
  }

  return (
    <div className="room-join">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Code : </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Room Code"
          aria-label="Room Code"
          aria-describedby="basic-addon"
          onChange={handleInputChange}
          maxLength={5}
          value={roomCode.toUpperCase()}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleJoinCode}>Join</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default RoomJoin;
