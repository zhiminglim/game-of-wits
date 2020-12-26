import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NumberGameIntro() {
  return (
    <Container className="intro-container">
      <Row>
        <Col>
          <div className="intro-text-instruction">
            <p style={{fontWeight: "bold"}}>Guess a random 3-digit number! Clues will be provided for each attempt.</p>
            <p>O = Number is correct and in the correct position</p>
            <p>△ = Number is correct but in the wrong position</p>
            <p>X = None of the numbers nor the positions are correct</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>Are you ready? Click on the start button to begin!</p>
        </Col>
      </Row>
    </Container>
  );
}

export default NumberGameIntro;
