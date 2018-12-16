import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import {IMessage} from '../../models/IMessage';

export const getInitialKnownMessages = (): Immutable.List<IMessage> => Immutable.List([
    { id: uuid(), from: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8', text: 'Ahojte vsetci.'},
    { id: uuid(), from: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8', text: 'Ahoj, tu Johan.'},
]);
