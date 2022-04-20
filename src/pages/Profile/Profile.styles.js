import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: '#d1b7ad'},
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    width: width * 0.9,
  },
  userContainer: {flexDirection: 'row', alignItems: 'center'},
  input: {
    borderRadius: 6,
    borderWidth: 1,
    width: width * 0.9,
    height: 35,
    backgroundColor: 'white',
  },
  user: {fontSize: 20, color: 'blue', fontWeight: 'bold'},
  favNumberHeader: {fontSize: 18, fontWeight: '700'},
  favNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#715a52',
    width: 40,
    height: 40,
    textAlign: 'center',
    borderRadius: 30,
  },
  favContainer: {flexDirection: 'row', alignItems: 'center'},
});
