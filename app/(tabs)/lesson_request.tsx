import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Alert,
  ListRenderItem,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../(tabs)/theme/ThemeContext";
import { Colors } from "../../constants/Colors";

type Lesson = {
  id: string;
  name: string;
  teacher: string;
  day: string;
  time: string;
};

const { height } = Dimensions.get("window");

export default function LessonRequestScreen() {
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
  const [requestedLessons, setRequestedLessons] = useState<string[]>([]);

  const { theme } = useTheme();
  const colors = Colors[theme as "light" | "dark"];

  const flatListRef = useRef<FlatList<Lesson>>(null);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesDay = selectedDay === "Tümü" || lesson.day === selectedDay;
    const matchesSearch =
      lesson.name.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.time.includes(searchText);
    return matchesDay && matchesSearch;
  });

  const handleRequest = useCallback(() => {
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
  }, [selectedLesson, requestedLessons]);

  const handleLessonSelect = useCallback(
    (lesson: Lesson, index: number) => {
      setSelectedLesson(lesson);
      flatListRef.current?.scrollToIndex({ index, animated: true });
    },
    []
  );

  const renderLesson: ListRenderItem<Lesson> = ({ item, index }) => {
    const isSelected = selectedLesson?.id === item.id;
    return (
      <Pressable
        style={[
          styles.lessonItem,
          { backgroundColor: colors.lessonItemBackground },
          isSelected && {
            borderColor: colors.lessonSelectedBorder,
            borderWidth: 2,
          },
        ]}
        onPress={() => handleLessonSelect(item, index)}
      >
        <Text
          style={[
            styles.lessonName,
            { color: isSelected ? colors.lessonSelectedText : colors.text },
          ]}
        >
          {item.name}
        </Text>
        <Text style={[styles.lessonInfo, { color: colors.subText }]}>
          {item.teacher} • {item.day} • {item.time}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Başlık */}
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.headerText }]}>
            📌 Ders Kayıt Talebi
          </Text>
          <Text style={[styles.headerSub, { color: colors.headerSubText }]}>
            Mevcut derslerden seçim yapın
          </Text>
        </View>
      </LinearGradient>

      {/* Gün Filtresi */}
      <View style={styles.dayFilter}>
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <Pressable
              key={day}
              style={[
                styles.dayButton,
                isSelected && { backgroundColor: colors.daySelectedBackground },
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  { color: isSelected ? colors.daySelectedText : colors.text },
                ]}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Arama */}
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: colors.cardBackground, color: colors.text },
        ]}
        placeholder="Ders adı, hoca adı veya saat ara..."
        placeholderTextColor={colors.subText}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Ders Listesi */}
      <FlatList
        ref={flatListRef}
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={{ color: colors.subText, textAlign: "center", marginTop: 20 }}>
            📭 Aradığınız kriterlere uygun ders bulunamadı.
          </Text>
        }
      />

      {/* Talep Gönder Butonu */}
      <Pressable onPress={handleRequest} style={styles.submitBtn}>
        <LinearGradient colors={colors.headerGradient} style={styles.submitGradient}>
          <Text style={[styles.submitText, { color: colors.headerText }]}>
            Talebi Gönder
          </Text>
        </LinearGradient>
      </Pressable>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  headerSub: { fontSize: 14, marginTop: 5, marginHorizontal: 30 },
  dayFilter: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  dayButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  dayButtonText: { fontSize: 12 },
  searchInput: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  lessonItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonName: { fontSize: 16, fontWeight: "bold" },
  lessonInfo: { fontSize: 12 },
  submitBtn: { margin: 20, borderRadius: 12, overflow: "hidden" },
  submitGradient: { padding: 15, alignItems: "center" },
  submitText: { fontSize: 16, fontWeight: "bold" },
});