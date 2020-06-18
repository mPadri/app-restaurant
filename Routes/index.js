
import React from 'react';
import Home from '../Menu/Home';
import Masakan from '../Menu/Masakan';
import Categori from '../Menu/Categori';
import Kota from '../Menu/Kota';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import Restaurant from '../Menu/Restaurant';
import RestaurantKota from '../Menu/Kota/RestaurantKota';
import DetailCategory from '../Menu/DetailCategory';
import WebviewResto from '../Menu/WebviewResto';

const Stack = createStackNavigator(); // nama variabel bebas
const Tab = createBottomTabNavigator();

const MainApp =()=>{
    return(
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            {/* <Tab.Screen name="Masakan" component={Masakan} /> */}
            <Tab.Screen name="Kota" component={Kota} />
            <Tab.Screen name="Collections" component={Categori} />
        </Tab.Navigator>
    )
}
const Routes =()=>{
    return(
        <Stack.Navigator initialRouteName="MainApp">
            <Stack.Screen name="MainApp" component={MainApp} options={{headerShown:false}} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="RestaurantKota" component={RestaurantKota} />
            <Stack.Screen name="DetailCategory" component={DetailCategory} />
            <Stack.Screen name="WebviewResto" component={WebviewResto} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default Routes;