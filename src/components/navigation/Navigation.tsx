import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {LoginForm} from '../login/LoginForm';
import {Profile} from '../profile/Profile';
import * as React from 'react';
import {ChatWindowContainer} from '../../containers/chat/ChatWindowContainer';

export const Navigation = () => (
    <Router>
        <div className="container">
            <ul className="nav-container-list list-inline">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>

            <hr className="hr"/>

            <Route path="/"/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/messages" component={ChatWindowContainer}/>
        </div>
    </Router>
);
