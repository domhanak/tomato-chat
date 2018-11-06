import * as React from 'react';
import { MessageForm } from './Message/MessageForm';
import { MessageList } from './Message/MessageList';
import { IMessage } from '../models/IMessage';
import {IChannel} from '../models/IChannel';
import {Channels} from './Channel/Channels';

interface IChatWindowState {
    readonly username: string;
    readonly message: string;
    readonly messages: IMessage[];
    readonly channels: IChannel[];
    readonly newChannelName: string;
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
            newChannelName: '',
            channels: [],
        };
    }

    updateChannelName = (channelName: string) => {
        this.setState(() => ({newChannelName: channelName}));
    }

    createNewChannel = (channel: IChannel) => {
        this.setState(prevState => ({
            channels: [...prevState.channels, channel]
        }));
        this.updateChannelName('');
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
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="channel-container">
                        <Channels channelList={this.state.channels}
                                     newChannelName={this.state.newChannelName}
                                     onNewChannelNameChange={this.updateChannelName}
                                     onChannelCreation={this.createNewChannel} />
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 new-message-container">
                    <div className="message-container">
                        <h4> Channel Name </h4>
                        <MessageList messages={this.state.messages}/>
                    </div>
                    <div>
                        <MessageForm message={this.state.message} username={this.state.username} onMessageChange={this.updateMessage} onSend={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}
