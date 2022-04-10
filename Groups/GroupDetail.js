import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, Pressable, View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { exp } from "react-native/Libraries/Animated/Easing";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense";
import GroupBalance from "./Expenses/GroupBalance";
import AddFriendsToGroup from "./Expenses/AddFriends";
import { useSelector } from "react-redux";
import { UserDetail } from "../API/Getuser";
import { GetFriends } from "../API/GetFriends";
import Members from "./Expenses/Members";
import ShowExpense from "../API/Expense";
const GroupDetail = ({ route, navigation }) => {
  /*  console.log('route')
     console.log(route.params) */
  const [iscreate, Setiscreate] = useState(false);
  const [statement, Setstatement] = useState([]);
  const [addingfriend, Setaddingfriend] = useState(false);
  const { groupName, GroupId, group_friends, creator } = route.params;
  const [tempo, Settempo] = useState([]);
  const [groupmembers, setGroupmembers] = useState([]);
  const state = useSelector((state) => state.GroupReducer);
  const [isadmin, setIsadmin] = useState(false);
  const currentuser = useSelector((state) => state.userReducer);
  const [showmembers, setShowmembers] = useState(false);
  const [allexpense, setAllexpense] = useState([]);
  const allExpenses = [];
  const [changes, setchanges] = useState(false);
  const expenses = allExpenses.filter((item) => {
    if (item.groupId == GroupId) {
      return item;
    }
  });
  const current_group = state.filter((item) => {
    if (item.groupid == GroupId) return item;
  });

  async function getExpense() {
    let temparray2 = [];
    await ShowExpense(currentuser)
      .then((data) => {
        console.log(data);

        //setAllexpense(temparray2);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(allexpense);
  useEffect(async () => {
    let temparr = [];
    let create = {};
    if (creator == currentuser.resource_uri) {
      setIsadmin(true);
      create = {
        resource_uri: currentuser.resource_uri,
        username: currentuser.username,
      };
    } else {
      let temparr = [];
      await UserDetail(currentuser, creator)
        .then((data) => {
          //    console.log(data[0], "dataa is");
          create = data[0];
        })
        .catch((err) => {
          console.log(err);
        });
      setIsadmin(false);
    }

    group_friends.map((item) => {
      temparr.push(item.p_friend);
    });
    temparr.push(create);

    setGroupmembers(temparr);

    await getExpense();

    console.log("changess changed");
  }, [changes]);
  const members = groupmembers
    .map((item) => {
      return item.username;
    })
    .join(",");

  const current_group_members = [];
  //console.log('memberingg')
  // console.log(current_group_members)
  /*

    
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
    */

  if (addingfriend) {
    return (
      <AddFriendsToGroup
        changes={changes}
        setchanges={setchanges}
        groupmembers={groupmembers}
        Setaddingfriend={Setaddingfriend}
        navigation={navigation}
        addingfriend={addingfriend}
        groupname={route.params.groupName}
        groupid={route.params.GroupId}
      />
    );
  } else
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingLeft: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Members in <Text style={{ fontWeight: "bold" }}>{groupName}</Text> :{" "}
          </Text>
          <Text style={{ fontWeight: "bold", top: 3, marginLeft: 5 }}>
            {groupmembers.length > 0 ? members : "0"}
          </Text>
        </View>
        {showmembers ? (
          <Members
            currentuser={currentuser}
            groupmembers={groupmembers}
            setShowmembers={setShowmembers}
            groupid={GroupId}
          />
        ) : (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Pressable
              style={styles.addbutton}
              onPress={() => setShowmembers(true)}
            >
              <Text style={styles.addtext}>
                {iscreate ? null : (
                  <AntDesign name="user" size={15} color="black" />
                )}{" "}
                Show Members
              </Text>
            </Pressable>
            <Pressable
              style={styles.addbutton}
              onPress={() => Setaddingfriend(true)}
            >
              <Text style={styles.addtext}>
                {iscreate ? null : (
                  <AntDesign name="user" size={15} color="black" />
                )}{" "}
                Add Friend
              </Text>
            </Pressable>
            <Pressable
              style={styles.addbutton}
              onPress={() =>
                navigation.navigate("AddExpense", {
                  GroupId,
                  groupName,
                  groupmembers,
                  currentuser,
                })
              }
            >
              <Text style={styles.addtext}>
                {iscreate ? null : (
                  <Ionicons name="add-circle-outline" size={15} color="black" />
                )}{" "}
                {iscreate ? "Cancel" : "ADD Expense"}
              </Text>
            </Pressable>
          </View>
        )}

        {iscreate ? (
          <AddExpense />
        ) : (
          <View style={styles.expense}>
            {allexpense.length !== 0 ? (
              allexpense.map((item, index) => {
                return (
                  <Expenses
                    key={index}
                    groupmembers={groupmembers}
                    expensedata={item}
                  />
                );
              })
            ) : (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                No Epxense yet
              </Text>
            )}
          </View>
        )}
        {iscreate ? null : (
          <View style={styles.group_balance}>
            <GroupBalance data={statement} navigation={navigation} />
          </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  group_balance: {
    marginTop: 10,
    position: "relative",
    bottom: 0,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    position: "relative",
    top: 10,
    height: "100%",

    width: "100%",
  },
  addbutton: {
    width: null,
    backgroundColor: "#FBA4A4",
    borderRadius: 50,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 15,
    fontSize: 12,
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
    paddingVertical: 2,
  },
  addtext: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
  },
});

export default GroupDetail;
