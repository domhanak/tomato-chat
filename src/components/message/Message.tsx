import * as React from 'react';
import {IMessage} from '../../models/IMessage';

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly index: number;
}

export interface IMessageStateProps {
    readonly message: IMessage;
    readonly isBeingEdited: boolean;
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
        const { index, message } = this.props;
        return (
            <div key={index} id="message-container" >
                <div className={this.props.message.from !== 'Sleep' ? "received-message" : "outgoing-msg"}>
                    {this.props.message.from !== 'Sleep' ? <div className="message-author-img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div> : null}
                    <div className={this.props.message.from !== 'Sleep' ? "received-message-container" : "sent-msg-container"}>
                        <div className="message-author">{message.from}</div>
                        <p>{message.text}</p>
                        <span className="time-date"> 11:01 AM    |    Today</span></div>
                </div>
            </div>

        );
    }
}
