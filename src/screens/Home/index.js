import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import {Base_Url, Image_Url} from '../../helpers/apiAccessToken';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.Text}>Loading...</Text>
  </View>
)

const tabs = ['Home', 'Animation', 'Family', 'Comedy', 'Fantasy'];

export default function Home({navigation}) {
    const [selectedTab, setselectedTab] = useState(tabs[0]);
    const [movies, setMovies] = useState([]);

    const getListMovie = async () => {
        try {
          const results = await axios.get(`${Base_Url}`);
          console.log(results);
          setMovies(results.data.results);
        } catch (error) {
          return <Text>Data Tidak Ada</Text>;
        }
    };
    useEffect(() => {getListMovie()}, []);

    if (movies.length === 0){
      return <Loading/>;
    }
    const poster = ({item}) => {
        return (
          <View style={{  
            marginLeft: moderateScale(16),
            height: moderateScale(150),
            width: moderateScale(100),
          }}>
            <TouchableOpacity onPress={()=>{navigation.navigate('List Movie Details', {item})}}>
            <Image
              source={{uri: `${Image_Url}${item.poster_path}`}}
              style={{
                height: moderateScale(150),
                borderRadius: moderateScale(14),
                resizeMode: 'contain',
              }}
            />
            </TouchableOpacity>

          </View>
        );
    };

    const listMovie = ({item}) => {
      return (
        <View style={{  
          flexDirection: 'row',
          marginBottom: moderateScale(16),
          height: moderateScale(150),
          width: moderateScale(300),
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
          <View style={{ width: moderateScale(200)}}>
            <Text style={styles.Text} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.subText}>{item.release_date}</Text>
            <Text style={styles.subText}>{item.vote_average}</Text>
            <TouchableOpacity 
              onPress={()=>{navigation.navigate('List Movie Details', {item})}}
              style={{
                marginTop: moderateScale(16),
                alignItems: 'center',
                backgroundColor: '#10bed6', 
                paddingHorizontal: moderateScale(16),
                paddingVertical: moderateScale(5),
                width: moderateScale(120),
                borderRadius: moderateScale(8),
              }}>
              <Text style={[styles.subText, {color: 'white'}]}>Show More</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style= {{padding: moderateScale(16)}}>
            <FlatList
            data={tabs}
            keyExtractor={(item, index) => `${item}${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabs}
            bounces={false}
            renderItem={({item: tab}) => {
                return(
                    <TouchableOpacity onPress={()=>{setselectedTab(tab)}}>
                        <View style={[styles.bottonTab, {backgroundColor: selectedTab === tab ? '#032541': 'transparent',}]} >
                            <Text style={[styles.subText,{color: selectedTab === tab ? '#FFFFFF': '#000000'}]}>
                            {tab}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                )
            }}
        />
        </View>
        <View >
          <Text style={[styles.Text, {marginLeft: moderateScale(16), marginBottom: moderateScale(10)}]}>Recommended</Text>
          <FlatList
          data={movies}
          keyExtractor={(item, index) => index}
          renderItem={poster}
          contentContainerStyle={{alignItems: 'center'}}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate= 'fast'
          />
        </View>
        <Text style={[styles.Text, {marginLeft: moderateScale(16), marginVertical: moderateScale(16)}]}>Latest Upload</Text>        
        <View >
          <FlatList
          data={movies}
          keyExtractor={(item, index) => index}
          renderItem={listMovie}
          showsVerticalScrollIndicator={false}
          decelerationRate= 'fast'
          style={{marginHorizontal: moderateScale(16),}}
          />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabs: {
      borderRadius: moderateScale(20),
      borderWidth: moderateScale(3),
      backgroundColor: '#FFFFFF',
      flexGrow: 0,
    },
    bottonTab: {
      paddingHorizontal: moderateScale(30),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(15),
    },
    Text:{
      fontWeight: '500',
      fontSize: moderateScale(18),
      color: '#000000',
    },
    subText:{
      fontWeight: '400',
      fontSize: moderateScale(14),
      color: '#000000',
    }
})