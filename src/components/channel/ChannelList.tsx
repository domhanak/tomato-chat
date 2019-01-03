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

interface IState {
    readonly value: string;
}

export class ChannelList extends React.Component<IChannelListProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
        };
    }

    render(): JSX.Element {
        return (
            <div className="channel-list">
                <ul className="list-group">
                    {this.props.allChannels && this.props.allChannels
                        .map((channel: IChannel) => (
                        <ChannelListItemContainer key={channel.id} id={channel.id} ownerId={channel.owner}/>
                    ))}
                </ul>
            </div>
        );
    }
}
