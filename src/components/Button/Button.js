import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import styles from './Button.styles';

export default function Button({title, theme = 'primary', onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].container}>
      <Text style={styles[theme].text}>{title}</Text>
    </TouchableOpacity>
  );
}
