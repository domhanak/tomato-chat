import { Component } from 'react';
import { LoginForm } from './LoginForm';
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Profile} from './Profile';
import {ChatWindow} from './ChatWindow';

export class TomatoChat extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    render(): JSX.Element {
        return (
            <div className="app">
                <header className="page-nav">
                    <div className="container">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <h1>Tomato Chat Application </h1>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 special-img">
                            <img src="../tomato-779329_960_720.jpg" alt="logo"/>
                        </div>
                    </div>
                    <Router>
                        <div>
                            <ul className="list-inline">
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

                            <hr />

                            <Route path="/"/>
                            <Route path="/login" component={LoginForm}/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/messages" component={ChatWindow}/>
                        </div>
                    </Router>
                </header>
                <div>
                    <p>
                        Chat application so you can chat like true tomato.
                    </p>
                </div>
            </div>
        );
    }
}
