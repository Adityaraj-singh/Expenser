import React from "react";
import { StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
const NewGroup = ({ Setcreate }) => {
    const [groupname, Setgroupname] = useState('')
    const groups = useSelector(state => state.GroupReducer).length
    const [error, Seterror] = useState('')
    //console.log(groups)
    const dispatch = useDispatch()
    function add() {
        if (groupname.length > 4) {
            dispatch({
                type: 'AddGroup',
                payload: {
                    value: {
                        groupid: groups + 1,
                        groupName: groupname,
                        members: []
                    }
                }
            })
            Setcreate(false)
        }

        else {
            Seterror('Group name should be greater than 4')
        }


    }

    return (
        <View style={[styles.card, styles.shadowProp]}>
            <View style={styles.container_inner}>
                <Text style={styles.heading}>
                    Create New Group
                </Text>

            </View>
            <View style={styles.form}>

                <Text style={styles.input_label}>Group Name</Text>
                <TextInput
                    onChangeText={(text) => Setgroupname(text)}
                    placeholder="Enter Group Name"
                    style={styles.input}
                />
                <Text style={styles.input_label}>Group Description</Text>
                <TextInput
                    placeholder="Enter Group Description"
                    style={styles.input}
                />

                <Pressable style={styles.Button} onPress={add}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>
                        Create{' '}
                        <FontAwesome5 name="users" size={18} color="white" backgroundColor="transparent" />

                    </Text>
                </Pressable>
                <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Button: {
        width: '50%',
        backgroundColor: '#2F80ED',
        borderRadius: 50,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    input_label: {
        borderBottomColor: 'black',
        borderBottomWidth: 1.5
    },
    form: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingBottom: 0,
        width: '100%',
        paddingTop: 10,
        height: null
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 2,
        paddingLeft: 5

    },

    label1: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        fontSize: 18
    },

    heading: {
        fontSize: 20,
        borderWidth: 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: 'gray',
        fontWeight: 'bold'
    },
    container: {
        width: '100%',
        width: '100%',

        backgroundColor: 'yellow'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        top: '10%',
        height: 300
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})
export default NewGroup