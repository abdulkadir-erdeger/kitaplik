import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login';
import SignIn from './pages/SingIn';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

export default function Router() {
  const [userSession, setUserSession] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => setUserSession(!!user));
    if (userSession) {
      setUser(auth().currentUser.email.split('@')[0]);
    }
    return () => {
      setUserSession();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#a0877e',
          },
        }}>
        {userSession ? (
          <>
            <Stack.Screen
              name="ChatPage"
              component={Chat}
              options={({navigation}) => ({
                title: 'Kitaplık',
                headerLeft: () => (
                  <Icon
                    name="logout"
                    color="black"
                    size={28}
                    onPress={() => auth().signOut()}
                  />
                ),
                headerRight: () => (
                  <Icon
                    name="account-circle"
                    color="black"
                    size={35}
                    onPress={() => navigation.navigate('ProfilePage', user)}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ProfilePage"
              component={Profile}
              options={{
                title: 'Profil',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginPage"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingInPage"
              component={SignIn}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
