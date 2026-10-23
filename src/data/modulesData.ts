import { ModuleItem } from '../types';

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 'mod-01',
    code: 'MOD-01',
    tag: 'Legal',
    title: 'Court Order Summarisation',
    subtitle: 'Judicial Orders, Writs & Compliance Mandates',
    description: 'Distill High Court and Supreme Court interim/final orders, affidavits, counter-petitions, and administrative mandates into actionable executive briefs.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1NhoEW3-ypQ8leAnWxaOp8vD86dIpZ4XY/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Court Order Reference Document (MOD-07.pdf)',
        filename: 'MOD01_Court_Order.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1NhoEW3-ypQ8leAnWxaOp8vD86dIpZ4XY'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Act as a Senior Legal Advisor to District Administration. Analyze the attached Court Order, extract key directives, identify responsible officers, statutory deadlines, and draft an executive compliance brief with an actionable checklist.'
  },
  {
    id: 'mod-02',
    code: 'MOD-02',
    tag: 'Governance',
    title: 'Review Meeting Minutes Analysis',
    subtitle: 'Administrative Review Synthesis & ATR Tracking',
    description: 'Convert departmental review meeting minutes, transcripts, and proceedings into an itemized Action Taken Report (ATR) matrix with deadlines and responsible authorities.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1VqADp30oOAjUgL53MXK_L9D6i4Sf7-XA/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'CWSS Water Supply Meeting Minutes',
        filename: 'MOD02_Water_Supply_Meeting_Minutes.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1VqADp30oOAjUgL53MXK_L9D6i4Sf7-XA'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Transform the attached District Collectorate monthly developmental review meeting proceedings into a structured 10-point Action Taken Report (ATR) matrix detailing department, actionable task, target date, and monitoring officer.'
  },
  {
    id: 'mod-03',
    code: 'MOD-03',
    tag: 'Translation',
    title: 'English to Tamil Translation',
    subtitle: 'Bilingual Administrative Transcreation',
    description: 'Perform context-aware bilingual translation of official executive orders, circulars, press notes, and citizen notifications into formal administrative Tamil.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    referenceMaterials: [
      {
        title: 'Standard Tamil Administrative Terminology Lexicon',
        filename: 'Tamil_Admin_Terminology_Glossary.pdf',
        format: 'PDF',
        size: '180 KB',
        contentSnippet: 'Official Glossary: Administrative Sanction = நிருவாக அனுமதி, Technical Sanction = தொழில்நுட்ப அனுமதி, Disciplinary Proceeding = ஒழுங்கு நடவடிக்கை.'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Translate the following government notification from English to formal administrative Tamil (அரசு நிர்வாக தமிழ் நடை), preserving technical designations, statutory references, and governmental tone.'
  },
  {
    id: 'mod-04',
    code: 'MOD-04',
    tag: 'Circulars',
    title: 'Explanation of Circulars / G.Os',
    subtitle: 'Government Order Interpretation & Implementation Matrix',
    description: 'Break down complex Government Orders (G.Os), departmental circulars, and notifications into clear summaries, operational guidelines, and field officer checklists.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1Wj3yxVxejEcv1YKCPxYn0kBm9eAE8qGO/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'G.O.Ms.No.201 - Village Panchayat to Town Panchayat',
        filename: 'MOD04_G.O.Ms.No.201.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1Wj3yxVxejEcv1YKCPxYn0kBm9eAE8qGO'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Provide a comprehensive breakdown of the attached Government Order (G.O.). Explain the context, main policy directives, budget/financial implications, target beneficiaries, and step-by-step implementation duties for field-level officials.'
  },
  {
    id: 'mod-05',
    code: 'MOD-05',
    tag: 'Schemes',
    title: 'Scheme Guidelines / Provisions Summary',
    subtitle: 'Welfare Scheme Implementation & Eligibility Matrix',
    description: 'Synthesize state and central government scheme guidelines, beneficiary eligibility criteria, funding patterns, subsidy limits, and procedural workflows.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1ugeKMXV0j59y3QIbQEZtmL13BkyUawDJ/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Delimitation Act & Rule Provision',
        filename: 'MOD05_Delimitation_Act_and_Rule.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1ugeKMXV0j59y3QIbQEZtmL13BkyUawDJ'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Summarize the attached government welfare scheme guidelines into an easy-to-digest field guide covering eligibility criteria, required documentation, subsidy/benefit amount, application procedure, and grievance channels.'
  },
  {
    id: 'mod-06',
    code: 'MOD-06',
    tag: 'Statutory',
    title: 'Show Cause Notice',
    subtitle: 'Statutory Notice & Compliance Documentation',
    description: 'Draft formal show cause notices, statutory justifications, legal citations, and point-by-point compliance documentation for administrative and regulatory enforcement.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1F2ghPuiT6Ev5X-G0DxZwpRe51krlzgR0/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Show Cause Notice - Reasons Document',
        filename: 'MOD06_Show_Cause_Notice_Reasons.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1F2ghPuiT6Ev5X-G0DxZwpRe51krlzgR0'
      },
      {
        title: 'Show Cause Notice Standard Format',
        filename: 'MOD06_Show_Cause_Notice_Format.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1oOIzpf5D1rZlxZg9P48dv0uXx2wlVvbp'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Draft a formal, legally robust Show Cause Notice citing relevant sections of the Tamil Nadu Land Encroachment Act / Service Conduct Rules, detailing specific violations, evidence, and mandating written response within 7 days.'
  },
  {
    id: 'mod-07',
    code: 'MOD-07',
    tag: 'Sanction',
    title: 'TS / AS File Summarisation',
    subtitle: 'Technical & Administrative Sanction Review',
    description: 'Analyze and summarize Technical Sanction (TS) and Administrative Sanction (AS) files, cost estimates, scope of work, budget heads, and scrutiny notes.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1BKozEqR1ixMYgV16gwCtWnYztRGj_KjN/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'AS Blue Flag Beach Programme - Summarisation',
        filename: 'MOD07_AS_Blue_Flag_Beach_Programme.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1BKozEqR1ixMYgV16gwCtWnYztRGj_KjN'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Review the attached Technical Sanction (TS) and Administrative Sanction (AS) file proposal. Generate a concise scrutiny note covering project scope, estimated cost, fund allocation head, rate analysis adherence, and statutory clearance status.'
  },
  {
    id: 'mod-08',
    code: 'MOD-08',
    tag: 'Inspection',
    title: 'Field Inspection Notes to Report',
    subtitle: 'Field Observation to Structured Official Dossier',
    description: 'Convert raw field inspection notes, audio dictations, site measurements, and ground observations into structured, official inspection reports with photographic evidence tags.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1_JBZHDbeHE2eORTQRpSRmZDyAqF9IDLr/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Field Inspection Official Format',
        filename: 'MOD08_Inspection_Format.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1_JBZHDbeHE2eORTQRpSRmZDyAqF9IDLr'
      },
      {
        title: 'Field Inspection Reference Notes (Tamil)',
        filename: 'MOD08_Inspection_Notes_Tamil.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1HrNNikKa56tuCUjIluIPU_u7ZMwhY7eG'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Convert the following rough field notes taken during a field inspection into a polished, formal administrative inspection report including site specifics, observations, defects/anomalies, beneficiary statements, and officer recommendations.'
  },
  {
    id: 'mod-09',
    code: 'MOD-09',
    tag: 'Tenders',
    title: 'Scrutinising a Draft Tender / RFP',
    subtitle: 'Tender Document Vetting & Clause Compliance',
    description: 'Scrutinize tender documents, RFPs, eligibility criteria, evaluation rubrics, penalty clauses, and Tamil Nadu Transparency in Tenders Act compliance.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    referenceMaterials: [
      {
        title: 'Draft Tender / RFP Document (01PudurPUO)',
        filename: 'MOD09_Draft_Tender_01PudurPUO.docx',
        format: 'DOCX',
        size: '1.1 MB',
        url: '/docs/MOD09_Draft_Tender_01PudurPUO.docx'
      },
      {
        title: 'Office Note for LOA (ON for LOA)',
        filename: 'MOD09_ON_for_LOA.docx',
        format: 'DOCX',
        size: '322 KB',
        url: '/docs/MOD09_ON_for_LOA.docx'
      },
      {
        title: 'LOA Approved Document (Letter of Award)',
        filename: 'MOD09_LOA_approved.pdf',
        format: 'PDF',
        size: '74 KB',
        url: '/docs/MOD09_LOA_approved.pdf'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Scrutinize the attached draft Tender / Request for Proposal (RFP) document, Office Note for LOA, and approved LOA document. Identify ambiguities, check compliance with Tamil Nadu Transparency in Tenders Act/Rules, evaluate eligibility criteria, and recommend essential risk mitigation clauses.'
  },
  {
    id: 'mod-10',
    code: 'MOD-10',
    tag: 'Procurement',
    title: 'Sanction Order / Work Order Drafting',
    subtitle: 'Formal Sanction & Contractor Work Order',
    description: 'Draft official administrative/financial sanction orders and formal work orders specifying scope of works, milestones, payment schedules, and performance bank guarantees.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1T6B7l6t5bKQ-8B2F9JfFbpgnVsBc_IJ8/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Sanction Order & Work Order Reference Template',
        filename: 'MOD10_Work_Order_Template.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1T6B7l6t5bKQ-8B2F9JfFbpgnVsBc_IJ8'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Draft an official Financial Sanction Order and corresponding Work Order for the selected contractor, specifying sanctioned amount, budget accounting head, milestones, completion period, LD clauses, and measurement verification protocol.'
  },
  {
    id: 'mod-11',
    code: 'MOD-11',
    tag: 'Legal',
    title: 'Acts / Rules Query',
    subtitle: 'Statutory Interpretation & Jurisprudence Search',
    description: 'Interpret statutory revenue acts, administrative service rules, municipal codes, and government manuals with precise citations and case references.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://drive.google.com/file/d/1hEXwoiN4t83a1mcdQDnTHpZOA5IpyVOw/view?usp=sharing',
    referenceMaterials: [
      {
        title: 'Tamil Nadu Panchayats Act Dossier',
        filename: 'MOD11_Panchayat_Act.pdf',
        format: 'PDF',
        size: 'Direct Download',
        url: 'https://drive.google.com/uc?export=download&id=1hEXwoiN4t83a1mcdQDnTHpZOA5IpyVOw'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Analyze the following administrative query against relevant Tamil Nadu statutory Acts and Rules (e.g., Patta Pass Book Act, District Municipalities Act, Revenue Standing Orders), providing exact section citations and jurisdictional hierarchy.'
  },
  {
    id: 'mod-12',
    code: 'MOD-12',
    tag: 'Analytics',
    title: 'Block-Level Progress Consolidation',
    subtitle: 'Multi-Block Scheme Performance Synthesis',
    description: 'Consolidate and benchmark block-level progress data, physical/financial achievement metrics, inter-block variance, and identify lagging panchayats for targeted intervention.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    driveFolderUrl: 'https://docs.google.com/presentation/d/1GVxPCN0ilJq8TRMLfzx0vnsWGkETNCVd7l9xkdVRgS4/edit?usp=sharing',
    referenceMaterials: [
      {
        title: 'Block Progress Presentation (VB G RAMG)',
        filename: 'MOD12_Block_Progress_Consolidation.pptx',
        format: 'PPTX',
        size: 'Direct Download',
        url: 'https://docs.google.com/presentation/d/1GVxPCN0ilJq8TRMLfzx0vnsWGkETNCVd7l9xkdVRgS4/export/pptx'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Analyze the attached block-wise scheme implementation dataset across all blocks in the district. Rank blocks by physical and financial progress %, highlight bottom-quartile performers, and draft targeted corrective instructions.'
  },
  {
    id: 'mod-13',
    code: 'MOD-13',
    tag: 'Analytics',
    title: 'Data Analysis – Water Supply',
    subtitle: 'Piped & Tanker Supply Monitoring Dossier',
    description: 'Analyze daily water distribution datasets, per-capita supply metrics, tanker supply logistics, pressure logs, pipeline defect registers, and deficit cluster predictions.',
    acceptedFormats: ['Word (.docx)', 'PDF (.pdf)', 'PowerPoint (.pptx)'],
    driveFolderUrl: 'https://docs.google.com/spreadsheets/d/14obwRy-5ICz29HwQjDayrP9AAXBhZO61I8geiMXadqQ/edit?usp=sharing',
    referenceMaterials: [
      {
        title: 'Water Supply Dataset (Excel)',
        filename: 'MOD13_Water_Supply_Data.xlsx',
        format: 'XLSX',
        size: 'Direct Download',
        url: 'https://docs.google.com/spreadsheets/d/14obwRy-5ICz29HwQjDayrP9AAXBhZO61I8geiMXadqQ/export?format=xlsx'
      }
    ],
    status: 'pending',
    uploadedFile: null,
    promptGuide: 'Perform data analysis on the provided water supply dataset (daily LPCD, tanker trips, habitations covered, chlorination reports). Summarize deficit panchayats, supply anomalies, and prepare an executive briefing note for water security monitoring.'
  }
];
