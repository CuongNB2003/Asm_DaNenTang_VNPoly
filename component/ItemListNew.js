import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const ItemListNew = ( props ) => {
    const {dulieu} = props;
    return (
        <View style={styles.container}>
            <Image source={{uri: dulieu.image}} style={styles.image} />
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.textTitle}>{dulieu.title}</Text>
                <Text numberOfLines={3} >{dulieu.content}</Text>
            </View>
        </View>
    )
}

export default ItemListNew

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        marginLeft: 10,
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    content: {
        marginStart: 10,
        width: Dimensions.get('window').width - 150,

    }



})