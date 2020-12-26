import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import NumberGame3D from "./components/NumberGame";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
      
        <Route exact path="/"><Home /></Route>
        <Route path="/game-3d"><NumberGame3D /></Route>
      </div>
    </Router>
  );
}

export default App;
