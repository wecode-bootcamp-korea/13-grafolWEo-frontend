import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Main from "./Pages/Main/Main";
import Navbar from "./Components/Navbar/Navbar";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route
            exact
            path="*"
            component={() => (
              <>
                <Navbar />
                <Route exact path="/" component={Main} />
              </>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
