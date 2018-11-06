import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as PropTypes from 'prop-types';
import {ChannelList} from './ChannelList';

interface IChannelListState {
    readonly newChannelName: string;
    readonly channelList: IChannel[];
}

interface IChannelCallbackProps {
    readonly onChannelCreation: (channel: IChannel) => void;
    readonly onNewChannelNameChange: (channelName: string) => void;
}

export class Channels extends React.Component<IChannelListState & IChannelCallbackProps> {

    static propTypes = {
        onChannelCreation: PropTypes.func.isRequired,
        onNewChannelNameChange: PropTypes.func.isRequired,
        newChannelName: PropTypes.string.isRequired,
        channelList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired,
        })),
    };

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        this.props.onChannelCreation({name: this.props.newChannelName, id: 'xx', order: 4});
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
