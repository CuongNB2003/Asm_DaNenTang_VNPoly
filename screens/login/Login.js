import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys, url_api_user } from '../../data/api';



const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;

const TopComponent = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <StatusBar barStyle={'light-content'} />
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{
          width: '100%', flex: 1, backgroundColor: '#4D8D6E', justifyContent: 'center', alignItems: 'center'
        }}>
          <Text style={{ fontSize: 50, fontWeight: '600', color: '#ffff' }}>
            VN Poly.</Text>
          <Text style={{ color: '#ffffffff', }}>wecome vn poly </Text>
        </View>
      </View>
    </View>
  );
}

const BottomComponent = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', height: 40, width: windownWidth - 60, marginLeft: 30
      }}>
        <View style={{ height: 1, width: '30%', backgroundColor: '#707070', marginRight: 5 }}></View>
        <Text>hoặc đăng nhập với </Text>
        <View style={{ height: 1, width: '30%', backgroundColor: '#707070', marginLeft: 5 }}></View>
      </View>

      <TouchableOpacity>
        <View style={{ height: 50, width: windownWidth - 60, marginTop: 20, borderWidth: 1, marginLeft: 30, borderRadius: 10, backgroundColor: 'while', flexDirection: 'row' }}>
          <Image source={require('../../assets/google.png')} style={{ width: 40, height: 40, marginTop: 4, marginLeft: 60 }} />
          <Text style={{ fontSize: 18, marginLeft: 60, marginTop: 12 }}>Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={{ height: 50, width: windownWidth - 60, marginTop: 6, borderWidth: 1, marginLeft: 30, borderRadius: 10, backgroundColor: 'while', flexDirection: 'row' }}>
          <Image source={require('../../assets/apple.png')} style={{ width: 40, height: 40, marginTop: 4, marginLeft: 60 }} />
          <Text style={{ fontSize: 18, marginLeft: 60, marginTop: 12 }}>Apple</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={{ height: 50, width: windownWidth - 60, marginTop: 6, borderWidth: 1, marginLeft: 30, borderRadius: 10, backgroundColor: 'while', flexDirection: 'row' }}>
          <Image source={require('../../assets/facebook.png')} style={{ width: 40, height: 40, marginTop: 4, marginLeft: 60 }} />
          <Text style={{ fontSize: 18, marginLeft: 60, marginTop: 12 }}>Facebook</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Login =  ( props ) => {
  const [taiKhoan, settaiKhoan] = useState('');
  const [matKhau, setmatKhau] = useState('');
  const [anHienMK, setanHienMK] = useState(true);

  const doLogin = () => {
    // kiểm tra hợp lệ dữ liệu
    if (taiKhoan.length == 0) {
      alert("Chưa nhập tài khoản"); return;
    }
    if (matKhau.length == 0) {
      alert("Chưa nhập mật khẩu"); return;
    }

    // thực hiện fetch để lấy dữ liệu về
    let url_check_login = url_api_user + "?username=" + taiKhoan;
    fetch(url_check_login)
      .then((res) => { return res.json(); })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          alert("Sai tài khoản hoặc lỗi trùng lặp dữ liệu"); return;
        } else {
          // số lượng lấy dc 1 bản ghi ==> kiểm tra mật khẩu
          let objUser = res_login[0];
          if (objUser.password != matKhau) {
            alert("Sai mật khẩu"); return;
          } else {
            // đúng mật khẩu lưu thông tin vào storage
            try {
              await AsyncStorage.setItem(keys, JSON.stringify(objUser));
              // chuyển sang màn hình home
              props.navigation.navigate('Main');
              alert("đăng nhập thành công");
            } catch (e) {
              // saving error
              console.log(e);
            }
          }
        }
      })
    }
    
    return (
      <View style={{ width: '100%', height: 830, }}>
        <View style={{ height: 230, width: '100%' }}>
          <TopComponent />
        </View>
        <View style={{ height: 330, width: '100%', backgroundColor: '#F5F5F5' }}>
          <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 30 }}>Đăng nhập để bắt đầu.</Text>
            {/* tài khoản*/}
            <View style={{ borderRadius: 10, width: windownWidth - 60, marginLeft: 30, height: 45, marginTop: 20, backgroundColor: '#ffff', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/user.png')} resizeMode='stretch'
                style={{ width: 20, height: 20, marginLeft: 10 }} />
              <TextInput placeholder='tài khoản'
                style={{ height: '100%', flex: 1, marginLeft: 10, fontSize: 18 }}
                autoCapitalize={false}
                onChangeText={(user) => { settaiKhoan(user) }} />
            </View>
            {/* mật khẩu*/}
            <View style={{ borderRadius: 10, width: windownWidth - 60, marginLeft: 30, height: 45, marginTop: 20, backgroundColor: '#ffff', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/padlock.png')} resizeMode='stretch'
                style={{ width: 20, height: 20, marginLeft: 10 }} />
              <TextInput placeholder='mật khẩu'
                style={{ height: '100%', flex: 1, marginLeft: 10, fontSize: 18 }}
                autoCapitalize={false}
                secureTextEntry={anHienMK ? true : false}
                onChangeText={(pass) => { setmatKhau(pass) }} />
              <TouchableOpacity style={{ height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setanHienMK(!anHienMK)}>
                <Image source={require('../../assets/mat_an.jpg')} resizeMode='stretch'
                  style={{ width: 40, height: 25, marginRight: 10 }} />
              </TouchableOpacity>
            </View>
            {/* forget password*/}
            <View style={{ borderRadius: 10, width: windownWidth - 60, height: 30, marginLeft: 30, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ position: 'absolute', right: 0, }}
                onPress={() => { props.navigation.navigate('CreateAccount') }}>
                <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 16 }}>Tạo tài khoản ở đây</Text>
              </TouchableOpacity>
            </View>
            {/* mật khẩu*/}
            <TouchableOpacity style={{
              height: 50, width: windownWidth - 60, justifyContent: 'center', alignItems: 'center',
              backgroundColor: '#4D8D6E', marginLeft: 30, marginTop: 20, borderRadius: 100
            }}
              onPress={() => doLogin()}>
              <Text style={{ color: '#ffff', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 270, width: '100%', }}>
          <BottomComponent />
        </View>
      </View>
    )
  }

export default Login

  const styles = StyleSheet.create({

  })