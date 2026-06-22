import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { colors, spacing } from '@/theme/colors';

export default function ProjetosScreen() {
  const insets = useSafeAreaInsets();
  return (
    <FlatList
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{
        padding: spacing.md,
        paddingBottom: insets.bottom + 120,
        gap: spacing.md,
      }}
      data={projects}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => <ProjectCard project={item} />}
      ListHeaderComponent={
        <View style={{ marginBottom: spacing.xs }}>
          <Text style={styles.subtitle}>
            Doe para músicas e missões. Quem apoia ouve os lançamentos em primeira mão.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
});
