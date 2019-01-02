import * as React from 'react';
import {IMessage} from '../../models/IMessage';

interface IProps {
    readonly message: IMessage;
    readonly onClick?: () => void;
}

export const MessageDisplay: React.SFC<IProps> = ({ message, onClick }) => (
    <>
        <div className="received-message" onClick={onClick} >
            <p>{message.value}</p>
            <a>
                <span className="time-date">
                    <span>{new Date(message.createdAt.toLocaleString()).toLocaleDateString()}</span>
                    <span>{new Date(message.createdAt.toLocaleString()).toLocaleTimeString()}</span>
                </span>
            </a>
        </div>
    </>
);
