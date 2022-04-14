import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { LogBox } from "react-native";
import { useEffect } from "react";
import { UpdateExpense } from "../../API/UpdateExpense";
import { exp } from "react-native/Libraries/Animated/Easing";
const Payment = ({ id, route, navigation }) => {
  const [amount, Setamount] = useState(0);
  const [lender, Setlender] = useState("Select User");
  const [recievername, setRecievername] = useState();
  const [sendamount, setSendamount] = useState();
  const { currentgroupexpense, allexpense, reciever, groupName } = route.params;
  const currentuser = useSelector((state) => state.userReducer);
  useEffect(() => {
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver`",
      "componentWillReceiveProps",
      "componentWillUpdate",
    ]);

    reciever.map((item) => {
      item["value"] = item.username;
    });
  }, []);

  useEffect(() => {
    reciever.map((item) => {
      if (item.value == recievername) {
        setSendamount(item.amount);
      }
    });
  }, [recievername]);
  async function AddSettle() {
    console.log("----------");
    currentgroupexpense.map((expense) => {
      if (expense.payer.friend.user.username == recievername) {
        let settlearray = expense.settled_by;
        expense.splitters.map((splitter) => {
          // console.log(splitter.e_splitter.friend.user.username);
          if (
            splitter.e_splitter.friend.user.username == currentuser.username
          ) {
            settlearray.push(splitter.e_splitter.resource_uri);
          }
        });

        console.log(expense.reason);
        UpdateExpense(
          currentuser,
          expense.amount,
          expense.created_at,
          expense.group,
          expense.payer.resource_uri,
          expense.reason,
          settlearray,
          expense.id
        )
          .then((data) => {
            console.log("*******");
            console.log(data);
            navigation.goBack();
          })
          .catch((err) => {
            console.log("updareasa");
            console.log(err);
          });
        /* console.log(
          expense.amount,
          expense.created_at,
          expense.group,
          expense.payer.resource_uri,
          expense.reason,
          expense.settled_by
        ); */
      }
    });
  }
  return (
    <View>
      <View style={[styles.card, styles.shadowProp]}>
        <Text style={styles.heading}>Payment</Text>

        <View style={{ width: "90%", marginTop: 10 }}>
          <Text style={styles.label1}>Group name</Text>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Enter Groupname"
            value={groupName}
          />
        </View>

        <View style={{ width: "90%" }}>
          <Text style={styles.label1}>Paying To</Text>
          <Dropdown
            onChangeText={(text) => setRecievername(text)}
            label="Select Reciever"
            data={reciever}
          />
        </View>

        <View style={styles.uis}>
          <View style={styles.user1}>
            <Text>
              <FontAwesome name="user-circle-o" size={30} color="green" />
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                marginTop: 5,
                backgroundColor: "#A4CCFB",
                fontSize: 20,
                color: "white",
                borderRadius: 5,
                fontWeight: "bold",
              }}
            >
              You
            </Text>
          </View>
          <View>
            <Ionicons name="arrow-forward-sharp" size={50} color="black" />
          </View>
          <View style={styles.user2}>
            <Text>
              <FontAwesome name="user-circle-o" size={30} color="green" />
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                marginTop: 5,
                backgroundColor: "#FBA4A4",
                fontSize: 20,
                color: "white",
                borderRadius: 5,
                fontWeight: "bold",
              }}
            >
              {recievername ? recievername : "Select Reciever"}
            </Text>
          </View>
        </View>

        <View style={styles.showamount}>
          <Text
            style={{ marginTop: "auto", marginBottom: "auto", fontSize: 24 }}
          >
            {sendamount ? `${sendamount} INR` : "0 "}
          </Text>
        </View>
        <TouchableOpacity onPress={() => AddSettle()} style={styles.settle}>
          <Text style={styles.text}>Settle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,

    borderRadius: 30,
    elevation: 3,
    height: 30,
    backgroundColor: "#2F80ED",
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  showamount: {
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 24,
    height: 40,
    width: null,
    borderWidth: 2,
    backgroundColor: "white",
    borderBottomColor: "#4F4F4F",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  uis: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",

    alignItems: "center",
  },
  user1: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  user2: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label1: {
    fontSize: 18,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  input: {
    marginTop: 10,
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  card: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    alignSelf: "center",
    overflow: "scroll",
    top: 40,
    height: null,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
export default Payment;
