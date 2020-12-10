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
import { useNavigation } from '@react-navigation/native';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class Inserir extends Component{

  constructor(){

    super();

    this.state = {
      nome : '',
      city : '',
      phone : '',
    }

    realm = new Realm({
      path: 'persons.realm',
      schema: [{
        name: 'person',
          properties:
          {
            id: {type: 'int',   default: 0},
            nome: 'string',
            city: 'string',
            phone: 'string',
          }}]
      });

  }

  show_count=()=>{
    var ID = realm.objects('person').length;
    Alert.alert("contagem: " + ID);
  }

  addRegisto=()=>{
    realm.write(() => {
      var ID = realm.objects('person').length + 1;
       realm.create('person', {
         id: ID,
         nome: this.state.nome,
         city: this.state.city,
         phone: this.state.phone,
        });
    });
    Alert.alert("Registo inserido com sucesso.")
  }

  GoToListagem = () =>
    {
       this.props.navigation.navigate('Listagem');
    }

  render() {
   return (
     <View style={styles.MainContainer}>
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
       <TouchableOpacity onPress={this.addRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Adicionar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.show_count} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> CONTAGEM </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.GoToListagem} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> LISTAGEM </Text>
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



 export default Inserir;
