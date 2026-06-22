import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { videos } from '@/data/videos';
import type { Video } from '@/data/types';
import { colors, radius, spacing } from '@/theme/colors';

function VideoCard({ video, locked }: { video: Video; locked: boolean }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        locked
          ? Alert.alert(
              'Conteúdo exclusivo',
              'Este vídeo é exclusivo para assinantes. Ative o plano premium na aba Perfil para assistir.',
            )
          : Alert.alert('Player de vídeo', `(Demo) Reproduzindo: ${video.title}`)
      }>
      <View>
        <Image source={{ uri: video.thumbnail }} style={styles.thumb} contentFit="cover" />
        <View style={styles.duration}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        {locked && (
          <View style={styles.lockOverlay}>
            <Ionicons name="lock-closed" size={28} color={colors.text} />
            <Text style={styles.lockText}>Exclusivo assinantes</Text>
          </View>
        )}
        {!locked && (
          <View style={styles.playIcon}>
            <Ionicons name="play" size={26} color={colors.text} />
          </View>
        )}
      </View>
      <View style={styles.meta}>
        <Text style={styles.category}>{video.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
      </View>
    </Pressable>
  );
}

export default function VideosScreen() {
  const { isPremium } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{
        padding: spacing.md,
        paddingBottom: insets.bottom + 120,
        gap: spacing.md,
      }}
      data={videos}
      keyExtractor={(v) => v.id}
      renderItem={({ item }) => <VideoCard video={item} locked={item.premium && !isPremium} />}
      ListHeaderComponent={
        <Text style={styles.subtitle}>
          Gravações, podcasts e programação. Alguns conteúdos são exclusivos para assinantes.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  subtitle: { color: colors.textMuted, fontSize: 14, marginBottom: spacing.xs },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, overflow: 'hidden' },
  thumb: { width: '100%', height: 190, backgroundColor: colors.surfaceAlt },
  duration: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  durationText: { color: colors.text, fontSize: 11, fontWeight: '600' },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -26,
    marginTop: -26,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(124,58,237,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14,11,22,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  lockText: { color: colors.text, fontWeight: '700' },
  meta: { padding: spacing.md, gap: 4 },
  category: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 15, fontWeight: '600' },
});
