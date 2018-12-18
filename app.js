import React from "react";
import Following from "./components/following";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Following} />
      <Route
        path="/topstreams"
        exact
        component={() => <div>Top Streams</div>}
      />
      <Route path="/topgames" exact component={() => <div>Top Games</div>} />
    </div>
  </Router>
);

export default App;
