import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height / 2.4,
  },
  inputContainer: {flex: 1, alignItems: 'center'},
  inputContainer2: {flex: 1, flexDirection: 'row'},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  input: {height: 35, borderWidth: 0.5, flex: 1, borderRadius: 6},
  input2: {borderWidth: 0.5, flex: 1, borderRadius: 6},
  header: {fontSize: 15, width: 75},
  image: {
    width: 80,
    height: 80,
    borderWidth: 0.5,
    borderRadius: 36,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
