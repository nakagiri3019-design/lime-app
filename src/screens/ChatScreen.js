import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '../components/MessageBubble';
import {
  BackChevron, SearchIcon, PhoneIcon, MenuDotsIcon,
  PlusCircleSmall, CameraIcon, GalleryIcon, MicIcon, SmileIcon,
} from '../components/Icons';
import { DAYS, AUTO_REPLIES } from '../data/conversation';

function buildItems(days, extraMessages) {
  const items = [];
  days.forEach((day, di) => {
    items.push({ type: 'date', id: `date-${di}`, date: day.date });
    day.messages.forEach((msg, mi) => {
      const showAvatar = msg.from !== 'me' && (mi === 0 || day.messages[mi - 1].from !== 'them');
      items.push({ type: 'msg', id: `m-${di}-${mi}`, message: msg, showAvatar, dateKey: day.date });
    });
  });
  extraMessages.forEach((msg, i) => {
    items.push({ type: 'msg', id: `extra-${i}`, message: msg, showAvatar: msg.from !== 'me', dateKey: null });
  });
  return items;
}

function VideoCallIcon() {
  return (
    <View style={styles.videoIcon}>
      <View style={[styles.videoEar, { left: 3 }]} />
      <View style={[styles.videoEar, { right: 3 }]} />
      <Text style={styles.videoIconText}>31</Text>
    </View>
  );
}

export default function ChatScreen({ onBack }) {
  const [extraMessages, setExtraMessages] = useState([]);
  const [input, setInput] = useState('');
  const [floatingDate, setFloatingDate] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeTimer = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(() => buildItems(DAYS, extraMessages), [extraMessages]);

  useEffect(() => {
    const t = setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: false });
    }, 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (extraMessages.length > 0) {
      const t = setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
      return () => clearTimeout(t);
    }
  }, [extraMessages.length]);

  const showFloatingDate = useCallback((dateText) => {
    if (!dateText) return;
    setFloatingDate(dateText);
    Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }, 1500);
  }, [fadeAnim]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const dateItem = viewableItems.find((v) => v.item.type === 'date');
    if (dateItem) showFloatingDate(dateItem.item.date);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 10 }).current;

  function sendMsg() {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: true });
    setExtraMessages((prev) => [...prev, { from: 'me', text, time: now }]);
    setInput('');
    setTimeout(() => {
      const t2 = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: true });
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setExtraMessages((prev) => [...prev, { from: 'them', text: reply, time: t2 }]);
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} hitSlop={8}>
          <BackChevron />
        </TouchableOpacity>
        <Text style={styles.chatName}>金</Text>
        <View style={styles.headerIcons}>
          <SearchIcon size={22} color="#333" />
          <PhoneIcon size={22} color="#333" />
          <VideoCallIcon />
          <MenuDotsIcon />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.messagesArea}>
          <Animated.View style={[styles.floatingDate, { opacity: fadeAnim }]} pointerEvents="none">
            <Text style={styles.floatingDateText}>{floatingDate}</Text>
          </Animated.View>
          <FlatList
            ref={listRef}
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContent}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) =>
              item.type === 'date' ? (
                <View style={styles.dateDivider}>
                  <Text style={styles.dateDividerText}>{item.date}</Text>
                </View>
              ) : (
                <MessageBubble message={item.message} showAvatar={item.showAvatar} />
              )
            }
          />
        </View>

        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconBtn}><PlusCircleSmall /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><CameraIcon /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><GalleryIcon /></TouchableOpacity>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.msgInput}
              placeholder="メッセージを入力"
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMsg}
              returnKeyType="send"
            />
            <View style={styles.emojiBtn}><SmileIcon size={20} color="#5f6368" /></View>
          </View>
          <TouchableOpacity style={styles.iconBtn}><MicIcon /></TouchableOpacity>
        </View>

        <View style={styles.aiBar}>
          <View style={styles.aiDot} />
          <Text style={styles.aiBtn}>返信を提案</Text>
          <Text style={styles.aiBtn}>話題を提案</Text>
          <Text style={styles.aiBtn}>ムードを分析</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#8FA7C8' },
  header: {
    backgroundColor: '#8FA7C8', paddingVertical: 12, paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  backBtn: { padding: 2 },
  chatName: { fontWeight: '700', fontSize: 17, flex: 1, color: '#111' },
  headerIcons: { flexDirection: 'row', gap: 18, alignItems: 'center' },
  videoIcon: {
    width: 24, height: 24, borderWidth: 1.8, borderColor: '#333', borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  videoEar: {
    position: 'absolute', top: -4, width: 2, height: 6, backgroundColor: '#333', borderRadius: 1,
  },
  videoIconText: { fontSize: 10, fontWeight: '700', color: '#333', marginTop: 2 },
  messagesArea: { flex: 1, backgroundColor: '#8FA7C8' },
  messagesContent: { paddingHorizontal: 10, paddingVertical: 12 },
  floatingDate: {
    position: 'absolute', top: 8, left: 0, right: 0, alignItems: 'center', zIndex: 10,
  },
  floatingDateText: {
    backgroundColor: 'rgba(100,100,100,0.45)', color: '#fff', fontSize: 12,
    paddingVertical: 4, paddingHorizontal: 16, borderRadius: 20, fontWeight: '500', overflow: 'hidden',
  },
  dateDivider: { alignItems: 'center', marginVertical: 10, marginBottom: 14 },
  dateDividerText: {
    backgroundColor: 'rgba(100,100,100,0.35)', color: '#fff', fontSize: 12,
    paddingVertical: 4, paddingHorizontal: 16, borderRadius: 20, fontWeight: '500', overflow: 'hidden',
  },
  inputBar: {
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0',
    paddingVertical: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  iconBtn: { padding: 0 },
  inputWrap: { flex: 1, position: 'relative', justifyContent: 'center' },
  msgInput: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 22, paddingVertical: 9,
    paddingLeft: 14, paddingRight: 38, fontSize: 15, backgroundColor: '#fafafa', color: '#111',
  },
  emojiBtn: { position: 'absolute', right: 10, alignItems: 'center', justifyContent: 'center' },
  aiBar: {
    backgroundColor: '#ececec', borderTopWidth: 1, borderTopColor: '#ddd',
    paddingVertical: 7, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  aiDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#7B68EE' },
  aiBtn: { fontSize: 12.5, color: '#555' },
});
