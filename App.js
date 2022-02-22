import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text,Button, TouchableNativeFeedback,ImageBackground,TouchableOpacity,View ,TextInput ,Image} from 'react-native';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';

export default function App() {
  
   const [signup,Setsignup]=useState(false)
  return (
    <SafeAreaView style={styles.container}>
          
     <StatusBar style="auto"    networkActivityIndicatorVisible={true}  />

     <ImageBackground source={require('./assets/Background.png')} style={styles.background} >
     <Text fadeDuration={2000}    numberOfLines={4} style={styles.text} onPress={()=>console.log('PResseingg')}>Expenser</Text>
     <View style={styles.buttons}>
     { signup ? <Signup Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}
   
     </View> 


        </ImageBackground>
     
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    justifyContent:'center',
    alignItems:'center'
   
  },
  inputbar:{
    width:'80%',
    backgroundColor:'transparent',
    borderBottomWidth:2,
    borderBottomColor:'black'
  }
  ,
  buttons:{
    width:'100%',
    height:'80%',
    
    
    marginTop:'auto'
  
  },
  button:{
    width:'100%',
    color:'green'
  }
  ,
  background:{
    flex: 5,
    justifyContent: "center",
    width: '100%',
    height: '100%',
  
  },
  text:{
    position:'absolute',
    top:'2%',
    marginTop:'10%',
    fontSize:28,
    fontWeight:'bold',
    color:'black',
    alignSelf:'flex-start'
  },
  loader: {
    position:'absolute',
    top:'50%',
    zIndex:2
  },
  background:{
    width: '100%',
    height: '100%',

  }
});
