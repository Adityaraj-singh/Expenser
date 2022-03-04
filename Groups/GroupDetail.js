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
import AddFriendsToGroup from "./Expenses/AddFriends";
import { useSelector } from "react-redux";
const GroupDetail = ({ route, navigation }) => {
    //  console.log('route')
    //  console.log(route)
    const [iscreate, Setiscreate] = useState(false)
    const [statement, Setstatement] = useState([])
    const [addingfriend, Setaddingfriend] = useState(false)
    const { groupName, GroupId } = route.params

    const state = useSelector(state => state.GroupReducer)
    const allExpenses = useSelector(state => state.ExpenseReducer)
    const expenses = allExpenses.filter((item) => {
        if (item.groupId == GroupId) {
            return item
        }
    })
    const current_group = state.filter(item => {
        if (item.groupid == GroupId)
            return item
    })

    const current_group_members = current_group[0].members
    //console.log('memberingg')
    // console.log(current_group_members)

    useEffect(() => {
        //     console.log('grp detail')
        //  console.log(route.params)
        var PMS = PMS || {}

        PMS.GroupBalanceData = PMS.GroupBalanceData || {};

        PMS.GroupBalanceData.members = current_group_members.map((item) => {
            return {
                name: item,
                accounts: []
            }
        });
        //  console.log('statemenbtsss', PMS.GroupBalanceData.members)
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
        // console.log('FInal statement')
        //   console.log(PMS.GroupBalanceStatement)
        Setstatement(PMS.GroupBalanceStatement)
    }, [allExpenses])

    useEffect(() => {
        console.log('finals statement')
        console.log(statement)
    })
    if (addingfriend) {
        return (
            <AddFriendsToGroup Setaddingfriend={Setaddingfriend} navigation={navigation} addingfriend={addingfriend} Setaddingfriend={Setaddingfriend} groupname={route.params.groupName} groupid={route.params.GroupId} />
        )
    }
    else

        return (
            <View style={styles.container}>

                <View style={{ paddingLeft: 10, marginBottom: 10, display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18 }}>Members : </Text>
                    <Text style={{ fontWeight: 'bold', top: 3, marginLeft: 5 }}>{current_group_members.join(',')}</Text></View>

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={styles.addbutton} onPress={() => Setaddingfriend(true)} ><Text style={styles.addtext}>{iscreate ? null : <AntDesign name="user" size={15} color="black" />} Add Friend</Text></Pressable>
                    <Pressable style={styles.addbutton} onPress={() => navigation.navigate('AddExpense', {
                        GroupId,
                        groupName,
                        current_group_members
                    })} ><Text style={styles.addtext}>{iscreate ? null : <Ionicons name="add-circle-outline" size={15} color="black" />} {iscreate ? 'Cancel' : 'ADD Expense'}</Text></Pressable>
                </View>


                {

                    iscreate ? <AddExpense />
                        :
                        <View style={styles.expense}>
                            {
                                expenses.length !== 0 ?

                                    expenses.map((item, index) => {
                                        return (
                                            <Expenses key={index} expensedata={item} />
                                        )

                                    })
                                    :
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>No Epxense yet</Text>
                            }

                        </View>
                }
                {

                    iscreate ? null :
                        <View style={styles.group_balance}>
                            <GroupBalance data={statement} navigation={navigation} />
                        </View>
                }

            </View>
        )
}

const styles = StyleSheet.create({
    group_balance: {
        marginTop: 10,
        position: 'relative',
        bottom: 0,
        width: '90%',
        alignSelf: 'center'
    },
    container: {
        position: 'relative',
        top: 10,
        height: '100%',
        width: '100%',

    },
    addbutton: {
        backgroundColor: '#FBA4A4',
        borderRadius: 50,
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 15,
        fontSize: 12,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10,
        paddingVertical: 2
    },
    addtext: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        fontWeight: 'bold'
    }
})

export default GroupDetail