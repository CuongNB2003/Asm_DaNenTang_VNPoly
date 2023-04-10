import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { keys, url_api_user } from '../../data/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'


const DoiMatKhau = ({ navigation, route }) => {
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState('')
  const [fullname, setfullname] = useState(null)
  const [image, setimage] = useState(null)
  const [id, setid] = useState(null)

  const [passNew, setpassNew] = useState('')
  const [passNew2, setpassNew2] = useState('')
  const [anHienMK, setanHienMK] = useState(true);

  const updateUser = () => {
    let user = {
      id: id,
      fullname: fullname,
      image: image,
      username: username,
      password: passNew2,
    }
    if (password.length == 0 || passNew.length == 0 || passNew2.length == 0) {
      alert("Không đc bỏ trống")
      return;
    }
    console.log(id)
    if (route.params.password != password) {
      alert("Mật khẩu cũ sai")
      return;
    }
    if (passNew != passNew2) {
      alert("Mật khẩu mới nhập chưa khớp")
      return;
    }

    let url_api_update = url_api_user + '/'+id;
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
          console.log(passNew2);
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
        <TouchableOpacity >
          {
            image ? (
              <Image source={{ uri: image }} style={styles.img_avt} />
            ) : (
              <Image source={require('../../assets/user.png')} style={styles.img_avt} />
            )
          }
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <Image source={require('../../assets/padlock.png')} resizeMode='stretch'
          style={{ width: 20, height: 20, marginLeft: 10 }} />

        <TextInput placeholder='Nhập mật khẩu cũ'
          style={{ height: '100%', flex: 1, marginLeft: 10, fontSize: 18 }}
          autoCapitalize={false}
          secureTextEntry={anHienMK ? true : false}
          onChangeText={setpassword} />

        <TouchableOpacity style={{ height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setanHienMK(!anHienMK)}>
          <Image source={require('../../assets/mat_an.jpg')} resizeMode='stretch'
            style={{ width: 40, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <Image source={require('../../assets/padlock.png')} resizeMode='stretch'
          style={{ width: 20, height: 20, marginLeft: 10 }} />

        <TextInput placeholder='Nhập mật khẩu mới'
          style={{ height: '100%', flex: 1, marginLeft: 10, fontSize: 18 }}
          autoCapitalize={false}
          secureTextEntry={anHienMK ? true : false}
          onChangeText={setpassNew} />

        <TouchableOpacity style={{ height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setanHienMK(!anHienMK)}>
          <Image source={require('../../assets/mat_an.jpg')} resizeMode='stretch'
            style={{ width: 40, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
      </View>
      {/* nhập lại mật khẩu*/}
      <View  style={styles.input}>
        <Image source={require('../../assets/padlock.png')} resizeMode='stretch'
          style={{ width: 20, height: 20, marginLeft: 10 }} />

        <TextInput placeholder='nhập lại mật khẩu mới'
          style={{ height: '100%', flex: 1, marginLeft: 10, fontSize: 18 }}
          autoCapitalize={false}
          secureTextEntry={anHienMK ? true : false}
          onChangeText={setpassNew2} />

        <TouchableOpacity style={{ height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setanHienMK(!anHienMK)}>
          <Image source={require('../../assets/mat_an.jpg')} resizeMode='stretch'
            style={{ width: 40, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnSua}
        onPress={updateUser}>
        <Text style={styles.text_Item}>
          Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DoiMatKhau

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
  input: { 
    borderRadius: 10, 
    width: '80%', 
    height: 48, 
    marginTop: 20, 
    backgroundColor: '#ffff', 
    flexDirection: 'row', 
    alignItems: 'center' 
},


})