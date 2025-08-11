// app/debt_details.tsx
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./(tabs)/theme/ThemeContext";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const dummyDebtDetails = [
  { id: "1", lesson: "Matematik I", amount: 500 },
  { id: "2", lesson: "Veri Tabanı Yönetim Sistemleri", amount: 750 },
];

export default function DebtDetailsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];
  const router = useRouter();

  const totalDebt = dummyDebtDetails.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        {/* Back Button */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.headerText} />
        </Pressable>

        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Borç Detayları</Text>
        <Text style={[styles.headerSub, { color: colors.headerSubText }]}>
          Ders bazında borç bilgisi
        </Text>
      </LinearGradient>

      {/* Debt List */}
      <FlatList
        data={dummyDebtDetails}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.debtCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.lessonName, { color: colors.text }]}>{item.lesson}</Text>
            <Text style={styles.amount}>{item.amount} TL</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={[
              styles.totalBox,
              { backgroundColor: theme === "light" ? "#ffe6e6" : "#662222" },
            ]}
          >
            <Text style={styles.totalText}>Toplam: {totalDebt} TL</Text>
          </View>
        )}
      />
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
  backButton: {
    position: "absolute",
    top: height * 0.04,
    left: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerSub: {
    fontSize: 14,
    marginTop: 5,
  },
  debtCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonName: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cc0000",
  },
  totalBox: {
    padding: 18,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cc0000",
  },
});