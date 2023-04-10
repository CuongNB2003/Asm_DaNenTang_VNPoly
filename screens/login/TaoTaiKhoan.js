import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { keys, url_api_user } from '../../data/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

const windownWidth = Dimensions.get('window').width;

const TaoTaiKhoan = (props) => {
  const [fullname, setfullname] = useState('')
  const [username, setusername] = useState('');
  const [matKhau, setmatKhau] = useState('');
  const [image, setimage] = useState('')
  const [anHienMK, setanHienMK] = useState(true);

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
                setimage("data:image/" + file_ext + ";base64," + res);
                console.log(image);
                // upload ảnh lên api thì dùng PUT có thể viết ở đây
            });


    }


}

  const ThemUser = () => {
    fetch(url_api_user, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: matKhau,
        fullname: fullname,
        image: image
      }),

    })
      .then(async (res) => {
        let url_check_login = url_api_user + "?username=" + username;
        if (res.status == 201) {
          fetch(url_check_login)
            .then((res) => { return res.json() })
            .then(async (res_login) => {
              if (res_login.length != 1) {
                alert('Tài khoản đã tồn tại')
                return
              } else {
                let objUser = res_login[0]
                try {
                  console.log(objUser);
                  alert('Tạo thành công')
                  await AsyncStorage.setItem(keys, JSON.stringify(objUser))
                  props.navigation.navigate('Main')
                } catch (error) {
                  console.log(error);
                }

              }
            })
            .catch((err) => {
              console.log(err);
            })
        }


      })
      .catch((ex) => {
        console.log(ex);
      });
  }


  return (
    <View style={{ height: '100%', width: '100%', }}>
      <Text style={styles.title}>Tạo tài khoản</Text>
      <Text style={styles.conntent}>Hãy tạo tài khoản để có trải{'\n'}nghiệm tốt nhất.</Text>
      <View style={{alignItems: 'center'}}>
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
      {/* tài khoản*/}
      <View style={styles.input}>
        <Image source={require('../../assets/user.png')}
          resizeMode='stretch'
          style={styles.iconInput} />
        <TextInput placeholder='tài khoản'
          style={styles.textInput}
          autoCapitalize={false}
          onChangeText={(txt) => { setusername(txt) }} />
      </View>
      <View style={styles.input}>
        <Image source={require('../../assets/user.png')}
          resizeMode='stretch'
          style={styles.iconInput} />
        <TextInput placeholder='họ và tên'
          style={styles.textInput}
          autoCapitalize={false}
          onChangeText={(txt) => { setfullname(txt) }} />
      </View>
      {/* mật khẩu*/}
      <View style={styles.input}>
        <Image source={require('../../assets/padlock.png')}
          resizeMode='stretch'
          style={styles.iconInput} />
        <TextInput placeholder='mật khẩu'
          style={styles.textInput}
          autoCapitalize={false}
          secureTextEntry={anHienMK ? true : false}
          onChangeText={(txt) => { setmatKhau(txt) }} />
        <TouchableOpacity
          style={styles.btnMat}
          onPress={() => setanHienMK(!anHienMK)}>
          <Image source={require('../../assets/mat_an.jpg')}
            resizeMode='stretch'
            style={styles.iconMat} />
        </TouchableOpacity>
      </View>
      {/* nhập lại mật khẩu*/}
      <View style={styles.input}>
        <Image source={require('../../assets/padlock.png')}
          resizeMode='stretch'
          style={styles.iconInput} />
        <TextInput placeholder='nhập lại mật khẩu'
          style={styles.textInput}
          autoCapitalize={false}
          secureTextEntry={anHienMK ? true : false} />
        <TouchableOpacity style={styles.btnMat}
          onPress={() => setanHienMK(!anHienMK)}>
          <Image source={require('../../assets/mat_an.jpg')}
            resizeMode='stretch'
            style={styles.iconMat} />
        </TouchableOpacity>
      </View>
      {/* tạo tài khoản*/}
      <TouchableOpacity style={styles.btnThem}
        onPress={ThemUser}>
        <Text style={styles.textBtn}>Tạo tài khoản</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaoTaiKhoan

const styles = StyleSheet.create({
  btnThem: {
    height: 50, width: windownWidth - 60, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#4D8D6E', marginLeft: 30, marginTop: 20, borderRadius: 100
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginLeft: 120, marginTop: 30
  },
  conntent: {
    fontSize: 18, marginBottom: 30, marginTop: 10, marginLeft: 30
  },
  input: {
    borderRadius: 10,
    width: windownWidth - 60,
    marginLeft: 30,
    height: 45,
    marginTop: 20,
    backgroundColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconInput: {
    width: 20, height: 20, marginLeft: 10
  },
  textBtn: { color: '#ffff', fontSize: 18, fontWeight: 'bold' },
  iconMat: { width: 40, height: 25, marginRight: 10 },
  btnMat: { height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
  textInput: { height: '100%', flex: 1, marginLeft: 10, fontSize: 18 },
  img_avt: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 0.5,
  },
  editBtn: {
    width: 20,
    height: 20,
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