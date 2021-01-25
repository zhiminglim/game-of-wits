import React, { useEffect, useRef, useState } from "react";
import { ListGroup, ListGroupItem, ProgressBar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import digitsList from "../digits";
import NumberGrid from "./NumberGrid";

function NumberGame3D(props) {
  const correctNumCorrectPosInd = "O",
        correctNumWrongPosInd = "△",
        wrongPosWrongNumInd = "X";
  var [circleCount, setCircleCount] = useState(0);
  var [triangleCount, setTriangleCount] = useState(0);

  var [clicksRemaining, setClicksRemaining] = useState(3);
  var [luckyNum, setLuckyNum] = useState("");
  var [currUserInput, setCurrUserInput] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [digits, setDigits] = useState(digitsList);
  const [winGame, setWinGame] = useState(false);
  const [startButton, setStartButton] = useState(true);
  
  // Timer
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [progress, setProgress] = useState(100);

  // Multiplayer
  const isMultiplayer = useRef(props.multiplayer);
  const socket = useRef(props.socket);


  useEffect(() => {
    if (isMultiplayer.current) {
      // Automatically start number grid
      handleStartButtonClick();
    }

  }, []);

  useEffect(() => {
    let intervalId;
    if (timerIsActive) {
      intervalId = setInterval(() => setProgress(progress-20), 1000);

      if (progress < 0) {
        // Reset timer when progress reaches zero
        setProgress(100);

        // Add to moves history
        var tempList = historyList;
        tempList.push("Skipped.");
        setHistoryList(tempList);
      }
    };
    
    return () => clearInterval(intervalId);

  }, [timerIsActive, progress]);


  // Fisher-Yates Shuffle is said to be more efficient as it avoids the use of expensive array operations.
  // But for the purpose of this simple program of just 9 digits, i think its alright to stick with splice()
  function handleStartButtonClick() {
    const maxIteration = 3;
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      finalNumber = "",
      randomIndex;

    for (var i = 0; i < maxIteration; i++) {
      randomIndex = Math.floor(Math.random() * array.length);
      finalNumber += array[randomIndex];
      array.splice(randomIndex, 1);
    }

    setLuckyNum(finalNumber);
    setDigits((prevValue) => {
      return prevValue.map((element) => {
        element.isDisabled = false;
        return element;
      });
    });

    setStartButton(false);
    setTimerIsActive(true);
  }

  function handleResetGame() {
    setLuckyNum("");
    setClicksRemaining(3);
    setCurrUserInput("");
    setHistoryList([]);
    setCircleCount(0);
    setTriangleCount(0);
    setWinGame(false);
    setDigits(prevValue => {
      return prevValue.map(element => {
        element.isDisabled = true;
        return element;
      })
    });
    setStartButton(true);

    // Handle Timer
    setTimerIsActive(false);
    setProgress(100);
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

    // 3.0 If max clicks reached, compare user input with lucky number
    if (clicksRemaining === 0) {

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

      // 3.1 Update clues for user
      var currentClue;
      if (circleCount === 0 && triangleCount === 0) {
        currentClue = wrongPosWrongNumInd;
      } else {
        currentClue = circleCount + " " + correctNumCorrectPosInd + ", " + triangleCount + " " + correctNumWrongPosInd;
      }

      // 3.2 Update History List for user
      var tempList = historyList;
      const historyAndClueString = currUserInput + " : " + currentClue;
      tempList.push(historyAndClueString);
      setHistoryList(tempList);

      // 3.3 Check Win Conditions
      if (circleCount === 3) {
        prepareWinGame();
      } else {
        setCircleCount(0);
        setTriangleCount(0);
        prepareNextMove();
      }

      // 3.4 Reset Timer
      setProgress(100);
    }

  }

  function prepareWinGame() {
    setTimerIsActive(false);
    setWinGame(true);
    setDigits(prevValue => {
      return prevValue.map(element => {
        element.isDisabled = true;
        return element;
      })
    });
    if (isMultiplayer.current) {
      socket.current.emit("playerWon", props.roomCode);
    }
  }

  function showStartButton() {
    return (
      <Button size="lg" variant="primary" onClick={handleStartButtonClick}>
        Start
      </Button>
    );
  }

  function showResetButton() {
    return (
      <Button size="lg" variant="warning" onClick={handleResetGame}>
        Reset
      </Button>
    );
  }

  function singlePlayerEntry() {
    return (
      <div>
        <ButtonGroup aria-label="Basic example">
          {startButton ? showStartButton() : showResetButton()}
        </ButtonGroup>
        <br />
        <br />
      </div>
    );
  }

  return (
    <div className="numbergame-container">
    
      { !isMultiplayer.current && singlePlayerEntry() }

      <h2>History: </h2>
      <div className="history-container">
        <ListGroup>
          {historyList.map((input, index) => {
            return <ListGroupItem key={index}>{input}</ListGroupItem>;
          })}
        </ListGroup>
      </div>

      <div className="numberbox-main-container">
        <NumberGrid
          listOfDigits={digits}
          onNumberGridClick={handleNumberButtonClick}
        />
        <ProgressBar now={progress}/>
      </div>

      <div>{winGame && <h3>You Won!</h3>}</div>
    </div>
  );
}

export default NumberGame3D;
