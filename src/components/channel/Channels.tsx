import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import {ChannelList} from './ChannelList';
import {List} from 'immutable';

interface IChannelListState {
    readonly newChannelName: string;
    readonly channelList: IChannel[];
}

interface IChannelCallbackProps {
    readonly onChannelCreation: (channel: IChannel) => void;
    readonly onNewChannelNameChange: (channelName: string) => void;
}

export class Channels extends React.Component<IChannelListState & IChannelCallbackProps> {

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        this.props.onChannelCreation({name: this.props.newChannelName, id: 'xx', order: 4, messages: List()});
    };

    handleNewChannelNameChange = (event: any) => {
        this.props.onNewChannelNameChange(event.target.value);
    };

    render(): JSX.Element {
        return (
            <div className="channels">
                <header>
                    <h4>Channels</h4>
                </header>
                <ChannelList channelList={this.props.channelList} />
                <div className="channel-creation">
                    <form onSubmit={this.handleChannelCreation}>
                        <input
                            value={this.props.newChannelName}
                            onChange={this.handleNewChannelNameChange}
                            placeholder="New Channel" />
                    </form>
                </div>
            </div>
        );
    }
}
