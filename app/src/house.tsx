import { View, Text, StyleSheet,Pressable,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
//import NotedAdd from './notedAdd'
import {auth, firebase} from '../config'
import { FlashList } from '@shopify/flash-list'
import { Entypo } from '@expo/vector-icons'

const House = () => {

  const [notes, setNotes]=useState([]);
  const navigation = useNavigation();

  const handleSignOut =()=>{
    auth.signOut().then(()=>{
      
      navigation.replace('First');
      console.log('logged out')
    }).catch(error=>alert(error.message));
    
  }

  useEffect(()=>{
    firebase.firestore().collection('notes').onSnapshot((querySnapShot)=>{
      const newNotes =[];
      querySnapShot.forEach((doc)=>{
        const {note, Title} = doc.data();
        newNotes.push({note, Title, id:doc.id});
      });
      setNotes(newNotes);
    });

  },[]);

  return (
    <View style={styles.container}>
     
        <FlashList
        data={notes}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({item})=>(
          <View style={styles.noteView}>
            <Pressable onPress={()=>navigation.navigate('Details', {item})}>
            <Text style={styles.noteTitle}>
              {item.Title}
            </Text>

            <Text style={styles.noteDescription}>
              {item.note}
            </Text>
            </Pressable>

          </View>
        )}/>
      
      <TouchableOpacity style={styles.button}
      onPress={()=>navigation.navigate('NoteAdd')}>
        <Entypo name='plus' size={45}
        color='#0a0a0a'
        />
      </TouchableOpacity>
       <View style={styles.signOut}>
       <TouchableOpacity onPress={handleSignOut}>
      <Text style={styles.logOutText}>Sign Out</Text>
      </TouchableOpacity>
       </View>

    </View>


  )
}

export default House

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#233A66',
  },
  noteView:{
    flex:1,
    backgroundColor:'#fff',
    margin:10,
    padding:10,
    borderRadius:10,
    shadowColor:'#FFD691',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:7,
    alignItems:'center'
  },
  noteTitle: {
    fontSize:20,
    fontWeight:'bold',
  },
  noteDescription:{
    fontSize:16,
    marginTop:5,
  },
  button:{
    position:'absolute',
    bottom:60,
    right:30,
    backgroundColor:'#FFD691',
    borderRadius:50,
    padding:10,
    elevation:7,
  },
  signOut:{
    position:'absolute',
    bottom:60,
    left:30,
    backgroundColor:'#FFD691',
    borderRadius:50,
    padding:10,
    elevation:7,
  },
  logOutText:{
    fontSize:16,
    marginTop:5,
    fontWeight:'bold'
  }
})