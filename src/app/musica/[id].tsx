import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { usePlayer } from '@/context/PlayerContext';
import { getSong } from '@/data/catalog';
import { formatTime } from '@/lib/format';
import { colors, radius, spacing } from '@/theme/colors';

const VOICES = ['Instrumental', 'Soprano', 'Contralto', 'Tenor', 'Baixo'];

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isPremium } = useAuth();
  const { current, isPlaying, toggle, play, position, duration, seekTo } = usePlayer();

  const song = getSong(id) ?? current;
  const [semitones, setSemitones] = useState(0);
  const [activeVoices, setActiveVoices] = useState<string[]>(VOICES);

  if (!song) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Música não encontrada.</Text>
      </View>
    );
  }

  const isThis = current?.id === song.id;

  const requirePremium = (feature: string) => {
    Alert.alert(
      'Recurso para assinantes',
      `${feature} está disponível no plano Premium. Ative na aba Perfil.`,
    );
  };

  const toggleVoice = (v: string) => {
    if (!isPremium) return requirePremium('Vozes isoladas');
    setActiveVoices((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  };

  const changeKey = (delta: number) => {
    if (!isPremium) return requirePremium('Mudança de tonalidade');
    setSemitones((s) => Math.max(-6, Math.min(6, s + delta)));
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg, gap: spacing.lg }}>
      <Stack.Screen options={{ title: song.title }} />

      <Image source={{ uri: song.cover }} style={styles.cover} contentFit="cover" />

      <View>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      <View style={{ gap: spacing.xs }}>
        <ProgressBar value={duration > 0 ? position / duration : 0} color={colors.primary} />
        <View style={styles.times}>
          <Text style={styles.time}>{formatTime(position)}</Text>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={() => seekTo(Math.max(0, position - 15))} hitSlop={12}>
          <Ionicons name="play-back" size={30} color={colors.text} />
        </Pressable>
        <Pressable
          style={styles.playBtn}
          onPress={() => (isThis ? toggle() : play(song))}>
          <Ionicons name={isThis && isPlaying ? 'pause' : 'play'} size={36} color={colors.text} />
        </Pressable>
        <Pressable onPress={() => seekTo(position + 15)} hitSlop={12}>
          <Ionicons name="play-forward" size={30} color={colors.text} />
        </Pressable>
      </View>

      {/* Controles premium de ensaio */}
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Modo ensaio</Text>
          {!isPremium && (
            <View style={styles.premiumTag}>
              <Ionicons name="lock-closed" size={12} color={colors.bg} />
              <Text style={styles.premiumTagText}>Premium</Text>
            </View>
          )}
        </View>

        <Text style={styles.panelLabel}>Tonalidade</Text>
        <View style={styles.keyRow}>
          <Pressable style={styles.keyBtn} onPress={() => changeKey(-1)}>
            <Ionicons name="remove" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.keyValue}>
            {semitones > 0 ? `+${semitones}` : semitones} st
          </Text>
          <Pressable style={styles.keyBtn} onPress={() => changeKey(1)}>
            <Ionicons name="add" size={22} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.guideBtn}
            onPress={() =>
              isPremium ? toggleVoice('Soprano') : requirePremium('Remover voz-guia')
            }>
            <Text style={styles.guideText}>Remover voz-guia</Text>
          </Pressable>
        </View>

        <Text style={[styles.panelLabel, { marginTop: spacing.md }]}>
          Vozes {song.hasStems ? '' : '(indisponível nesta faixa)'}
        </Text>
        <View style={styles.voices}>
          {VOICES.map((v) => {
            const on = activeVoices.includes(v) && isPremium;
            return (
              <Pressable
                key={v}
                disabled={!song.hasStems}
                style={[styles.voice, on && styles.voiceOn, !song.hasStems && { opacity: 0.4 }]}
                onPress={() => toggleVoice(v)}>
                <Text style={[styles.voiceText, on && { color: colors.bg }]}>{v}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.note}>
          * No esqueleto, tonalidade e isolamento de vozes são demonstrativos. Em produção, a
          mudança de tom roda no aparelho e as vozes vêm das faixas separadas (stems) — ver PRD §9.
        </Text>
      </View>

      {song.projectId && (
        <Pressable
          style={styles.supportLink}
          onPress={() =>
            router.push({ pathname: '/projeto/[id]', params: { id: song.projectId! } })
          }>
          <Ionicons name="heart" size={18} color={colors.accent} />
          <Text style={styles.supportText}>Apoiar o projeto desta música</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  emptyText: { color: colors.textMuted },
  cover: { width: '100%', aspectRatio: 1, borderRadius: radius.lg, backgroundColor: colors.surfaceAlt },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  artist: { color: colors.textMuted, fontSize: 15, marginTop: 4 },
  times: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: colors.textMuted, fontSize: 12 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xl },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: spacing.sm },
  panelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  panelTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  premiumTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  premiumTagText: { color: colors.bg, fontSize: 11, fontWeight: '800' },
  panelLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  keyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  keyBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyValue: { color: colors.text, fontSize: 16, fontWeight: '700', minWidth: 56, textAlign: 'center' },
  guideBtn: {
    marginLeft: 'auto',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  guideText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  voices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  voice: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  voiceOn: { backgroundColor: colors.accent },
  voiceText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  note: { color: colors.textMuted, fontSize: 11, fontStyle: 'italic', marginTop: spacing.xs },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  supportText: { color: colors.accent, fontWeight: '700' },
});
