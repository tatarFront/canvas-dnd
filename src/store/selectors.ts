import { createSelector } from 'reselect';
import { IState, ICanvas } from '../interfaces';

export const getCanvas = (state: IState) => state.canvas;

export const getData = (state: IState, keyName: keyof ICanvas) =>
  createSelector(getCanvas, canvas => canvas[keyName])(state);

export default {
  getCanvas,
  getData
};
