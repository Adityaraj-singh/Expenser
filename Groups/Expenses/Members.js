import React, { useEffect, useState } from "react";
import GetFriendsFromAllGroups from "../../API/GetfriendsFromAllGroup";
import { FlatList, StyleSheet, Text, Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Kick from "../../API/Kick";
import { useIsFocused } from "@react-navigation/native";

const Members = (props) => {
  const [frineds1, setFriends1] = useState([]);
  const [members, Setmembers] = useState([]);
  const isFocused = useIsFocused();
  async function KickFriend(item) {
    await Kick(props.currentuser, item.resource_uri)
      .then((data) => {
        let temp = frineds1.filter;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  const removeFriend = async (user) => {
    frineds1.filter((item) => {
      if (
        item.friend.user.resource_uri == user &&
        item.group == `/group/${props.groupid}/`
      ) {
        KickFriend(item);
      }
    });
  };

  async function getFriends(id) {
    await GetFriendsFromAllGroups(props.currentuser).then((data) => {
      //  console.log(data.objects);
      setFriends1(data.objects);
    });
  }

  useEffect(async () => {
    await getFriends();

    let temp = props.groupmembers.filter((item) => {
      return item;
    });

    Setmembers(temp);
  }, [isFocused]);
  const Item = ({ userid, title }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>
          {" "}
          <FontAwesome
            name="user-circle-o"
            size={15}
            style={{ marginRight: 10 }}
            color="white"
          />{" "}
          {" " + title}
        </Text>
      </View>
      <Pressable style={{ marginTop: "auto", marginBottom: "auto" }}>
        <Text onPress={() => removeFriend(userid)}>
          <FontAwesome name="minus-circle" size={15} color="white" />
        </Text>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      key={item.resource_uri}
      userid={item.resource_uri}
      title={item.username}
    />
  );
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.shadowProp]}>
        <Text
          style={{ alignSelf: "flex-end" }}
          onPress={() => props.setShowmembers(false)}
        >
          <FontAwesome name="plus-circle" size={25} color="black" />
        </Text>
        <Text style={styles.heading}>My Friends</Text>

        <View style={styles.inner_card}>
          <FlatList
            data={members}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    height: 30,
    backgroundColor: "#2F80ED",
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "white",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  item: {
    backgroundColor: "#89D79F",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
  friendlist: {
    width: "100%",
  },
  Searchbar: {
    borderTopColor: "red",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    overflow: "scroll",
    top: 50,
    height: null,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inner_card: {
    marginTop: 10,
  },
});
export default Members;
