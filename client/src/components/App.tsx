import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import CreatePage from "./CreatePage";
import ReceivedPage from "./ReceivedPage";
import SentPage from "./SentPage";
import HomePage from "./HomePage";
import { initWeb3 } from "../services/web3Service";
import { useDispatch } from "react-redux";
import { getTokens } from "../services/tokenService";
import { setTokens } from "../state/tokenSlice";

const App = () => {
  const dispatch = useDispatch();

  const init = async () => {
    const tokens = await getTokens();
    dispatch(setTokens(tokens));
  };

  useEffect(() => {
    initWeb3();
    init();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/sent">
          <SentPage />
        </Route>
        <Route path="/received">
          <ReceivedPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
