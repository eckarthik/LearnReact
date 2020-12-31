import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    // static getDerivedStateFromProps(state,props) {
    //     console.log('[Persons.js] getDerivedStateFromProps',props);
    // }

    // shouldComponentUpdate(nextProps,nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate')
    //     if (nextProps.persons !== this.props.persons) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps,prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate')
        console.log(snapshot)
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount')
    }

    render() {
        console.log('[Persons.js] rendering')
        return (
            this.props.persons.map((person,index) => {
                return <Person
                    name = {person.name}
                    click = {() => this.props.clicked(index)}
                    age = {person.age}
                    key = {person.id}
                    changed = {(event) => this.props.changed(event,person.id)}
                  />
            })
        );
    }

}

export default Persons;