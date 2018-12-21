import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {MessageEdit} from "./MessageEdit";
import {MessageDisplay} from "./MessageDisplay";

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly index: number;
}

export interface IMessageStateProps {
    readonly message: IMessage;
    readonly isBeingEdited: boolean;
    readonly username: string;
    readonly selectedChannel: Uuid
    readonly authToken: AuthToken;
}

export interface IMessageDispatchProps {
    readonly onEdit: (authToken: string | null, message: IMessage, channelId: Uuid, newMessage: string) => void;
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
    render(): JSX.Element {
        const { index, username, message, isBeingEdited, onCancelEditing, onStartEditing } = this.props;
        return (
            <div key={index} id="message-container" >
                <div className="message">
                    <div className="message-author-img">
                        <a className="username-head thumbnail fill">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/Screen%20Shot%202016-11-21%20at%209.58.01%20AM.png" alt="sunil"/>
                        </a>
                    </div>

                    <div className="received-message-container">
                        <div className="message-header">
                            <span>
                                <a id="username">{username}</a>
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
