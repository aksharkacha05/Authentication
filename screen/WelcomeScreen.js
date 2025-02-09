import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
 const [fetchedMeassage,setFeatchdMeassage] = useState('');
 const authCtx = useContext(AuthContext);
 const token = authCtx.token;
  useEffect(()=>{
    axios.get('https://application-aab37-default-rtdb.firebaseio.com/meassage.json?auth='  + token).then((response)=>{
      setFeatchdMeassage(response.data);
    }) 
  },[token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMeassage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});