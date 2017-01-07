import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
//import thunk from 'redux-thunk';

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );
//const createStoreWithMiddleware = applyMiddleware()(createStore);
let store = createStore(rootReducer);

// Entry point
Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('render-target'));
})

// example of how u can wrap ur redux store with react-router
{/* <Provider store={createStoreWithMiddleware(rootReducer)}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="users" component={userList} />
    </Route>
  </Router>
</Provider> */}
