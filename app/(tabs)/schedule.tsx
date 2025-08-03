// app/schedule.tsx
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function ScheduleScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lessons = [
    { id: "1", day: "Pazartesi", time: "09:00", title: "Matematik" },
    { id: "2", day: "Pazartesi", time: "13:00", title: "Fizik" },
    { id: "3", day: "Salı", time: "10:00 - 11.30", title: "Kimya" },
    { id: "4", day: "Çarşamba", time: "11:00", title: "Biyoloji" },
    { id: "5", day: "Perşembe", time: "15:00", title: "Tarih" },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      {/* Üst Başlık */}
      <LinearGradient
        colors={[Colors[theme].tint, Colors[theme].card]}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: Colors[theme].headerSubText }]}>
          📅 Ders Programım
        </Text>
        <Text
          style={[styles.headerSub, { color: Colors[theme].headerSubText }]}
        >
          Tüm haftalık ders planını görüntüle
        </Text>
      </LinearGradient>

      {/* Liste */}
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.lessonCard,
              { backgroundColor: Colors[theme].card },
            ]}
          >
            <View>
              <Text
                style={[styles.lessonDay, { color: Colors[theme].headerSubText }]}
              >
                {item.day}
              </Text>
              <Text
                style={[styles.lessonTime, { color: Colors[theme].text }]}
              >
                {item.time}
              </Text>
            </View>
            <Text style={[styles.lessonTitle, { color: Colors[theme].text }]}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  headerSub: { fontSize: 14, marginTop: 4 },
  lessonCard: {
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  lessonDay: { fontSize: 14, fontWeight: "bold" },
  lessonTime: { fontSize: 12 },
  lessonTitle: { fontSize: 16, fontWeight: "600" },
});