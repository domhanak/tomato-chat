import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {ChannelList, IChannelListProps} from '../../components/channel/ChannelList';
import * as Immutable from 'immutable';
import {IChannel} from '../../models/IChannel';

const mapStateToProps = (state: IState): IChannelListProps => {
    let allChannels = Immutable.List<IChannel>();
    const loggedUser = state.tomatoApp.loggedUser;

    if (loggedUser!.channels) {
        loggedUser!.channels.forEach((item: Uuid) => {
            allChannels = allChannels.push(state.tomatoApp.channels.channelsById.get(item));
        });
    }

    // state.tomatoApp.channels.channelsById.forEach((value: IChannel, _) => {
    //     if (Immutable.List(value.users).contains(loggedUser!.id) || value.owner === loggedUser!.id) {
    //         allChannels = allChannels.push(value);
    //    }
    // });

    return {
        allChannels,
        authToken: state.tomatoApp.authToken,
        loggedUser,
        allUsers: state.tomatoApp.users.usersById.toList(),
    };
};

export const ChannelListContainer = connect(mapStateToProps)(ChannelList);
