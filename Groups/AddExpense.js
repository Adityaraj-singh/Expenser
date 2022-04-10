import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Button,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";

import { useState } from "react";

import { Switch } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { LogBox } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import GetFriendsFromAllGroups from "../API/GetfriendsFromAllGroup";
const AddExpense = ({ route, navigation }) => {
  const { GroupId, groupName, groupmembers } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [amount, Setamount] = useState(0);
  const [expensename, Setexpensename] = useState("");
  const dispatch = useDispatch();
  const states = useSelector((state) => state.userReducer);
  const [owner, Setowner] = useState("");
  const [allmembers, setAllmembers] = useState([]);
  const data = groupmembers.map((item) => {
    return { value: item.username };
  });
  const friendsarray = [];

  const [array, Setarray] = useState(
    groupmembers.map((item, index) => {
      return { id: index, name: item };
    })
  );
  const [friends, Setfriends] = useState(
    groupmembers.filter((item) => {
      if (item.username !== states.username) {
        return item;
      }
    })
  );
  const [dividedamt, Setdividedamt] = useState(0);
  const [error, Seterror] = useState("");
  const [splitters, setSplitters] = useState([]);
  async function remove(id) {
    setSplitters(
      splitters.filter((item) => {
        if (item.friend.p_friend.username !== id) {
          return item;
        }
      })
    );
  }

  async function add(id) {
    await GetFriendsFromAllGroups(states).then((data) => {
      // console.log("-----------");

      data.objects.map((item) => {
        if (
          item.friend.p_friend.username == id &&
          item.group == `/group/${GroupId}/`
        ) {
          item["amount"] = 0;
          setSplitters([...splitters, item]);
        }
      });
    });
  }

  async function addexpense() {
    await GetFriendsFromAllGroups(states).then((data) => {
      data.objects.map((item) => {
        if (
          item.group == `/group/${GroupId}/` &&
          item.friend.p_friend.username == states.username
        ) {
          console.log(item);
        }
      });
    });
  }

  useEffect(() => {
    let temp = parseInt(amount) / parseInt(splitters.length);
    // console.log(temp + ' divided')

    Setdividedamt(temp.toFixed(2));
  }, [amount, splitters]);

  async function adduseramount(id, amount) {
    console.log(id, amount);

    splitters.map((item) => {
      if (item.friend.p_friend.username == id) {
        item["amount"] = amount;
      }
    });
  }

  const Item1 = ({ item, onPress, backgroundColor, textColor }) => (
    <View onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={{ marginTop: 4, width: "40%" }}>
        {" "}
        {item.friend.p_friend.username}
      </Text>
      {isSwitchOn ? (
        <TextInput
          style={styles.amount}
          keyboardType="numeric"
          value={dividedamt.toString()}
          onChangeText={() =>
            adduseramount(item.friend.p_friend.username, dividedamt)
          }
        />
      ) : (
        <TextInput
          style={styles.amount}
          placeholder="amount"
          onChangeText={(event) =>
            adduseramount(item.friend.p_friend.username, event)
          }
        />
      )}
      <Pressable
        style={{
          marginTop: 3,
          borderColor: "white",
          borderWidth: 2,
          borderRadius: 50,
          marginRight: 5,
        }}
        onPress={() => remove(item.friend.p_friend.username)}
      >
        <Text>
          {" "}
          <AntDesign name="minus" size={20} color="white" id={item.id} />{" "}
        </Text>
      </Pressable>
    </View>
  );
  const Item2 = ({ item, onPress, backgroundColor, textColor }) => (
    <View onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.Name, textColor]}> {item.username}</Text>
      <Pressable onPress={() => add(item.username)}>
        <Text>
          {" "}
          <AntDesign name="pluscircleo" size={24} color="white" />{" "}
        </Text>
      </Pressable>
    </View>
  );

  useEffect(() => {
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver`",
      "componentWillReceiveProps",
      "componentWillUpdate",
    ]);
  }, []);
  const renderItem1 = ({ item }) => {
    const backgroundColor = "#6FCF97";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item1
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  const renderItem2 = ({ item }) => {
    const backgroundColor = "#6FCF97";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item2
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <ScrollView style={{ marginBottom: 20, paddingVertical: 10 }}>
      <View style={[styles.card, styles.shadowProp]}>
        <Text style={styles.heading}> Expense Add to {groupName}</Text>
        <View style={styles.inner_card}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.heading2}> Expense Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => Setexpensename(text)}
              placeholder="useless placeholder"
            />
          </View>
          <View>
            <Text style={styles.heading2}> Expense Amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                Setamount(parseInt(value));
              }}
              placeholder="Enter Amount"
              keyboardType="numeric"
            />
          </View>
          <Dropdown
            label="Select Owner"
            data={data}
            onChangeText={(text) => Setowner(text)}
          />
          <Text style={styles.heading2}> Participants</Text>
          <View style={styles.participants}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  position: "relative",
                  top: 12,
                  marginRight: 5,
                  fontWeight: "bold",
                }}
              >
                {!isSwitchOn ? "Divide Custom" : "Divide Equaly"}
              </Text>
              <Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              </Text>
            </View>

            <FlatList
              data={splitters}
              renderItem={renderItem1}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={styles.friends}>
            <View>
              <Text style={styles.heading2}> Friends</Text>
            </View>

            <FlatList
              data={friends}
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
        </View>
        <Pressable style={styles.add} onPress={addexpense}>
          <Text style={styles.text}>{"Create/"}</Text>
        </Pressable>
        <View>
          <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
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
  participants: {
    marginTop: 5,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingVertical: 5,
  },
  friends: {
    marginTop: 5,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingVertical: 1,
  },
  amount: {
    borderRadius: 50,
    backgroundColor: "white",
    width: "40%",
    paddingLeft: 15,
    paddingBottom: 2,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  input: {
    marginTop: 10,
    width: "70%",
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
  },
  inner_card: {
    marginTop: 10,
    paddingVertical: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  heading2: {
    fontWeight: "bold",
    fontSize: 14,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    overflow: "scroll",
    marginTop: 10,
    height: "auto",
    marginBottom: 20,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
export default AddExpense;
