import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FloatButton.styles';

export default function FloatButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="plus" color="black" size={45} onPress={onPress} />
    </TouchableOpacity>
  );
}
