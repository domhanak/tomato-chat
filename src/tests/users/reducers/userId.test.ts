import {userId} from "../../../reducers/users/userId";
import {
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS
} from "../../../constants/actionTypes";
import * as Immutable from "immutable";
import {IUser} from "../../../models/IUser";

const userInitial = ({
        id: '123-456',
        nickname: 'tomato',
        email: 'tomato@tomato.com',
        selectedChannel: '0',
        avatarId: '0',
        channels: Immutable.List<Uuid>(),
    }
) as IUser;

describe('userId reducer tests', () => {
    it('should return the initial state', () => {
        expect(userId(undefined, {type: ''}))
            .toEqual(null)
    });

    it('should return the previous state', () => {
        expect(userId(undefined, {type: ''}))
            .toEqual(null)
    });

    it('should handle TOMATO_APP_USER_LOGIN_SUCCESS', () => {
        const user = userInitial;
        expect(userId('123-456', {type: TOMATO_APP_USER_LOGIN_SUCCESS, payload: {
            user
            }}))
            .toEqual('123-456')
    });

    it('should handle TOMATO_APP_USER_LOGIN_FAILED', () => {
        const user = userInitial;
        expect(userId('123-456', {type: TOMATO_APP_USER_LOGIN_FAILED, payload: {
                user
            }}))
            .toEqual(null)
    });

    it('should handle TOMATO_APP_USER_LOGIN_STARTED', () => {
        const user = userInitial;
        expect(userId('123-456', {type: TOMATO_APP_USER_LOGIN_STARTED, payload: {
                user
            }}))
            .toEqual(null)
    });
});
