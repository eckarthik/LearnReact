import React, { Component } from 'react';
//import axios from 'axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route,NavLink,Switch,Redirect} from 'react-router-dom';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {

    state = {
        auth:true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact activeClassName="my-active" activeStyle={{color:'#FA923F',textDecoration:'underline'}}>Posts</NavLink></li>
                            <li><NavLink to="/new-post" exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <Posts/>}/> exact is used for finding the exact match for the given path */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null }
                    <Route path="/posts" component={Posts}/>
                    {/* <Redirect from="/" to="/posts"/> */}
                    <Route render={() => <h1>Not found</h1>}/>
                </Switch>
               
            </div>
        );
    }
}

export default Blog;