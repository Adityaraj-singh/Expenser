import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text,Button, TouchableNativeFeedback,ImageBackground,TouchableOpacity,View ,TextInput ,Image} from 'react-native';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';
import TopNav from './Nav/TopNav';


export default function App() {
  
   const [signup,Setsignup]=useState(false)

// { signup ? <Signup Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}
   
  return (
    <SafeAreaView style={styles.container}>
          
     <StatusBar style="auto"    networkActivityIndicatorVisible={true}  />


     <View style={styles.buttons}>
     <TopNav style={styles.top_navbar} />
     
     </View> 


     
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
    height:'100%',
    paddingTop:30
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
 
});
