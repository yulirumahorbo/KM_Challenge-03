import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import {Base_Url, Image_Url} from '../../helpers/apiAccessToken';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListMovieDetails({navigation, route}) {
  const {item} = route.params;
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const getActors = async () => {
    try {
      const results = await axios.get(`${Base_Url}/${item.id}`);
      console.log(results);
      setActors(results.data.credits.cast);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };

  const getGenres = async () => {
    try {
      const results = await axios.get(`${Base_Url}/${item.id}`);
      console.log(results);
      setGenres(results.data.genres);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };
  useEffect(() => {getActors()}, []);
  useEffect(() => {getGenres()}, []);
 
  const listActors = ({item}) => {
    return (
      <View style={{
        marginBottom: moderateScale(16),
        marginRight: moderateScale(16),
        height: moderateScale(180),
        width: moderateScale(100),
      }}>
        <Image
          source={{uri: `${Image_Url}${item.profile_path}`}}
          style={{
            width: moderateScale(100),
            height: moderateScale(150),
            resizeMode: 'contain',
            borderRadius: moderateScale(14),
            marginRight: moderateScale(16),
          }}
        />
      <Text style={styles.regularSubText}>{item.name}</Text>
      </View>
    );
  };

  const listGenres = ({item}) => {
    return (
      <Text style={[styles.regularSubText, {marginRight: moderateScale(16),}]}>{item.name}</Text>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
          <Image 
            source={{uri: `${Image_Url}${item.backdrop_path}`}}               
            style={{height: moderateScale(200), opacity: moderateScale(0.6)}}
          />
          <View style={styles.listMovie}>
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#032541',
              padding: moderateScale(16),
              height: moderateScale(182),
              width: moderateScale(323),
              borderRadius: moderateScale(14),
            }}>
              <Image
                source={{uri: `${Image_Url}${item.poster_path}`}}
                style={{
                  width: moderateScale(100),
                  height: moderateScale(150),
                  resizeMode: 'contain',
                  borderRadius: moderateScale(14),
                  marginRight: moderateScale(16),
                }}
              />
              <View style={{ width: moderateScale(192)}}>
                <Text style={styles.Text} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.subText}>{item.release_date}</Text>
                <Text style={styles.subText}>{item.vote_average}</Text>
                <Text style={styles.subText}>Genres</Text>
              </View>
            </View>            
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, marginHorizontal: moderateScale(16)}}>
            <View>
               <Text style={styles.regularText}>Genres</Text>
            <FlatList
            data={genres}
            keyExtractor={(item, index) => index}
            renderItem={listGenres}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
            </View>
            <Text style={styles.regularText}>Synopshis</Text>        
            <Text style={styles.regularSubText}>{item.overview}</Text>   
            
            <View>
            <Text style={styles.regularText}>Actors/Artist</Text> 
            <FlatList
            data={actors}
            keyExtractor={(item, index) => index}
            renderItem={listActors}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
            </View> 
          </ScrollView>

          <View style={styles.bottonBack}>
              <TouchableOpacity onPress={()=>{navigation.goBack()}} >
                  <Ionicons name='ios-arrow-back-circle' size={moderateScale(40)} color={'#333'}/>
              </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF'},
    listMovie: {
      backgroundColor: '#FFFFFF',
      marginTop: moderateScale(-100),
      marginHorizontal: moderateScale(16),
      height: moderateScale(198),
      padding: moderateScale(8),
      borderRadius: moderateScale(16),
    },
    bottonBack: {
        position: 'absolute',
        top: moderateScale(16), 
        right: moderateScale(16),
    },
    regularText:{
      fontWeight: '500',
      fontSize: moderateScale(18),
      color: '#000000',
      paddingBottom: moderateScale(10),
    },
    regularSubText:{
      fontWeight: '400',
      fontSize: moderateScale(14),
      color: '#000000',
      paddingBottom: moderateScale(10),
    },
    Text:{
      fontWeight: '500',
      fontSize: moderateScale(18),
      color: '#10bed6',
    },
    subText:{
      fontWeight: '400',
      fontSize: moderateScale(14),
      color: '#FFFFFF',
    }
})

// Genre, Actors, Artistnya belum
