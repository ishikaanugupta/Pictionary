import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import GameOption from "./components/game-option.component";
import GuessCanvas from "./components/guess-canvas.component";
import DrawCanvas from "./components/draw-canvas.component";

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {GameOption} />
      <Route path = "/guess" component = {GuessCanvas} />
      <Route path = "/draw" component = {DrawCanvas} />
    </Router>
  );
}

export default App;
