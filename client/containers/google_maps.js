import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let running_cord = [];

class Maps extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 1.359803, lng: 103.837521},
      // coordinates of Singapore
    });
  }

  componentDidUpdate() {
    // this.props.data is from the redux store which contains the gps coordinates.
    const runningPath = this.props.data.map((data) => {
      if (typeof data.location !== 'undefined') {
        const lat = data.location.latitude/10000000;
        const lng = data.location.longitude/10000000;
        // should not use this.setState as this will cause a re-render and the componentDidUpdate will be
        // called again. => this is what caused the infinite loop.
        running_cord.push({lat: lat, lng: lng });
      }
    });
    
    // i need to change this to the first available coordinates
    let start_lat = running_cord[0].lat;
    let start_lng = running_cord[0].lng;
    let end_lat = running_cord[running_cord.length-1].lat;
    let end_lng = running_cord[running_cord.length-1].lng;
    const startPoint = new google.maps.LatLng(start_lat, start_lng);
    const endPoint = new google.maps.LatLng(end_lat, end_lng);



    const centrePoint = google.maps.geometry.spherical.interpolate(endPoint, startPoint, 0.5);

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: centrePoint
      // coordinates of Singapore
    });
    const startPointMarker = new google.maps.Marker({
      position: startPoint,
      map: map,
      icon: {
        url: '/images/flag-start-orange.png', // url
        scaledSize: new google.maps.Size(24, 24), // scaled size
        anchor: new google.maps.Point(6,24) // anchor
      }
    });

    const endPointMarker = new google.maps.Marker({
      position: endPoint,
      map: map,
      icon: {
        url: '/images/flag-finish.png', // url
        scaledSize: new google.maps.Size(24, 24), // scaled size
        anchor: new google.maps.Point(0,24) // anchor
      }
    });

    var flightPath = new google.maps.Polyline({
      path: running_cord,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(map);
    running_cord = [];
  }

  render() {
    //console.log(this.props.polyline); // this is what gives the Array[0] in the beginning.
    console.log(running_cord);
    return (
      <div id="map" className="map-container"></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // current_Map: state.current_Map,
    data: state.data
  };
}

export default connect(mapStateToProps)(Maps);
