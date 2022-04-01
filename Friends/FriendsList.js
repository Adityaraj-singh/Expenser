import React from "react";
import { StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Searchbar } from 'react-native-paper';
import AddFriend from "./Addfriends";
import { Getuser } from "../API/Getuser";
import { useSelector, useDispatch } from "react-redux";
import { GetFriends } from "../API/GetFriends";
import { compose } from "redux";
import { UserDetail } from "../API/Getuser";
const FriendList = () => {
    const state = useSelector(state => state.FriendsReducer)
    const [search, Setsearch] = useState('')
    const [addvisible, Setvisible] = useState(false)
    const [friends, Setfriends] = useState([])
    const currentuser = useSelector(state => state.userReducer)
    const [allUsers, Setallusers] = useState([])

    async function getallusers() {
        const response = await Getuser({ username: currentuser.username, token: currentuser.token })
        //console.log(response.objects)
        Setallusers(response.objects)
    }

    async function getFriends() {
        let temp = []
        let friendObject = await GetFriends(currentuser);

        for (let i = 0; i < friendObject.objects.length; i++) {

            let userDetail = await UserDetail(currentuser, friendObject.objects[i].p_friend);
            console.log('userDetail', userDetail)
            temp.push(userDetail[0])
            // Setfriends([...friends, userDetail[0]])
        }
        /*         await friendObject.objects.forEach(async (item) => {
                   
                }) */
        console.log('temp', temp)
        Setfriends([...temp])
    }
    /*  async function getFriends() {
 
         GetFriends(currentuser)
             .then(data => {
                 console.log('dat')
                 //   console.log(data)
                 let temp = []
                 
                 data.objects.map(item => {
                     await UserDetail(currentuser, item.p_friend).then(item1 => {
                         temp.push(item1[0])
                         console.log('------>', item1[0])
 
                             let sp = friends.filter(item => item.username == item1[0].username)
                             if (sp.length == 0) {
                                 Setfriends([...friends, item1[0]])
                             }
 
 
                     }).catch(err => {
                         console.log(err)
                     })
                 })
                 console.log(temp)
                 Setfriends([...temp])
 
             })
             .catch(err => {
                 console.log(err)
             })
     } */


    useEffect(async () => {
        await getallusers()
        await getFriends()

        /* let pp = await UserDetail(currentuser, '/user/56/')
        console.log('ssssssssss')
        console.log(pp) */


    }, [])
    useEffect(() => {
        console.log('friends', friends)
    }, [friends])

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

        <Item title={item.username} />
    );

    if (addvisible)
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 10 }}>
                    <AddFriend users={allUsers} Setvisible={Setvisible} />
                </View>

            </View>

        )
    else
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
        borderRadius: 10,
        elevation: 3,
        height: 30,
        backgroundColor: '#2F80ED',
    },
    text: {

        paddingHorizontal: 10,
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