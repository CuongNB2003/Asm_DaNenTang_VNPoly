import { Button, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys, url_api_category, url_api_post } from '../../data/api';




const AddBaiViet = ( props ) => {
  const [image, setImage] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    //const [userId, setUserId] = useState(null)

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([]);

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
                    setImage("data:image/" + file_ext + ";base64," + res);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }

    const AddPost = async () => {
        var userId;
        try {
            const value = await AsyncStorage.getItem(keys)
            if (value !== null) {
                // lấy được dữ liệu:
                userId = JSON.parse(value).id
                console.log(userId);
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }

        fetch(url_api_post, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tb_usersId: userId,
                title: title,
                content: content,
                image: image,
                categoryId: category
            }),
        })
            .then(async (res) => {
                if (res.status == 200)
                    alert("Thêm thành công")

            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const getData = () => {
        fetch(url_api_category)
            .then((res) => { return res.json() })
            .then((res_json) => {
                let arrForDropDown = res_json.map((item, index, src) => {
                    return { label: item.name, value: item.id }
                })
                setItems(arrForDropDown)
            })
    }

    React.useEffect(() => {
        if (items.length <= 0)
            getData()
    })

    const AddImage = () => {
        return (
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.wrapper}>
                    <Image source={require('../../assets/baiviet.png')} style={{width: 50, height: 50}}></Image>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Nhập tiêu đề' style={styles.title} multiline={true} onChangeText={(txt) => setTitle(txt)} />
            <DropDownPicker
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder={'Select category'}
            />

            <TextInput placeholder='Nhập nội dung' style={styles.content} multiline={true} numberOfLines={5} onChangeText={(txt) => setContent(txt)} />
            {
                image ? (
                    <Image source={{ uri: image }} style={{ minHeight: 300, maxWidth: Dimensions.get('window').width, marginTop: 8 }} />
                ) : (
                    <AddImage />
                )
            }
            <View style={{ marginTop: 8 }}>
                <Button title='Thêm bài viết' onPress={AddPost} />
            </View>

        </View>
    )
}

export default AddBaiViet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 24,
        marginBottom: 8
    },
    content: {
        fontSize: 16,
        marginTop: 8,
        textAlignVertical: 'top'
    },
    wrapper: {
        borderWidth: 2,
        borderColor: '#c2c2c2',
        borderRadius: 10,
        alignItems: 'center',
        height: 300,
        justifyContent: 'center',
        borderStyle: 'dashed',
        marginTop: 8
    }
})