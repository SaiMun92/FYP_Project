import React, { Component } from 'react';
import MobileTearSheet from '../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import RunningIcon from 'material-ui/svg-icons/Maps/directions-run';
import UserListitem from '../containers/user_list_item';
import Infinite from 'react-infinite';
import '../mshealthjs';

const mshealth = new MicrosoftHealth({
        clientId: "70948966-da9f-49bd-9124-fe2ba4c4ce1e",
        redirectUri: "http://localhost:3000",
        scope: "mshealth.ReadProfile mshealth.ReadDevices mshealth.ReadActivityHistory mshealth.ReadActivityLocation"
});

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _Greeting: '',
      _runActivity: []
    };
  }

  componentWillMount() {
    mshealth.getProfile().then((profile) => {
      this.setState({ _Greeting: "Welcome, " + profile.firstName });
    });
    mshealth.getActivities({
      startTime: sevenDaysAgo.toISOString(),
      endTime: (new Date()).toISOString(),
      activityTypes: "Run",
      // deviceID is optional but this deviceID below refers to the band ID
      // deviceIds: "FFFFFFFF-FFFF-FFFF-FFFF-005094355249",
      activityIncludes: "1,2,3",
      // activityIds: "2519243373560010070"
      // 1 - detail, 2 - MinuteSummaries, 3 - Map Points
    }).then((activities) => {
      //const message = "You logged " + activities.itemCount + " activities in the last 30 days.";
      // activities.runActivities contain all the activities
      //console.log(activities.runActivities);
      this.setState({ _runActivity: activities.runActivities });
      console.log(activities.itemCount);
      //console.log(this.state._runActivity);
    });
  }

  render() {
    const activity = this.state._runActivity;

    const ListViewItem = activity.map((item) => {
      return (
        <UserListitem key={item.id} item={item}/>
      );
    });

    return (
      <Infinite containerHeight={660} elementHeight={650} className="userlist">
        <MobileTearSheet>
          <List>
            <ListItem
             primaryText={this.state._Greeting}
             leftAvatar={<Avatar src="http://writm.com/wp-content/uploads/2016/08/Cat-hd-wallpapers.jpg" />}
            />
          </List>
          <Divider inset={true} />
          <List>
            <Subheader inset={true}>Trails</Subheader>
              {ListViewItem}
          </List>
        </MobileTearSheet>
      </Infinite>
    );
  }
}

export default UserList;
