import { StatusBar } from "expo-status-bar";
import { Text, View } from "../../components/Themed";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { debounce } from "lodash";
import axios from "axios";
import { weatherImages } from "../../constants/Constants";
import * as Progress from "react-native-progress";

type locationType = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

const WeatherScreen = () => {
  const [showSearch, toggleSearch] = React.useState(true);
  const [locations, setLocations] = React.useState<locationType[] | null>(null);
  const [weather, setWeather] = React.useState<any>([]);
  const [cityName, setCityName] = React.useState("Dar es salaam");
  const [days, setDays] = React.useState("7");
  const [keyboardShown, setKeyboardShown] = React.useState(false);

  const [dataLoc, setLocData] = React.useState(null);
  const [loadingLoc, setLocLoading] = React.useState(true);
  const [errorLoc, setLocError] = React.useState(false);

  const apiCall = async (query: string) => {
    const search_endpoint = `http://api.weatherapi.com/v1/search.json?key=af023ef008a7404eb5554235230807&q=${cityName}`;
    const forcast_endpoint = `http://api.weatherapi.com/v1/forecast.json?key=af023ef008a7404eb5554235230807&q=${cityName}&days=${days}&aqi=no&alerts=no`;

    const options = {
      method: "GET",
      url: query === "search" ? search_endpoint : forcast_endpoint,
    };

    try {
      query === "search" ? setLocLoading(false) : setLocLoading(true);
      const res = await axios.request(options);
      query === "search" ? setLocations(res?.data) : setWeather(res?.data);
      console.log(
        "✅ File:(weather)/index | Function: apiCall | response:",
        res.data
      );
      return res?.data;
    } catch (error) {
      console.log(
        "❌ File:(weather)/index | Function: apiCall | error:",
        error
      );

      setLocError(true);

      return null;
    } finally {
      setLocLoading(false);
    }
  };

  const handleLocation = (loc: locationType) => {
    console.log(
      "👽 File:(weather)/index | Function: handleLocation | location:",
      loc
    );

    setLocations([]);

    apiCall("forcast");
    toggleSearch(false);
  };

  const handleSearch = React.useCallback(() => {
    if (cityName.length > 2) {
      apiCall("search");
    }
  }, [cityName]);

  const handleTextDebounce = React.useCallback(debounce(handleSearch, 1200), [
    cityName,
  ]);

  const fetchWeatherForcast = () => {
    return apiCall("forecast");
  };

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });

    fetchWeatherForcast();

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const { current, location } = weather;

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

      {loadingLoc === true ? (
        <View className="h-full w-full absolute top-0 left-0 z-50 bg-transparent flex items-center justify-center">
          <Progress.CircleSnail thickness={10} size={140} color={["#0bb3b2"]} />
        </View>
      ) : (
        <>
          {/* search section */}
          <View className="h-full w-full absolute top-0 left-0 z-50 bg-transparent">
            <View
              className={`${
                keyboardShown ? "h-[10%]" : "h-[7%]"
              } flex-row items-center justify-end rounded-full mt-10 ${
                showSearch ? "bg-white/10" : "bg-transparent"
              } mx-2`}
            >
              {showSearch ? (
                <TextInput
                  className="flex-1 text-base text-white h-10 pl-6"
                  placeholder="Search City..."
                  placeholderTextColor={"lightgray"}
                  onChangeText={(text) => {
                    setCityName(text);
                    handleTextDebounce();
                  }}
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
                {locations?.map((loc, index) => {
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
                      <Text className="ml-1">
                        {loc.name}, {loc.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}

            {/* forcast section */}
            <View className="flex flex-1 justify-around mx-4 mb-2 bg-transparent">
              <Text className="text-white text-center text-2xl font-bold">
                {location?.name},{" "}
                <Text className=" text-lg font-semibold text-gray-300">
                  {location?.country}
                </Text>
              </Text>

              {/* weather image */}
              <View className="flex-row justify-center bg-transparent">
                <Image
                  className="h-52 w-52"
                  // @ts-ignore
                  source={weatherImages[current?.condition?.text]}
                />
              </View>

              {keyboardShown === false ? (
                <>
                  {/* degree celcius */}
                  <View className="space-y-2 p-2 bg-transparent">
                    <Text className="text-center font-bold text-white text-6xl ml-5">
                      {current?.temp_c}&#176;
                    </Text>
                    <Text className="text-center text-white text-xl ml-5 tracking-widest">
                      {current?.condition?.text}
                    </Text>
                  </View>
                </>
              ) : null}

              {/* degree celcius */}
              <View className="flex-row justify-between mx-4 bg-transparent">
                <View className="flex-row space-x-2 items-center bg-transparent">
                  <Feather name="wind" size={25} color="white" />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}Km/h
                  </Text>
                </View>

                <View className="flex-row space-x-2 items-center bg-transparent">
                  <Feather name="droplet" size={25} color="white" />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>

                <View className="flex-row space-x-2 items-center bg-transparent">
                  <Feather name="sun" size={25} color="white" />
                  <Text className="text-white font-semibold text-base">
                    6:05 PM
                  </Text>
                </View>
              </View>
            </View>

            {keyboardShown === false ? (
              <>
                {/* forcast for the next days */}
                <View className="mb-2 space-x-3 bg-transparent">
                  <View className="flex-row items-center mx-5 space-x-2 bg-transparent">
                    <FontAwesome name="calendar" size={22} color="white" />
                    <Text className="text-white text-base">Daily Forcast</Text>
                  </View>

                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      paddingHorizontal: 0,
                      marginHorizontal: 0,
                    }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {
                      // @ts-ignore
                      weather?.forecast?.forecastday?.map((item, index) => {
                        let date = new Date(item.date);
                        const options = {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        // @ts-ignore
                        let dayName = date.toLocaleDateString("en-US", options);
                        dayName = dayName.split(",")[0];

                        return (
                          <View
                            key={index ?? 0}
                            className="flex items-center justify-center w-24 rounded-3xl py-3 space-y-3 bg-white/10 mt-2 ml-2"
                          >
                            <Image
                              className="h-11 w-11"
                              // @ts-ignore
                              source={weatherImages[item?.day?.condition?.text]}
                            />
                            <Text className="text-white">{dayName}</Text>
                            <Text className="text-white text-xl font-semibold">
                              {item.day.avgtemp_c}&#176;
                            </Text>
                          </View>
                        );
                      })
                    }
                  </ScrollView>
                </View>
              </>
            ) : null}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default WeatherScreen;
