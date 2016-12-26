import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Maps extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const home = {lat: 1.413172,lng: 103.837521}

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 1.359803, lng: 103.837521}
      // coordinates of Singapore
    });
    const marker = new google.maps.Marker({
      position: home,
      map: map
    });
  }

  componentDidUpdate() {
    let current_lat = this.props.current_Map.lat;
    let current_lng = this.props.current_Map.lng;
    const home = {lat: current_lat,lng: current_lng}
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: current_lat, lng: current_lng}
      // coordinates of Singapore
    });
    const marker = new google.maps.Marker({
      position: home,
      map: map
    });
  }

  render() {
    console.log(this.props.current_Map.lat, this.props.current_Map.lng);
    return (
      <div id="map" className="map-container"></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_Map: state.current_Map
  };
}

export default connect(mapStateToProps)(Maps);
