import * as React from 'react';
import { MessageForm } from './MessageForm';
import {MessageList} from './MessageList';
import {IMessage} from '../models/IMessage';

interface IChatWindow {
    readonly messages: IMessage[];
}

export class ChatWindow extends React.Component<{}, IChatWindow> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [
                {
                    id: 'hello',
                    from: 'Janko',
                    text: 'Ahojte',
                }
            ],
        };
    }

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
                        <MessageForm/>
                    </div>
                </div>
            </div>
        );
    }
}
