import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

  function CustomCard(props) {

    // For customization of buttons within the card as some cards may have more than 1 button.
    const buttons = props.buttons;
    const listButtons = buttons.map((button, index) => {
      return (
        <Button
          key={index}
          className="card-button"
          variant="primary"
          onClick={button.userClick}
          name={button.name}
        >
          {button.buttonText}
        </Button>
      );
    })

    return (
      <Card>
        <Card.Img src={props.imgSrc} />
        <Card.Body>
          <Card.Title>{props.cardTitle}</Card.Title>
          <Card.Text>{props.cardText}</Card.Text>
          {listButtons}
        </Card.Body>
      </Card>
    );
  }

  export default CustomCard;