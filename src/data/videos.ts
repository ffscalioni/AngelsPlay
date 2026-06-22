import type { Video } from './types';

/** Vídeos de exemplo (mock). Em produção: VOD em HLS via CloudFront (ver PRD §9). */
export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Bastidores da gravação de "Águas Profundas"',
    category: 'Gravações',
    thumbnail: 'https://picsum.photos/seed/bastidores/600/340',
    duration: '08:12',
    premium: false,
  },
  {
    id: 'v2',
    title: 'Podcast: Adoração na vida cotidiana',
    category: 'Podcast',
    thumbnail: 'https://picsum.photos/seed/podcast/600/340',
    duration: '42:05',
    premium: false,
  },
  {
    id: 'v3',
    title: 'Relato da Missão Norte — primeira viagem',
    category: 'Programação',
    thumbnail: 'https://picsum.photos/seed/relato/600/340',
    duration: '15:30',
    premium: false,
  },
  {
    id: 'v4',
    title: 'Programa especial (exclusivo para assinantes)',
    category: 'Programação',
    thumbnail: 'https://picsum.photos/seed/especial/600/340',
    duration: '53:20',
    premium: true,
  },
  {
    id: 'v5',
    title: 'Masterclass de louvor congregacional',
    category: 'Programação',
    thumbnail: 'https://picsum.photos/seed/masterclass/600/340',
    duration: '31:47',
    premium: true,
  },
];
