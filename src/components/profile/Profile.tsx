import * as React from 'react';
import {IUser} from '../../models/IUser';
import {IUserServerModel} from '../../models/IUserServerModel';



export interface IProfileStateProps {
    readonly user: IUser | null;
    readonly authToken: AuthToken;
}

export interface IProfileDispatchProps {
    readonly updateUserProfile: (authToken: AuthToken, user: IUserServerModel, avatar: FileType) => void;
}

interface IState {
    readonly nickname: string;
    readonly avatar: FileType;
}

export class Profile extends React.Component<IProfileStateProps & IProfileDispatchProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            nickname: this.props.user!.nickname,
            avatar: null,
        };
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.state.nickname || !this.state.nickname.trim() || !this.state.avatar) {
            return;
        }

        const updatedUser: IUserServerModel = {email: this.props.user!.email,
            customData: {selectedChannel: this.props.user!.selectedChannel, nickname: this.state.nickname,
                channels: this.props.user!.channels, id: this.props.user!.id, avatarId: ''}};

        console.log(this.state.avatar);
        this.props.updateUserProfile(this.props.authToken, updatedUser, this.state.avatar);
    }

    avatarUpdate = (event: any) => {
        event.persist();
        console.log(event.target.files[0]);
        this.setState((_) => ({
            avatar: event.target.files[0]
        }));
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
                        {/*<img alt="avatar" className="img-circle special-img" src="https://pv247messaging.blob.core.windows.net/files/9ce79615-fe56-43f4-832d-5be6b11dd93b/snails-logo-notext.png?sv=2018-03-28&sr=b&sig=uv2VU7ly7%2FYfG0Plx4e5wuKn5CmcPFS88QsGXG2A9dc%3D&se=2019-12-22T14%3A14%3A50Z&sp=r" />*/}
                    </div>
                    <div className="profile-avatar-btn row">
                        <input type="file" className="btn btn btn-primary" placeholder="Upload" onChange={this.avatarUpdate}/>
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

