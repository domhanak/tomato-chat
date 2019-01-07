import * as Immutable from "immutable";
import {IUser} from "../../../models/IUser";
import {users} from "../../../reducers/users/users";
import {
    TOMATO_APP_LOADING_USERS_STARTED, TOMATO_APP_LOADING_USERS_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED, TOMATO_APP_USER_CHANNELS_SUCCESS
} from "../../../constants/actionTypes";

const userInitial = ({
     id: '123-456',
     nickname: 'tomato',
     email: 'tomato@tomato.com',
     selectedChannel: '0',
     avatarId: '0',
     channels: Immutable.List<Uuid>(),
    }
) as IUser;

const dummyEmptyState = () => ({
    allUserIds: Immutable.List<Uuid>(),
    usersById: Immutable.Map<Uuid, IUser>(),
});

const dummyStateWithOneUser = () => ({
    allUserIds: Immutable.List<Uuid>(['123-456']),
    usersById: Immutable.Map<Uuid, IUser>({'123-456': userInitial}),
});

const dummyStateWithoutUpdatedIds = () => ({
    allUserIds: Immutable.List<Uuid>(),
    usersById: Immutable.Map<Uuid, IUser>({'123-456': userInitial}),
});

describe('users reducer tests', () => {
    it('should return the initial state', () => {
        expect(users(undefined, {type: ''}))
            .toEqual(dummyEmptyState())
    });

    it('should return the previous state', () => {
        expect(users(dummyStateWithOneUser(), {type: ''}))
            .toEqual(dummyStateWithOneUser())
    });

    it('should handle TOMATO_APP_LOADING_USERS_STARTED', () => {
        expect(users(dummyEmptyState(), {type: TOMATO_APP_LOADING_USERS_STARTED}))
            .toEqual(dummyEmptyState())
    });

    it('should handle TOMATO_APP_USER_CHANNELS_STARTED', () => {
        expect(users(dummyEmptyState(), {type: TOMATO_APP_USER_CHANNELS_STARTED}))
            .toEqual(dummyEmptyState())
    });

    it('should handle TOMATO_APP_LOADING_USERS_SUCCESS', () => {
       // const users = dummyStateWithOneUser();
        expect(users(dummyEmptyState(), {type: TOMATO_APP_LOADING_USERS_SUCCESS, payload: {
                users: [userInitial],
            }}))
            .toEqual(dummyStateWithOneUser())
    });

    it('should handle TOMATO_APP_USER_CHANNELS_SUCCESS', () => {
        expect(users(dummyEmptyState(), {type: TOMATO_APP_USER_CHANNELS_SUCCESS, payload: {
                users: [userInitial],
            }}))
            .toEqual(dummyStateWithoutUpdatedIds())
    });
});
