import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import * as Icon from "react-native-feather";
const Searchbar = () => {
  return (
    <View className="flex-row items-center space-x-2 px-4 pb-2 bg-white">
    <View className="flex-row flex-1 items-center p-2 rounded-full border border-gray-300">
      <Icon.Search height="15" width="15" stroke="gray" />
      <TextInput
        placeholder="search restaurants and cuisines"
        className="ml-2 flex-1"
        keyboardType="default"
      />
    </View>
  </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({})