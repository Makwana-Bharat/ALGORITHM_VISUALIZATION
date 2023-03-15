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
    setUsername(user);
    AsyncStorage.setItem('User', user);
    NavBar
  }
  return userExists ? (
    <NavigationContainer>
      <NavBar />
      <StatusBar style="auto" />
    </NavigationContainer>
  ) : <LoginModal visible={visible} onLogin={(user) => LoginHandler(user)} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
