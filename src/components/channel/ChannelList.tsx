import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItem} from './ChannelListItem';

export interface IChannelListProps {
    readonly channels: Immutable.List<IChannel>;
}

export class ChannelList extends React.Component<IChannelListProps> {
    onMoveUp = (channel: IChannel) => {
        console.log(channel);
    };

    onMoveDown = (channel: IChannel) => {
        console.log(channel);
    };

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul>
                    {this.props.channels && this.props.channels.map(channel => (
                        <ChannelListItem key={channel!.id} channel={channel!} onMoveDown={this.onMoveDown} onMoveUp={this.onMoveUp} />
                    ))}
                </ul>
            </div>
        );
    }
}
