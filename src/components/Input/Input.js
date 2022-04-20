import {TextInput, View} from 'react-native';
import React from 'react';
import styles from './Input.styles';

export default function Input({placeHolder, onChange, value, isSecure}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="white"
        value={value}
        onChangeText={onChange}
        secureTextEntry={isSecure}
        autoCapitalize="none"
      />
    </View>
  );
}
