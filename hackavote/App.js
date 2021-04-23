import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as apikey from './api.json';


export default function App() {
  const [location, setLocation] = useState(null);
  const [revlocation, setRevLocation] = useState(null);
  const [voteLocation, setVoteLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [step, setStep] = useState(0);

  _getAddress = () => {
    fetch(`http://api.positionstack.com/v1/reverse?access_key=${apikey.geokey}&query=${voteLocation.latitude},${voteLocation.longitude}`)
  .then(response => response.json())
  .then(data => {console.log(data.data[0].label); setRevLocation(data.data[0].label)});
  }

  const locationSet = async () =>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Sorry, we need access to your location');
        return;
      }
      console.log(status);
      console.log('Here');

      let location = await Location.getCurrentPositionAsync({});
      setLocation({"latitude":location.coords.latitude, "longitude":location.coords.longitude});
      setVoteLocation({"latitude":location.coords.latitude, "longitude":location.coords.longitude});
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View style={styles.container}>
      <Image source={require('./src/logo.png')}></Image>
      <View style={styles.main}>
        <View style={styles.boxBot}>
          <Text style={styles.text}>Hello and welcome to GoVote! I am GoVote’s digital assistant. I can tell you everything you need to know about your local election.</Text>
        </View>
        <View style={styles.boxBot}>
          <Text style={styles.text}>But first, I'll need your address to give you the right information. </Text>
        </View>
        <View style={styles.boxBot}>
          <Text style={styles.text}>Your personal information will only be used to find your specific ballot. It will be deleted after for your protection unless you specify otherwise. </Text>
        </View>
        {step==0 &&<View style={styles.boxBot}>
          <Text style={styles.text}>What is the address you’re registered to vote at? </Text>
        </View>}
        {step==1 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Okay. Just to confirm, your address is {revlocation}. Is that correct?  </Text>
        </View>}
        <View>
          {!location && step ==0 &&<TouchableOpacity onPress={()=>locationSet()}><View style={styles.boxButton}>
            <Text style={styles.btntext}>Set Location</Text></View></TouchableOpacity>}
          {location != null &&<View><MapView
        style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e)=>setVoteLocation(e.nativeEvent.coordinate)}
        >
      <Marker
        coordinate={voteLocation}
      /></MapView>
      <TouchableOpacity onPress={()=>{setLocation(null);setStep(1);_getAddress();}}><View style={styles.boxButton}>
            <Text style={styles.btntext}>Confirm</Text></View></TouchableOpacity></View> }
        </View>
      </View>
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
  main: {
    marginTop:'5%',
    width:'80%'
  },
  boxBot: {
    backgroundColor:'#02174D',
    borderBottomEndRadius:20,
    borderTopEndRadius:20,
    borderTopLeftRadius:20,
    paddingHorizontal:'5%',
    paddingVertical:'2.5%',
    marginBottom:'2.5%'
  },
  boxButton: {
    backgroundColor:'#B81500',
    borderRadius:12,
    paddingHorizontal:'5%',
    paddingVertical:'2.5%',
    marginBottom:'2.5%'
  },
  text: {
    fontFamily:'Roboto',
    color:'#FFF',
    fontSize:18
  },
  btntext: {
    fontFamily:'Roboto',
    color:'#FFF',
    fontSize:18,
    textAlign:'center',
  },
  map: {
    height:200,
    width:'100%',
  }
});
