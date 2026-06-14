import { UnitDetail, Unit } from './types';

export const UNIT_DETAILS: Record<Unit, UnitDetail> = {
  Biotechnology: {
    name: 'Biotechnology',
    overview: 'Biotechnology leverages cellular and biomolecular processes to develop cutting-edge technologies and products that improve human health, agriculture, and environmental sustainability. It represents the frontier of genetic and molecular engineering, combining biology with software computing.',
    focus: [
      'Recombinant DNA technology and gene cloning',
      'Genetic engineering and CRISPR chromosome modification',
      'Bioinformatics, protein modeling, and computational biology',
      'Industrial bioprocess engineering and bioreactor cultures',
      'Agricultural improvements, transgenic disease-resistant crops, and biofuels'
    ],
    traits: [
      'Strong creative foresight and interest in frontier scientific innovations',
      'Adaptability to work seamlessly across biological, mechanical, and computational domains',
      'A preference for active problem-solving and molecular sequence analysis',
      'Comfort with both computer-based simulations and wet-lab sterile environments'
    ],
    challenges: [
      'Navigating complex bioethical considerations and genetic-testing regulations',
      'High dependency on delicate molecular reagents which are expensive and heat-sensitive',
      'Extended development cycles for experimental models (e.g., waiting for plants/vectors)'
    ],
    difficultConcepts: [
      'Designing synthetic plasmids with promoters and selection markers',
      'Algorithm-based bioinformatic alignment of fragmented DNA sequences',
      'Epigenetic transcriptional regulation mechanics'
    ],
    natureOfWork: 'Splicing together DNA strands in high-tech laminar flow hoods, running computational scripts to identify genomic sequences, designing alternative biological solutions for medical or environmental problems.',
    careersNigeria: [
      'Research Officer at the National Biotechnology Development Agency (NABDA)',
      'Genetic Specialist at the International Institute of Tropical Agriculture (IITA), Ibadan',
      'Industrial Fermentation Supervisor at biotech diagnostic laboratories',
      'Technical consultant for modern agricultural seed multiplication companies'
    ],
    careersGlobal: [
      'CRISPR Gene Therapies Developer in leading biomedical corporations',
      'Synthetic Biology Product Chemist designing bio-constructed plastics',
      'Bioinformatics Data Engineer analyzing huge multi-genomic databases',
      'Regulatory Specialist evaluating biosafety clearance profiles'
    ],
    advantages: [
      'Highest international research funding and global technology integration',
      'Opportunity to patent novel agricultural or therapeutic IP modifications',
      'Incredibly high innovation ceiling with direct impact on humanity\'s survival challenges'
    ],
    skillsGained: [
      'Plasmid extraction, DNA amplification (PCR), and electrophoresis blotting',
      'Theoretical understanding of genetic cloning pipelines',
      'Basic bioinformatics programming, sequence alignment tools (BLAST), and data logging'
    ],
    futureRelevance: 'Critical for climate change solutions, famine eradication through resilient crops, mRNA therapeutic systems, and sustainable bio-manufacturing platforms.',
    suggestedCertifications: [
      'Computational Genomics with R / Python (Coursera/edX)',
      'NIH Guidelines for Research Involving Recombinant or Synthetic Nucleic Acid Molecules',
      'Introductory Course to CRISPR Technology (Synthego Certification)'
    ],
    suggestedActivities: [
      'Participate in international genetic engineering competitions (e.g., iGEM)',
      'Join the Biotechnology Society of Nigeria (BSN) student assembly',
      'Contribute to open-source bio-informatics datasets on GitHub'
    ]
  },
  Biochemistry: {
    name: 'Biochemistry',
    overview: 'Biochemistry investigates the chemical pathways, metabolic networks, and molecular architectures that drive all living organisms. Serving as the vital bridge between chemistry and biology, it deciphers how macromolecules interact, giving rise to physiological processes and therapeutic avenues.',
    focus: [
      'Enzymatic catalysis, protein structures, and metabolic loops',
      'Endocrine signaling, nutritional pathways, and membrane transports',
      'Diagnostic pathology markers, blood plasma assessments, and biochemistry profiles',
      'Molecular pharmacology, pharmaceutical drug-receptor binding, and enzyme inhibition'
    ],
    traits: [
      'Exceptional attention to detail and rigorous analytical thinking',
      'Fascination with mechanistic paths, atomic-level transfers, and thermodynamic equations',
      'Patience in performing delicate, chemical assays and biochemical assays',
      'High curiosity about the physical basis of human health, pathology, and disease indicators'
    ],
    challenges: [
      'Memorization of extensive molecular metabolic loops (Krebs, glycolysis, oxidative phosphorylation)',
      'Balancing chemical thermodynamics with living cell constraints',
      'Meticulous cleaning of spectrophotometers and balancing of unstable organic active ingredients'
    ],
    difficultConcepts: [
      'Michaelis-Menten enzyme kinetics equations and competitive inhibition curves',
      'Mitochondrial proton gradient thermodynamics and ATP synthesis spinning mechanisms',
      'Signal transduction cascades involving second messenger channels'
    ],
    natureOfWork: 'Operating advanced spectrophotometric systems, conducting cellular assays, preparing buffer standards, interpreting patient metabolic profiles, charting organic molecules.',
    careersNigeria: [
      'Quality Control Scientist at pharmaceutical companies (e.g., Emzor, Fidson, May & Baker)',
      'Clinical Diagnostic Biochemist in state university teaching hospitals',
      'Product formulation designer at beverage, brewery, and cosmetic complexes',
      'Research Officer at the Nigerian Institute of Medical Research (NIMR), Yaba'
    ],
    careersGlobal: [
      'Lead Drug Discovery Researcher in top global pharmaceutical conglomerates',
      'Metabolic Pathway Engineer creating advanced healthcare diagnostic kits',
      'Oncology Cell Signaling Expert investigating targeted cancer cell receptor inhibitors',
      'Toxicologist assessing safety and metabolism profiles for international agencies'
    ],
    advantages: [
      'Excellent, direct foundation for postgraduate healthcare, clinical sciences, and medicine',
      'Wide recruitment in both industrial manufacturing and clinical diagnostics sectors',
      'Empowers deep structural understanding of medicines, drug interactions, and toxicology'
    ],
    skillsGained: [
      'Enzymatic assay design, spectrophotometry, and ELISA microplate screening',
      'Electrophoresis gel separation, centrifugation, and buffer formulation math',
      'Clinical interpretation of lipid, glucose, liver-function, and metabolic profiles'
    ],
    futureRelevance: 'Indispensable for targeted cancer therapies, biological drug discoveries, metabolic syndrome treatments, and high-precision clinical pathology.',
    suggestedCertifications: [
      'GLP (Good Laboratory Practice) Certification',
      'Clinical Biochemistry and Medical Lab Assay Protocols (ASCP Foundation courses)',
      'Computational Drug Design and Molecular Docking Certifications'
    ],
    suggestedActivities: [
      'Join the Nigerian Society of Biochemistry and Molecular Biology (NSBMB)',
      'Engage in academic seminars modeling drug targets for local tropical diseases',
      'Shadow a clinical laboratory officer in a local general hospital pathology lab'
    ]
  },
  Microbiology: {
    name: 'Microbiology',
    overview: 'Microbiology is the study of microscopic organisms, including bacteria, viruses, fungi, algae, and archaea. It is highly experimental and diagnostic, focusing on the biology, public health implications, and industrial utility of microbes in medical diagnostic, fermentation, and food hygiene ecosystems.',
    focus: [
      'Clinical diagnostics, infectious pathogen identification, and antibiotic sensitivity profiling',
      'Immunological protection mechanisms and vaccine biological actions',
      'Industrial microbiology, brewing, and local beverage fermentation quality controls',
      'Food safety surveillance, sanitation protocols, and pathogenic mold isolations'
    ],
    traits: [
      'Strict adherence to sterile aseptic rules to prevent contamination',
      'Patience during extended culture growth windows (incubation cycles)',
      'A meticulous diagnostic mindset that enjoys solving hidden pathogen mysteries',
      'Strong commitment to public sanitation, biosafety, and contamination containment'
    ],
    challenges: [
      'Working directly around active pathogens, requiring strict biosafety level safety rules',
      'High risk of sample contamination, which forces repetition of entire experimental timelines',
      'Slow culture growth (waiting up to days for bacterial colonies or weeks for fungi)'
    ],
    difficultConcepts: [
      'Mechanisms of bacteriological horizontal gene transmission via conjugation plasmids',
      'Host-pathogen cell membrane penetration biochemistry and intracellular replication',
      'Immunology antigen-antibody binding cascades'
    ],
    natureOfWork: 'Preparing sterile agar media plates, executing precise isolation streaking patterns, performing Gram staining to identify microbial cells, evaluating microbial loads in public water systems.',
    careersNigeria: [
      'Infectious Disease Surveillance Officer at the Nigeria Centre for Disease Control (NCDC)',
      'Quality Assurance Microbiologist at NAFDAC or local drinking water boards',
      'Fermentation Quality Supervisor at breweries (e.g., Nigerian Breweries, Guinness Nigeria)',
      'Medical Laboratory Scientist analyzing diagnostic blood and urine cultures in clinics'
    ],
    careersGlobal: [
      'Principal Epidemic Researcher at the World Health Organization (WHO) or CDC',
      'Industrial Strain Engineer optimizing microbial yields in major bio-factories',
      'Vaccine Development Lead targeting emerging respiratory or systemic viral pathogens',
      'Agricultural Soil Biologist evaluating mycorrhizal systems for regenerative agriculture'
    ],
    advantages: [
      'Highly immediate local employment opportunities in Nigeria\'s massive beverage, water, and food sectors',
      'Clear, practical significance for public health, infection management, and sanitation',
      'Hands-on diagnostic capabilities that translate directly to medical lab setups'
    ],
    skillsGained: [
      'Aseptic techniques, vacuum autoclaving, and micro-pipette accuracy',
      'Selective media formulation, isolation streaking, and Gram stain diagnostic reading',
      'Standard anti-microbial susceptibility testing (disk diffusion testing)'
    ],
    futureRelevance: 'Essential for defeating antibiotic-resistant superbugs, engineering probiotics for human health, monitoring global viral pandemics, and eco-friendly waste management bioremedy systems.',
    suggestedCertifications: [
      'WHO Health Emergencies Programme Infection Prevention and Control (IPC) Certification',
      'Hazard Analysis Critical Control Point (HACCP) Food Safety Certification',
      'Laboratory Biosafety and Biosecurity training (CDC/WHO models)'
    ],
    suggestedActivities: [
      'Actively participate in the American Society for Microbiology (ASM) Student Chapter or Nigerian Society for Microbiology (NSM)',
      'Conduct local microbiological hygiene testing audits on drinking water kiosks',
      'Volunteering in clinical diagnostic labs during vacation frames'
    ]
  },
  Chemistry: {
    name: 'Chemistry',
    overview: 'Chemistry is the central science of matter, examining its elements, structure, synthetic transmutations, and reaction properties. It forms the industrial core of Science Laboratory Technology, providing essential skills in chemical analysis, cosmetic formulation, and polymer manufacturing streams.',
    focus: [
      'Organic chemical synthesis, reaction paths, and solvent purifications',
      'Analytical chemistry, quantitative elemental assessments, and stoichiometry calculations',
      'Industrial polymer formulation (detergents, plastics, paints, pharmaceutical reagents)',
      'Spectroscopy analytics, atomic absorption, and chromatographic extractions (HPLC, GC)'
    ],
    traits: [
      'High level of comfort with handling physical reagent grades and hazardous solvents safely',
      'Excellent numeric skills, stoichiometric mass-balance calculations, and precision dilutions',
      'Highly structured, methodical work habits aligning with strict manufacturing standards',
      'Fascinated by physical molecular structural transformations'
    ],
    challenges: [
      'Managing physical hazards of volatile solvents, corrosives, and thermal reactions',
      'High math calculations involving pH curves, element percentages, and moles',
      'Complex instrumentation calibration rules requiring extreme diagnostic patience'
    ],
    difficultConcepts: [
      'Nucleophilic substitution mechanism paths (Sn1 vs Sn2 organic steps)',
      'Quantum electron configurations and orbital overlap molecular geometries',
      'Quantifying spectroscopic peaks (interpreting NMR shifts or infrared stretches)'
    ],
    natureOfWork: 'Synthesizing standard reagents with complex reflux configurations, executing precise manual and digital titrations, operating high-performance analytical spectrophotometers, drafting technical safety logs.',
    careersNigeria: [
      'Petrochemical Lab Analyst at the Nigerian National Petroleum Company (NNPC)',
      'Product formulation designer at consumer companies (e.g., Unilever, PZ Cussons, Dangote Group)',
      'Analytical toxicologist at NAFDAC or state environmental protection boards',
      'Industrial materials testing officer inspecting materials and metallurgical structures'
    ],
    careersGlobal: [
      'Senior Materials Chemist formulating high-efficiency alternative batteries',
      'Petrochemical Optimization consultant for major oil refineries and polymer plants',
      'Forensic Chemist analyzing complex structural micro-traces for law enforcement agencies',
      'Synthetic Organic Research Chemist building high-purity pharmaceutical agents'
    ],
    advantages: [
      'Highest local industrial placement flexibility due to widespread chemical applications',
      'Empowers immediate setup of small-to-medium enterprises (cosmetics, soaps, paint coatings)',
      'Provides irreplaceable, concrete laboratory skills that are universally valued across industries'
    ],
    skillsGained: [
      'Reflux setup, liquid-liquid separation extraction, and distillation setups',
      'Quantitative titration, elemental concentration assay checks, and pH balance',
      'Safe storage protocols for volatile, acidic, and pyrophoric hazard containers'
    ],
    futureRelevance: 'Vital for developing biodegradable polymer alternatives, recycling heavy electronic battery elements, and producing green, eco-safe industrial reagents.',
    suggestedCertifications: [
      'ISO 9001 (Quality Management Systems) Awareness Certification',
      'OSHA Chemical Safety and Lab Hazardous Waste Disposal Standards training',
      'High-Performance Liquid Chromatography (HPLC) Operator certification'
    ],
    suggestedActivities: [
      'Join the Chemical Society of Nigeria (CSN)',
      'Launch or assist a cottage business formulation project (e.g., craft soap or sanitizer making)',
      'Perform testing analysis on household materials using safe, analytical metrics'
    ]
  },
  Physics: {
    name: 'Physics',
    overview: 'Physics within Science Laboratory Technology focuses on advanced instrumentation, electronic sensor calibrations, diagnostic radiation physics, and material property measurements. It shapes the technician who maintains, designs, and optimizes the sophisticated measuring infrastructures of scientific and clinical laboratories.',
    focus: [
      'Delicate laboratory instrument design, calibration, and repair',
      'Electronics, analog/digital integration, and circuit board setups',
      'Ionizing radiation, radiological safety, and medical physics diagnostics (X-Ray, MRIs)',
      'Optical measurements, crystalline stress reviews, and laser instrumentation patterns',
      'Alternative solar and thermal energy structures'
    ],
    traits: [
      'Fidelity for mechanics, wave equations, physical circuits, and mechanical physical hardware',
      'Highly logical diagnostic mind that loves troubleshooting mechanical and electronic hardware errors',
      'Comfort with physical math calculations, dimensional analysis, and error propagation equations',
      'A preference for hardware assembling and design over biological culturing'
    ],
    challenges: [
      'Very heavy abstract math load alongside intensive mechanics laws',
      'Risk of radiation and high-voltage circuit shock if guidelines are ignored',
      'Translating physical properties into electronic sensor voltages can be frustrating'
    ],
    difficultConcepts: [
      'Fourier transform functions and digital signal-to-noise calibrations',
      'Nuclear decay rates and therapeutic absorption dose calculation matrices',
      'Operational amplifier configurations and voltage sensor filter layouts'
    ],
    natureOfWork: 'Calibrating digital instruments to global certifications, testing circuit board solder rails, managing radiology radiation badges, measuring physical properties of high-tech alloys, configuring alternate power controllers.',
    careersNigeria: [
      'Medical Physics Radiotherapy Technologist at university teaching hospitals',
      'Instrument Maintenance supervisor for high-purity petrochemical and biotech sites',
      'Hardware and network transmission analyst at leading telecom complexes (MTN, Airtel)',
      'Power grid operations technician at electricity distribution centers or solar factories'
    ],
    careersGlobal: [
      'Instrument Design Engineer at top scientific device developers (e.g., Thermo Fisher)',
      'Quality Control Calibration Auditor verifying aerospace or atomic physics facilities',
      'Renewable Microgrid Architect designing high-performance solar battery paths',
      'Nuclear Safety Inspector managing shielding compliance protocols for global agencies'
    ],
    advantages: [
      'Extreme high-value specialization; highly respected for complex instrument debugging capabilities',
      'Excellent employment rates in advanced technical hospitals and solar operations',
      'Builds irreplaceable electronic prototyping, physical diagnostic, and technical programming capabilities'
    ],
    skillsGained: [
      'Analog and digital electronic prototyping, circuit layout solder logic',
      'Instrumentation calibration, micro-sensor telemetry interfaces, and hardware diagnostics',
      'Radiation monitoring, laser alignment mechanics, and thermodynamic system calibrations'
    ],
    futureRelevance: 'Essential for the solar revolution, smart sensor IoT ecosystems, high-tech robot manufacturing lines, and advanced therapeutic medical diagnostics.',
    suggestedCertifications: [
      'Certified Instrument Professional (CIP) or Lab Calibration Specialist courses',
      'Radiation Protection and Safety Officer (RPSO) certifications',
      'Microcontroller Prototyping and Arduino/PLC Integrations (Coursera/edX)'
    ],
    suggestedActivities: [
      'Join the Nigerian Institute of Physics (NIP)',
      'Build localized alternative energy models (e.g., small solar cell charging monitors)',
      'Conduct a diagnostic repair workshop for broken electronics or laboratory gear'
    ]
  }
};
