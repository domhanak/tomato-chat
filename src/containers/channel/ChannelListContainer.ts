import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps} from '../../components/channel/ChannelList';
import {List} from 'immutable';
import {IChannel} from '../../models/IChannel';

const mapStateToProps = (state: IState): IChannelListProps => {
    let allChannels = List<IChannel>();
    const loggedUser = state.tomatoApp.loggedUser;

    state.tomatoApp.channels.channelsById.forEach((value: IChannel, _) => {
        if (List(value.users).contains(loggedUser!.id) || value.owner === loggedUser!.id) {
            const index = List(state.tomatoApp.loggedUser!.channels).indexOf(value.id);
            allChannels = allChannels.insert(index, value);
       }
    });

    return {
        allChannels,
        authToken: state.tomatoApp.authToken,
        loggedUser,
        allUsers: state.tomatoApp.users.usersById.toList(),
    };
};

export const ChannelListContainer = connect(mapStateToProps)(ChannelList);
