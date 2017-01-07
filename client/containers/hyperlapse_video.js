import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Video extends Component {
  componentDidMount() {
    var hyperlapse = new Hyperlapse(document.getElementById('pano'), {
  		lookat: new google.maps.LatLng(1.3431824453335746, 103.69153617919926),
  		zoom: 1,
  		use_lookat: true,
  		elevation: 50
	  });

  	hyperlapse.onError = function(e) {
  		console.log(e);
  	};

  	// This allows loading of panorama
  	hyperlapse.onRouteComplete = function(e) {
  		hyperlapse.load();
  	};

  	// once the loading of points have been completed, play the video
  	hyperlapse.onLoadComplete = function(e) {
  		hyperlapse.play();
  	};

  	// Google Maps API stuff here...
  	var directions_service = new google.maps.DirectionsService();

  	// takes the first and last destination
  	var route = {
  		request:{
  			origin: new google.maps.LatLng(1.4133064, 103.8392735),
  			destination: new google.maps.LatLng(1.419025,103.845469),
  			travelMode: google.maps.DirectionsTravelMode.DRIVING
  		}
  	};

  	directions_service.route(route.request, function(response, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
  			hyperlapse.generate( {route:response} );
  		} else {
  			console.log(status);
  		}
  	});
  }

  render() {
    return (
      <div id="pano" className="video-container"></div>
    );
  }
}

export default Video;
