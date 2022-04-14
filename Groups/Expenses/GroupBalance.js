import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { acc } from "react-native-reanimated";
const GroupBalance = ({ data, GroupId, groupName, allexpense, navigation }) => {
  /* data.map((member) => {
    member.accounts.map((account) => {
      console.log(
        `${member.username} owes ${account.amount} to ${account.username}`
      );
    });
  }); */
  const currentuser = useSelector((state) => state.userReducer);
  const [count, setCount] = useState(0);
  const [currentgroupexpense, setCurrentgroupexpense] = useState([]);
  const [reciever, setReciever] = useState([]);
  useEffect(() => {
    let temparr = [];
    allexpense.map((expense) => {
      if (expense.group == `/group/${GroupId}/`) {
        temparr.push(expense);
      }
    });
    setCurrentgroupexpense(temparr);
    let tempacc = [];
    data.map((member) => {
      if (member.username == currentuser.username) {
        member.accounts.map((account) => {
          if (account.amount !== 0) tempacc.push(account);
        });
      }
    });

    setReciever(tempacc);

    data.map((member) => {
      member.accounts.map((account) => {
        if (member.username == currentuser.username) {
          setCount((prevState) => prevState + 1);
        }
      });
    });
  }, [data]);

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            left: 4,
            fontSize: 24,
          }}
        >
          Group Balance
        </Text>
      </View>
      <View style={styles.footer}>
        {data.length > 0
          ? data.map((member, index1) => {
              return member.accounts.map((account, index2) => {
                if (
                  member.username == currentuser.username ||
                  account.username == currentuser.username
                )
                  if (account.amount != 0)
                    return (
                      <View key={index1 + index2} style={styles.row}>
                        <View style={styles.lefts}>
                          <Text
                            style={{
                              width: "100%",

                              fontSize: 12,
                              fontWeight: "bold",
                            }}
                          >
                            <FontAwesome name="user" size={12} color="green" />{" "}
                            {member.username == currentuser.username
                              ? "You"
                              : member.username}{" "}
                          </Text>
                        </View>
                        <View style={styles.middle}>
                          <Text style={styles.owes}>Owes</Text>
                          <Text style={styles.amount}> {account.amount}</Text>
                          <Text style={styles.to}>To</Text>
                        </View>
                        <View
                          style={{
                            fontSize: 11,
                            width: "20%",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text>
                            {account.username == currentuser.username
                              ? "You"
                              : account.username}
                          </Text>
                        </View>
                      </View>
                    );
              });
            })
          : null}

        {
          <TouchableOpacity
            style={styles.settle}
            onPress={() =>
              navigation.navigate("Payment", {
                currentgroupexpense,
                allexpense,
                reciever,
                groupName,
                navigation,
              })
            }
          >
            <Text style={styles.text}>Settle</Text>
          </TouchableOpacity>
        }
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
    width: "20%",
    borderRadius: 30,
    elevation: 3,
    height: 30,
    backgroundColor: "#2F80ED",
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  lefts: {
    marginBottom: "auto",
    marginTop: "auto",
    width: "30%",
  },
  heading: {
    height: 40,
    backgroundColor: "#6FCF97",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  card: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 50,
    borderRadius: 5,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 2,
    marginTop: 5,
  },
  middle: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  owes: {
    fontSize: 11,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#FBA4A4",

    paddingHorizontal: 5,
    marginBottom: "auto",
    marginTop: "auto",
    paddingVertical: 2,

    borderRadius: 10,
  },
  amount: {
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
    fontSize: 11,
  },
  to: {
    backgroundColor: "#FBA4A4",
    paddingHorizontal: 5,
    marginBottom: "auto",
    marginTop: "auto",
    paddingVertical: 2,
    fontSize: 11,
    borderRadius: 10,

    alignContent: "center",
  },
});

export default GroupBalance;
