import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItem} from './ChannelListItem';

export interface IChannelListProps {
    readonly channels: Immutable.List<IChannel>;
}

export interface IChannelListDispatchProps {
    readonly updateChannelOrder: (channel: IChannel, newOrder: number) => void;
}

interface IState {
    readonly value: string;
    readonly stateChannels: Immutable.List<IChannel>;
}

export class ChannelList extends React.Component<IChannelListProps & IChannelListDispatchProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            stateChannels: this.props.channels,
        };
    }

    handleOrderChange = (channel: IChannel, newOrder: number) => {
        if (newOrder < 0) {
            return;
        }

        const neighbour = this.props.channels.find((item: IChannel) => {
            return item.order === newOrder && item.id !== channel.id;
        });

        if (neighbour === null || neighbour === undefined) {
            return;
        }

        this.props.updateChannelOrder(channel, neighbour.order);
        this.props.updateChannelOrder(neighbour, channel.order);
    };

    onMoveUp = (channel: IChannel) => {
        this.handleOrderChange(channel, channel.order - 1);
    };

    onMoveDown = (channel: IChannel) => {
        this.handleOrderChange(channel, channel.order + 1);
    };

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul>
                    {this.state.stateChannels && this.state.stateChannels.sort((first: IChannel, second: IChannel) => {
                        return first.order - second.order;
                    }).map(channel => (
                        <ChannelListItem key={channel!.id} channel={channel!} onMoveDown={this.onMoveDown} onMoveUp={this.onMoveUp} />
                    ))}
                </ul>
            </div>
        );
    }
}
