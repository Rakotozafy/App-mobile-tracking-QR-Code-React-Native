import react from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';

export default function SettingsScreen() {
const [position , setPosition]= react.useState({
  lat:'',
  lng:''
})
react.useEffect(() => {

const getPosition = async()=>{
 const location =  await Location.getCurrentPositionAsync({})
 setPosition({
  lat:location.coords.latitude,
  lng:location.coords.longitude
 })
}
getPosition()
// console.log(location)
}, [position]) 

  return (
    <View style={styles.container}>
      <Text>
        longitude : {position.lng}
        latitude : {position.lat}
      </Text>
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
});
