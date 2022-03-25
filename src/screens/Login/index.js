import {Alert, StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';

import {moderateScale} from 'react-native-size-matters';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import {BASE_URL} from '../../helpers/apiAccessToken';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const postLogin = async () => {
    try {
      const body = {
        username: username,
        password: password,
      };

      const results = await axios.post(`${BASE_URL}/auth/login`, body);
      console.log(results);

      if (results.status === 201 || results.status === 200)
        navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal', 'Username dan Password Tidak Ada');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:'#032541', alignItems: 'center', paddingTop: moderateScale(30),marginBottom: moderateScale(25)}}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.titleDesc}>Hey! You've been missed</Text>
      </View>

      <View >
        <TextInput
          style={styles.textInput}
          placeholder="Enter Username"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password Here"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={postLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        
        <View
          style={{
            alignItems: 'center',
            marginTop: moderateScale(48),
          }}>
          <Text style={styles.otherLogin}>Or, Continue With</Text>
        </View>
        <View
          style={{
            flexGrow: 0,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: moderateScale(20),
          }}>
          <TouchableOpacity style={styles.otherLoginButton}>
            <FontAwesome size={40} color="#10bed6" name="google" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherLoginButton}>
            <FontAwesome size={40} color="#10bed6" name="facebook" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherLoginButton}>
            <FontAwesome size={40} color="#10bed6" name="instagram" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: moderateScale(60),
          }}>
          <TouchableOpacity
            style={styles.register}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText1}>
              Not a Member?{' '}
              <Text style={styles.registerText}>Register Here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginBottom: moderateScale(8),
    fontSize: moderateScale(20),
    color: 'white',
    fontWeight: '700',
  },
  titleDesc: {
    marginBottom: moderateScale(20),
    fontSize: moderateScale(16),
    color: '#1fbde7',
    fontWeight: '400',
  },
  textInput: {
    marginBottom: moderateScale(16),
    backgroundColor: '#FFFFFF',
    color: 'black',
    marginHorizontal: moderateScale(16),
    fontSize: moderateScale(14),
    paddingStart: moderateScale(16),
    borderWidth: 3,
    borderRadius: moderateScale(10),
  },
  button: {
    backgroundColor: '#1fbde7',
    paddingHorizontal:  moderateScale(142),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(30),
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: 'white',
    fontWeight: '700',
  },
  otherLogin: {
    fontSize: moderateScale(15),
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: moderateScale(16),
  },
  otherLoginButton: {
    backgroundColor: '#032541',
    width: moderateScale(70),
    height: moderateScale(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  register: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  registerText: {
    color: '#779ECB',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  registerText1: {
    color: 'black',
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
});