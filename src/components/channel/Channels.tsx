import * as React from 'react';
import {List} from 'immutable';
import {ChannelListContainer} from '../../containers/ChannelListContainer';
import {IMessage} from '../../models/IMessage';

export interface IChannelsDispatchProps {
    readonly onChannelAdd: (name: string, order: number, messages: List<IMessage>) => void;
}

interface IState {
    readonly value: string;
}

export class Channels extends React.Component<IChannelsDispatchProps, IState> {

    constructor(props: IChannelsDispatchProps) {
        super(props);

        this.state = {
            value: '',
        };
    }

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        this.props.onChannelAdd(this.state.value, 0, List());

        this.setState(_ => ({ value: '' }));
    };

    handleNewChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ value }));
    };

    render(): JSX.Element {
        return (
            <div className="channels">
                <header>
                    <h4>Channels</h4>
                </header>
                <ChannelListContainer />
                <div className="channel-creation">
                    <form onSubmit={this.handleChannelCreation}>
                        <input
                            value={this.state.value}
                            onChange={this.handleNewChannelNameChange}
                            placeholder="New Channel" />
                    </form>
                </div>
            </div>
        );
    }
}
