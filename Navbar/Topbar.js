import { StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';

import { useEffect } from 'react';

const Topbar = ({ Setsidebar, sidebar }) => {

  return (

    <SafeAreaView >
      <View style={stylesheet.main_container} >
        <View style={stylesheet.backbutton}>
          <Pressable onPress={() => Setsidebar(!sidebar)}>
            <Ionicons name="menu" size={40} color="white" backgroundColor="transparent" />
          </Pressable>



        </View>
        <View style={stylesheet.navlogo}>
          <Text style={stylesheet.navlogo_text}>
            Expen<Text style={{ color: 'green' }}>$</Text>er
          </Text>

        </View>
        <View>
          <Text style={stylesheet.sub_function} > + </Text>
        </View>
        <View>

        </View>
      </View>

    </SafeAreaView>
  )




}

const stylesheet = StyleSheet.create({
  backbutton: {
    position: 'relative',
    top: 0
  },
  main_container: {

    justifyContent: 'center',

    backgroundColor: '#4293FF',
    height: 60,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    top: 30,
    justifyContent: 'space-between'

  },
  text: {
    color: 'white',
    fontSize: 32,
    top: 10
  },
  navlogo: {
    width: '60%',
    height: '100%',

  },
  navlogo_text: {
    fontSize: 28,
    color: 'white',
    top: 5,
    fontWeight: 'bold'
  },
  sub_function: {
    fontSize: 32,
    color: 'white',
    top: 5
  },
  hamburger: {
    height: 40, width: 40,
    marginTop: '30%'
  }
})

export default Topbar