import React from "react";
import { StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

import { MaterialIcons } from '@expo/vector-icons';

const AddFriend = ({ Setvisible }) => {

    return (

        <View style={[styles.card, styles.shadowProp]}  >
            <Pressable onPress={() => Setvisible(false)}>
                <Text style={{ alignSelf: 'flex-end' }}>
                    <MaterialIcons name="cancel" size={24} color="black" />
                </Text>
            </Pressable>

            <Text style={styles.heading}>Add Friends</Text>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Friend's email</Text>
                <TextInput style={styles.input} placeholder={'Enter email'} />
            </View>
            <Pressable style={styles.add}>
                <Text style={styles.text}>Add Friend</Text>
            </Pressable>
        </View>
    )


}


const styles = StyleSheet.create({
    add: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        paddingHorizontal: 5,
        borderRadius: 30,
        elevation: 3,
        height: 30,
        backgroundColor: '#2F80ED',
    },
    text: {


        fontWeight: 'bold',
        color: 'white',
    },
    label: {
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    input: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        width: '80%',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '90%',
        alignSelf: 'center',
        overflow: 'scroll',
        top: 50,
        height: null,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }, heading: {
        fontSize: 22,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    }
})
export default AddFriend