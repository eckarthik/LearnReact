import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle:null
    }
    render () {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (this.state.courseTitle!== param[1]) {
                this.setState({courseTitle: param[1]});
            }
        }
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;