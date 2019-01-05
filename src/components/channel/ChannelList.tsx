import * as React from 'react';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {ChannelListItemContainer} from '../../containers/channel/ChannelListItemContainer';
import {IUser} from '../../models/IUser';

export interface IChannelListProps {
    readonly allChannels: Immutable.List<IChannel>;
    readonly authToken: AuthToken;
    readonly loggedUser: IUser | null;
    readonly allUsers: Immutable.List<IUser>;
}

export class ChannelList extends React.Component<IChannelListProps> {

    render(): JSX.Element {

        return (
            <div className="channel-list">
                <ul className="list-group">
                    {this.props.allChannels && this.props.allChannels
                        .map((channel: IChannel, index: number) => {
                            return channel ? <ChannelListItemContainer key={index} id={channel.id} ownerId={channel.owner}/> : <div key={index}/>;
                        }
                    )}
                </ul>
            </div>
        );
    }
}
