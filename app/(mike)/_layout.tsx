import { Slot, Stack } from "expo-router";

export default function MikeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="puzzletwo" options={{ headerShown: false }} />
    </Stack>
  );
}
