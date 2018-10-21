import * as React from 'react';
import * as PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import {IMessage} from '../models/IMessage';


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
        this.props.onSend({
            id: uuidv4(),
            from: this.props.username,
            text: event.target.value,
        });
    };
    render(): JSX.Element {
        return (
                <form>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel> Message </ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={this.props.message}
                            placeholder="Start typing..."
                            onChange={this.handleMessageChange}
                        />
                    </FormGroup>
                    <button
                        type="submit"
                        value={this.props.message}
                        onClick={this.handleSubmit}
                    >
                        Send
                    </button>
                </form>
        );
    }
}
