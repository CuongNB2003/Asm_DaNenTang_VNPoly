import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const windownWidth = Dimensions.get('window').width;
const ItemTinTuc = (props) => {
    const { title, content, image, author } = props


    return (
        <View style={styles.container}>
            <View style={styles.phiatren}>
                <Text style={styles.textTacGia}>{author}</Text>
                <TouchableOpacity style={styles.follow}>
                    <Image source={require('../assets/follow.png')} resizeMode='stretch'
                        style={{ width: 20, height: 20, marginRight: 5 }} />
                    <Text style={styles.texttieude}>Theo dõi</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.thanhngang}></View>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.texttieude} >{content}</Text>
            </View>
            <View style={styles.thanhngang}></View>
            <View style={styles.phiaduoi}>
                <TouchableOpacity style={styles.bieutuong}>
                    <Image source={require('../assets/heart.png')} resizeMode='stretch'
                        style={{ width: 20, height: 20, marginRight: 5 }} />
                    <Text style={styles.texttieude}>Yêu thích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bieutuong}>
                    <Image source={require('../assets/message.png')} resizeMode='stretch'
                        style={{ width: 20, height: 20, marginRight: 5 }} />
                    <Text style={styles.texttieude}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bieutuong}>
                    <Image source={require('../assets/share.png')} resizeMode='stretch'
                        style={{ width: 20, height: 20, marginRight: 5 }} />
                    <Text style={styles.texttieude}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default ItemTinTuc

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'column',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    content: {
        marginStart: 10,
        width: Dimensions.get('window').width - 50,

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
        width: windownWidth - 60,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    phiatren: {
        borderRadius: 10,
        width: windownWidth - 60,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bieutuong: {
        marginLeft: 10,
        flexDirection: 'row',
        width: '33.33%',
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    follow: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row',
        width: '30%',
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texttieude: {
        fontSize: 16,
    },
    textTacGia: {
        width: '70%',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },



})