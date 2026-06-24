import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { usePlayer } from '@/context/PlayerContext';
import { songHasStems, type Song } from '@/data/types';
import { colors, radius, spacing } from '@/theme/colors';

export function SongRow({ song }: { song: Song }) {
  const { play, current, isPlaying } = usePlayer();
  const isCurrent = current?.id === song.id;

  return (
    <Pressable style={styles.row} onPress={() => play(song)}>
      <Image source={{ uri: song.cover }} style={styles.cover} contentFit="cover" />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, isCurrent && { color: colors.accent }]}
            numberOfLines={1}>
            {song.title}
          </Text>
          {song.earlyAccess && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1ª mão</Text>
            </View>
          )}
        </View>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
          {songHasStems(song) ? '  ·  vozes p/ ensaio' : ''}
        </Text>
      </View>
      <Ionicons
        name={isCurrent && isPlaying ? 'pause-circle' : 'play-circle'}
        size={32}
        color={isCurrent ? colors.accent : colors.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
  },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { color: colors.text, fontWeight: '600', fontSize: 15, flexShrink: 1 },
  artist: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  badge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: { color: colors.text, fontSize: 10, fontWeight: '700' },
});
