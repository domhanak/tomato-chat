import * as React from 'react';
import {IMessage} from '../../models/IMessage';
import {Editor} from 'react-draft-wysiwyg';
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from 'draft-js';

interface IProps {
    readonly message: IMessage;
    readonly onSave: (text: RawDraftContentState) => void;
    readonly onCancel: () => void;
}

interface IState {
    readonly value: string;
    readonly editorState: EditorState;
}

export class MessageEdit extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: JSON.stringify(this.props.message.value),
            editorState: this.messageContent(),
        };
    }

    private onEditorStateChange = (editorState: EditorState) => {
        this.setState({
            editorState,
        });
    };

    private onSave = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const hasText = !!rawContent.blocks[0].text;
        if (hasText) {
            this.props.onSave(rawContent);
        }
    };

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
        const { onCancel } = this.props;
        return (
            <form onSubmit={this.onSave}>
                <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarClassName="toolbar-editor"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
            </form>

        );
    }
}
