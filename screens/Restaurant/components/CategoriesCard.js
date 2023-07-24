import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { themeColors } from "../../../theme";
import { urlFor } from "../../../sanity";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../../slices/restaurantSlice";
const CategoriesCard = ({ name, description, id, items, image }) => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  return (
    <TouchableOpacity
      style={{
        shadowColor: themeColors.bgColor(0.6),
        padding: 10,
        shadowRadius: 2,
        marginBottom: 10,
      }}
      className="relative mx-2 bg-white rounded-3xl shadow-lg h-24"
      onPress={() => {
        navigation.navigate("ProductScreen", {
          items,
        });
        dispatch(setActiveCategory(name))
      }}
    >
      <View className="flex-row justify-between items-center pl-6 h-full">
        <Text className="font-bold text-lg">{name}</Text>
        <View className="flex-row items-center">
          <Image
            className=" h-10 w-12 rounded"
            source={{ uri: urlFor(image).url() }}
          />
          <Icon.ChevronRight
            color="#000"
            className="ml-5"
            width={25}
            height={25}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({});
