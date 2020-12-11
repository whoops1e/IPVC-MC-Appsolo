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
      desc : this.props.route.params.desc,
      id: this.props.route.params.id,
    }
    realm = new Realm({ path: 'personsNEW.realm' });
  }

  updateRegisto=()=>{
    var that = this;
    if (this.state.name) {
      if (this.state.city) {
        if (this.state.phone) {
            if (this.state.desc) {
          realm.write(() => {
            var obj = realm
              .objects('personNEW')
              .filtered('id =' + this.state.id);
            if (obj.length > 0) {
              obj[0].name   =     this.state.name;
              obj[0].city   =     this.state.city;
              obj[0].phone  =     this.state.phone;
              obj[0].desc   =     this.state.desc;
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
            alert('Insert desciption');
            }
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
      {text: 'No', onPress:     () => console.log('Canceled'), style: 'cancel'},
      {text: 'Yes', onPress:    () => {this.deleteUser();}},
    ]
    );
  }

  deleteUser = () => {
    realm.write(() => {
      //const { id } = this.props.route.params;
      let task = realm.objects('personNEW').filtered('id = ' + this.state.id);
      realm.delete(task);
    });
    this.props.navigation.goBack();
  }

  searchUser = () => {
      var personNEW = realm.objects('personNEW').filtered('id ='+this.state.id);
      if (personNEW.length > 0) {
        this.setState({
          name: personNEW[0].name,
        });
        this.setState({
          city: personNEW[0].city,
        });
        this.setState({
          phone: personNEW[0].phone,
        });
        this.setState({
          desc: personNEW[0].desc,
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
        this.setState({
          desc: '',
        });
      }
    };

  render() {

   return (
     <View style={styles.MainContainer}>
      <Text style={{ paddingLeft: 10, paddingTop:20 }}>Name: </Text>
      <TextInput
             placeholder="Insert name"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.name}
             onChangeText = { ( text ) => { this.setState({ name: text })} }
       />
<Text style={{ paddingLeft: 10 }}>City: </Text>
       <TextInput
             placeholder="Insert city"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.city}
             onChangeText = { ( text ) => { this.setState({ city: text })} }
       />
<Text style={{ paddingLeft: 10 }}>Phone: </Text>
       <TextInput
             placeholder="Insert phone"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.phone}
             onChangeText = { ( text ) => { this.setState({ phone: text })} }
       />
<Text style={{ paddingLeft: 10 }}>Description: </Text>
       <TextInput
             placeholder="Insert description"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.desc}
             onChangeText = { ( text ) => { this.setState({ desc: text })} }
       />
<View style={styles.row}>
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.buttonStyle}> UPDATE </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteRegisto} activeOpacity={0.7} style={styles.buttonRed} >
           <Text style={styles.buttonStyleRed}> REMOVE </Text>
         </TouchableOpacity>
</View>
     </View>
   );
 }
 }

 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1
   },
   button: {
       height: 40,
       padding: 10,
       width: '40%',
       backgroundColor: '#4CAF50',
       borderRadius:2,
       margin: 5,
       position: 'relative',
   },
     row: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         margin: 1
     
 },
   buttonRed: {
       height: 40,
       padding: 10,
       position: 'relative',
       width: '40%',
       backgroundColor: 'red',
       borderRadius:2,
   },
   buttonStyle: {
       fontSize: 16,
       textAlign: 'center',
   },
   buttonStyleRed: {
       fontSize: 16,
       textAlign: 'center',
       backgroundColor: 'red',
   },
   TextInputStyle:
   {
       borderWidth: 1,
       margin: 10,
       borderColor: '#009688',
       height: 40,
       borderRadius: 5,
       marginBottom: 10,
       textAlign: 'center',
   },
 });

 export default UpdateList;
