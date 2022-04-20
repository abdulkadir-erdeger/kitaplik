import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './Login.styles';
import Loading from '../../animations/Loading';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen geçerli bir e-posta girin')
      .required('E-posta gereklidir.'),
    password: yup
      .string()
      .min(6, ({min}) => `Parola en az  ${min} karakter olmalıdır.`)
      .required('Parola gereklidir.'),
  });

  const handleSignIn = async ({email, password}) => {
    if (!email && !password) {
      console.log('Bilgiler boş bırakılamaz!');
    } else {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('Giriş Başarılı!');
        navigation.navigate('ChatPage');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  const handleSignInPage = () => {
    navigation.navigate('SingInPage');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#715a52" barStyle="light-content" />
      <Text style={styles.title}>Kitaplık</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={loginValidationSchema}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <Input
              placeHolder="e-postanızı giriniz.."
              value={values.email}
              onChange={handleChange('email')}
            />
            {errors.email && (
              <Text style={{fontSize: 15, color: 'red'}}>{errors.email}</Text>
            )}
            <Input
              placeHolder="şifrenizi giriniz.."
              value={values.password}
              onChange={handleChange('password')}
              isSecure={true}
            />
            {errors.password && (
              <Text style={{fontSize: 15, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <Button title="Giriş Yap" onPress={handleSubmit} />
            <Button
              title="Kayıt Ol"
              theme="secondary"
              onPress={handleSignInPage}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
