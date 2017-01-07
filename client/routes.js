import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './main';
import Video from './containers/hyperlapse_video';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="video" component={Video} />
  </Route>
);
