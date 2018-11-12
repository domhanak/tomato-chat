import * as React from 'react';
import '../styles/App.scss';
import {Navigation} from './navigation/Navigation';

export interface ITomatoAppStateProps {
    readonly loggedUser: Uuid | null;
}

export interface ITomatoAppDispatchProps {
    readonly loadUsers: () => void;
    readonly loadMessages: () => void;
    readonly loadChannels: () => void;
}

export class TomatoApp extends React.PureComponent<ITomatoAppDispatchProps & ITomatoAppStateProps> {
    componentDidMount(): void {
        this.props.loadUsers();
        this.props.loadMessages();
        this.props.loadChannels();
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
                    <Navigation/>
                    <div className="panel-footer">
                        <h4> Footer </h4>
                    </div>
                </header>
            </div>
        );
    }
}
