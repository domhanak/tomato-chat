import * as React from 'react';
import '../../styles/App.scss';
import {IMessage} from "../../models/IMessage";

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
            <div key={index} id="message-container" className={`message`}>
                <div className="row">
                    <div className="message">
                        <div className="message-author">
                            {message.from}
                        </div>
                        <hr className="hr"/>
                        <div className="message-text">
                            {message.text}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
