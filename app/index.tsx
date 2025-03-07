// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Header from './src/header';
import NotedAdd from './src/notedAdd';
import House from './src/house';
import First from './src/first';
import Details from './src/details';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import Header from './src/header';

const stack = createStackNavigator()

export default function index() {
  return (
  <NavigationContainer>
    <stack.Navigator>

<stack.Screen
      component={First}
      name='First'
      options={{headerShown: false}} />
      
      <stack.Screen
      component={House}
      name='House'
      options={{headerShown: false}}/>
      
      <stack.Screen
      component={NotedAdd}
      name='NoteAdd'
      options={{headerTitle : "Add Notes", headerTintColor:'white',
        headerStyle:{backgroundColor:'#D7A859',
          height:80
        }
      }}/>
      
      <stack.Screen
      component={Details}
      name='Details'
      options={{headerTitle : "Edit Notes", headerTintColor:'white',
        headerStyle:{backgroundColor:'#D7A859',
          height:80
        }}}
        />
    </stack.Navigator>
   
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})