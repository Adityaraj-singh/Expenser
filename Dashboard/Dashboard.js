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
import { Getuser, SingleUser } from "../API/Getuser";
import { GetProfile } from "../API/GetProfile";

const Dashboard = ({ navigation }) => {
    const state = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    useEffect(async () => {
        console.log(state)
        console.log('getting ste in dashboard')
        await GetProfile(state).then((data) => {
            console.log('weeess')
            dispatch({
                type: 'Authenticate',
                payload: {
                    value: {
                        resource_uri: item.resource_uri,
                        id: response.token,
                        username: response.username,
                    }
                }
            })

        }).catch(err => {
            console.log('errrr')
            console.log(err)
        })

    })


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
