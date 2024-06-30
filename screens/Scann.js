import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import * as Location from 'expo-location';


import { url } from '../api/api';

export default function Scan() {


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Gestion d'erreur
  const [err, setError] = useState(0)
  const [err1, setError1] = useState(0)
  const [err2, setError2] = useState(0)
  const [autre, setAutre] = useState("Oups , ereur QR code veuillez choisir un autre ")

  //Position
  const [position, setPosition] = useState({
    lat: '',
    lng: '',
  })

  useEffect(() => {

    // position

const getPosition = async()=>{
 const location =  await Location.getCurrentPositionAsync({
   enableHighAccurancy: true,  
 })
 setPosition({
  lat:location.coords.latitude,
  lng:location.coords.longitude
 })
}
getPosition()

//farany


    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();

  }, [position]);


  //Miscan

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const res = data.split(";");
    let id = res[0]
    let raw = res[1]
    let val;


try {
     await axios.get(`${url}/${id}`).then((res) => {
      val = (res.data);
    })
} catch (error) {
    alert(autre)
    return null
}

    let z = val.produits[raw]
    let x = z.mouvement
    let y = x[0]


    //rehefa tsisy ao anaty mouvement
if(x.length===0){

      let tmpdata = val;
      let rou = "En route"
      tmpdata.status = rou

      let d = new Date();
      tmpdata.produits[raw].mouvement = ({
        date_depart: d.toISOString(),
        date_arriver: null,
        lng_depart: position.lng,
        lat_depart: position.lat,
        lng_arriver: null,
        lat_arriver: null,
      });

      await axios
        .patch(`${url}/${tmpdata._id}`, tmpdata)
     

      setError1(1)
      setError(0)
      setError2(0)
      alert("Position de depart enregistrer")

                // rehefa tafiditra ny depart

    } else  if (x.length!==0  & y.date_arriver === null & y.lat_arriver === null & y.lng_arriver === null) {


      let tmpdata = val;
      let d = new Date();

      let dataa = val
      let z = dataa.produits[raw]
      let x = z.mouvement
      let y = x[0]

      let arr = "Arrivé"
      tmpdata.status = arr

      tmpdata.produits[raw].mouvement = ({
        date_depart: y.date_depart,
        date_arriver: d.toISOString(),
        lng_depart: y.lng_depart,
        lng_arriver: position.lng,
        lat_depart: y.lat_depart,
        lat_arriver: position.lat
      });

      await axios
        .patch(`${url}/${tmpdata._id}`, tmpdata)
    

      setError2(1)
      setError1(0)
      alert("Position d'arriver enregistrer ")



//feno daholo izy rehetra 
    } else {


      setError(1)
      setError1(0)
      setError2(0)
      alert("Position deja enregistrer")

    }



  };
  //Farany

  if (hasPermission === null) {
    return <Text>Activer la permission camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'access du camera</Text>;
  }





  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button style={styles.bt} title={'Scanner'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bt: {
    color: 'red'
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  errorMsg1: {
    color: 'green',
    fontSize: 14,
  },
});
