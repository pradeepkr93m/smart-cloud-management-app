import React from "react";
import Login from "./components/login";
import Devices from "./components/devices";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/devices" component={Devices} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
