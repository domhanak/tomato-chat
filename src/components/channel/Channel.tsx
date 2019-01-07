import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {IChannel} from '../../models/IChannel';
import * as Immutable from 'immutable';
import {IUser} from '../../models/IUser';
import {UserListItemContainer} from '../../containers/user/UserListItemContainer';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {validateEmail} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';
import * as uuid from 'uuid';

export interface IChannelStateProps {
    readonly channel: IChannel;
    readonly allUsers: Immutable.List<IUser>;
    readonly authToken: AuthToken;
    readonly loggedUser: IUser;
}

export interface IChannelOwnProps {
    readonly id: Uuid;
}

export interface IChannelCallBackProps {
    readonly onChannelNameChange: (channelId: Uuid, channel: IChannelServerModel, authToken: AuthToken) => void;
    readonly onStartEditing: () => void;
    readonly onChannelChange: (channelId: Uuid, channel: IChannelServerModel, authToken: AuthToken) => void;
    readonly onUserRegistration: (authToken: AuthToken, user: IUserServerModel) => void;
}

interface IState {
    readonly channelName: string;
    readonly userEmail: string;
}

type IProps = IChannelOwnProps & IChannelStateProps & IChannelCallBackProps;

export class Channel extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            channelName: this.props.channel.name,
            userEmail: '',
        };
    }

    handleChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ channelName: value }));
    };

    onSubmitChannelNameChange = (event: any) => {
       event.preventDefault();
       this.props.onStartEditing();
       this.props.onChannelNameChange(this.props.channel.id, {name: this.state.channelName, customData: {
               ...this.props.channel, name: this.state.channelName
           }} as IChannelServerModel, this.props.authToken);
    };

    onUserRemove = (userId: Uuid) => {
        if (this.props.channel.owner !== this.props.loggedUser.id) {
            return;
        }

        const filteredUsers = this.props.channel.users.filter(id => { return id !== userId; } );
        const channel: IChannelServerModel = {name: this.props.channel.name, customData: {
                ...this.props.channel, users: Immutable.List(filteredUsers)
            }} as IChannelServerModel;
        this.props.onChannelChange(
            this.props.channel.id,
            channel,
            this.props.authToken);
    };

    addParticipant = (event: any) => {
        event.preventDefault();

        if (!validateEmail(this.state.userEmail)) {
            return;
        }

        this.props.onStartEditing();
        let user = this.props.allUsers.find((item: IUser) => { return item.email === this.state.userEmail; } );

        if (!user) {
            const userServerModel = {email: this.state.userEmail, customData: {id: uuid(), nickname: '',
                                     selectedChannel: this.props.channel.id, avatarId: ''}} as IUserServerModel;
            user = {...userServerModel.customData, email: userServerModel.email, avatarUrl: ''};
            this.props.onUserRegistration(this.props.authToken, userServerModel);
        }

        if (Immutable.List(this.props.channel.users).contains(user.id)) {
            return;
        }

        const channel: IChannelServerModel = {name: this.props.channel.name, customData: {
                ...this.props.channel, users: Immutable.List(this.props.channel.users).push(user.id)
            }} as IChannelServerModel;
        this.props.onChannelChange(
            this.props.channel.id,
            channel,
            this.props.authToken);

        this.setState(() => ({
            userEmail: ''
        }));

    };

    onParticipantEmailChange = (event: any) => {
        event.persist();
        this.setState(_ => ({
            userEmail: event.target.value
        }));
    };

    render(): JSX.Element {
        return (
            <div className="channel">
                <form onSubmit={this.onSubmitChannelNameChange}>
                    <FormGroup className="form-channel-name">
                        <ControlLabel>Change channel name:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.channelName}
                            placeholder="Channel name"
                            onChange={this.handleChannelNameChange}
                        />
                    </FormGroup>
                </form>
                <div className="participants">
                    <h4>Participants:</h4>
                    <ul>
                        {this.props.channel.users  && Immutable.List(this.props.channel.users).map((id: Uuid) => (
                            <UserListItemContainer key={id} isHighlighted={false} userId={id} onUserRemove={this.onUserRemove} />))}
                    </ul>
                    <form>
                        <FormGroup className="autocomplete-form">
                            <ControlLabel> New participant </ControlLabel>
                            <div className="row">
                                <div className="col-8 autocomplete">
                                    <input value={this.state.userEmail} onChange={this.onParticipantEmailChange} placeholder="email@email.com"/>
                                </div>
                                <button onClick={this.addParticipant} type="submit" className="col-1 glyphicon glyphicon-plus" />
                            </div>
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}
