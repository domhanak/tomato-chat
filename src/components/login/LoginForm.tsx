import * as React from 'react';
import '../../styles/base.scss';
import '../../styles/login.scss';
import {IUser} from '../../models/IUser';
import * as Immutable from 'immutable';
import {validateEmail} from '../../common/utils/utilFunctions';

export interface ILoginFormOwnProps {
    readonly users: Immutable.List<IUser>;
    readonly user: IUser;
}

export interface ILoginFormDispatchProps {
    readonly onUserAuthentication: (email: string) => void;
}

type IProps = ILoginFormOwnProps & ILoginFormDispatchProps;

interface ILoginState {
    readonly username: string;
}

export class LoginForm extends React.Component<IProps, ILoginState> {
    handleLoginChange = (event: any) => {
        event.persist();
        this.setState(() => ({ username: event.target.value }));
    };

    handleSubmit = (event: any) => {
        event.preventDefault();

        if (!validateEmail(this.state.username)) {
            return;
        }

        this.props.onUserAuthentication(this.state.username);

        this.setState(_ => ({ username: '' }));
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: 'tomato@mailinator.com',
        };
    }

    render(): JSX.Element {
        return (
        <div className="login-form col-md-6 col-md-offset-4">
            <div className="box col-md-6 row justify-content-center align-items-center">
            <div className="shape1"/>
            <div className="shape2"/>
            <div className="float">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h4 id="login"> Login </h4>
                    <div className="form-group">
                        <label placeholder="Username"
                               className="text-white"> Username: </label>
                        <br/>
                        <input type="text"
                               name="username"
                               value={this.state.username}
                               onChange={this.handleLoginChange}
                               className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               name="login"
                               className="btn btn-primary"
                               value="Login" />
                    </div>
                </form>
            </div>
            </div>
        </div>
        );
    }
}
