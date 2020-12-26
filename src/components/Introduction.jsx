import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Introduction() {
  return (
    <Container className="intro-container">
      <Row>
        <Col>
          <p className="intro-text">
            Hello! This game is very simple... a random 3-digit number will be given, and you just have to guess it!
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="intro-text-instruction">
            <p style={{fontWeight: "bold"}}>Clues will be provided for each attempt.</p>
            <p>O = Number is correct and in the correct position</p>
            <p>△ = Number is correct but in the wrong position</p>
            <p>X = Neither the number nor the position is correct</p>
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

export default Introduction;
