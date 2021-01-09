//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

import React , { useState } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { CardDeck } from "react-bootstrap";
import GameInstruction from "./GameInstruction";
import NumberGame3D from "./NumberGame3D";
import CustomCard from "./CustomCard";
import CustomModal from "./CustomModal";
import RoomJoin from "./RoomJoin";
import RoomHost from "./RoomHost";
import SinglePlayerImg from "../assets/images/selfie.png";
import MultiPlayerImg from "../assets/images/network.png";


function NumberGame3DIntro() {

  let history = useHistory();
  let { path } = useRouteMatch();

  const [hostName, setHostName] = useState("");
  const [guestName, setGuestCode] = useState("");
  const [showHostModal, setShowHostModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  function handleSinglePlayerStart() {
    var newPath = path + "/practice";
    history.push(newPath);
  }

  const handleMultiPlayerHost = () => setShowHostModal(true);
  const handleMultiPlayerJoin = () => setShowJoinModal(true);

  const multiplayerButtons = [
    { buttonText: "HOST", name: "host", userClick: handleMultiPlayerHost },
    { buttonText: "JOIN", name: "join", userClick: handleMultiPlayerJoin },
  ];

  const singleplayerButtons = [
    { buttonText: "PRACTICE", name: "practice", userClick: handleSinglePlayerStart }
  ]

  function initPage() {
    return (
      <CardDeck className="numbergame-card-deck">
        <CustomCard
          imgSrc={SinglePlayerImg}
          cardTitle="Solo"
          cardText="Free and easy practice right here!"
          buttons={singleplayerButtons}
        />

        <CustomCard
          imgSrc={MultiPlayerImg}
          cardTitle="Group"
          cardText="Compete with friends for the fastest fingers!"
          buttons={multiplayerButtons}
        />
      </CardDeck>
    );
  }


  function handleHostNameChange(event) {
    setHostName(event.target.value);
  }

  function handleGuestNameChange(event) {
    setGuestCode(event.target.value);
  }

  function handleHostModalEnter() {
    history.push("/game-3d/host");
  }

  function handleJoinModalEnter() {
    history.push("/game-3d/join");
  }

  const handleHostModalClose = () => {
    setShowHostModal(false);
    setHostName("");
  }

  const handleJoinModalClose = () => {
    setShowJoinModal(false);
    setGuestCode("");
  }

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <GameInstruction />

          {initPage()}

          <CustomModal
            show={showHostModal}
            onHide={handleHostModalClose}
            modalTitle="What shall we call you?"
            modalFormTextLabel=""
            modalFormTextMaxLength="20"
            modalFormTextPlaceholder="Nickname"
            modalFormTextOnChange={handleHostNameChange}
            modalFormTextValue={hostName}
            modalButtonCloseOnClick={handleHostModalClose}
            modalButtonEnterOnClick={handleHostModalEnter}
          />

          <CustomModal
            show={showJoinModal}
            onHide={handleJoinModalClose}
            modalTitle="What shall we call you?"
            modalFormTextLabel=""
            modalFormTextMaxLength="20"
            modalFormTextPlaceholder="Nickname"
            modalFormTextOnChange={handleGuestNameChange}
            modalFormTextValue={guestName}
            modalButtonCloseOnClick={handleJoinModalClose}
            modalButtonEnterOnClick={handleJoinModalEnter}
          />
        </Route>

        <Route path="/game-3d/practice">
          <NumberGame3D />
        </Route>

        <Route path="/game-3d/host">
          <RoomHost 
            name={hostName}
          />
        </Route>

        <Route path="/game-3d/join">
          <RoomJoin 
            name={guestName}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default NumberGame3DIntro;
