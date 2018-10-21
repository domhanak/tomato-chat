import { Component } from 'react';
import { LoginForm } from './LoginForm';
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Profile} from './Profile';
import {ChatWindow} from './ChatWindow';
import '../styles/App.scss';

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
            <div className="App">
                <header className="page-nav">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-md-offset-3">
                        <h1>Tomato Chat Application </h1>
                    </div>
                    <div className="container">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-md-offset-5 img">
                            <img src={require('../tomato.jpg')} alt="logo"/>
                        </div>
                    </div>
                    <div>
                        <h4>
                            Chat application so you can chat like true tomato.
                        </h4>
                    </div>
                    <Router>
                        <div className="container">
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

                            <hr className="hr"/>

                            <Route path="/"/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/messages" component={ChatWindow}/>
                            <LoginForm/>
                        </div>
                    </Router>
                    <div className="panel-footer">
                        <h4> Footer </h4>
                    </div>
                </header>
            </div>
        );
    }
}
