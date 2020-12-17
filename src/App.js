import React, {useState} from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import digitsList from "./digits";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function App() {

  const correctNumCorrectPosInd = "O", correctNumWrongPosInd = "△", wrongPosWrongNumInd = "X";
  var [circleCount, setCircleCount] = useState(0);
  var [triangleCount, setTriangleCount] = useState(0);

  var [clicksRemaining, setClicksRemaining] = useState(3);
  var [luckyNum, setLuckyNum] = useState("");
  var [currUserInput, setCurrUserInput] = useState("");
  const [userInputList, setUserInputList] = useState([]);
  const [clues, setClues] = useState([]);
  const [digits, setDigits] = useState(digitsList);
  const [winGame, setWinGame] = useState(false);


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
    setDigits(prevValue => {
      return prevValue.map(element => {
        element.isDisabled = false;
        return element;
      })
    });
  }

  function handleResetGame() {
    setLuckyNum("");
    setUserInputList([]);
    setDigits(prevValue => {
      return prevValue.map(element => {
        element.isDisabled = true;
        return element;
      })
    });
  }

  function prepareNextMove() {
    setCurrUserInput("");
    setClicksRemaining(3);
    setDigits(prev => {
      return prev.map(element => {
        element.isDisabled = false;
        return element;
      })
    });
  }


  function handleNumberButtonClick(event) {

    // 1.1 Save User Input
    const buttonValue = event.target.value;
    currUserInput += buttonValue;
    setCurrUserInput(currUserInput);


    // 1.2 Update and save button state
    setDigits(prev => {
      return prev.map(element => {
        if (element.value === buttonValue) {
          element.isDisabled = true;
        }
        return element;
      })
    })


    // 2.0 Keep track of clicks remaining
    clicksRemaining -= 1;
    setClicksRemaining(clicksRemaining);


    // 2.1 If max clicks reached, compare user input with lucky number
    if (clicksRemaining === 0) {
      var tempList = userInputList;
      tempList.push(currUserInput);
      setUserInputList(tempList);

      // Compare user input with the randomly generated number
      for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
          if (luckyNum.charAt(i) === currUserInput.charAt(j)) {
            if (i === j) {
              circleCount++;
              setCircleCount(circleCount);

              break;
            } else {
              triangleCount++;
              setTriangleCount(triangleCount);
              break;
            }
          }
        }
      }

      // 3.0 Update clues for user
      var currentClue;
      if (circleCount === 0 && triangleCount === 0) {
        currentClue = wrongPosWrongNumInd;
      } else {
        currentClue = circleCount + " " + correctNumCorrectPosInd + ", " + triangleCount + " " + correctNumWrongPosInd;
      }
      const clueArr = clues;
      clueArr.push(currentClue);
      setClues(clueArr);

      if (circleCount === 3) {
        prepareWinGame();
      } else {
        setCircleCount(0);
        setTriangleCount(0);
        prepareNextMove();
      }

    }

  }

  function prepareWinGame() {
    setWinGame(true);
    setDigits(prevValue => {
      return prevValue.map(element => {
        element.isDisabled = true;
        return element;
      })
    });
  }

  function createNumberButton(digit) {
    return (
      <NumberButton
        key={digit.id}
        disabled={digit.isDisabled}
        variant={digit.variant}
        value={digit.value}
      />
    );
  }

  // TODO: Can refactor to an individual jsx file
  function NumberButton(props) {
    return (
      <Button value={props.value} variant={props.variant} disabled={props.disabled} onClick={handleNumberButtonClick}>
        {props.value}
      </Button>
    );
  }

  return (
    <div className="App">
      <Header />
      <Introduction />
      <ButtonGroup aria-label="Basic example">
        <Button size="lg" variant="primary" onClick={handleStartButtonClick}>Start</Button>
        <Button size="lg" variant="warning" onClick={handleResetGame}>Reset</Button>
      </ButtonGroup>

      <br />
      <p>Random number is... {luckyNum}</p>
      

      <div className="numberbox-container">
          {digits.map(createNumberButton)}
      </div>

      

      <h2>History: </h2>
      <div className="history-container">
        <ListGroup>
          {userInputList.map(input => {
            return (
              <ListGroupItem>{input}</ListGroupItem>
            );
          })}
        </ListGroup>
        
      </div>

      <div>
      <ListGroup>
          {clues.map(clue => {
            return (
              <ListGroupItem>{clue}</ListGroupItem>
            );
          })}
        </ListGroup>
      </div>

      <div>
        {winGame && <p>Congratulations! You have cleared the game!</p>}
      </div>

    </div>
  );
}

export default App;
