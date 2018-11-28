import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItemContainer} from '../../containers/channel/ChannelListItemContainer';

export interface IChannelListProps {
    readonly channelIds: Immutable.List<Uuid>;
}

export interface IChannelListDispatchProps {
    readonly updateChannelOrder: (channel: IChannel, newOrder: number) => Promise<any>;
}

interface IState {
    readonly value: string;
    // readonly stateChannels: Immutable.List<IChannel>;
}

export class ChannelList extends React.Component<IChannelListProps & IChannelListDispatchProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            // stateChannels: this.props.channels,
        };
    }

    handleOrderChange = (channel: IChannel, newOrder: number) => {
        if (newOrder < 0) {
            return;
        }
        console.log(channel);
        // const neighbour = this.props.channels.find((item: IChannel) => {
        //     return item.order === newOrder && item.id !== channel.id;
        // });
        //
        // if (neighbour === null || neighbour === undefined) {
        //     return;
        // }
        //
        // this.props.updateChannelOrder(channel, neighbour.order);
        // this.props.updateChannelOrder(neighbour, channel.order).then(_ => console.log(this.props.channels));
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
                    {this.props.channelIds && this.props.channelIds.map((id: string) => (
                        <ChannelListItemContainer key={id} id={id} onMoveDown={this.onMoveDown} onMoveUp={this.onMoveUp} />
                    ))}
                </ul>
            </div>
        );
    }
}
