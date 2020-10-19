import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
// import Login from "./Pages/Login/Login";
// import SignUp from "./Pages/SignUp";
// import Feeds from "./Pages/Feeds";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          {/* <Route exact path="/Login" component={Login} /> */}
          {/* <Route exact path="/SignUp" component={SignUp} /> */}
          {/* <Route exact path="/Feeds" component={Feeds} /> */}
        </Switch>
      </Router>
    );
  }
}
export default Routes;
