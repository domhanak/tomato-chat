import * as React from 'react';

export class Profile extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            avatar: ''
        };
    }

    onSubmit = () => {
        return;
    }

    avatarUpdate = () => {
        return;
    }

    nameChanged = () => {
        return;
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
                        <input type="text" className="form-control" id="name" defaultValue="Name" onChange={this.nameChanged}/>
                    </div>
                    <div className="profile-email row">
                        <h4>E-mail</h4>
                    </div>
                    <div className="profile-submit-btn row">
                        <input className="btn btn-success" type="submit"/>
                    </div>
                </div>

            </form>
        );
    }
}

