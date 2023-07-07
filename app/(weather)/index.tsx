import { StatusBar } from "expo-status-bar";
import { Text, View } from "../../components/Themed";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";

const WeatherScreen = () => {
  const [showSearch, toggleSearch] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 relative">
      <StatusBar style="light" />
      <ImageBackground
        blurRadius={70}
        source={require("../../assets/extras/bg.png")}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      />
      {/* search section */}
      <View className="h-full w-full absolute top-0 left-0 z-50 bg-transparent">
        <View
          className={`h-[7%] flex-row items-center justify-end rounded-full mt-10 ${
            showSearch ? "bg-white/10" : "bg-transparent"
          } mx-2`}
        >
          {showSearch ? (
            <TextInput
              className="flex-1 text-base text-white h-10 pl-6"
              placeholder="Search City..."
              placeholderTextColor={"lightgray"}
            />
          ) : null}
          <TouchableOpacity
            onPress={() => toggleSearch(!showSearch)}
            className="bg-white/30 p-3 rounded-full m-1"
          >
            <Entypo name="magnifying-glass" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeatherScreen;
