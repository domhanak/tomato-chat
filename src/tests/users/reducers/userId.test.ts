import {user, userId} from '../../../reducers/users/userId';
import {
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS, TOMATO_APP_USER_LOGOUT_SUCCESS
} from '../../../constants/actionTypes';
import * as Immutable from 'immutable';
import {IUser} from '../../../models/IUser';

const userInitial = ({
        id: '123-456',
        nickname: 'tomato',
        email: 'tomato@tomato.com',
        selectedChannel: '0',
        avatarId: '0',
        channels: Immutable.List<Uuid>(),
    }
) as IUser;

const prevStateId = '123-456';

describe('userId reducer tests', () => {
    it('should return the initial state', () => {
        expect(userId(undefined, {type: ''}))
            .toEqual(null);
    });

    it('should return the previous state', () => {
        expect(userId(undefined, {type: ''}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGIN_SUCCESS', () => {
        expect(userId(prevStateId, {type: TOMATO_APP_USER_LOGIN_SUCCESS, payload: {
                user: userInitial
            }}))
            .toEqual(prevStateId);
    });

    it('should handle TOMATO_APP_USER_LOGIN_FAILED', () => {
        expect(userId(prevStateId, {type: TOMATO_APP_USER_LOGIN_FAILED, payload: {
                user: userInitial
            }}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGIN_STARTED', () => {
        expect(userId(prevStateId, {type: TOMATO_APP_USER_LOGIN_STARTED, payload: {
                user: userInitial
            }}))
            .toEqual(prevStateId);
    });

    it('should handle TOMATO_APP_USER_LOGOUT_SUCCESS', () => {
        expect(userId(prevStateId, {type: TOMATO_APP_USER_LOGOUT_SUCCESS}))
            .toEqual(null);
    });
});

describe('user reducer tests', () => {
    it('should return the initial state', () => {
        expect(user(undefined, {type: ''}))
            .toEqual(null);
    });

    it('should return the previous state', () => {
        expect(user(undefined, {type: ''}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGIN_SUCCESS', () => {
        expect(user(userInitial, {type: TOMATO_APP_USER_LOGIN_SUCCESS, payload: {
                user: userInitial
            }}))
            .toEqual(userInitial);
    });

    it('should handle TOMATO_APP_USER_LOGIN_FAILED', () => {
        expect(user(userInitial, {type: TOMATO_APP_USER_LOGIN_FAILED, payload: {
                user: userInitial
            }}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGIN_STARTED', () => {
        expect(user(userInitial, {type: TOMATO_APP_USER_LOGIN_STARTED, payload: {
                user: userInitial
            }}))
            .toEqual(userInitial);
    });

    it('should handle TOMATO_APP_USER_LOGOUT_SUCCESS', () => {
        expect(user(userInitial, {type: TOMATO_APP_USER_LOGOUT_SUCCESS}))
            .toEqual(null);
    });
});
