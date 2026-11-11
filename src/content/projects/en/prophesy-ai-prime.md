---
title: Prophesy AI Prime
category: Applied AI / LLM
type: professional
overview: An AI-powered market intelligence solution designed to support information discovery and knowledge retrieval through LLM-based workflows.
role: AI / Computer Vision Engineer
company: Biologic Technik
stack:
  [
    Python,
    FastAPI,
    n8n,
    OpenAI API,
    Anthropic Claude,
    AnythingLLM,
    ChromaDB,
    PostgreSQL,
    DeepEval,
    TruLens,
  ]
statusKind: delivered
ownership: employer
disclosure: Internal business intelligence sources, proprietary prompts, datasets and workflows are excluded.
kind: case-study
featured: true
order: 3
period: July 2025 – Present
diagram: prophesy
contribution:
  - group: implemented
    items:
      - The n8n market-sensing workflow — daily news collection, OpenAI structured JSON extraction, Singapore-relevance filtering, and deduplication into PostgreSQL.
      - The website RAG assistant, implemented end to end — document ingestion, chunking, embedding, ChromaDB retrieval, and response generation over a FastAPI + AnythingLLM backend.
      - A custom LLM-powered SQL agent built directly with Python and API calls — no agent framework — translating natural-language questions into SQL over live forecast data.
      - The evaluation setup — expected-facts datasets with DeepEval (faithfulness, completeness, instruction following) and TruLens (relevancy).
  - group: unattributed
    items:
      - The downstream forecasting/RSL stage consuming the signals — owned by another contributor.
---

## Problem and constraints

Market intelligence for Singapore-dependent operations meant tracking medical, national,
geopolitical, and environmental news, relating each event to internal supply-chain data, and
feeding a forecasting stage — all of it manual. The system automates the front of that
pipeline: collect the news, structure it, filter for relevance, and make it retrievable —
plus a website assistant that answers questions over the resulting knowledge, and a SQL agent
for live forecast data.

The constraints that shaped the approach:

- **Confidentiality** — proprietary rule-based signal-calculation logic and internal client
  data are excluded from this write-up entirely.
- **Ownership boundary** — the downstream forecasting/RSL stage consuming the signals was
  owned by another contributor; this case study covers the stages upstream of it.
- **Multiple LLM providers** — answers had to work over both OpenAI and Anthropic Claude,
  selectable by the user.
- **Evaluation honesty** — retrieval quality was not separately evaluated, and no
  application-level logging was implemented; both are stated rather than glossed.

## System architecture

The diagram shows the three documented parts. Market sensing: an n8n workflow collects news
daily, OpenAI extracts structured JSON describing each article's relationship to Singapore, a
relevance filter with deduplication keeps one record per event, and filtered signals land in
PostgreSQL — combined there with internal SKU and supplier information to derive impact,
severity, and signal strength for the downstream stage. Website RAG assistant: a FastAPI
backend connected to the AnythingLLM API, with ChromaDB as the retrieval layer, user-selected
OpenAI or Anthropic Claude models, and runtime ingestion of the currently viewed webpage via
JavaScript. SQL agent: a custom LLM-powered agent translating natural-language questions
about live forecast data into SQL, running against a shared read-only PostgreSQL account.
Everything solid is implemented by me; the muted downstream stage is not.

## Technical implementation

**Structured extraction over raw feeds.** Requirement: raw news is unstructured and noisy.
Approach: OpenAI extracts structured JSON describing each article's relationship to
Singapore; relevance filtering and event deduplication keep one record per event; filtered
signals combine with internal SKU and supplier data to derive impact, severity, and signal
strength. Outcome: a daily, queryable signal table for the forecasting stage.

**RAG end to end, independently implemented.** Requirement: answer questions grounded in
forecast results, market-sensing information, and the page the user is viewing. Approach:
JSON, TXT, and CSV documents ingested, chunked, and embedded into ChromaDB; JavaScript
extracts the currently viewed webpage and sends it with the chat request; webpage content is
chunked and embedded at runtime using the same embedding configuration as static sources;
AnythingLLM serves answers with user-selected OpenAI or Anthropic Claude models. Outcome: a
working assistant over both static documents and the live page.

**SQL agent without a framework.** Requirement: natural-language questions over live forecast
data. Approach: a custom LLM-powered agent built directly with Python and API calls — no
LangChain or LangGraph — integrated with FastAPI and PostgreSQL, translating questions into
SQL and executing them. Application users shared a read-only database account restricted to
relevant forecast tables. Outcome: worked for the intended scope; there was no per-user
database authorization, which is stated as a limitation rather than glossed.

**Grounded evaluation.** Requirement: check that generated answers are faithful and complete.
Approach: prepared expected facts and supporting reference documents; checked generated
answers against expected facts and cited sources; DeepEval scored faithfulness, completeness,
and instruction following; TruLens scored relevancy. Outcome: a repeatable evaluation pass —
with the documented boundary that the retrieval stage and retrieved ChromaDB chunks were not
separately evaluated.

## Experiments and engineering challenges

- **Runtime webpage ingestion.** Requirement: the assistant should answer over the page the
  user is viewing, not only static documents. Implementation: JavaScript extracts the viewed
  webpage and its content is chunked and embedded at runtime with the same embedding
  configuration as static sources, so static and runtime content retrieve consistently.
- **Multi-provider answers.** Requirement: no lock-in to one LLM provider. Implementation:
  AnythingLLM integration with user-selectable OpenAI and Anthropic Claude models behind one
  chat interface.
- **Framework versus direct implementation.** Requirement: a SQL agent for live forecast
  data. Decision: built directly with Python and API calls rather than a dedicated agent
  framework — the documented choice; the doc records no measured comparison against a
  framework-based build, so no such comparison is claimed.

## Results and evaluation

- A daily market-sensing workflow in place: collection, structured extraction, relevance
  filtering, deduplication, and PostgreSQL storage of signals for the forecasting stage.
- A website RAG assistant answering over static documents and the live webpage, with
  user-selected LLM providers.
- A custom SQL agent translating natural-language questions into executed SQL over live
  forecast data.
- Evaluation: manual testing plus a structured dataset pass — expected facts and reference
  documents checked against generated answers and citations, scored by DeepEval
  (faithfulness, completeness, instruction following) and TruLens (relevancy).

## Demonstration and evidence

Sanitized workflow screenshots, sample retrieval traces, and evaluation result examples await
owner-approved material and are intentionally not faked here.

## Limitations and reflection

- The retrieval stage and retrieved ChromaDB chunks were not separately evaluated —
  generation was scored, retrieval was not.
- No persistent conversational memory between separate requests; no keyword/hybrid retrieval
  (semantic retrieval only).
- No application-level logging or monitoring of chat requests, answers, retrieved context,
  errors, or evaluation results.
- The SQL agent's database account was shared and read-only, restricted to relevant forecast
  tables; there was no per-user database authorization.
- The downstream forecasting/RSL stage is not covered here — it was owned by another
  contributor.

## Disclosure note

Internal business intelligence sources, proprietary prompts, datasets and workflows are
excluded.
