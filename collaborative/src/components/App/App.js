import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={LandingPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;
