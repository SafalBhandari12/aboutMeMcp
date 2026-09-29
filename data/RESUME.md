# Safal Bhandari

safalbhandari069@gmail.com | +91 7847915622 | [Portfolio](https://safalbhandari.com.np/) | [LinkedIn](https://www.linkedin.com/in/safal-bhandari-25a909421/) | [GitHub](https://github.com/SafalBhandari12) | Remote, Available Now

## Professional Summary

AI-native full-stack engineer building production AI-powered web applications with TypeScript, React, and Node.js. Hands-on with LLMs, RAG pipelines, and Agentic AI workflows, and comfortable owning a problem end to end, from design through deployment.

## Experience

### Full Stack AI Engineer, Yeti Code Crew
*Full-time | Nov 2025 -- Jul 2026*

- Built the SkillMatcher AI hiring agent on AWS (S3, EC2): parses job descriptions and PDF/DOC/DOCX resumes with LLMs, then ranks candidates with a gate-and-score engine (quality, experience, education, and skills gates plus six embedding-based weighted scores), **scoring thousands of resumes in ~30 seconds** and **cutting manual screening time by over 60%**.
- Shipped SkillMatcher platform features: quick and deep scan tiers, location matching with geocoding, parallel resume processing with transactional writes and retries, S3 pre-signed uploads, package quotas, billing and invoicing, and the Next.js recruiter dashboard.
- Built the ChatWithLead MVP, a no-code platform where anyone can create and deploy a chatbot trained on their own website: a Puppeteer crawler running as event-driven BullMQ background jobs, pgvector storage, and a retrieval chat built with LangChain and the Vercel AI SDK, with Claude and automatic Gemini fallback, plus lead capture from conversations.
- Built the Fin-Assist HRM module (Node.js, Prisma, React): attendance with shift validation, leave, onboarding, projects and tasks with story points and time logs, incentives, and payroll with overtime, bonuses, and leave deductions.
- Engineered AI workflow prototypes using LLMs, LangChain, LangFlow, semantic retrieval, and memory graph architectures, improving contextual response accuracy across **10k+ indexed knowledge nodes**; architected BullMQ background processing, **reducing API latency by 40%**.

### Full Stack Developer Intern, Sojourn Pvt. Ltd.
*Internship | Aug 2024 -- Sep 2025*

- Architected a scalable microservices ecosystem with Express.js and Redis caching for a multi-vendor travel marketplace, with separate services for hotel stays, adventure booking, transport, rentals, and local market products.
- Developed a GPS-driven geofencing security module leveraging device location APIs to detect boundary crossings and dispatch real-time security alerts.
- Built the booking and payments engine: Razorpay payments, double-booking prevention with database transactions and date-overlap checks, seat inventory for adventure bookings, OTP login, and role-based access for customers, vendors, and admins.
- Integrated a Gemini-powered generative AI travel-guide chatbot within the multi-vendor architecture for real-time user engagement, and hardened the API by masking customer phone numbers from vendors, stripping payment data from responses, and using non-guessable booking references.
- Built the customer, vendor, and admin web apps in Next.js and a React Native (Expo) mobile app.

### Student Researcher: Eye Disease Classification, Sharda University
*Research | Jan 2025 -- Feb 2025*

- Led a research initiative, under Prof. Ruqaiya Khanam, developing a hybrid deep learning model (Swin Transformer Tiny + EfficientNet-B2) that **classifies 12 eye diseases at 97% accuracy** with 4.89M parameters.

## Projects

### Reverse-Engineered API Gateway
*Next.js, Hono, Cloudflare Workers/D1/KV* | [Live](https://bettergpt-web-rouge.vercel.app/) | [GitHub](https://github.com/SafalBhandari12/bettergpt)

- Reverse-engineered ChatGPT's internal OAuth token flow and undocumented Responses API to build GPTBridge, a Cloudflare Worker (Hono) BFF that turns any ChatGPT account into a streaming OpenAI-compatible `sk-` gateway with encrypted D1/KV token storage; **4,800+ keys generated across 2,100+ users**.

### Chat with Repo
*TypeScript, Node.js, Express, PostgreSQL/pgvector, Redis/BullMQ, tree-sitter, HuggingFace* | [GitHub](https://github.com/SafalBhandari12/greptileClone)

- Built a full-stack RAG pipeline that clones GitHub repos, AST-chunks code via tree-sitter across 13 languages, and answers questions with cited sources using hybrid vector + keyword search (RRF fusion) and cross-encoder reranking.
- Stress-tested against **12 real public repos**: **297K+ chunks, 94K+ files, 4.3M+ lines of code**; designed per-repo PostgreSQL list-partitioning for scalable isolated vector indexes and measured **65% Recall@8** on a hand-labeled evaluation set.
- Runs indexing as a resumable BullMQ background worker: skips unchanged repos by comparing commit SHAs and resumes per-file after a mid-job crash, with Better Auth magic-link authentication gating access.

### Monitoring Platform
*Next.js, Cloudflare Workers/D1, PostgreSQL, Azure Functions* | [Live](https://sys-monitoring-monorepo-web.vercel.app/) | [GitHub](https://github.com/SafalBhandari12/SysMonitoringMonorepo)

- Architected a multi-tenant API uptime monitoring SaaS with group-based dashboards, per-organization public status pages, and an ingestion SDK streaming request-latency telemetry via t-digest.
- Built the Azure Functions ping watcher: a **5-minute cron sweep** hitting every registered endpoint with bounded concurrency (**20 in-flight** via p-limit) and a **15s abort-controlled timeout** per check, writing every result straight to Postgres.
- Designed failure detection on a Redis sorted-set sliding window per API/region (`ZADD`/`ZREMRANGEBYSCORE`/`ZCOUNT` over a **24-hour lookback**), auto-opening a multi-region incident at a **5-failure threshold** and auto-resolving it once failures subside, with zero human intervention.
- Deployed dual-region behind an OIDC-authenticated GitHub Actions CI/CD pipeline, later migrating the active-ping engine to a Cloudflare Worker for stateless edge scaling.

### AI Agent Builder Platform
*TypeScript, Hono, Cloudflare Workers/D1/Vectorize, Next.js* | [Live](https://build-your-agents-web-six.vercel.app) | [GitHub](https://github.com/SafalBhandari12/buildYourAgents)

- Built a full-stack Agentic AI / RAG platform, in the spirit of LangChain and LangFlow, with header-aware document chunking, a Cloudflare Vectorize retrieval layer, and a multi-provider LLM chain across **five AI providers** (OpenAI, Claude, Gemini, DeepSeek, Groq) with **automatic failover** and streamed responses.

### Fault-Tolerant Distributed Rate Limiter
*Redis, Lua, Nginx* | [GitHub](https://github.com/SafalBhandari12/Fault-Tolerant-Distributed-Rate-Limiter)

- Built a distributed rate limiter using token bucket and sliding window algorithms with atomic Redis Lua scripts shared across **four application instances** behind Nginx, with a circuit breaker that fails over to in-memory counting during Redis outages and reconciles counts back without double-counting on recovery.

## Education

### Sharda University
*B.Tech. in Computer Science and Engineering | CGPA: 9.17/10*

- COMPEX Scholarship recipient, fully funded by Indian Embassy.

## Achievements

- 4th Place - Technovation Hackathon, Sharda University (2024)
