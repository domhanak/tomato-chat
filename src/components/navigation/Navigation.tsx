import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import * as React from 'react';
import {ChatWindowContainer} from '../../containers/chat/ChatWindowContainer';
import {ProfileContainer} from '../../containers/user/ProfileContainer';

export const Navigation = () => (
    <Router>
        <div className="container app-container">
            <ul className="nav-container-list list-inline">
                <li>
                    <Link to="/">Home</Link>
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

            {/*<hr className="hr"/>*/}

            <Route path="/"/>
            <Route path="/profile" component={ProfileContainer}/>
            <Route path="/messages" component={ChatWindowContainer}/>
        </div>
    </Router>
);
