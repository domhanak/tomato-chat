import * as Immutable from 'immutable';
import { combineReducers} from 'redux';
import { IUsers } from '../../models/ITomatoApp';
import {
    TOMATO_APP_LOADING_USERS_STARTED,
    TOMATO_APP_LOADING_USERS_SUCCESS,
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';

const usersById = (prevState = Immutable.Map<Uuid, IUser>(), action: Action): Immutable.Map<Uuid, IUser> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_USERS_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_USERS_SUCCESS:
            return prevState.set(action.payload.user.id, action.payload.user);
            // return Immutable.Map(action.payload.users.map((user: IUser) => [user.id, user]));
        default:
            return prevState;
    }
};

const allUserIds = (prevState: Immutable.List<Uuid> = Immutable.List(), action: Action): Immutable.List<Uuid> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_USERS_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_USERS_SUCCESS:
            return prevState.push(action.payload.user.id);
            // return Immutable.List(action.payload.users.map((user: IUser) => user.id));
        default:
            return prevState;
    }
};

export const users = combineReducers<IUsers>({
    allUserIds,
    usersById,
});
