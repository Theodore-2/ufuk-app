import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LessonRequestScreen() {
  // Mock dersler
  type Lesson = {
    id: string;
    name: string;
    teacher: string;
    day: string;
    time: string;
  };

  const lessons: Lesson[] = [
    { id: "1", name: "Matematik", teacher: "Ahmet Hoca", day: "Pazartesi", time: "09:00" },
    { id: "2", name: "Fizik", teacher: "Ayşe Hoca", day: "Salı", time: "11:00" },
    { id: "3", name: "Kimya", teacher: "Mehmet Hoca", day: "Salı", time: "13:00" },
    { id: "4", name: "Biyoloji", teacher: "Ali Hoca", day: "Çarşamba", time: "15:00" },
    { id: "5", name: "Geometri", teacher: "Selin Hoca", day: "Perşembe", time: "10:00" },
  ];

  const days = ["Tümü", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedDay, setSelectedDay] = useState("Tümü");
  const [searchText, setSearchText] = useState("");
  const [requestedLessons, setRequestedLessons] = useState<string[]>([]); // çift talep kontrolü

  const filteredLessons = lessons.filter((lesson) => {
    const matchesDay = selectedDay === "Tümü" || lesson.day === selectedDay;
    const matchesSearch =
      lesson.name.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.time.includes(searchText);
    return matchesDay && matchesSearch;
  });

  const handleRequest = () => {
    if (!selectedLesson) {
      Alert.alert("Hata", "Lütfen bir ders seçin");
      return;
    }
    if (requestedLessons.includes(selectedLesson.id)) {
      Alert.alert("Uyarı", "Bu ders için zaten talep gönderdiniz!");
      return;
    }

    Alert.alert(
      "Onay",
      `"${selectedLesson.name}" dersi için talep oluşturulsun mu?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet",
          onPress: () => {
            setRequestedLessons((prev) => [...prev, selectedLesson.id]);
            Alert.alert("Başarılı", "Talebiniz gönderildi ✅");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.header}>
        <Text style={styles.headerTitle}>📌 Ders Kayıt Talebi</Text>
        <Text style={styles.headerSub}>Mevcut derslerden seçim yapın</Text>
      </LinearGradient>

      {/* Gün Filtresi */}
      <View style={styles.dayFilter}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.dayButtonSelected,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.dayButtonTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Arama */}
      <TextInput
        style={styles.searchInput}
        placeholder="Ders adı, hoca adı veya saat ara..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Ders Listesi */}
      <FlatList
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.lessonItem,
              selectedLesson?.id === item.id && styles.lessonSelected,
            ]}
            onPress={() => setSelectedLesson(item)}
          >
            <Text style={styles.lessonName}>{item.name}</Text>
            <Text style={styles.lessonInfo}>
              {item.teacher} • {item.day} • {item.time}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Talep Gönder Butonu */}
      <TouchableOpacity onPress={handleRequest} style={styles.submitBtn}>
        <LinearGradient colors={["#ff512f", "#dd2476"]} style={styles.submitGradient}>
          <Text style={styles.submitText}>Talebi Gönder</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerSub: { color: "#eee", fontSize: 14, marginTop: 4 },
  dayFilter: { flexDirection: "row", padding: 10, justifyContent: "space-around" },
  dayButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, backgroundColor: "#ddd" },
  dayButtonSelected: { backgroundColor: "#6a11cb" },
  dayButtonText: { fontSize: 12, color: "#333" },
  dayButtonTextSelected: { color: "#fff", fontWeight: "bold" },
  searchInput: { backgroundColor: "#fff", marginHorizontal: 20, padding: 10, borderRadius: 8, marginBottom: 10 },
  lessonItem: { padding: 15, borderRadius: 10, backgroundColor: "#fff", marginBottom: 10 },
  lessonSelected: { borderColor: "#6a11cb", borderWidth: 2 },
  lessonName: { fontSize: 16, fontWeight: "bold" },
  lessonInfo: { fontSize: 12, color: "#666" },
  submitBtn: { margin: 20, borderRadius: 12, overflow: "hidden" },
  submitGradient: { padding: 15, alignItems: "center" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});