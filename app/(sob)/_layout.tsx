import { Slot, Stack } from "expo-router";

export default function SobLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
