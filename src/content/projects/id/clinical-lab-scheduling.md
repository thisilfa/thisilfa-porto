---
title: Sistem Penjadwalan & Optimasi Staf Laboratorium Klinik
category: Operations Research
overview: Sistem penjadwalan staf berbasis constraint programming untuk laboratorium klinik, dibangun di atas Google OR-Tools CP-SAT dengan greedy dan heuristic scoring, disajikan melalui backend FastAPI.
stack: [Python, Google OR-Tools, CP-SAT, FastAPI, PostgreSQL]
statusKind: unverified
ownership: unconfirmed
disclosure: Peran dan konteks klien tidak disebutkan dalam materi sumber; aturan penjadwalan, data klien, dan detail deployment tidak dicantumkan.
kind: compact
order: 4
---

Sistem penjadwalan dan optimasi tenaga kerja untuk staf laboratorium klinik. Jadwal dibangkitkan
dengan constraint programming (Google OR-Tools CP-SAT) yang dikombinasikan dengan greedy dan
heuristic scoring, disajikan melalui backend FastAPI di atas PostgreSQL. Keadilan distribusi
shift diukur dengan koefisien Gini. Status optimalitas solver per eksekusi tidak terdokumentasi
dalam materi sumber, sehingga tidak ada klaim optimalitas global untuk jadwal dunia nyata.
