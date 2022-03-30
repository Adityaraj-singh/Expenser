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
import { useSelector, useDispatch } from "react-redux";
import { Getuser } from "../API/Getuser";

const Dashboard = ({ navigation }) => {
    const state = useSelector(state => state.userReducer)

    useEffect(async () => {
        //  console.log('getting on  dashboard')
        // const gets = await Getuser({ username: state.username, token: state.token })

        // console.log(gets.objects)

        //    console.log('dashboard')
        //  console.log(state)
    }, [])
    return (
        <View style={styles.container}>
            <TotalExpenses state={state} />


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
