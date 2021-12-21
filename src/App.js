import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/trybe-trybewallet-project/" component={ Login } />
      <Route exact path="/trybe-trybewallet-project/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
