import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import Realm from 'realm';



let realm;

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      city: '',
      phone: '',
      desc: ''
    };

    realm = new Realm({
      path: 'personsNEW.realm',
      schema: [
        {
          name: 'personNEW',
          properties: {
            id: { type: 'int', default: 0 },
            name: 'string',
            city: 'string',
            phone: 'string',
            desc: 'string'
          }
        }
      ]
    });
  }

    
 /*
    show_count = () => {
    const ID = realm.objects('person').length;
    Alert.alert(`count: ${ID}`);
  };
*/
    
  addNewNote = () => {
    realm.write(() => {
      const ID = realm.objects('personNEW').length + 1;
      realm.create('personNEW', {
        id: ID,
        name: this.state.name,
        city: this.state.city,
        phone: this.state.phone,
        desc: this.state.desc
      });
    });
    Alert.alert('Successfully added!');
  };

  GoToList = () => {
    this.props.navigation.navigate('Notes_list');
  };



  render() {
    return (
      <>
        <View style={{ backgroundColor: '#e8f1f5', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20 }}>
          <Text style={{fontSize: 19, textAlign: 'center' }}>This is your Notes page.</Text>
          <Text style={{ fontSize: 19, textAlign: 'center', marginBottom: 20 }}>
            Write here any thoughts you have.
          </Text>
        </View>
        <View style={styles.MainContainer}>
          <TextInput
            placeholder="Name"
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          />
          <TextInput
            placeholder="City"
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.setState({ city: text });
            }}
          />
          <TextInput
            placeholder="Phone number"
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.setState({ phone: text });
            }}
          />
          <TextInput
            placeholder="Description"
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.setState({ desc: text });
            }}
          />
          <View style={styles.Buttons}>
            <TouchableOpacity onPress={this.addNewNote} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.TextStyle}> Add new note </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.GoToList} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.TextStyle}> Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#e8f1f5'
  },
  button: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    margin: 5,
    width: '30%',
    marginTop: 30
  },
  TextInputStyle: {
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderColor: '#009688',
    height: 40,
    width: 280,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TextStyle: {
    textAlign: 'center',
    color:'#fff',
    fontWeight: 'bold'
  }
});

export default Notes;
