import { Question, PassionAnswers } from './types';

export const SECTION_1_QUESTIONS: Question[] = [
  {
    id: 's1_q1',
    section: 1,
    text: 'I find myself reading articles or watching programs about cell replication and molecular systems in my spare time.',
    weights: { Biotechnology: 1.0, Biochemistry: 1.0, Microbiology: 0.5 },
    category: 'Curiosity about living organisms'
  },
  {
    id: 's1_q2',
    section: 1,
    text: 'I get highly satisfied when troubleshooting and calibrating delicate scientific equipment or electronic sensors.',
    weights: { Physics: 1.0, Chemistry: 0.5 },
    category: 'Interest in technology and innovation'
  },
  {
    id: 's1_q3',
    section: 1,
    text: 'I am intrigued by how chemical formulations are synthesised and modified to create new daily products or materials.',
    weights: { Chemistry: 1.0, Biochemistry: 0.5 },
    category: 'Favorite science subjects'
  },
  {
    id: 's1_q4',
    section: 1,
    text: 'I enjoy using mathematical equations and stats to find patterns of order in complex database streams.',
    weights: { Physics: 1.0, Biotechnology: 0.5 },
    category: 'Enjoyment of calculations and data analysis'
  },
  {
    id: 's1_q5',
    section: 1,
    text: 'I actively avoid reading about microscopic pathogens or biological diseases as I find them uninteresting.',
    weights: { Microbiology: -1.0, Biotechnology: -0.5 },
    reverseScored: true,
    category: 'Curiosity about living organisms'
  }
];

export const SECTION_2_QUESTIONS: Question[] = [
  {
    id: 's2_q1',
    section: 2,
    text: 'I possess the patience to wait weeks for cultures to incubate or crystals to form without feeling rushed.',
    weights: { Microbiology: 1.0, Chemistry: 0.5 },
    category: 'Patience'
  },
  {
    id: 's2_q2',
    section: 2,
    text: 'I pride myself on document logs down to micro-liter levels; even tiny measurement discrepancies bother me.',
    weights: { Chemistry: 1.0, Physics: 0.5, Biochemistry: 0.5 },
    category: 'Attention to detail'
  },
  {
    id: 's2_q3',
    section: 2,
    text: 'I enjoy looking for creative, non-traditional solutions to scientific hurdles rather than strictly following set manuals.',
    weights: { Biotechnology: 1.0, Chemistry: 0.5 },
    category: 'Creativity'
  },
  {
    id: 's2_q4',
    section: 2,
    text: 'I prefer working independently on technical analysis, without needing constant collaboration or talking with a team.',
    weights: { Physics: 1.0, Chemistry: 0.5 },
    category: 'Independent work preference'
  },
  {
    id: 's2_q5',
    section: 2,
    text: 'I get frustrated when I have to follow strict laboratory procedures; I prefer designing steps on the fly.',
    weights: { Chemistry: -1.0, Microbiology: -1.0 },
    reverseScored: true,
    category: 'Attention to detail'
  }
];

export const SECTION_3_QUESTIONS: Question[] = [
  {
    id: 's3_q1',
    section: 3,
    text: 'I would be highly interested in working as a diagnostic officer screening patient blood samples to identify microbial infections.',
    weights: { Microbiology: 1.0, Biochemistry: 0.5 },
    category: 'Medical diagnostics'
  },
  {
    id: 's3_q2',
    section: 3,
    text: 'I want to design the biochemical pathways of new pharmaceutical drugs to stop cell-receptor activities in target diseases.',
    weights: { Biochemistry: 1.0, Chemistry: 0.5, Biotechnology: 0.5 },
    category: 'Drug development'
  },
  {
    id: 's3_q3',
    section: 3,
    text: 'I would love to screen industrial effluents and river waters for heavy metal contaminants using advanced spectrometers.',
    weights: { Chemistry: 1.0, Physics: 0.5 },
    category: 'Environmental monitoring'
  },
  {
    id: 's3_q4',
    section: 3,
    text: 'I am interested in running quality control checks on processed food batches to ensure no pathogenic spores are present.',
    weights: { Microbiology: 1.0, Biotechnology: 0.5 },
    category: 'Food safety'
  },
  {
    id: 's3_q5',
    section: 3,
    text: 'I prefer administrative, sales, or managerial roles in healthcare over active laboratory research or technical experimentation.',
    weights: { Biotechnology: -0.5, Biochemistry: -0.5, Microbiology: -0.5, Chemistry: -0.5, Physics: -0.5 },
    reverseScored: true,
    category: 'Research and innovation'
  },
  {
    id: 's3_q6',
    section: 3,
    text: 'I want to work on developing next-generation alternative energy storage devices like fuel cells, supercapacitors, or solar cells.',
    weights: { Physics: 1.0, Chemistry: 0.5 },
    category: 'Technology development'
  },
  {
    id: 's3_q7',
    section: 3,
    text: 'I would find it deeply fulfilling to teach science students or direct research studies in higher education.',
    weights: { Chemistry: 0.5, Physics: 0.5, Biochemistry: 0.5, Biotechnology: 0.5, Microbiology: 0.5 },
    category: 'Teaching and academia'
  },
  {
    id: 's3_q8',
    section: 3,
    text: 'I am excited by the prospect of engineering living agricultural plants to make them naturally resistant to local insect pests.',
    weights: { Biotechnology: 1.0, Biochemistry: 0.5 },
    category: 'Technology development'
  },
  {
    id: 's3_q9',
    section: 3,
    text: 'Assembling and testing medical imaging equipment like X-Ray sensors, ultrasound transducers, or MRIs is my ideal workspace.',
    weights: { Physics: 1.0 },
    category: 'Medical diagnostics'
  },
  {
    id: 's3_q10',
    section: 3,
    text: 'I do not want to work in industrial petrochemical quality control, testing crude oil fractions or standard reagent grades.',
    weights: { Chemistry: -1.0 },
    reverseScored: true,
    category: 'Industrial quality control'
  }
];

export const SECTION_4_QUESTIONS: Question[] = [
  // ==================== BIOTECHNOLOGY SCENARIOS ====================
  {
    id: 's4_bt1',
    section: 4,
    text: 'I am excited by the possibility of modifying living organisms using programmable nucleic code systems to solve agricultural or medical challenges.',
    weights: { Biotechnology: 1.0, Biochemistry: 0.3 },
    category: 'Genetic engineering'
  },
  {
    id: 's4_bt2',
    section: 4,
    text: 'In a workplace project, I would happily write script-based sorting algorithms to map and locate overlapping genetic maps in an enormous national bio-bank.',
    weights: { Biotechnology: 1.0 },
    category: 'Bioinformatics'
  },
  {
    id: 's4_bt3',
    section: 4,
    text: 'If tasked to design a biosensor, I would enjoy engineering a modified cellular receptor that shifts colour immediately when target antibodies attach.',
    weights: { Biotechnology: 1.0, Biochemistry: 0.5, Microbiology: 0.3 },
    category: 'Medical innovations'
  },
  {
    id: 's4_bt4',
    section: 4,
    text: 'I would love to consult with farmers on synthesizing bespoke drought-resistant crop genomes using gene-gun vectors or target gene insertions.',
    weights: { Biotechnology: 1.0 },
    category: 'Agricultural biotechnology'
  },
  {
    id: 's4_bt5',
    section: 4,
    text: 'I prefer classical botanical observations of plant leaves over laboratory projects related to cell division splicing, cDNA isolation, or plasmid vectors.',
    weights: { Biotechnology: -1.0 },
    reverseScored: true,
    category: 'DNA technology'
  },

  // ==================== BIOCHEMISTRY SCENARIOS ====================
  {
    id: 's4_bc1',
    section: 4,
    text: 'I would be fascinated to track how biological tissue converts amino acids into complex proteins, mapping the specific enzymatic triggers in health and disease.',
    weights: { Biochemistry: 1.0, Biotechnology: 0.3 },
    category: 'Metabolism'
  },
  {
    id: 's4_bc2',
    section: 4,
    text: 'If researching a disease treatment, I would enjoy measuring cellular metabolic rates using assays before and after adding a test compound or chemical inhibitor.',
    weights: { Biochemistry: 1.0, Chemistry: 0.3 },
    category: 'Drug action'
  },
  {
    id: 's4_bc3',
    section: 4,
    text: 'Tracing the atomic structures of insulin receptors or catalytic glucose sites under high-resolution imaging sounds deeply absorbing.',
    weights: { Biochemistry: 1.0, Chemistry: 0.5 },
    category: 'Proteins and enzymes'
  },
  {
    id: 's4_bc4',
    section: 4,
    text: 'I would love to isolate blood plasma fractions to test for metabolic biomarkers like lipid ratios, glucose, and urea concentrations.',
    weights: { Biochemistry: 1.0, Microbiology: 0.3 },
    category: 'Human health'
  },
  {
    id: 's4_bc5',
    section: 4,
    text: 'I find studying microscopic metabolic diagrams and thermodynamic energy transport paths within cells extremely tiring.',
    weights: { Biochemistry: -1.0 },
    reverseScored: true,
    category: 'Molecular processes'
  },

  // ==================== MICROBIOLOGY SCENARIOS ====================
  {
    id: 's4_mb1',
    section: 4,
    text: 'I would enjoy investigating the cause of a food contamination outbreak by isolating cultures under strict germ-free hoods in a laboratory.',
    weights: { Microbiology: 1.0, Biotechnology: 0.3 },
    category: 'Food microbiology'
  },
  {
    id: 's4_mb2',
    section: 4,
    text: 'Performing Gram-staining techniques to categorize unknown bacterial colonies retrieved from soil samples sounds highly satisfying.',
    weights: { Microbiology: 1.0 },
    category: 'Bacteria'
  },
  {
    id: 's4_mb3',
    section: 4,
    text: 'I would love to design testing rules to isolate viral loads from municipal waste fluids, identifying local viral mutations across seasonal peaks.',
    weights: { Microbiology: 1.0, Biotechnology: 0.4 },
    category: 'Viruses'
  },
  {
    id: 's4_mb4',
    section: 4,
    text: 'I would be interested in conducting a test to check if a specific fungal mold will secret antibiotic agents when co-cultured with target test cultures.',
    weights: { Microbiology: 1.0, Chemistry: 0.3 },
    category: 'Fungi'
  },
  {
    id: 's4_mb5',
    section: 4,
    text: 'I would feel deeply uncomfortable working around infectious organisms, even if extensive laboratory hoods and autoclaves are provided.',
    weights: { Microbiology: -1.0 },
    reverseScored: true,
    category: 'Public health'
  },

  // ==================== CHEMISTRY SCENARIOS ====================
  {
    id: 's4_ch1',
    section: 4,
    text: 'I would enjoy compiling the steps of organic reactions to synthesize clean organic compound grades, utilizing physical tools like reflux condensers.',
    weights: { Chemistry: 1.0 },
    category: 'Laboratory synthesis'
  },
  {
    id: 's4_ch2',
    section: 4,
    text: 'Calibrating and running titration columns to identify the total acid concentrations in batch industrial beverages excites my analytic mind.',
    weights: { Chemistry: 1.0, Biochemistry: 0.3 },
    category: 'Analytical chemistry'
  },
  {
    id: 's4_ch3',
    section: 4,
    text: 'I am excited about formulating optimal ratios of raw industrial polymers, acids, or solvents to improve paints, plastics, or cosmetics.',
    weights: { Chemistry: 1.0 },
    category: 'Industrial chemicals'
  },
  {
    id: 's4_ch4',
    section: 4,
    text: 'I would love to test the atomic structure of nanomaterials, modeling how their crystal lattices behave under intense oxidation conditions.',
    weights: { Chemistry: 1.0, Physics: 0.5 },
    category: 'Material science'
  },
  {
    id: 's4_ch5',
    section: 4,
    text: 'I do not like measuring out chemical formula volumes, calculating stoichiometric ratios, or managing safety data sheets.',
    weights: { Chemistry: -1.0 },
    reverseScored: true,
    category: 'Chemical reactions'
  },

  // ==================== PHYSICS SCENARIOS ====================
  {
    id: 's4_phy1',
    section: 4,
    text: 'I would enjoy creating custom circuit interfaces to calibrate heat sensors, automated flow valves, or vacuum gauges in a research rig.',
    weights: { Physics: 1.0 },
    category: 'Electronics'
  },
  {
    id: 's4_phy2',
    section: 4,
    text: 'I am highly fascinated by ionizing and non-ionizing emission devices, and would enjoy managing safety measures for radiology and therapeutic rays.',
    weights: { Physics: 1.0 },
    category: 'Radiation'
  },
  {
    id: 's4_phy3',
    section: 4,
    text: 'I like calculating accurate physical values like structural velocity, light refraction angles, or acoustic frequencies in fluid lines.',
    weights: { Physics: 1.0 },
    category: 'Measurements'
  },
  {
    id: 's4_phy4',
    section: 4,
    text: 'I would love to optimize the physics of a steam turbine or photovoltaic battery storage layout to maximize clean energy conversion.',
    weights: { Physics: 1.0, Chemistry: 0.3 },
    category: 'Energy systems'
  },
  {
    id: 's4_phy5',
    section: 4,
    text: 'I have very little interests in understanding physical circuit diagrams, thermal measurements, or calibrating hardware equipment.',
    weights: { Physics: -1.0 },
    reverseScored: true,
    category: 'Instrumentation'
  }
];

export const PASSION_QUESTIONS = [
  { id: 'q1', label: 'What scientific discovery excites you the most?' },
  { id: 'q2', label: 'If given a fully equipped laboratory, what would you research?' },
  { id: 'q3', label: 'What type of problem would you like to solve in society?' },
  { id: 'q4', label: 'Which science documentaries or topics do you naturally enjoy?' },
  { id: 'q5', label: 'What area of technology or instrumentation are you most eager to master?' }
];

export const INITIAL_PASSION_ANSWERS: PassionAnswers = {
  q1: '', q2: '', q3: '', q4: '', q5: ''
};
