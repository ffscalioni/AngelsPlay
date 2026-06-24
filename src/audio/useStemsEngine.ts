import { useEffect, useRef, useState } from 'react';
import { AudioPlayer, createAudioPlayer } from 'expo-audio';

import type { Stem } from '@/data/types';

export type StemControl = {
  id: string;
  label: string;
  muted: boolean;
};

/**
 * Motor de ensaio: toca VÁRIAS faixas (stems) de uma mesma música ao mesmo tempo e permite
 * ligar/desligar cada voz ao vivo. Mantém todas as faixas rodando em paralelo e apenas
 * silencia (mute) as que o usuário não quer — assim as vozes não saem de sincronia ao
 * alternar. Cada faixa é um AudioPlayer independente do expo-audio.
 *
 * Em produção, a sincronia será de precisão (engine multitrack único ou relógio comum) e os
 * stems virão do S3 via CloudFront (ver docs/SPIKE-STEMS.md e PRD §9).
 */
export function useStemsEngine(stems: Stem[] | undefined) {
  const playersRef = useRef<Record<string, AudioPlayer>>({});
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controls, setControls] = useState<StemControl[]>([]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Cria um player por faixa. Por padrão, só o Instrumental (índice 0) começa audível.
  useEffect(() => {
    if (!stems || stems.length === 0) {
      setReady(false);
      return;
    }
    const players: Record<string, AudioPlayer> = {};
    stems.forEach((s, i) => {
      const p = createAudioPlayer({ uri: s.url });
      p.muted = i !== 0;
      players[s.id] = p;
    });
    playersRef.current = players;
    setControls(stems.map((s, i) => ({ id: s.id, label: s.label, muted: i !== 0 })));
    setReady(true);

    return () => {
      Object.values(players).forEach((p) => {
        try {
          p.remove();
        } catch {
          // player já liberado
        }
      });
      playersRef.current = {};
      setReady(false);
      setIsPlaying(false);
    };
  }, [stems]);

  // Atualiza posição/estado a partir da primeira faixa (referência de tempo).
  useEffect(() => {
    const id = setInterval(() => {
      const first = Object.values(playersRef.current)[0];
      if (!first) return;
      setPosition(first.currentTime ?? 0);
      setDuration(first.duration ?? 0);
      setIsPlaying(first.playing);
    }, 400);
    return () => clearInterval(id);
  }, []);

  const playAll = () => {
    Object.values(playersRef.current).forEach((p) => p.play());
    setIsPlaying(true);
  };

  const pauseAll = () => {
    Object.values(playersRef.current).forEach((p) => p.pause());
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pauseAll() : playAll());

  /** Liga/desliga uma voz mantendo todas tocando em sincronia. */
  const toggleStem = (stemId: string) => {
    const p = playersRef.current[stemId];
    if (!p) return;
    p.muted = !p.muted;
    setControls((prev) =>
      prev.map((c) => (c.id === stemId ? { ...c, muted: p.muted } : c)),
    );
  };

  /** Deixa só uma voz audível (ex.: "ouvir só a minha voz" — ensaio individual). */
  const soloStem = (stemId: string) => {
    Object.entries(playersRef.current).forEach(([id, p]) => {
      p.muted = id !== stemId;
    });
    setControls((prev) => prev.map((c) => ({ ...c, muted: c.id !== stemId })));
  };

  /** Volta para a mixagem completa (todas as vozes audíveis). */
  const enableAll = () => {
    Object.values(playersRef.current).forEach((p) => {
      p.muted = false;
    });
    setControls((prev) => prev.map((c) => ({ ...c, muted: false })));
  };

  return {
    ready,
    isPlaying,
    controls,
    position,
    duration,
    toggle,
    toggleStem,
    soloStem,
    enableAll,
  };
}
