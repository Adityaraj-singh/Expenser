import React from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AddGroup } from "../../API/GetGroups";
import { MaterialIcons } from "@expo/vector-icons";
const NewGroup = ({ Setcreate, getGroups1 }) => {
  const [groupname, Setgroupname] = useState("");
  const groups = useSelector((state) => state.GroupReducer).length;
  const currentuser = useSelector((state) => state.userReducer);

  const [error, Seterror] = useState("");
  //console.log(groups)
  const dispatch = useDispatch();
  async function add() {
    if (groupname.length > 4) {
      await AddGroup(currentuser, groupname)
        .then(async (data) => {
          console.log("addedd");
          Setcreate(false);
          console.log(data);
          await getGroups1();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Seterror("Group name should be greater than 4");
    }
  }

  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Pressable onPress={() => Setcreate(false)}>
        <Text style={{ alignSelf: "flex-end" }}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </Text>
      </Pressable>
      <View style={styles.container_inner}>
        <Text style={styles.heading}>Create New Group</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.input_label}>Group Name</Text>
        <TextInput
          onChangeText={(text) => Setgroupname(text)}
          placeholder="Enter Group Name"
          style={styles.input}
        />

        <Pressable style={styles.Button} onPress={add}>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
            Create{" "}
            <FontAwesome5
              name="users"
              size={18}
              color="white"
              backgroundColor="transparent"
            />
          </Text>
        </Pressable>
        <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: "50%",
    backgroundColor: "#2F80ED",
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },

  input_label: {
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 0,
    width: "100%",
    paddingTop: 10,
    height: null,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 2,
    paddingLeft: 5,
  },

  label1: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    fontSize: 18,
  },

  heading: {
    fontSize: 20,
    borderWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: "gray",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    width: "100%",

    backgroundColor: "yellow",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    top: "10%",
    height: 200,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
export default NewGroup;
