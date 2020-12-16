import React, {useState} from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import digitsArr from "./digits";

function App() {

  const correctNumCorrectPosInd = "O", correctNumWrongPosInd = "△", wrongPosWrongNumInd = "X";
  var [circleCount, setCircleCount] = useState(0);
  var [triangleCount, setTriangleCount] = useState(0);

  var [clicksRemaining, setClicksRemaining] = useState(3);
  var [luckyNum, setLuckyNum] = useState("");
  const [userNum, setUserNum] = useState([]);
  const [clues, setClues] = useState([]);
  var [digits, setDigits] = useState(digitsArr);

  // Fisher-Yates Shuffle is said to be more efficient as it avoids the use of expensive array operations.
  // But for the purpose of this simple program of just 9 digits, i think its alright to stick with splice()
  function handleStartButtonClick() {
    const maxIteration = 3;
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9], finalNumber = "", randomIndex;

    for (var i = 0; i < maxIteration; i++) {
      randomIndex = Math.floor(Math.random() * array.length);
      finalNumber += array[randomIndex];
      array.splice(randomIndex, 1);
    }
    setLuckyNum(finalNumber);
  }

  function handleResetButtonClick() {
    setLuckyNum("");
  }

  function handleNumberButtonClick(event) {

    const buttonValue = event.target.value;
    var tempArr = userNum;
    tempArr.push(buttonValue);
    setUserNum(tempArr);
    //console.log(userNum);

    clicksRemaining -= 1;
    setClicksRemaining(clicksRemaining);
    if (clicksRemaining === 0) {
      // Compare user input with the randomly generated number
      for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
          if (luckyNum.charAt(i) === userNum[j]) {
            if (i === j) {
              console.log("There is a correct number and correct position match!");
              circleCount++;
              setCircleCount(circleCount);

              break;
            } else {
              console.log("There is a correct number and wrong position match!");
              triangleCount++;
              setTriangleCount(triangleCount);
              break;
            }
          }
        }
      }

      console.log("circles = " + circleCount + " triangles = " + triangleCount);
    }


    var tempArr = digits.map(function(element) {
      if (element.value === buttonValue) {
        element.isDisabled = true;
      }
      return element;
    });

    console.log(tempArr);
    setDigits(tempArr);
  }

  return (
    <div className="App">
      <Header />
      <Introduction />
      <ButtonGroup aria-label="Basic example">
        <Button size="lg" variant="primary" onClick={handleStartButtonClick}>Start</Button>
        <Button size="lg" variant="warning" onClick={handleResetButtonClick}>Reset</Button>
      </ButtonGroup>

      <br />
      
      <div className="numberbox-container">
        <ToggleButtonGroup type="checkbox">
          {digits.map(function(element) {
            return <ToggleButton
            variant={element.variant}
            disabled={element.isDisabled}
            value={element.value}
            onChange={handleNumberButtonClick}
          >
            {element.value}
          </ToggleButton>
          })}
        </ToggleButtonGroup>
      </div>

      <p>Your input is... {}</p>
      <p>Random number is... {luckyNum}</p>

    </div>
  );
}

export default App;
