import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";

const Row = ({ row }) => {
  return (
    <View key={index} style={styles.row}>
      <View style={styles.lefts}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          <FontAwesome name="user" size={12} color="green" /> {member.username}{" "}
        </Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.owes}>Owes</Text>
        <Text style={styles.amount}> {account.amount}</Text>
        <Text style={styles.to}>To</Text>
      </View>
      <View style={{ fontSize: 11 }}>
        <Text>{account.username}</Text>
      </View>
    </View>
  );
};

export default Row;
