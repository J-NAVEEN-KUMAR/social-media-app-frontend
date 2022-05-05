import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
