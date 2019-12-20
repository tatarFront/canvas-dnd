export interface ICanvasElement {
  color: string;
  canvasPoints: number[];
}

export interface ICanvas extends Object {
  firstCanvas: Array<ICanvasElement>;
  secondCanvas: Array<ICanvasElement>;
  error: string;
}

export interface IAction {
  payload: any;
  type: string;
}

export interface IState {
  canvas: ICanvas;
}
