import { View, Text,StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native'


const Details = ({route}) => {
    const navigation = useNavigation();
    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.Title);

    const handleUpdate =()=>{
        if(noteTitle && noteText.length >0) {
            firebase.firestore()
            .collection('notes')
            .doc(route.params.item.id)
            .update({
                Title: noteTitle,
                note: noteText,
            })
            .then(()=>{
                navigation.navigate('House');
            })
            .catch((error)=>{
                alert(error);
            })
        }
    }

    const handleDelete = ()=>{
        firebase.firestore().collection('notes')
            .doc(route.params.item.id)
            .delete()
            .then(()=>{
                navigation.navigate('House');
            })
            .catch((error)=>{
                alert(error);
            })
        
    }

  return (
    <View style={styles.container}>
      <TextInput
      placeholder='Title'
      value= {noteTitle}
      onChangeText={(text)=>setNoteTitle(text)}
      style={styles.inputTitle}/>

<TextInput
      placeholder='Note'
      value={noteText}
      onChangeText={(text)=>setNoteText(text)}
      style={styles.inputNote}
      multiline={true}/>

        <View style={styles.buttonView}>
        <TouchableOpacity
      style={styles.button} onPress={handleUpdate}>

        <Text style={styles.buttonText}>Update</Text>

      </TouchableOpacity>
        
        <TouchableOpacity
      style={styles.button} onPress={handleDelete}>

        <Text style={styles.buttonText}>Delete</Text>

      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Details;

const styles = StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#233A66',
},
inputTitle:{
    backgroundColor:'white',
    fontSize:18,
    fontWeight:"bold",
    marginTop:20,
    marginBottom:10,
    height:50,
    width:'97%',
    borderWidth:1,
    borderRadius:10 ,
    padding:10,
    borderColor:'#FFD691'
},
inputNote:{
    backgroundColor:'white',
    fontSize:18,
    borderColor:'#FFD691',
    height:300,
    width:'97%',
    borderWidth:1/2,
    borderRadius:10,
    padding:10,
},
buttonView:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:'97%',
},
button:{
    backgroundColor:'#D7A859',
    padding:10,
    borderRadius:5,
    marginTop:10,
},
buttonText:{
    color:'#fff',
    fontSize:18,
}
})