import * as React from 'react';
import '../styles/App.scss';

export interface IMessageOwnProps {
    readonly id: Uuid;
    readonly text: string;
}

export interface IMessageStateProps {
    readonly id: Uuid;
    readonly text: string;
    readonly from: string;
}

export interface IMessageDispatchProps {
}

type IProps = IMessageOwnProps & IMessageStateProps & IMessageDispatchProps;

interface IState {
    readonly isExpanded: boolean;
}

export class Message extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { id, from, text } = this.props;
        return (
            <div key={id} id="message-container" className={`message`}>
                <div className="row">
                    <div className="message">
                        <hr className="hr"/>
                        <div className="message-author">
                            {from}
                        </div>
                        <hr className="hr"/>
                        <div className="message-text">
                            {text}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
