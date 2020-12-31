import React, { Component } from 'react';
// import axios from 'axios';
import Posts from './Posts/Posts';
import {Route,NavLink,Switch,Redirect} from 'react-router-dom';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    render () {
        return (
            <div>
                <div className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path="/new-post" component={NewPost}/>
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not Found</h1>}/>
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;