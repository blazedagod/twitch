import React from "react";
import Following from "./components/following.jsx";
import TopStreams from "./components/topstreams";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopGames from "./components/topgames";

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Following} />
      <Route path="/topstreams" exact component={TopStreams} />
      <Route path="/topgames" exact component={TopGames} />
    </div>
  </Router>
);

export default App;
