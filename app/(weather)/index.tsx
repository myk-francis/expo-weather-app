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
import Feather from "@expo/vector-icons/Feather";
import React from "react";

const WeatherScreen = () => {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([1, 2, 3]);

  const handleLocation = (loc: number) => {
    console.log(
      "👽 File:(weather)/index | Function: handleLocation | location:",
      loc
    );
  };

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

        {showSearch ? (
          <View className="w-[96%] rounded-3xl bg-gray-300 mx-2 my-2">
            {locations.map((loc, index) => {
              let showBorder = index !== locations.length - 1;

              return (
                <TouchableOpacity
                  onPress={() => handleLocation(loc)}
                  className={`flex-row items-center border-0 p-3 px-4 mb-1 ${
                    showBorder ? "border-b-2 border-b-gray-400" : ""
                  }`}
                  key={index}
                >
                  <Feather name="map-pin" size={20} color="gray" />
                  <Text className="ml-1">London, United Kindom</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        {/* forcast section */}
        <View className="flex flex-1 justify-around mx-4 mb-2 bg-transparent">
          <Text className="text-white text-center text-2xl font-bold">
            London,{" "}
            <Text className=" text-lg font-semibold text-gray-300">
              United Kindom
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeatherScreen;
