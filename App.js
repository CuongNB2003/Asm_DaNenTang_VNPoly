import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { keys } from './data/api';
import HomeScreen from '../Assignment_PH22662/screens/tabScreen/HomeScreen';
import MusicScreen from '../Assignment_PH22662/screens/tabScreen/MusicScreen';
import SearchScreen from '../Assignment_PH22662/screens/tabScreen/SearchScreen';
import SettingScreen from '../Assignment_PH22662/screens/tabScreen/SettingScreen';
import AddBaiViet from '../Assignment_PH22662/screens/user/AddBaiViet';
import DoiMatKhau from '../Assignment_PH22662/screens/user/DoiMatKhau';
import MyPosts from '../Assignment_PH22662/screens/user/MyPosts';
import ThongTinCN from '../Assignment_PH22662/screens/user/ThongTinCN';
import Login from '../Assignment_PH22662/screens/login/Login';
import TaoTaiKhoan from '../Assignment_PH22662/screens/login/TaoTaiKhoan';


const Tab = createBottomTabNavigator();
const StackDemo = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/house.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/search.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
      <Tab.Screen name="Music" component={MusicScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/music.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
      <Tab.Screen name="Setting" component={SettingScreen} options={{
        tabBarIcon: () => <Image source={require('./assets/settings.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [trangThai, settrangThai] = useState(false);

  const kiemTraTrangThai = async()=> {
    try{
      const value = await AsyncStorage.getItem(keys);
      if(value !== null){
        settrangThai(true)
      }

    }catch ( e){
      console.log(e)
    }
  }

  React.useEffect(()=>{
    kiemTraTrangThai()
  })

  return (
    <NavigationContainer>
      <StackDemo.Navigator>
        {
          !trangThai && <StackDemo.Screen name="Login" component={Login} options={({ headerShown: false })} />
        }
        
        <StackDemo.Screen name="Main" component={MyTabs} options={({ headerShown: false })} />
        <StackDemo.Screen name="CreateAccount" component={TaoTaiKhoan} />
        <StackDemo.Screen name="AddPost" component={AddBaiViet} options={{title: "Tạo bài viết"}}/>
        <StackDemo.Screen name="MyPost" component={MyPosts} options={{title: "Bài viết của bạn"}}/>
        <StackDemo.Screen name="ThongTinCN" component={ThongTinCN} options={{title: "Thông tin người dùng"}}/>
        <StackDemo.Screen name="DoiMatKhau" component={DoiMatKhau} options={{title: "Đổi mật khẩu"}}/>
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
