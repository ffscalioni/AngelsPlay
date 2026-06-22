import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { colors, radius, spacing } from '@/theme/colors';

function Benefit({ text, on }: { text: string; on: boolean }) {
  return (
    <View style={styles.benefit}>
      <Ionicons
        name={on ? 'checkmark-circle' : 'lock-closed'}
        size={18}
        color={on ? colors.success : colors.textMuted}
      />
      <Text style={[styles.benefitText, !on && { color: colors.textMuted }]}>{text}</Text>
    </View>
  );
}

export default function PerfilScreen() {
  const { isPremium, isSupporter, togglePremium } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: insets.bottom + 120, gap: spacing.lg }}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color={colors.text} />
        </View>
        <View>
          <Text style={styles.name}>Visitante</Text>
          <Text style={styles.email}>
            {isPremium ? 'Plano Premium ativo' : 'Plano Gratuito'}
            {isSupporter ? ' · Apoiador' : ''}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Plano Premium</Text>
        <Text style={styles.cardSubtitle}>
          Recursos avançados de ensaio e conteúdo exclusivo. A doação aos projetos continua
          disponível em qualquer plano.
        </Text>
        <View style={{ gap: spacing.sm, marginVertical: spacing.sm }}>
          <Benefit text="Mudar a tonalidade e remover a voz-guia" on={isPremium} />
          <Benefit text="Vozes isoladas (stems) para ensaio" on={isPremium} />
          <Benefit text="Vídeos e programação exclusivos" on={isPremium} />
          <Benefit text="Ouvir o catálogo e doar para projetos" on={true} />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            {isPremium ? 'Premium ativo (demo)' : 'Ativar Premium (demo)'}
          </Text>
          <Switch
            value={isPremium}
            onValueChange={togglePremium}
            trackColor={{ true: colors.primary, false: colors.surfaceAlt }}
            thumbColor={colors.text}
          />
        </View>
        <Text style={styles.note}>
          * No esqueleto, o botão simula a assinatura. Em produção, a cobrança recorrente
          passa pelo gateway de pagamento (PRD §9).
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meus apoios</Text>
        {isSupporter ? (
          <Text style={styles.cardSubtitle}>
            Obrigado por apoiar! Você tem acesso antecipado aos lançamentos. 💜
          </Text>
        ) : (
          <Text style={styles.cardSubtitle}>
            Você ainda não doou. Visite a aba Projetos e apoie uma música ou missão.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  email: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  cardSubtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  benefitText: { color: colors.text, fontSize: 14, flex: 1 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  toggleLabel: { color: colors.text, fontWeight: '600' },
  note: { color: colors.textMuted, fontSize: 11, marginTop: spacing.sm, fontStyle: 'italic' },
});
