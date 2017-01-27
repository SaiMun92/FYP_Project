import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import RunningIcon from 'material-ui/svg-icons/Maps/directions-run';
import ShareIcon from 'material-ui/svg-icons/Social/share';
import VideoIcon from 'material-ui/svg-icons/Notification/ondemand-video';
import {blue500, yellow600, darkBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import polyline from 'polyline';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputData } from '../actions/index';

/* React Router */
import {browserHistory} from 'react-router';


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

class UserListitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  shareVideo() {
    console.log("sharing video");
  };

  handleOpen = () => {
    // Close button
    this.setState({open: true});
  };

  handleClose = () => {
    // Submit button
    this.setState({open: false});
  };

  linkToVideo = () => {
    // insert into Db here
    // this.props.inputData(this.props.item.mapPoints);
    browserHistory.push("video/" + this.props.item.id);
  };


  handleClick = () => {
    Meteor.call('getIndividualActivity',this.props.item.id, this.props.access_token,(err,res) => {
      if (err) {
        console.log(err);
      } else {
        let decodedPolyline = polyline.decode(res.map.polyline);
        let id = this.props.item.id.toString();
        this.props.inputData(decodedPolyline);
        Meteor.call('gps.insert', id, decodedPolyline);
      }
    });


    // console.log(decodedPolyline);

  };

  render() {
    // this was passed from user_list.js
    const item = this.props.item;
    // console.log(item);
    const date = item.start_date;  // this is a string
    const newDate = date.slice(8,10) + "/" + date.slice(5,7);
    // console.log(newDate);  // shows what contains in the item

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      // add another action here to create another button
    ];

    // link title and url
    const shareUrl = `http://127.0.0.1:8080/video/${this.props.item.id}`;
    const title = 'Check out where i run today!';

    // Over here needs to include in a key that is making a warning in the console.
    return (
      <div>
        <ListItem
          primaryText={newDate}
          //item.caloriesBurnedSummary.totalCalories
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Total Distance</span> --
              {item.distance/1000 + " km"}<br />
              {/* <span style={{color: darkBlack}}>Total Calories</span> --
              {item.caloriesBurnedSummary.totalCalories} */}
            </p>
          }
          secondaryTextLines={1}
          leftAvatar={<Avatar icon={<RunningIcon />} backgroundColor={blue500} />}
          initiallyOpen={false}
          primaryTogglesNestedList={false}
          onClick={this.handleClick.bind(this)}
          // onClick={() => Meteor.call('gps.insert', this.props.item.id, this.props.item.mapPoints)}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Video"
              leftIcon={<VideoIcon />}
              onTouchTap={this.linkToVideo.bind(this)}
            />,
            <ListItem
              key={2}
              primaryText="Share this Video"
              leftIcon={<ShareIcon />}
              onTouchTap={this.handleOpen}
            />
          ]}
        />
        <Dialog
          title="Click below to choose which platform you want to share with."
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
        {/* add share button */}
        <div className="shareContainer">
          <FacebookShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <FacebookIcon
                size={32}
                round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
          <GooglePlusShareButton
            url={shareUrl}
            className="share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>
        </div>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ inputData }, dispatch)
}

export default connect(null, mapDispatchToProps)(UserListitem);




// import React, { Component} from 'react';
//
// class UserListitem extends Component {
//   render() {
//     console.log(this.props.item);
//     return (
//       <div></div>
//     );
//   }
// }
//
// export default UserListitem;
