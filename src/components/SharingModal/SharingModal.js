import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../Button';
import styles from './SharingModal.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SharingModal({
  visible,
  onClose,
  onSend,
  buttonTitle,
  placeHolder,
  placeHolder2,
  placeHolder3,
  placeHolder4,
}) {
  const [image, setImage] = useState();
  const [bookName, setBookName] = useState();
  const [writer, setWriter] = useState();
  const [msj, setMsj] = useState();

  useEffect(() => {
    setImage(null);
    setBookName(null);
    setWriter(null);
    setMsj(null);
  }, [onSend]);
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainer2}>
            <Text style={styles.header}>Görsel Linki :</Text>
            <TextInput
              placeholder={placeHolder4}
              onChangeText={setImage}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.header}>Kitap Adı :</Text>
            <TextInput
              placeholder={placeHolder}
              onChangeText={setBookName}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.header}>Yazar:</Text>
            <TextInput
              placeholder={placeHolder2}
              onChangeText={setWriter}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.header}>Mesaj :</Text>
            <TextInput
              placeholder={placeHolder3}
              multiline
              onChangeText={setMsj}
              autoCorrect={false}
              style={styles.input2}
            />
          </View>
        </View>
        <Button
          title={buttonTitle}
          onPress={() => onSend(image, bookName, writer, msj)}
        />
      </View>
    </Modal>
  );
}
