import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

function WaypointChart(props) {
  //var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const eachWaypoint = () => {
    return props.wp.topWaypoints.map((waypoint) => {
      return {
        label: waypoint.name,
        y: waypoint.count
      };
    });
  };

  const options = {
    title: {
      text: "Top Waypoints for " + props.wp.airport,
    },
    data: [
      {
        type: "column",
        dataPoints: eachWaypoint(),
      },
    ],
    axisY:{
      interval: props.axisYInterval,
      minimum: props.axisYMin
    },
  };


  return (
    <CanvasJSChart options={options} />
  );
}

export default WaypointChart;
