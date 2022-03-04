import React from "react";
import { StyleSheet, Text, Pressable, View, FlatList } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons';
const AddFriendsToGroup = (props) => {
    const { groupid } = props
    const [selectedId, setSelectedId] = useState(null);
    const friends = useSelector(state => state.FriendsReducer)
    var CurrentGroup = useSelector(state => state.GroupReducer)
    const [error, Seterror] = useState('')
    const [success, Setsuccess] = useState('')
    //  console.log('currentgroup')
    CurrentGroup = CurrentGroup.filter(item => {
        if (item.groupid == groupid) {
            return item
        }
    })


    const dispatch = useDispatch()
    function addfriend(name) {


        let currentgroupmembers = CurrentGroup[0].members
        let ispresent = currentgroupmembers.includes(name)
        //  console.log(ispresent)
        if (ispresent) {
            Seterror('Member already present')
            setTimeout(() => {
                Seterror('')
            }, 2000);
            return false
        }
        dispatch({
            type: 'AddMemberToGroup',
            payload: {
                value: {
                    groupid,
                    name
                }
            }
        })
        Setsuccess('Member Added')
        setTimeout(() => {
            Setsuccess('')
        }, 2000);

    }
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <Pressable onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.Name, textColor]}> <FontAwesome5 name="users" size={20} color="green" /> {item.name}</Text>
            <Text style={styles.grp_notification}>
                ADD
            </Text>
        </Pressable>
    );
    const renderItem = ({ item }) => {
        const backgroundColor = "#6FCF97";
        const color = 'white';

        return (
            <Item
                item={item}
                onPress={() => addfriend(item.name)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };
    return (
        <View style={[styles.card, styles.shadowProp]}  >
            <Text style={styles.heading}> Add Friends to {props.groupname}</Text>
            <View style={{ alignItems: 'center' }}><Text style={{ color: "red", fontStyle: 'italic' }}>{error}</Text><Text style={{ color: "green", fontStyle: 'italic' }}>{success}</Text>
            </View>
            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>
    )


}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10
    },
    title: {
        fontSize: 18,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    card: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '90%',
        alignSelf: 'center',
        overflow: 'scroll',

        height: 400,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    grp_notification: {
        color: 'white'
    }
})

export default AddFriendsToGroup