import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Clock from './Clock'
import './App.css';

const Home = () => {
  return (
  <div>
    <p>This is Home</p>
  </div>
  );
}

const About = () => {
  return (
  <div>
    <p>This is About</p>
  </div>
  );
}

const Nav = () => {
  return (
    <div>
      <Link to='/'>Go Home</Link>
      <Link to='/clock'>Clock</Link>
      <Link to='/about'>About</Link>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/'>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path='/' component={ Home }></Route>
            <Route path='/clock' component={ Clock }></Route>
            <Route path='/about' component={ About }></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
