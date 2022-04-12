import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";

const GroupBalance = ({ data, navigation }) => {
  /* data.map((member) => {
    member.accounts.map((account) => {
      console.log(
        `${member.username} owes ${account.amount} to ${account.username}`
      );
    });
  }); */
  if (data && data.length > 0) {
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
          {data.map((member, index) => {
            member.accounts.map((account) => {
              return (
                <View>
                  <Text>
                    {member.username +
                      " owes " +
                      account.amount +
                      " to " +
                      account.username}
                  </Text>
                </View>
              );
            });
            return (
              <View key={index} style={styles.row}>
                <View style={styles.lefts}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    <FontAwesome name="user" size={12} color="green" />{" "}
                    {member.username}{" "}
                  </Text>
                </View>
                <View style={styles.middle}>
                  <Text style={styles.owes}>Owes</Text>
                  <Text style={styles.amount}> {member.amount}</Text>
                  <Text style={styles.to}>To</Text>
                </View>
                <View style={{ fontSize: 11 }}>
                  <Text>{member.username}</Text>
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.settle}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.text}>Settle</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
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
            Nothing to show
          </Text>
        </View>
      </View>
    );
  }
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
    justifyContent: "space-evenly",
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
