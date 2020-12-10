import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../stylesheet/global';
import { LocalizationContext } from '../services/localization/LocalizationContext';
import { singOut } from '../services/firebase';
import { Button } from '../components';

function Home({
  navigation,
  route: {
    params: { user }
  }
}) {
  const { translations } = useContext(LocalizationContext);

  const handleSignOut = async () => {
    await singOut();
    navigation.replace('Login');
  };

  return (
    <>
      <View style={{ backgroundColor: '#e8f1f5', paddingTop: '50%', justifyContent: 'center', paddingBottom: '100%' }}>
        <Text style={styles.textstyle}>{translations.DAY(user.email)}</Text>
        <View style={[styles.Buttons, styles.center]}>
          <Button title={translations.NOTESB} onPress={() => navigation.navigate('Notes_list')} />
          <Button title={translations.MAPB} onPress={() => navigation.navigate('Map', { user })} />
          <Button type="red" title={translations.LOGOUTB} onPress={handleSignOut} />
        </View>
      </View>
    </>
  );
}
export default Home;
