import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
//const createStoreWithMiddleware = applyMiddleware()(createStore);

// Entry point
Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
    <Main />
    </Provider>,
    document.getElementById('render-target'));
})
