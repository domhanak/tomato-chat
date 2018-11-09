import * as React from 'react';
import {MessageListContainer} from "../../containers/MessageListContainer";
import {MessageFormContainer} from "../../containers/MessageFormContainer";

export interface IChatWindowStateProps {
    readonly isTyping: boolean;
    readonly isEditing: boolean;
}

export interface IChatWindowDispatchProps {
    readonly loadUsers: () => void;
}

export class ChatWindow extends React.Component<IChatWindowDispatchProps & IChatWindowStateProps> {
    componentDidMount() {
        this.props.loadUsers();
    }
    render(): JSX.Element {
        return (
            <div id="chat-container">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="channel-container">
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 new-message-container">
                    <div className="message-container">
                        <h4> Channel Name </h4>
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
