import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {MessageEdit} from './MessageEdit';
import {MessageDisplay} from './MessageDisplay';

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly index: number;
}

export interface IMessageStateProps {
    readonly message: IMessage;
    readonly isBeingEdited: boolean;
    readonly username: string;
    readonly avatarId: string;
    readonly selectedChannel: Uuid;
    readonly authToken: AuthToken;
}

export interface IMessageDispatchProps {
    readonly onEdit: (authToken: string | null, message: IMessage, channelId: Uuid, newMessage: string) => void;
    readonly onDelete: (authToken: string | null, messageId: Uuid, channelId: Uuid) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
}

type IProps = IMessageOwnProps & IMessageStateProps & IMessageDispatchProps;

export interface IState {}

export class Message extends React.PureComponent<IProps, IState> {
    onSubmitMessageTextChange = (newValue: string) => {
        this.props.onStartEditing();
        this.props.onEdit(this.props.authToken, this.props.message, this.props.selectedChannel, newValue);
    };
    onDeleteMessage = () => {
        this.props.onDelete(this.props.authToken, this.props.message.id, this.props.selectedChannel);
    };
    render(): JSX.Element {
        const {  username, message, isBeingEdited, onCancelEditing, onStartEditing } = this.props;
        return (
            <div key={message.id} className="message-container" >
                <div className="message">
                    <div className="message-author-img">
                        <a className="username-head thumbnail fill">
                            <img src={this.props.avatarId} alt="sunil"/>
                        </a>
                    </div>

                    <div className="received-message-container">
                        <div className="message-header">
                            <span>
                                <a id="username">{username}</a>
                            </span>
                            <span>
                                 <a onClick={this.onDeleteMessage} className="glyphicon glyphicon-minus"/>
                            </span>
                        </div>
                        {
                            isBeingEdited
                            ? <MessageEdit message={message} onSave={this.onSubmitMessageTextChange} onCancel={onCancelEditing}/>
                            : <MessageDisplay message={message} onClick={onStartEditing} />
                        }
                    </div>
                </div>
            </div>

        );
    }
}
