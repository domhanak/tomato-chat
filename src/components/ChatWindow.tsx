import * as React from 'react';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { IMessage } from '../models/IMessage';

interface IChatState {
    readonly username: string;
    readonly message: string;
    readonly messages: IMessage[];
}

export class ChatWindow extends React.Component<{}, IChatState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [
                {
                    id: 'hello',
                    from: 'Janko',
                    text: 'Ahojte',
                }
            ],
        };
    }
    updateMessage = (message: string) => {
        this.setState({ message });
    };

    sendMessage = (message: IMessage): void => {
        this.setState(previousState => ({
            messages: [...previousState.messages, message]
        }));
        this.updateMessage('');
    };

    render(): JSX.Element {
        return (
            <div id="chat-container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <span> Channel List </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <MessageList messages={this.state.messages}/>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <span> Participants List </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <MessageForm message={this.state.message} username={this.state.username} onMessageChange={this.updateMessage} onSend={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}
