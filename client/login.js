import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class LoginMain extends Component {

  login() {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=15774&response_type=code&redirect_uri=http://localhost:3000/main&scope=write&state=mystate&approval_prompt=force`;
  }
  render() {
    return (
      <MuiThemeProvider>
        <FlatButton label="Login" primary={true} onClick={this.login.bind(this)}/>
      </MuiThemeProvider>
    );
  }
}

export default LoginMain;
