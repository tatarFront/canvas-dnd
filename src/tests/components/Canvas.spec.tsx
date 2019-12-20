import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../store';
import { ICanvas } from '../../interfaces';

import Canvas from '../../components/canvas/Canvas';
import CanvasContainer from '../../components/canvas';
import CanvasWrapper from '../../components/canvasWrapper';

const keyName: keyof ICanvas = 'firstCanvas';
const props = {
  data: [],
  keyName: keyName,
  create: () => {},
  replace: () => {},
  update: () => {}
};

describe('Canvas', () => {
  it('should render correctly container in "debug" mode', () => {
    const component = shallow(
      <Provider store={store}>
        <CanvasContainer keyName={keyName} />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
  
  it('should click and render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <CanvasContainer keyName={keyName} />
      </Provider>
    );

    const canvasElement = component.find("button")
    canvasElement.simulate("click")
    expect(component).toMatchSnapshot();
  });

  it('should render correctly component in "debug" mode', () => {
    const component = shallow(<Canvas {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('render correct component prop type', () => {
    const CanvasComponent = mount(<Canvas {...props} />);

    expect(typeof CanvasComponent.props().create).toBe('function');
    expect(typeof CanvasComponent.props().update).toBe('function');
    expect(typeof CanvasComponent.props().replace).toBe('function');
    expect(typeof CanvasComponent.props().keyName).toBe('string');
  });

  it('render correct component for check elements', () => {
    const CanvasComponent = mount(<Canvas {...props} />);
    const canvasElement = CanvasComponent.find("canvas")
    expect(canvasElement).toHaveLength(1);
  });
});

describe('Canvas Wrapper', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <CanvasWrapper>
        <CanvasContainer keyName="firstCanvas" />
        <CanvasContainer keyName="secondCanvas" />
      </CanvasWrapper>
    );
    expect(component).toMatchSnapshot();
  });
});

configure({ adapter: new Adapter() });
