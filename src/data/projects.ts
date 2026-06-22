import type { Project } from './types';

/** Dados de exemplo (mock). Em produção virão da API (DynamoDB/Aurora) — ver PRD §9. */
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'EP "Águas Profundas"',
    type: 'musica',
    cover: 'https://picsum.photos/seed/aguas/600',
    summary: 'Novo EP de adoração com 5 canções inéditas.',
    description:
      'Um projeto de cinco canções gravadas com a equipe da gravadora para edificar a igreja. ' +
      'Sua doação cobre estúdio, mixagem e a produção dos videoclipes. Quem apoia ouve os singles primeiro.',
    goalCents: 4000000,
    raisedCents: 2620000,
    supporters: 184,
    updates: [
      {
        date: '2026-05-30',
        title: 'Gravação das vozes concluída',
        body: 'Encerramos a captação das vozes principais. Próximo passo: mixagem.',
      },
      {
        date: '2026-06-15',
        title: 'Primeiro single liberado para apoiadores',
        body: 'O single "Águas Profundas" já está disponível em primeira mão para quem doou. 🎧',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Missão Norte — Ribeirinhos',
    type: 'missao',
    cover: 'https://picsum.photos/seed/missao/600',
    summary: 'Levar música, Bíblias e apoio a comunidades ribeirinhas.',
    description:
      'Uma frente missionária que leva adoração e assistência a comunidades de difícil acesso. ' +
      'Apadrinhe a missão com uma doação mensal e acompanhe os relatos em vídeo de cada viagem.',
    goalCents: 6000000,
    raisedCents: 1875000,
    supporters: 97,
    updates: [
      {
        date: '2026-06-01',
        title: 'Primeira viagem realizada',
        body: 'Visitamos 3 comunidades e distribuímos 120 Bíblias. Veja o vídeo na aba Vídeos.',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Single "Rocha Eterna"',
    type: 'musica',
    cover: 'https://picsum.photos/seed/rocha/600',
    summary: 'Canção congregacional com versão para ensaio (vozes isoladas).',
    description:
      'Single pensado para o louvor congregacional, com faixas separadas (stems) para a equipe ensaiar. ' +
      'Doadores recebem acesso antecipado e o playback em tonalidades alternativas.',
    goalCents: 2500000,
    raisedCents: 2410000,
    supporters: 211,
    updates: [],
  },
];

export function getProject(id?: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
