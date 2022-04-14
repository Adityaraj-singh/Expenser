import {
  FlatList,
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

import { FontAwesome5 } from "@expo/vector-icons";
import { exp } from "react-native/Libraries/Animated/Easing";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import NewGroup from "../Dashboard/Components/NewGroup";
import GroupDetail from "./GroupDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { GetGroups } from "../API/GetGroups";
import React, { useEffect, useState } from "react";
const groups = [];
const GroupList = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentuser = useSelector((state) => state.userReducer);
  // console.log('groupss')
  //  console.log(groups)
  const [groups, Setgroups] = useState([]);
  function Loguerout() {
    console.log("working");
    dispatch({ type: "Signout" });
    // console.log(state)
  }

  async function getGroups1() {
    const res = await GetGroups({
      username: currentuser.username,
      token: currentuser.token,
    });

    Setgroups(res.objects);
  }

  useEffect(async () => {
    await getGroups1();
  }, [isFocused]);

  function Selectgroups(id, name, group_friends, creator) {
    setSelectedId(id);

    Setselectedgroup(id);

    navigation.navigate("GroupDetail", {
      GroupId: id,
      groupName: name,
      group_friends: group_friends,
      creator: creator,
    });
  }
  const [selectedgroup, Setselectedgroup] = useState(false);
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.Name, textColor]}>
        {" "}
        <FontAwesome5 name="users" size={20} color="black" /> {item.name}
      </Text>
    </TouchableOpacity>
  );

  const [create, Setcreate] = useState(false);
  const renderItem = ({ item }) => {
    const backgroundColor = "#6FCF97";
    const color = "white";

    return (
      <Item
        item={item}
        onPress={() =>
          Selectgroups(item.id, item.name, item.group_friends, item.creator)
        }
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const GroupList2 = () => {
    if (create) {
      return (
        <View style={{ marginBottom: 30 }}>
          <NewGroup getGroups1={getGroups1} Setcreate={Setcreate} />
        </View>
      );
    } else
      return (
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",

                width: "92%",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              {" "}
            </Text>

            <AntDesign
              name="addusergroup"
              size={24}
              color="green"
              style={{
                marginTop: 5,
                position: "relative",
                right: 30,
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
              onPress={() => Setcreate(!create)}
            />
          </View>

          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      );
  };

  const [selectedId, setSelectedId] = useState(null);
  return (
    <View style={styles.container}>
      <GroupList2 />
      <Pressable style={styles.add} onPress={Loguerout}>
        <Text>
          Logout from
          <Text style={{ fontWeight: "bold" }}>
            {" " + currentuser.username}
          </Text>{" "}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  add: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 40,
    width: "50%",
    alignSelf: "center",
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#2F80ED",
  },
  grp_notification: {
    fontSize: 18,
    borderRadius: 100,
    height: 30,
    width: 30,
    textAlign: "center",
    backgroundColor: "#2F80ED",
  },

  Name: {
    fontWeight: "bold",
    fontSize: 24,
  },
  container: {
    width: "100%",

    position: "relative",
    top: 500,
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default GroupList;
