import React from 'react';
import './css.scss';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from "react-router-dom";

import Home from 'components/home/Home';
import Poll from "./components/poll/Poll";
import CreatePoll from "./components/poll/CreatePoll";

function App() {
  return (
      <Router>

        <header>
            <nav>
                <div className="branding">
                    <Link to="/">No-Polls</Link>
                </div>
                <ul>
                    <NavLinkN to="home" />
                    <NavLinkN to="create" />
                    {/*<NavLinkN to="support" />
                    <NavLinkN to="more" /> */}
                </ul>

                {/*<ul style={{marginLeft: "auto"}}>
                    <NavLinkN to="login" />
                </ul>*/}
            </nav>
        </header>

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create">
            <CreatePoll />
          </Route>
          <Route path="/:pollId">
            <Poll />
          </Route>
        </Switch>
      </Router>

  );
}

function NavLinkN(props) {
    return (

        <li>
            <NavLink exact to={props.to === "home" ? "/" : props.to} activeClassName="active">{props.to}</NavLink>
        </li>
    )
}

export default App;
