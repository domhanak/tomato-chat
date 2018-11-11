import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
// import {List} from 'immutable';
// import * as PropTypes from 'prop-types';
import {IChannel} from '../../models/IChannel';


export interface IChannelStateProps {
    readonly channel: IChannel;
    readonly isBeingEdited: boolean;
    // readonly newParticipantName: string;
    // readonly participants: List<Uuid>;
}

export interface IChannelOwnProps {
    readonly id: Uuid;
}

export interface IChannelCallBackProps {
    readonly onChannelNameChange: (channelName: string) => void;
    // readonly onParticipantNameChange: (participantName: string) => void;
    readonly onStartEditing: () => void;
    readonly onCancelEditing: () => void;
}

export interface IState {}

type IProps = IChannelOwnProps & IChannelStateProps & IChannelCallBackProps;

export class Channel extends React.PureComponent<IProps, IState> {

    handleChannelNameChange = (event: any) => {
        this.props.onChannelNameChange(event.target.value);
    };

    onSubmit = (event: any) => {
       event.preventDefault();
    };

    render(): JSX.Element {
        return (
            <div className="channel">
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <ControlLabel>{this.props.channel.name}</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.channel.name}
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
