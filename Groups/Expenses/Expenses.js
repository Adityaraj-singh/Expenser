import React from "react";
import { StyleSheet, Text, Pressable, View, } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DropDown from "./Dropdown";


const Expenses = ({ key, expensedata, navigation }) => {

    const [data, Setdata] = useState(expensedata)

    const [iscollapsed, Setiscollapsed] = useState(false)
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.times}>
                        <Text style={{ color: 'white', borderBottomColor: 'white', borderBottomWidth: 2 }}>{data.month}</Text>
                        <Text style={{ color: 'white' }}>{data.date}</Text>
                    </View>
                    <View style={{ width: '80%', marginLeft: 10 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{data.name}</Text>
                    </View>


                </View>


                <View style={styles.right}>
                    <View style={styles.amount}><Text style={{ color: 'white', borderBottomColor: 'white', borderBottomWidth: 2, fontSize: 10, fontWeight: 'bold' }}>Amount</Text><Text style={{ color: 'white', fontSize: 10 }}>{data.amount}</Text></View>
                    <View style={styles.youowe} ><Text style={{ color: 'white', borderBottomColor: 'white', borderBottomWidth: 2, fontSize: 10, fontWeight: 'bold' }}>You Owe</Text><Text style={{ color: 'white', fontSize: 10 }}>600</Text></View>
                    <View><Pressable onPress={() => Setiscollapsed(!iscollapsed)} style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 5 }}><Text><AntDesign name={iscollapsed ? 'up' : 'down'} size={20} color="black" /></Text></Pressable></View>
                </View>
            </View>

            {iscollapsed ? <DropDown key={key} transactions={data.transactions} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    detail: {
        backgroundColor: 'yellow',
        width: '100%',
        height: 'auto'
    },
    container: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#6FCF97',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingLeft: 5,
        marginTop: 5
    },
    left: {
        width: '50%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 20,
        width: '50%',
    },
    times: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
    },
    amount: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#27AE60',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 2,
        marginBottom: 'auto',
        marginTop: 'auto',
        marginRight: 5
    },
    youowe: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#9F3E3E',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 2,
        marginBottom: 'auto',
        marginTop: 'auto'
    },

})

export default Expenses