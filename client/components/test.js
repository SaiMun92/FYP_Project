import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoController from '../components/videoController';

// 2. Do the loading bar
// 3. Do the pause play button thing
// 4. Link back to the main page button.
// 5. change the routes source.

let elevation = 0;
let latLngPoints = [];
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress: '',
      Length: '',
      Value: '',
      LoadingBool: true,
      isMoving: false,
      px: "",
      py: "",
      onPointerDownPointerX: 0,
      onPointerDownPointerY: 0,
    };
  }

  componentDidMount() {

    let { data } = this.props;
		let startPoint_lat = data[0].location.latitude/10000000;
		let startPoint_lng = data[0].location.longitude/10000000;
		let endPoint_lat = data[data.length-1].location.latitude/10000000;
		let endPoint_lng = data[data.length-1].location.longitude/10000000;
    /* panorama */
    let pano = document.getElementById('pano');
    let is_moving = false;
    let px, py;
    let onPointerDownPointerX=0, onPointerDownPointerY=0;

    /* For new Hyperlapse.js */
    const runningPath = this.props.data.map((data) => {
      if (typeof data.location !== 'undefined') {
        const lat = data.location.latitude/10000000;
        const lng = data.location.longitude/10000000;
        // should not use this.setState as this will cause a re-render and the componentDidUpdate will be
        // called again. => this is what caused the infinite loop.
        latLngPoints.push(new google.maps.LatLng(data.location.latitude/10000000, data.location.longitude/10000000));
      }
    });

    let startPoint = new google.maps.LatLng(startPoint_lat, startPoint_lng);
    let endPoint = new google.maps.LatLng(endPoint_lat, endPoint_lng);

    // calculating the midpoint of the start and end coordinates
    let centrePoint = google.maps.geometry.spherical.interpolate(endPoint, startPoint, 0.5);

    /* Map */
    let map = new google.maps.Map(document.getElementById('video_map'), {
      zoom: 13,
      center: centrePoint,
      // coordinates of Singapore
    });

    //this marker is actually correct. DO NOT CONFUSE.
    let startPointMarker = new google.maps.Marker({
      position: startPoint,
      map: map,
      icon: {
        url: '/images/flag-start-orange.png', // url
        scaledSize: new google.maps.Size(24, 24), // scaled size
        anchor: new google.maps.Point(6,24) // anchor
      }
    });

    let endPointMarker = new google.maps.Marker({
      position: endPoint,
      map: map,
      icon: {
        url: '/images/flag-finish.png', // url
        scaledSize: new google.maps.Size(24, 24), // scaled size
        anchor: new google.maps.Point(0,24) // anchor
      }
    });

    // This marker won't appear at the start.
    let cameraPinMarker = new google.maps.Marker({
      position: startPoint,
      map: map,
      icon: {
        url: '/images/runner.png',
        scaledSize: new google.maps.Size(32, 32),
      }
    });

    /* Hyperlapse */
    hyperlapse = new Hyperlapse(document.getElementById('pano'), {
  		zoom: 2,
  		use_lookat: false,
  		elevation: 50,
      fov: 80,
      millis: 50,
      width: 1280,//window.innerWidth,
      height: 640,//window.innerHeight,
      distance_between_points: 5,
      max_points: 100,
    });

  	hyperlapse.onError = function(e) {
  		console.log(e);
  	};

    hyperlapse.onFrame = function(e) {
      cameraPinMarker.setPosition(e.point.location);
    };

    hyperlapse.onRouteProgress = (e) => {
      let dotMarker = new google.maps.Marker({
        position: e.point.location,
        draggable: false,
        icon:'/images/dot_marker.png'
      });
      dotMarker.setMap(map);
      this.setState({ Length: '' });
      this.setState({ Value: '' });
      this.setState({ Progress: "Generating Route..."});
    };
  	// This allows loading of panorama
  	hyperlapse.onRouteComplete = function(e) {
  		hyperlapse.load();
  	};

    hyperlapse.onLoadProgress = (e) => {
      // show the text and the loading screen
      const Message= "Progress: " + (e.position+1) + " of " + hyperlapse.length();
      this.setState({ Progress: "Generating Timelapse Video..."});
      this.setState({ Length: hyperlapse.length() });
      this.setState({ Value: (e.position+1)});

    };

  	// once the loading of points have been completed, play the video
  	hyperlapse.onLoadComplete = (e) => {
      // hide the loading object
      // show the controls of the video.
      this.setState({ LoadingBool: false });
  		hyperlapse.play();
  	};

  	// Google Maps API stuff here...
    // This API is for routing/finding the fastest route from point A to point B.
  	var directions_service = new google.maps.DirectionsService();

    // console.log(startPoint_lat);
    // console.log(startPoint_lng);
    // console.log(endPoint_lat);
    // console.log(endPoint_lng);
  	var route = {
  		request:{
        // sample destination, WARNING: GOOGLE MAPS AND HYPERLAPSE NEEDS TO HAVE THE SAME GPS COORDINATES
        // IF NOT THE GOOGLE MAPS API WILL NOT ACCEPT.
        // origin: new google.maps.LatLng(1.4133064, 103.8392735),
    		// destination: new google.maps.LatLng(1.419025,103.845469),

        // original route
        origin: new google.maps.LatLng(startPoint_lat, startPoint_lng),
        destination: new google.maps.LatLng(endPoint_lat,endPoint_lng),
        latLngPoints : latLngPoints,
  			travelMode: google.maps.DirectionsTravelMode.WALKING
  		}
  	};

  	// directions_service.route(route.request, function(response, status) {
  	// 	if (status == google.maps.DirectionsStatus.OK) {
  	// 		hyperlapse.generate( {route:response} );
  	// 	} else {
  	// 		console.log(status);
  	// 	}
  	// });
    hyperlapse.generate(route);

    handleMouseDown = (e) => {
      e.preventDefault();

      console.log("mouse down activated");
      this.setState({
        isMoving: true,
        onPointerDownPointerX: e.clientX,
        onPointerDownPointerY: e.clientY,
        px: hyperlapse.position.x,
        py: hyperlapse.position.y
      });
    }

    handleMouseMove = (e) => {
      e.preventDefault();

      let f = hyperlapse.fov() / 500;
      if (this.state.isMoving) {
        let dx = ( this.state.onPointerDownPointerX - e.clientX ) * f;
        let dy = ( e.clientY - this.state.onPointerDownPointerY ) * f;
        hyperlapse.position.x = this.state.px + dx; // reversed dragging direction (thanks @mrdoob!)
        hyperlapse.position.y = this.state.py + dy;
      }
    }

    handleMouseUp = (e) => {
      hyperlapse.position.x = this.state.px;
      hyperlapse.position.y = this.state.py;

      this.setState({
        isMoving: false,
      });
    }
  }

  // onClickButton() {
  //   console.log("clicked me!");
  // }


  render() {
    return (
      <div>
	      <div id="video_map" className="map-container"></div>
        <div id="pano"
          className="video-container"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}></div>
        <div id="controller">
          <VideoController Progress={this.state.Progress} Length={this.state.Length}
            Value={this.state.Value} LoadingBool={this.state.LoadingBool} />
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(Video);
