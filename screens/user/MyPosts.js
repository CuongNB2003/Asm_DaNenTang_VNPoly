import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { keys, url_api_post } from '../../data/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemTinTuc from '../../component/ItemTinTuc';

const MyPosts = (props) => {
  const [loginInfo, setloginInfo] = useState({});
  const [dataUser, setdataUser] = useState([])
  const [reloading, setreloading] = useState(false);

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem(keys);
      if (value !== null) {

        setloginInfo(JSON.parse(value))

        fetch(url_api_post + '?tb_usersId=' + loginInfo.id)
          .then(async (res) => {
            const posts = await res.json()
            posts.reverse()
            setdataUser(posts)
          })
          .catch(err => {
            console.log(err);
          })
      }
    } catch (e) {
      console.log(e);
    } finally {
      setreloading(false);
    }
  }

  React.useEffect(() => {
    if (dataUser.length <= 0)
      getLoginInfo()
  });

  return (
    <View style={styles.container}>


    <FlatList
    data={dataUser}
    renderItem={({ item, index }) =>
        <ItemTinTuc key={index} title={item.title} content={item.content} image={item.image} author={item.tb_usersId} />
    }
    keyExtractor={(item, index) => index.toString()}
    refreshControl={
        <RefreshControl refreshing={reloading}
            onRefresh={() => {
                setreloading(true)
            }} />
    } />

    </View>
  )
}

export default MyPosts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})