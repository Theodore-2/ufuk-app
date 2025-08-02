// app/schedule.tsx
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function ScheduleScreen() {
  const lessons = [
    { id: "1", day: "Pazartesi", time: "09:00", title: "Matematik" },
    { id: "2", day: "Pazartesi", time: "13:00", title: "Fizik" },
    { id: "3", day: "Salı", time: "10:00 - 11.30", title: "Kimya" },
    { id: "4", day: "Çarşamba", time: "11:00", title: "Biyoloji" },
    { id: "5", day: "Perşembe", time: "15:00", title: "Tarih" },
  ];

  return (
    <View style={styles.container}>
      {/* Üst Başlık */}
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.header}>
        <Text style={styles.headerTitle}>📅 Ders Programım</Text>
        <Text style={styles.headerSub}>Tüm haftalık ders planını görüntüle</Text>
      </LinearGradient>

      {/* Liste */}
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.lessonCard}>
            <View>
              <Text style={styles.lessonDay}>{item.day}</Text>
              <Text style={styles.lessonTime}>{item.time}</Text>
            </View>
            <Text style={styles.lessonTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerSub: { color: "#eee", fontSize: 14, marginTop: 4 },

  lessonCard: {
    backgroundColor: "#fff",
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
  lessonDay: { fontSize: 14, fontWeight: "bold", color: "#555" },
  lessonTime: { fontSize: 12, color: "#888" },
  lessonTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
});