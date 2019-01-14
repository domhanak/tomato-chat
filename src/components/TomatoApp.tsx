import * as React from 'react';
import '../styles/App.scss';
import { Navigation } from './navigation/Navigation';
import { LoginFormContainer } from '../containers/login/LoginFormContainer';
// @ts-ignore
import * as url from '../tomato.jpg';
import {IUser} from '../models/IUser';
import {ScaleLoader} from 'react-spinners';
import * as Immutable from 'immutable';

export interface ITomatoAppStateProps {
    readonly userId: Uuid | null;
    readonly loggedUser: IUser | null;
    readonly isLoggedIn: boolean;
    readonly isLoading: boolean;
    readonly authToken: AuthToken;
    readonly errorMessage: string | null;
}

interface ITomatoAppLogoutProps  {
    readonly isLoggingIn: boolean;
    readonly history: any;
}

export interface ITomatoAppDispatchProps {
    readonly loadUsers: (authToken: string | null) => void;
    readonly loadChannels: (authToken: string | null) => void;
    readonly loadMessages: (authToken: string | null, channelId: Uuid) => Immutable.List<Uuid>;
    readonly onUserLogout: () => void;
    readonly onClearErrorMessage: () => void;
}

export class TomatoApp extends React.PureComponent<ITomatoAppStateProps & ITomatoAppDispatchProps & ITomatoAppLogoutProps> {
    constructor(props: any) {
        super(props);

        if (!this.props.isLoggingIn) {
            this.props.onUserLogout();
        }
    }

   componentDidMount(): void {
        if (this.props.authToken && this.props.loggedUser) {
            this.props.loadUsers(this.props.authToken);
            this.props.loadChannels(this.props.authToken);
            this.props.loadMessages(this.props.authToken, this.props.loggedUser.selectedChannel);
        }
        else if (this.props.history) {
            this.props.history.replace('');
        }
    }

    clearErrorMessage = (event: any) => {
        event.preventDefault();
        this.props.onClearErrorMessage();
    }

    render(): JSX.Element {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <ScaleLoader/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            this.props.isLoggedIn ?
                (
                    <div className="App">
                        <header className="page-nav">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-md-offset-3">
                                <h1>Tomato Chat Application </h1>
                            </div>
                            <div className="container">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-md-offset-5 img">
                                    <img src={url} alt="logo"/>
                                </div>
                            </div>
                            <div>
                                <h4>
                                    Chat application so you can chat like a true tomato.
                                </h4>
                            </div>
                            <Navigation/>
                            <div className="panel-footer container">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10"><h4> {this.props.errorMessage ? this.props.errorMessage : 'Tomato chat'} </h4></div>
                                {this.props.errorMessage ? <a className="col-lg-1 col-md-1 col-sm-1 col-xs-1" onClick={this.clearErrorMessage}>clear</a> : <div/>}
                            </div>
                        </header>
                    </div>
                )
                : <LoginFormContainer/>
            );
    }
}
