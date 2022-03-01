import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, Pressable, View, } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { exp } from "react-native/Libraries/Animated/Easing";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense";
import GroupBalance from "./Expenses/GroupBalance";

const GroupDetail = ({ navigation }) => {
    const [iscreate, Setiscreate] = useState(false)
    const [statement, Setstatement] = useState([])
    const expenses = [{
        id: 0,
        month: 'Feb',
        date: ' 28',
        name: "Pizza",
        amount: 750,
        owner: "Karanveer",
        transactions: [
            {
                ower: "Gagan",
                amount: 300,
                lender: "Karanveer",
            },
            {
                ower: "Aditya Raj",
                amount: 300,
                lender: "Karanveer",
            },
        ],
    },
    {
        id: 1,
        month: 'MARCH',
        date: ' 28',
        name: "mOMOS",
        amount: 750,
        owner: "Gagan",
        transactions: [
            {
                ower: "Aditya raj",
                amount: 300,
                lender: "Gagan",
            },
            {
                ower: "Karanveer",
                amount: 300,
                lender: "Gagan",
            },
        ],
    }]

    useEffect(() => {

        var PMS = PMS || {}

        PMS.GroupBalanceData = PMS.GroupBalanceData || {};
        PMS.GroupBalanceData.members = [
            {
                name: "Aditya Raj",
                accounts: [],
            },
            {
                name: "Gagan",
                accounts: [],
            },
            {
                name: "Karanveer",
                accounts: [],
            },
        ];
        expenses.forEach((elm) => {
            PMS.GroupBalanceData.members.forEach((member) => {
                if (elm.owner !== member.name) {
                    elm.transactions.forEach((trans) => {
                        if (member.name === trans.ower) {
                            if (member.accounts.find((acc) => acc.name === trans.lender)) {
                                let ref = member.accounts.find(
                                    (acc) => acc.name === trans.lender
                                );
                                ref.amount = parseInt(ref.amount) + parseInt(trans.amount);
                            } else {
                                member.accounts = [
                                    ...member.accounts,
                                    {
                                        name: trans.lender,
                                        amount: parseInt(trans.amount),
                                    },
                                ];
                            }
                        }
                    });
                }
            });
        });
        PMS.GroupBalanceData.members.forEach((member) => {
            let otherMembers = PMS.GroupBalanceData.members.filter(
                (_member) => _member.name !== member.name
            );
            member.accounts.forEach((account) => {
                otherMembers.forEach((_member) => {
                    if (_member.name === account.name) {
                        _member.accounts.forEach((_account) => {
                            if (_account.name === member.name) {
                                // let otherAccount = new Object.assign(_account);
                                if (account.amount > _account.amount) {
                                    account.amount =
                                        parseInt(account.amount) - parseInt(_account.amount);
                                    _account.amount = 0;
                                } else {
                                    _account.amount =
                                        parseInt(_account.amount) - parseInt(account.amount);
                                    account.amount = 0;
                                }
                            }
                        });
                    }
                });
            });
        });
        PMS.GroupBalanceStatement = [];
        PMS.GroupBalanceData.members.map((member) => {
            member.accounts.forEach((account) => {
                PMS.GroupBalanceStatement.push({
                    lender: account.name,
                    ower: member.name,
                    amount: account.amount,
                });
            });
        });
        console.log(PMS.GroupBalanceStatement)
        Setstatement(PMS.GroupBalanceStatement)
    }, [])

    return (
        <View style={styles.container}>
            <Pressable style={styles.addbutton} onPress={() => Setiscreate(!iscreate)} ><Text style={styles.addtext}>{iscreate ? null : <Ionicons name="add-circle-outline" size={15} color="black" />} {iscreate ? 'Cancel' : 'ADD'}</Text></Pressable>
            {

                iscreate ? <AddExpense />
                    :
                    <View style={styles.expense}>
                        {
                            expenses.map((item, index) => {
                                return (
                                    <Expenses key={index} expensedata={item} />
                                )

                            })
                        }

                    </View>
            }
            {

                iscreate ? null :
                    <View style={styles.group_balance}>
                        <GroupBalance navigation={navigation} />
                    </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    group_balance: {
        position: 'absolute',
        bottom: 100,
        width: '90%',
        alignSelf: 'center'
    },
    container: {
        position: 'relative',
        top: 50,
        height: '100%',
        width: '100%',

    },
    addbutton: {
        backgroundColor: '#FBA4A4',
        borderRadius: 50,

        paddingHorizontal: 5,
        width: '30%',
        fontSize: 12,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10,
        paddingVertical: 2
    },
    addtext: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row'
    }
})

export default GroupDetail