import { StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Designs</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <TouchableOpacity
        onPress={() => router.push("/(weather)")}
        className="h-10 w-1/2 bg-blue-400 flex items-center justify-center rounded-lg"
      >
        <Text className=" font-semibold text-white">Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(mike)")}
        className="h-10 w-1/2 bg-green-400 flex items-center justify-center rounded-lg my-2"
      >
        <Text className=" font-semibold text-white">Puzzle Two</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(mike)/puzzletwo")}
        className="h-10 w-1/2 bg-red-400 flex items-center justify-center rounded-lg my-2"
      >
        <Text className=" font-semibold text-white">Puzzle Two</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
