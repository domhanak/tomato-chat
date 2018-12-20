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
    readonly authToken: string | null;
}

export interface ITomatoAppDispatchProps {
    readonly loadUsers: (authToken: string | null) => void;
    readonly loadChannels: (authToken: string | null) => void;
    readonly loadMessages: (authToken: string | null, channelId: Uuid) => Immutable.List<Uuid>;
}

export class TomatoApp extends React.PureComponent<ITomatoAppStateProps & ITomatoAppDispatchProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.authToken && this.props.loggedUser) {
            this.props.loadUsers(this.props.authToken);
            this.props.loadChannels(this.props.authToken);
            this.props.loadMessages(this.props.authToken, this.props.loggedUser.selectedChannel);
        }
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
                            <div className="panel-footer">
                                <h4> Footer </h4>
                            </div>
                        </header>
                    </div>
                )
                : <LoginFormContainer/>
            );
    }
}
