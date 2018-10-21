import * as React from 'react';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { IMessage } from '../models/IMessage';
import {ChannelList} from './ChannelList';
import '../styles/messages.scss';

interface IChatWindowState {
    readonly username: string;
    readonly message: string;
    readonly messages: IMessage[];
}

interface IChatWindowProps {
    readonly username: string;
}

export class ChatWindow extends React.Component<IChatWindowProps, IChatWindowState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: this.props.username,
            message: '',
            messages: [],
        };
    }
    updateMessage = (message: string) => {
        this.setState(() => ({ message }));
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
                    <div className="col-lg-4 col-md-4 col-sm-4 channel-container">
                        <ChannelList/>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 message-container">
                        <h4> Channel Name </h4>
                        <MessageList messages={this.state.messages}/>
                    </div>
                </div>
                <div className="new-message-container">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-md-offset-4">
                        <MessageForm message={this.state.message} username={this.state.username} onMessageChange={this.updateMessage} onSend={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}
