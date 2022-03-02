import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import React from 'react';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';

import { useState } from 'react';
import Navigation from './Navigation/Navigation';

import { Provider } from 'react-redux';
import { Store } from './contextStore/Store';

export default function App() {


  const [sidebar, Setsidebar] = useState(false)


  //    {user ? <Navigation /> : signup ? <Signup Setuser={Setuser} Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}


  return (
    <Provider store={Store} >
      <View style={styles.buttons}>
        <Navigation />
      </View>
    </Provider>
  )

}




const styles = StyleSheet.create({
  grouplist: {
    position: 'relative',
    marginTop: '40%',

    width: '100%',
    height: 400
  },
  container: {
    alignItems: 'center',
    height: "100%",
    width: '100%'

  },
  buttons: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 1
  }

  ,
  dashboard: {
    position: 'relative',
    top: '10%',
    height: null,
    width: '100%',

    zIndex: 0
  }
  ,
  background: {
    flex: 5,
    justifyContent: "center",
    width: '100%',
    height: '100%',

  },
  item: {

    padding: 20,
    width: '120%',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    width: '100%',
    justifyContent: 'center',
    fontWeight: 'bold',
  }
});
