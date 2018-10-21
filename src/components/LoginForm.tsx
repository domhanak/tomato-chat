import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../styles/base.scss';
import '../styles/login.scss';
import {Route} from 'react-router';

interface ILoginState {
    readonly username: string;
    readonly password: string;
}

export class LoginForm extends React.Component<{}, ILoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    handleLoginChange = (event: any) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    };
    handleSubmit = (event: any) => {
        event.preventDefault();
    };
    render(): JSX.Element {
        return (
        <div className="login-form col-md-6 col-md-offset-3">
            <h4> Login </h4>
              <form name="login-form" onSubmit={this.handleSubmit}>
                  <FormGroup controlId="formControlsEmail">
                      <ControlLabel> Username </ControlLabel>
                      <FormControl
                        value={this.state.username}
                        placeholder="Enter Username"
                        onChange={this.handleLoginChange}
                      />
                  <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formControlsPassword">
                      <ControlLabel> Password </ControlLabel>
                      <FormControl
                          type="password"
                          value={this.state.password}
                          placeholder="Enter Password"
                          onChange={this.handlePasswordChange}
                      />
                  </FormGroup>
                  <Route render={({ history }) => (
                      <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => { history.push('/messages'); }}
                      >
                          Login
                      </button>
                  )} />
              </form>
        </div>
        );
    }
}
