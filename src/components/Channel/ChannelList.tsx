import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Channel} from './Channel';
import {IChannel} from '../../models/IChannel';
import * as PropTypes from 'prop-types';

interface IChannelListState {
    readonly channelList: IChannel[];
}

export class ChannelList extends React.Component<IChannelListState> {

    static propTypes = {
        channelList: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                order: PropTypes.number.isRequired,
            })),
    };

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
        );
    }
}
