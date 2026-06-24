import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  AudioPlayer,
  createAudioPlayer,
  setAudioModeAsync,
} from 'expo-audio';

import type { Song } from '@/data/types';

/**
 * Player de áudio global, compartilhado entre o mini-player e a tela cheia.
 * Usa a API imperativa do expo-audio (createAudioPlayer) para manter UMA instância
 * viva enquanto o usuário navega. Em produção a `audioUrl` será uma URL assinada do
 * CloudFront (ver PRD §9).
 */
type PlayerState = {
  current: Song | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  play: (song: Song) => void;
  toggle: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<AudioPlayer | null>(null);
  const [current, setCurrent] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Permite tocar com o celular no silencioso e em segundo plano.
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
    }).catch(() => {});
  }, []);

  // Atualiza posição/duração periodicamente para a UI.
  useEffect(() => {
    const id = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      setPosition(p.currentTime ?? 0);
      setDuration(p.duration ?? 0);
      setIsPlaying(p.playing);
    }, 500);
    return () => clearInterval(id);
  }, []);

  // Libera o player ao desmontar o app.
  useEffect(() => {
    return () => {
      playerRef.current?.remove();
      playerRef.current = null;
    };
  }, []);

  const value = useMemo<PlayerState>(() => {
    const play = (song: Song) => {
      const source = { uri: song.audioUrl };
      if (!playerRef.current) {
        playerRef.current = createAudioPlayer(source);
      } else {
        playerRef.current.replace(source);
      }
      playerRef.current.play();
      setCurrent(song);
      setIsPlaying(true);
      setPosition(0);
    };

    const toggle = () => {
      const p = playerRef.current;
      if (!p) return;
      if (p.playing) {
        p.pause();
        setIsPlaying(false);
      } else {
        p.play();
        setIsPlaying(true);
      }
    };

    const pause = () => {
      const p = playerRef.current;
      if (p && p.playing) {
        p.pause();
        setIsPlaying(false);
      }
    };

    const seekTo = (seconds: number) => {
      playerRef.current?.seekTo(seconds).catch(() => {});
      setPosition(seconds);
    };

    return { current, isPlaying, position, duration, play, toggle, pause, seekTo };
  }, [current, isPlaying, position, duration]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer deve ser usado dentro de <PlayerProvider>');
  return ctx;
}
