import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import type { Project } from '@/data/types';
import { formatBRL } from '@/lib/format';
import { colors, radius, spacing } from '@/theme/colors';

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const pct = project.raisedCents / project.goalCents;

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/projeto/[id]', params: { id: project.id } })}>
      <Image source={{ uri: project.cover }} style={styles.cover} contentFit="cover" />
      <View style={styles.body}>
        <View style={styles.tagRow}>
          <View style={[styles.tag, project.type === 'missao' && { backgroundColor: colors.primaryDark }]}>
            <Text style={styles.tagText}>
              {project.type === 'musica' ? '🎵 Música' : '✝️ Missão'}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {project.summary}
        </Text>
        <ProgressBar value={pct} />
        <View style={styles.stats}>
          <Text style={styles.raised}>{formatBRL(project.raisedCents)}</Text>
          <Text style={styles.muted}>
            {Math.round(pct * 100)}% · {project.supporters} apoiadores
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  cover: { width: '100%', height: 150 },
  body: { padding: spacing.md, gap: spacing.sm },
  tagRow: { flexDirection: 'row' },
  tag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  tagText: { color: colors.text, fontSize: 11, fontWeight: '700' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700' },
  summary: { color: colors.textMuted, fontSize: 13 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  raised: { color: colors.success, fontWeight: '800' },
  muted: { color: colors.textMuted, fontSize: 12 },
});
