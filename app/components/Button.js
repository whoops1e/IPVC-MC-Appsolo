import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from '../stylesheet/global';

const Button = ({ title, onPress, loading, type }) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      activeOpacity={0.7}
      style={
        type && styles[`button_${type}`] ? { ...styles.button, ...styles[`button_${type}`] } : styles.button
      }>
      <Text style={[styles.TextStyle, loading && styles.buttonLoadingText]}>{title}</Text>
      {loading && (
        <View style={styles.buttonLoading}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export { Button };
