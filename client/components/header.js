import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import '../mshealthjs';

//var url = "https://login.live.com/oauth20_authorize.srf?client_id={70948966-da9f-49bd-9124-fe2ba4c4ce1e}&scope={mshealth.ReadProfile mshealth.ReadDevices mshealth.ReadActivityHistory mshealth.ReadActivityLocation}&response_type=code&redirect_uri={https://login.live.com/oauth20_desktop.srf}";

let thisToggle = false;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  static muiName = 'FlatButton';

  handleLogin() {
    mshealth.login();
  }

  render() {
    return (
      <FlatButton {...this.props} label="Login" onClick={this.handleLogin} />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        {/* <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        /> */}
        <AppBar
          title={this.props.title}
          iconElementRight={thisToggle ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

export default Header;