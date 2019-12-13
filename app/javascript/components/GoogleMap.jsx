import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import MarkerInfo from './MarkerInfo';
import Posts from './Posts';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      currentCenter: {lat: this.props.markLat, lng: this.props.markLng}
    };
  }

  static defaultProps = {
    zoom: 10
  }

  onChange() {
    console.log("change")
    // this.setState = {
    //   center: {
    //     lat: this.props.markLat,
    //     lng: this.props.markLng
    //   }
    // }
  }

  render() {

    const setCenter = this.props.markLat === null ? ({lat: this.props.lat, lng: this.props.lng}) : ({lat: this.props.markLat, lng: this.props.markLng})

    const markers = this.props.posts
    ? this.props.posts.map(p => (
        <Marker
          key={p.id}
          lat={p.lat}
          lng={p.lng}
          reference={p.reference}
          id={p.id}
        />
      ))
    : null

    const infoBox = this.props.hover
    ? <MarkerInfo
        lat={this.props.markLat}
        lng={this.props.markLng}
        reference={this.props.markRef}
        id={this.props.markId}
      />
    : null

    return (
      <div style={{ height: '20rem', width: '100%' }}>
        <GoogleMapReact 
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_KEY, 
            language: 'en'
          }}
          // center={{
          //   lat: this.props.lat,
          //   lng: this.props.lng
          // }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
          // _onChange={this.onChange}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onChildMouseEnter={this.props.onMarkEnter}
          onChildMouseLeave={this.props.onMarkLeave}
        >
          {markers}
          {infoBox}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
