import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NumberBox() {

  function handleClick() {
    console.log()
  }

  return (
    <Container>
      <Row>
        <Col>
          <ButtonGroup size="lg" className="mr-2" aria-label="First group">
            <Button variant="outline-dark" onClick="handleClick">1</Button>
            <Button variant="outline-dark">2</Button>
            <Button variant="outline-dark">3</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <ButtonGroup size="lg" className="mr-2" aria-label="Second group">
            <Button variant="outline-dark">4</Button>
            <Button variant="outline-dark">5</Button>
            <Button variant="outline-dark">6</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <ButtonGroup size="lg" className="mr-2" aria-label="Third group">
            <Button variant="outline-dark">7</Button>
            <Button variant="outline-dark">8</Button>
            <Button variant="outline-dark">9</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default NumberBox;
