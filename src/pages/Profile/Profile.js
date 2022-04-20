import {View, Text, FlatList, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Profile.styles';
import FavCard from '../../components/FavCard';
import Loading from '../../animations/Loading';

export default function Profile({route, navigation}) {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const userName = route.params;

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
    setFavList([]);
    setLoading(true);
    database()
      .ref(`User/${userName}/Fav/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});

        setFavList(parsedData);
        setFilterData(parsedData);
        setLoading(false);
      });
    return () => {
      setFavList({});
    };
  }, []);

  const handleFavCard = ({item}) => {
    return <FavCard item={item} />;
  };

  const searchFilter = text => {
    if (text) {
      const newData = favList.filter(item => {
        const itemData = item.bookName
          ? item.bookName.toUpperCase()
          : ''.toUpperCase();
        const texData = text.toUpperCase();
        return itemData.indexOf(texData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
      return;
    }
    setFilterData(favList);
    setSearch(text);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          <Icon name="account-circle" color="black" size={60} />
          <Text style={styles.user}> {userName}</Text>
        </View>
        <View style={styles.favContainer}>
          <Text style={styles.favNumberHeader}>Favori Kitap Sayısı </Text>
          <Text style={styles.favNumber}>{favList.length}</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ara"
        onChangeText={searchFilter}
        value={search}
      />
      <FlatList data={filterData} renderItem={handleFavCard} />
    </View>
  );
}
