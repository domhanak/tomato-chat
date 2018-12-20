import { connect } from 'react-redux';
import {IMessageListProps, MessageList} from '../../components/message/MessageList';
import {IState} from '../../common/IState';

const mapStateToProps = (state: IState): IMessageListProps => {
    return {
        messageIds: state.tomatoApp.messages.allMessagesByIds,
    };
};

export const MessageListContainer = connect(mapStateToProps)(MessageList);
