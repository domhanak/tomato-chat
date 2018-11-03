import * as React from 'react';
import * as PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import {IMessage} from '../../models/IMessage';

interface IMessageFormDataProps {
    readonly username: string;
    readonly message: string;
}

interface IMessageFormCallbackProps {
    readonly onSend: (message: IMessage) => void;
    readonly onMessageChange: (message: string) => void;
}
const uuidv4 = require('uuid/v4');

export class MessageForm extends React.PureComponent<IMessageFormDataProps & IMessageFormCallbackProps> {
    static propTypes = {
        onSend: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired,
        onMessageChange: PropTypes.func.isRequired,
    };

    handleMessageChange = (event: any) => {
        this.props.onMessageChange(event.target.value);
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        if (event.target.value === null || event.target.value === '') {
            return;
        }
        this.props.onSend({
            id: uuidv4(),
            from: 'Anonym',
            text: event.target.value,
        });
    };
    render(): JSX.Element {
        return (
                <form className="message-form">
                    <FormGroup controlId="formBasicText">
                        <ControlLabel> Message </ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={this.props.message}
                            placeholder="Click here to start typing..."
                            onChange={this.handleMessageChange}
                        />
                    </FormGroup>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        value={this.props.message}
                        onClick={this.handleSubmit}
                    >
                        Send
                    </button>
                </form>
        );
    }
}
