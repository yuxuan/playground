import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Clock from './Clock'
import Counter from './Counter'
import Todo from './todo/app'
import VanillaJS from './vanillaJS'
import SetState from './SetState'
import Github from './github/main'
import Css from './Css'
import './App.css';

const Home = () => {
  return (
  <div>
    <p>This is Home</p>
  </div>
  );
}

const Nav = () => {
  return (
    <div>
      <Link to='/'>Go Home</Link>
      <Link to='/clock'>Clock</Link>
      <Link to='/counter'>Counter</Link>
      <Link to='/todo'>Todo</Link>
      <Link to='/vanillajs'>VanillaJS</Link>
      <Link to='/setState'>SetState</Link>
      <Link to='/github'>Github</Link>
      <Link to='/css'>LearnCss</Link>
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
            <Route path='/counter' component={ Counter }></Route>
            <Route path='/todo' component={ Todo }></Route>
            <Route path='/vanillajs' component={ VanillaJS }></Route>
            <Route path='/setstate' component={ SetState }></Route>
            <Route path='/github' component={ Github }></Route>
            <Route path='/css' component={ Css }></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
