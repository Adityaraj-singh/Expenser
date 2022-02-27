import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, Button, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { useState } from "react";
const groups = [{
    id: 0,
    Name: 'Lunch',
    Desc: 'adaadaada'

},

{
    id: 1,
    Name: 'Kasol Trip',
    Desc: 'asasas'
}
]
const GroupList = () => {


    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.Name, textColor]}> <FontAwesome5 name="users" size={20} color="green" /> {item.Name}</Text>
            <Text style={styles.grp_notification}>
                1
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6FCF97" : "#F2F2F2";
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

    const [selectedId, setSelectedId] = useState(null);
    return (

        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', borderBottomColor: 'black', borderBottomWidth: 2, width: '92%', textAlign: 'center', marginBottom: 20 }}>Groups</Text>
            <FlatList
                data={groups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />

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