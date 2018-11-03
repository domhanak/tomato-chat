import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Channel} from './Channel';
import {IChannel} from '../models/IChannel';
import * as PropTypes from 'prop-types';

interface IChannelListState {
    readonly newChannelName: string;
    readonly channelList: IChannel[];
}

interface IChannelCallbackProps {
    readonly onChannelCreation: (channel: IChannel) => void;
    readonly onNewChannelNameChange: (channelName: string) => void;
}

export class ChannelList extends React.Component<IChannelListState & IChannelCallbackProps> {

    static propTypes = {
        onChannelCreation: PropTypes.func.isRequired,
        onNewChannelNameChange: PropTypes.func.isRequired,
        newChannelName: PropTypes.string.isRequired,
        channelList: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                order: PropTypes.number.isRequired,
            })),
    };

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        this.props.onChannelCreation({name: this.props.newChannelName, id: 'xx', order: 4});
    };

    handleNewChannelNameChange = (event: any) => {
        this.props.onNewChannelNameChange(event.target.value);
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
                        {this.props.channelList && this.props.channelList.map(channel => (
                            <li key={channel!.id}>
                                <Router>
                                    <div>
                                        <h6><Link className="channel-name" to="/todo" >{channel!.name}</Link></h6>
                                        <div className="channel-options visible">
                                            <Link to="/channel" className="settings glyphicon glyphicon-cog" />
                                            <a onClick={this.moveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                                            <a onClick={this.moveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                                        </div>

                                        <Route path="/channel" component={Channel}/>
                                    </div>
                                </Router>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="channel-creation">
                    <form onSubmit={this.handleChannelCreation}>
                        <input
                            value={this.props.newChannelName}
                            onChange={this.handleNewChannelNameChange}
                            placeholder="New Channel" />
                    </form>
                </div>
            </div>
        );
    }
}
