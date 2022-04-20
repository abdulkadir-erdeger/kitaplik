import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import styles from './SignIn.styles';
import Loading from '../../animations/Loading';
import * as yup from 'yup';

import auth from '@react-native-firebase/auth';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function SignIn({navigation}) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
    repassword: '',
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen geçerli bir e-posta girin')
      .required('E-posta gereklidir.'),
    password: yup
      .string()
      .min(6, ({min}) => `Parola en az ${min} karakter olmalıdır.`)
      .required('Parola gereklidir.'),
    repassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Parolalar uyuşmuyor')
      .required('Parola onayı gereklidir.'),
  });

  const handleLoginPage = () => {
    navigation.goBack();
  };

  const handleSignIn = async ({email, password, repassword}) => {
    if (password !== repassword) {
      console.log('Şifreler uyuşmuyor');
    } else {
      if (!email && !repassword) {
        console.log('Bilgiler boş bırakılamaz!');
      } else {
        setLoading(true);
        try {
          await auth().createUserWithEmailAndPassword(email, repassword);
          navigation.navigate('LoginPage');
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitaplık</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={signInValidationSchema}>
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
            <Input
              placeHolder="şifrenizi tekrar giriniz.."
              value={values.repassword}
              onChange={handleChange('repassword')}
              isSecure={true}
            />
            {errors.repassword && (
              <Text style={{fontSize: 15, color: 'red'}}>
                {errors.repassword}
              </Text>
            )}
            <Button title="Kayıt Ol" onPress={handleSubmit} />
            <Button title="Geri" theme="secondary" onPress={handleLoginPage} />
          </View>
        )}
      </Formik>
    </View>
  );
}
