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
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import { GetGroups } from "../../API/GetGroups";
import GetFriendsFromAllGroups from "../../API/GetfriendsFromAllGroup";
import { ShowExpense } from "../../API/ShowExpense";
import { useSelector } from "react-redux";
import { exp } from "react-native/Libraries/Animated/Easing";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Loader from "../../Loader/Loader";
const TotalExpenses = ({ state }) => {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(null);
  const currentuser = useSelector((state) => state.userReducer);
  const [data, Setdata] = useState([]);
  const [expenses, setexpenses] = useState([]);
  const dispatch = useDispatch();
  const [settlesexpenses, setSettledexpenses] = useState([]);
  const [id, setid] = useState([]);
  const [itake, setItake] = useState(0);
  const [settled, setSetteled] = useState([]);
  const loaderstate = useSelector((state) => state.LoaderReducer);
  useEffect(async () => {
    let temparr = [];
    await GetFriendsFromAllGroups(currentuser).then((data) => {
      data.objects.map((item) => {
        if (item.friend.user.username == currentuser.username) {
          temparr.push(item.resource_uri);
        }
      });
      setid(temparr);
    });

    await ShowExpense(currentuser).then((data) => {
      setexpenses(data.objects);
      dispatch({
        type: "Load",
        payload: {
          isloading: false,
          text: "Please Wait...",
        },
      });
    });
  }, [isFocused]);

  useEffect(async () => {
    dispatch({
      type: "Load",
      payload: {
        isloading: false,
        text: "Please Wait...",
      },
    });
    let temp = [];
    let amount = 0;
    let oweamount = 0;
    expenses.map((expense) => {
      expense.settled_by.map((settle) => {
        id.map((item) => {
          if (settle == item) {
            temp.push(expense);
          }
        });
      });
    });

    setSettledexpenses(temp);
  }, [id, expenses, isFocused]);

  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    let amount = 0;

    item.splitters.map((splitter) => {
      if (splitter.e_splitter.friend.user.username == currentuser.username) {
        amount = splitter.owes;
      }
    });
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <View style={styles.box}>
          <Text>
            <View style={{ fontWeight: "bold" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                You paid :{" "}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 2,
                borderRadius: 30,
                top: 50,
                marginTop: 20,
                position: "relative",
                fontSize: 10,
              }}
            >
              <Text style={{ fontSize: 14 }}> {amount} Rs.</Text>
            </View>
          </Text>

          <Text
            style={{
              width: "60%",

              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 14 }}> Expense Name - </Text>
            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: "bold" }}>
              {" "}
              {item.reason}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const backgroundColor = "#6FCF97";
    const color = "white";

    return <Item item={item} textColor={{ color }} />;
  };
  return (
    <View style={styles.container}>
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
      <View style={[styles.card, styles.shadowProp]}>
        <Text style={styles.heading}>Your Transactions</Text>
        {settlesexpenses.length > 0 ? (
          <FlatList
            data={settlesexpenses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        ) : (
          <Text>"No Payments Yet"</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    backgroundColor: "#66ff99",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  Name: {
    fontSize: 13,
    fontWeight: "bold",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  amounts: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  col1: {
    backgroundColor: "#FBA4A4",
    fontSize: 13,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  Col2: {
    backgroundColor: "#6FCF97",
    fontSize: 13,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  t1: {
    backgroundColor: "#FBA4A4",
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  t2: {
    backgroundColor: "#6FCF97",
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  subs: {
    width: "40%",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  bar_text: {
    fontSize: 10,
    color: "white",
    bottom: 1,
  },
  outer_bar: {
    marginTop: 8,
    height: 15,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#6FCF97",
  },
  inner_bar: {
    height: "100%",
    width: "30%",
    backgroundColor: "#FBA4A4",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: "center",
  },
  h1: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  h2: {
    color: "green",
  },
  h0: {
    color: "pink",
  },
  inner_container: {
    marginTop: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default TotalExpenses;
