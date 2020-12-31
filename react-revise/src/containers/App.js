import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import classes from './App.module.css';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Constructor');
  }

  state = {
    persons:[
      {id:1,name:"Karthik",age:24},
      {id:2,name:"Karthik 2", age:25},
      {id:3,name:"Karthik 3",age:26}
    ],
    showPersons:true,
    shouldCockpitShow:true
  }

  static getDerivedStateFromProps(props,state) {
    console.log('[App.js] getDerivedStateFromProps', props)
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount')
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  shouldComponentUpdate(nextProps,nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  switchNameHandler = () => {
    this.setState({
      persons:[
        {name:"Karthik E C",age:24},
        {name:"Karthik 2", age:25},
        {name:"Karthik 3",age:26}
      ]
    })
  }

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person

    this.setState({
      persons:persons
    })
  }

  togglePersonsHandler = () => {
    const currentState= this.state.showPersons;
    this.setState({
      showPersons:!currentState
    })
  }

  deletePersonHandler =(personIndex) => {
    let persons = this.state.persons;
    persons.splice(personIndex,1)
    this.setState({persons:persons})
  }

  toggleCockpit = () => {
    let currentState = this.state.shouldCockpitShow
    this.setState({shouldCockpitShow:!currentState})
  }


  render() {
    console.log('[App.js] render')
    let persons = null;
    if(this.state.showPersons) {
     
      persons = <div>
        <Persons
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          persons={this.state.persons}
        />
      </div>
    }

    

    return (
      <div className={classes.App}>
        <button onClick={this.toggleCockpit}>Toggle Cockpit</button>
        {this.state.shouldCockpitShow ?  <Cockpit
          persons={this.state.persons}
          title={this.props.title}
          clicked={this.togglePersonsHandler}
          /> : null }
       
        {persons}
       
      </div>
      
    )
  }
}

export default App;
