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
    return (
      <div>
        {props.topSidsWp.map((element) => {
          return (
            <div style={{padding: "10px 2px"}}>
              <WaypointChart 
                wp={element} 
                axisYInterval={2} 
                axisYMin={0} 
              />
            </div>
          );
        })}
      </div>
    );
  }

  function showStarsContent() {
    return (
      <div>
        {props.topStarsWp.map((element) => {
          return (
            <div style={{padding: "10px 2px"}}>
              <WaypointChart 
                wp={element} 
                axisYInterval={1} 
                axisYMin={0} 
              />
            </div>
          );
        })}
      </div>
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
