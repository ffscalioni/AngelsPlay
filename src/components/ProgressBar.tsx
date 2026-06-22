import { View } from 'react-native';

import { colors, radius } from '@/theme/colors';

/** Barra de progresso simples. `value` entre 0 e 1. */
export function ProgressBar({
  value,
  color = colors.success,
  height = 8,
}: {
  value: number;
  color?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      style={{
        height,
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.pill,
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: radius.pill,
        }}
      />
    </View>
  );
}
