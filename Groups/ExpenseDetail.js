import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, Pressable, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { useState } from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { Switch } from 'react-native-paper';
const ExpenseDetail = () => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (

        <View>


            <View style={[styles.card, styles.shadowProp]}>
                <Text style={styles.heading}>  Expense  Details</Text>
                <View style={styles.inner_card}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.heading2}>  Expense  Name</Text>
                        <TextInput
                            style={styles.input}

                            value={'Pizza'}
                            placeholder="useless placeholder"

                        />
                    </View>
                    <View>
                        <Text style={styles.heading2}>  Expense  AmountS</Text>
                        <TextInput
                            style={styles.input}

                            value={'250 $'}
                            placeholder="useless placeholder"
                            keyboardType="numeric"


                        />
                    </View>
                    <Text style={styles.heading2}> Participants</Text>
                    <View style={styles.participants}>
                        <Text>  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;</Text>

                    </View>

                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        width: '70%',
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
    inner_card: {
        marginTop: 10,
        paddingVertical: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    heading2: {
        fontWeight: 'bold',
        fontSize: 14,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
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
export default ExpenseDetail