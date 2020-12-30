import React , { useState } from "react";
import Button from "react-bootstrap/Button";
import GameInstruction from "./GameInstruction";
import MultiplayerMode from "./MultiplayerMode";
import NumberGame3D from "./NumberGame3D";

function NumberGame3DIntro() {

  // 1 for singleplayer, 2 for multiplayer
  const [modeType, setModeType] = useState(0);

  function handleSinglePlayerStart() {
    setModeType(1);
  }

  function handleMultiPlayerStart() {
    setModeType(2);
  }

  function displayButtons() {
    return (
      <div>
        <Button size="md" variant="primary" onClick={handleMultiPlayerStart}>
          Play with Friends
        </Button>
        <Button size="md" variant="primary" onClick={handleSinglePlayerStart}>
          Play Solo
        </Button>
      </div>
    );
  }

  function displaySinglePlayer() {
    return (
      <NumberGame3D />
    );
  }

  function displayMultiPlayer() {
    return (
      <MultiplayerMode />
    );
  }

  return (
    <div>
      <GameInstruction />
      
      { (modeType === 0) && displayButtons() }
      { (modeType === 1) && displaySinglePlayer() }
      { (modeType === 2) && displayMultiPlayer() }
    </div>
  );
}

export default NumberGame3DIntro;
