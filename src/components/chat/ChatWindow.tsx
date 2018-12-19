import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageListContainer} from '../../containers/message/MessageListContainer';
import {MessageFormContainer} from '../../containers/message/MessageFormContainer';
import {ChannelsContainer} from '../../containers/channel/ChannelsContainer';

export interface IChatWindowStateProps {
    readonly isTyping: boolean;
    readonly isEditing: boolean;
    readonly authToken: string | null;
    readonly selectedChannel: Uuid;
}

export interface IChatWindowDispatchProps {
    readonly loadUsers: (authToken: string | null) => void;
    readonly loadChannels: (authToken: string | null) => void;
    readonly loadMessages: (authToken: string | null, channelId: Uuid) => Immutable.List<Uuid>;
}

export class ChatWindow extends React.Component<IChatWindowDispatchProps & IChatWindowStateProps> {
    componentDidMount(): void {
        if (this.props.authToken) {
            this.props.loadUsers(this.props.authToken);
            this.props.loadChannels(this.props.authToken);
            if (this.props.selectedChannel !== undefined) {
                this.props.loadMessages(this.props.authToken, this.props.selectedChannel);
            } else {
                this.props.loadMessages(this.props.authToken, 'b384ca47-52dd-46ad-ab31-db52ed4ef776');
            }
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
