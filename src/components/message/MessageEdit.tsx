import * as React from 'react';
import {IMessage} from '../../models/IMessage';

interface IProps {
    readonly message: IMessage;
    readonly onSave: (text: string) => void;
    readonly onCancel: () => void;
}

interface IState {
    readonly value: string;
}

export class MessageEdit extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: props.message.value,
        };
    }

    private onSave = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.onSave(this.state.value);

        this.setState(_ => ({ value: '' }));
    };

    private onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ value }));
    };
    render(): JSX.Element {
        const { onCancel } = this.props;
        return (
            <form onSubmit={this.onSave}>
                <input
                    value={this.state.value}
                    onChange={this.onValueChanged}
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
            </form>

        );
    }
}
