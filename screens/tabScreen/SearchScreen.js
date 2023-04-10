import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ItemListNew from '../../component/ItemListNew';
import { url_api_post } from '../../data/api';



const windownWidth = Dimensions.get('window').width;
const SearchScreen = () => {
  const [reloading, setreloading] = useState(false);
  const [dataPost, setdataPost] = useState([])

  const getListSP = async () => {

    try {
      const response = await fetch(url_api_post); // load dữ liệu
      const json = await response.json();// chuyển dữ liệu thành json
      setdataPost(json); // đổ dữ liệu vào state
    } catch (err) {
      console.log(err);
    } finally {
      // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào  lệnh;
      setreloading(false); // trạng thái ko còn load nữa 
    }
  }

  React.useEffect(() => {
    if (dataPost.length <= 0)
      getListSP()
  });
  return (
    <View>
      <View style={{
        borderRadius: 10, width: windownWidth - 20, marginLeft: 10, height: 45,
        marginTop: 20, backgroundColor: '#ffff', flexDirection: 'row', alignItems: 'center'
      }}>
        <TextInput placeholder='nhập từ khóa cần tìm'
          style={{ height: '100%', flex: 1, marginLeft: 20, fontSize: 18 }}
          autoCapitalize={false} />
        <TouchableOpacity style={{
          height: '100%', aspectRatio: 1,
          justifyContent: 'center', alignItems: 'center'
        }}>
          <Image source={require('../../assets/search.png')} resizeMode='stretch'
            style={{ width: 30, height: 30, marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataPost}
        renderItem={({ item }) => <ItemListNew dulieu={item} />}
        keyExtractor={item => item.id_post}
        refreshControl={
          <RefreshControl refreshing={reloading} onRefresh={getListSP} />
        } />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({

})