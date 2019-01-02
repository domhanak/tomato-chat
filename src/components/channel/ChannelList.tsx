import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItemContainer} from '../../containers/channel/ChannelListItemContainer';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IUser} from '../../models/IUser';
import {List} from 'immutable';

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
    readonly onChannelDelete: (deletedChannelId: Uuid, channels: List<IChannel>,
                               authToken: AuthToken) => void;
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
        if (newOrder < 0) {
            return;
        }

        const neighbour = this.props.allChannels.find((item: IChannel) => {
            return item.order === newOrder && item.id !== channel.id;
        });

        if (neighbour === null || neighbour === undefined) {
            return;
        }

        const channelServerModel: IChannelServerModel = {name: channel.name, customData: {
                ...channel, order: neighbour.order
            }} as IChannelServerModel;

        const channelServerModelNeighbour: IChannelServerModel = {name: neighbour.name, customData: {
                ...neighbour, order: channel.order
            }} as IChannelServerModel;
        this.props.updateChannelOrder(this.props.authToken,
            channel.id, channelServerModel, neighbour.id, channelServerModelNeighbour);
    };

    onMoveUp = (channel: IChannel) => {
        this.handleOrderChange(channel, channel.order - 1);
    };

    onMoveDown = (channel: IChannel) => {
        this.handleOrderChange(channel, channel.order + 1);
    };

    onChannelDelete = (channelToDelete: IChannel) => {
        let channelsToUpdate = List<IChannel>();
        this.props.allChannels.forEach((channel: IChannel) => {
           if (channel.id === channelToDelete.id) {
               return;
           }

           if (channel.order > channelToDelete.order) {
               const channelToUpdate: IChannel = {...channel, order: channel.order - 1} as IChannel;
               channelsToUpdate = channelsToUpdate.push(channelToUpdate);
           }
        });

        this.props.onChannelDelete(channelToDelete.id, channelsToUpdate, this.props.authToken);
        this.props.onChannelDeleteOrderUpdate();
    };

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul className="list-group">
                    {this.props.allChannels && this.props.allChannels
                        .sort((item1: IChannel, item2: IChannel) => { return item1.order - item2.order; })
                        .map((channel: IChannel) => (
                        <ChannelListItemContainer key={channel.id} id={channel.id} ownerId={channel.owner}
                                                  onMoveDown={this.onMoveDown}
                                                  onMoveUp={this.onMoveUp}
                                                  onChannelDelete={this.onChannelDelete}/>
                    ))}
                </ul>
            </div>
        );
    }
}
