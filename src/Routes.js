import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
// import Main from "./Pages/Main/Main";
import DetailPages from "./Components/DetailPages/DetailPages";
// import Login from "./Pages/Login/Login";
// import SignUp from "./Pages/SignUp";
// import Feeds from "./Pages/Feeds";
=======
import Main from "./Pages/Main/Main";
import Wallpaper from "./Pages/Wallpaper/Wallpaper";
import WorksList from "./Pages/WorksList/WorksList";
>>>>>>> 3c980989d13283fe326b92dad7175be50eab1fa8

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
<<<<<<< HEAD
          {/* <Route exact path="/" component={Main} /> */}
          <Route exact path="/" component={DetailPages}/>
          {/* <Route exact path="/Login" component={Login} /> */}
          {/* <Route exact path="/SignUp" component={SignUp} /> */}
          {/* <Route exact path="/Feeds" component={Feeds} /> */}
=======
          <Route exact path="/" component={Main} />
          <Route exact path="/Wallpaper" component={Wallpaper} />
          <Route exact path="/WorksList" component={WorksList} />
>>>>>>> 3c980989d13283fe326b92dad7175be50eab1fa8
        </Switch>
      </Router>
    );
  }
}
export default Routes;
