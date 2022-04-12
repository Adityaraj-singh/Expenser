import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { AddFriendApi } from "../API/AddFriends";
import { UserDetail } from "../API/Getuser";
import { TouchableOpacity } from "react-native";
const AddFriend = ({
  friends1,
  Setfriends,
  users,
  Setvisible,
  get_allFriends,
}) => {
  const dispatch = useDispatch();
  const [friend, Setfriend] = useState("");
  const friends = useSelector((state) => state.FriendsReducer).length;
  const [selectedId, setSelectedId] = useState(null);
  const [data, Setdata] = useState(users);
  const [data2, Setdata2] = useState([]);
  const currentuser = useSelector((state) => state.userReducer);
  async function add(data) {
    console.log("added", data);

    //  console.log(data, currentuser.profile_id)
    await AddFriendApi(currentuser, currentuser.profile_id, data)
      .then((data) => {
        get_allFriends();
        console.log("dataa");
        console.log(data);
        Setvisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("all friends");
  }, [friends1]);

  useEffect(() => {
    let tempdata = data.filter((item) => {
      if (item.username.includes(friend)) {
        return item;
      }
    });
    if (friend.length > 0) {
      Setdata2(tempdata);
    } else {
      Setdata2([]);
    }
  }, [friend]);
  const renderItem = ({ item }) => (
    <Item resource_uri={item.resource_uri} title={item.username} />
  );
  const Item = ({ resource_uri, title }) => (
    <TouchableOpacity style={styles.item} onPress={() => add(resource_uri)}>
      <View>
        <Text style={styles.title}>
          {" "}
          <FontAwesome
            name="user-circle-o"
            size={15}
            style={{ marginRight: 5 }}
            color="white"
          />{" "}
          {" " + title}
        </Text>
      </View>

      <Text style={{ marginTop: "auto", marginBottom: "auto" }}>
        <FontAwesome name="plus-circle" size={15} color="white" />
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Pressable onPress={() => Setvisible(false)}>
        <Text style={{ alignSelf: "flex-end" }}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </Text>
      </Pressable>

      <Text style={styles.heading}>Invite via Email</Text>
      <View
        style={{
          height: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Text style={styles.label}>Friend's email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => Setfriend(text)}
          placeholder={"Enter name"}
        />
      </View>
      {data2.length > 0 ? (
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.resource_uri}
        />
      ) : (
        <Text
          style={{ marginTop: 40, left: 19, fontSize: 20, fontWeight: "bold" }}
        >
          No Related Search Result{" "}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#89D79F",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 30,
    elevation: 3,
    height: 30,
    backgroundColor: "#2F80ED",
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  input: {
    marginTop: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: "80%",
    height: 40,
    left: 19,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 500,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    overflow: "scroll",
    top: 50,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
export default AddFriend;
