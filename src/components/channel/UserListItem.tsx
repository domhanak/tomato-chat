import * as React from 'react';
import {IUser} from '../../models/IUser';

interface IUserListItemsProps {
    readonly user: IUser;
    readonly key: Uuid;
    readonly onUserRemove: (user: IUser) => void;
}

export class UserListItem extends React.Component<IUserListItemsProps> {

    handleUserRemove = (event: any) => {
        event.preventDefault();
        this.props.onUserRemove(this.props.user);
    }

    render(): JSX.Element {
        return (
            <li>
                <h6>{this.props.user.nickname}</h6>
                <a onClick={this.handleUserRemove} className="glyphicon glyphicon-minus"/>
            </li>

        );
    }
}
