import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "./theme/ThemeContext";
import { Colors } from "../../constants/Colors";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const initialAnnouncements = [
  { id: "1", title: "📢 Matematik Sınavı", content: "Yarın saat 10:00’da yapılacaktır.", read: false, sender: "Prof. Dr. Ahmet Yılmaz", date: "2025-08-12 09:00" },
  { id: "2", title: "📢 Fizik Dersi İptal", content: "Bugünkü ders hava muhalefeti nedeniyle iptal edildi.", read: true,  sender: "Doç. Dr. Elif Kaya",        date: "2025-08-10 14:30" },
  { id: "3", title: "📢 Yeni Kütüphane Kuralları", content: "Kütüphane kurallarında değişiklik yapıldı. Lütfen okuyunuz.", read: false, sender: "Kütüphane Müdürü", date: "2025-08-09 11:00" },
  { id: "4", title: "📢 Yaz Okulu Başvuruları", content: "Yaz okulu başvuruları başladı. Son tarih 30 Haziran.", read: true, sender: "Öğrenci İşleri", date: "2025-06-01 08:00" },
];

export default function AnnouncementsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const router = useRouter();

  const markAsRead = (id: string) => {
    setAnnouncements(prev => prev.map(it => it.id === id ? { ...it, read: true } : it));
  };

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener(n => {
      const data = n.request.content.data as { id?: string; sender?: string; date?: string };
      const newId = data?.id || Date.now().toString();

      setAnnouncements(prev => [{
        id: newId,
        title: n.request.content.title || "Yeni Duyuru",
        content: n.request.content.body || "",
        sender: data?.sender || "Bilinmeyen",
        date: data?.date || new Date().toISOString(),
        read: false,
      }, ...prev]);
    });
    return () => sub.remove();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>📢Hocalardan Duyurular</Text>
        <Text style={[styles.headerSub, { color: colors.headerSubText }]}>Güncel bildirimleri burada bulabilirsiniz</Text>
      </LinearGradient>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              markAsRead(item.id);
              router.push({
                pathname: "/announcement_details",
                // SADECE string parametreler gönder!
                params: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                  sender: item.sender,
                  date: item.date, // "YYYY-MM-DD HH:mm" veya ISO string
                },
              });
            }}
          >
            <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.titleRow}>
                {!item.read && <View style={styles.unreadDot} />}
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              </View>
              <Text style={[styles.content, { color: colors.subText }]} numberOfLines={1}>
                {item.content}
              </Text>
            </View>
          </TouchableOpacity>
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
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  headerSub: { fontSize: 14, marginTop: 5 },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#007AFF", marginRight: 8 },
  title: { fontSize: 16, fontWeight: "bold", flexShrink: 1 },
  content: { fontSize: 14, marginTop: 2, lineHeight: 18 },
});