import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import { render } from 'react-dom'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import "./index.css";

import App from './components/App'
import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
