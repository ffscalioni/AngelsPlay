import type { Song, Stem } from './types';

/**
 * Catálogo de exemplo (mock). Os áudios apontam para arquivos públicos de demonstração;
 * em produção o streaming virá do S3 via CloudFront com URL assinada (ver PRD §9).
 *
 * NOTA SOBRE OS STEMS: enquanto a gravadora não confirma/disponibiliza os multitracks reais
 * (spike E6-0), usamos faixas públicas como "vozes" de demonstração — elas provam o MOTOR de
 * ensaio (tocar várias faixas em sincronia e ligar/desligar cada voz), não a mixagem musical.
 */
const demoStems: Stem[] = [
  { id: 'inst', label: 'Instrumental', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 'soprano', label: 'Soprano', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 'contralto', label: 'Contralto', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 'tenor', label: 'Tenor', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: 'baixo', label: 'Baixo', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
];

export const catalog: Song[] = [
  {
    id: 's1',
    title: 'Águas Profundas',
    artist: 'Ministério AngelsPlay',
    cover: 'https://picsum.photos/seed/aguas/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    earlyAccess: true,
    projectId: 'p1',
    stems: demoStems,
  },
  {
    id: 's2',
    title: 'Rocha Eterna',
    artist: 'Ministério AngelsPlay',
    cover: 'https://picsum.photos/seed/rocha/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    earlyAccess: true,
    projectId: 'p3',
    stems: demoStems,
  },
  {
    id: 's3',
    title: 'Luz do Caminho',
    artist: 'Coral Esperança',
    cover: 'https://picsum.photos/seed/luz/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    stems: demoStems,
  },
  {
    id: 's4',
    title: 'Graça que me Alcançou',
    artist: 'Ministério AngelsPlay',
    cover: 'https://picsum.photos/seed/graca/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 's5',
    title: 'Aurora de um Novo Dia',
    artist: 'Adoração Viva',
    cover: 'https://picsum.photos/seed/aurora/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 's6',
    title: 'Santo És Tu',
    artist: 'Coral Esperança',
    cover: 'https://picsum.photos/seed/santo/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    stems: demoStems,
  },
];

export function getSong(id?: string): Song | undefined {
  return catalog.find((s) => s.id === id);
}
