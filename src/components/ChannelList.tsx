import * as React from 'react';
import {List} from 'immutable';
import {ChangeEvent} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Channel} from './Channel';

export class ChannelList extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            newChannelName: '',
            channelList: List<string>()
        };
    }

    displaySettings = (event: any) => {
        return event;
    };

    onChannelCreation = () => {
        this.setState((prevState: any) => ({
            channelList: prevState.channelList.push(prevState.newChannelName),
            newChannelName: ''
        }));

    };

    onNewChannelNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({newChannelName: event.target.value}));
    };

    moveUp = () => {
        return;
    };

    moveDown = () => {
        return;
    };


    render(): JSX.Element {
        return (
            <div className="channels">
                <header>
                    <h4>Channels</h4>
                </header>
                <div className="channel-list">
                    <ul>
                        <li key="1">
                            <Router>
                                <div>
                                    <h6><Link className="channel-name" to="/todo">Channel 1</Link></h6>
                                    <div className="channel-options visible">
                                        <Link to="/channel" className="settings glyphicon glyphicon-cog" />
                                        <a onClick={this.moveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                                        <a onClick={this.moveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                                    </div>


                                    <Route path="/channel" component={Channel}/>
                                </div>
                            </Router>
                        </li>

                    </ul>
                </div>
                <div className="channel-creation">
                    <form onSubmit={this.onChannelCreation}>
                        <input onChange={this.onNewChannelNameChange} type="text" placeholder="New Channel"/>
                    </form>
                </div>
            </div>
        );
    }
}
