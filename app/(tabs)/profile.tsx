// app/(tabs)/profile.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, Switch, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");
const STORAGE_KEY_NOTIFS = "notificationsEnabled";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];
  const router = useRouter();

  const [notifEnabled, setNotifEnabled] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem(STORAGE_KEY_NOTIFS);
      if (v === "true" || v === "false") setNotifEnabled(v === "true");
    })();
  }, []);

  const toggleNotifs = async (val: boolean) => {
    setNotifEnabled(val);
    await AsyncStorage.setItem(STORAGE_KEY_NOTIFS, val ? "true" : "false");
  };

  const student = {
    name: "Arda Çimen",
    phone: "+90 555 123 4567",
    studentNo: "202100123",
    lessons: [
      { id: "1", name: "Matematik I" },
      { id: "2", name: "Fizik II" },
      { id: "3", name: "Programlama Temelleri" },
      { id: "4", name: "Veri Tabanı Yönetim Sistemleri" },
    ],
    debt: 1250,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        <Text style={[styles.name, { color: colors.headerText }]}>{student.name}</Text>
        <Text style={[styles.subText, { color: colors.headerSubText }]}>Öğrenci No: {student.studentNo}</Text>
        <Text style={[styles.subText, { color: colors.headerSubText }]}>{student.phone}</Text>
      </LinearGradient>

      {/* Bildirim ayarı */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.row}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Bildirimler</Text>
          <Switch value={notifEnabled} onValueChange={toggleNotifs} />
        </View>
        <Text style={{ color: colors.subText, marginTop: 4, fontSize: 12 }}>
          Duyurular geldiğinde cihaz bildirimleri {notifEnabled ? "açık" : "kapalı"}.
        </Text>
      </View>

      {/* Aldığı Dersler */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Aldığı Dersler</Text>
        <FlatList
          data={student.lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonItem}>
              <Text style={[styles.lessonText, { color: colors.text }]}>• {item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* Borç Durumu -> TIKLANINCA Detay Sayfası */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Borç Durumu</Text>
        <TouchableOpacity
          onPress={() => router.push("/debt_details")}
          style={[
            styles.debtBox,
            { backgroundColor: theme === "light" ? "#ffe6e6" : "#662222" },
          ]}
        >
          <Text style={styles.debtText}>{student.debt} TL</Text>
          <Text style={{ color: colors.subText, marginTop: 6, fontSize: 12 }}>
            Detay için dokun
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: height * 0.18,
    paddingHorizontal: 20,
    paddingTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: { fontSize: 28, fontWeight: "bold", marginBottom: 5 },
  subText: { fontSize: 14 },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  lessonItem: { paddingVertical: 5 },
  lessonText: { fontSize: 16 },
  debtBox: { padding: 15, borderRadius: 8, alignItems: "center" },
  debtText: { fontSize: 20, fontWeight: "bold", color: "#cc0000" },
});