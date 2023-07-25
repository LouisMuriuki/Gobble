import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../sanity";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant, setRestaurant } from "../../slices/restaurantSlice";
import { emptyBasket } from "../../slices/basketSlice";
import * as Icon from "react-native-feather";

import { useState } from "react";
import CategoriesCard from "./components/CategoriesCard";
import { themeColors } from "../../theme";
import Searchbar from "../../components/Searchbar";

export default function ResturantScreen() {
  const navigation = useNavigation();
  const resturant = useSelector(selectResturant);
  let dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      type,
      address,
      description,
      price,
      deliverytime,
      categories,
      reviews,
      lng,
      lat,
    },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    if (resturant && resturant.id != id) {
      dispatch(emptyBasket());
    }
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        type,
        address,
        description,
        price,
        deliverytime,
        categories,
        lng,
        lat,
      })
    );
  }, []);

  const renderRestaurantCategories = ({ item: category }) => {
    return (
      <CategoriesCard
        key={category._id}
        id={category._id}
        name={category.name}
        description={category.description}
        items={category.items}
        image={category?.image.asset}
      />
    );
  };
  return (
    <SafeAreaView>
    <View className="bg-white h-full">
      <View className="relative ">
        <Image className="w-full h-48" source={{ uri: urlFor(imgUrl).url() }} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>
      </View>
      <View
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        className="bg-white -mt-12 pt-2"
      >
        <View className="px-5">
          <Text className="text-3xl font-bold">{title}</Text>
          {/* copy this code from restaurant card */}
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <Image
                source={require("../../assets/images/fullStar.png")}
                className="h-4 w-4"
              />
              <Text className="text-sm">
                <Text className="text-green-700">{rating + " stars"}</Text>
                <Text className="text-gray-700">
                  {" " + reviews + " reviews"}
                </Text>
                ·
                <Text className="font-semibold text-gray-700">
                  {deliverytime}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text className="text-gray-800 text-xs">{"Ksh" + price}</Text>
            </View>
          </View>
          {/* <Text className="text-gray-500 mt-2">{description}</Text> */}
        </View>
      </View>
      <View className="pt-2">
        <Searchbar />
      </View>
        {/* <Text className="px-4 py-2 text-2xl font-bold"></Text> */}
        <View>
          <FlatList
            renderItem={renderRestaurantCategories}
            keyExtractor={(item) => item._id}
            data={categories}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 310,
              paddingTop: 0,
            }}
            ListHeaderComponent={
              <View className="mb-2">
                <Text
                  className="font-bold ml-5 text-xl "
                  style={{ color: themeColors.bgColor(1) }}
                >
                  Categories
                </Text>
              </View>
            }
          />
        </View>
    </View>
    </SafeAreaView>
  );
}
