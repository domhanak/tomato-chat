import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {List} from 'immutable';
import {IMessage} from '../models/IMessage';
import {createChannel} from '../actions/createChannel';
import {Channels, IChannelsDispatchProps} from '../components/channel/Channels';


const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
    return {
        onChannelAdd: (name: string, order: number, messages: List<IMessage>) => dispatch(createChannel(name, order, messages))
    };
};

export const ChannelsContainer = connect(undefined, mapDispatchToProps)(Channels);
