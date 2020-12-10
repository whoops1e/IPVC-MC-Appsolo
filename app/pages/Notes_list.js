import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Button,
  TouchableWithoutFeedback,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  YellowBox,
  FlatList
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';

let realm;

class Notes_list extends Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'persons.realm' });
    const persons = realm.objects('person');
    this.state = {
      FlatListItems: persons
    };
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    this.setState({ FlatListItems: realm.objects('person') });
  };

  ListViewItemSeparator = () => {
    return <View style={{ height: 10, width: '100%', backgroundColor: 'white' }} />;
  };

  actionOnRow(item) {
    this.props.navigation.navigate('UpdateList', item);
  }

  GoToAdd = () => {
    this.props.navigation.navigate('Notes');
  };

  GoBackMenu = () => {
    this.props.navigation.navigate('Home');
  };


  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#e8f1f5'
                }}>
                <Image
                  source={{ uri: 'https://comap-portugal.com/wp-content/uploads/2020/05/vilnius.jpg' }}
                  style={{ width: 100, height: 100, margin: 5 }}
                />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text style={(styles.beautifulText, { fontSize: 17, fontWeight: 'bold' })}>
                    ID: {item.id}
                  </Text>
                  <Text style={styles.beautifulText}>Name: {item.name}</Text>
                  <Text>City: {item.city}</Text>
                  <Text>Phone: {item.phone}</Text>
                </View>
              </View>

            </TouchableWithoutFeedback>
          )}
        />
          <View style={styles.Buttons}>
            <TouchableOpacity onPress={this.GoToAdd} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.TextStyle}> Add new note </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.GoBackMenu} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.TextStyle}> Back to main menu </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    margin: 10
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: '#009688',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 12
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center'
  },
  beautifulText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textViewContainer: {
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 20,
    color: '#000'
  }
});

export default Notes_list;
