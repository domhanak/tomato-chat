import * as React from 'react';
import { IUser } from '../../models/IUser';

export interface IMessageFormStateProps {

}

export interface IMessageFormOwnProps {
    readonly loggedUser: IUser;
}

export interface IMessageFormDispatchProps {
    readonly onMessageAdd: (text: string, from: Uuid) => void;
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

        this.props.onMessageAdd(this.state.value, this.props.loggedUser.id);

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
