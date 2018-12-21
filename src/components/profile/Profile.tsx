import * as React from 'react';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';



export interface IProfileStateProps {
    readonly user: IUser | null;
    readonly authToken: AuthToken;
}

export interface IProfileDispatchProps {
    readonly updateUserProfile: (authToken: AuthToken, user: IUserServerModel) => void;
}

interface IState {
    readonly nickname: string;
}

export class Profile extends React.Component<IProfileStateProps & IProfileDispatchProps, IState> {
    constructor(props: any) {
        super(props);
        console.log(this.props.user!.nickname);
        this.state = {
            nickname: this.props.user!.nickname,
        };
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.state.nickname || !this.state.nickname.trim()) {
            return;
        }

        const updatedUser: IUserServerModel = {email: this.props.user!.email,
            customData: {selectedChannel: this.props.user!.selectedChannel, nickname: this.state.nickname,
                channels: this.props.user!.channels, id: this.props.user!.id}};

        this.props.updateUserProfile(this.props.authToken, updatedUser);
    }

    avatarUpdate = () => {
        return;
    }

    nameChanged = (event: any) => {
        event.persist();
        event.preventDefault();
        this.setState((_) => ({nickname: event.target.value}));
    }

    render(): JSX.Element {
        return (
            <form className="profile-view container" onSubmit={this.onSubmit}>
                <div className="avatar col-lg-4 col-md-6 col-sm-6">
                    <div className="row">
                        <img src="http://placehold.it/200x200" alt="avatar" className="img-circle special-img"/>
                    </div>
                    <div className="profile-avatar-btn row">
                        <a className="btn btn btn-primary" onClick={this.avatarUpdate} >Upload</a>
                    </div>
                </div>
                <div className="profile-info col-lg-5 col-md-10 col-sm-10">
                    <div className="profile-name row">
                        <input type="text" value={this.state.nickname} className="form-control" id="name" placeholder="Name" onChange={this.nameChanged}/>
                    </div>
                    <div className="profile-email row">
                        <h4>{this.props.user!.email}</h4>
                    </div>
                    <div className="profile-submit-btn row">
                        <input className="btn btn-success" type="submit"/>
                    </div>
                </div>

            </form>
        );
    }
}

