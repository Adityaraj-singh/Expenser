import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import { FaBeer } from "react-icons/fa";
import { FaIcons } from "react-icons/fa";
import { Ionicons } from "@expo/vector-icons";
const Sidebar = ({ Setsidebar, DATA, renderItem, selectedId }) => {
  return (
    <SafeAreaView style={stylsheet.container}>
      <View style={stylsheet.close}>
        <Pressable onPress={() => Setsidebar(false)}>
          <Ionicons name="chevron-back-circle" size={40} color="black" />
        </Pressable>
      </View>
      <View style={stylsheet.userinfo}>
        <Text style={stylsheet.username}>Aditya Raj </Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          width={"100%"}
          style={stylsheet.flatlist}
        />
      </View>
    </SafeAreaView>
  );
};

const stylsheet = StyleSheet.create({
  container: {
    height: "100%",
    width: "60%",
    backgroundColor: "#F2F2F2",

    alignItems: "center",
    position: "absolute",
    top: "4%",
  },
  userinfo: {
    position: "relative",
    top: 40,
    width: "100%",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
  },
  item: {
    padding: 20,
    width: "120%",
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    width: "100%",
    justifyContent: "center",
    fontWeight: "bold",
  },
  flatlist: {
    marginTop: 20,
  },
  close: {
    position: "absolute",
    right: 0,
    fontSize: 32,
  },
  close_text: {
    fontSize: 44,
    color: "black",
  },
});
export default Sidebar;
