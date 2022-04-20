import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.95,
    height: height / 3.5,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingBottom: 2,
  },
  interactionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    height: 30,
  },
  image: {height: height * 0.18, backgroundColor: 'red', width: width * 0.3},
  msj: {width: 215},
  msjContainer: {flex: 1},
  userName: {color: 'blue', fontWeight: 'bold', marginStart: 5},
  sharingDate: {fontStyle: 'italic'},
  bookName: {fontWeight: '700'},
  writer: {fontWeight: '500', fontStyle: 'italic'},
  icons: {paddingRight: 10},
});
