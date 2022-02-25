import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Button,
    Pressable,
    ImageBackground,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    FlatList
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";

const TotalExpenses = () => {
    const [selectedId, setSelectedId] = useState(null);

    const data = [
        {

            id: 0,
            name: 'COllege Friends',
            Col1: 200,
            Col2: 600
        },
        {
            id: 1,
            name: 'Wolf pack',
            Col1: 500,
            Col2: 100
        }
    ]

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.Name, textColor]}>  {item.name}</Text>
            <View style={styles.amounts}>
                <Text style={styles.col1}>
                    {item.Col1}
                </Text>
                <Text style={styles.Col2}>
                    {item.Col2}
                </Text>
            </View>

        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#4293FF" : "#F2F2F2";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.card, styles.shadowProp]}>
                <Text style={styles.heading}>Total Amount</Text>
                <View style={styles.inner_container}>
                    <Text style={styles.h1}><Text style={styles.h0}>Owed</Text> <Text>/</Text><Text style={styles.h2}>Lent {' '}</Text><Text>Ratio</Text></Text>
                </View>

                <View style={styles.outer_bar}>
                    <View style={styles.inner_bar}>
                        <Text style={styles.bar_text}>{'30%'}</Text>
                    </View>
                </View>

                <View style={styles.subs}>
                    <Text style={styles.t1}>200</Text>
                    <Text style={styles.t2}>600</Text>
                </View>

            </View>
            <View style={[styles.card, styles.shadowProp]}>
                <Text style={styles.heading}>Group Tally</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                    style={{ marginTop: 20 }}
                />

            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    Name: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10
    },
    amounts: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    col1: {
        backgroundColor: '#FBA4A4',
        fontSize: 13,
        borderRadius: 50,
        paddingHorizontal: 10
    },
    Col2: {
        backgroundColor: '#6FCF97',
        fontSize: 13,
        borderRadius: 50,
        paddingHorizontal: 10
    },
    t1: {
        backgroundColor: '#FBA4A4',
        borderRadius: 40,
        paddingHorizontal: 10
    },
    t2: {
        backgroundColor: '#6FCF97',
        borderRadius: 40,
        paddingHorizontal: 10
    },
    subs: {
        width: '40%',
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    bar_text: {
        fontSize: 10,
        color: 'white',
        bottom: 1
    },
    outer_bar: {
        marginTop: 8,
        height: 15,
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#6FCF97'
    },
    inner_bar: {
        height: '100%',
        width: '30%',
        backgroundColor: '#FBA4A4',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        alignItems: 'center',

    },
    h1: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    h2: {
        color: 'green'
    },
    h0: {
        color: 'pink'
    },
    inner_container: {
        marginTop: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    container: {
        width: '100%',
        height: '100%',

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,


    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})

export default TotalExpenses