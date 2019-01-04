import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {Editor} from 'react-draft-wysiwyg';
import {
    convertFromRaw,
    EditorState,
} from 'draft-js';

interface IProps {
    readonly message: IMessage;
    readonly onClick?: () => void;
}

export class MessageDisplay extends React.PureComponent<IProps> {

    messageContent = (): EditorState => {
        const { value } = this.props.message;
        if (value) {
            const contentState = convertFromRaw(value);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
        return EditorState.createEmpty();
    };

    render(): JSX.Element {

        const { message, onClick} = this.props;

        return (
            <>
                <div className="received-message" onClick={onClick} >
                    <Editor
                        readonly
                        editorState={this.messageContent()}
                        toolbarClassName="editor-without-toolbar"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                    />
                    <a>
                        <span className="time-date">
                        <span>{new Date(message.createdAt.toLocaleString()).toLocaleDateString()}</span>
                        <span>{new Date(message.createdAt.toLocaleString()).toLocaleTimeString()}</span>
                        </span>
                    </a>
                </div>
            </>
        );
    }
}

