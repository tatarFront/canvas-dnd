import { IState, ICanvas } from '../../interfaces';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { create, replace, update } from '../../store/actions';
import { getData } from '../../store/selectors';

import Canvas from './Canvas';

interface DispatchProps {
  create: (keyName: keyof ICanvas) => void;
  replace: (
    keyName: keyof ICanvas,
    points: number[],
    nextPoints: number[]
  ) => void;
  update: (
    keyName: keyof ICanvas,
    prevPoints: number[],
    nextPoints: number[]
  ) => void;
}

interface OwnProps {
  keyName: keyof ICanvas;
  canvasWrapRef?: any;
  setDrag?: any;
  setX?: any;
  setY?: any;
}

type Props = IState & DispatchProps & OwnProps;

const mapStateToProps = (
  state: IState,
  { keyName, canvasWrapRef, setDrag, setX, setY }: OwnProps
): {} => {
  return {
    data: getData(state, keyName),
    keyName,
    canvasWrapRef,
    setDrag,
    setX,
    setY
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    create: (keyName: keyof ICanvas) => dispatch(create(keyName)),
    replace: (keyName: keyof ICanvas, points: number[], nextPoints: number[]) =>
      dispatch(replace(keyName, points, nextPoints)),
    update: (
      keyName: keyof ICanvas,
      prevPoints: number[],
      nextPoints: number[]
    ) => dispatch(update(keyName, prevPoints, nextPoints))
  };
};

export default connect<{}, DispatchProps, OwnProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
