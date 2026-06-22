import type { Song } from './types';

/**
 * Catálogo de exemplo (mock). Os áudios apontam para arquivos públicos de demonstração;
 * em produção o streaming virá do S3 via CloudFront com URL assinada (ver PRD §9).
 */
export const catalog: Song[] = [
  {
    id: 's1',
    title: 'Águas Profundas',
    artist: 'Ministério AngelsPlay',
    cover: 'https://picsum.photos/seed/aguas/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    earlyAccess: true,
    projectId: 'p1',
    hasStems: true,
  },
  {
    id: 's2',
    title: 'Rocha Eterna',
    artist: 'Ministério AngelsPlay',
    cover: 'https://picsum.photos/seed/rocha/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    earlyAccess: true,
    projectId: 'p3',
    hasStems: true,
  },
  {
    id: 's3',
    title: 'Luz do Caminho',
    artist: 'Coral Esperança',
    cover: 'https://picsum.photos/seed/luz/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hasStems: true,
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
    hasStems: true,
  },
];

export function getSong(id?: string): Song | undefined {
  return catalog.find((s) => s.id === id);
}
