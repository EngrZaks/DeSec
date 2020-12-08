import React from "react";

// Utilities
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import distress from "./pages/Distress";
import Message from "./pages/Message";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/message" component={Message} />
          <Route path="/distress" component={distress} />
          <Route path="*" component={ErrorPage} />
          <Redirect to="404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
