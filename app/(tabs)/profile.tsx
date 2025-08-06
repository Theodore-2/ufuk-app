import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";

const { height } = Dimensions.get("window");

export default function ProfileScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];

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
        <Text style={[styles.subText, { color: colors.headerSubText }]}>
          Öğrenci No: {student.studentNo}
        </Text>
        <Text style={[styles.subText, { color: colors.headerSubText }]}>
          {student.phone}
        </Text>
      </LinearGradient>

      {/* Aldığı Dersler */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Aldığı Dersler</Text>
        <FlatList
          data={student.lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonItem}>
              <Text style={[styles.lessonText, { color: colors.text }]}>
                • {item.name}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Borç Durumu */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Borç Durumu</Text>
        <View
          style={[
            styles.debtBox,
            { backgroundColor: theme === "light" ? "#ffe6e6" : "#662222" },
          ]}
        >
          <Text style={styles.debtText}>{student.debt} TL</Text>
        </View>
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
  name: {
    fontSize: 28,
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