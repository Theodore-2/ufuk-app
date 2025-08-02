import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router"; // 🔹 navigasyon için ekledik


export default function HomeScreen() {
  const upcomingLessons = [
    { id: "1", time: "09:00", title: "Matematik", status: "Aktif" },
    { id: "2", time: "13:00", title: "Fizik", status: "Aktif" },
    { id: "3", time: "15:00", title: "Kimya", status: "İptal" },
  ];

  return (
    <View style={styles.container}>
      {/* Üst Header */}
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Merhaba, Ahmet</Text>
          <Text style={styles.subText}>Bugün 3 dersin var</Text>
        </View>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
      </LinearGradient>

      {/* Hızlı Erişim Kartları */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/schedule")} // 📌 Ders Programım sayfasına git
        >
          <Text style={styles.cardTitle}>Ders Programım</Text>
          <Text style={styles.cardSub}>Günlük planı görüntüle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/lesson_request")} // 📌 Ders Kayıt Talebi sayfasına git
        >
          <Text style={styles.cardTitle}>Ders Kayıt Talebi</Text>
          <Text style={styles.cardSub}>Yeni ders ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Yaklaşan Dersler */}
      <View style={styles.lessonSection}>
        <Text style={styles.sectionTitle}>Yaklaşan Dersler</Text>
        <FlatList
          data={upcomingLessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonItem}>
              <Text style={styles.lessonTime}>{item.time}</Text>
              <Text style={styles.lessonTitle}>{item.title}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    height: 150,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  subText: { color: "#eee", fontSize: 14, marginTop: 4 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "#fff" },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -30,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    width: "45%",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  cardSub: { fontSize: 12, color: "#555" },

  lessonSection: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lessonTime: { fontSize: 14, color: "#666" },
  lessonTitle: { fontSize: 14, fontWeight: "500" },
  lessonStatus: { fontSize: 14, fontWeight: "bold" },
});