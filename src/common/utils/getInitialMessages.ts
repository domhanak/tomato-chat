import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import {IMessage} from '../../models/IMessage';

export const getInitialKnownMessages = (): Immutable.List<IMessage> => Immutable.List([
    { id: uuid(), createdBy: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8', value: 'Ahojte vsetci.', createdAt: new Date(), updatedAt: new Date(), updatedBy: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8'},
    { id: uuid(), value: 'Ahoj, tu Johan.', createdBy: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8', createdAt: new Date(), updatedAt: new Date(), updatedBy: 'de416dcf-3cb8-4a26-9961-4f5e81b03fb8'},
]);
