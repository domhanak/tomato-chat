import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {IChannel} from '../../models/IChannel';
import * as Autocomplete from 'react-autocomplete';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';
import {UserListItemContainer} from '../../containers/user/UserListItemContainer';

export interface IChannelStateProps {
    readonly channel: IChannel;
    readonly isBeingEdited: boolean;
    readonly allUsers: Immutable.List<IUser>;
}

export interface IChannelOwnProps {
    readonly id: Uuid;
}

export interface IChannelCallBackProps {
    readonly onChannelNameChange: (channelName: string) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
    readonly updateChannelUsers: (users: Immutable.List<Uuid>, userId: Uuid, channels: Immutable.List<Uuid>) => void;
}

export interface IState {
    readonly channelName: string;
    readonly user: IUser;
    readonly userName: string;
}

type IProps = IChannelOwnProps & IChannelStateProps & IChannelCallBackProps;

export class Channel extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            channelName: this.props.channel.name,
            user: {} as IUser,
            userName: '',
        };
    }

    handleChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ channelName: value }));
        this.props.onStartEditing();
    };

    onSubmitChannelNameChange = (event: any) => {
       event.preventDefault();
       this.props.onChannelNameChange(this.state.channelName);
    };

    onUserRemove = (userId: Uuid) => {
        const filteredUsers = this.props.channel.users.filter(id => { return id !== userId; } );

        const user = this.props.allUsers.find((item: IUser) => { return item.id !== userId; } );
        const filteredChannels = user!.channels.filter(id => { return id !== this.props.channel.id; } );

        this.props.updateChannelUsers(
            Immutable.List(filteredUsers),
            this.state.user.id,
            Immutable.List(filteredChannels));
    }

    addParticipant = (event: any) => {
        event.preventDefault();
        if (this.state.user.id !== undefined) {

            const user = this.props.allUsers.find((item: IUser) => { return item.id !== this.state.user.id; } );

            if (user.channels.contains(this.props.channel.id) || this.props.channel.users.contains(this.state.user.id)) {
                return;
            }

            user.channels.push(this.props.channel.id);
            this.props.updateChannelUsers(
                this.props.channel.users.push(this.state.user.id),
                this.state.user.id,
                Immutable.List(user.channels));

            this.setState(() => ({
                user: {} as IUser
            }));
        }
    }

    getItemValue = (item: IUser) => {
        return `${item.nickname}`;
    }

    onSelect = (_: string, item: IUser) => {
        this.setState((__) => ({user: item}));
        return item;
    }

    renderItem = (item: IUser, isHighlighted: boolean) => {
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id}>
                {item.nickname}<br />
            </div>
        );
    }

    onChange = (event: any) => {
        event.persist();
        this.setState(_ => ({
            userName: event.target.value
        }));
    }

    // todo style autocomplete

    render(): JSX.Element {
        const isList = true;
        return (
            <div className="channel">
                <form onSubmit={this.onSubmitChannelNameChange}>
                    <FormGroup>
                        <ControlLabel>{this.props.channel.name}</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.channelName}
                            placeholder="Channel name"
                            onChange={this.handleChannelNameChange}
                        />
                    </FormGroup>
                </form>
                <div className="participants">
                    <h4>Participants</h4>
                    <ul>
                        {this.props.channel.users  && this.props.channel.users.map((id: Uuid) => (
                            <UserListItemContainer key={id} isHighlighted={false} isList={isList} userId={id} onUserRemove={this.onUserRemove} />))}
                    </ul>
                    <form onSubmit={this.addParticipant}>
                        <FormGroup>
                            <ControlLabel> New participant </ControlLabel>
                            <Autocomplete
                                getItemValue={this.getItemValue}
                                items={this.props.allUsers.filter((user: IUser) => { return user.id !== this.props.channel.owner; }).toArray()}
                                renderItem={this.renderItem}
                                value={this.state.userName}
                                onSelect={this.onSelect}
                                onChange={this.onChange}
                            />
                            <button type="submit" className="glyphicon glyphicon-plus" />
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}
