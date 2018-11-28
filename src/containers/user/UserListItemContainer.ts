import { connect } from 'react-redux';
import {IState} from '../../common/IState';
import {IUserListItemStateProps, IUserListItemsProps, UserListItem} from '../../components/channel/UserListItem';

const mapStateToProps = (state: IState, ownProps: IUserListItemsProps) => {
    return {
        user: state.tomatoApp.users.usersById.get(ownProps.userId),
    };
};

export const UserListItemContainer = connect<IUserListItemStateProps, IUserListItemsProps>(mapStateToProps)(UserListItem);
