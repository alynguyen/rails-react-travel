import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: null,
    };
  }

  static defaultProps = {
    zoom: 10
  }

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

    const infoBox = this.props.hover
    ? "lskdjf"
    : "laksdf"

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
          onChildMouseEnter={this.props.onMarkEnter}
          onChildMouseLeave={this.props.onMarkLeave}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
