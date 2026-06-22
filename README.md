# AngelsPlay

Aplicativo de **streaming + crowdfunding** para gravadora e projetos missionários de uma
organização evangélica do terceiro setor, em parceria com um canal de TV filantrópico.

> **Status:** Discovery / Definição do MVP. Ainda sem código de produção.

## O que é

AngelsPlay combina três motores em um único app mobile (iOS + Android):

1. **Streaming de áudio** — catálogo da gravadora (hospedado em AWS S3), entregue via CDN.
2. **Streaming de vídeo** — gravações, podcasts e programação reaproveitados do canal de TV.
3. **Crowdfunding** — doação avulsa e recorrente para projetos de música e missões,
   com acesso antecipado para quem apoia.

Modelo **freemium**: parte gratuita aberta a todos, recursos premium para **assinantes**,
e **doação disponível para assinantes e não assinantes**.

### Diferenciais (oceano azul)

- **Vozes isoladas (stems)** para ensaio de grupos de louvor.
- **Mudança de tonalidade e remoção de voz-guia** (playback para cantar na igreja local).
- **Acesso antecipado** a singles e projetos para doadores.
- **Transparência de prestação de contas** — pilar de confiança no meio evangélico.

## Documentação

- [`docs/PRD-MVP.md`](docs/PRD-MVP.md) — Documento de Requisitos do Produto (visão, personas,
  modelo de negócio, escopo, métricas, riscos).
- [`docs/BACKLOG-MVP.md`](docs/BACKLOG-MVP.md) — Épicos e user stories priorizadas com critérios de aceite.

## Decisões já tomadas

| Tema | Decisão |
|---|---|
| Primeiro entregável | PRD + Backlog do MVP |
| Plataforma | App mobile nativo/multiplataforma (iOS + Android) |
| Stems (multitracks) | **A confirmar** com a gravadora — backlog cobre os dois cenários |

## Princípios de arquitetura

Serverless + pré-processamento + CDN. Não manter servidores ligados 24/7 — é dinheiro de doação.
Detalhes na seção de arquitetura do PRD.
