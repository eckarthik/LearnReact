import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    persons:[
      {username:"Karthik",age:21},
      {username:"Karthik2",age:22}
    ]
  }

  usernameChangeHandler = (event,pos) => {
    if(pos==0) {
      this.setState({
        persons:[
          {username:event.target.value,age:21},
          {username:"Karthik2",age:22}
        ]
    });
  }
    else {
      this.setState({
        persons:[
          {username:"Karthik",age:21},
          {username:event.target.value,age:22}
        ]
      })
    }
  }


  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
          <UserOutput name={this.state.persons[0].username} age={this.state.persons[0].age}/>
          <UserInput name={this.state.persons[0].username} changed={(event) => this.usernameChangeHandler(0)}/>
          <UserOutput name={this.state.persons[1].username} age={this.state.persons[1].age}/>
          <UserInput name={this.state.persons[1].username} changed={(event) => this.usernameChangeHandler(1)}/>
      </div>
    )
  }
}

export default App;
