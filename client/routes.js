import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './main';
import Video from './containers/hyperlapse_video';
import VideoController from './components/videoController';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="video/:id" component={Video} />
    <Route path="test" component={VideoController} />
  </Route>
);
