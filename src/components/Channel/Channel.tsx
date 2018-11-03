import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {List} from 'immutable';

interface IChannelState {
    readonly channelName: string;
    readonly newParticipantName: string;
    readonly participants: List<Uuid>;
}

export class Channel extends React.Component<{}, IChannelState> {
    constructor(props: any) {
        super(props);

        this.state = {
            channelName: '',
            newParticipantName: '',
            participants: List<Uuid>()
        };
    }

    onSubmit = (event: any) => {
       event.preventDefault();
    };

    onChannelNameChange = (event: any) => {
        this.setState(() => ({channelName: event.target.value }));
    };

    onNewParticipantNameChange = (event: any) => {
        this.setState(() => ({newParticipantName: event.target.value }));
    };

    addParticipant = () => {
        return;
    };

    removeParticipant = () => {
        return;
    };

    render(): JSX.Element {
        return (
            <div className="channel">
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <ControlLabel> Channel name </ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.channelName}
                            placeholder="Channel name"
                            onChange={this.onChannelNameChange}
                        />
                    </FormGroup>
                </form>
                <div className="participants">
                    <h4>Participants</h4>
                    <ul>
                       <li><h6>Participant name </h6><a onClick={this.removeParticipant} className="glyphicon glyphicon-minus"/></li>
                    </ul>
                    <form onSubmit={this.addParticipant}>
                        <FormGroup>
                            <ControlLabel> New participant </ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.newParticipantName}
                                placeholder="Participant name"
                                onChange={this.onNewParticipantNameChange}
                            />
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}
