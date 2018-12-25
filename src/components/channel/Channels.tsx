import * as React from 'react';
import {List} from 'immutable';
import {ChannelListContainer} from '../../containers/channel/ChannelListContainer';
import {IUser} from '../../models/IUser';

export interface IChannelsStateProps {
    readonly loggedUser: IUser | null;
    readonly authToken: AuthToken;
}

export interface IChannelsDispatchProps {
    readonly onChannelAdd: (name: string, order: number, user: IUser | null, authToken: AuthToken) => void;
}

interface IState {
    readonly value: string;
    readonly nextOrder: number;
}

export class Channels extends React.Component<IChannelsStateProps & IChannelsDispatchProps, IState> {

    constructor(props: any) {
        super(props);
        console.log(List(this.props.loggedUser!.channels).count());
        this.state = {
            value: '',
            nextOrder: List(this.props.loggedUser!.channels).count(),
        };
    }

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        console.log(this.state.nextOrder + 1);
        // this.props.onChannelAdd(this.state.value, this.state.nextOrder, this.props.loggedUser, this.props.authToken);
        this.setState(prevState => ({ value: '', nextOrder: prevState.nextOrder + 1 }));
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
