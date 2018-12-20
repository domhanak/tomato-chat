import * as React from 'react';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import {IChannel} from '../../models/IChannel';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';

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
}

interface IChannelListItemDispatchProps {
    readonly onMoveDown: (channel: IChannel) => void;
    readonly onMoveUp: (channel: IChannel) => void;
}

interface IState {

}

type IProps = IChannelListItemProps & IChannelListItemStateProps & IChannelListItemCallBackProps & IChannelListItemDispatchProps;

export class ChannelListItem extends React.Component<IProps, IState> {

    handleMoveDown = (event: any) => {
        event.preventDefault();
        this.props.onMoveDown(this.props.channel);
    }

    handleMoveUp = (event: any) => {
        event.preventDefault();
        this.props.onMoveUp(this.props.channel);
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

    render(): JSX.Element {
        return (
            <li className={this.getSassClassName('channel-list-item__container')}>
                <div className="channel-list-item">
                    <div className={this.getSassClassName('channel-name')}>
                        <h6 onClick={this.handleChannelSelection}>{this.props.channel.name}</h6>
                    </div>
                    <div className="channel-options visible">
                        <a onClick={this.handleClick} className="settings glyphicon glyphicon-cog" />
                        <a onClick={this.handleMoveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                        <a onClick={this.handleMoveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
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
