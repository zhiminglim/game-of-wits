import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GameInstruction() {
  return (
    <Container className="game-intro-container">
      <Row>
        <Col>
          <div className="intro-text-instruction">
            <p style={{ fontWeight: "bold" }}>
              Guess a random 3-digit number! Clues will be provided for each
              attempt.
            </p>
            <p>O = Number is correct and in the correct position</p>
            <p>△ = Number is correct but in the wrong position</p>
            <p>X = None of the numbers nor the positions are correct</p>

            <br/>
            <p style={{ fontSize: "0.9rem" }}>
              Example: if the hidden number is 123 and you guessed 139, 
              the clue given will be 1O, 1△ because digit 1 is in the 
              correct place and digit 2 is in the wrong place. 
              X will only be given if all 3 digits are wrong.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameInstruction;
