import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {IMessage} from '../../models/IMessage';
import {createChannel} from '../../actions/channel/createChannel';
import {Channels, IChannelsDispatchProps} from '../../components/channel/Channels';
import {IUser} from '../../models/IUser';


const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, messages: List<IMessage>, users: List<IUser>) => dispatch(createChannel(name, order, messages, users))
    };
};

export const ChannelsContainer = connect(undefined, mapDispatchToProps)(Channels);
