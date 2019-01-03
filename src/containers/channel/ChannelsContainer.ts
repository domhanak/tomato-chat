import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {createChannel} from '../../actions/channel/createChannel';
import {Channels, IChannelsDispatchProps, IChannelsStateProps} from '../../components/channel/Channels';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
import {IChannelServerModel} from '../../models/IChannelServerModel';
import {IUserServerModel} from '../../models/IUserServerModel';

const mapStateToProps = (state: IState): IChannelsStateProps => {
    const loggedUser = state.tomatoApp.loggedUser;
    const nextOrder = 0;
    return {
        loggedUser,
        authToken: state.tomatoApp.authToken,
        nextOrder,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, user: IUser | null, authToken: AuthToken) => {
            const owner = user!.id;
            const userToUpdate: IUserServerModel = {email: user!.email, customData: {...user!}} as IUserServerModel;
            createChannel(authToken, {name,
                customData: {name, order, messages: List(), users: List(), owner}} as IChannelServerModel, userToUpdate)(dispatch);
        }
    };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
