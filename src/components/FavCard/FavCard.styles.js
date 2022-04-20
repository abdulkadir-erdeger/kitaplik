import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    width: width * 0.9,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  innerContainer: {},
  icon: {paddingRight: 10},
  bookName: {fontWeight: '700', fontSize: 16},
  writer: {fontStyle: 'italic'},
});
