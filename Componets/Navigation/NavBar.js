import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home';
import OS from '../../Screens/OS';
import PlayGround from '../../Screens/Visulizer/PlayGround';
import DS from '../../Screens/DS';
import MostView from '../../Screens/MostView';
import RecentView from '../../Screens/RecentView';
import Search from '../../Screens/Search';
const Stack = createStackNavigator();

const NavBar = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="OS" component={OS} options={{ headerShown: false }} />
            <Stack.Screen name='DS' component={DS} options={{ headerShown: false }} />
            <Stack.Screen name='MostView' component={MostView} options={{
                headerStyle: { backgroundColor: '#59300E' },
                headerTintColor: '#F4DEC6',
                headerTitle: 'Mostview'
            }} />
            <Stack.Screen name='RecentView' component={RecentView} options={{
                headerStyle: { backgroundColor: '#59300E' },
                headerTintColor: '#F4DEC6',
                headerTitle: 'History'
            }} />
            <Stack.Screen
                name="PlayGround"
                component={PlayGround}
                options={{
                    headerStyle: { backgroundColor: '#59300E' },
                    headerTintColor: '#F4DEC6',
                }}
            />
            <Stack.Screen name='Search' component={Search} options={{
                headerStyle: { backgroundColor: '#59300E' },
                headerTintColor: '#F4DEC6',
            }} />
        </Stack.Navigator>
    );
};

export default NavBar;
