import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from './pages/Maps';
import ProfileScreen from './pages/Profile';
import QrcodeScreen from './pages/Qrcode';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9fe801',
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#171626',
          borderTopWidth: 0,

          bottom: Platform.OS === 'android' ? 14 : 28,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 4,
          height: 60,
          paddingBottom: 0, // Apenas no iOS para zerar o padding do IOS
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return <Icon name="home" size={size} color={color} />;
            }

            return <Icon name="home-outline" size={size} color={color} />; // parei aqui
          },
        }}
      />
      <Tab.Screen name="MyMap" component={MapScreen} />
      <Tab.Screen name="Qrcode" component={QrcodeScreen} />
    </Tab.Navigator>
  );
}

export default Routes;
