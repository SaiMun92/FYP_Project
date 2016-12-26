import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

let store = createStore(rootReducer);

// Entry point
Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
    <Main />
    </Provider>,
    document.getElementById('render-target'));
})
