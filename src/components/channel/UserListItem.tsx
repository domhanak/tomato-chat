import * as React from 'react';
import {IUser} from '../../models/IUser';

export interface IUserListItemStateProps {
    readonly user: IUser;
}

export interface IUserListItemsProps {
    readonly userId: Uuid;
    readonly key: Uuid;
    readonly isHighlighted: boolean;
    readonly isList: boolean;
}

interface IUserListItemsUserRemove {
    readonly onUserRemove: (userId: Uuid) => void;
}

export class UserListItem extends React.Component<IUserListItemStateProps & IUserListItemsProps & IUserListItemsUserRemove> {

    handleUserRemove = (event: any) => {
        event.preventDefault();
        this.props.onUserRemove(this.props.userId);
    }

    render(): JSX.Element {
        return (
            <li key={this.props.user.id}>
                <h6>{this.props.user.nickname}</h6>
                <a onClick={this.handleUserRemove} className="glyphicon glyphicon-minus"/>
            </li>
        );
    }
}
