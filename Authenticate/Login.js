import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  Pressable,
  ImageBackground,
  View,
  TextInput,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AddProfile, Signinapi } from "../API/Authenticate";
import { Getuser } from "../API/Getuser";
import Loader from "../Loader/Loader";
const Login = ({ Setsignup, Setuser }) => {
  const credentials = {
    username: "aditya@orgzit.com",
    password: "password",
  };
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state);
  const loaderstate = useSelector((state) => state.LoaderReducer);
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState("");

  async function Login() {
    if (!username || !password) {
      Seterror("Please fill both fields");
    } else {
      dispatch({
        type: "Load",
        payload: {
          isloading: true,
          text: "Logging in..",
        },
      });
      console.log("----------");
      console.log(loaderstate);
      const response = await Signinapi({ username, password });
      console.log(response);
      if (JSON.stringify(response.success) == "true") {
        await Getuser({ username: response.username, token: response.token })
          .then((data) => {
            data.objects.map((item) => {
              if (item.username == response.username) {
                dispatch({
                  type: "Authenticate",
                  payload: {
                    value: {
                      resource_uri: item.resource_uri,
                      id: response.token,
                      username: response.username,
                    },
                  },
                });
                dispatch({
                  type: "Load",
                  payload: {
                    isloading: false,
                    text: "Logging in",
                  },
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dispatch({
          type: "Load",
          payload: {
            isloading: false,
            text: "Logging in",
          },
        });
        Seterror(response.error);
      }
    }
  }

  useEffect(() => {
    Seterror("");
  }, [username, password]);

  return (
    <View style={stylesheet.main_container}>
      <ImageBackground
        blurRadius={loaderstate.isloading ? 90 : 0}
        source={require("../assets/Background.png")}
        style={stylesheet.background}
      >
        {loaderstate.isloading ? (
          <View
            style={{
              position: "absolute",
              height: 200,
              width: "100%",
              zIndex: 100,
            }}
          >
            <Loader />
          </View>
        ) : null}

        <Text style={stylesheet.login_lable2}>Welcome Back</Text>

        <View style={stylesheet.inner_container}>
          <Text style={stylesheet.login_lable3}>Login</Text>
          <TextInput
            onChangeText={(text) => Setusername(text)}
            placeholder="Username"
            backgroundColor="none"
            style={stylesheet.input}
          />
          <TextInput
            onChangeText={(pp) => Setpassword(pp)}
            secureTextEntry={true}
            placeholder="Password"
            style={stylesheet.input}
          />
          <View>
            <Text style={{ alignSelf: "flex-start", color: "red" }}>
              {" "}
              {error}
            </Text>
          </View>
          <Pressable style={stylesheet.button} onPress={Login}>
            <Text style={stylesheet.text}>{"Login->"}</Text>
          </Pressable>
        </View>

        <Text
          onPress={() => Setsignup(true)}
          style={stylesheet.signupdirect_text}
        >
          Don't Have an Account?
          <Text style={stylesheet.inner_signup_direct}>Signup</Text>
        </Text>
      </ImageBackground>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  main_label: {
    position: "relative",
    fontSize: 30,
    fontWeight: "bold",
    bottom: "5%",
  },

  login_lable: {
    color: "#4F4F4F",
    width: "95%",
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  login_lable2: {
    color: "#4F4F4F",
    width: "95%",
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  login_lable3: {
    color: "#4F4F4F",
    width: "95%",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  main_container: {
    width: "100%",
    height: "100%",

    alignItems: "center",
    alignSelf: "center",
  },
  inner_container: {
    top: 20,
    height: 300,
    width: "95%",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    shadowOpacity: 1,
    shadowColor: "#000",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: "gray",
    borderRadius: 10,
  },
  background: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
    height: "15%",
    width: "60%",
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#2F80ED",
  },
  text: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,

    color: "white",
  },
  signupdirect_text: {
    position: "relative",
    alignSelf: "center",
    bottom: -40,
    color: "black",
    fontSize: 14,
  },
  inner_signup_direct: {
    position: "relative",
    alignSelf: "center",
    bottom: -20,
    color: "#2F80ED",
    fontSize: 14,
  },
});

export default Login;
