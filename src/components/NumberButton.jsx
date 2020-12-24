import React from "react";
import Button from 'react-bootstrap/Button';

function NumberButton(props) {
    return (
        <div className="numberbox-digit">
            <Button
                value={props.value}
                variant={props.variant}
                disabled={props.disabled}
                onClick={props.onClick}>
                {props.value}
            </Button>
        </div>

    );
}

export default NumberButton;