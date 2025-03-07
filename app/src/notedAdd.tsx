import { View, Text, Keyboard, StyleSheet,KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import {auth, firebase} from '../config'
import { useNavigation } from '@react-navigation/native'




const NotedAdd = () => {
const [Title, setTitle] = useState('');
const [note, setNote] = useState('');



const navigation = useNavigation();
const handleAdd=()=>{
  if(Title || note.length >0){
  firebase.firestore().collection('notes').add({Title,note})
  .then(()=>{
    setTitle('')
    setNote('')
    Keyboard.dismiss();
    alert('Note added');
    navigation.navigate('House')
  })
  .catch((error)=>{
    alert(error)
  })}
  else {alert('Blank note cannot be saved!')}
}
  return (
    <KeyboardAvoidingView style={styles.container}>
     <TextInput 
     placeholder='Add Note Title' 
     value={Title}
     onChangeText={(text)=>setTitle(text)}
     style={styles.inputTitle}
     />

<TextInput 
     placeholder='Add Note' 
     value={note}
     onChangeText={(text)=>setNote(text)} 
     style={styles.inputNote}
     multiline={true}
     />
    <TouchableOpacity style={styles.button}
    onPress={handleAdd}
   
    >

    <Text style={styles.buttonText}>Add Note</Text>
    </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

export default NotedAdd

const styles =  StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor:'#233A66',
  },
  inputTitle:{
    borderRadius:10,
    backgroundColor:'white',
    fontSize:18,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:10,
    height:50,
    width:'97%',
    borderBottomWidth:1/2,
    borderLeftWidth:1/2,
    padding:10,
    borderColor:'#FFD691'
  },
  inputNote:{
    borderRadius:10,
    borderColor:'#FFD691',
    fontSize:18,
    fontWeight:"bold",
    marginTop:20,
    marginBottom:10,
    backgroundColor:'white',
    height:200,
    width:'97%',
    borderBottomWidth:1/2,
    borderLeftWidth:1/2,
    padding:10,
  },
  button:{
    backgroundColor:'#D7A859',
    borderRadius:10,
    marginTop:20,
    height:55,
    width:150,
    alignItems:'center',
    justifyContent:'center',
    elevation:7,
    shadowColor:'#FFD691',
  },
  buttonText:{
    color:'white',
    fontSize:22,
    fontWeight:'bold'
  },
  
})