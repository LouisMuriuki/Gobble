import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ResturantScreen from "./screens/Restaurant/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import { useSelector } from "react-redux";
import {
  selectActiveCategory,
  selectCategories,
  selectResturant,
} from "./slices/restaurantSlice";
import Drawer from "./screens/Drawer";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectActiveCategory);
  return (
    <Tab.Navigator
      initialRouteName={activeCategory}
      screenOptions={{ tabBarScrollEnabled: true }}
    >
      {categories.map((category, i) => {
        console.log("loggingnow", category);
        return (
          <Tab.Screen
            i
            key={category.name}
            name={category.name}
            children={() => <ProductScreen item={category.items} />}
            // component={ProductScreen}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const restaurant = useSelector(selectResturant);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Drawer"
          options={{
            presentation: "card",
            headerShown: false,
            animationTypeForReplace: "push",
            animation: "slide_from_left",
            
          }}
          component={Drawer}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Resturant" component={ResturantScreen} />
        <Stack.Screen
          name="ProductScreen"
          component={MyTabs}
          options={({ navigation }) => ({
            title: restaurant.title,
          })}
        />
        <Stack.Screen
          name="Cart"
          options={{ presentation: "modal", headerShown: false }}
          component={CartScreen}
        />
        <Stack.Screen
          name="PreparingOrder"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={PreparingOrderScreen}
        />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
