import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  input: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
});
