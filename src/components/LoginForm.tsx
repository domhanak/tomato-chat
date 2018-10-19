import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import '../styles/base.scss';
import {ChatWindow} from "./ChatWindow";
import {Route} from "react-router";

interface ILoginState {
    readonly login: string;
    readonly password: string;
}

export class LoginForm extends React.Component<{}, ILoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            login: '',
            password: '',
        };
    }

    handleLoginChange = (event: any) => {
        this.setState({ login: event.target.value });
    };

    handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = (event: any) => {
        event.preventDefault();

        return ChatWindow;
    };

    // Add methods handling inputs

    render(): JSX.Element {
        return (
          <form>
              <FormGroup controlId="formBasicText">
                  <ControlLabel> Username </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.login}
                    placeholder="Enter Login"
                    onChange={this.handleLoginChange}
                  />
              <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                  <ControlLabel> Password </ControlLabel>
                  <FormControl
                      type="text"
                      value={this.state.password}
                      placeholder="Enter Password"
                      onChange={this.handlePasswordChange}
                  />
              </FormGroup>
              <Route render={({ history }) => (
                  <button
                      type='button'
                      onClick={() => { history.push('/messages') }}
                  >
                      Login
                  </button>
              )} />
          </form>
        );
    }
}
