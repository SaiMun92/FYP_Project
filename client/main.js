import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { red400 } from 'material-ui/styles/colors';

import Header from './components/header';
import Maps from './containers/google_maps';
import UserList from './components/user_list';

injectTapEventPlugin();

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: red400,
  },
  appBar: {
    height: 60,
  },
});



class Main extends Component {
  componentWillMount() {
    const mshealth = new MicrosoftHealth({
            clientId: "70948966-da9f-49bd-9124-fe2ba4c4ce1e",
            redirectUri: "http://localhost:3000",
            scope: "mshealth.ReadProfile mshealth.ReadDevices mshealth.ReadActivityHistory mshealth.ReadActivityLocation"
    });

    mshealth.login();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Header title="Home"/>
        </MuiThemeProvider>
        <div>
          <Maps />
        </div>
        <MuiThemeProvider>
          <UserList />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;
