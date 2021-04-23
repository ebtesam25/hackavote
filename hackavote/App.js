import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as apikey from './api.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [location, setLocation] = useState(null);
  const [revlocation, setRevLocation] = useState(null);
  const [voteLocation, setVoteLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [response, setResponse] = useState(null);
  const [step, setStep] = useState(0);


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@location', value)
    } catch (e) {
      // saving error
    }
  }

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
      setLocation({"latitude":40.651359, "longitude":-73.940059});
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
        {step <3 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Hello and welcome to GoVote! I am GoVote’s digital assistant. I can tell you everything you need to know about your local election.</Text>
        </View>}
        {step<3 &&<View style={styles.boxBot}>
          <Text style={styles.text}>But first, I'll need your address to give you the right information. </Text>
        </View>}
        {step <3 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Your personal information will only be used to find your specific ballot. It will be deleted after for your protection unless you specify otherwise. </Text>
        </View>}
        {step==0 &&<View style={styles.boxBot}>
          <Text style={styles.text}>What is the address you’re registered to vote at? </Text>
        </View>}
        {step==1 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Okay. Just to confirm, your address is {revlocation}. Is that correct?  </Text>
        </View>}
        {step==2 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like me to save this address so you don’t have to re-enter it next time?   </Text>
        </View>}
        {step==3 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Wonderful, it's saved.  </Text>
        </View>}
        {step==3 &&<View style={styles.boxBot}>
          <Text style={styles.text}>You can ask me about candidates, ballot issues, or your polling location. What would you like to start with?  </Text>
        </View>}
        {step==4 &&<View style={styles.boxBot}>
          <Text style={styles.text}>There are a lot of candidates for this election. Let’s break it down so it’s not too overwhelming.   </Text>
        </View>}
        {step==4 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Let's start with mayoral candidates. The mayor decides the city's agenda and budget, which affects affordable housing, transportation, schools, and more.    </Text>
        </View>}
        {step==4 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you to hear about the candidates for mayor?   </Text>
        </View>}
        {step==5 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The first three candidates are Eric Adams, Shaun Donovan, and Kathryn Garcia.   </Text>
        </View>}
        {step==5 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like to know more about any of these candidates or would you like more options?    </Text>
        </View>}
        {step==6 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The next three candidates are Curtis Sliwa, Fernando Mateo, and Ray McGuire.   </Text>
        </View>}
        
        {step==7 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Sure!   </Text>
        </View>}
        {step==7 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Eric Adams served as a New York City Transit Police and Police Department Officer for over two decades.   </Text>
        </View>}
        {step==7 &&<View style={styles.boxBot}>
          <Text style={styles.text}>He served in the New York State Senate from 2006 to 2013. In 2013, Adams was elected Brooklyn Borough President, the first African American to hold the position. He was reelected in November 2017.  </Text>
        </View>}
        {step==7 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like to know anything else? Or would you like to hear about another candidate?   </Text>
        </View>}
        {step==8 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Adams introduced a bill in the New York City Council that would require all municipal buildings to have lactation rooms. The bill was passed in 2016.   </Text>
        </View>}
        {step==8 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like to know anything else? Or would you like to hear about another candidate?   </Text>
        </View>}
        {step==9 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Adams has advocated for making two-year CUNY colleges free.   </Text>
        </View>}
        {step==9 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like to know anything else? Or would you like to hear about another candidate?   </Text>
        </View>}

        {/*Polling Information*/}
        {step==10 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The June primary election is on June 22, 2021   </Text>
        </View>}
        {step==10 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The deadline to register to vote is Friday, May 28 and early voting begins on Saturday, June 12. The deadline to request an absentee ballot is June 15.   </Text>
        </View>}
        {step==11 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Your polling location is at Fenimore Street United Methodist Church at 266 Fenimore St, Brooklyn, NY 11225.     </Text>
        </View>}
        {step==12 &&<View style={styles.boxBot}>
          <Text style={styles.text}>You don't need ID if you submitted your ID with your registration, but if you didn't, you'll need your driver's license.     </Text>
        </View>}
        {step==12 &&<View style={styles.boxBot}>
          <Text style={styles.text}>You also might want to bring a bottle of water and a case in case it's hot outside and there's a long line!     </Text>
        </View>}
        {step==12 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Is there anything else you need to be prepared for election day?     </Text>
        </View>}
        {step==13 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Okay     </Text>
        </View>}
        {step==14 &&<View style={styles.boxBot}>
          <Text style={styles.text}>There are two statewide ballot measues. 
One is an amendment for redistricing changes. 
The second is an amendment for environmental rights.     </Text>
        </View>}
        {step==14 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Which ballot measure would you like to hear about first?.     </Text>
        </View>}
        {step==15 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Ballot Measure 1 is about redistricting.      </Text>
        </View>}
        {step==15 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Do you want to know what redistricting is or do you want to know more about the ballot measure?      </Text>
        </View>}
        {step==16 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Redistricting is the process of drawing boundaries for each voting district, which affects the control of political power in each district.      </Text>
        </View>}
        {step==16 &&<View style={styles.boxBot}>
          <Text style={styles.text}>So, do you want to know more about the ballot measure now?      </Text>
        </View>}
        {step==17 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The Redistricting Changes Amendment will require that all residents are counted, including people that are not citizens or that are in jail.      </Text>
        </View>}
        {step==17 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Also, a simple majority vote would be enough to adopt plans regardless of party control.      </Text>
        </View>}
        {step==18 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Of course.      </Text>
        </View>}
        {step==18 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The Redistricting Changes Amendment will require that all residents are counted, including people that are not citizens or that are in jail.      </Text>
        </View>}
        {step==18 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Also, a simple majority vote would be enough to adopt plans regardless of party control.      </Text>
        </View>}
        {step==18 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Would you like more information or do you want to hear about Ballot Measure 2?       </Text>
        </View>}

        {step==19 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Sounds good.      </Text>
        </View>}
        {step==19 &&<View style={styles.boxBot}>
          <Text style={styles.text}>The Environmental Rights Amendment will give all people in New York a state constitutional right to clean air, clean water, and a healthful environment.     </Text>
        </View>}
        {step==19 &&<View style={styles.boxBot}>
          <Text style={styles.text}>This measure would require the government to consider the impact on Earth throughout the legislation's decision making.     </Text>
        </View>}
        {step==19 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Is there anything else you want to know?     </Text>
        </View>}

        {step==20 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Okay! If you need any more information, you can visit govote.info. I am available 24/7.      </Text>
        </View>}
        {step==20 &&<View style={styles.boxBot}>
          <Text style={styles.text}>Thank you using GoVote! Your vote matters. Have a great day!      </Text>
        </View>}



        {step>=6 && step<20 &&<View style={styles.userBox}>
          <TextInput value={response} onChangeText={(e)=>setResponse(e)} style={styles.text} placeholder="Type your response" placeholderTextColor="#EAEAEA"></TextInput>
        </View>}



        <View>
          {!location && step ==0 &&<TouchableOpacity onPress={()=>locationSet()}><View style={styles.boxButton}>
            <Text style={styles.btntext}>Set Location</Text></View></TouchableOpacity>}
            {step==1 &&<TouchableOpacity onPress={()=>setStep(2)}><View style={styles.boxButtonBlue}>
            <Text style={styles.btntext}>Yes, that's right</Text></View></TouchableOpacity>}
            {step==1 &&<TouchableOpacity onPress={()=>setStep(0)}><View style={styles.boxButton}>
            <Text style={styles.btntext}>No, change my location</Text></View></TouchableOpacity>}


           
            {step==2 &&<TouchableOpacity onPress={()=>{setStep(3);storeData(revlocation)}}><View style={styles.boxButtonBlue}>
            <Text style={styles.btntext}>Yes, please</Text></View></TouchableOpacity>}
            {step==2 &&<TouchableOpacity onPress={()=>setStep(0)}><View style={styles.boxButton}>
            <Text style={styles.btntext}>No, thank you</Text></View></TouchableOpacity>}


            {step==3 &&<TouchableOpacity onPress={()=>{setStep(4);}}><View style={styles.boxButtonBlue}>
            <Text style={styles.btntext}>Candidates</Text></View></TouchableOpacity>}
            {step==3 &&<TouchableOpacity onPress={()=>setStep(14)}><View style={styles.boxButtonThree}>
            <Text style={styles.btntext}>Ballot Issues</Text></View></TouchableOpacity>}
            {step==3 &&<TouchableOpacity onPress={()=>setStep(0)}><View style={styles.boxButton}>
            <Text style={styles.btntext}>Polling Location</Text></View></TouchableOpacity>}


            {step==4 &&<TouchableOpacity onPress={()=>{setStep(5);}}><View style={styles.boxButtonBlue}>
            <Text style={styles.btntext}>Sure</Text></View></TouchableOpacity>}

            {step==5 &&<TouchableOpacity onPress={()=>{setStep(7);}}><View style={styles.boxButtonBlue}>
            <Text style={styles.btntext}>Tell me more about them</Text></View></TouchableOpacity>}
            {step==5 &&<TouchableOpacity onPress={()=>setStep(6)}><View style={styles.boxButton}>
            <Text style={styles.btntext}>Other options</Text></View></TouchableOpacity>}
            {step>=6 && step<20 &&<TouchableOpacity onPress={()=>{setStep(step+1);setResponse('');}}><View style={styles.sendbtn}>
            <Text style={styles.btntext}>Send</Text></View></TouchableOpacity>}




          {location != null &&<View><MapView
        style={styles.map}
          initialRegion={{
            latitude: 40.651359, 
            longitude: -73.940059,
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
  userBox: {
    backgroundColor:'#B81500',
    borderBottomLeftRadius:20,
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
  sendbtn: {
    backgroundColor:'#B81500',
    borderRadius:12,
    paddingHorizontal:'5%',
    paddingVertical:'2.5%',
    marginBottom:'2.5%',
    width:'30%',
    alignSelf:'flex-end'
  },
  boxButtonBlue: {
    backgroundColor:'#3B89FD',
    borderRadius:12,
    paddingHorizontal:'5%',
    paddingVertical:'2.5%',
    marginBottom:'2.5%'
  },
  boxButtonThree: {
    backgroundColor:'#e06404',
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
