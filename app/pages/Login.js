import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { styles } from '../stylesheet/global';
import { LocalizationContext } from '../services/localization/LocalizationContext';
import { TextInput, Button } from '../components';
import { loginOrRegister } from '../services/firebase';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function Login({ navigation }) {
  const { translations } = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({ window, screen });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = ({ window: nW, screen: nSC }) => {
    setDimensions({ window: nW, screen: nSC });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return Dimensions.removeEventListener('change', onChange);
  }, []);

  const proceed = async () => {
    setLoading(true);
    try {
      if (!email.length || !password.length) {
        throw new Error(translations.EMAILANDPASSWORDERROR);
      }
      const status = await loginOrRegister(email, password);
      if (status.error) {
        throw new Error(status.message);
      }
      navigation.replace('Home', { user: status.user });
    } catch ({ message }) {
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={dimensions.window.height > dimensions.window.width ? styles.fullP : styles.fullL}>
      <View style={styles.half1}>
        <Text style={{ fontSize: 34, textAlign: 'center' }}>{translations.WELCOME}</Text>
      </View>
      <View style={[styles.half2, { margin: 20 }, styles.center]}>
        <Text style={[styles.textstyle, { marginBottom: 40 }]}>{translations.LOGIN}</Text>
        <TextInput value={email} onChange={(text) => setEmail(text)} title={translations.EMAIL} />
        <TextInput secure value={password} onChange={(text) => setPassword(text)} title={translations.PASSWORD} />
        <Button loading={loading} title={translations.PROCEED} onPress={proceed} />
      </View>
    </View>
  );
}

export default Login;
