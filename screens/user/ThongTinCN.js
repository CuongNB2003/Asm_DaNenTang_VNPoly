import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { keys, url_api_user } from '../../data/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'


const ThongTinCN = ({ navigation, route }) => {
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)
  const [fullname, setfullname] = useState(null)
  const [image, setimage] = useState(null)
  const [id, setid] = useState(null)

  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh 
      quality: 1,
    });


    console.log(result);


    if (!result.canceled) {
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


      FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setimage('data:image/' + file_ext + ';base64,' + res)
          console.log(image);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
          updateUser()
        });


    }


  }

  const updateUser = () => {
    let user = {
      id: id,
      fullname: fullname,
      image: image,
      username: username,
      password: password
    }

    let url_api_update = url_api_user + '/' + id;
    fetch(url_api_update, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        if (res.status == 200)
          console.log(user);
        alert("Cập nhật thành công")
        await AsyncStorage.setItem(keys, JSON.stringify(user))
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params) {
        setid(route.params.id)
        setfullname(route.params.fullname)
        setimage(route.params.image)
        setusername(route.params.username)
        setpassword(route.params.password)
      }

    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container} >
      <View >
        <TouchableOpacity onPress={pickImage}>
          {
            image ? (
              <Image source={{ uri: image }} style={styles.img_avt} />
            ) : (
              <Image source={require('../../assets/user.png')} style={styles.img_avt} />
            )
          }
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.input}>
        <TextInput
          style={styles.text_Item}
          onChangeText={setfullname}
          defaultValue={fullname} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}>
        <Text style={styles.text_Item} >
          {route.params.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}>
        <Text style={styles.text_Item}>
          {route.params.password}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSua}
        onPress={updateUser}>
        <Text style={styles.text_Item}>
          Sửa thông tin</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ThongTinCN

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  text_Item: {
    margin: 10,
    fontSize: 18,
  },
  img_avt: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 80,
    borderWidth: 0.5,
  },
  input: {
    marginTop: 10,
    height: 48,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  btnSua: {
    alignItems: 'center',
    marginTop: 30,
    height: 48,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '40%',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    marginTop: -18,
    textAlign: 'center',
    right: 0,
    borderRadius: 50,
    padding: 6,
    color: 'white'
},

})