import { Stack } from "expo-router";
import { useEffect } from "react";
import { migrate } from "@/src/db/conn";

export default function RootLayout() {
  useEffect(() => {
    migrate();
  }, []);
  return (
    <Stack>
      {/* Tabs group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Additional stack screens */}
      <Stack.Screen name="scan" options={{ title: "Scan" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Item" }} />
    </Stack>
  );
}
