import * as React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import {IChannel} from '../../models/IChannel';

export interface IChannelListItemsProps {
    readonly id: Uuid;
    readonly index: number;
    readonly channel2: IChannel;
}

export interface IChannelListItemStateProps {
    readonly channel: IChannel;
}

interface IChannelDispatchProps {
    readonly onMoveDown: (channel: IChannel) => void;
    readonly onMoveUp: (channel: IChannel) => void;
}

type IProps = IChannelListItemsProps & IChannelListItemStateProps & IChannelDispatchProps;

export interface IState {}

export class ChannelListItem extends React.Component<IProps, IState> {

    handleMoveDown = (event: any) => {
        event.preventDefault();
        this.props.onMoveDown(this.props.channel2);
    }

    handleMoveUp = (event: any) => {
        event.preventDefault();
        this.props.onMoveUp(this.props.channel2);
    }

    render(): JSX.Element {
        return (
            <li>
                <Router>
                    <div>
                        <h6>{this.props.channel2.name}</h6>
                        <div className="channel-options visible">
                            <Link to="/channel" className="settings glyphicon glyphicon-cog" />
                            <a onClick={this.handleMoveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                            <a onClick={this.handleMoveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                        </div>

                        <Route path="/channel" render={() => <ChannelContainer id={this.props.id} />}/>
                    </div>
                </Router>
            </li>
        );
    }
}
