import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LinearProgress from 'material-ui/LinearProgress';

import Test from './test';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

// the children of paper must be a react node. e.g. <App />
class VideoController extends Component {
  render() {

    if (this.props.Length == null || this.props.Value == null) {
      return (
        <div className="loader">
          <MuiThemeProvider>
            <LinearProgress mode="indeterminate" />
          </MuiThemeProvider>
        </div>
      );
    }
    else {
      let percentage = Math.round((this.props.Value / this.props.Length) * 100);
      return (
        <div className="loader">
          <div className="percentage">
            <p>
              {percentage}%
            </p>
            <MuiThemeProvider>
              <LinearProgress  mode="determinate" min={0} max={this.props.Length} value={this.props.Value}/>
            </MuiThemeProvider>
          </div>
        </div>
      );
    }
  }
}

export default VideoController;
