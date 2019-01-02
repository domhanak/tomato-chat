import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItemContainer} from '../../containers/channel/ChannelListItemContainer';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IUser} from '../../models/IUser';

export interface IChannelListProps {
    readonly allChannels: Immutable.List<IChannel>;
    readonly authToken: AuthToken;
    readonly loggedUser: IUser | null;
    readonly allUsers: Immutable.List<IUser>;
}

export interface IChannelListCallBackProps {
    readonly onChannelDeleteOrderUpdate: () => void;
}

export interface IChannelListDispatchProps {
    readonly updateChannelOrder: (authToken: AuthToken,
                                  channelId: Uuid, channel: IChannelServerModel,
                                  neighbourId: Uuid, neighbour: IChannelServerModel) => void;
}

interface IState {
    readonly value: string;
}

export class ChannelList extends React.Component<IChannelListProps & IChannelListDispatchProps & IChannelListCallBackProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleOrderChange = (channel: IChannel, newOrder: number) => {
        console.log(channel.id + newOrder);
        // if (newOrder < 0) {
        //     return;
        // }
        //
        // const neighbour = this.props.allChannels.find((item: IChannel) => {
        //     return item.order === newOrder && item.id !== channel.id;
        // });
        //
        // if (neighbour === null || neighbour === undefined) {
        //     return;
        // }
        //
        // const channelServerModel: IChannelServerModel = {name: channel.name, customData: {
        //         ...channel, order: neighbour.order
        //     }} as IChannelServerModel;
        //
        // const channelServerModelNeighbour: IChannelServerModel = {name: neighbour.name, customData: {
        //         ...neighbour, order: channel.order
        //     }} as IChannelServerModel;
        // this.props.updateChannelOrder(this.props.authToken,
        //     channel.id, channelServerModel, neighbour.id, channelServerModelNeighbour);
    };

    onMoveUp = (channel: IChannel) => {
        console.log(channel); // this.handleOrderChange(channel, channel.order - 1);
    };

    onMoveDown = (channel: IChannel) => {
        console.log(channel);
        // this.handleOrderChange(channel, channel.order + 1);
    };

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul className="list-group">
                    {this.props.allChannels && this.props.allChannels
                        // .sort((item1: IChannel, item2: IChannel) => { return item1.order - item2.order; })
                        .map((channel: IChannel) => (
                        <ChannelListItemContainer key={channel.id} id={channel.id} ownerId={channel.owner}
                                                  onMoveDown={this.onMoveDown}
                                                  onMoveUp={this.onMoveUp}/>
                    ))}
                </ul>
            </div>
        );
    }
}
