import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";

export default function ResturantCard({
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
  origin,
}) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={{
        shadowColor: themeColors.bgColor(0.6),
        padding: 10,
        shadowRadius: 20,
      }}
      className="mr-6 bg-white rounded-3xl shadow-lg"
      onPress={() => {
        navigation.navigate("Resturant", {
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
          reviews,
          lat,
        });
      }}
    >
      <View
        style={{
          shadowColor: themeColors.bgColor(0.6),
          padding: 10,
          shadowRadius: 20,
          zIndex: 0,
        }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <View style={{ zIndex: 1 }}>
          {imgUrl ? (
            <Image
              className={
                origin === "home"
                  ? "h-36 w-full rounded-t-3xl"
                  : "h-36 w-64 rounded-t-3xl"
              }
              source={{ uri: urlFor(imgUrl).url() }}
            />
          ) : (
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
              }}
            />
          )}

          <View className="px-3 pb-4 space-y-2">
            <Text className="text-lg font-bold pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
              <Image
                source={require("../assets/images/fullStar.png")}
                className="h-4 w-4"
              />
              <Text className="text-xs">
                <Text className="text-green-700">{rating}</Text>
                <Text className="text-gray-700"> ({reviews} stars)</Text> ·{" "}
                <Text className="font-semibold text-gray-700">{type}</Text>
              </Text>
            </View>
            {origin === "feature" ? (
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text className="text-gray-700 text-xs">
                  Nearby · {address}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
