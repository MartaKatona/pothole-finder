import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// import MapView, { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

import Geolocation from './Geolocation.js';
import LocationButton from './LocationButton.js'

let {height, width} = Dimensions.get('window');

import markerData from '../dataM.json';

// var markerData = require('../../../../Node/public/data/data.json');

export default class potholeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.3069,
        longitude: -157.8583,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.1952,
      },
      markers:[
        {
          latlng: {
          latitude: 21.3069,
          longitude: -157.8583},
          title: "first marker" ,
          description: "FIRST"
        },
        {
          latlng: {
          latitude: 22.3069,
          longitude: -157.8583},
          title: "purple marker" ,
          description: "purple"
        }
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
  }

componentWillMount(){
  var pins = [];
  markerData.features.forEach((data) => {
    var lat = data.geometry.coordinates[1];
    var lng = data.geometry.coordinates[0];
    var markerObj = {
      latlng: {
        latitude: lat,
        longitude: lng
      }
    }
      pins.push(markerObj);
  })
    this.setState({
      markers: pins
    })
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  moveMaptoLocation(newPotHole) {
    newPotHole.latitude = newPotHole.latitude+0.002;
    newPotHole.longitude = newPotHole.longitude+0.002;
    let newMarker = {
      latlng: {latitude: newPotHole.latitude, longitude: newPotHole.longitude},
      title: "Oops",
      description: "Hit a new pothole",
    };
    this.state.markers.push(newMarker);
    let pushedMarker = this.state.markers;
    this.setState(pushedMarker);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={false}
          showsCompass={false}
          showsPointOfInterest={false}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        <MapView.Marker
          coordinate={{
          latitude: 21.2951,
          longitude: -157.8435}}
          image={require('../assets/yellow.png')}
        />
        <MapView.Marker
          coordinate={{
          latitude: 21.29637186884782,
          longitude: -157.8498888015747}}
          image={require('../assets/purple.png')}
        />
        <MapView.Marker
          coordinate={{
          latitude: 21.302649354160145,
          longitude: -157.85181999206543}}
          image={require('../assets/sports.png')}
        />
        {this.state.markers.map((marker,i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            image={require('../assets/pothole.png')}
            title={marker.title}
            description={marker.description}
          />
        ))}
        </MapView>
        <View style={styles.container}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}

          </Text>
            <LocationButton
              moveMaptoLocation={this.moveMaptoLocation}
              region={this.state.region}
              markers={this.state.markers}/>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    // flex: 1
    width: width,
    height: height*2/3
  }
});
