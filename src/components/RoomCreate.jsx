import React from "react";
import { Button, ButtonGroup, ListGroup, ListGroupItem } from "react-bootstrap";

function RoomCreate() {
  return (
    <div>
      <h3>CODE</h3>

      <div className="listgroup-container">
        <p>Players</p>
        <ListGroup>
          <ListGroupItem>Testing 1</ListGroupItem>
          <ListGroupItem>Testing 2</ListGroupItem>
        </ListGroup>
      </div>

      <ButtonGroup>
        <Button>Start</Button>
        <Button>Exit</Button>
      </ButtonGroup>
    </div>
  );
}

export default RoomCreate;
