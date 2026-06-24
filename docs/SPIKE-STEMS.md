# Spike E6-0 — Vozes isoladas (stems) para ensaio

**Versão:** 0.1 · **Data:** 2026-06-24 · Relacionado: PRD §7 (R1), Backlog épico E6.

Este spike investiga o **principal diferencial** do AngelsPlay: permitir que a equipe de louvor
ensaie ouvindo as **vozes separadas** (Soprano, Contralto, Tenor, Baixo, Instrumental) de uma
mesma música, ligando e desligando cada uma ao vivo.

---

## 1. Pergunta central

> De onde vêm as faixas separadas (stems) e quanto custa servi-las?

São dois cenários, com custos e qualidade muito diferentes:

| Cenário | Origem dos stems | Qualidade | Custo |
|---|---|---|---|
| **A — Multitracks de estúdio** | A gravadora já tem as faixas separadas da gravação | Perfeita (faixas reais) | Praticamente zero de processamento — é só servir arquivos |
| **B — Separação por IA** | Gerar stems a partir do master final (ex.: Demucs/Spleeter) | Boa, mas com artefatos | Processamento pesado (GPU) por faixa, feito **uma vez** no upload |

**Recomendação:** confirmar com a gravadora a existência dos multitracks (Cenário A). É o
caminho de **maior qualidade e menor custo**. A separação por IA (Cenário B) deve ser um
**fallback** para títulos antigos sem multitrack, processado offline no momento do cadastro —
nunca em tempo real.

> 🔴 **Decisão pendente (R1):** a gravadora tem os multitracks? Para todo o catálogo ou parte?
> Enquanto não há resposta, o app usa faixas de demonstração (ver §3).

## 2. Como NÃO encarecer

- **Separação só uma vez, offline.** Nunca separar voz em runtime. No Cenário B, rodar Demucs
  em uma tarefa sob demanda (ex.: AWS Batch/Fargate com GPU) no upload, salvar os stems em S3.
- **Mixagem no aparelho.** O streaming entrega N faixas; o **device** liga/desliga e ajusta o
  volume de cada voz. Custo de servidor para mixar = **zero**. (Mesmo princípio do PRD §9.)
- **Entrega via CloudFront** com URL assinada, igual ao restante do áudio. Para ensaio, cada
  stem é mais um objeto no S3 sob o mesmo CDN.
- **HLS por stem** (ou faixas curtas em cache) para não baixar WAVs gigantes.

## 3. Prova de conceito (já no app)

O esqueleto já implementa o **motor de ensaio real**:

- `src/audio/useStemsEngine.ts` — cria **um player por faixa** (expo-audio), toca todas em
  paralelo e **silencia (mute)** as vozes indesejadas. Como todas seguem tocando juntas,
  ligar/desligar uma voz **não as tira de sincronia**.
- `src/components/RehearsalPanel.tsx` — UI no player: botões por voz (ligar/desligar), "segurar
  para ouvir só esta voz" (solo) e "mixagem completa".

O que é **real** na PoC: o motor de múltiplas faixas, o mute por voz ao vivo e o solo.
O que é **demonstração**: os arquivos de áudio (faixas públicas no lugar dos multitracks reais,
até a definição do R1) e a sincronia de precisão (ver limitações).

### Limitações conhecidas da PoC (a resolver na produção)
1. **Sincronia de início.** Tocar N players independentes gera um pequeno desalinhamento ao
   iniciar. Produção precisa de sincronia de precisão — opções: (a) engine multitrack único,
   (b) relógio comum com `seekTo` de alinhamento, (c) um único arquivo multicanal.
2. **Banda.** Tocar 5 faixas = ~5× o tráfego. Mitigar com HLS de baixa taxa para ensaio e
   pré-carregamento.
3. **Tonalidade real (pitch shift).** Ainda simulada; exige engine de áudio com time-stretch/
   pitch independente no device. Avaliar em spike próprio.

## 4. Próximos passos recomendados

1. **Responder R1** com a gravadora (multitrack sim/não, cobertura).
2. Se **Cenário A**: definir o formato/empacotamento dos stems e o pipeline de upload para o S3.
3. Se **Cenário B**: PoC de separação com Demucs em job offline + medir custo por música.
4. Spike de **sincronia de precisão** e de **pitch shift** no device.
5. Validar a UX do painel de ensaio com **5 líderes de louvor** (PRD §10).
