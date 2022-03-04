import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import NewGroup from "../Dashboard/Components/NewGroup";
import GroupDetail from "./GroupDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
const groups = []
const GroupList = ({ navigation }) => {
    const dispatch = useDispatch()

    const groups = useSelector(state => state.GroupReducer)
    // console.log('groupss')
    //  console.log(groups)

    function Loguerout() {
        console.log('working')
        dispatch({ type: 'Signout' })
        console.log(state)
    }



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
            <Text style={[styles.Name, textColor]}> <FontAwesome5 name="users" size={20} color="green" /> {item.groupName}</Text>
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
                onPress={() => Selectgroups(item.groupid, item.groupName)}
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
            <Pressable onPress={Loguerout} style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5 }}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    )


}

const styles = StyleSheet.create({
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