# PRD — AngelsPlay (MVP)

**Versão:** 0.1 (Discovery)
**Data:** 2026-06-22
**Plataforma alvo:** App mobile iOS + Android
**Autores (perfis simulados):** PO (streaming + 3º setor evangélico), UX (streaming áudio/vídeo), Arquiteto (AWS custo-otimizado)

---

## 1. Visão

> Conectar a igreja e os apoiadores à missão da gravadora, transformando **ouvir** em
> **apoiar** e **apoiar** em **pertencer** — com uma experiência de streaming à altura dos
> apps seculares, mas a serviço do Reino.

AngelsPlay é o lugar onde o fiel **ouve** o catálogo, **ensaia** o louvor da sua igreja,
**doa** para projetos de música e missões, e **acompanha** o impacto da sua doação.

## 2. Contexto e problema

- A gravadora possui um catálogo de músicas hospedado em **AWS S3**, hoje sem um canal
  próprio de distribuição ao público fiel.
- Existe uma parceria com um **canal de TV filantrópico** que gera vídeo (gravações,
  programação, podcasts) subaproveitado fora do ar.
- Projetos de música e missões precisam de **financiamento recorrente**, e o público
  evangélico tem alta propensão a **doar quando há propósito claro e prestação de contas**.
- Músicos de igreja têm uma dor real e não atendida: **ensaiar** com playback em outra
  tonalidade e com **vozes isoladas**.

**Oportunidade:** unir streaming + crowdfunding + ferramentas de ensaio em um único produto
com forte identidade evangélica, financiado por doações e assinaturas — não por anúncios.

## 3. Objetivos e métricas

### North Star Metric
**Valor doado + receita de assinatura recorrente por mês** (receita total para a missão).

### KPIs do MVP
| Categoria | Métrica | Meta inicial (a calibrar) |
|---|---|---|
| Ativação | % de novos usuários que ouvem ≥1 música na 1ª sessão | > 60% |
| Conversão a doação | % de usuários ativos que doam ao menos 1x | > 5% |
| Conversão a assinatura | % de usuários ativos que assinam | > 3% |
| Retenção | Retenção D30 de usuários logados | > 25% |
| Confiança | % de doadores que abrem a prestação de contas do projeto | > 40% |

### Não-objetivos do MVP
- Não é uma rede social.
- Não é uma plataforma de cursos.
- Não substitui o sistema de gestão da ONG (isso é escopo do `portalpmo`).

## 4. Personas

1. **Ester, 34 — Líder de louvor.** Organiza o repertório do culto. Quer ensaiar com a
   equipe, mudar tonalidade e ouvir só a própria voz. **Principal candidata a assinante.**
2. **Marcos, 28 — Fiel ouvinte.** Ouve louvor no dia a dia. Quer o catálogo e os lançamentos.
   Doa avulso quando uma música o toca. **Topo do funil.**
3. **Dona Cleusa, 58 — Apoiadora/mantenedora.** Não consome muito streaming, mas **doa
   recorrente** para missões. Quer **ver o impacto** e receber updates. **Doadora recorrente.**
4. **Pr. João, 45 — Pastor/parceiro da gravadora.** Interlocutor institucional. Cuida de
   licenciamento e da imagem. Não é usuário final, mas é **stakeholder-chave**.

## 5. Modelo de negócio

> **Princípio central: doação ≠ assinatura.** São motores separados, conectados pela
> experiência. Misturá-los gera confusão fiscal, de UX e de prestação de contas.

### Eixo 1 — Doação (aberta a todos, inclusive assinantes)
- **Avulsa** a um projeto, com meta visível (estilo Kickstarter) e nº de apoiadores.
- **Recorrente** ("Apadrinhe um projeto / missão") com updates de impacto.
- **Recompensa = acesso, não objeto:** doador ouve singles/projetos **primeiro**, ganha
  **selo de apoiador** e **nome nos créditos**.
- Meio de pagamento: **PIX** (avulso e recorrente) + cartão. Recibo/comprovante de doação.

### Eixo 2 — Assinatura (freemium)
| Recurso | Grátis | Assinante |
|---|---|---|
| Ouvir catálogo (streaming) | ✅ | ✅ |
| Vídeos públicos | ✅ | ✅ |
| Doar para projetos | ✅ | ✅ |
| Acesso antecipado (também via doação) | parcial | ✅ |
| **Mudança de tonalidade / remover voz-guia** | ❌ | ✅ |
| **Vozes isoladas (stems) para ensaio** | ❌ | ✅ |
| Organização de ensaios online | ❌ | ✅ |
| Vídeos e programação exclusivos | ❌ | ✅ |
| Programação ao vivo exclusiva (fase 2) | ❌ | ✅ |

## 6. Escopo do MVP (MoSCoW)

### Must have
- Cadastro/login (e-mail + social), perfil básico.
- Catálogo + **player de áudio** com tocar/pausar, fila, **playback em segundo plano**.
- Página de **projeto** com descrição, meta, barra de progresso e nº de apoiadores.
- **Doação avulsa via PIX** + comprovante.
- Área de **vídeos públicos** (VOD).
- **Prestação de contas** simples por projeto (texto + mídia + valores).

### Should have
- **Assinatura recorrente** (gestão de status free/premium).
- **Acesso antecipado** para doadores/assinantes.
- **Vozes isoladas (stems)** — *depende da confirmação de multitracks (ver §7)*.
- **Doação recorrente** ("apadrinhar").

### Could have
- **Mudança de tonalidade / remoção de voz-guia** (client-side).
- **Organização de ensaios online** (líder monta repertório e escala a equipe).

### Won't have (nesta versão)
- Programação **ao vivo** exclusiva (fase 2 — Amazon IVS).
- App de ensaio colaborativo completo (chat, comentários, anexos).
- Web/desktop (mobile-first nesta fase).

## 7. Premissas, riscos e dependências

| # | Item | Tipo | Mitigação |
|---|---|---|---|
| R1 | **Multitracks (stems)** podem não existir para todo o catálogo | Risco/Dependência | **Spike** no início (BACKLOG-MVP épico E6). Se não houver, avaliar separação por IA (custo/qualidade) ou limitar stems a títulos selecionados. |
| R2 | **Licenciamento / direito autoral (ECAD)** para streaming, playback alterado e stems | Risco legal | Validar com jurídico **antes** de publicar. Bloqueante para features de áudio derivado. |
| R3 | **Pagamentos PIX recorrente** e emissão de comprovante de doação | Dependência | Usar gateway (Pagar.me / Mercado Pago / Stripe) — não construir do zero. |
| R4 | **Custos AWS** podem escalar com transferência de dados | Risco | Arquitetura serverless + CDN + HLS adaptativo (§9). |
| R5 | **Aprovação nas lojas** (Apple/Google) para apps com doação | Risco | Doação a ONG costuma ser permitida fora do in-app purchase; **assinatura de conteúdo digital normalmente exige IAP**. Confirmar políticas. |

## 8. Experiência (UX) — fluxos críticos do MVP

1. **Ouvir → Doar:** descobrir música → tocar → card "este projeto precisa de você" →
   doar via PIX em ≤3 toques → **feedback emocional imediato** ("você aproximou a meta 🎉").
2. **Ensaiar (premium):** abrir música → painel de faixas (Soprano/Contralto/Tenor/Baixo/
   Instrumental) com toggles → seletor de tonalidade `-/+` → "remover voz-guia". Tudo a 1 toque.
3. **Acompanhar projeto:** "Meus apoios" → status, updates em vídeo, prestação de contas.

Detalhe de validação no §10.

## 9. Arquitetura de alto nível (custo-otimizada)

> Princípio: **serverless + pré-processamento + CDN**. Pagar por uso real, não por servidor ocioso.

- **App:** framework multiplataforma (recomendação: **Flutter** ou **React Native**) para um
  único código iOS+Android — reduz custo de desenvolvimento e manutenção.
- **Streaming de áudio:** **S3 + CloudFront** com **signed URLs/cookies** (conteúdo protegido,
  URL expira). Catálogo convertido para **HLS** via **MediaConvert sob demanda**.
- **Vozes isoladas:** servir **stems já existentes** como faixas separadas; **mixagem no
  cliente** (engine de áudio do device) → custo de servidor ~zero. *(Depende de R1.)*
- **Mudança de tonalidade (pitch shift):** **client-side**, no device. Servidor não entra.
- **Vídeo VOD:** mesmo padrão (S3 + CloudFront + HLS). **Ao vivo (fase 2):** **Amazon IVS**.
- **Auth:** Amazon Cognito (grupos free/premium).
- **API:** API Gateway + Lambda. **Dados:** DynamoDB on-demand ou Aurora Serverless v2.
- **Armazenamento:** S3 Intelligent-Tiering (catálogo frio barateia automaticamente).
- **Pagamentos:** gateway externo com PIX + webhooks de confirmação (fora de PCI pesado).

**Estimativa de ordem de grandeza:** com poucos milhares de usuários, custo na casa de
**dezenas de USD/mês**. Maior custo variável: **transferência do CloudFront** → por isso HLS
adaptativo importa.

## 10. Plano de validação

1. **Smoke test (landing page)** com botão "Quero apoiar / Assinar por R$ X" + tráfego pago
   (R$ 200–300) → mede **disposição real a pagar** antes de construir.
2. **Protótipo navegável (Figma)** dos 3 fluxos críticos do §8.
3. **Teste de usabilidade com 5 líderes de louvor** (público-validador de ouro).
4. **Wizard of Oz** para features caras (ensaios/ao vivo) com 1 igreja antes de automatizar.

## 11. Roadmap em fases

- **Fase 0 — Validação:** smoke test + protótipo + 5 testes de usabilidade. (sem código de prod)
- **Fase 1 — MVP:** Must + Should. Lançar para 1–2 igrejas piloto.
- **Fase 2 — Premium avançado:** tonalidade, ensaios online, ao vivo (IVS).
- **Fase 3 — Escala:** otimização de custo, analytics de doação, recompensas/gamificação.

## 12. Decisões em aberto (precisam de você / stakeholders)

- [ ] **Stems:** existem multitracks? Para todo o catálogo ou parte? (R1)
- [ ] **Jurídico:** o que pode ser distribuído como playback/stems? (R2)
- [ ] **Gateway de pagamento** preferido (Pagar.me / Mercado Pago / Stripe)?
- [ ] **Política de loja:** assinatura via IAP? Doação fora do IAP? (R5)
- [ ] **Identidade visual / marca** AngelsPlay já existe?
