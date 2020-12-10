import React from 'react';
import { View, Text, TextInput as RnInput } from 'react-native';
import { styles } from '../stylesheet/global';

const TextInput = ({ title, onChange, secure, defaultValue, placeholder }) => {
  return (
    <View style={{ width: '100%' }}>
      {title && <Text style={styles.textinputtitle}>{title}</Text>}
      <RnInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChange ? (text) => onChange(text) : () => null}
        style={styles.textinput}
      />
    </View>
  );
};

export { TextInput };
