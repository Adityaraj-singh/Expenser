import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

const DropDown = ({ transactions }) => {


    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title.amount}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <View style={styles.detail}>
            {transactions.map((item, index) => {
                console.log(item.lender, item.ower, item.lender !== item.ower)
                return item.lender !== item.ower ?
                    (

                        <View style={styles.card} key={index}>
                            <View style={{ width: '30%', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}><FontAwesome name="user" size={15} color="green" /> {item.ower}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '38%' }}>
                                <Text style={styles.owes}>Owes</Text>
                                <Text style={styles.amount}>{item.amount}</Text>
                                <Text style={styles.to}>To</Text>
                            </View>


                            <Text style={styles.user2}><FontAwesome name="user" size={15} color="green" /> {item.lender}</Text>
                        </View>
                    )
                    :
                    null

            })}
        </View>
    )

}

const styles = StyleSheet.create({
    detail: {
        width: '100%',

    },
    card: {
        paddingHorizontal: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    owes: {
        backgroundColor: '#FBA4A4',
        paddingHorizontal: 5,
        marginBottom: 5,
        marginTop: 'auto',
        paddingVertical: 2,
        fontSize: 14,
        borderRadius: 10,
        fontWeight: 'bold',

    },
    amount: {

        paddingHorizontal: 5,
        marginBottom: 'auto',
        marginTop: 'auto',
        paddingVertical: 2,
        fontSize: 14,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    to: {
        backgroundColor: '#FBA4A4',
        paddingHorizontal: 5,
        marginBottom: 'auto',
        marginTop: 'auto',
        paddingVertical: 2,
        fontSize: 14,
        borderRadius: 10,
        fontWeight: 'bold',
        alignContent: 'center',

    },
    user2: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 'auto',
        marginBottom: 'auto'
    }
})

export default DropDown