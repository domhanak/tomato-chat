import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {
    IChannelListItemProps,
    IChannelListItemStateProps,
    ChannelListItem,
    IChannelListItemCallBackProps
} from '../../components/channel/ChannelListItem';
import {Dispatch} from 'redux';
import {cancelEditingChannel, startEditingChannel} from '../../actions/actionCreators';

const mapStateToProps = (state: IState, ownProps: IChannelListItemProps) => {
    return {
        channel: state.tomatoApp.channels.channelsById.get(ownProps.id),
        isBeingEdited: state.tomatoApp.editedChannelId === ownProps.id,
        ownerNickname: state.tomatoApp.users.usersById
            .find((_, key: Uuid) => { return key === ownProps.ownerId; }).nickname,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IChannelListItemProps) => {
    return {
        onStartEditing: () => dispatch(startEditingChannel(ownProps.id)),
        onCancelEditing: () => dispatch(cancelEditingChannel(ownProps.id)),
    };
};

export const ChannelListItemContainer = connect<IChannelListItemStateProps, IChannelListItemCallBackProps, IChannelListItemProps>(mapStateToProps, mapDispatchToProps)(ChannelListItem);
