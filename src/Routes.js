import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import List from "./Pages/List/List";
import Wallpaper from "./Pages/Wallpaper/Wallpaper";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/List" component={List} />
          <Route exact path="/Wallpaper" component={Wallpaper} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
