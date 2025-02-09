import { useContext,useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import LoginScreen from './screen/LoginScreen';
import SignupScreen from './screen/SignUpScreens';
import WelcomeScreen from './screen/WelcomeScreen';
import { Colors } from './constants/style';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx =useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight:({tintColor})=><IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
 const authCtx =  useContext(AuthContext);


  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack/>}
    </NavigationContainer>
    
  );
}
  function Root(){
    const [isTryingLoging,setIsTryingLogin] = useState();
    const authCtx = useContext(AuthContext)
    useEffect(()=>{
      async function fetchToken(){
         const  Storedtoken = await AsyncStorage.getItem('token');
         if (Storedtoken) {
          authCtx.authenticate(Storedtoken);
         }
         setIsTryingLogin(false);
      }
      fetchToken();
     },[]);
     if(isTryingLoging){
      return <AppLoading/>
     }
      return <Navigation />
  }

export default function App() {
 
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <Root/>
      </AuthContextProvider>
    </>
  );
}