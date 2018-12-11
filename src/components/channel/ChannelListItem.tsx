import * as React from 'react';
import {ChannelContainer} from '../../containers/channel/ChannelContainer';
import {IChannel} from '../../models/IChannel';

export interface IChannelListItemProps {
    readonly id: Uuid;
    readonly ownerId: Uuid;
}

export interface IChannelListItemStateProps {
    readonly channel: IChannel;
    readonly isBeingEdited: boolean;
    readonly ownerNickname: string | null | undefined;
}

export interface IChannelListItemCallBackProps {
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
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
    }

    render(): JSX.Element {
        return (
            <li>
                <div>
                    <h6>{this.props.channel.name}</h6>
                    <div className="channel-options visible">
                        <a onClick={this.handleClick} className="settings glyphicon glyphicon-cog" />
                        <a onClick={this.handleMoveUp} className="arrowUp glyphicon glyphicon-arrow-up" />
                        <a onClick={this.handleMoveDown} className="arrowDown glyphicon glyphicon-arrow-down" />
                    </div>
                    <div className="owner-nickname">
                        {this.props.ownerNickname}
                    </div>
                    <div>
                        {this.props.isBeingEdited ? <ChannelContainer id={this.props.id}/> : <div />}
                    </div>
                </div>
            </li>
        );
    }
}
