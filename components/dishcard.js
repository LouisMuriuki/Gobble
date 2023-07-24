import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'

const Dishcard = () => {

    const onPress=()=>{

    }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, styles.shadow]}>
        {/* {bestSeller ? (
          <View style={styles.bestSeller}>
            <Text>🔥</Text>
          </View>
        ) : null} */}
        <Image source={""} style={styles.image} resizeMode="contain" />
        <View style={styles.detail}>
          <Text style={styles.title}>title</Text>
          <Text style={styles.subtitle}>something</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>Ksh</Text>
            <Text >1200</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Dishcard

const styles = StyleSheet.create({
    container: {
        // backgroundColor: COLOR.white,
        margin: 5,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        // width: WIDTH * 0.475,
      },
      shadow: {
        // shadowColor: COLOR.gray,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 7.5,
        elevation: 5,
      },
      image: {
        width: 150,
        height: 150,
      },
      detail: {
        alignItems: 'center',
      },
      title: {
        // ...FONT.contentTitle,
        marginBottom: 5,
        textAlign: 'center',
      },
      subtitle: {
        // ...FONT.contentText,
        marginBottom: 10,
      },
      priceContainer: {
        flexDirection: 'row',
      },
      currency: {
        // color: COLOR.red,
        // ...FONT.price,
        fontSize: 16,
        marginRight: 2.5,
      },
      bestSeller: {
        width: 27.5,
        height: 27.5,
        // backgroundColor: COLOR.lightGray[2],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12.5,
        position: 'absolute',
        right: 7.5,
        top: 7.5,
      }
})