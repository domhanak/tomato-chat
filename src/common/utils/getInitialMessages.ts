import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import {IMessage} from '../../models/IMessage';

export const getInitialKnownMessages = (): Immutable.List<IMessage> => Immutable.List([
    { id: uuid(), from: 'Karol', text: 'Ahojte vsetci.'},
    { id: uuid(), from: 'Johan', text: 'Ahoj, tu Johan.'},
]);
