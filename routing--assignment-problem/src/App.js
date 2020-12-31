import React, { Component } from 'react';
import {BrowserRouter, Route, Switch,Link, Redirect} from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Course from './containers/Course/Course';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <ul style={{listStyleType:'none'}}>
                <li style={{margin:'10px',display:'inline-block'}}>
                  <Link to="/users">Users</Link>
                </li>
                <li style={{margin:'10px',display:'inline-block'}}>
                  <Link to="/courses">Courses</Link>
                </li>
              </ul>
            </nav>
          </header>
          {/* {#2YJCUYRYJ} XP - 90 TROPHIES - 1435 armstrong TH - 8 */}
          <Switch>
            <Route path="/users"  component={Users}/>
            <Route path="/courses"  component={Courses}/>
           
            <Redirect to="/courses" from="/all-courses"/>
            <Route render={() => <h1>No such page exists</h1>}/>
          </Switch>
           
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
