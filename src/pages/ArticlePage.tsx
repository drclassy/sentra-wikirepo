import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import Footer from '@/components/Footer';
import TabBar from '@/components/TabBar';
import Infobox from '@/components/Infobox';
import TableOfContents from '@/components/TableOfContents';
import EngineCard from '@/components/EngineCard';
import EngineGraph from '@/components/EngineGraph';
import CommandCenter from '@/components/CommandCenter';
import LibraryGrid from '@/components/LibraryGrid';
import { useTheme } from '@/hooks/useTheme';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { documentHref } from '@/data/wikiDocuments';
import { useState } from 'react';

const tocItems = [
  {
    label: 'Origin & Historical Context',
    href: '#origin',
    children: [
      { label: 'Founder Profile', href: '#founder' },
      { label: 'Founding Motivation', href: '#motivation' },
      { label: 'Naming & Symbolism', href: '#naming' },
    ],
  },
  {
    label: 'Architecture',
    href: '#architecture',
    children: [
      { label: 'Design Philosophy', href: '#design-philosophy' },
      { label: 'Layer Model', href: '#layer-model' },
      { label: 'Boundary Enforcement', href: '#boundary-enforcement' },
    ],
  },
  {
    label: 'The Crown Jewel Engines',
    href: '#engines',
    children: [
      { label: 'Sentra-Nada (Clinical Reasoning)', href: '#nada' },
      { label: 'Sentra-Pustaka (RAG Pipeline)', href: '#pustaka' },
      { label: 'Sentra-Sandi (FHIR Interop)', href: '#sandi' },
      { label: 'Sentra-Bentara (Access Control)', href: '#bentara' },
      { label: 'Sentra-Cermin (Vector Store)', href: '#cermin' },
    ],
  },
  { label: 'Platform Services', href: '#platform' },
  { label: 'Application Ecosystem', href: '#apps' },
  { label: 'Development Workflow', href: '#workflow' },
  { label: 'Governance & Safety', href: '#governance' },
  { label: 'Regulatory & Compliance', href: '#regulatory' },
  { label: 'Documentation Library', href: '#library' },
  { label: 'Technical Specifications', href: '#tech-specs' },
  { label: 'References', href: '#references' },
];

const sectionIds = [
  'origin', 'architecture', 'engines', 'platform', 'apps',
  'workflow', 'governance', 'regulatory', 'library', 'tech-specs', 'references',
];

const referenceDocs = [
  { label: 'Architecture Overview/Architecture Overview.md', title: 'Architecture Overview', className: 'link-academic' },
  { label: 'Getting Started.md', title: 'Getting Started', className: 'link-public' },
  { label: 'AI Capabilities & Systems/Clinical Reasoning Engines.md', title: 'Clinical Reasoning Engines', className: 'link-academic' },
  { label: 'Governance & Operations/Agent System & Decision Making.md', title: 'Agent System & Decision Making', className: 'link-academic' },
  { label: 'Architecture Overview/Monorepo Strategy & Governance.md', title: 'Monorepo Strategy & Governance', className: 'link-academic' },
  { label: 'Crown Jewel AI Engines/Crown Jewel AI Engines.md', title: 'Crown Jewel AI Engines', className: 'link-academic' },
  { label: 'AI Capabilities & Systems/RAG & Retrieval Systems.md', title: 'RAG & Retrieval Systems', className: 'link-tech' },
  { label: 'AI Capabilities & Systems/FHIR & Interoperability.md', title: 'FHIR & Interoperability', className: 'link-academic' },
  { label: 'Governance & Operations/Security & Compliance/Compliance & Regulatory Framework.md', title: 'Compliance & Regulatory Framework', className: 'link-academic' },
  { label: 'Shared Engines & Packages/Sentra Crown Jewels.md', title: 'Sentra Crown Jewels', className: 'link-academic' },
  { label: 'Platform Services/Orchestration Engine.md', title: 'Orchestration Engine', className: 'link-tech' },
  { label: 'Corporate Applications/Ferdi Iskandar Portfolio.md', title: 'Ferdi Iskandar Portfolio', className: 'link-default' },
];

const engines = [
  {
    id: 'nada',
    title: 'Sentra-Nada — Clinical Reasoning Engine',
    description: 'Sentra-Nada is the clinical intelligence core of the Abyss platform. It implements the SYMPHONY Engine — a modular framework for real-time, multi-dimensional clinical assessment that operates at the point of care. The engine is designed to augment, not replace, the clinical judgment of qualified healthcare professionals; all outputs are advisory and are presented with evidence grounding and confidence indicators.',
    subsystems: [
      '<b>NEWS2 & Vital Sign Scoring:</b> Implementation of the UK Royal College of Physicians\' National Early Warning Score 2 (NEWS2) protocol, validated for identifying physiological deterioration in adult hospital patients.',
      '<b>Trajectory Modeling:</b> Analyses the momentum of vital sign trends over time, generating time-to-critical projections that enable proactive rather than reactive clinical intervention.',
      '<b>Screening Gates:</b> Instantaneous binary screening checks for high-acuity conditions including septic shock (via SOFA and qSOFA proxies), hypoxemia, and hypoglycemia.',
      '<b>Clinical Pathways & Trajectory Engine:</b> Evidence-based clinical pathway recommendations cross-referenced against Indonesian clinical practice guidelines and international standards (WHO, UpToDate, BMJ Best Practice).',
      '<b>Differential Diagnosis Support:</b> Structured differential generation based on symptom profiles, vital signs, and available diagnostic data, with probabilistic weighting and red-flag identification.',
      '<b>Referral Coordination Workflows:</b> Automated referral pathway generation including urgency classification, receiving facility identification, and handover documentation pre-population.',
      '<b>Emergency Detection:</b> Sub-second detection of critical emergency patterns (cardiac arrest risk, respiratory failure, acute neurological events) with automated alert escalation.',
    ],
    disclaimer: 'Clinical validation status: In development. All clinical outputs carry mandatory disclaimer pending regulatory clearance. This information is informational only; consult a qualified clinician for all clinical decisions.',
  },
  {
    id: 'pustaka',
    title: 'Sentra-Pustaka — RAG Knowledge Pipeline',
    description: 'Sentra-Pustaka is the medical knowledge retrieval and synthesis engine. It implements a local-first <b>Retrieval-Augmented Generation (RAG)</b> architecture — a technique that grounds large language model outputs in a curated, authoritative knowledge corpus, substantially reducing the hallucination risk that renders unconstrained LLM outputs unsafe for clinical use.',
    subsystems: [
      '<b>Hybrid Search Architecture:</b> Combines dense semantic retrieval (via <code>pgvector</code> embeddings in PostgreSQL) with sparse lexical retrieval (BM25-equivalent scoring) to maximize both conceptual relevance and exact-match precision. Hybrid ranking is fused using Reciprocal Rank Fusion (RRF).',
      '<b>Document Ingestion Pipeline:</b> Automated ingestion, chunking, embedding, and indexing of medical literature, clinical guidelines, drug reference data, and institutional protocols. Supports PDF, DOCX, HTML, and structured data formats.',
      '<b>Citation-Aware Evaluation:</b> Every RAG output is grounded with source citations at the sentence or paragraph level. A hallucination detection layer — implemented via entailment scoring — flags responses where generated content is not adequately supported by retrieved evidence.',
      '<b>Retrieval Algorithm Suite:</b> Modular retrieval strategy selection based on query type: factual lookup, differential reasoning, drug interaction query, guideline retrieval, each optimized for its respective retrieval task.',
      '<b>Evaluation & Testing Framework:</b> RAGAS-compatible evaluation suite measuring faithfulness, answer relevance, context precision, and context recall across standardized clinical query benchmarks.',
    ],
    disclaimer: 'All knowledge outputs are informational only and do not constitute medical advice. Clinical decisions require evaluation by a qualified healthcare professional.',
  },
  {
    id: 'sandi',
    title: 'Sentra-Sandi — FHIR Interoperability Engine',
    description: 'Sentra-Sandi is the interoperability and healthcare data standards engine. It implements <b>HL7 FHIR R4</b> (Fast Healthcare Interoperability Resources) — the internationally adopted standard for electronic health data exchange — enabling Sentra applications to interoperate with external hospital information systems, laboratory systems, imaging platforms, and national health data infrastructure.',
    subsystems: [
      '<b>FHIR R4 Resource Implementation:</b> Comprehensive implementation of core FHIR resource types including Patient, Observation, Condition, Medication, Procedure, DiagnosticReport, and Encounter, mapped to Indonesian Ministry of Health data standards (SATUSEHAT).',
      '<b>CDS Hooks Integration:</b> Implementation of the HL7 Clinical Decision Support (CDS) Hooks specification, enabling real-time decision support triggers within existing clinical workflow systems.',
      '<b>Data Validation & Transformation:</b> Bidirectional data transformation between Sentra\'s internal data model and FHIR-compliant representations, with schema validation ensuring data quality at every integration boundary.',
      '<b>Healthcare Data Exchange Protocols:</b> Support for FHIR RESTful API patterns, SMART on FHIR authorization, and bulk data export capabilities for population health analytics.',
    ],
  },
  {
    id: 'bentara',
    title: 'Sentra-Bentara — Access Control Engine',
    description: 'Sentra-Bentara is the security, authentication, and access governance engine. In a healthcare AI system handling sensitive patient data, access control is not merely a technical requirement but an <b>ethical and legal obligation</b> — encoded in Indonesia\'s Personal Data Protection Law (UU PDP No. 27/2022) and aligned with international standards including ISO/IEC 27001.',
    subsystems: [
      '<b>Authentication Layer:</b> Multi-factor authentication with role-specific credential requirements. Clinical staff authentication follows enhanced verification protocols commensurate with the sensitivity of data accessed.',
      '<b>Access Tiers & Security Policy:</b> Hierarchical access tier model (Public → Authenticated → Clinical → Administrative → Crown Jewel) with explicit permission matrices and least-privilege enforcement.',
      '<b>Session Approval Validator (GO-Gate):</b> Real-time session validation subsystem that evaluates session legitimacy against behavioral patterns, device fingerprinting, and contextual risk signals before granting access to sensitive clinical functions.',
    ],
  },
  {
    id: 'cermin',
    title: 'Sentra-Cermin — Vector Store & Embedding Engine',
    description: 'Sentra-Cermin provides the vector embedding infrastructure that underpins semantic search, clinical similarity matching, and knowledge retrieval across the platform. It wraps PostgreSQL\'s <code>pgvector</code> extension with a domain-aware embedding management layer, supporting multiple embedding models and embedding versioning for consistent semantic representations over time.',
    subsystems: [
      '<b>Multi-model Embedding Support:</b> Pluggable embedding model architecture supporting general-purpose models and domain-specific biomedical embeddings (BiomedBERT, PubMedBERT variants).',
      '<b>Embedding Version Management:</b> Tracks embedding model versions against indexed documents, enabling safe embedding model upgrades without search quality regression.',
      '<b>Similarity Search Utilities:</b> Optimized cosine similarity, Euclidean distance, and inner-product search operations with HNSW and IVFFlat index support for sub-millisecond approximate nearest-neighbor search at clinical data scale.',
    ],
  },
];

export default function ArticlePage() {
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useIntersectionAnimation<HTMLElement>();
  const quoteRef = useIntersectionAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-b-md focus:text-sm focus:font-semibold"
        style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
      >
        Skip to main content
      </a>

      <TopNav theme={theme} onToggleTheme={toggle} onMenuToggle={() => setSidebarOpen(true)} />

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex pt-12">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[240px] flex-shrink-0">
          <div className="sticky top-12">
            <Sidebar sectionIds={sectionIds} />
          </div>
        </div>

        {/* Main Content */}
        <main id="main-content" className="flex-1 min-w-0">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Tab Bar */}
            <TabBar />

            {/* Article Title */}
            <h1
              className="font-serif font-bold mt-6 mb-1"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Abyss Monorepo
            </h1>

            {/* Subtitle */}
            <p className="text-sm italic mb-6" style={{ color: 'var(--text-tertiary)' }}>
              The supreme knowledge base for the Sentra AI-native healthcare platform.
            </p>

            {/* Infobox (floats right on desktop) */}
            <Infobox />

            {/* Lead Paragraphs */}
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              The <b style={{ color: 'var(--text-primary)' }}>Abyss Monorepo</b> is a unified software ecosystem and architectural framework developed for the <b style={{ color: 'var(--text-primary)' }}>Sentra Healthcare AI</b> platform. It integrates clinical reasoning engines, retrieval-augmented generation (RAG) pipelines, and a comprehensive suite of healthcare applications into a single, boundary-enforced repository — conceived, architected, and built entirely by <b style={{ color: 'var(--text-primary)' }}>dr. Ferdi Iskandar, SH MKN CLM CMDC</b> as sole developer and Founder-CEO of Sentra Healthcare AI.
            </p>

            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              The platform is distinguished by its <b style={{ color: 'var(--text-primary)' }}>AI-native</b> design philosophy, wherein every component — from the low-level database schema to high-level application flows — is governed by a central instruction set (<code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>AGENTS.md</code>) and managed by autonomous agents. This architectural decision positions Abyss not merely as a codebase, but as a <em>living, self-governing intelligence infrastructure</em> for healthcare delivery at national scale.
            </p>

            {/* Founder Quote */}
            <div ref={quoteRef} className="opacity-0 my-6">
              <blockquote
                className="rounded-r-md py-5 px-6"
                style={{
                  background: 'var(--bg-secondary)',
                  borderLeft: '3px solid var(--text-primary)',
                }}
              >
                <p
                  className="font-serif italic text-base mb-2"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
                >
                  "This platform is not merely a technical artifact. It is the culmination of a physician's career spent at the intersection of clinical practice, legal governance, and a relentless conviction that the people of Indonesia deserve better healthcare than geography and resource constraints have historically allowed them."
                </p>
                <p className="text-xs text-right" style={{ color: 'var(--text-tertiary)' }}>
                  — dr. Ferdi Iskandar, SH MKN CLM CMDC
                </p>
              </blockquote>
            </div>

            {/* Context Paragraphs */}
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Abyss represents the culmination of dr. Ferdi Iskandar's life's work in service of Indonesian public health. It is not a startup product optimized for market capture, nor a research prototype destined for academic citation. It is a <b style={{ color: 'var(--text-primary)' }}>national-scale act of dedication</b> — the translation of years of clinical observation, legal scholarship, and technological study into a single, coherent, deployable system capable of reaching the most underserved corners of the Indonesian healthcare landscape.
            </p>

            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Indonesia is a nation of over <b style={{ color: 'var(--text-primary)' }}>270 million people</b> distributed across <b style={{ color: 'var(--text-primary)' }}>17,000 islands</b>, served by a primary healthcare network of more than <b style={{ color: 'var(--text-primary)' }}>10,000 Puskesmas</b> (community health centers) that collectively represent the first — and often only — point of clinical contact for hundreds of millions of citizens. The structural gap between the clinical intelligence available at a tertiary hospital in Jakarta and a Puskesmas in a remote district of Papua or Kalimantan is not merely a matter of equipment or funding. It is a <b style={{ color: 'var(--text-primary)' }}>gap in knowledge</b> — in the real-time synthesis of medical evidence, the structured reasoning through differential diagnoses, the timely recognition of deterioration trajectories that determine whether a patient lives or dies. This knowledge gap is the precise problem that Abyss was built to close.
            </p>

            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            {/* ====== SECTION 1: ORIGIN ====== */}
            <section ref={sectionRef} id="origin" className="mt-10 opacity-0 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                Origin & Historical Context
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The Abyss Monorepo emerged from a convergence of clinical frustration, technological opportunity, and a singular vision: that artificial intelligence, properly grounded in evidence-based medicine and rigorous engineering discipline, could fundamentally transform how healthcare is delivered across Indonesia and, ultimately, the developing world at large.
              </p>

              <h3 id="founder" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Founder Profile
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>dr. Ferdi Iskandar, SH MKN CLM CMDC</b> is the Founder-CEO and sole developer of the Abyss Monorepo and the Sentra Healthcare AI platform. His professional profile is unusually multidisciplinary — combining formal medical training (MD) with graduate legal credentials in notarial law (Master of Notarial Law, MKN), advanced certification in life insurance medicine (CLM), and distinguished recognition as a Certified Medical Doctor Consultant (CMDC). This rare synthesis of clinical expertise, legal acumen, and AI systems design informs every architectural decision embedded in Abyss.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The decision to build Abyss as a solo development project — rather than delegating engineering to a conventional development team — reflects a deliberate philosophical stance: that clinical AI systems must be built by those who deeply understand <em>both</em> the technical substrate <em>and</em> the clinical context in which they will operate. The absence of intermediaries between the clinical mind and the codebase eliminates an entire class of translation errors that have historically plagued health informatics systems.
              </p>

              <h3 id="motivation" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Founding Motivation
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The platform originated from direct clinical observation of systemic inefficiencies in Indonesian healthcare: fragmented patient records across disconnected facilities, delayed referral chains that cost lives in time-critical conditions, a near-total absence of decision support at the point of care, and the chronic inability of primary care physicians to access synthesized, up-to-date medical knowledge in real time. These were not theoretical problems — they were daily realities observed in clinical practice.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Simultaneously, the emergence of large language models capable of sophisticated clinical reasoning — particularly following landmark publications demonstrating benchmark performance on medical licensing examinations — created a credible technical foundation for addressing these gaps. The convergence of problem and solution catalyzed the founding of Sentra Healthcare AI and, with it, the inception of the Abyss Monorepo as its engineering backbone.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                A further motivating factor was the recognition that Indonesia's healthcare system faces a structural challenge common to many middle-income countries: a large, geographically dispersed population with highly variable access to specialist care. AI-augmented clinical decision support, deployed at scale through a well-engineered platform, offers a viable mechanism to extend specialist-level reasoning capability to primary care settings nationwide — a "cognitive infrastructure" layer analogous to what mobile telephony did for financial inclusion.
              </p>

              <h3 id="naming" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Naming & Symbolism
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The name <b style={{ color: 'var(--text-primary)' }}>Abyss</b> carries deliberate symbolic weight. It references the classical concept of the deep — a vast, boundless, and foundational substrate from which structure emerges. In the context of this project, it signifies a knowledge repository without artificial limits: one intended to grow, deepen, and ultimately encompass the totality of clinical intelligence required for comprehensive healthcare delivery. The monorepo is not a finished product but an ever-deepening well of capability.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The Sentra Crown Jewel engines are named in <b style={{ color: 'var(--text-primary)' }}>Bahasa Indonesia</b>, grounding the international-grade technology in its local cultural and linguistic context: <b style={{ color: 'var(--text-primary)' }}>Nada</b> (tone/melody, representing clinical reasoning's pattern recognition), <b style={{ color: 'var(--text-primary)' }}>Pustaka</b> (library/repository, the medical knowledge store), <b style={{ color: 'var(--text-primary)' }}>Sandi</b> (code/cipher, the interoperability and compliance layer), <b style={{ color: 'var(--text-primary)' }}>Bentara</b> (herald/guardian, the access and security layer), and <b style={{ color: 'var(--text-primary)' }}>Cermin</b> (mirror/reflection, the vector embedding and semantic similarity engine).
              </p>
            </section>

            {/* ====== SECTION 2: ARCHITECTURE ====== */}
            <section id="architecture" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Architecture
              </h2>

              <h3 id="design-philosophy" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Design Philosophy
              </h3>
              <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                Abyss is built on three foundational architectural principles that distinguish it from conventional health informatics platforms:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>AI-Native by Design.</b>{' '}
                  Unlike systems where AI is a bolted-on feature layer, every component of Abyss — from the database schema to the API contracts — is designed with AI reasoning as a first-class citizen. The <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>AGENTS.md</code> instruction set governs autonomous agents that manage the codebase itself, making the system self-documenting and self-consistent in a manner not achievable through conventional development practices.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Boundary Enforcement as Safety.</b>{' '}
                  In safety-critical systems, the accidental coupling of components can have life-threatening consequences. Abyss implements hard architectural boundaries — enforced by Turborepo's package graph — that prevent unauthorized access to Crown Jewel logic. A misconfigured application layer cannot inadvertently modify clinical reasoning outputs. This is not a convention; it is an enforced architectural constraint.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Monorepo as Single Source of Truth (SSOT).</b>{' '}
                  All logic, types, schemas, and documentation for the entire Sentra platform live in one repository. This eliminates version drift between dependent services — a common source of subtle, hard-to-detect bugs in distributed healthcare systems — and enables atomic, cross-cutting changes that maintain system coherence.
                </li>
              </ul>

              <h3 id="layer-model" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Layer Model
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Abyss utilizes a <b style={{ color: 'var(--text-primary)' }}>layered, boundary-enforced architecture</b> orchestrated by Turborepo 2.x. The codebase is organized into a strict hierarchy of packages in which higher layers depend on lower layers, but never the reverse. This unidirectional dependency graph is the primary mechanism by which architectural integrity is maintained.
              </p>
              <EngineGraph />

              <h3 id="boundary-enforcement" className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Boundary Enforcement
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The boundary enforcement system is implemented through a combination of Turborepo workspace constraints, ESLint import rules, and a dedicated <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>boundary-manager</code> package within the tooling layer. Violations of architectural boundaries are treated as build failures — they cannot be merged into the main branch.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Crown Jewel packages carry the highest protection level. They may be consumed by application-layer packages but may not be directly modified by any automated process without explicit authorization through the governance workflow defined in <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>AGENTS.md</code>. All changes to Crown Jewel logic require human review and are subject to the validation protocols defined in the respective engine documentation.
              </p>
            </section>

            {/* ====== SECTION 3: CROWN JEWEL ENGINES ====== */}
            <section id="engines" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                The Crown Jewel Engines
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The term <em>Crown Jewels</em> — borrowed from the security and risk management lexicon — denotes the assets within a system whose compromise or corruption would cause irreparable harm. In Abyss, the five Crown Jewel engines represent the irreducible clinical and operational intelligence of the platform. They are maintained under the strictest version control discipline, documented to the highest standard, and isolated behind multiple layers of access control. They live in the <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>@sentra/*</code> namespace.
              </p>

              {/* Poem Block */}
              <div
                className="rounded-r-md py-6 px-7 my-6 md:columns-2 md:gap-8"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderLeft: '3px solid var(--text-primary)',
                }}
              >
                <h4
                  className="text-center font-bold text-sm mb-4 md:column-span-all"
                  style={{ color: 'var(--text-primary)' }}
                >
                  The Crown Jewels of Sentra
                </h4>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  In the quiet core where Sentra breathes,<br />
                  five jewels wake beneath the deep.<br />
                  Not tools alone, not names in code,<br />
                  but ancient lights on a guarded road.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <b style={{ color: 'var(--text-primary)' }}>Nada</b> calls, a voice through night,<br />
                  seeking meaning, shape, and light.<br />
                  Its signal flows where knowledge starts,<br />
                  to <b style={{ color: 'var(--text-primary)' }}>Pustaka</b>, keeper of minds and hearts.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <b style={{ color: 'var(--text-primary)' }}>Pustaka</b> turns the pages wide,<br />
                  where memory, law, and truth reside.<br />
                  It gathers fragments, names the stream,<br />
                  then looks through <b style={{ color: 'var(--text-primary)' }}>Cermin</b> like a dream.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  For <b style={{ color: 'var(--text-primary)' }}>Cermin</b> sees what others miss,<br />
                  a mirrored gate, a silent witness.<br />
                  It does not speak with borrowed flame,<br />
                  it reflects the source, the wound, the name.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Then hidden deep where secrets stand,<br />
                  <b style={{ color: 'var(--text-primary)' }}>Sandi</b> waits with coded hand.<br />
                  What must be sealed, it shapes with care,<br />
                  so fragile truth is safe from air.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  And at the gate, with watchful eyes,<br />
                  <b style={{ color: 'var(--text-primary)' }}>Bentara</b> guards what must not die.<br />
                  No reckless hand, no wandering key,<br />
                  may touch the crown or bend decree.
                </p>
                <p className="font-serif italic text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  So <b style={{ color: 'var(--text-primary)' }}>Nada</b> calls, and <b style={{ color: 'var(--text-primary)' }}>Pustaka</b> knows,<br />
                  through <b style={{ color: 'var(--text-primary)' }}>Cermin&rsquo;s</b> glass the meaning flows.<br />
                  To <b style={{ color: 'var(--text-primary)' }}>Sandi&rsquo;s</b> seal, to <b style={{ color: 'var(--text-primary)' }}>Bentara&rsquo;s</b> shield,<br />
                  the sacred system is revealed.
                </p>
                <p className="font-serif italic text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Five jewels bound, yet each alone,<br />
                  a living law beneath the throne.<br />
                  Not built for noise, nor made for fame&mdash;<br />
                  but to protect the Sentra flame.
                </p>
              </div>

              {/* Engine Cards */}
              {engines.map((engine) => (
                <EngineCard key={engine.id} {...engine} />
              ))}
            </section>

            {/* ====== SECTION 4: PLATFORM SERVICES ====== */}
            <section id="platform" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Platform Services
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The Platform Services layer provides the operational infrastructure upon which the Crown Jewel Engines and Application Layer depend. These services implement cross-cutting concerns — orchestration, persistence, messaging, observability, and integration — in a manner that is clinically agnostic but operationally critical.
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Orchestration Engine (NestJS):</b>{' '}
                  Coordinates long-running, multi-step clinical workflows as distributed sagas via Apache Kafka. Saga orchestration ensures that complex, multi-service operations — such as a full patient intake workflow spanning authentication, record creation, clinical assessment, and referral generation — either complete atomically or compensate deterministically on failure.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Sentra Portal (Next.js):</b>{' '}
                  Operational dashboard providing real-time visibility into platform health, workflow status, AI engine performance, and clinical data flows. Serves both technical operators and clinical administrators, with role-based views appropriate to each audience.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Database & Persistence Layer:</b>{' '}
                  PostgreSQL 16+ with <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>pgvector</code> extension for high-performance vector similarity search. Redis provides high-speed caching and session state management. The database package encapsulates all schema definitions, migration scripts, and query utilities in a shared package consumed by all services requiring data access.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Integration Platforms:</b>{' '}
                  Manages connectivity between Abyss and external healthcare systems — hospital information systems (SIMRS), laboratory information systems (LIS), and national health data infrastructure including Indonesia's P-Care and SATUSEHAT platforms. The Integration Bridge package abstracts vendor-specific API protocols behind a unified connector interface.
                </li>
                <li>
                  <b style={{ color: 'var(--text-primary)' }}>Messaging Infrastructure (Apache Kafka):</b>{' '}
                  Topic management, schema registry integration, and consumer group coordination for reliable, ordered event delivery across platform services. Provides the event-driven backbone for all asynchronous inter-service communication.
                </li>
              </ul>
            </section>

            {/* ====== SECTION 5: APPLICATION ECOSYSTEM ====== */}
            <section id="apps" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Application Ecosystem
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The Application Layer comprises all end-user-facing products built on the Abyss platform infrastructure. Applications are organized by domain, each serving a distinct stakeholder group while sharing the common engine, platform, and primitive foundation of the monorepo.
              </p>

              {/* Applications Table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm rounded-md overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)' }}>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Domain</th>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Key Applications</th>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Primary Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { domain: 'Healthcare', apps: 'sentra-main, sentra-assist, intelligence-board, referralink, primary healthcare delivery', users: 'Clinicians, patients, administrators' },
                      { domain: 'Academic', apps: 'clinical-simulator, evaluation-engine, academic-solutions', users: 'Medical students, educators' },
                      { domain: 'Community', apps: 'classy-memory, classy-transformer, daf-website, community innovation apps', users: 'Community health workers, public' },
                      { domain: 'Corporate', apps: 'ferdiiskandar-portfolio, branding platform, internal comms', users: 'Sentra org, partners' },
                    ].map((row, i) => (
                      <tr
                        key={row.domain}
                        className="transition-colors duration-150"
                        style={{
                          background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)')}
                      >
                        <td className="px-3 py-2.5 font-bold" style={{ color: 'var(--text-primary)' }}>{row.domain}</td>
                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.apps}</td>
                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.users}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The flagship application, <b style={{ color: 'var(--text-primary)' }}>Sentra Main</b>, is a full-stack Next.js application that exposes the clinical reasoning, RAG knowledge retrieval, and patient management capabilities of the platform through a clinician-facing interface. It integrates the AI Assistant System — powered by Sentra-Nada and Sentra-Pustaka — directly into clinical workflows, presenting AI-generated insights at the point of care with appropriate confidence levels and source citations. <b style={{ color: 'var(--text-primary)' }}>ReferraLink</b> manages the end-to-end referral coordination workflow, from urgency triage to receiving facility selection and handover documentation. The <b style={{ color: 'var(--text-primary)' }}>Intelligence Analytics Board</b> provides population-level clinical intelligence for healthcare administrators and public health officers.
              </p>
            </section>

            {/* ====== SECTION 6: WORKFLOW ====== */}
            <section id="workflow" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Development Workflow
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Development in the Abyss Monorepo is governed by a structured workflow designed to maintain the highest standards of code quality, clinical safety, and architectural integrity across all packages. As a solo-developer project, the workflow is deliberately optimized for focused, high-velocity development cycles while enforcing the quality gates necessary for a safety-critical healthcare system.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                All development tasks are managed via root-level pnpm scripts that delegate to Turborepo for intelligent task scheduling, caching, and parallelization:
              </p>

              {/* Code Block */}
              <div
                className="rounded-md p-4 mb-4 overflow-x-auto font-mono text-[13px] leading-[1.8]"
                style={{
                  background: 'var(--code-bg)',
                  border: '1px solid var(--code-border)',
                }}
              >
                <div>pnpm dev <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Start all development servers in parallel</span></div>
                <div>pnpm build <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Build all packages (Turborepo-cached)</span></div>
                <div>pnpm test <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Run all test suites with coverage</span></div>
                <div>pnpm test:engines <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Run Crown Jewel engine tests only</span></div>
                <div>pnpm lint <span className="italic" style={{ color: 'var(--text-tertiary)' }}># ESLint + boundary enforcement checks</span></div>
                <div>pnpm typecheck <span className="italic" style={{ color: 'var(--text-tertiary)' }}># TypeScript strict type checking</span></div>
                <div>pnpm db:migrate <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Apply pending database migrations</span></div>
                <div>pnpm db:studio <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Open Drizzle Studio</span></div>
                <div>pnpm db:seed <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Seed dev database with clinical fixtures</span></div>
                <div>pnpm agents:validate <span className="italic" style={{ color: 'var(--text-tertiary)' }}># Validate AGENTS.md consistency</span></div>
              </div>

              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The CI/CD pipeline — implemented via GitHub Actions — enforces a mandatory gate sequence before any change reaches the main branch: type checking, boundary validation, unit tests, integration tests, and a security audit. Changes to Crown Jewel packages trigger an additional clinical logic review checklist that must be explicitly signed off. Containerized development environments are maintained via Docker Compose, encapsulating PostgreSQL, Redis, Kafka, and dependent services in reproducible configurations.
              </p>
            </section>

            {/* ====== SECTION 7: GOVERNANCE ====== */}
            <section id="governance" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Governance & Safety
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The governance model of Abyss is one of its most distinctive features. It is not sufficient for a healthcare AI platform to be technically correct; it must also be demonstrably governed, with clear accountability chains, documented decision frameworks, and auditable change histories.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                AGENTS.md — The Supreme Instruction Set
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>AGENTS.md</code> is the central governance document of the Abyss Monorepo. It functions as both a configuration specification for autonomous AI agents that assist in platform development and as a binding constitutional document defining the rules, boundaries, and accountability structures of the system. All automated processes operating within the repository are bound by its provisions. Conflicts between agent-generated changes and AGENTS.md specifications are treated as errors, not warnings.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The document defines: the package boundary map, the Crown Jewel protection protocol, the agent lifecycle (what agents may and may not do autonomously), the decision-making framework for ambiguous cases, and the emergency handoff procedures that trigger human review for any operation affecting clinical data integrity.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                Single Source of Truth (SSOT) Policy
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The SSOT policy mandates that no piece of information — schema definition, type declaration, clinical reference data, or configuration value — may exist in more than one canonical location within the monorepo. All consumers of that information must reference the canonical location. State synchronization is managed via the <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>.agent/</code> hierarchy — a structured directory containing agent-readable state manifests that enable autonomous validation of SSOT compliance.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-2 scroll-mt-20" style={{ color: 'var(--text-primary)' }}>
                AI Safety & Human Accountability
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Consistent with responsible AI principles, all clinical AI outputs within the Abyss platform are explicitly designated as <em>decision support</em>, not decision replacement. No clinical AI output may be surfaced to end-users without a human-review affordance, confidence indicator, evidence citation, and clinical disclaimer. Automated clinical decisions — without human confirmation — are architecturally prohibited for any action affecting patient care.
              </p>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Bias monitoring is implemented as a first-class concern. The evaluation frameworks for Sentra-Nada and Sentra-Pustaka include demographic disaggregation of performance metrics to detect differential performance across population subgroups. Identified biases are logged in a tracked bias register and subject to mandatory remediation review.
              </p>
            </section>

            {/* ====== SECTION 8: REGULATORY ====== */}
            <section id="regulatory" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Regulatory & Compliance Posture
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The development of Abyss is conducted in awareness of the evolving regulatory landscape governing AI-based medical software. The platform is being designed and documented to facilitate regulatory submissions as the Indonesian regulatory framework for AI medical devices matures, and to align with the most stringent applicable international standards.
              </p>

              {/* Compliance Table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm rounded-md overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)' }}>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Framework</th>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Domain</th>
                      <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { framework: 'UU PDP No. 27/2022', domain: 'Indonesia Personal Data Protection', relevance: 'Patient data handling; informs Sentra-Bentara access control design and data residency requirements' },
                      { framework: 'HL7 FHIR R4', domain: 'Healthcare Interoperability', relevance: 'International standard for health data exchange; implemented in Sentra-Sandi engine' },
                      { framework: 'FDA AI/ML SaMD Guidance', domain: 'AI Medical Device Regulation (USA)', relevance: 'Informs SaMD design principles; applied to Sentra-Nada clinical reasoning outputs' },
                      { framework: 'ISO/IEC 27001', domain: 'Information Security Management', relevance: 'Target framework for platform security controls; informs threat modeling and access control policies' },
                      { framework: 'IEC 62304', domain: 'Medical Device Software Lifecycle', relevance: 'Defines SDLC requirements for medical device software; informs CI/CD and testing framework design' },
                      { framework: 'MoH Permenkes on EHR', domain: 'Indonesian Ministry of Health EHR Regulation', relevance: 'Governs EHR format, content, and retention requirements; informs data model design' },
                    ].map((row, i) => (
                      <tr
                        key={row.framework}
                        className="transition-colors duration-150"
                        style={{
                          background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)')}
                      >
                        <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.framework}</td>
                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.domain}</td>
                        <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.relevance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm italic mb-4" style={{ color: 'var(--text-tertiary)' }}>
                The Abyss platform and its clinical AI components are currently in active development. No component currently holds formal regulatory clearance as a medical device. All clinical outputs are informational only and do not constitute medical advice. Consult a qualified clinician for all clinical decisions.
              </p>
            </section>

            {/* ====== SECTION 9: DOCUMENTATION LIBRARY ====== */}
            <section id="library" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Complete Documentation Library
              </h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                The following is a comprehensive index of all documentation files available within the Abyss Monorepo, organized by domain and package.
              </p>
              <LibraryGrid />
            </section>

            {/* ====== SECTION 10: TECHNICAL SPECIFICATIONS ====== */}
            <section id="tech-specs" className="mt-10 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Core Stack',
                    items: [
                      { label: 'Runtime', value: 'Node.js 22+' },
                      { label: 'Package Manager', value: 'pnpm 9.x' },
                      { label: 'Monorepo Engine', value: 'Turborepo 2.x' },
                      { label: 'Frameworks', value: 'Next.js, NestJS' },
                    ],
                  },
                  {
                    title: 'Data & AI',
                    items: [
                      { label: 'DB', value: 'PostgreSQL 16+' },
                      { label: 'Vector Store', value: 'pgvector' },
                      { label: 'Messaging', value: 'Apache Kafka' },
                      { label: 'AI Orchestration', value: 'LangFlow' },
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-md p-5 transition-all duration-250"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-primary)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                      {card.title}
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      {card.items.map((item) => (
                        <li key={item.label} style={{ color: 'var(--text-secondary)' }}>
                          <b style={{ color: 'var(--text-primary)' }}>{item.label}:</b> {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ====== SECTION 11: REFERENCES ====== */}
            <section id="references" className="mt-10 mb-12 scroll-mt-20">
              <h2
                className="font-serif font-semibold mb-4 pb-1"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderBottom: '1px solid var(--border-subtle)',
                  lineHeight: 1.2,
                }}
              >
                References
              </h2>
              <ol className="text-sm space-y-1.5" style={{ color: 'var(--text-secondary)', listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
                {referenceDocs.map((doc) => (
                  <li key={doc.label}>
                    <a href={documentHref(doc.title)} className={doc.className}>
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </main>

        {/* Command Center */}
        <div className="hidden xl:block w-[280px] flex-shrink-0">
          <div className="sticky top-16 pt-6 pr-4">
            <CommandCenter />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
