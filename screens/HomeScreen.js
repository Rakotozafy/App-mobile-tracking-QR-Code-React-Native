import react, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function HomeScreen() {
  const [position, setPosition] = react.useState({
    lat: '',
    lng: '',
  })
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission refusé");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccurancy: true,
      })
      setPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    })()

    // const getPosition = async () => {
    //   const location = await Location.getCurrentPositionAsync({})
    //   setPosition({
    //     lat: location.coords.latitude,
    //     lng: location.coords.longitude
    //   })
    // }
    // getPosition()
    // console.log(position)
  }, [position])



  const regionn = {
    latitude: -21.4430678,
    longitude: 47.0813523,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }
  // let text = 'Waiting...'
  // if (errorMsg) {
  //   text = errorMsg
  // } else if (position) {
  //   text = JSON.stringify(position)
  // }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={regionn}
        showsUserLocation={true}
        showsCompass={true}

      >
        {/* <Marker
          coordinate={
            {
              latitude: -21.4430678,
              longitude: 47.0813523,
            }
          }
        /> */}

      </MapView>
      <Text> latitude: {position.lat} </Text>
      <Text> longitude: {position.lng} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
  }
});
