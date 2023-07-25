import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";

const colors = ['#f97316','#334155','#7c3aed','#009950','#14b8a6','#dc2626']

let today = new Date();
let hours = today.getHours()
const Drawer = () => {
    const navigation=useNavigation()
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      hours < 12
        ? setGreeting('Good Morning')
        : hours <= 18 && hours >= 12
        ? setGreeting('Good Afternoon')
        : setGreeting('Good Evening');
    }, []);

    const saveColor=async (index)=>{
        try {
            await AsyncStorage.setItem('color', index.toString());
          } catch (e) {
            // saving error
          }
    }
  return (
    <SafeAreaView>
     <StatusBar barStyle="dark-content" backgroundColor={"white"} />
    <View className="flex">
      <View
        className="h-52"
        style={{ backgroundColor: themeColors.bgColor(1) }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-6 left-4 bg-gray-50 p-2 rounded-full shadow"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>
        <Text className="absolute bottom-6 left-2 text-3xl text-white">
          {greeting} Louis,
        </Text>
      </View>
      {/* <View className="">
       <Text>change color</Text>
       <View className="flex-row mt-3">
         {colors.map((color,index)=>{return(
            <TouchableOpacity key={index} onPress={()=>saveColor(index)} >
                <View className="h-9 w-9 mr-4 rounded-full" style={{backgroundColor:color}}>

                </View>
            </TouchableOpacity>
        )

        })}
       </View>
       
      </View> */}
    </View>
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
