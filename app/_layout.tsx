import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./(tabs)/theme/ThemeContext";
import { Colors } from "../constants/Colors";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedRoot />
    </ThemeProvider>
  );
}

function ThemedRoot() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"] || Colors.light;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}