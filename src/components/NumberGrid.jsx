import React from "react";
import NumberButton from "./NumberButton";

function NumberGrid(props) {
  return (
    <div className="numberbox-container">
      {props.listOfDigits.map((digit) => {
        return (
          <NumberButton
            key={digit.id}
            disabled={digit.isDisabled}
            variant={digit.variant}
            value={digit.value}
            onClick={props.onNumberGridClick}
          />
        );
      })}
    </div>
  );
}

export default NumberGrid;
