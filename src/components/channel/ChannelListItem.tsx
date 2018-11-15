import * as React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import {IChannel} from '../../models/IChannel';

interface IChannelListItemsProps {
    readonly channel: IChannel;
    readonly key: Uuid;
    readonly onMoveDown: (channel: IChannel) => void;
    readonly onMoveUp: (channel: IChannel) => void;
}

export class ChannelListItem extends React.Component<IChannelListItemsProps> {

    handleMoveDown = (event: any) => {
        event.preventDefault();
        this.props.onMoveDown(this.props.channel);
    }

    handleMoveUp = (event: any) => {
        event.preventDefault();
        this.props.onMoveUp(this.props.channel);
    }

    render(): JSX.Element {
        return (
            <li>
                <Router>
                    <div>
                        <h6><Link className="channel-name" to="/todo" >{this.props.channel.name}</Link></h6>
                        <div className="channel-options visible">
                            <Link to="/channel" className="settings glyphicon glyphicon-cog" />
                            <a onClick={this.handleMoveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                            <a onClick={this.handleMoveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                        </div>

                        <Route path="/channel" render={() => <ChannelContainer id={this.props.channel.id} />}/>
                    </div>
                </Router>
            </li>
        );
    }
}
