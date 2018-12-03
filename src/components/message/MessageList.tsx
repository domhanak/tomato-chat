import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageContainer} from '../../containers/message/MessageContainer';

export interface IMessageListProps {
    readonly messageIds: Immutable.List<Uuid>;
}

export class MessageList extends React.PureComponent<IMessageListProps> {
    render(): JSX.Element {
        return (
            <div className="message-list list-group" >
                {
                    this.props.messageIds.map((id: Uuid, index: number) => {
                            return (
                                <div key={id} className="list-group-item">
                                    <MessageContainer
                                        key={id}
                                        id={id}
                                        index={index + 1}
                                    />
                                </div>
                            );
                        }
                    )
                }
            </div>
        );
    }
}
