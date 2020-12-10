import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from './Home';
import { Login } from './Login';



function App(props) {
 

  return (
    
    <Router>
      <Switch>
       
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Login />
        </Route>

      </Switch>
    </Router>
    
  );
}

export default App;
