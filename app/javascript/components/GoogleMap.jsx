import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: null
    };
  }

  static defaultProps = {
    center: {lat: 40.73, lng: -73.93},
    zoom: 10
  }

  // onChildMouseEnter = (evt) => {
  //   console.log(evt)
  // }

  // onChildMouseLeave = (evt) => {
  //   console.log(evt)
  // }

  render() {

    const markers = this.props.posts
    ? this.props.posts.map(( p, idx) => (
        <Marker
          key={idx}
          lat={p.lat}
          lng={p.lng}
        />
      ))
    : null

    return (
      <div style={{ height: '20rem', width: '100%' }}>
        <GoogleMapReact 
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_KEY, 
            language: 'en'
          }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
