import { Component } from 'react';
import '../styles/base.scss';
import { LoginForm } from './LoginForm';
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
          <h1 className="page-header"> Tomato Chat Application </h1>
          <Router>
            <div>
              <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
              </ul>

              <hr />

              <Route path="/profile" component={Profile}/>
              <Route path="/messages" component={ChatWindow}/>
            </div>
          </Router>
          <LoginForm />
      </div>
    );
  }
}
