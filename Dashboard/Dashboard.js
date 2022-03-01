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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import NewGroup from "./Components/NewGroup";
import TotalExpenses from "./Components/TotalExpenses";
import AddExpense from "../Groups/AddExpense";

const Dashboard = () => {

    return (
        <View style={styles.container}>
            <TotalExpenses />

        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        alignSelf: "center",
        fontWeight: 'bold'
    },
    container: {
        width: "100%",
        height: "100%",
    },
    newgroup: {
        alignSelf: "center",
        width: "100%",
        height: "60%",
    },
});
export default Dashboard;
