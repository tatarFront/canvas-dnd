import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  createLineSuccess,
  replaceLineSuccess,
  updateLineSuccess
} from '../store/actions';
import { canvasState, initialState } from '../store/reducer';
import types from '../store/constants';

describe('>>> Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  describe('>>> Create action', () => {
    it('should call action of create', () => {
      const expectedPayload = {
        firstCanvas: [{}]
      };

      const store = mockStore({ ...initialState });
      const expectedActions = store.getActions();
      store.dispatch(createLineSuccess({ firstCanvas: [{}] }));

      expect(expectedActions.length).toBe(1);
      expect(expectedActions).toEqual([
        { type: types.CREATE_LINE_SUCCESS, payload: expectedPayload }
      ]);
    });
  });

  describe('>>> Update action', () => {
    it('should call action of update', () => {
      const expectedPayload = {
        firstCanvas: [{}]
      };

      const store = mockStore({ ...initialState });
      const expectedActions = store.getActions();
      store.dispatch(updateLineSuccess({ firstCanvas: [{}] }));

      expect(expectedActions.length).toBe(1);
      expect(expectedActions).toEqual([
        { type: types.UPDATE_LINE_SUCCESS, payload: expectedPayload }
      ]);
    });
  });

  describe('>>> Replace action', () => {
    it('should call actionof update', () => {
      const expectedPayload = {
        firstCanvas: [{}]
      };

      const store = mockStore({ ...initialState });
      const expectedActions = store.getActions();
      store.dispatch(replaceLineSuccess({ firstCanvas: [{}] }));

      expect(expectedActions.length).toBe(1);
      expect(expectedActions).toEqual([
        { type: types.REPLACE_LINE_SUCCESS, payload: expectedPayload }
      ]);
    });
  });
});

describe('>>> Reducers', () => {
  const mockStore = configureMockStore();
  const expectedPayload = {
    firstCanvas: [{}]
  };

  describe('>>> Create reducer', () => {
    it('should call reducer of create', () => {
      const store: any = mockStore({ ...initialState }).getState();
      expect({ ...initialState, ...expectedPayload }).toEqual(
        canvasState(store, {
          type: types.CREATE_LINE_SUCCESS,
          payload: expectedPayload
        })
      );
    });
  });

  describe('>>> Update reducer', () => {
    it('should call reducer of update', () => {
      const store: any = mockStore({ ...initialState }).getState();
      expect({ ...initialState, ...expectedPayload }).toEqual(
        canvasState(store, {
          type: types.UPDATE_LINE_SUCCESS,
          payload: expectedPayload
        })
      );
    });
  });

  describe('>>> Replace reducer', () => {
    it('should call reducer of update', () => {
      const store: any = mockStore({ ...initialState }).getState();
      expect({ ...initialState, ...expectedPayload }).toEqual(
        canvasState(store, {
          type: types.REPLACE_LINE_SUCCESS,
          payload: expectedPayload
        })
      );
    });
  });
});
