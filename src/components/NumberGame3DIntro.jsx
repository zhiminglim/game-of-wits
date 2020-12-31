import React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import CardDeck from "react-bootstrap/CardDeck";
import GameInstruction from "./GameInstruction";
import MultiplayerMode from "./MultiplayerMode";
import NumberGame3D from "./NumberGame3D";
import CustomCard from "./CustomCard";
import SinglePlayerImg from "../assets/images/selfie.png";
import MultiPlayerImg from "../assets/images/network.png";

function NumberGame3DIntro() {

  let history = useHistory();
  let { path } = useRouteMatch();

  function handleSinglePlayerStart() {
    var newPath = path + "/practice";
    history.push(newPath);
  }

  function handleMultiPlayerStart() {
    var newPath = path + "/group";
    history.push(newPath);
  }

  function displayButtons() {
    return (
      <CardDeck className="numbergame-card-deck">
        <CustomCard 
            imgSrc={SinglePlayerImg}
            cardTitle="Solo"
            cardText="Free and easy practice right here!"
            buttonText="Practice"
            onClick={handleSinglePlayerStart}
          />
          
          <CustomCard 
            imgSrc={MultiPlayerImg}
            cardTitle="Group"
            cardText="Compete with friends for the fastest fingers!"
            buttonText="Find/Create Match"
            onClick={handleMultiPlayerStart}
          />
      </CardDeck>
    );
  }

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <GameInstruction />
          {displayButtons()}
        </Route>

        <Route path="/game-3d/practice">
          <NumberGame3D />
        </Route>

        <Route path="/game-3d/group">
          <MultiplayerMode />
        </Route>
      </Switch>
    </div>
  );
}

export default NumberGame3DIntro;
