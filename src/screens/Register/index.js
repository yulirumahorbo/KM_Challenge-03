import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import {moderateScale} from 'react-native-size-matters';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import axios from 'axios';
import {BASE_URL} from '../../helpers/apiAccessToken';
// import logoTM from '../../assets/image/logoTM.png';

let regexPass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
let regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const postRegister = async () => {
    try {
      const body = {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstname,
          lastname: lastname,
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: phone,
      };
      
      const resultRegexPass = regexPass.test(password);
      const resultRegexEmail = regexEmail.test(email);
      if (resultRegexPass === true) {
        if (resultRegexEmail === true) {
          const results = await axios.post(`${BASE_URL}/users`, body);
          console.log(results)
          if (results.status === 201 || results.status === 200) {
                navigation.navigate('Login');
          }
        } else if (resultRegexEmail === false) {
          Alert.alert('Gagal', 'Format Email Tidak Sesuai');
        }
      } else if (resultRegexPass === false) {
        Alert.alert('Gagal', 'Format Password Tidak Sesuai');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hi! Nice To See You</Text>
        <Text style={styles.titleDesc}>Register Your Account Below</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={text => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={text => {
              setFirstname(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={text => {
              setLastName(text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone"
            keyboardType="phone-pad"
            onChangeText={text => {
              setPhone(text);
            }}
          />
          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={postRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    backgroundColor:'#032541', 
    alignItems: 'center', 
    paddingTop: moderateScale(30),
    marginBottom: moderateScale(25),
  },
  title: {
    marginBottom: moderateScale(8),
    fontSize: moderateScale(20),
    color: 'white',
    fontWeight: '700',
  },
  titleDesc: {
    marginBottom: moderateScale(16),
    fontSize: moderateScale(16),
    color: '#1fbde7',
    fontWeight: '400',
  },
  inputContainer: {
    justifyContent: 'center',
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
    fontSize: moderateScale(14),
    color: 'white',
    fontWeight: '700',
  },
});