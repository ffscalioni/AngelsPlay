# Backlog do MVP — AngelsPlay

**Versão:** 0.1 · **Data:** 2026-06-22 · Complementa o [`PRD-MVP.md`](PRD-MVP.md).

Priorização **MoSCoW**. Estimativa em **pontos de história** (escala Fibonacci, relativa).
Stories marcadas com 🔒 dependem de uma decisão em aberto (ver §12 do PRD).

---

## Mapa de épicos

| Épico | Tema | Prioridade |
|---|---|---|
| E1 | Conta e identidade | Must |
| E2 | Streaming de áudio (catálogo + player) | Must |
| E3 | Projetos e doação | Must |
| E4 | Vídeo (VOD) | Must |
| E5 | Assinatura e freemium | Should |
| E6 | Ensaio: stems e tonalidade | Should/Could |
| E7 | Transparência e impacto | Must |
| E8 | Plataforma e observabilidade | Must (transversal) |

---

## E1 — Conta e identidade  · *Must*

- **E1-1** (3) Como visitante, quero **criar conta** com e-mail/senha para salvar meus dados.
  - *Aceite:* validação de e-mail; senha forte; erro claro para e-mail já usado.
- **E1-2** (3) Como visitante, quero **login social** (Apple/Google) para entrar rápido.
  - *Aceite:* Sign in with Apple obrigatório se houver login social (regra da App Store).
- **E1-3** (2) Como usuário, quero **recuperar senha** por e-mail.
- **E1-4** (2) Como usuário, quero **ouvir sem cadastro** (modo visitante) e ser convidado a
  criar conta ao tentar doar/assinar.
  - *Aceite:* paywall/login só aparece na ação que exige (doar, assinar, premium).

## E2 — Streaming de áudio · *Must*

- **E2-1** (5) Como ouvinte, quero **navegar pelo catálogo** (lançamentos, projetos, artistas).
- **E2-2** (8) Como ouvinte, quero um **player** com tocar/pausar, avançar/voltar, barra de
  progresso e fila.
- **E2-3** (5) Como ouvinte, quero **playback em segundo plano** e controles na tela de bloqueio.
  - *Aceite:* áudio continua com app minimizado; integração com controles de mídia do SO.
- **E2-4** (5) Como sistema, quero **entregar áudio via CloudFront com URL assinada** para
  proteger o conteúdo do S3.
  - *Aceite:* URL expira; acesso direto ao S3 negado.
- **E2-5** (5) Como sistema, quero o catálogo em **HLS adaptativo** para reduzir custo de banda.
- **E2-6** (3) Como ouvinte, quero **buscar** por música/artista/projeto.

## E3 — Projetos e doação · *Must*

- **E3-1** (5) Como apoiador, quero ver a **página de um projeto** com descrição, mídia, **meta**,
  **barra de progresso** e **nº de apoiadores**.
- **E3-2** (8) Como apoiador, quero **doar valor avulso via PIX** em ≤3 toques.
  - *Aceite:* valores sugeridos + livre; gera QR/copia-e-cola PIX; confirma via webhook.
- **E3-3** (3) Como apoiador, quero **feedback emocional imediato** após doar.
  - *Aceite:* tela de agradecimento + progresso atualizado da meta.
- **E3-4** (3) Como apoiador, quero **comprovante/recibo** da doação.
- **E3-5** (3) Como apoiador, quero ver **"Meus apoios"** com histórico e status.
- **E3-6** (5) 🔒 Como apoiador recorrente, quero **apadrinhar um projeto/missão** (doação mensal).
  - *Depende de:* gateway com recorrência (PRD §12).

## E4 — Vídeo (VOD) · *Must*

- **E4-1** (5) Como usuário, quero **assistir vídeos públicos** (gravações, podcasts, programação).
- **E4-2** (3) Como sistema, quero servir vídeo em **HLS via CloudFront** (mesmo padrão do áudio).
- **E4-3** (3) Como usuário, quero vídeos **organizados por categoria/série**.

## E5 — Assinatura e freemium · *Should*

- **E5-1** (5) 🔒 Como usuário, quero **assinar o plano premium** (mensal).
  - *Depende de:* decisão IAP vs. gateway (PRD §12, R5).
- **E5-2** (5) Como sistema, quero **gerir o status** free/premium e liberar recursos conforme o plano.
  - *Aceite:* perda de premium ao cancelar/expirar; reativação restaura acesso.
- **E5-3** (5) Como **doador**, quero **acesso antecipado** a singles/projetos antes do público geral.
  - *Aceite:* conteúdo "early access" visível para doadores/assinantes; bloqueado para os demais.
- **E5-4** (2) Como usuário, quero **gerenciar minha assinatura** (ver status, cancelar).

## E6 — Ensaio: stems e tonalidade · *Should / Could*

- **E6-0** (3) **[SPIKE]** 🔒 Confirmar **existência e cobertura dos multitracks (stems)** no catálogo.
  - *Aceite:* relatório com % do catálogo com stems; recomendação (servir direto × IA × subset).
  - *Bloqueia:* E6-1, E6-2.
- **E6-1** (8) 🔒 *(Should)* Como assinante, quero **isolar vozes** (Soprano/Contralto/Tenor/Baixo/
  Instrumental) com toggles para ensaiar.
  - *Aceite:* mixagem **no cliente**; ligar/desligar faixas sem recarregar.
- **E6-2** (5) 🔒 *(Should)* Como assinante, quero **ouvir só a minha voz + instrumental**.
- **E6-3** (8) *(Could)* Como assinante, quero **mudar a tonalidade** (`-/+` semitons) e **remover a
  voz-guia** para cantar na igreja.
  - *Aceite:* pitch shift **client-side**, sem distorção perceptível em ±3 semitons.
- **E6-4** (8) *(Could)* Como líder de louvor, quero **organizar um ensaio**: escolher data, incluir
  pessoas e músicas; cada membro ouve a música completa ou só a sua voz.

## E7 — Transparência e impacto · *Must*

- **E7-1** (5) Como apoiador, quero ver a **prestação de contas** de um projeto (texto + mídia + valores).
  - *Aceite:* visível na página do projeto; pilar de confiança (PRD).
- **E7-2** (3) Como apadrinhador, quero receber **updates de impacto** (ex.: vídeo) do que apoio.
- **E7-3** (3) Como apoiador, quero meu **selo de apoiador** / nome nos créditos do projeto.

## E8 — Plataforma e observabilidade · *Must (transversal)*

- **E8-1** (5) Infra base **serverless** (Cognito, API Gateway, Lambda, DynamoDB/Aurora Serverless).
- **E8-2** (3) **CDN + S3 Intelligent-Tiering** configurados para custo mínimo.
- **E8-3** (3) **Analytics de produto** (ativação, conversão a doação/assinatura — KPIs do PRD §3).
- **E8-4** (2) **Monitoramento de custos AWS** com alarme de orçamento.
- **E8-5** (3) **LGPD:** consentimento, política de privacidade, exclusão de conta/dados.

---

## Sequenciamento sugerido (sprints)

| Sprint | Foco | Stories âncora |
|---|---|---|
| 0 | Validação (sem código de prod) | Smoke test + protótipo + 5 testes (PRD §10) |
| 1 | Fundação | E8-1, E8-2, E1-1, E1-2, E1-4 |
| 2 | Ouvir | E2-1…E2-5, E2-6 |
| 3 | Apoiar | E3-1…E3-5, E7-1 |
| 4 | Vídeo + assinatura | E4-1…E4-3, E5-1, E5-2 |
| 5 | Diferenciais | E6-0 (spike) → E5-3, E6-1, E6-2, E7-2, E7-3 |

> Stories 🔒 não entram em desenvolvimento até a decisão correspondente do PRD §12 ser fechada.
> O **spike E6-0** deve rodar cedo (sprint 1–2) porque destrava o principal diferencial do produto.
