import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useStemsEngine } from '@/audio/useStemsEngine';
import { usePlayer } from '@/context/PlayerContext';
import { songHasStems, type Song } from '@/data/types';
import { formatTime } from '@/lib/format';
import { colors, radius, spacing } from '@/theme/colors';

/**
 * Painel "Modo Ensaio" — vozes isoladas (stems) funcionando de verdade.
 * Só monta o motor de áudio quando o usuário é assinante e a música tem stems.
 */
export function RehearsalPanel({
  song,
  isPremium,
  onRequirePremium,
}: {
  song: Song;
  isPremium: boolean;
  onRequirePremium: (feature: string) => void;
}) {
  const hasStems = songHasStems(song);
  const { pause: pauseMain } = usePlayer();

  // Motor só recebe as faixas quando pode tocar (assinante + música com stems).
  const engine = useStemsEngine(isPremium && hasStems ? song.stems : undefined);

  const startOrToggle = () => {
    if (!engine.isPlaying) pauseMain(); // evita áudio dobrado com o player normal
    engine.toggle();
  };

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Ionicons name="people" size={20} color={colors.accent} />
          <Text style={styles.title}>Modo Ensaio — vozes</Text>
        </View>
        {!isPremium && (
          <View style={styles.premiumTag}>
            <Ionicons name="lock-closed" size={12} color={colors.bg} />
            <Text style={styles.premiumTagText}>Premium</Text>
          </View>
        )}
      </View>

      {!hasStems ? (
        <Text style={styles.muted}>Esta faixa ainda não tem vozes separadas para ensaio.</Text>
      ) : !isPremium ? (
        <Pressable
          style={styles.lockedCta}
          onPress={() => onRequirePremium('Vozes isoladas para ensaio')}>
          <Text style={styles.lockedText}>
            Ensaie com as vozes separadas (Soprano, Contralto, Tenor, Baixo). Disponível no plano
            Premium — toque para saber mais.
          </Text>
        </Pressable>
      ) : (
        <View style={{ gap: spacing.md }}>
          <View style={styles.transport}>
            <Pressable style={styles.playBtn} onPress={startOrToggle}>
              <Ionicons name={engine.isPlaying ? 'pause' : 'play'} size={24} color={colors.text} />
            </Pressable>
            <Text style={styles.time}>
              {formatTime(engine.position)} / {formatTime(engine.duration)}
            </Text>
            {!engine.ready && <Text style={styles.muted}>carregando faixas…</Text>}
          </View>

          <Text style={styles.label}>Toque para ligar/desligar cada voz ao vivo:</Text>
          <View style={styles.voices}>
            {engine.controls.map((c) => {
              const on = !c.muted;
              return (
                <Pressable
                  key={c.id}
                  style={[styles.voice, on && styles.voiceOn]}
                  onPress={() => engine.toggleStem(c.id)}
                  onLongPress={() => engine.soloStem(c.id)}>
                  <Ionicons
                    name={on ? 'volume-high' : 'volume-mute'}
                    size={14}
                    color={on ? colors.bg : colors.textMuted}
                  />
                  <Text style={[styles.voiceText, on && { color: colors.bg }]}>{c.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.action} onPress={engine.enableAll}>
              <Text style={styles.actionText}>Mixagem completa</Text>
            </Pressable>
            <Text style={styles.hint}>Dica: segure uma voz para ouvir só ela.</Text>
          </View>

          <Text style={styles.note}>
            * Faixas de demonstração enquanto os multitracks reais não são confirmados (spike
            E6-0). O motor de sincronia e mute por voz já é real.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700' },
  muted: { color: colors.textMuted, fontSize: 13 },
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
  lockedCta: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  lockedText: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  transport: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: { color: colors.text, fontSize: 14, fontWeight: '600' },
  label: { color: colors.textMuted, fontSize: 13 },
  voices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  voice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  voiceOn: { backgroundColor: colors.accent },
  voiceText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  action: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  actionText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  hint: { color: colors.textMuted, fontSize: 11, flexShrink: 1, textAlign: 'right' },
  note: { color: colors.textMuted, fontSize: 11, fontStyle: 'italic' },
});
