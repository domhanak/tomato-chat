import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItemContainer} from '../../containers/channel/ChannelListItemContainer';

export interface IChannelListProps {
    readonly allChannels: Immutable.List<IChannel>;
}

export interface IChannelListDispatchProps {
    readonly updateChannelOrder: (channelId: Uuid, newOrder: number, channelId2: Uuid, newOrder2: number) => void;
}

interface IState {
    readonly value: string;
}

export class ChannelList extends React.Component<IChannelListProps & IChannelListDispatchProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleOrderChange = (channel: IChannel, newOrder: number) => {
        if (newOrder < 0) {
            return;
        }

        const neighbour = this.props.allChannels.find((item: IChannel) => {
            return item.order === newOrder && item.id !== channel.id;
        });

        if (neighbour === null || neighbour === undefined) {
            return;
        }

        this.props.updateChannelOrder(channel.id, neighbour.order, neighbour.id, channel.order);
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
                    {this.props.allChannels && this.props.allChannels
                        .sort((item1: IChannel, item2: IChannel) => { return item1.order - item2.order; })
                        .map((channel: IChannel) => (
                        <ChannelListItemContainer key={channel.id} id={channel.id}
                                                  onMoveDown={this.onMoveDown}
                                                  onMoveUp={this.onMoveUp} />
                    ))}
                </ul>
            </div>
        );
    }
}
