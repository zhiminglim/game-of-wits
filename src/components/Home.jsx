import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import numberImg from "../assets/images/game-card-img-3d.png";
import { useHistory } from "react-router-dom";

function GameSelect() {

  let history = useHistory();

  function play3D() {
    history.push("/game-3d");
  }

  return (
    <div className="gameselect-container">
      <p className="intro-text">
        Here to kill some time? Try some fun number games!
      </p>
      
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={numberImg} style={{padding: "0% 10%"}} />
        <Card.Body>
          <Card.Title>3D</Card.Title>
          <Card.Text>
            Braindance! Use the clues to guess a 3 digit number. Do you have
            What It Takes?
          </Card.Text>
          <Button variant="dark" onClick={play3D}>Play</Button>
        </Card.Body>
      </Card>

    </div>
  );
}

//<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default GameSelect;
