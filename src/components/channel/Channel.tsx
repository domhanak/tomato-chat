import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {IChannel} from '../../models/IChannel';
import * as Autocomplete from 'react-autocomplete';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';

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
    readonly updateChannelUsers: (users: Immutable.List<IUser>) => void;
}

export interface IState {
    readonly channelName: string;
    readonly user: IUser;
    readonly notAssignedUsers: IUser[];
}

type IProps = IChannelOwnProps & IChannelStateProps & IChannelCallBackProps;

// todo - editing name of channel
// todo - adding/removing channel
// todo - changing order of channel
// todo - SASS my ass up

export class Channel extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            channelName: this.props.channel.name,
            user: {} as IUser,
            notAssignedUsers: this.props.allUsers.filter((user: IUser) => {
                return !this.props.channel.users.includes(user);
            }).toArray(),
        };
    }

    handleChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ channelName: value }));
    };

    onSubmit = (event: any) => {
       event.preventDefault();
       this.props.onChannelNameChange(this.state.channelName);
    };


    removeParticipant = (event: any) => {
        event.preventDefault();
        console.log(event.target.parentElement);
    }

    addParticipant = (event: any) => {
        event.preventDefault();
        if (this.state.user.id !== undefined) {
            this.props.updateChannelUsers(this.props.channel.users.push(this.state.user));
            this.setState((prevState) => ({
                notAssignedUsers: prevState.notAssignedUsers.filter(
                (item: IUser) => { return item.id !== prevState.user.id; }),
                user: {} as IUser
            }));
        }
    }

    getItemValue = (item: IUser) => {
        return `${item}`;
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

    render(): JSX.Element {
        return (
            <div className="channel">
                <form onSubmit={this.onSubmit}>
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
                        {this.props.channel.users && this.props.channel.users.map((user: IUser) => (
                       <li key={user.id}>
                           <h6>{user.nickname}</h6>
                           <a onClick={this.removeParticipant} className="glyphicon glyphicon-minus"/>
                       </li>
                        ))}
                    </ul>
                    <form onSubmit={this.addParticipant}>
                        <FormGroup>
                            <ControlLabel> New participant </ControlLabel>
                            <Autocomplete
                                getItemValue={this.getItemValue}
                                items={this.state.notAssignedUsers}
                                renderItem={this.renderItem}
                                value={this.state.user.nickname}
                                onSelect={this.onSelect}
                            />
                            <button type="submit" className="glyphicon glyphicon-plus" />
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}
