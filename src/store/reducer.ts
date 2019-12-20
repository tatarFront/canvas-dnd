import { combineReducers } from 'redux';

import { ICanvas, IAction, IState } from '../interfaces';
import types from './constants';

export const initialState: ICanvas = {
  firstCanvas: [],
  secondCanvas: [],
  error: ''
};

export const canvasState = (state: ICanvas = initialState, action: IAction) => {
  switch (action.type) {
    case types.CREATE_LINE_SUCCESS:
    case types.UPDATE_LINE_SUCCESS:
    case types.REPLACE_LINE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export default combineReducers<IState>({
  canvas: canvasState
});
