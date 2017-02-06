import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const divStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundImage: 'url(' + '/images/running_photo.png' + ')',
  overflow: 'hidden',
  backgroundSize: 'cover',
};

class LoginMain extends Component {
  login() {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=15774&response_type=code&redirect_uri=http://128.199.112.157/main&scope=write&state=mystate&approval_prompt=force`;
  }
  render() {
    return (
      <div style={divStyle} className="blockText">
        <h1>
          Introducing GPS Trail Visualizer
        </h1>
        <MuiThemeProvider>
          <FlatButton label="Login" primary={true} onClick={this.login.bind(this)}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginMain;
