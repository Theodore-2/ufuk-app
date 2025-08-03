import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./theme/ThemeContext";


const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme(); // Context'ten tema durumu ve değiştirme fonksiyonu
  const isDark = theme === "dark";

  const upcomingLessons = [
    { id: "1", time: "09:00", title: "Matematik", status: "Aktif" },
    { id: "2", time: "13:00", title: "Fizik", status: "Aktif" },
    { id: "3", time: "15:00", title: "Kimya", status: "İptal" },
    { id: "4", time: "17:00", title: "Biyoloji", status: "Aktif" },
    { id: "5", time: "19:00", title: "Tarih", status: "İptal" },
    { id: "6", time: "21:00", title: "Coğrafya", status: "Aktif" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f9f9f9" }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Üst Header */}
        <LinearGradient
          colors={isDark ? ["#232526", "#414345"] : ["#6a11cb", "#2575fc"]}
          style={styles.header}
        >
          <View>
            <Text style={styles.welcomeText}>Merhaba, Arda</Text>
            <Text style={styles.subText}>Bugün 3 dersin var</Text>
          </View>

          {/* Tema Değiştir Butonu */}
          <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
            <Text style={{ fontSize: 20 }}>{isDark ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Hızlı Erişim Kartları */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
            onPress={() => router.push("/schedule")}
          >
            <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>Ders Programım</Text>
            <Text style={[styles.cardSub, { color: isDark ? "#aaa" : "#555" }]}>Günlük planı görüntüle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
            onPress={() => router.push("/lesson_request")}
          >
            <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>Ders Kayıt Talebi</Text>
            <Text style={[styles.cardSub, { color: isDark ? "#aaa" : "#555" }]}>Yeni ders ekle</Text>
          </TouchableOpacity>
        </View>

        {/* Yaklaşan Dersler */}
        <View style={[styles.lessonSection, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Yaklaşan Dersler</Text>
          <FlatList
            data={upcomingLessons}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={[styles.lessonItem, { backgroundColor: isDark ? "#2a2a2a" : "#fefefe" }]}>
                <Text style={[styles.lessonTime, { color: isDark ? "#bbb" : "#666" }]}>{item.time}</Text>
                <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#000" }]}>{item.title}</Text>
                <Text
                  style={[
                    styles.lessonStatus,
                    item.status === "Aktif"
                      ? { color: "green" }
                      : { color: "red" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: height * 0.18,
    paddingHorizontal: 20,
    paddingTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  subText: { color: "#eee", fontSize: 14, marginTop: 4 },
  themeButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -height * 0.04,
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.42,
    height: height * 0.08,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  cardSub: { fontSize: 12 },
  lessonSection: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 1,
    elevation: 1,
  },
  lessonTime: { fontSize: 14 },
  lessonTitle: { fontSize: 14, fontWeight: "500" },
  lessonStatus: { fontSize: 14, fontWeight: "bold" },
});