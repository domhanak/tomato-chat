import { Component } from 'react';
import '../styles/index.css';
import { LoginForm } from './LoginForm';
import * as React from 'react';

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
          <LoginForm />
      </div>
    );
  }
}
