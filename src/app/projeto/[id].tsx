import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { getProject } from '@/data/projects';
import { formatBRL } from '@/lib/format';
import { colors, radius, spacing } from '@/theme/colors';

const SUGGESTIONS = [2000, 5000, 10000, 20000]; // em centavos

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = getProject(id);
  const { markSupporter } = useAuth();

  // Estado local da arrecadação (no esqueleto). Em produção vem da API + webhook do gateway.
  const [raised, setRaised] = useState(project?.raisedCents ?? 0);
  const [supporters, setSupporters] = useState(project?.supporters ?? 0);
  const [amount, setAmount] = useState(SUGGESTIONS[1]);

  if (!project) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Projeto não encontrado.</Text>
      </View>
    );
  }

  const pct = raised / project.goalCents;

  const donate = () => {
    // Simula a confirmação do PIX. Em produção: gera o QR/copia-e-cola e confirma via webhook.
    Alert.alert(
      'Doação confirmada 🎉',
      `Recebemos sua doação de ${formatBRL(amount)} para "${project.title}".\n\n` +
        'Você agora tem acesso antecipado aos lançamentos deste projeto. Que Deus abençoe!',
      [{ text: 'Amém' }],
    );
    setRaised((r) => r + amount);
    setSupporters((s) => s + 1);
    markSupporter();
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <Stack.Screen options={{ title: project.type === 'missao' ? 'Missão' : 'Projeto' }} />

      <Image source={{ uri: project.cover }} style={styles.cover} contentFit="cover" />

      <View style={styles.body}>
        <Text style={styles.title}>{project.title}</Text>

        <ProgressBar value={pct} height={10} />
        <View style={styles.stats}>
          <View>
            <Text style={styles.raised}>{formatBRL(raised)}</Text>
            <Text style={styles.muted}>de {formatBRL(project.goalCents)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.raised}>{Math.round(pct * 100)}%</Text>
            <Text style={styles.muted}>{supporters} apoiadores</Text>
          </View>
        </View>

        <Text style={styles.description}>{project.description}</Text>

        {/* Bloco de doação */}
        <View style={styles.donateBox}>
          <Text style={styles.donateTitle}>Escolha o valor</Text>
          <View style={styles.amounts}>
            {SUGGESTIONS.map((v) => {
              const on = v === amount;
              return (
                <Pressable
                  key={v}
                  style={[styles.amount, on && styles.amountOn]}
                  onPress={() => setAmount(v)}>
                  <Text style={[styles.amountText, on && { color: colors.bg }]}>
                    {formatBRL(v)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.pixBtn} onPress={donate}>
            <Ionicons name="qr-code" size={20} color={colors.text} />
            <Text style={styles.pixText}>Doar {formatBRL(amount)} via PIX</Text>
          </Pressable>
          <Text style={styles.note}>
            Doação aberta a todos. Quem apoia ouve os lançamentos em primeira mão e entra nos
            créditos do projeto.
          </Text>
        </View>

        {/* Prestação de contas / updates */}
        {project.updates.length > 0 && (
          <View style={{ gap: spacing.sm }}>
            <Text style={styles.section}>Atualizações e prestação de contas</Text>
            {project.updates.map((u, i) => (
              <View key={i} style={styles.update}>
                <Text style={styles.updateDate}>{u.date}</Text>
                <Text style={styles.updateTitle}>{u.title}</Text>
                <Text style={styles.updateBody}>{u.body}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  emptyText: { color: colors.textMuted },
  cover: { width: '100%', height: 220, backgroundColor: colors.surfaceAlt },
  body: { padding: spacing.md, gap: spacing.md },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  stats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  raised: { color: colors.success, fontSize: 18, fontWeight: '800' },
  muted: { color: colors.textMuted, fontSize: 13 },
  description: { color: colors.text, fontSize: 14, lineHeight: 21 },
  donateBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  donateTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  amounts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  amount: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  amountOn: { backgroundColor: colors.accent },
  amountText: { color: colors.text, fontWeight: '700' },
  pixBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  pixText: { color: colors.text, fontWeight: '800', fontSize: 15 },
  note: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  section: { color: colors.text, fontSize: 17, fontWeight: '700' },
  update: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 3,
  },
  updateDate: { color: colors.accent, fontSize: 11, fontWeight: '700' },
  updateTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  updateBody: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
