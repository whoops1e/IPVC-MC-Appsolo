/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class ApgAtz extends Component{

  constructor(){
    super();
    this.state = {
      nome : '',
      city : '',
      phone : '',
    }
    realm = new Realm({ path: 'persons.realm' });
  }

  updateRegisto=()=>{
    Alert.alert("Registo atualizado com sucesso.");
    this.props.navigation.goBack();
  }

  deleteRegisto=()=>{
    Alert.alert(
      'Info',
      'Tem a certeza que pretende remover este registo?',
    [
      {text: 'Não', onPress: () => console.log('Pedido cancelado'), style: 'cancel'},
      {text: 'Sim', onPress: () => {this.deleteUser();}},
    ]
    );
  }

  deleteUser = () => {
    realm.write(() => {
      const { id } = this.props.route.params;
      let task = realm.objects('person').filtered('id = ' + id);
      realm.delete(task);
    });
    this.props.navigation.goBack();
  }

  render() {

    const { id } = this.props.route.params;

   return (
     <View style={styles.MainContainer}>
       <TextInput
             placeholder="Inserir nome"
       >{id}</TextInput>
       <TextInput
             placeholder="Inserir nome"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ nome: text })} }
       />
       <TextInput
             placeholder="Inserir city"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ city: text })} }
       />
       <TextInput
             placeholder="Inserir phone"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ phone: text })} }
       />
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Atualizar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteRegisto} activeOpacity={0.7} style={styles.button} >
           <Text style={styles.TextStyle}> Apagar </Text>
         </TouchableOpacity>
     </View>
   );
 }
 }


 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1,
   },
   button: {
       height: 40,
       padding: 10,
       backgroundColor: '#4CAF50',
       borderRadius:7,
       margin: 12
   },
   TextInputStyle:
   {
       borderWidth: 1,
       margin: 10,
       borderColor: '#009688',
       height: 40,
       borderRadius: 10,
       marginBottom: 10,
       textAlign: 'center',
   },
 });

 export default ApgAtz;
