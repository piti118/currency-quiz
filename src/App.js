import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import CurrencyQuiz from './components/CurrencyQuiz';
import CurrencyConverter from './components/CurrencyConverter';

function TopBar() {
  return (
    <div className="topbar-container">
      <NavLink exact to="/" activeClassName="topbar-active">Home</NavLink>
      <NavLink exact to="/quiz" activeClassName="topbar-active">Quiz</NavLink>
      <NavLink exact to="/converter" activeClassName="topbar-active">Converter</NavLink>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <TopBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/quiz" component={CurrencyQuiz} />
          <Route exact path="/converter" component={CurrencyConverter} />
        </div>
      </Router>
    );
  }
}

export default App;
