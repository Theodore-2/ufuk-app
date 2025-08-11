// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./(tabs)/theme/ThemeContext";
import { Colors } from "../constants/Colors";
import { View, Platform } from "react-native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

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

  useEffect(() => {
    // Bildirim izinlerini iste
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };

    requestPermissions();

    // Android için kanal ayarla
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // Uygulama açıkken bildirim gösterme ayarları
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,      // Ekranda uyarı göster
        shouldPlaySound: true,      // Ses çal
        shouldSetBadge: false,      // Uygulama ikonu üzerine badge koyma
        shouldShowBanner: true,     // iOS: Bildirim banner'ı göster
        shouldShowList: true,       // iOS: Bildirimi Notification Center'a ekle
      }),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}