import React from 'react';
import Routes from './src/routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

// import * as React from 'react';
// import {Text, View} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import MapsScreen from './src/pages/Maps';
// import HomeScreen from './src/pages/Profile';
// import QrcodeScreen from './src/pages/Qrcode';

// function SettingsScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{color: '#000'}}>Settings!</Text>
//     </View>
//   );
// }

// // function HomeScreen() {
// //   return (
// //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
// //       <Text style={{color: '#000'}}>Home!</Text>
// //     </View>
// //   );
// // }

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//       <Tab.Screen name="Maps" component={MapsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
