import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home';
import OS from '../../Screens/OS';
import PlayGround from '../../Screens/Visulizer/PlayGround';
import DS from '../../Screens/DS';
const Stack = createStackNavigator();

const NavBar = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="OS" component={OS} options={{ headerShown: false }} />
            <Stack.Screen name='DS' component={DS} options={{ headerShown: false }} />
            <Stack.Screen name='PlayGround' component={PlayGround} />
        </Stack.Navigator>
    );
};

export default NavBar;
