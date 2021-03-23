import React, { useState } from "react";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import WaypointChart from "./WaypointChart";

function OmokContainer(props) {

  const [key, setKey] = useState("sids");

  function showSpinner() {
    return (
      <div style={{ margin : "50px auto" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  function showSidsContent() {
    // TODO: currently only 1 airport supported SID so temporary using [0]
    // To cater for entire array later (maybe with carousel component)
    return (
      <div style={{ margin: "auto"}}>
        <WaypointChart
          wp={props.topSidsWp[0]}
          axisYInterval={2}
          axisYMin={10}
        />
      </div>
    );
  }

  function showStarsContent() {
    return (
      <WaypointChart 
        wp={props.topStarsWp[0]} 
        axisYInterval={1} 
        axisYMin={0} 
      />
    );
  }

  return (
    <div className="omok-tab-container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
      >
        <Tab eventKey="sids" title="SIDs">
          {props.loader ? showSpinner() : showSidsContent()}
        </Tab>
        <Tab eventKey="stars" title="STARs">
          {props.loader ? showSpinner() : showStarsContent()}
        </Tab>
      </Tabs>
    </div>
  );
}

export default OmokContainer;
