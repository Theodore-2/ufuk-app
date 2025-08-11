// app/(tabs)/_layout.tsx
import { Tabs, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";

const STORAGE_KEY_ANNS = "announcements";

export default function TabsLayout() {
  const { theme } = useTheme();
  const c = Colors[theme as "light" | "dark"];

  const [badge, setBadge] = useState<number | undefined>(undefined);

  const refreshBadge = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_ANNS);
      if (!raw) { setBadge(undefined); return; }
      const list = JSON.parse(raw) as { read: boolean }[];
      const unread = list.filter(x => !x.read).length;
      setBadge(unread > 0 ? unread : undefined);
    } catch {
      setBadge(undefined);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    refreshBadge();
  }, [refreshBadge]));

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: c.tabIconSelected,
        tabBarInactiveTintColor: c.tabIconDefault,
        tabBarStyle: { backgroundColor: c.background, borderTopWidth: 0 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Anasayfa",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Ders Programı",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lesson_request"
        options={{
          title: "Ders Talebi",
          tabBarIcon: ({ color, size }) => <Ionicons name="create" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: "Duyurular",
          tabBarBadge: badge,
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}