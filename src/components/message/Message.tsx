import * as React from 'react';
import {IMessage} from '../../models/IMessage';

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly index: number;
}

export interface IMessageStateProps {
    readonly message: IMessage;
    readonly isBeingEdited: boolean;
    readonly userId: Uuid | null;
    readonly username: string;
}

export interface IMessageDispatchProps {
    readonly onEdit: (text: string) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
}

type IProps = IMessageOwnProps & IMessageStateProps & IMessageDispatchProps;

export interface IState {}

export class Message extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { index, username, message } = this.props;
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
                        <div className="received-message" >
                            <p>{message.value}</p>
                            <a>
                                <span className="time-date"> {message.createdAt.toLocaleString()} </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
