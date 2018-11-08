import * as uuid from 'uuid';
import * as Immutable from 'immutable';;
import {IChannel} from "../../models/IChannel";
import {List} from "immutable";
import {IMessage} from "../../models/IMessage";

export const getInitialKnownChannels = (): Immutable.List<IChannel> => Immutable.List([
    { id: uuid(), name: "email", order: 1, messages: List<IMessage>() }
]);
