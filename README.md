# AngelsPlay 🎵🙏

App de **streaming + crowdfunding** para a gravadora e os projetos missionários de uma
organização evangélica, em parceria com um canal de TV filantrópico.

Modelo **freemium**: parte gratuita aberta a todos, recursos premium para **assinantes**, e
**doação disponível para todos** (assinantes e não assinantes). Princípio central:
**doação ≠ assinatura**.

> **Status:** Esqueleto rodável do MVP (React Native + Expo) com dados de exemplo.

---

## 📱 O que já funciona neste esqueleto

- **Início** — catálogo da gravadora com **player de áudio** real (toca, pausa, segundo plano)
  e **mini-player** fixo acima das abas.
- **Player em tela cheia** com **Modo Ensaio**: seletor de **tonalidade** (−/+ semitons),
  **remover voz-guia** e **vozes isoladas** (Soprano/Contralto/Tenor/Baixo/Instrumental) —
  recursos **bloqueados para o plano gratuito** (premium).
- **Projetos** — lista de crowdfunding (música e missões) com **meta**, **barra de progresso**
  e **nº de apoiadores**.
- **Detalhe do projeto** — **doação via PIX (simulada)** com valores sugeridos, feedback de
  agradecimento, atualização da meta e bloco de **prestação de contas**.
- **Vídeos** — VOD com conteúdo **exclusivo para assinantes** bloqueado.
- **Perfil** — alterna **Premium (demo)** e mostra benefícios e "Meus apoios".

> ⚠️ Pagamento, autenticação, streaming protegido e tonalidade/stems reais ainda são
> **simulados** — o esqueleto demonstra os fluxos. A implementação de produção está descrita
> na arquitetura do PRD (§9).

---

## ▶️ Como rodar

Pré-requisitos: **Node 20+** e o app **Expo Go** no seu celular (Android/iOS).

```bash
npm install
npx expo start
```

Leia o **QR code** que aparece no terminal com o app **Expo Go** (Android) ou a **câmera**
(iOS). O app abre no seu celular. Para emuladores: `npx expo start --android` ou `--ios`
(iOS exige macOS).

### Como testar os fluxos
1. Toque numa música na aba **Início** → o **mini-player** aparece; toque nele para abrir a tela cheia.
2. Na aba **Perfil**, ative o **Premium (demo)** para liberar tonalidade e vozes isoladas.
3. Na aba **Projetos**, abra um projeto e toque em **Doar via PIX** para ver o fluxo de doação.

---

## 🧱 Stack e estrutura

- **React Native + Expo (SDK 56)** · **TypeScript** · **expo-router** (navegação por arquivos)
- **expo-audio** (player) · **@expo/vector-icons**

```
src/
  app/                 # rotas (expo-router)
    (tabs)/            # Início, Projetos, Vídeos, Perfil
    musica/[id].tsx    # player em tela cheia (modo ensaio)
    projeto/[id].tsx   # detalhe do projeto + doação PIX
  components/          # MiniPlayer, SongRow, ProjectCard, ProgressBar
  context/             # AuthContext (freemium), PlayerContext (áudio global)
  data/                # dados de exemplo (catálogo, projetos, vídeos)
  lib/ · theme/        # utilitários e paleta da marca
```

---

## 📚 Documentação do produto

- [`docs/PRD-MVP.md`](docs/PRD-MVP.md) — visão, personas, modelo de negócio, escopo MoSCoW,
  **arquitetura AWS custo-otimizada**, riscos e plano de validação.
- [`docs/BACKLOG-MVP.md`](docs/BACKLOG-MVP.md) — épicos e user stories priorizadas.

## ✅ Decisões tomadas

| Tema | Decisão |
|---|---|
| Primeiro entregável | PRD + Backlog + esqueleto rodável |
| Plataforma | App mobile iOS + Android (React Native + Expo) |
| Stems (multitracks) | **A confirmar** com a gravadora (spike E6-0 no backlog) |

## 🔜 Próximos passos sugeridos

Auth real (Cognito), streaming protegido (S3 + CloudFront com URL assinada), gateway de
pagamento com PIX e backend serverless — detalhes no PRD §9 e §11.
