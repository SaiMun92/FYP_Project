import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import RunningIcon from 'material-ui/svg-icons/Maps/directions-run';
import ShareIcon from 'material-ui/svg-icons/Social/share';
import VideoIcon from 'material-ui/svg-icons/Notification/ondemand-video';
import {blue500, yellow600, darkBlack} from 'material-ui/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputMap } from '../actions/index';

let trailNum = 0;

class UserListitem extends Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    // over here pass in the props to the Google Maps to re-render to the screen
    const item = this.props.item;
    const lat = item.mapPoints[0].location.latitude/10000000;
    const lng = item.mapPoints[0].location.longitude/10000000;
    console.log("clicked");
    // pass these values to the store
    this.props.inputMap(lat, lng);
  }


  render() {
    const item = this.props.item
    trailNum +=1;
    const date = item.dayId;  // this is a string
    const newDate = date.slice(8,10) + "/" + date.slice(5,7);
    console.log(item);  // shows what contains in the item
    return (
      <div>
        <ListItem
          primaryText={newDate}
          //item.caloriesBurnedSummary.totalCalories
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Total Distance</span> --
              {item.distanceSummary.totalDistance/100000 + " km"}<br />
              <span style={{color: darkBlack}}>Total Calories</span> --
              {item.caloriesBurnedSummary.totalCalories}
            </p>
          }
          secondaryTextLines={2}
          leftAvatar={<Avatar icon={<RunningIcon />} backgroundColor={blue500} />}
          initiallyOpen={false}
          primaryTogglesNestedList={false}
          onClick={this.onClickHandler}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Video"
              leftIcon={<VideoIcon />}
            />,
            <ListItem
              key={2}
              primaryText="Share this Video"
              leftIcon={<ShareIcon />}
              onClick={this.shareVideo}
            />
          ]}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ inputMap: inputMap }, dispatch)
}

export default connect(null, mapDispatchToProps)(UserListitem);
