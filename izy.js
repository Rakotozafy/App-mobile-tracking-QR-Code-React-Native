import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import axios from 'axios';
// import Geolocation from '@react-native-community/geolocation';

// import * as Animatable from 'react-native-animatable';

import { url } from './api/api';



export default function App() {

  const [raw, setRaw] = useState({})


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  const [err, setError] = useState(0)
  const [err1, setError1] = useState(0)
  const [err2, setError2] = useState(0)
  const [autre, setAutre] = useState(0)


  const [position, setPosition] = useState({
    lat: '454554',
    lng: '00000',
  })


  const [datas, setDatas] = useState({});


  const ajoutmouvement = async (e, b) => {
    let tmpdata = datas;
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
      .catch((err) =>
        alert(err),
        setScanned(false),
        console.log(err));


    setError1(1)
    setError(0)
    setError2(0)
    alert("Mety Depart")
  };

  const ajoutmouvement2 = async (e, b) => {
    let tmpdata = datas;
    let d = new Date();
    let data = datas

    let z = data.produits[raw]
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
      .catch((err) =>
        alert(err),
        setScanned(false),
        console.log(err));


    setError2(1)
    setError1(0)
    alert("Mety arriver")
  };



  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();

}, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    //Split
    const res = data.split(";");

    setRaw(res[1])

    let tepr = res[0]
    let tai = res[1]

    await axios.get(`${url}/${tepr}`).then((res) =>
      setDatas(res.data)
    ).catch((err) =>
      alert("Ereur QR code veuillez choisir un autre "),
      console.log(err)
    );



    //   // Fin
    let va = datas

    let z = va.produits[tai]
    let x = z.mouvement
    let y = x[0]


    if (y.date_depart === null & y.lat_depart === null & y.lng_depart === null & y.date_arriver === null & y.lat_arriver === null & y.lng_arriver === null) {
      ajoutmouvement()
    } else if (y.date_depart !== null & y.lat_depart !== null & y.lng_depart !== null & y.date_arriver === null & y.lat_arriver === null & y.lng_arriver === null) {
      //jerena
      ajoutmouvement2()
    } if (y.date_depart !== null & y.lat_depart !== null & y.lng_depart !== null & y.date_arriver !== null & y.lat_arriver !== null & y.lng_arriver !== null) {
      setError(1)
      setError1(0)
      setError2(0)
      alert("feno")
      // console.log(y.date_arriver)
    }


  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      {err === 0 ? null :

        <Text style={styles.errorMsg}>Vous ètes arriver au destination , Veuillez choisir un autre produits</Text>

      }
      {err1 === 0 ? null :

        <Text style={styles.errorMsg1}>Votre position de depart est bien enregistrer</Text>

      }
      {err2 === 0 ? null :

        <Text style={styles.errorMsg1}>Position d'arriver bien enregistrer</Text>

      }
      {autre === 0 ? null :

        <Text style={styles.errorMsg1}>Erreur QR Code </Text>

      }
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  errorMsg1: {
    color: 'green',
    fontSize: 14,
  },
});