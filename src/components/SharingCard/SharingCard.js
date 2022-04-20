import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './SharingCard.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function SharingCard({item, navigation, onFav, onLike}) {
  const [favColor, setFavColor] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const formattedDate = formatDistance(parseISO(item.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  const handleOnFav = () => {
    const userName = auth().currentUser.email.split('@')[0];
    let favChange = false;
    database()
      .ref(`User/${userName}/Fav/`)
      .once('value')
      .then(snapshot => {
        const contentData = snapshot.val();
        if (contentData) {
          Object.keys(contentData).map(function (key) {
            if (contentData[key].bookName == item.bookName) {
              favChange = true;
              return;
            }
          });
        }

        if (favChange) {
          setFavColor(true);
          return;
        }
        setFavColor(false);
        return;
      });
  };

  const handleOnLike = () => {
    const userName = auth().currentUser.email.split('@')[0];
    let likeChange = false;
    database()
      .ref(`User/${userName}/Like/`)
      .once('value')
      .then(snapshot => {
        const contentData = snapshot.val();
        if (contentData) {
          Object.keys(contentData).map(function (key) {
            if (contentData[key].bookName == item.bookName) {
              likeChange = true;
              return;
            }
          });
        }

        if (likeChange) {
          setLikeColor(true);
          return;
        }
        setLikeColor(false);
        return;
      });
  };

  useEffect(() => {
    handleOnFav();
    handleOnLike();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Icon name="account-circle" color="black" size={35} />
          <Text
            onPress={() => navigation.navigate('ProfilePage', item.name)}
            style={styles.userName}>
            {item.name}
          </Text>
        </View>
        <Text style={styles.sharingDate}>{formattedDate}</Text>
      </View>
      <View style={styles.messageContainer}>
        <View>
          <Text style={styles.bookName}>{item.bookName}</Text>
          <Text style={styles.writer}>{item.writer}</Text>
          <View style={styles.msjContainer}>
            <Text style={styles.msj}>{item.msj}</Text>
          </View>
        </View>
        <Image
          style={styles.image}
          source={{uri: item.image}}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.interactionButtons}>
        <TouchableOpacity onPress={() => onFav()}>
          <Fontisto
            style={styles.icons}
            name="favorite"
            color={favColor ? 'red' : 'lightgrey'}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onLike()}>
          <MaterialIcons
            style={styles.icons}
            name="favorite"
            color={likeColor ? 'red' : 'lightgrey'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
