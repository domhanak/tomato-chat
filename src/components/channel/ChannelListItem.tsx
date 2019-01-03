import * as React from 'react';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import {IChannel} from '../../models/IChannel';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';
import {userToServerModelMapper} from '../../common/utils/utilFunctions';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {List} from 'immutable';

export interface IChannelListItemProps {
    readonly id: Uuid;
    readonly ownerId: Uuid;
}

export interface IChannelListItemStateProps {
    readonly channel: IChannel;
    readonly isBeingEdited: boolean;
    readonly ownerNickname: string | null | undefined;
    readonly authToken: AuthToken;
    readonly loggedUser: IUser | null;
}

export interface IChannelListItemCallBackProps {
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
    readonly onChannelSelection: (authToken: AuthToken, user: IUserServerModel) => void;
    readonly onChannelDelete: (deletedChannelId: Uuid, authToken: AuthToken, user: IUserServerModel) => void;
    readonly onChannelRemove: (channel: IChannelServerModel, channelId: Uuid, user: IUserServerModel, authToken: AuthToken) => void;
    readonly updateChannelOrder: (user: IUserServerModel, authToken: AuthToken) => void;
}

interface IState {

}

type IProps = IChannelListItemProps & IChannelListItemStateProps & IChannelListItemCallBackProps;

export class ChannelListItem extends React.Component<IProps, IState> {

    handleMoveDown = (event: any) => {
        event.preventDefault();

        const index: number = List(this.props.loggedUser!.channels)
            .findIndex((value: Uuid) => { return value === this.props.channel.id; });

        const user: IUserServerModel = {email: this.props.loggedUser!.email,
            customData: {nickname: this.props.loggedUser!.nickname, id: this.props.loggedUser!.id,
                avatarId: this.props.loggedUser!.avatarId, selectedChannel: this.props.loggedUser!.selectedChannel,
                channels: List(this.getNewChannelsOrder(List(this.props.loggedUser!.channels).toArray(),
                    index, index + 1, this.props.channel.id))}};

        this.props.updateChannelOrder(user, this.props.authToken);
    }

    handleMoveUp = (event: any) => {
        event.preventDefault();

        const index: number = List(this.props.loggedUser!.channels)
            .findIndex((value: Uuid) => { return value === this.props.channel.id; });

        const user: IUserServerModel = {email: this.props.loggedUser!.email,
            customData: {nickname: this.props.loggedUser!.nickname, id: this.props.loggedUser!.id,
                avatarId: this.props.loggedUser!.avatarId, selectedChannel: this.props.loggedUser!.selectedChannel,
                channels: List(this.getNewChannelsOrder(List(this.props.loggedUser!.channels).toArray(),
                    index, index - 1, this.props.channel.id))}};

        this.props.updateChannelOrder(user, this.props.authToken);
    }

    getNewChannelsOrder = (channels: Array<Uuid>, originalIndex: number, newIndex: number, channelId: Uuid) => {
        if (newIndex < 0 || newIndex >= channels.length) {
            return channels;
        }

        const tmp = channels[newIndex];
        channels[newIndex] = channelId;
        channels[originalIndex] = tmp;

        return channels;
    }

    handleDelete = (event: any) => {
        event.preventDefault();
        if (this.isChannelDeletable()) {
            this.props.onChannelDelete(this.props.channel.id, this.props.authToken, userToServerModelMapper(this.props.loggedUser!));
        }
        else {
            const users: List<Uuid> = List(this.props.channel.users)
                .filter((value: Uuid) => { return value !== this.props.loggedUser!.id; }).toList();

            const channelToUpdate: IChannelServerModel = {name: this.props.channel.name,
                customData: {owner: this.props.channel.owner, messages: this.props.channel.messages, name: this.props.channel.name, users}};

            const channelsToUpdate: List<Uuid> = List(this.props.loggedUser!.channels)
                .filter((value: Uuid) => { return value !== this.props.channel.id; }).toList();

            const userToUpdate: IUserServerModel = {email: this.props.loggedUser!.email,
                customData: {selectedChannel: this.props.loggedUser!.selectedChannel, channels: channelsToUpdate,
                avatarId: this.props.loggedUser!.avatarId, id: this.props.loggedUser!.id, nickname: this.props.loggedUser!.nickname} };

            this.props.onChannelRemove(channelToUpdate, this.props.channel.id, userToUpdate, this.props.authToken);
        }
    }

    handleClick = () => {
        this.props.isBeingEdited ? this.props.onCancelEditing() : this.props.onStartEditing();
        this.handleChannelSelection();
    }

    handleChannelSelection = () => {
        this.props.onChannelSelection(this.props.authToken, {email: this.props.loggedUser!.email,
            customData: {...this.props.loggedUser, selectedChannel: this.props.channel.id}} as IUserServerModel);
    }

    getSassClassName = (className: string) => {
        return `${className}${this.props.channel.id === this.props.loggedUser!.selectedChannel ? ` ${className}-selected` : ''}`;
    }

    isChannelDeletable = () => {
        return this.props.loggedUser!.id === this.props.channel.owner;
    }

    render(): JSX.Element {
        const classNames  = this.isChannelDeletable() ? 'delete glyphicon glyphicon-trash' : 'delete glyphicon glyphicon-minus';
        return (
            <li className={this.getSassClassName('channel-list-item__container')}>
                <div onClick={this.handleChannelSelection} className="channel-list-item">
                    <div className={this.getSassClassName('channel-name')}>
                        <h6>{this.props.channel.name}</h6>
                    </div>
                    <div className="channel-options visible">
                        <a onClick={this.handleClick} className="settings glyphicon glyphicon-cog" />
                        <a onClick={this.handleMoveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                        <a onClick={this.handleMoveDown} className="arrowdown glyphicon glyphicon-arrow-down" />
                        <a onClick={this.handleDelete} className={classNames}/>
                    </div>
                    <div className="owner-nickname">
                        <p>{this.props.ownerNickname}</p>
                    </div>
                    <div>
                        {this.props.isBeingEdited ? <ChannelContainer id={this.props.id}/> : <div />}
                    </div>
                </div>
            </li>
        );
    }
}
