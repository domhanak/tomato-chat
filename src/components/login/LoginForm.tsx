import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../../styles/base.scss';
import '../../styles/login.scss';
import {IUser} from '../../models/IUser';
import * as Immutable from 'immutable';

export interface ILoginFormOwnProps {
    readonly users: Immutable.List<IUser>;
    readonly user: IUser;
}

export interface ILoginFormDispatchProps {
    readonly onUserAdd: (username: string) => void;
    readonly onUserLogin: (id: Uuid, isLoggedIn: true) => void;
}

type IProps = ILoginFormOwnProps & ILoginFormDispatchProps;

interface ILoginState {
    readonly username: string;
    readonly password: string;
}

export class LoginForm extends React.Component<IProps, ILoginState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }
    handleLoginChange = (event: any) => {
        event.persist();
        this.setState(() => ({ username: event.target.value }));
    };

    handlePasswordChange = (event: any) => {
        event.persist();
        this.setState(() => ({ password: event.target.value }));
    };
    handleSubmit = (event: any) => {
        event.preventDefault();

        // TODO: Move - this needs to be handled by thunk
        const newUser = this.props.users.find((user: IUser) => (user.nickname === this.state.username));
        if (newUser === null || newUser === undefined) {
            return;
        }

        this.props.onUserLogin(newUser.id, true);
        this.setState(_ => ({ username: '', password: '' }));
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
                  <button
                      className="btn btn-primary"
                      type="input"
                  >
                      Login
                  </button>
              </form>
        </div>
        );
    }
}
