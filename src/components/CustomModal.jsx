import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function CustomModal(props) {

  return (
    <Modal
      animation={false}
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      centered
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>{props.modalFormTextLabel}</Form.Label>
          <Form.Control
            type="text"
            onChange={props.modalFormTextOnChange}
            value={props.modalFormTextValue}
            placeholder={props.modalFormTextPlaceholder}
            maxLength={props.modalFormTextMaxLength}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.modalButtonCloseOnClick}>
          Close
        </Button>
        <Button variant="primary" onClick={props.modalButtonEnterOnClick}>Ok, go!</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
