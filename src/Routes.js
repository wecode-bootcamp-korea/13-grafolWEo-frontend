import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Wallpaper from './Pages/Wallpaper/Wallpaper';
import WorksList from './Pages/WorksList/WorksList';
import DetailPages from './Pages/DetailPages/DetailPages';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Wallpaper" component={Wallpaper} />
          <Route exact path="/WorksList" component={WorksList} />
          <Route exact path="/DetailPages" component={DetailPages} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
