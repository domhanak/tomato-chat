import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageListContainer} from '../../containers/message/MessageListContainer';
import {ChannelsContainer} from '../../containers/channel/ChannelsContainer';
import {MessageFormContainer} from '../../containers/message/MessageFormContainer';

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
            this.props.loadMessages(this.props.authToken, this.props.selectedChannel);
        }
    }

    componentDidUpdate(): void {
        if (this.props.authToken) {
            this.props.loadMessages(this.props.authToken, this.props.selectedChannel);
        }
    }
    render(): JSX.Element {

        return (
            <div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="channel-container">
                        <ChannelsContainer />
                    </div>
                </div>
                <div>
                    <div className="message-container">
                        <MessageListContainer />
                    </div>
                    <div>
                        <MessageFormContainer />
                    </div>
                </div>
            </div>
        );
    }
}
