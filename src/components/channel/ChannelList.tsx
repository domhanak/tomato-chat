import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {IChannel} from '../../models/IChannel';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import * as Immutable from 'immutable';

export interface IChannelListProps {
    readonly channels: Immutable.List<IChannel>;
}

export class ChannelList extends React.Component<IChannelListProps> {
    moveUp = () => {
        return;
    };

    moveDown = () => {
        return;
    };

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul>
                    {this.props.channels && this.props.channels.map(channel => (
                        <li key={channel!.id}>
                            <Router>
                                <div>
                                    <h6><Link className="channel-name" to="/todo" >{channel!.name}</Link></h6>
                                    <div className="channel-options visible">
                                        <Link to="/channel" className="settings glyphicon glyphicon-cog" />
                                        <a onClick={this.moveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                                        <a onClick={this.moveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                                    </div>

                                    <Route path="/channel" render={() => <ChannelContainer id={channel!.id} />}/>
                                </div>
                            </Router>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
