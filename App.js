import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, Button, TouchableNativeFeedback, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import * as React from 'react';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';
import Topbar from './Navbar/Topbar';
import Sidebar from './Navbar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import GroupList from './Groups/Groups';
import AddExpense from './Groups/AddExpense';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { useState } from 'react';
import Navigation from './Navigation/Navigation';
import GroupDetail from './Groups/GroupDetail';
export default function App() {

  const [signup, Setsignup] = useState(false)
  const [sidebar, Setsidebar] = useState(false)

  const [user, Setuser] = useState(1)

  const credentials = {
    username: 'adityaraj',
    password: 'password'
  }
  //    {user ? <Navigation /> : signup ? <Signup Setuser={Setuser} Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}
  return (

    <View style={styles.buttons}>
      {user ? <Navigation /> : signup ? <Signup Setuser={Setuser} Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}
    </View>
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
