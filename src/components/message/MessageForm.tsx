import * as React from 'react';
import { IUser } from '../../models/IUser';
import {IMessageServerModel} from '../../models/IMessageServerModel';

export interface IMessageFormStateProps {

}

export interface IMessageFormOwnProps {
    readonly loggedUser: IUser;
    readonly authToken: AuthToken;
    readonly selectedChannel: Uuid;
}

export interface IMessageFormDispatchProps {
    readonly onMessageAdd: (message: IMessageServerModel, channelId: Uuid, authToken: AuthToken) => void;
}

interface IState {
    readonly value: string;
}

type IProps = IMessageFormDispatchProps & IMessageFormOwnProps & IMessageFormStateProps;

export class MessageForm extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: '',
        };
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newMessage = {
            value: this.state.value,
            customData: {}
        };

        this.props.onMessageAdd(newMessage, this.props.selectedChannel, this.props.authToken);

        this.setState(_ => ({ value: '' }));
    };

    private onValueChanged = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ value }));
    };

    render(): JSX.Element {
        return (
                <div className="message-input rounded">
                        <input
                            type="textarea"
                            value={this.state.value}
                            placeholder="Click here to start typing..."
                            onChange={this.onValueChanged}
                        />
                        <button
                            type="submit"
                            className="message-input-button btn btn-success"
                            value={this.state.value}
                            onClick={this.onSubmit}
                        >
                            Send
                        </button>
                </div>
        );
    }
}
