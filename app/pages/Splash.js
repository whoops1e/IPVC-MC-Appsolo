import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { onAuthState } from '../services/firebase';

let authTriggered = false;

function Splash({ navigation }) {
  const onAuthStateChanged = async (fbUser) => {
    if (!authTriggered) {
      authTriggered = true;
      if (fbUser) {
        const { email, uid } = fbUser;
        const token = await fbUser.getIdToken();
        navigation.replace('Home', { user: { email, uid, token } });
      } else {
        navigation.replace('Login');
      }
    }
  };

  useEffect(() => {
    const subscriber = onAuthState(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading</Text>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 20
  }
});

export default Splash;
