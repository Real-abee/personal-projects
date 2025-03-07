import { StyleSheet, Text, View,Button, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../config';


export default function First() {


  const [userUID, setUserUID] = useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged(user=>{
      if (user){
        navigation.navigate('House');
      }
    })

    return unsubscribe;
  },[])

  const handleSignUp = ()=>{
    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials =>{
      const user = userCredentials.user;
      console.log('Registered with', user.email)
    })
    .catch(error=>alert(error.message))
  };

  const handleSignIn = ()=>{
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials=>{
      const user = userCredentials.user;
      console.log('logged in with', user.email )
    }).catch (error=>alert('You need to register'))
  }


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'>
     
<View style={styles.inputContainer}>
  <TextInput placeholder='email'
  value={email}
  onChangeText={(text)=>{setEmail(text)}}
  style={styles.input}></TextInput>

<TextInput placeholder='password'
  value={password}
  onChangeText={(text)=>{setPassword(text)}}
  style={styles.input}
  secureTextEntry></TextInput>
</View>
<View style={styles.buttonContainer}>
     <TouchableOpacity  onPress={handleSignIn}
      style={styles.button}> 
        <Text style={styles.buttonText}>Login</Text>
     </TouchableOpacity>

     <TouchableOpacity  onPress={handleSignUp}
      style={[styles.button, styles.buttonOutline]}> 
        <Text style={styles.buttonOutlineText}>Sign Up</Text>
     </TouchableOpacity>
     </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
    },
    inputContainer:{
      width:'80%',

    },
input:{backgroundColor:'white',
  paddingHorizontal:15,
  paddingVertical:10,
  borderRadius:10,
  marginTop:5,
},
buttonContainer:{
  width:'60%',
  justifyContent:'center',
  alignItems:'center',
  marginTop:40,
},
button:{
  backgroundColor:'#233A66',
  width:'100%',
  padding:15,
  borderRadius:10,
},
buttonOutline:{
  backgroundColor:'white',
  marginTop:5,
  borderColor:'#233A66',
  borderWidth:2,
},
buttonText:{
  color:'white',
  fontWeight:'700',
  fontSize:16,
},
buttonOutlineText:{
  color:'#233A66',
  fontWeight:'700',
  fontSize:16,
},
})