import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {MessageEdit} from "./MessageEdit";
import {MessageDisplay} from "./MessageDisplay";
import {IMessageServerModel} from "../../models/IMessageServerModel";

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly index: number;
}

export interface IMessageStateProps {
    readonly message: IMessage;
    readonly isBeingEdited: boolean;
    readonly username: string;
    readonly authToken: AuthToken;
}

export interface IMessageDispatchProps {
    readonly onEdit: (authToken: string | null, message: IMessage, channelId: Uuid) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
}

type IProps = IMessageOwnProps & IMessageStateProps & IMessageDispatchProps;

export interface IState {}

export class Message extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { index, username, message, isBeingEdited, onEdit, onCancelEditing, onStartEditing } = this.props;
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
                            ? <MessageEdit message={message} onSave={onEdit} onCancel={onCancelEditing}/>
                            : <MessageDisplay message={message} onClick={onStartEditing} />
                        }
                    </div>
                </div>
            </div>

        );
    }
}
