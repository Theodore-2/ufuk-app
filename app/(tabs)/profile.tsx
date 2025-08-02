import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
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
    <View style={styles.container}>
      <LinearGradient
        colors={["#4A00E0", "#8E2DE2"]}
        style={styles.header}
      >
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.subText}>Öğrenci No: {student.studentNo}</Text>
        <Text style={styles.subText}>{student.phone}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aldığı Dersler</Text>
        <FlatList
          data={student.lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonItem}>
              <Text style={styles.lessonText}>• {item.name}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Borç Durumu</Text>
        <View style={styles.debtBox}>
          <Text style={styles.debtText}>{student.debt} TL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  lessonItem: {
    paddingVertical: 5,
  },
  lessonText: {
    fontSize: 16,
    color: "#333",
  },
  debtBox: {
    padding: 15,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
    alignItems: "center",
  },
  debtText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#cc0000",
  },
});