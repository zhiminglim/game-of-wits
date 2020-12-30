import React from "react";
import './App.css';
import Header from "./components/Header";
import NumberGame3DIntro from "./components/NumberGame3DIntro";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
      
        <Route exact path="/"><Home /></Route>
        <Route path="/game-3d"><NumberGame3DIntro /></Route>
      </div>
    </Router>
  );
}

export default App;
