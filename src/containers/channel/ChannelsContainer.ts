import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {IMessage} from '../../models/IMessage';
import {createChannel} from '../../actions/channel/createChannel';
import {Channels, IChannelsDispatchProps, IChannelsStateProps} from '../../components/channel/Channels';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
import * as uuid from 'uuid';
import {updateUserChannels} from '../../actions/users/updateUser';

const mapStateToProps = (state: IState): IChannelsStateProps => {
    return {
        loggedUser: state.tomatoApp.loggedUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, messages: List<IMessage>, users: List<Uuid>, user: IUser | null) => {
            const channelId = uuid();
            dispatch(updateUserChannels(user!.id, List(user!.channels).push(channelId)));
            dispatch(createChannel(channelId, name, order, messages, users, user!.id));
        }
    };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
