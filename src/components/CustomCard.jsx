import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

  function CustomCard(props) {
    return (
      <Card>
        <Card.Img src={props.imgSrc} />
        <Card.Body>
          <Card.Title>{props.cardTitle}</Card.Title>
          <Card.Text>{props.cardText}</Card.Text>
          <Button variant="info" onClick={props.onClick}>{props.buttonText}</Button>
        </Card.Body>
      </Card>
    );
  }

  export default CustomCard;