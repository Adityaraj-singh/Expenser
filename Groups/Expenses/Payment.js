import React from "react";
import { StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Menu } from 'react-native-paper';

const Payment = ({ id }) => {
    const [amount, Setamount] = useState(0)

    return (
        <View>
            <View style={[styles.card, styles.shadowProp]}  >
                <Text style={styles.heading}>Payment</Text>

                <View style={{ width: '90%', marginTop: 10 }}>
                    <Text style={styles.label1}>
                        Group name
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Groupname"
                    />
                </View>

                <View style={{ width: '90%' }}>
                    <Text style={styles.label1}>
                        Paying To
                    </Text>
                    <TextInput
                        style={styles.input}

                        underlineColorAndroid="transparent"
                    />

                </View>
                <View style={{ width: '90%' }}>
                    <Text style={styles.label1}>
                        Amount
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Amount"
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => { Setamount(parseInt(value)) }}
                    />

                </View>
                <View style={styles.uis}>
                    <View style={styles.user1}>
                        <Text><FontAwesome name="user-circle-o" size={50} color="green" /></Text>
                        <Text style={{ marginTop: 5, backgroundColor: '#A4CCFB', fontSize: 28, color: 'white', borderRadius: 5, fontWeight: 'bold' }} >Gagan</Text>
                    </View>
                    <View>
                        <Ionicons name="arrow-forward-sharp" size={50} color="black" />
                    </View>
                    <View style={styles.user2}>
                        <Text><FontAwesome name="user-circle-o" size={50} color="green" /></Text>
                        <Text style={{ marginTop: 5, backgroundColor: '#FBA4A4', fontSize: 28, color: 'white', borderRadius: 5, fontWeight: 'bold' }}>Gagan</Text>
                    </View>

                </View>

                <View style={styles.showamount}>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 24 }}>{'200'}</Text>
                </View>
                <TouchableOpacity style={styles.settle} onPress={() => navigation.navigate('Payment')}>
                    <Text style={styles.text}>
                        Settle
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    settle: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: '20%',
        borderRadius: 30,
        elevation: 3,
        height: 30,
        backgroundColor: '#2F80ED',
    },
    text: {


        fontWeight: 'bold',
        color: 'white',
    },
    showamount: {
        borderRadius: 10,
        fontSize: 24,
        height: 40,
        width: 80,
        borderWidth: 2,
        backgroundColor: 'white',
        borderBottomColor: '#4F4F4F',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    uis: {
        marginTop: 10,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',

        alignItems: 'center'
    },
    user1: {
        marginTop: 10,
        alignItems: 'center'
    },
    user2: {
        marginTop: 10,
        alignItems: 'center'
    },
    label1: {
        fontSize: 18,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        width: '100%',
        borderRadius: 50,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 20,



    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    card: {
        marginTop: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '90%',
        alignSelf: 'center',
        overflow: 'scroll',

        height: 500,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})
export default Payment