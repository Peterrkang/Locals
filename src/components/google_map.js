import React, { Component }from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router';


export default class GoogleMaps extends Component{

  constructor(props){
    super(props);

    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      markers: this.props.markers
    };
  }

  onMarkerClick(targetMarker){
    this.setState({
      markers: Object.keys(this.state.markers).map((marker) => {
        const event = this.state.markers[marker]
        if (event === targetMarker) {
          if(event.showInfo == false){
            this.props.onClickEvent(event)
            return {
              ...event,
              showInfo: true
            };
          }else{
            return {
              ...event,
              showInfo: false
            };
          }
        }
        return event;
      })
    })
  }
  

  renderMarkers(){
    return Object.keys(this.state.markers).map((marker) => {
      const event = this.state.markers[marker];
          return (
            <Marker
              key={event.id}
              position={new google.maps.LatLng(parseFloat(event.lat), parseFloat(event.lng))}
              onClick={() => this.onMarkerClick(event)}
            >
              {event.showInfo && (
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
