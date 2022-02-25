import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, Button, TouchableNativeFeedback, ImageBackground, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';
import Topbar from './Navbar/Topbar';
import Sidebar from './Navbar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupList from './Groups/Groups';
import ExpenseDetail from './Groups/ExpenseDetail';

export default function App() {
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dashboard',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Groups',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Friends',
    },
  ];

  const [selectedId, setSelectedId] = useState('bd7acbea-c1b1-46c2-aed5-3ad53abb28ba')
  const stack = createNativeStackNavigator()
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#4293FF" : "none";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        alignItems={'center'}
        textColor={{ color }}

      />
    );
  };
  const [signup, Setsignup] = useState(false)
  //  { signup ? <Signup Setsignup={Setsignup} /> : <Login Setsignup={Setsignup} />}

  const [sidebar, Setsidebar] = useState(false)
  /*

<View style={styles.buttons} >
      <Topbar Setsidebar={Setsidebar} sidebar={sidebar} />
      {sidebar ? <Sidebar Setsidebar={Setsidebar} DATA={DATA} renderItem={renderItem} selectedId={selectedId} /> : null}
    </View>

  */

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" animated={true} showHideTransition='fade' barStyle='dark-content' networkActivityIndicatorVisible={true} />
      <View style={styles.buttons}>
        <View style={styles.buttons} >
          <Topbar Setsidebar={Setsidebar} sidebar={sidebar} />
          {sidebar ? <Sidebar Setsidebar={Setsidebar} DATA={DATA} renderItem={renderItem} selectedId={selectedId} /> : null}
        </View>
      </View>

      <View style={styles.grouplist}>
        <ExpenseDetail />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grouplist: {
    position: 'relative',
    marginTop: '40%',

    width: '100%',
    height: 400
  },
  container: {
    alignItems: 'center',
    height: "100%",
    width: '100%'

  },
  buttons: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 5,
    zIndex: 1
  }

  ,
  dashboard: {
    position: 'relative',
    top: '10%',
    height: null,
    width: '100%',

    zIndex: 0
  }
  ,
  background: {
    flex: 5,
    justifyContent: "center",
    width: '100%',
    height: '100%',

  },
  item: {

    padding: 20,
    width: '120%',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    width: '100%',
    justifyContent: 'center',
    fontWeight: 'bold',
  }
});
