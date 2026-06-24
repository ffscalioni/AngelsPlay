/** Uma faixa isolada (voz/instrumento) de uma música, para o Modo Ensaio. */
export type Stem = {
  id: string;
  label: string;
  url: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
  /** Disponível antes do público geral apenas para doadores/assinantes. */
  earlyAccess?: boolean;
  /** Projeto de crowdfunding ao qual a música pertence. */
  projectId?: string;
  /** Faixas separadas (stems) para ensaio. Presente apenas em títulos com multitrack. */
  stems?: Stem[];
};

/** Conveniência: a música possui faixas separadas para ensaio? */
export function songHasStems(song: Song): boolean {
  return !!song.stems && song.stems.length > 0;
}

export type ProjectUpdate = {
  date: string;
  title: string;
  body: string;
};

export type Project = {
  id: string;
  title: string;
  type: 'musica' | 'missao';
  cover: string;
  summary: string;
  description: string;
  /** Meta em centavos para evitar problemas de ponto flutuante. */
  goalCents: number;
  raisedCents: number;
  supporters: number;
  updates: ProjectUpdate[];
};

export type Video = {
  id: string;
  title: string;
  category: 'Gravações' | 'Podcast' | 'Programação';
  thumbnail: string;
  duration: string;
  premium: boolean;
};
