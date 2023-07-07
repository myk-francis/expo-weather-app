import { StatusBar } from "expo-status-bar";
import { Text, View } from "../../components/Themed";
import { SafeAreaView, Image } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white/20">
      <Text className="text-lg font-bold">This is tab number 2</Text>
    </View>
  );
}
