import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageContainer} from '../../containers/message/MessageContainer';

export interface IMessageListProps {
    readonly messageIds: Immutable.List<Uuid>;
}

export class MessageList extends React.PureComponent<IMessageListProps> {

    private messageListRef = React.createRef<HTMLDivElement>();
    private listShouldAutoScroll: boolean = true;

    componentDidMount(): void {
        window.onload = () => {
            this.messageListRef.current!.scrollTop = this.messageListRef.current!.scrollHeight;
        };
    }

    componentDidUpdate(): void {
        if (this.listShouldAutoScroll) {
            this.messageListRef.current!.scrollTop = this.messageListRef.current!.scrollHeight;
        }
    }

    private handleScroll = () => {
        const scroll = Math.round(this.messageListRef.current!.scrollTop + this.messageListRef.current!.offsetHeight);
        const scrollHeight =  Math.round(this.messageListRef.current!.scrollHeight);
        this.listShouldAutoScroll = (scroll === scrollHeight);
    };

    render(): JSX.Element {
        return (
            <div className="message-list" ref={this.messageListRef} onScroll={this.handleScroll} >
                {this.props.messageIds.isEmpty() ?
                    <span>No messages in this channel! Be the first!</span> :
                    (
                        this.props.messageIds && this.props.messageIds.map((id: Uuid, index: number) => {
                            return (
                                <MessageContainer
                                    key={id}
                                    id={id}
                                    index={index + 1}
                                />
                            );
                        })
                    )
                }
            </div>
        );
    }
}
