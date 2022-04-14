import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  View,
  Alert,
} from "react-native";

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
import { ShowExpense } from "../API/ShowExpense";
import { useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import GetFriendsFromAllGroups from "../API/GetfriendsFromAllGroup";
const GroupDetail = ({ route, navigation }) => {
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
  const [rename, setRename] = useState("");
  const [changes, setchanges] = useState(false);
  const [newname, setNewname] = useState("");
  const [myfriendid, setMyfriendid] = useState("");
  const expenses = allExpenses.filter((item) => {
    if (item.groupId == GroupId) {
      return item;
    }
  });
  const current_group = state.filter((item) => {
    if (item.groupid == GroupId) return item;
  });
  const isFocused = useIsFocused();
  async function DeleteApi() {
    try {
      await fetch(
        `https://expenser-app-django-heroku.herokuapp.com/group/${GroupId}/`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `ApiKey ${currentuser.username}:${currentuser.token}`,
          },
        }
      )
        .then((data) => {
          navigation.navigate("Groupstack");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async function DeleteGroup() {
    Alert.alert(
      "Warning",
      `This will Delete everything in ${
        newname.length > 0 ? newname : groupName
      }`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => DeleteApi() },
      ]
    );
  }
  async function renameGroup() {
    let params = {
      creator: creator,
      name: rename,
    };
    if (rename.length > 0) {
      try {
        await fetch(
          `https://expenser-app-django-heroku.herokuapp.com/group/${GroupId}/`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `ApiKey ${currentuser.username}:${currentuser.token}`,
            },
            body: JSON.stringify(params),
          }
        )
          .then((data) => {
            setNewname(rename);
            setRename("");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }

  async function getExpensesshow() {
    await ShowExpense(currentuser).then((data) => {
      let temp = [];
      data.objects.map((item) => {
        if (item.group == `/group/${GroupId}/`) {
          temp.push(item);
        }
      });
      setAllexpense(temp);
    });
  }
  useEffect(async () => {
    let temparr = [];
    let create = {};
    if (creator == currentuser.resource_uri) {
      setIsadmin(true);
    } else {
      let temparr = [];
      await UserDetail(currentuser, creator)
        .then((data) => {
          create = data[0];
          temparr.push(create);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsadmin(false);
    }

    group_friends.map(
      (item) => {
        temparr.push(item);
      },
      [isFocused, changes]
    );

    setGroupmembers(temparr);
    await getExpensesshow();
    await GetFriendsFromAllGroups(currentuser).then((data) => {
      data.objects.map((friend) => {
        if (
          friend.friend.user.username == currentuser.username &&
          friend.group == `/group/${GroupId}/`
        ) {
          setMyfriendid(friend.resource_uri);
        }
      });
    });
    console.log("changeddd");
  }, [isFocused, changes]);

  useEffect(async () => {
    await getExpensesshow();
    var members = [];
    //Adding data structure according to Group Members
    group_friends.map((friend) => {
      members.push({
        username: friend.friend.user.username,
        profile_friend: friend.resource_uri,
        accounts: [],
      });
    });
  }, [isFocused]);

  useEffect(async () => {
    var members = [];
    //Adding data structure according to Group Members
    group_friends.map((friend) => {
      members.push({
        username: friend.friend.user.username,
        profile_friend: friend.friend.resource_uri,
        accounts: [],
      });
    });

    allexpense.map((expense) => {
      if (expense.group == `/group/${GroupId}/`) {
        members.map((member) => {
          // console.log(expense.payer.resource_uri);
          if (expense.payer.friend.resource_uri !== member.profile_friend) {
            expense.splitters.map((splitter) => {
              if (
                expense.payer.friend.user.resource_uri !==
                splitter.e_splitter.friend.resource_uri
              ) {
                if (
                  member.profile_friend ==
                  splitter.e_splitter.friend.resource_uri
                ) {
                  if (!expense.settled_by.includes(myfriendid)) {
                    let ref = member.accounts.find(
                      (acc) =>
                        acc.profile_friend == expense.payer.friend.resource_uri
                    );
                    if (ref) {
                      ref.amount = ref.amount + splitter.owes;
                    } else {
                      member.accounts = [
                        ...member.accounts,
                        {
                          username: expense.payer.friend.user.username,
                          profile_friend: expense.payer.friend.resource_uri,
                          amount: splitter.owes,
                        },
                      ];
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
    members.map(function (member) {
      let otherMembers = members.filter(
        (_member) => _member.profile_friend !== member.profile_friend
      );
      member.accounts.map(function (account) {
        otherMembers.map(function (otherMember) {
          if (otherMember.profile_friend === account.profile_friend) {
            otherMember.accounts.map(function (oMemAccount) {
              if (oMemAccount.profile_friend === member.profile_friend) {
                if (account.amount > oMemAccount.amount) {
                  account.amount = account.amount - oMemAccount.amount;
                  oMemAccount.amount = 0;
                } else {
                  oMemAccount.amount = oMemAccount.amount - account.amount;
                  account.amount = 0;
                }
              }
            });
          }
        });
      });
    });

    Setstatement(members);
    /*  console.log("------------");
    members.map((member) => {
      member.accounts.map((account) => {
        console.log(
          `${member.username} owes ${account.amount} to ${account.username}`
        );
      });
    }); */
  }, [allexpense, myfriendid]);

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
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingLeft: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: "bold" }}>
              {newname.length > 0 ? newname : groupName}
            </Text>{" "}
            :{" "}
          </Text>
          <Pressable style={styles.deletebtn} onPress={() => DeleteGroup()}>
            <Text style={styles.deleteText}>Delete Group</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={styles.rename}
            onChangeText={(text) => setRename(text)}
            placeholder="Rename"
          />
          <Pressable style={styles.renamebtn} onPress={() => renameGroup()}>
            <Text style={styles.renameText}>Rename</Text>
          </Pressable>
        </View>
        {showmembers ? (
          <Members
            groupname={groupName}
            creator={creator}
            currentuser={currentuser}
            groupmembers={groupmembers}
            setShowmembers={setShowmembers}
            groupid={GroupId}
            setchanges={setchanges}
            changes={changes}
          />
        ) : (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingHorizontal: 10,
            }}
          >
            <Pressable
              style={styles.addbutton}
              onPress={() => setShowmembers(true)}
            >
              <Text style={styles.addtext}>Show Members</Text>
            </Pressable>
            <Pressable
              style={styles.addbutton}
              onPress={() => Setaddingfriend(true)}
            >
              <Text style={styles.addtext}>Add Friend</Text>
            </Pressable>
            {creator == currentuser.resource_uri ? (
              <Pressable
                style={styles.addbutton}
                onPress={() =>
                  navigation.navigate("AddExpense", {
                    GroupId,
                    groupName,
                    groupmembers,
                    currentuser,
                    changes,
                    setchanges,
                  })
                }
              >
                <Text style={styles.addtext}>
                  {iscreate ? null : (
                    <Ionicons
                      name="add-circle-outline"
                      size={15}
                      color="black"
                    />
                  )}{" "}
                  {iscreate ? "Cancel" : "ADD Expense"}
                </Text>
              </Pressable>
            ) : null}
          </View>
        )}

        {iscreate ? (
          <AddExpense />
        ) : (
          <ScrollView style={styles.expense}>
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
          </ScrollView>
        )}
        {iscreate ? null : (
          <View style={styles.group_balance}>
            <GroupBalance
              data={statement}
              GroupId={GroupId}
              allexpense={allexpense}
              navigation={navigation}
              groupName={groupName}
            />
          </View>
        )}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  expense: {
    position: "relative",
    top: 10,

    paddingBottom: 5,
  },
  rename: {
    width: "60%",
    height: 20,
  },
  group_balance: {
    position: "relative",
    top: 20,
    marginTop: 0,
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
  renameText: {
    color: "white",
    display: "flex",

    fontSize: 10,
    flexDirection: "row",
    fontWeight: "bold",
  },
  renamebtn: {
    width: 50,
    backgroundColor: "green",
    borderRadius: 50,
    height: 25,
    textAlign: "center",
    alignSelf: "flex-end",
    paddingLeft: 6,
    paddingTop: 5,
    paddingVertical: 2,
    marginLeft: 10,
  },
  deletebtn: {
    width: 100,
    backgroundColor: "red",
    borderRadius: 50,
    height: 25,
    textAlign: "center",
    alignSelf: "flex-end",

    paddingTop: 5,
    paddingVertical: 2,
    marginLeft: 10,
  },
  deleteText: {
    color: "white",
    display: "flex",
    alignSelf: "center",
    fontSize: 10,
    flexDirection: "row",
    fontWeight: "bold",
  },
});

export default GroupDetail;
