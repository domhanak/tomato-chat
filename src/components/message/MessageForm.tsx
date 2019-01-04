import * as React from 'react';
import { IUser } from '../../models/IUser';
import {IMessageServerModel} from '../../models/IMessageServerModel';
import {Editor} from 'react-draft-wysiwyg';
import '../../styles/react-draft-wysiwyg.css';
import {
    convertToRaw,
    EditorState,
} from 'draft-js';

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
    readonly editorState: EditorState;
}

type IProps = IMessageFormDispatchProps & IMessageFormOwnProps;

/**
 * Message Editor Class
 */
export class MessageForm extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: '',
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount(): any {
        document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    }

    /**
     * Submit the message and send it to server.
     *
     * @param event
     */
    private onSubmit = (): void => {
        const contentState = this.state.editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const hasText = !!rawContent.blocks[0].text;
        if (!hasText) {
            return;
        }

        const newMessage = {
            value: JSON.stringify(rawContent),
            customData: {
                upvotes: 0,
                downvotes: 0,
            }
        };

        this.props.onMessageAdd(newMessage, this.props.selectedChannel, this.props.authToken);

        this.setState(_ => ({
            value: '',
            editorState: EditorState.createEmpty()
        }));
    };

    private onEditorStateChange = (editorState: EditorState) => (this.setState(() => ({ editorState })));

    private onKeyDown(e: KeyboardEvent): void {
        if (document.activeElement.className !== 'MessageEditor__textArea') {
            return;
        }
        if (!e.ctrlKey || e.key !== 'Enter') {
            return;
        }
        this.onSubmit();
    }

    private uploadImageCallback = () => (
        console.log('File callback.')
    );

    public render(): JSX.Element | null {
        return (
            <div className="message-rich-text-input-container">
                <div id="rich-text-editor">
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="message-toolbar"
                        editorClassName="message-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            inline: { inDropdown: true, },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            image: { uploadCallback: this.uploadImageCallback, alt: { present: true, mandatory: true } },
                        }}
                    />
                    <div id="message-submit-button">
                        <button type={'submit'} className={'btn btn-primary message-input-button'}
                                onClick={this.onSubmit}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}
