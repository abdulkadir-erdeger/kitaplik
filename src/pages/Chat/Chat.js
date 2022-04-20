import {View, Text, StatusBar, Alert, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FloatButton from '../../components/FloatButton';
import styles from './Chat.styles';
import SharingModal from '../../components/SharingModal';
import SharingCard from '../../components/SharingCard/';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loading from '../../animations/Loading';

export default function Chat({navigation}) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [SharingList, setSharingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favColor, setFavColor] = useState(false);
  const [likeColor, setLikeColor] = useState(false);

  const parseContentData = data => {
    return Object.keys(data)
      .map(key => {
        return {
          id: key,
          ...data[key],
        };
      })
      .sort((a, b) => {
        return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
      });
  };

  useEffect(() => {
    handleSharingList();
  }, [favColor, likeColor]);

  const handleSharingList = () => {
    setSharingList([]);
    setLoading(true);
    database()
      .ref(`Chat/Sharing/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});

        setSharingList(parsedData);
        setLoading(false);
      });
    return () => {
      setSharingList({});
    };
  };

  const handleModalToggle = () => {
    setModalVisible(!ModalVisible);
  };

  const createMessage = (image, bookName, writer, msj) => {
    setModalVisible(!ModalVisible);
    sendMessage(image, bookName, writer, msj);
  };

  const sendMessage = (image, bookName, writer, msj) => {
    const userName = auth().currentUser.email;

    const contentObject = {
      date: new Date().toISOString(),
      name: userName.split('@')[0],
      bookName: bookName,
      writer: writer,
      msj: msj,
      image: image,
    };

    if (!msj && !bookName && !writer) {
      Alert.alert('Uyarı', 'İçerik Boş Olamaz');
    } else {
      database().ref(`Chat/Sharing/`).push(contentObject);
    }
  };

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
    setFavColor(!favColor);
  };

  const handleOnLike = item => {
    const userName = auth().currentUser.email.split('@')[0];
    let likeChange = false;
    let likeKey;
    database()
      .ref(`User/${userName}/Like/`)
      .once('value')
      .then(snapshot => {
        const contentData = snapshot.val();
        if (contentData) {
          Object.keys(contentData).map(function (key) {
            if (contentData[key].bookName == item.bookName) {
              likeKey = key;
              likeChange = true;
              return;
            }
          });
        }

        if (likeChange) {
          database().ref(`User/${userName}/Like/${likeKey}`).remove();
          return;
        }

        const likeObject = {
          bookName: item.bookName,
          writer: item.writer,
        };
        database().ref(`User/${userName}/Like/`).push(likeObject);

        return;
      });
    setLikeColor(!likeColor);
  };

  const handleSharingCard = ({item}) => {
    return (
      <SharingCard
        item={item}
        navigation={navigation}
        onFav={() => handleOnFav(item)}
        onLike={() => handleOnLike(item)}
      />
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#715a52" barStyle="light-content" />
      <Text>Sharing</Text>
      <SharingModal
        visible={ModalVisible}
        onClose={() => setModalVisible(!ModalVisible)}
        onSend={createMessage}
        buttonTitle="Gönder"
        placeHolder="Kitap Adı.."
        placeHolder2="Yazar Adı.."
        placeHolder3="Kitap Hakkında.."
        placeHolder4="Görsel linki.."
      />
      <FlatList data={SharingList} renderItem={handleSharingCard} />
      <FloatButton onPress={handleModalToggle} />
    </View>
  );
}
