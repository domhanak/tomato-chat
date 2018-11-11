import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {IState} from '../../common/IState';
import {IChannelCallBackProps, IChannelOwnProps, IChannelStateProps, Channel} from '../../components/channel/Channel';
import {cancelEditingChannel, startEditingChannel} from '../../actions/actionCreators';
import {updateChannel} from '../../actions/channel/updateChannel';

const mapStateToProps = (state: IState, ownProps: IChannelOwnProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedChannelId === ownProps.id,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelOwnProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingChannel(ownProps.id)),
        onChannelNameChange: (channelName: string) => dispatch(updateChannel(ownProps.id, channelName)),
    };
};

export const ChannelContainer = connect<IChannelStateProps, IChannelCallBackProps, IChannelOwnProps>(mapStateToProps, mapDispatchToProps)(Channel);
