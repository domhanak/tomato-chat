import * as React from 'react';

export class MessageForm extends React.PureComponent {
    constructor(props: any) {
        super(props);
    }
    render(): JSX.Element {
        return (
            <div className="form-group">
                <label htmlFor="message"> Message </label>
                <textarea className="form-control" id="message" rows={3}/>
            </div>
        );
    }
}
