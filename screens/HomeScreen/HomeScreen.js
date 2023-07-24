import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  LogBox,
  Button,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../../components/categoriesheader";
import FeatureRow from "../../components/featuredRow";
import { getFeaturedRestaurants, getRestaurants } from "../../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";
import * as Network from "expo-network";
import Searchbar from "../../components/Searchbar";
import ResturantCard from "../../components/resturantCard";

export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [internet, setInternet] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const navigation = useNavigation();
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("color");
  //       if (!value) {
  //         await AsyncStorage.setItem("color", 1);
  //       }
  //     } catch (e) {
  //       console.log("error", e);
  //     }
  //   };
  //   getData();
  // }, []);
  useEffect(() => {
    const checkInternet = async () => {
      const { isInternetReachable } = await Network.getNetworkStateAsync();
      setInternet(isInternetReachable);
    };
    checkInternet();
  }, [refresh]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    if (internet) {
      getFeaturedRestaurants().then((data) => {
        setFeaturedRestaurants(data);
      });
    }
  }, [internet]);

  useEffect(() => {
    if (internet) {
      getRestaurants().then((data) => {
        // console.log("restaurant",data)
        setRestaurants(data);
      });
    }
  }, [internet]);

  const renderFeatured = ({ item: restaurant }) => {
    return (
      <FeatureRow
        key={restaurant._id}
        id={restaurant._id}
        title={restaurant.category}
        restaurants={restaurant.restaurants}
        description={restaurant.description}
        featuredCategory={restaurant.categories}
        origin="feature"
      />
    );
  };

  const FeaturedHeader = () => {
    return (
      <View className="flex-row justify-between items-center px-4">
        <View className="flex-row items-center">
          <Icon.MapPin
            width={15}
            height={15}
            className="mr-2"
            style={{ color: themeColors.text }}
          />
          <Text className="font-bold text-lg">Near you</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRestaurantItem = ({ item: restaurant }) => {
    return (
      <View key={restaurant._id} className="mb-6 ml-3">
        <ResturantCard
          id={restaurant._id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          reviews={restaurant.reviews}
          type={restaurant.type?.name}
          address="123 main street"
          description={restaurant.description}
          price={restaurant.price}
          deliverytime={restaurant.deliverytime}
          categories={restaurant.categories}
          lng={restaurant.lng}
          lat={restaurant.lat}
          origin="home"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      {/* search bar */}
      {internet ? (
        <>
          <View className="flex-row mt-1 pb-2 items-center justify-between mx-4 space-x-1">
            <TouchableOpacity onPress={() => navigation.navigate("Drawer")}>
              <Icon.Menu color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1">
              <View className="flex-row items-center justify-center">
                <Text className="font-bold text-lg items-center justify-center">
                  Current location
                </Text>
                <Icon.ChevronDown
                  size={20}
                  style={{ color: themeColors.bgColor(1) }}
                />
              </View>
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://louismuriuki.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flui.d6485f5e.jpg&w=3840&q=75",
              }}
              className=" h-9 w-9 bg-gray-300 p-4  rounded-full"
            />
          </View>
          <Searchbar />
          <Categories />
          <ScrollView>
            <View className="mt-2">
              <FeaturedHeader />
              <FlatList
                horizontal
                renderItem={renderFeatured}
                keyExtractor={(item) => item._id}
                data={featuredRestaurants}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 5,
                }}
              />
            </View>

            <View>
              <FlatList
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item._id}
                data={restaurants}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 200,
                  paddingTop: 10,
                }}
                ListHeaderComponent={
                  <View className="mb-2">
                    <Text
                      className="font-bold ml-5 text-xl "
                      style={{ color: themeColors.bgColor(1) }}
                    >
                      Our Restaurants
                    </Text>
                  </View>
                }
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View className="relative items-center h-full">
          <AnimatedLottieView
            source={require("../../assets/lottie/noInternet.json")}
            autoPlay
            loop
            style={{ marginBottom: 80 }}
          />
          <View className="absolute gap-3 bottom-72 ">
            <Text
              className="text-black mb-4 font-semibold text-base"
              style={{ color: themeColors.bgColor(1) }}
            >
              Please connect to the internet
            </Text>
            <Button
              title="Refresh Page"
              onPress={() => setRefresh((prev) => !prev)}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
