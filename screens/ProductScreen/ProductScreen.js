import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DishRow from "../../components/dishRow";
import BasketIcon from "../../components/basketIcon";

const ProductScreen = ({ item }) => {
  const renderProducts = ({ item: products }) => {
    console.log("products", products);
    return (
      <DishRow
        key={products._id}
        id={products._id}
        name={products.name}
        description={products.description}
        price={products.price}
        image={products?.image}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BasketIcon />
      <FlatList
        renderItem={renderProducts}
        keyExtractor={(item) => item._id}
        data={item}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 5,
        }}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
