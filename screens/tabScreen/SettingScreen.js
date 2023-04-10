import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys, url_api_post, url_api_user } from '../../data/api';
import * as Updates from "expo-updates"




const SettingScreen = (props) => {
  const [loginInfo, setloginInfo] = useState({});
  const [dataUser, setdataUser] = useState([])

  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)
  const [fullname, setfullname] = useState(null)
  const [image, setimage] = useState(null)
  const [id, setid] = useState(null)

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem(keys);
      if (value !== null) {

        setloginInfo(JSON.parse(value))

        let obj = JSON.parse(value)
        setid(obj.id)
        setfullname(obj.fullname)
        setimage(obj.image)
        setusername(obj.username)
        setpassword(obj.password)

        fetch(url_api_post + '?tb_usersId=' + obj.id)
                .then(async (res) => {
                    const posts = await res.json()
                    posts.reverse()
                    setdataUser(posts)
                    console.log(dataUser.length)
                })
                .catch(err => {
                    console.log(err);
                })
      }
    } catch (e) {
      console.log(e);
    }
  }

  const DangXuat = async () => {

    try {
      await AsyncStorage.clear()
      Updates.reloadAsync()
    } catch (e) {
      console.log(e);
    }
  }

  const ChuyenMan_ThongTin = () => {
    props.navigation.navigate('ThongTinCN', loginInfo)
    console.log(loginInfo);
  }

  const ChuyenMan_DoiMK = () => {
    props.navigation.navigate('DoiMatKhau', loginInfo)
    console.log(loginInfo);
  }

  const ChuyenMan_MyPost = () => {
    props.navigation.navigate('MyPost', loginInfo)
    console.log(loginInfo);
  }

  const ChuyenMan_AddPost = () => {
    props.navigation.navigate('AddPost', loginInfo)
    console.log(loginInfo);
  }



  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getLoginInfo();
    })

    return unsubscribe
  }, [props.navigation])



  return (
    <View style={styles.container}>

      <Image source={{ uri: image }}
        style={styles.img_avt} />
      <Text style={{ margin: 10, fontSize: 24, fontWeight: 'bold' }}>{fullname}</Text>

      <View style={styles.phiaduoi}>

        <TouchableOpacity
          style={styles.bieutuong}>
          <Image source={require('../../assets/heart.png')}
            resizeMode='stretch'
            style={{ width: 20, height: 20, marginRight: 5 }} />
          <Text style={styles.texttieude}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bieutuong}>
          <Image source={require('../../assets/message.png')}
            resizeMode='stretch'
            style={{ width: 20, height: 20, marginRight: 5 }} />
          <Text style={styles.texttieude}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bieutuong}>
          <Image source={require('../../assets/baiviet.png')}
            resizeMode='stretch'
            style={{ width: 20, height: 20, marginRight: 5 }} />
          <Text style={styles.texttieude}>{dataUser.length}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.thanhngang}></View>

      <TouchableOpacity
        style={styles.danhmuc}
        onPress={ChuyenMan_ThongTin} >
        <Image source={require('../../assets/user.png')}
          style={styles.icon} />
        <Text style={styles.text_setting} >Thông tin cá nhân</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.danhmuc}
        onPress={ChuyenMan_DoiMK} >
        <Image source={require('../../assets/padlock.png')}
          style={styles.icon} />
        <Text style={styles.text_setting} >Đổi mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.danhmuc}
        onPress={ChuyenMan_AddPost}>
        <Image source={require('../../assets/edit.png')}
          style={styles.icon} />
        <Text style={styles.text_setting}>Tạo bài viết</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.danhmuc}
        onPress={ChuyenMan_MyPost}>
        <Image source={require('../../assets/baiviet.png')}
          style={styles.icon} />
        <Text style={styles.text_setting}>Bài viết của bạn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.danhmuc}>
        <Image source={require('../../assets/heart.png')}
          style={styles.icon} />
        <Text style={styles.text_setting}>Những người bạn theo dõi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.danhmuc}
        onPress={DangXuat}>
        <Image source={require('../../assets/log-out.png')}
          style={styles.icon} />
        <Text style={styles.text_setting}>Đăng xuất</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  img_avt: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 80,
  },
  text_setting: {
    margin: 10,
    fontSize: 18,
  },
  danhmuc: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    width: '98%',
    borderWidth: 0.5,
    height: 48,
  },
  icon: {
    marginLeft: 10,
    marginTop: 10,
    width: 30,
    height: 30,
  },
  thanhngang: {
    height: 1,
    width: '100%',
    backgroundColor: '#707070',
    marginTop: 10,
    marginBottom: 5,
  },
  phiaduoi: {
    borderRadius: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bieutuong: {
    marginLeft: 10,
    flexDirection: 'row',
    width: '30%',
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texttieude: {
    fontSize: 18,
    fontWeight: 'bold'
  }

})