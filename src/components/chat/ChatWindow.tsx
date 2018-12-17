import * as React from 'react';
import {MessageListContainer} from '../../containers/message/MessageListContainer';
import {MessageFormContainer} from '../../containers/message/MessageFormContainer';
import {ChannelsContainer} from '../../containers/channel/ChannelsContainer';

export interface IChatWindowStateProps {
    readonly isTyping: boolean;
    readonly isEditing: boolean;
    readonly authToken: string | null;
}

export interface IChatWindowDispatchProps {
    readonly loadUsers: (authToken: string | null) => void;
    readonly loadChannels: (authToken: string | null) => void;
}

export class ChatWindow extends React.Component<IChatWindowDispatchProps & IChatWindowStateProps> {
    componentDidMount(): void {
        if (this.props.authToken) {
            this.props.loadUsers(this.props.authToken);
            this.props.loadChannels(this.props.authToken);
        }
    }
    render(): JSX.Element {
        return (
            <div id="chat-container">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="channel-container">
                        <ChannelsContainer />
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 chat">
                    <div className="message-container">
                        <h4> Channel Name </h4>
                        <MessageListContainer />
                    </div>
                    <div className="new-message-container">
                        <MessageFormContainer />
                    </div>
                </div>
            </div>
        );
    }
}
