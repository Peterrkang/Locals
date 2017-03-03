import React, { Component }from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router';
import _ from 'lodash';


export default class GoogleMaps extends Component{

  constructor(props){
    super(props);

    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      marker: ''
    };
  }

  onMarkerClick(targetMarker){
    this.props.onClickEvent(this.props.markers[targetMarker]);
    this.setState({
      marker: targetMarker
    })
  }




  renderMarkers(){
    let events = {};
    if(this.props.onSearch.length > 0){
      Object.keys(this.props.markers).map((marker) => {
        const searchLowerCase = this.props.onSearch.toLowerCase()
        if(this.props.markers[marker].title.toLowerCase().includes(searchLowerCase) || this.props.markers[marker].description.toLowerCase().includes(searchLowerCase)){
          events[marker] = this.props.markers[marker]
        }
      });
    }else{
      events = this.props.markers
    }

    return Object.keys(events).map((marker) => {
      const event = events[marker];
          return (
            <Marker
              key={marker}
              position={new google.maps.LatLng(parseFloat(event.lat), parseFloat(event.lng))}
              onClick={() => this.onMarkerClick(marker)}
            >
              {this.state.marker === marker && (
                <InfoWindow>
                  <div>
                    <strong>{event.title}</strong>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
      })
    }

    render(){
      const { lat, lng } = this.state;
      return(
        <GoogleMapLoader
          containerElement={<div style={{height: '100%'}} />}
          googleMapElement={
            <GoogleMap
              defaultZoom={12}
              defaultCenter={{lat: lat, lng: lng}}
            >
              { this.renderMarkers() }
            </GoogleMap>
          }
        />
      );
    }

}
