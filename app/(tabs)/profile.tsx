// app/(tabs)/profile.tsx
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function ProfileScreen() {
  const { theme } = useTheme();

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
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <LinearGradient
        colors={[Colors[theme].tint, Colors[theme].icon]}
        style={styles.header}
      >
        <Text style={[styles.name, { color: Colors[theme].text }]}>{student.name}</Text>
        <Text style={[styles.subText, { color: Colors[theme].placeholder }]}>
          Öğrenci No: {student.studentNo}
        </Text>
        <Text style={[styles.subText, { color: Colors[theme].placeholder }]}>
          {student.phone}
        </Text>
      </LinearGradient>

      <View style={[styles.section, { backgroundColor: Colors[theme].card }]}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Aldığı Dersler</Text>
        <FlatList
          data={student.lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonItem}>
              <Text style={[styles.lessonText, { color: Colors[theme].text }]}>
                • {item.name}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={[styles.section, { backgroundColor: Colors[theme].card }]}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Borç Durumu</Text>
        <View style={[
          styles.debtBox,
          { backgroundColor: theme === "light" ? "#ffe6e6" : "#662222" }
        ]}>
          <Text style={styles.debtText}>{student.debt} TL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60, // ⬅️ Arttırarak aşağı kaydır
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
  },
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
  },
  debtBox: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  debtText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#cc0000",
  },
});