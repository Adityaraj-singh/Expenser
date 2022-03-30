import { FlatList, StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import NewGroup from "../Dashboard/Components/NewGroup";
import GroupDetail from "./GroupDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { GetGroups } from "../API/GetGroups";
import React, { useEffect, useState } from 'react'
const groups = []
const GroupList = ({ navigation }) => {
    const dispatch = useDispatch()


    const currentuser = useSelector(state => state.userReducer)
    // console.log('groupss')
    //  console.log(groups)
    const [groups, Setgroups] = useState([])
    function Loguerout() {
        console.log('working')
        dispatch({ type: 'Signout' })
        // console.log(state)
    }

    useEffect(async () => {

        const res = await GetGroups({ username: currentuser.username, token: currentuser.token })
        console.log('in grouos')
        console.log(res.objects)
        Setgroups(res.objects)
    }, [])

    function Selectgroups(id, name) {
        setSelectedId(id)

        Setselectedgroup(id)

        navigation.navigate('GroupDetail', {
            GroupId: id,
            groupName: name
        })
    }
    const [selectedgroup, Setselectedgroup] = useState(false)
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.Name, textColor]}> <FontAwesome5 name="users" size={20} color="green" /> {item.name}</Text>
            <Text style={styles.grp_notification}>
                1
            </Text>
        </TouchableOpacity>
    );

    const [create, Setcreate] = useState(false)
    const renderItem = ({ item }) => {
        const backgroundColor = "#6FCF97";
        const color = 'white';

        return (
            <Item
                item={item}
                onPress={() => Selectgroups(item.id, item.name)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };



    const GroupList2 = () => {
        return (
            <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', borderBottomColor: 'black', borderBottomWidth: 2, width: '92%', textAlign: 'center', marginBottom: 20 }}>Groups</Text>
                    <AntDesign name="addusergroup" size={24} color="green" style={{ position: 'relative', right: 30 }} onPress={() => Setcreate(!create)} />
                </View>
                <View>
                    {create ?

                        <View style={{ marginBottom: 30 }}>

                            <NewGroup Setcreate={Setcreate} />
                        </View>
                        : null}
                </View>
                <FlatList
                    data={groups}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
            </View>
        )
    }



    const [selectedId, setSelectedId] = useState(null);
    return (

        <View style={styles.container}>
            <GroupList2 />
            <Pressable style={styles.add} onPress={Loguerout} >
                <Text>Logout</Text>
            </Pressable>
        </View>
    )


}

const styles = StyleSheet.create({
    add: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: 40,
        width: '50%',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#2F80ED',
    },
    grp_notification: {
        fontSize: 18,
        borderRadius: 100,
        height: 30,
        width: 30,
        textAlign: 'center',
        backgroundColor: '#2F80ED'
    },

    Name: {
        fontWeight: 'bold',
        fontSize: 24
    },
    container: {
        width: '100%',

        position: 'relative',
        top: 500
    },
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10
    },
    title: {
        fontSize: 32,
    },
})

export default GroupList