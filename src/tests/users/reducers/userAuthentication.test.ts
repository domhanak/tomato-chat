import {userAuthentication} from "../../../reducers/users/userAuthentication";
import {
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED, TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    TOMATO_APP_AUTHENTICATION_TOKEN_STARTED,

} from "../../../constants/actionTypes";

describe('userAuthentication reducer tests', () => {
    it('should return the initial state', () => {
        expect(userAuthentication(null, {type: ''}))
            .toEqual(null)
    });

    it('should return the previous state', () => {
        expect(userAuthentication('123-456', {type: ''}))
            .toEqual('123-456')
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_STARTED', () => {
        expect(userAuthentication('123-456', {type: TOMATO_APP_AUTHENTICATION_TOKEN_STARTED}))
            .toEqual(null)
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_FAILED', () => {
        expect(userAuthentication('123-456', {type: TOMATO_APP_AUTHENTICATION_TOKEN_FAILED}))
            .toEqual(null)
    });

    it('should handle TOMATO_APP_AUTHENTICATION_TOKEN_FAILED', () => {
        const authenticator = 'ahoj-ja-som-token';
        expect(userAuthentication('123-456', {type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED, payload: {
            authenticator
            }}))
            .toEqual(authenticator)
    });
});
