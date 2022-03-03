import { StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react'
import { Signupapi } from '../API/Authenticate';
const Signup = ({ Setsignup }) => {
    const [username, Setusername] = useState('')
    const [password, Setpassword] = useState('')
    const [emailerror, Setemailerror] = useState('')
    const [passwrror, Setpasserror] = useState('')
    const dispatch = useDispatch()
    async function Authenticate() {
        if (username.length > 0 && password.length > 0 && !emailerror && !passwrror) {
            let data = {
                username: username,
                password: password
            }
            const response = await Signupapi(data)

            if (JSON.stringify(response.success) == 'true') {
                console.log('frontend-response')

                console.log(response.success)
                dispatch({
                    type: 'Authenticate',
                    payload: {
                        value: {
                            id: response.token,
                            username: response.username,
                        }
                    }
                })
            }
            else {
                Setemailerror(response.error)
            }

        }
        else if (!password && !username) {
            Setemailerror('Please enter Username')
            Setpasserror('please enter password')
        }
        else if (password && password.length < 8) {
            Setpasserror('Password Should container atleast 8 chars')
        }
        else if (!password) {
            Setpasserror('please enter password')
        }
        else if (!username) {
            Setemailerror('Please enter Username')
        }


    }


    useEffect(() => {
        Setemailerror('')
        Setpasserror('')
    }, [username, password])
    return (
        <View style={stylesheet.main_container} >
            <ImageBackground source={require('../assets/Background.png')} style={stylesheet.background} >

                <Text style={stylesheet.signup_lable2}>
                    Hello
                </Text>
                <Text style={stylesheet.signup_lable22}>
                    Welcome
                </Text>

                <View style={stylesheet.inner_container} >
                    <Text style={stylesheet.signup_lable23}>Signup</Text>
                    <View style={{ width: '90%' }}>
                        <TextInput placeholder='Full Name' onChangeText={(text) => Setusername(text)} backgroundColor='none' style={stylesheet.input} />
                        <Text style={{ alignSelf: 'flex-start', color: 'red' }}> {emailerror}</Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <TextInput secureTextEntry={true} onChangeText={(text) => Setpassword(text)} placeholder='Password' style={stylesheet.input} />
                        <Text style={{ alignSelf: 'flex-start', color: 'red' }}> {passwrror}</Text>
                    </View>

                    <Pressable style={stylesheet.button} onPress={Authenticate} >
                        <Text style={stylesheet.text}>{'Signup->'}</Text>
                    </Pressable>
                </View>

                <Text onPress={() => Setsignup(false)} style={stylesheet.signupdirect_text}>ALready have an account?<Text style={stylesheet.inner_text_color}>Login</Text></Text>
            </ImageBackground>

        </View>

    )

}


const stylesheet = StyleSheet.create({
    main_label: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        top: '10%'

    },
    signup_lable2: {
        color: '#4F4F4F',
        width: '95%',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',

    },
    signup_lable22: {
        color: '#4F4F4F',
        width: '95%',

        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    signup_lable23: {
        color: '#4F4F4F',
        width: '95%',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },


    main_container: {



        width: '100%',
        height: '100%',

        alignItems: 'center',
        alignSelf: 'center',

    },
    inner_container: {
        top: 10,
        height: 300,
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: 'white',
        borderWidth: 4,
        paddingLeft: 20,
        borderColor: 'gray',
        borderRadius: 10
    }
    ,
    logo: {
        height: 100,
        width: 100,
        borderRadius: 8,
        marginTop: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        height: '20%',

        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#2F80ED',
    }
    , text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
    ,
    signupdirect_text: {
        position: 'relative',
        alignSelf: 'center',
        bottom: -40,
        color: 'black',
        fontSize: 14
    },

    inner_text_color: {
        position: 'relative',
        alignSelf: 'center',
        bottom: -40,
        color: '#2F80ED',
        fontSize: 14
    },
    background: {

        justifyContent: "center",
        width: '100%',
        height: '100%',

    }
    ,

})

export default Signup
