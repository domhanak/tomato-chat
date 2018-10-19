import * as React from 'react';
import '../styles/base.scss';

export class LoginForm extends React.Component {
    constructor(props: any) {
        super(props);
    }

    // Add methods handling inputs

    render(): JSX.Element {
        return (
                <form className="login-form">
                    <label className="message-form__login-label"
                           htmlFor="login" > Username: </label>
                    <input type="text"
                           id="login"
                           className="login-form__login" />
                    <label className="message-form__password-label"
                           htmlFor="login"> Password: </label>
                    <input type="text"
                           id="login"
                           className="login-form__login"/>
                    <button type="submit" className="btn btn-primary">Login </button>
                </form>
        );
    }
}
