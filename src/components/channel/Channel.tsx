import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {IChannel} from '../../models/IChannel';
import * as Autocomplete from 'react-autocomplete';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';
import {UserListItemContainer} from '../../containers/user/UserListItemContainer';

export interface IChannelStateProps {
    readonly channel: IChannel;
    // readonly isBeingEdited: boolean;
    readonly allUsers: Immutable.List<IUser>;
}

export interface IChannelOwnProps {
    readonly id: Uuid;
}

export interface IChannelCallBackProps {
    readonly onChannelNameChange: (channelName: string) => void;
    readonly onStartEditing: () => void;
    // readonly onCancelEditing: () => void;
    readonly updateChannelUsers: (users: Immutable.List<Uuid>, userId: Uuid, channels: Immutable.List<Uuid>) => void;
}

interface IState {
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
    };

    onSubmitChannelNameChange = (event: any) => {
       event.preventDefault();
       this.props.onStartEditing();
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
            this.props.onStartEditing();
            const user = this.props.allUsers.find((item: IUser) => { return item.id === this.state.user.id; } );

            if (Immutable.List(user.channels).contains(this.props.channel.id)
                || Immutable.List(this.props.channel.users).contains(this.state.user.id)) {
                return;
            }

            this.props.updateChannelUsers(
                Immutable.List(this.props.channel.users).push(this.state.user.id),
                this.state.user.id,
                Immutable.List(user.channels).push(this.props.channel.id));

            this.setState(() => ({
                user: {} as IUser,
                userName: ''
            }));
        }
    }

    getItemValue = (item: IUser) => {
        return `${item.nickname}`;
    }

    onSelect = (_: string, item: IUser) => {
        this.setState((__) => ({
            userName: item.nickname,
            user: item}));

        return item;
    }

    renderMenu = (children: any) => {
        return (
          <div className="autocomplete-menu">
              {children}
          </div>
        );
    }

    renderItem = (item: IUser, isHighlighted: boolean) => {
        return (
            <div className="autocomplete-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id}>
                {item.nickname}
            </div>
        );
    }

    onChange = (event: any) => {
        event.persist();
        this.setState(_ => ({
            userName: event.target.value
        }));
    }

    // todo styling channels, autocomplete

    render(): JSX.Element {
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
                        {this.props.channel.users  && Immutable.List(this.props.channel.users).map((id: Uuid) => (
                            <UserListItemContainer key={id} isHighlighted={false} userId={id} onUserRemove={this.onUserRemove} />))}
                    </ul>
                    <form onSubmit={this.addParticipant}>
                        <FormGroup className="autocomplete">
                            <ControlLabel> New participant </ControlLabel>
                            <Autocomplete
                                getItemValue={this.getItemValue}
                                items={this.props.allUsers.filter((user: IUser) => { return user.id !== this.props.channel.owner; }).toArray()}
                                renderMenu={this.renderMenu}
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
