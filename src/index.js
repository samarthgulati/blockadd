import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initialState from './initialState'

window.NS = 'http://www.w3.org/2000/svg'
window.side = Math.min(window.innerHeight, window.innerWidth)
window.divisions = 25
window.delta = window.side / window.divisions

ReactDOM.render(
 <Provider store={configureStore(initialState)}>
  <App />
 </Provider>,
 document.getElementById('root')
);
registerServiceWorker();