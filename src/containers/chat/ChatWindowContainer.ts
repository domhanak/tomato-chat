import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../../common/IState';
import {ChatWindow, IChatWindowDispatchProps, IChatWindowStateProps} from '../../components/chat/ChatWindow';
import {loadUsers} from '../../actions/users/loadUsers';
import {loadChannels} from '../../actions/channel/loadChannels';
import {loadMessages} from '../../actions/message/loadMessages';


const mapStateToProps = (state: IState) => {
    return {
        isEditing: state.tomatoApp.isEditing,
        isTyping: state.tomatoApp.isTyping,
        selectedChannel: state.tomatoApp.channels.allChannelIds.first(),
        authToken: state.tomatoApp.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadUsers: (authToken: string | null) => loadUsers(authToken)(dispatch),
        loadChannels: (authToken: string | null) => loadChannels(authToken)(dispatch),
        loadMessages: (authToken: string | null, channelId: Uuid) => loadMessages(authToken, channelId)(dispatch),
    };
};

export const ChatWindowContainer = connect<IChatWindowStateProps, IChatWindowDispatchProps>(mapStateToProps, mapDispatchToProps)(ChatWindow);
