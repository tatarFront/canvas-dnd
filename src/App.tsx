import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Canvas from './components/canvas';
import CanvasWrapper from './components/canvasWrapper';

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header d-flex position-relative">
          <CanvasWrapper>
            <Canvas keyName="firstCanvas" />
            <Canvas keyName="secondCanvas" />
          </CanvasWrapper>
        </div>
      </div>
    </Provider>
  );
};

export default App;
