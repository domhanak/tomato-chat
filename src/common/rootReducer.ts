import { IState } from './IState';
import { tomatoApp } from '../reducers/tomatoApp';

export const rootReducer = (prevState = {} as IState, action: Action): IState => ({
  tomatoApp: tomatoApp(prevState.tomatoApp, action),
});
