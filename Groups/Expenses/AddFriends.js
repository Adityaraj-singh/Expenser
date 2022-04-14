import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { UserDetail } from "../../API/Getuser";
import { GetFriends } from "../../API/GetFriends";
import { AddMember } from "../../API/AddMember";
import { GetProfile } from "../../API/GetProfile";

const AddFriendsToGroup = (props) => {
  const { groupid } = props;
  const [selectedId, setSelectedId] = useState(null);
  const [friends, Setfriends] = useState([]);
  var CurrentGroup = useSelector((state) => state.GroupReducer);
  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");
  const currentuser = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  async function getFriends() {
    let temp = [];
    await GetProfile(currentuser).then((data) => {
      console.log("data");
      let temparr = [];

      data.objects[0].profile_friends.map((item) => {
        temparr.push({
          resource_uri: item.user.resource_uri,
          username: item.user.username,
          profile: item.resource_uri,
        });
        Setfriends(temparr);
      });
    });

    /*         await friendObject.objects.forEach(async (item) => {
                   
                }) */
  }

  useEffect(async () => {
    await getFriends()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    ///   console.log('in adddddinfff')
  }, []);
  console.log("-----------");
  console.log(friends);

  async function addfriend(name) {
    await AddMember(currentuser, name, props.groupid)
      .then((data) => {
        console.log("------------------");
        if (data && data.friend) {
          Setsuccess(name + "added");
          props.setchanges(!props.changes);
          props.Setaddingfriend(false);
          setTimeout(() => {
            Setsuccess("");
          }, 2000);
        } else {
          Seterror("Member already present");
          setTimeout(() => {
            Seterror("");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //  console.log(ispresent)
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <View key={item.resource_uri} style={[styles.item, backgroundColor]}>
      <Text style={[styles.Name, textColor]}>
        {" "}
        <FontAwesome5 name="users" size={20} color="green" /> {item.username}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.grp_notification}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = "#6FCF97";
    const color = "white";

    return (
      <Item
        item={item}
        onPress={() => addfriend(item.profile)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.heading}> Add Members to {props.groupname}</Text>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "red", fontStyle: "italic" }}>{error}</Text>
        <Text style={{ color: "green", fontStyle: "italic" }}>{success}</Text>
      </View>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />

      <Pressable
        style={styles.Button}
        onPress={() => props.Setaddingfriend(false)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
          Submit
        </Text>
      </Pressable>
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
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  card: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    overflow: "scroll",

    height: "auto",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  grp_notification: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "red",
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});

export default AddFriendsToGroup;
