import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
// import {List} from 'immutable';
import * as PropTypes from 'prop-types';
// import {IChannel} from '../../models/IChannel';

interface IChannelStateProps {
    readonly channelName: string;
    readonly id: string;
    // readonly newParticipantName: string;
    // readonly participants: List<Uuid>;
}

interface IChannelCallBackProps {
     readonly onChannelNameChange: (channelName: string, id: string) => void;
    // readonly onParticipantNameChange: (participantName: string) => void;
}

export class Channel extends React.Component<IChannelStateProps & IChannelCallBackProps> {

    static propTypes = {
        channelName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    };

    handleChannelNameChange = (event: any) => {
        this.props.onChannelNameChange(event.target.value, this.props.id);
    };

    onSubmit = (event: any) => {
       event.preventDefault();
    };

    render(): JSX.Element {
        return (
            <div className="channel">
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <ControlLabel>{this.props.channelName}</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.channelName}
                            placeholder="Channel name"
                            onChange={this.handleChannelNameChange}
                        />
                    </FormGroup>
                </form>
                {/*<div className="participants">*/}
                    {/*<h4>Participants</h4>*/}
                    {/*<ul>*/}
                       {/*<li><h6>Participant name </h6><a onClick={this.removeParticipant} className="glyphicon glyphicon-minus"/></li>*/}
                    {/*</ul>*/}
                    {/*<form onSubmit={this.addParticipant}>*/}
                        {/*<FormGroup>*/}
                            {/*<ControlLabel> New participant </ControlLabel>*/}
                            {/*<FormControl*/}
                                {/*type="text"*/}
                                {/*value={this.props.newParticipantName}*/}
                                {/*placeholder="Participant name"*/}
                                {/*onChange={this.onNewParticipantNameChange}*/}
                            {/*/>*/}
                        {/*</FormGroup>*/}
                    {/*</form>*/}
                {/*</div>*/}
            </div>
        );
    }
}
