import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import ItemTinTuc from '../../component/ItemTinTuc';
import { url_api_category, url_api_post } from '../../data/api';




const windownWidth = Dimensions.get('window').width;
const HomeScreen = ( props ) => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('For you')
    const [data, setData] = useState([])
    const [m_Data, setM_Data] = useState([])
    const [categories, setCategories] = useState([])
    const setStatusFilter = status => {
        setStatus(status)
    }

    const getData = () => {
        fetch(url_api_post + '?_expand=tb_user')
            .then(async (res) => {
                const posts = await res.json()
                posts.reverse()
                setData(posts)
                setM_Data(posts)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getCategory = () => {
        fetch(url_api_category)
            .then(async (res) => {
                const categories = await res.json()
                setCategories(categories)
                
            })
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCategory()
            getData()
            setIsLoading(true)
        })

        return unsubscribe
    }, [props.navigation])

    return (
        <View style={styles.container}>
            <View style={{
                width: windownWidth - 20, marginLeft: 10, height: 45,
                marginTop: 10, flexDirection: 'row', alignItems: 'center'
            }}>
                <Text style={styles.textTieuDe}>VN Poly.</Text>
                <TouchableOpacity style={{
                    height: '100%', aspectRatio: 1,
                    justifyContent: 'center', alignItems: 'center', right: 0
                }}>
                    <Image source={require('../../assets/bell.png')} resizeMode='stretch'
                        style={{ width: 30, height: 30, marginRight: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.thanhngang}></View>
            
            <View style={styles.listTab}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    categories.map(item => (
                        <TouchableOpacity style={[styles.btnTab, status === item.name && styles.btnTabActive]}
                            onPress={() => {
                                setStatusFilter(item.name)
                                setM_Data(data.filter((m_item) => m_item.categoryId == item.id).map((item) => (item)))
                            }}>
                            <Text style={[styles.textTab, status === item.name && styles.textActive]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
            <Text style={styles.textND}>Có thể bạn quan tâm</Text>

            <FlatList
                data={m_Data}
                renderItem={({ item, index }) =>
                    <ItemTinTuc key={index} title={item.title} content={item.content} image={item.image} author={item.id} />
                }
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={isLoading}
                        onRefresh={() => {
                            setIsLoading(true)
                            getData()
                        }} />
                } />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 10,
        marginEnd: 10,
        flexDirection: 'column',
    },
    textTieuDe: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 220,
        color: '#4D8D6E'
    },
    textND: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    thanhngang: {
        height: 1,
        width: '100%',
        backgroundColor: '#707070',
        marginTop: 10,
        marginBottom: 10,
    },
    btnTab: {
        justifyContent: 'center',
        marginHorizontal: 16,
        paddingBottom: 8
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
    },
    textTab: {
        fontSize: 18,
        color: '#6d6b6b'
    },
})

