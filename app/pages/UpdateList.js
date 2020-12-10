import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class UpdateList extends Component{

  constructor(props){
    super(props);
    this.state = {
      name : this.props.route.params.name,
      city : this.props.route.params.city,
      phone : this.props.route.params.phone,
      id: this.props.route.params.id,
    }
    realm = new Realm({ path: 'persons.realm' });
  }

  updateRegisto=()=>{
    var that = this;
    if (this.state.name) {
      if (this.state.city) {
        if (this.state.phone) {
          realm.write(() => {
            var obj = realm
              .objects('person')
              .filtered('id =' + this.state.id);
            if (obj.length > 0) {
              obj[0].name = this.state.name;
              obj[0].city = this.state.city;
              obj[0].phone = this.state.phone;
              Alert.alert(
                'Info',
                'Successfully updated',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      that.props.navigation.goBack(),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Update failed');
            }
          });
        } else {
          alert('Insert phone');
        }
      } else {
        alert('Insert city');
      }
    } else {
      alert('Insert name');
    }
  }

  deleteRegisto=()=>{
    Alert.alert(
      'Info',
      'Are you sure you want to remove this record?',
    [
      {text: 'No', onPress: () => console.log('Canceled'), style: 'cancel'},
      {text: 'Yes', onPress: () => {this.deleteUser();}},
    ]
    );
  }

  deleteUser = () => {
    realm.write(() => {
      //const { id } = this.props.route.params;
      let task = realm.objects('person').filtered('id = ' + this.state.id);
      realm.delete(task);
    });
    this.props.navigation.goBack();
  }

  searchUser = () => {
      var person = realm.objects('person').filtered('id ='+this.state.id);
      if (person.length > 0) {
        this.setState({
          name: person[0].name,
        });
        this.setState({
          city: person[0].city,
        });
        this.setState({
          phone: person[0].phone,
        });
      } else {
        alert('User does not exist');
        this.setState({
          name: '',
        });
        this.setState({
          city: '',
        });
        this.setState({
          phone: '',
        });
      }
    };

  render() {

   return (
     <View style={styles.MainContainer}>
       <TextInput>{this.state.id}</TextInput>
       <TouchableOpacity onPress={this.searchUser} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Obtain data </Text>
        </TouchableOpacity>
      <TextInput
             placeholder="Insert name"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.name}
             onChangeText = { ( text ) => { this.setState({ name: text })} }
       />
       <TextInput
             placeholder="Insert city"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.city}
             onChangeText = { ( text ) => { this.setState({ city: text })} }
       />
       <TextInput
             placeholder="Insert phone"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.phone}
             onChangeText = { ( text ) => { this.setState({ phone: text })} }
       />
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> UPDATE </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteRegisto} activeOpacity={0.7} style={styles.button} >
           <Text style={styles.TextStyle}> REMOVE </Text>
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

 export default UpdateList;
