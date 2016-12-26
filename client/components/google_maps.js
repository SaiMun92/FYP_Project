import React, { Component } from 'react';

class Maps extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const home = {lat: 1.413172,lng: 103.837521}
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 1.359803, lng: 103.819582}
      // coordinates of Singapore
    });
    const marker = new google.maps.Marker({
      position: home,
      map: map
    });
  }

  componentWillUpdate() {

    // const map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 14,
    //   center: {lat: {lat}, lng: {lng}}
    //   // coordinates of Singapore
    // });
  }

  render() {
    return (
      <div id="map" className="map-container"></div>
    );
  }
}

export default Maps;
