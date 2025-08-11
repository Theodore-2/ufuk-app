import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./(tabs)/theme/ThemeContext";
import { Colors } from "../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function AnnouncementDetailsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];
  const { title, content, sender, date } = useLocalSearchParams();
  const router = useRouter();

  // Tarih formatlama
  let formattedDate = "";
  let formattedTime = "";
  if (date) {
    const d = new Date(date as string);
    formattedDate = d.toLocaleDateString("tr-TR"); // gün.ay.yıl
    formattedTime = d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.headerText} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.headerText }]} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: colors.headerSubText }]}>{sender}</Text>
            <Text style={[styles.metaText, { color: colors.headerSubText }]}>
              {formattedDate} {formattedTime}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        <Text style={[styles.content, { color: colors.text }]}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: height * 0.15,
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});