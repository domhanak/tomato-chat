import * as Immutable from "immutable";
import {IUser} from "../../../models/IUser";
import {users} from "../../../reducers/users/users";
import {
    TOMATO_APP_LOADING_USERS_STARTED, TOMATO_APP_LOADING_USERS_SUCCESS,
    TOMATO_APP_USER_CHANNELS_STARTED
} from "../../../constants/actionTypes";

const userInitial = ({
     id: 'f9529c4a-7875-45a9-8a5e-606f682f435e',
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
    allUserIds: Immutable.List<Uuid>(['f9529c4a-7875-45a9-8a5e-606f682f435e']),
    usersById: Immutable.Map<Uuid, IUser>({'f9529c4a-7875-45a9-8a5e-606f682f435e': userInitial}),
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
                user: userInitial,
            }}))
            .toEqual(dummyStateWithOneUser())
    });
});
