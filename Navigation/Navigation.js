import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, Button, TouchableNativeFeedback, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import * as React from 'react';
import Login from '../Authenticate/Login';
import Signup from '../Authenticate/Signup';
import Dashboard from '../Dashboard/Dashboard';
import GroupList from '../Groups/Groups';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupDetail from '../Groups/GroupDetail';
import Payment from '../Groups/Expenses/Payment';
import AddFriend from '../Friends/Addfriends';
import FriendList from '../Friends/FriendsList';
import { useSelector } from 'react-redux';



const Stack = createStackNavigator()
const DashboardStack = () => {
    return (
        <Stack.Navigator screenOptions={({ route }) => ({

            headerTitle: () => <Text style={{ alignSelf: 'flex-end', width: '100%', fontSize: 24, color: 'white', fontWeight: 'bold' }}>Dashboard  </Text>,
            tabBarActiveBackgroundColor: "#4293FF",
            tabBarActiveTintColor: 'black',
            headerStyle: { backgroundColor: '#4293FF', }
        })}>
            <Stack.Screen name="Dashboardstack" component={Dashboard} />
        </Stack.Navigator>
    )
}

const GroupsListstack = () => {
    return (

        <Stack.Navigator screenOptions={({ route }) => ({

            headerTitle: () => <Text style={{ alignSelf: 'flex-end', width: '100%', fontSize: 24, color: 'white', fontWeight: 'bold' }}>Groups</Text>,
            tabBarActiveBackgroundColor: "#4293FF",
            tabBarActiveTintColor: 'black',
            headerStyle: { backgroundColor: '#4293FF', }
        })} >
            <Stack.Screen name="Groupstack" component={GroupList} />
            <Stack.Screen name="GroupDetail" title="GroupDetail" component={GroupDetail} />
            <Stack.Screen name="Payment" title="Payment" component={Payment} />



        </Stack.Navigator>

    )
}

const Navigation = () => {

    const [user, Setuser] = useState(0)
    const state = useSelector(state => state)
    const credentials = {
        username: 'adityaraj',
        password: 'password'
    }
    const [signup, Setsignup] = useState(false)
    const Tab = createBottomTabNavigator();
    //   console.log('stating')
    // console.log(state)

    if (state.userReducer.username && state.userReducer.username.length > 0) {
        return (
            <NavigationContainer  >
                <Tab.Navigator screenOptions={{ headerShown: false }} >
                    <Tab.Screen name="Dashboard" title={'Homieess'} component={DashboardStack} />
                    <Tab.Screen name="Groups" component={GroupsListstack} />
                    <Tab.Screen name="Friends" component={FriendList} />

                </Tab.Navigator>
            </NavigationContainer>
        )
    }
    else {
        return (
            user ? <Navigation /> : signup ? <Signup Setuser={Setuser} Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} Setuser={Setuser} />
        )
    }


}

export default Navigation