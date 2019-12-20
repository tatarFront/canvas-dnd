import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ICanvasElement, IAction, ICanvas } from '../interfaces';
import { getCanvas, getData } from './selectors';
import types from './constants';
import { compareArrays, randomInteger, getRandomColor } from '../tools';

//NOTE: actions
export const createLineSuccess = (payload: object) => ({
  type: types.CREATE_LINE_SUCCESS,
  payload
});

export const replaceLineSuccess = (payload: object) => ({
  type: types.REPLACE_LINE_SUCCESS,
  payload
});

export const updateLineSuccess = (payload: object) => ({
  type: types.UPDATE_LINE_SUCCESS,
  payload
});

//NOTE: middleware Thunk
export const create = (
  keyName: keyof ICanvas
): ThunkAction<any, any, any, any> => {
  return (dispatch: ThunkDispatch<{}, {}, IAction>, getState: any) => {
    const state = getState();
    const newCanvasElement: ICanvasElement = {
      color: getRandomColor(),
      canvasPoints: [
        randomInteger(0, 100),
        randomInteger(0, 180),

        randomInteger(110, 200),
        randomInteger(0, 180),

        randomInteger(210, 300),
        randomInteger(0, 180)
      ]
    };
    dispatch(
      createLineSuccess({
        [keyName]: [...state.canvas[keyName], newCanvasElement]
      })
    );
  };
};

const generateNextData = (
  arr1: ICanvasElement[],
  arr2: ICanvasElement[],
  nextPoint: number[],
  cb: (points: number[]) => void | boolean
) => {
  const [newItem] = arr1.filter((item: ICanvasElement) =>
    cb(item.canvasPoints)
  );
  const second: Array<ICanvasElement> = [
    ...arr2,
    {
      ...newItem,
      canvasPoints: nextPoint
    }
  ];
  const first: Array<ICanvasElement> = arr1.filter(
    (item: any) => !cb(item.canvasPoints)
  );

  return { first, second };
};

export const replace = (
  keyName: keyof ICanvas,
  points: number[],
  nextPoint?: number[]
): ThunkAction<any, any, any, any> => {
  return (dispatch: ThunkDispatch<{}, {}, IAction>, getState: () => any) => {
    const canvas: any = getCanvas(getState());
    const [first, second] =
      keyName === 'firstCanvas'
        ? ['firstCanvas', 'secondCanvas']
        : ['secondCanvas', 'firstCanvas'];

    const nextData = generateNextData(
      canvas[first],
      canvas[second],
      nextPoint || points,
      (itemPoints: number[]) => compareArrays(itemPoints, points)
    );

    dispatch(
      replaceLineSuccess({
        [first]: nextData.first,
        [second]: nextData.second
      })
    );
  };
};

export const update = (
  keyName: keyof ICanvas,
  prevPoints: number[],
  nextPoints: number[]
): ThunkAction<any, any, any, any> => {
  return (dispatch: ThunkDispatch<{}, {}, IAction>, getState: any) => {
    const canvasData: any = getData(getState(), keyName);
    const nextCanvasData = canvasData.map((item: any) => {
      if (!compareArrays(item.canvasPoints, prevPoints)) return item;

      return {
        color: item.color,
        canvasPoints: nextPoints
      };
    });

    dispatch(
      updateLineSuccess({
        [keyName]: [...nextCanvasData]
      })
    );
  };
};
