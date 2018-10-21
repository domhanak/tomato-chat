import * as React from 'react';
import * as PropTypes from 'prop-types';
import {IMessage} from '../models/IMessage';
import '../styles/messages.scss';
import {Message} from './Message';

interface IMessageListProps {
    readonly messages: IMessage[];
}

export class MessageList extends React.Component<IMessageListProps> {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            from: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })),
    };

    render(): JSX.Element {
        return (
            <div className="message-list list-group" >
                {this.props.messages && this.props.messages.map(message => (
                    <div className="list-group-item">
                        <Message key={message.id} id={message.id} text={message.text} from={message.from}  />
                    </div>
                ))}
            </div>
        );
    }
}
