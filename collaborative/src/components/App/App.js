import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import RegisterLoginPage from "../RegisterLoginPage/RegisterLoginPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route
          path={["/login", "/registration"]}
          exact
          component={RegisterLoginPage}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
