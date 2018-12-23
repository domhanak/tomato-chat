import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {createChannel} from '../../actions/channel/createChannel';
import {Channels, IChannelsDispatchProps, IChannelsStateProps} from '../../components/channel/Channels';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
import {updateUser} from '../../actions/users/updateUser';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {getStoredData, clearStorage} from '../../common/utils/utilFunctions';
import {IUserServerModel} from '../../models/IUserServerModel';

const mapStateToProps = (state: IState): IChannelsStateProps => {
    return {
        loggedUser: state.tomatoApp.loggedUser,
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, user: IUser | null, authToken: AuthToken) => {
            const owner = user!.id;
            createChannel(authToken, {name,
                customData: {name, order, messages: List(), users: List(), owner}} as IChannelServerModel)(dispatch);
            const channelId: string = getStoredData('channelId') as string;
            const selectedChannel: Uuid = List(user!.channels).count() === 0 ? channelId : user!.selectedChannel;
            updateUser(authToken,
                {email: user!.email, customData: {...user!, channels: List(user!.channels)
                            .push(channelId), selectedChannel}} as IUserServerModel)(dispatch);
            clearStorage('channelId');
        }
    };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
