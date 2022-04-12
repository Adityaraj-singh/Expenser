import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { exp } from "react-native/Libraries/Animated/Easing";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import GetFriendsFromAllGroups from "../../API/GetfriendsFromAllGroup";
const DropDown = ({ transactions, payer }) => {
  const currentuser = useSelector((state) => state.userReducer);
  const [splitters, setSplitters] = useState([]);
  const [lender, setlender] = useState("");

  useEffect(async () => {
    await GetFriendsFromAllGroups(currentuser).then((data) => {
      let temparray = [];

      data.objects.map((item) => {
        let obj;
        if (item.resource_uri == payer) {
          setlender(item);
        }

        transactions.map((items) => {
          //  console.log(item, items.e_splitter.resource_uri);
          if (
            item.resource_uri == items.e_splitter.resource_uri &&
            item.friend.user.username !== payer.friend.user.username
          ) {
            obj = {
              username:
                item.friend.user.username == currentuser.username
                  ? "You"
                  : item.friend.user.username,
              amount: items.owes,
              issettled: items.settle,
            };

            temparray.push(obj);

            //    console.log(obj);
          }
        });
      });
      //  console.log("----");
      // console.log(temparray);
      setSplitters(temparray);
    });
    // console.log(transactions);
  }, []);

  return (
    <View style={styles.detail}>
      {splitters.map((item, index) => {
        return (
          <View style={styles.card} key={index}>
            <View style={{ width: "30%", alignItems: "flex-start" }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                <FontAwesome name="user" size={15} color="green" />{" "}
                {item.username}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "38%",
              }}
            >
              <Text style={styles.owes}>Owes</Text>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.to}>To</Text>
            </View>

            <Text style={styles.user2}>
              <FontAwesome name="user" size={15} color="green" />{" "}
              {payer.friend.user.username == currentuser.username
                ? "You"
                : payer.friend.user.username}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    width: "100%",
  },
  card: {
    paddingHorizontal: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  owes: {
    backgroundColor: "#FBA4A4",
    paddingHorizontal: 5,
    marginBottom: 5,
    marginTop: "auto",
    paddingVertical: 2,
    fontSize: 14,
    borderRadius: 10,
    fontWeight: "bold",
  },
  amount: {
    paddingHorizontal: 5,
    marginBottom: "auto",
    marginTop: "auto",
    paddingVertical: 2,
    fontSize: 14,
    borderRadius: 10,
    fontWeight: "bold",
  },
  to: {
    backgroundColor: "#FBA4A4",
    paddingHorizontal: 5,
    marginBottom: "auto",
    marginTop: "auto",
    paddingVertical: 2,
    fontSize: 14,
    borderRadius: 10,
    fontWeight: "bold",
    alignContent: "center",
  },
  user2: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "auto",
    marginBottom: "auto",
  },
});

export default DropDown;
