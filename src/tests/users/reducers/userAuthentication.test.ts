import {userAuthentication} from '../../../reducers/users/userAuthentication';
import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED, TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED, TOMATO_APP_USER_LOGOUT_STARTED, TOMATO_APP_USER_LOGOUT_SUCCESS,

} from '../../../constants/actionTypes';

const prevState = '123-456';

describe('userAuthentication reducer tests', () => {
    it('should return the initial state', () => {
        expect(userAuthentication(null, {type: ''}))
            .toEqual(null);
    });

    it('should return the previous state', () => {
        expect(userAuthentication(prevState, {type: ''}))
            .toEqual(prevState);
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_STARTED', () => {
        expect(userAuthentication(prevState, {type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_FAILED', () => {
        expect(userAuthentication(prevState, {type: TOMATO_APP_AUTHENTICATION_TOKEN_FAILED}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGOUT_SUCCESS', () => {
        expect(userAuthentication(prevState, {type: TOMATO_APP_USER_LOGOUT_SUCCESS}))
            .toEqual(null);
    });

    it('should handle TOMATO_APP_USER_LOGOUT_STARTED', () => {
        expect(userAuthentication(prevState, {type: TOMATO_APP_USER_LOGOUT_STARTED}))
            .toEqual(prevState);
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_FAILED', () => {
        const authenticator = 'ahoj-ja-som-token';
        expect(userAuthentication(prevState, {type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED, payload: {
            authenticator
            }}))
            .toEqual(authenticator);
    });
});
