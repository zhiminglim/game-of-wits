import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import NumberGame from "./components/NumberGame";

function App() {

  return (
    <div className="App">
      <Header />
      <Introduction />
      <NumberGame />

    </div>
  );
}

export default App;
