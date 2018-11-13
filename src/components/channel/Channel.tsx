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
}

export interface IState {
    readonly channelName: string;
    readonly userNickname: string;
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
            userNickname: '',
            notAssignedUsers: this.props.allUsers.toArray(),
        };

        console.log(this.props.allUsers.toArray());
    }

    handleChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ channelName: value }));
    };

    onSubmit = (event: any) => {
       event.preventDefault();
       this.props.onChannelNameChange(this.state.channelName);
    };


    removeParticipant = () => {
        return;
    }

    addParticipant = (event: any) => {
        event.preventDefault();
        return;
    }

    onNewParticipantNameChange = () => {
        return;
    }

    getItemValue = (item: IUser) => {
        this.setState((_) => ({userNickname: item.nickname}))
        return `${item.id}`;
    }

    onSelect = (value: string) => {
        return value;
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
                       <li>
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
                                value={this.state.userNickname}
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
