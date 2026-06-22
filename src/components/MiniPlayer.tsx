import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { usePlayer } from '@/context/PlayerContext';
import { colors, spacing } from '@/theme/colors';

/** Barra fixa de reprodução exibida acima das abas quando há música tocando. */
export function MiniPlayer() {
  const { current, isPlaying, toggle, position, duration } = usePlayer();
  const router = useRouter();

  if (!current) return null;

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/musica/[id]', params: { id: current.id } })}
      style={styles.container}>
      <ProgressBar
        value={duration > 0 ? position / duration : 0}
        color={colors.primary}
        height={2}
      />
      <View style={styles.row}>
        <Image source={{ uri: current.cover }} style={styles.cover} contentFit="cover" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {current.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {current.artist}
          </Text>
        </View>
        <Pressable
          hitSlop={12}
          onPress={(e) => {
            e.stopPropagation();
            toggle();
          }}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={26} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  cover: { width: 44, height: 44, borderRadius: 8, backgroundColor: colors.surfaceAlt },
  info: { flex: 1 },
  title: { color: colors.text, fontWeight: '600', fontSize: 14 },
  artist: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
});
