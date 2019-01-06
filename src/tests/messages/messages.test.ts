// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';
// import {loadMessages} from "../../actions/message/loadMessages";
// import {messages} from "../../reducers/message/messages";
// import {
//     TOMATO_APP_LOADING_MESSAGES_STARTED,
//     TOMATO_APP_LOADING_MESSAGES_SUCCESS,
//     TOMATO_APP_MESSAGE_CREATE_STARTED,
//     TOMATO_APP_MESSAGE_CREATE_SUCCESS,
//     TOMATO_APP_MESSAGE_DELETE_STARTED,
//     TOMATO_APP_MESSAGE_DELETE_SUCCESS
// } from "../../constants/actionTypes";
// import {createMessage} from "../../actions/message/createMessage";
// import {IMessageServerModel} from "../../models/IMessageServerModel";
// import {deleteMessage} from "../../actions/message/deleteMessage";
//
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
//
// test('Load messages', () => {
//     const dispatch = jest.fn();
//     // @ts-ignore
//     loadMessages() = jest.fn(() => (messages));
//
//     const store = mockStore({ messages: [] });
//
//     const expectedActions = [
//         { type: TOMATO_APP_LOADING_MESSAGES_STARTED },
//         { type: TOMATO_APP_LOADING_MESSAGES_SUCCESS, payload: {messages}},
//     ];
//
//     return store.dispatch(loadMessages('0', '42')(dispatch)).then(() => {
//         // return of async actions
//         expect(store.getActions()).toEqual(expectedActions);
//     });
// });
//
// test('Create new message', () => {
//     const dispatch = jest.fn();
//     // fake message
//     const message: IMessageServerModel = {
//         value: '',
//         customData: {
//             downvotes: 0,
//             upvotes: 0,
//         }
//     };
//
//     // @ts-ignore
//     createMessage = jest.fn((): IMessageAppMessage => (message));
//
//     const store = mockStore({ loggedUser: {email: 'a@mail.com'}, selectedChannelId: '42' });
//
//     const expectedActions = [
//         { type: TOMATO_APP_MESSAGE_CREATE_STARTED },
//         { type: TOMATO_APP_MESSAGE_CREATE_SUCCESS, payload: {message}}
//     ];
//
//     return store.dispatch(createMessage('0', '42', message)(dispatch).then(() => {
//         // return of async actions
//         expect(store.getActions()).toEqual(expectedActions);
//     });
// });
//
// test('Delete message', () => {
//     const msgId = '666';
//     const channelId = '777';
//     // @ts-ignore
//     MessageService.deleteMessage = jest.fn();
//
//     const store = mockStore({ loggedUser: {email: 'a@a.cz'}});
//
//     const expectedActions = [
//         { type: TOMATO_APP_MESSAGE_DELETE_STARTED },
//         { type: TOMATO_APP_MESSAGE_DELETE_SUCCESS, payload: {msgId}},
//     ];
//
//     return store.dispatch(deleteMessage('0', msgId, channelId)).then(() => {
//         // return of async actions
//         expect(store.getActions()).toEqual(expectedActions);
//     });
// });
