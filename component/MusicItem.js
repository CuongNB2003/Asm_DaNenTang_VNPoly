import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MusicItem = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: props.image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.author}>{props.author}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MusicItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        padding: 8,
        marginHorizontal: 8,
        borderRadius: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginEnd: 16
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6e6e6e'
    },
    author: {
        color: '#c2c2c2',
        marginTop: 4
    }
})