import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AddProfile, Signupapi } from "../API/Authenticate";
import { Getuser, SingleUser } from "../API/Getuser";
const Signup = ({ Setsignup }) => {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [fname, Setfname] = useState("");
  const [lname, setlname] = useState("");
  const [usernameerror, Setusernameerror] = useState("");
  const [passwrror, Setpasserror] = useState("");
  const dispatch = useDispatch();
  async function Authenticate() {
    if (
      username.length > 0 &&
      password.length > 0 &&
      fname.length > 0 &&
      lname.length > 0 &&
      email.length > 0 &&
      !usernameerror &&
      !passwrror
    ) {
      let data = {
        username: username,
        password: password,
        email: email,
        first_name: fname,
        last_name: lname,
      };
      const response = await Signupapi(data);

      if (JSON.stringify(response.success) == "true") {
        await AddProfile(
          { profile_user: `/user/${response.id}/` },
          { username: response.username, token: response.token }
        ).then((res) => {
          console.log("response of addprofile");
          console.log(res);
        });
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
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Setusernameerror(response.error);
      }
    }

    if (!fname) {
      Setpasserror("enter First name");
    }
    if (!lname) {
      Setpasserror("Enter Last Name");
    }
    if (!email) {
      Setusernameerror("Enter Email");
    } else if (!password && !username) {
      Setusernameerror("Please enter Username");
      Setpasserror("please enter password");
    } else if (password && password.length < 8) {
      Setpasserror("Password Should container atleast 8 chars");
    } else if (!password) {
      Setpasserror("please enter password");
    } else if (!username) {
      Setusernameerror("Please enter Username");
    }
  }

  useEffect(() => {
    Setusernameerror("");
    Setpasserror("");
  }, [username, password]);
  return (
    <View style={stylesheet.main_container}>
      <ImageBackground
        source={require("../assets/Background.png")}
        style={stylesheet.background}
      >
        <Text style={stylesheet.signup_lable22}>Signup</Text>

        <View style={stylesheet.inner_container}>
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="First Name"
              onChangeText={(text) => Setfname(text)}
              backgroundColor="none"
              style={stylesheet.input}
            />
          </View>
          <View style={{ width: "90%" }}>
            <TextInput
              onChangeText={(text) => setlname(text)}
              placeholder="Last Name"
              style={stylesheet.input}
            />
          </View>
          <View style={{ width: "90%" }}>
            <TextInput
              onChangeText={(text) => Setemail(text)}
              placeholder="email"
              style={stylesheet.input}
            />
          </View>
          <View style={{ width: "90%" }}>
            <TextInput
              onChangeText={(text) => Setusername(text)}
              placeholder="Username"
              style={stylesheet.input}
            />
          </View>
          <View style={{ width: "90%" }}>
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => Setpassword(text)}
              placeholder="Password"
              style={stylesheet.input}
            />
          </View>
          <Text
            style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}
          >
            {" "}
            {usernameerror || passwrror}
          </Text>
          <Pressable style={stylesheet.button} onPress={Authenticate}>
            <Text style={stylesheet.text}>{"Signup->"}</Text>
          </Pressable>
        </View>

        <Text
          onPress={() => Setsignup(false)}
          style={stylesheet.signupdirect_text}
        >
          ALready have an account?
          <Text style={stylesheet.inner_text_color}>Login</Text>
        </Text>
      </ImageBackground>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  main_label: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    top: "10%",
  },
  signup_lable2: {
    color: "#4F4F4F",
    width: "95%",
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  signup_lable22: {
    color: "#4F4F4F",
    width: "90%",
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  signup_lable23: {
    color: "#4F4F4F",
    width: "95%",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  main_container: {
    width: "100%",
    height: "100%",
    position: "relative",
    top: 0,
    alignItems: "center",
    alignSelf: "center",
  },
  inner_container: {
    top: 10,
    height: 400,
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: "gray",
    borderRadius: 10,
    position: "relative",
    top: 0,
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

  inner_text_color: {
    position: "relative",
    alignSelf: "center",
    bottom: -40,
    color: "#2F80ED",
    fontSize: 14,
  },
  background: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Signup;
