import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, TouchableWithoutFeedback, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm;

class ListUpdate extends Component{

  constructor(props) {
    super(props);
    realm = new Realm({ path: 'persons.realm' });
    var persons = realm.objects('person');
    this.state = {
      FlatListItems: persons,
    };
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    this.setState({FlatListItems: realm.objects('person')});
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
  };

  actionOnRow(item) {
     this.props.navigation.navigate('ApgAtz', {id: item.id});
  }

  render()
    {
       return(
          <View style = { styles.MainContainer }>
          <FlatList
               data={this.state.FlatListItems}
               ItemSeparatorComponent={this.ListViewItemSeparator}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                 <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                 <View style={{
                   flex: 1,
                   flexDirection: 'row',
                   //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
                   backgroundColor: 'lightblue'
                   }}>
                   <Image
                     source={{uri: 'https://www.theoriginaltour.com/sites/default/files/inline-images/big-ben-bong-bong.jpg'}}
                     style={{width: 100, height: 100, margin: 5}}
                     >
                   </Image>
                   <View style={{flex: 1, flexDirection: 'column'}}>
                      <Text>Id: {item.id}</Text>
                       <Text>Name: {item.name}</Text>
                       <Text>City: {item.city}</Text>
                       <Text>Phone: {item.phone}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
       )}
     />
          </View>
       );
    }
}



const styles = StyleSheet.create({
  MainContainer :{
     flex:1,
     justifyContent: 'center',
     paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     margin: 10
  },
  TextInputStyle:
   {
     borderWidth: 1,
     borderColor: '#009688',
     width: '100%',
     height: 40,
     borderRadius: 10,
     marginBottom: 10,
     textAlign: 'center',
   },
   button: {
     width: '100%',
     height: 40,
     padding: 10,
     backgroundColor: '#4CAF50',
     borderRadius:7,
     marginTop: 12
   },
   TextStyle:{
     color:'#fff',
     textAlign:'center',
   },
   textViewContainer: {
     textAlignVertical:'center',
     padding:10,
     fontSize: 20,
     color: '#000',
    }
 });

 export default ListUpdate;
