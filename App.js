import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginModal from './Componets/LoginForm';
import { NavigationContainer } from '@react-navigation/native';
import OS from './Screens/OS';
import NavBar from './Componets/Navigation/NavBar';

export default function App() {
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const checkUserExists = async () => {
      const user = await AsyncStorage.getItem('User');
      setUserExists(!!user);
      setUsername(user || '');
      if (user == '')
        setVisible(true);
    };
    checkUserExists();
  }, []);

  /*=================LOGIN HANDLER===========================*/
  const LoginHandler = (user) => {
    setVisible(false);
    setUsername(user.USERNAME);
    AsyncStorage.setItem('User', JSON.stringify(user));
    return (
      <NavigationContainer>
        <NavBar />
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
  return userExists ? (
    <NavigationContainer>
      <NavBar />
      <StatusBar style="auto" />
    </NavigationContainer>
  ) : <LoginModal visible={visible} onLogin={(user) => LoginHandler(user)} />;
}

