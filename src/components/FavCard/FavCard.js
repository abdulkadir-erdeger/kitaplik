import {View, Text} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './FavCard.styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function FavCard({item}) {
  const handleOnFav = item => {
    const userName = auth().currentUser.email.split('@')[0];
    let favChange = false;
    let favKey;
    database()
      .ref(`User/${userName}/Fav/`)
      .once('value')
      .then(snapshot => {
        const contentData = snapshot.val();
        if (contentData) {
          Object.keys(contentData).map(function (key) {
            if (contentData[key].bookName == item.bookName) {
              favKey = key;
              favChange = true;
              return;
            }
          });
        }

        if (favChange) {
          database().ref(`User/${userName}/Fav/${favKey}`).remove();
          return;
        }

        const favObject = {
          bookName: item.bookName,
          writer: item.writer,
        };
        database().ref(`User/${userName}/Fav/`).push(favObject);
        return;
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.bookName}>{item.bookName}</Text>
        <Text style={styles.writer}>{item.writer}</Text>
      </View>
      <Fontisto
        style={styles.icon}
        name="favorite"
        color="red"
        size={30}
        onPress={() => handleOnFav(item)}
      />
    </View>
  );
}
