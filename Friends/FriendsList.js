import React from "react";
import { StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Searchbar } from 'react-native-paper';
import AddFriend from "./Addfriends";

const FriendList = () => {
    const [search, Setsearch] = useState('')
    const [addvisible, Setvisible] = useState(false)
    const [friends, Setfriends] = useState([

        {
            id: 0,
            name: 'Gagan'
        },
        {
            id: 1,
            name: 'karan'
        },
        {
            id: 2,
            name: 'Chris'
        }
    ])

    const Item = ({ title }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}> <FontAwesome name="user-circle-o" size={15} style={{ marginRight: 10 }} color="white" /> {' ' + title}</Text>
            </View>
            <Pressable style={{ marginTop: 'auto', marginBottom: 'auto' }}  >
                <Text><FontAwesome name="minus-circle" size={15} color="white" /></Text>
            </Pressable>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item.name} />
    );

    return (
        <View style={styles.container}>

            <View style={[styles.card, styles.shadowProp]}  >
                <Text style={styles.heading}>My Friends</Text>
                <View style={styles.inner_card}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(text) => Setsearch(text)}
                        value={search}
                    />

                    <FlatList
                        data={friends}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                </View>
                {
                    addvisible ? null :
                        <Pressable style={styles.add} onPress={() => Setvisible(!addvisible)}>
                            <Text style={styles.text}>Add Friend</Text>
                        </Pressable>
                }

            </View>
            {
                addvisible ?
                    <View style={{ marginTop: 10 }}>
                        <AddFriend Setvisible={Setvisible} />
                    </View>
                    :
                    null

            }
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',

    },
    add: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

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
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    item: {
        backgroundColor: '#89D79F',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
    },
    friendlist: {
        width: '100%'
    },
    Searchbar: {
        borderTopColor: 'red'
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
    }
    , inner_card: {
        marginTop: 10
    }
})

export default FriendList