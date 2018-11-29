import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {IMessage} from '../../models/IMessage';
import {createChannel} from '../../actions/channel/createChannel';
import {Channels, IChannelsDispatchProps, IChannelsStateProps} from '../../components/channel/Channels';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';

const mapStateToProps = (state: IState): IChannelsStateProps => {
    return {
        loggedUser: state.tomatoApp.users.usersById.find((user: IUser) => (user.id === state.tomatoApp.userId))
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, messages: List<IMessage>, users: List<Uuid>, owner: Uuid) => dispatch(createChannel(name, order, messages, users, owner))
    };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
