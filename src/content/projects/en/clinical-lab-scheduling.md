---
title: Clinical Laboratory Staff Scheduling & Optimization
category: Operations Research
overview: A constraint-programming system for laboratory staff rostering, built on Google OR-Tools CP-SAT with greedy and heuristic scoring, exposed through a FastAPI backend.
stack: [Python, Google OR-Tools, CP-SAT, FastAPI, PostgreSQL]
statusKind: unverified
ownership: unconfirmed
disclosure: No role or client context is stated in the source material; scheduling rules, client data and deployment details are excluded.
type: professional
kind: compact
order: 4
---

A workforce scheduling and optimization system for clinical laboratory staffing. Rosters are
generated with constraint programming (Google OR-Tools CP-SAT) combined with greedy and
heuristic scoring, and served through a FastAPI backend on PostgreSQL. Fairness was measured
with a Gini coefficient over shift distribution. The solver's per-run optimality status is not
documented in the source material, so no claim is made about global optimality of real-world
rosters.
