import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SongRow } from '@/components/SongRow';
import { catalog } from '@/data/catalog';
import { projects } from '@/data/projects';
import { colors, radius, spacing } from '@/theme/colors';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const destaque = projects[0];

  return (
    <FlatList
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{
        padding: spacing.md,
        paddingBottom: insets.bottom + 120,
        gap: spacing.sm,
      }}
      data={catalog}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => <SongRow song={item} />}
      ListHeaderComponent={
        <View style={{ gap: spacing.lg, marginBottom: spacing.md }}>
          <View>
            <Text style={styles.hello}>Paz do Senhor 🙏</Text>
            <Text style={styles.h1}>Ouça e apoie a missão</Text>
          </View>

          <Pressable
            style={styles.feature}
            onPress={() =>
              router.push({ pathname: '/projeto/[id]', params: { id: destaque.id } })
            }>
            <Image source={{ uri: destaque.cover }} style={styles.featureImg} contentFit="cover" />
            <View style={styles.featureOverlay}>
              <Text style={styles.featureTag}>PROJETO EM DESTAQUE</Text>
              <Text style={styles.featureTitle}>{destaque.title}</Text>
              <Text style={styles.featureSummary} numberOfLines={2}>
                {destaque.summary}
              </Text>
              <View style={styles.cta}>
                <Text style={styles.ctaText}>Apoiar projeto</Text>
              </View>
            </View>
          </Pressable>

          <Text style={styles.section}>Catálogo</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  hello: { color: colors.textMuted, fontSize: 14 },
  h1: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 2 },
  feature: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  featureImg: { width: '100%', height: 180 },
  featureOverlay: { padding: spacing.md, gap: 4 },
  featureTag: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  featureTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  featureSummary: { color: colors.textMuted, fontSize: 13 },
  cta: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  ctaText: { color: colors.text, fontWeight: '700' },
  section: { color: colors.text, fontSize: 18, fontWeight: '700' },
});
