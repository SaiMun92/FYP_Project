import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

// This class is a temporary measure to login and authenticate to the MicrosoftHealth API.

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      user_activities: [],
      name: '',
    };
  }
  // componentWillMount() {
  //   // const mshealth = new MicrosoftHealth({
  //   //         clientId: "70948966-da9f-49bd-9124-fe2ba4c4ce1e",
  //   //         redirectUri: "http://localhost:3000",
  //   //         scope: "mshealth.ReadProfile mshealth.ReadDevices mshealth.ReadActivityHistory mshealth.ReadActivityLocation"
  //   // });
  //   // mshealth.login();
  // }

    /* excellent place to call the api */
  componentWillMount() {
    // this {code} must be called at the same
    const code = this.props.location.query.code;
    Meteor.call('getAccessToken', code, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (!err) {
        console.log(res);
        this.setState({ access_token: res.access_token });
        this.setState({ name: res.athlete.lastname });

        let url = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=10`;
        // console.log(url);
        axios.get(url)
          .then(response => {
            console.log(response.data);
            this.setState({ user_activities: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
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
          <UserList access_token={this.state.access_token} user_activities={this.state.user_activities} name={this.state.name}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;
