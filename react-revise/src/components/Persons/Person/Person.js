import React,{ Component} from 'react';
import './Person.css';
import WithClass from '../../../hoc/WithClass';

class Person extends Component {
    render() {
        console.log('[Person.js] rendering')
        return  (
            <WithClass classes="Person">
                <p onClick={this.props.click}>I'm {this.props.name} and {this.props.age} years old. {this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </WithClass>
        
        );
    }
    
}

export default Person;