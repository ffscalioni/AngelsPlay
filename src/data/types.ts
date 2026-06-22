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
  /** Indica que o título possui faixas separadas (stems) para ensaio. */
  hasStems?: boolean;
};

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
