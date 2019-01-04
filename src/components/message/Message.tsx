import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {MessageEdit} from './MessageEdit';
import {MessageDisplay} from './MessageDisplay';
import {IMessageServerModel} from '../../models/IMessageServerModel';
import {RawDraftContentState} from 'draft-js';

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
    readonly onEdit: (authToken: string | null, message: IMessage, channelId: Uuid, serverMessage: IMessageServerModel) => void;
    readonly onDelete: (authToken: string | null, messageId: Uuid, channelId: Uuid) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
}

type IProps = IMessageOwnProps & IMessageStateProps & IMessageDispatchProps;

export interface IState {}

export class Message extends React.PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props);
    }

    onSubmitMessageTextChange = (text: RawDraftContentState ) => {
        this.props.onStartEditing();
        this.props.onEdit(this.props.authToken, this.props.message, this.props.selectedChannel, {
            value: JSON.stringify(text),
            customData: {
                upvotes: this.props.message.upvotes,
                downvotes: this.props.message.downvotes,
            }
        });
    };
    onDeleteMessage = () => {
        this.props.onDelete(this.props.authToken, this.props.message.id, this.props.selectedChannel);
    };
    onUpvoteMessage = () => {
        this.props.onEdit(this.props.authToken, this.props.message, this.props.selectedChannel, {
            value: JSON.stringify(this.props.message.value),
            customData: {
                upvotes: this.props.message.upvotes + 1,
                downvotes: this.props.message.downvotes,
            }
        });
    };
    onDownvoteMessage = () => {
        this.props.onEdit(this.props.authToken, this.props.message, this.props.selectedChannel, {
            value: JSON.stringify(this.props.message.value),
            customData: {
                upvotes: this.props.message.upvotes,
                downvotes: this.props.message.downvotes + 1,
            }
        });
    };

    render(): JSX.Element {
        const {  username, message, isBeingEdited, onCancelEditing, onStartEditing } = this.props;
        return (
            <div key={message.id} className="message-container" >
                <div className="message">
                    <div className="message-author-img">
                        <a className="username-head thumbnail fill">
                            <img src={this.props.avatarId} alt="tomato"/>
                        </a>
                    </div>

                    <div className="received-message-container">
                        <div className="message-header">
                            <span>
                                <a id="username">{username}</a>
                            </span>
                            <span className="message-menu">
                                <a id="delete" onClick={this.onDeleteMessage} className="glyphicon glyphicon-trash"/>
                                <a id="upvote" onClick={this.onUpvoteMessage} className="glyphicon glyphicon-plus-sign"/>
                                <span id="positive-count-text"> {message.upvotes} </span>
                                <a id="downvote" onClick={this.onDownvoteMessage} className="glyphicon glyphicon-minus-sign"/>
                                <span id="negative-count-text"> {message.downvotes} </span>
                            </span>
                        </div>
                        {
                            isBeingEdited
                            ? <MessageEdit message={message}
                                           onSave={this.onSubmitMessageTextChange}
                                           onCancel={onCancelEditing}/>
                            : <MessageDisplay message={message} onClick={onStartEditing} />
                        }
                    </div>
                </div>
            </div>

        );
    }
}
