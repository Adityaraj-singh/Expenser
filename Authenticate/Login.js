import { StyleSheet,SafeAreaView, Text,Button,Pressable ,ImageBackground,View ,TextInput ,Image} from 'react-native';



const Login =({Setsignup})=>{

    return(


<View style={stylesheet.main_container} >
<ImageBackground source={require('../assets/Background.png')} style={stylesheet.background} >
<Text fadeDuration={2000}  style={stylesheet.main_label}   numberOfLines={4}  onPress={()=>console.log('PResseingg')}>Expenser</Text>
<Text style={stylesheet.login_lable}>
              Hello
            </Text>
            <Text style={stylesheet.login_lable2}>
            Welcome Back
            </Text>
    
    <View style={stylesheet.inner_container} >
    <Text style={stylesheet.login_lable3}>Login</Text>
    <TextInput  placeholder='Username' backgroundColor='none' style={stylesheet.input}  />
    <TextInput secureTextEntry={true} placeholder='Password' style={stylesheet.input} />
    <Pressable style={stylesheet.button} >
      <Text style={stylesheet.text}>{'Login->'}</Text>
    </Pressable>
    </View>

        <Text onPress={()=>Setsignup(true)} style={stylesheet.signupdirect_text}>Don't Have an Account?<Text style={stylesheet.inner_signup_direct}>Signup</Text></Text>
</ImageBackground>

</View>

    )

}

const  stylesheet=StyleSheet.create({
main_label:{
    position:'relative',
    fontSize:30,
    fontWeight:'bold',
    bottom:'5%'
  
},  

    login_lable:{
        color:'#4F4F4F',
        width:'95%',
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
       
    },
    login_lable2:{
        color:'#4F4F4F',
        width:'95%',
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        borderBottomColor:'black',
        borderBottomWidth:2
    },
    login_lable3:{
        color:'#4F4F4F',
        width:'95%',
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        borderBottomColor:'black',
        borderBottomWidth:2
    },
 main_container:{
    
        backgroundColor:'red',

   
     width:'100%',
     height:'100%',
    
        alignItems:'center',
     alignSelf:'center',
    
  
 },
 inner_container:{ 
    top:20,
 height:300,
 width:'100%',
    alignItems:'center',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    paddingLeft:10,
    paddingRight:10
 },
 input:{
    width:"100%",
    height:40,
    backgroundColor:'white',
    borderWidth:4,
    paddingLeft:20,
    borderColor:'gray',
    borderRadius:10,
    shadowColor:'blue',
   
    
       
},
background:{
  
    justifyContent: "center",
    width: '100%',
    height: '100%',
  
  }
,
logo:{
    height:100,
    width:100,
    borderRadius:8,
    marginTop:10
},
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    height:'20%',
 
    borderRadius:30,
    elevation: 3,
    backgroundColor: '#2F80ED',
  }
  ,text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
  ,
signupdirect_text:{
position:'relative',
alignSelf:'center',
bottom:-40,
color:'black',
fontSize:14
},
inner_signup_direct:{
    position:'relative',
    alignSelf:'center',
    bottom:-20,
    color:'#2F80ED',
    fontSize:14
    }
})


export default Login