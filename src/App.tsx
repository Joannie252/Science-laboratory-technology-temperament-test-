import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Award,
  Users,
  Search,
  Download,
  Trash2,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Printer,
  ChevronRight,
  User,
  LogOut,
  Sparkles,
  HelpCircle,
  FlaskConical,
  Scale,
  Compass,
  Zap,
  RotateCcw,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SECTION_1_QUESTIONS, SECTION_2_QUESTIONS, SECTION_3_QUESTIONS, SECTION_4_QUESTIONS, PASSION_QUESTIONS, INITIAL_PASSION_ANSWERS } from './questions';
import { UNIT_DETAILS } from './unitDetails';
import { Submission, StudentInfo, PassionAnswers, LikertValue, Unit, ScoreBreakdown } from './types';

// Web Audio synthesizer for tactile science-y feedback sound fx
export const playSound = (type: 'pop' | 'success' | 'click' | 'whoosh', enabled: boolean = true) => {
  if (!enabled) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      // Harmonic major arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
      });
    }
  } catch (err) {
    // Fail silently so no user-facing errors trigger
  }
};

// Exporter that compiles placement report cards to self-contained HTML bypassers
export const downloadHTMLReport = (submission: Submission) => {
  const { student, result, passionAnswers, timestamp } = submission;
  const listUnits = ['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'];
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLT Advisor Report Card - ${student.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        /* Force color print rules */
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        @media print {
            .no-print { display: none !important; }
            body { background-color: #ffffff !important; }
        }
    </style>
</head>
<body class="bg-indigo-950 text-slate-900 py-12 px-4 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 relative border border-slate-100">
        
        <!-- Header banner -->
        <div class="border-b border-indigo-100 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <span class="text-[9px] font-mono font-bold tracking-widest text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded">University Placement Council</span>
                <h1 class="text-3xl font-black text-slate-900 tracking-tight mt-1">Science Laboratory Technology</h1>
                <p class="text-[10.5px] font-mono text-slate-450 uppercase mt-0.5">Academic Specialisation Evaluation</p>
            </div>
            <div class="mt-4 sm:mt-0 text-left sm:text-right">
                <p class="text-xs font-mono text-slate-500">Timestamp: ${new Date(timestamp).toLocaleDateString()}</p>
                <p class="text-xs font-bold text-indigo-700 uppercase tracking-widest font-mono">Confidential Advice Sheet</p>
            </div>
        </div>

        <!-- Student demographics grid -->
        <div class="grid md:grid-cols-3 gap-6 pb-8 border-b border-slate-100 mb-8">
            <div class="md:col-span-2 space-y-2">
                <span class="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black block">Student Biographical Registry</span>
                <h2 class="text-3xl font-black text-slate-950 tracking-tight">${student.name}</h2>
                <div class="text-slate-600 text-sm font-medium space-y-1">
                    <p>Matriculation Number: <span class="font-mono font-bold text-slate-900">${student.matricNo}</span></p>
                    <p>Authorized Student Email: <span class="font-bold text-slate-900">${student.email}</span></p>
                </div>
            </div>
            <div class="bg-indigo-50 rounded-2xl p-5 border border-indigo-100/60 flex flex-col justify-center">
                <span class="text-[9px] font-mono tracking-widest text-indigo-700 uppercase font-extrabold block leading-none">Match Compatibility</span>
                <span class="text-2xl font-black text-indigo-700 mt-2 block leading-none">${result.matchLevel}</span>
            </div>
        </div>

        <!-- Core Recommendations banner -->
        <div class="grid md:grid-cols-3 gap-6 mb-10">
            <div class="md:col-span-2 bg-gradient-to-tr from-indigo-800 to-indigo-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-inner">
                <span class="inline-block bg-white/10 text-[9px] font-mono font-bold uppercase rounded-md px-2.5 py-1 mb-4">Highly Recommended Priority Specialism</span>
                <h3 class="text-3xl font-extrabold tracking-tight mb-2">${result.topUnit}</h3>
                <p class="text-indigo-150 text-xs leading-relaxed">Based on laboratory scenario processing responses, quantitative work traits, and qualitative ambitions, this unit offers maximum professional resonance.</p>
            </div>
            <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                    <span class="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-wider">Secondary Buffer Unit</span>
                    <h3 class="text-xl font-bold text-slate-900 mt-1">${result.secondUnit}</h3>
                    <p class="text-slate-505 text-xs mt-2 leading-relaxed">Provides amazing interdisciplinary overlay in experimental techniques and coursework parameters.</p>
                </div>
            </div>
        </div>

        <!-- Dynamic relative bar chart representation -->
        <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-10">
            <h3 class="text-sm font-mono font-bold text-indigo-900 uppercase tracking-widest block mb-5 leading-none">Scoring Compatibility Breakdown (%)</h3>
            <div class="space-y-4">
                ${listUnits.map(unitOption => {
                  const pct = result.percentages[unitOption as any] || 0;
                  let gradientColor = 'from-slate-400 to-slate-500';
                  if (unitOption === 'Biotechnology') gradientColor = 'from-indigo-600 to-indigo-800';
                  if (unitOption === 'Biochemistry') gradientColor = 'from-teal-600 to-teal-800';
                  if (unitOption === 'Microbiology') gradientColor = 'from-emerald-600 to-emerald-800';
                  if (unitOption === 'Chemistry') gradientColor = 'from-amber-600 to-amber-800';
                  if (unitOption === 'Physics') gradientColor = 'from-rose-600 to-rose-800';
                  
                  return `<div>
                      <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-1 leading-none">
                          <span class="flex items-center space-x-2">
                              <span>${unitOption}</span>
                              ${unitOption === result.topUnit ? `<span class="bg-indigo-100 text-indigo-700 font-mono text-[7.5px] font-black uppercase px-1 py-0.5 rounded leading-none">Top Match</span>` : ''}
                          </span>
                          <span class="font-mono">${pct}%</span>
                      </div>
                      <div class="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div class="bg-gradient-to-r ${gradientColor} h-full rounded-full" style="width: ${pct}%"></div>
                      </div>
                  </div>`;
                }).join('')}
            </div>
        </div>

        <!-- AI advisory narration -->
        <div class="bg-indigo-50 border border-indigo-150 rounded-2xl p-6 sm:p-8 mb-10">
            <span class="text-[10px] font-mono font-black text-indigo-700 tracking-wider block mb-3 uppercase leading-none">AI counselor narrative analysis & placements</span>
            <div class="text-slate-750 text-sm leading-relaxed whitespace-pre-line">${result.aiSummary}</div>
        </div>

        <!-- Strengths catalog -->
        <div class="grid md:grid-cols-2 gap-8 mb-6">
            <div>
                <h4 class="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide border-b border-slate-200 pb-2 mb-3">Target Strengths Identified</h4>
                <ul class="space-y-2 text-slate-650 text-xs">
                    ${result.strengths.map(st => `<li>✔️ ${st}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide border-b border-slate-200 pb-2 mb-3">Skills To Master</h4>
                <div class="flex flex-wrap gap-1.5 pt-1">
                    ${result.skills.map(sk => `<span class="bg-slate-100 text-slate-800 px-2 py-1 rounded text-[10.5px] font-mono leading-none">${sk}</span>`).join('')}
                </div>
            </div>
        </div>

        <div class="text-center pt-8 border-t border-slate-200/80 no-print">
            <button onclick="window.print()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition-colors cursor-pointer inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 05-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Print or Save to Local PDF</span>
            </button>
            <p class="text-[11px] text-slate-400 mt-2">Opening offline report bypasses development iframe permissions seamlessly.</p>
        </div>

    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `SLT_ReportCard_${student.name.replace(/\s+/g, '_')}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Fun science trivia/jokes dictionary
export const SCIENCE_TRIVIA = [
  { text: "Why can't you trust atoms? Because they make up everything! ⚛️", type: "Physics" },
  { text: "Helium, Curium, and Barium are the medical elements: if you can't helium or curium, you barium! ⚗️", type: "Chemistry" },
  { text: "I made a beautiful chemistry joke in class, but there was no reaction. Absolutely inert! 🧪", type: "Chemistry" },
  { text: "There is a massive culture of success in Science Lab Technology. Literally – in our Petri dishes! 🧫", type: "Microbiology" },
  { text: "Are you composed of Copper and Tellurium? Because you are CuTe! 🥰", type: "Chemistry" },
  { text: "What do physicists call a friendly particle? A 'social boson'! ⚛️", type: "Physics" },
  { text: "Who was the first biochemist? The one who discovered that amino acids make great building blocks! 🧬", type: "Biochemistry" },
  { text: "DNA stands for: Do Not Abort (your lab calculations)! Seek those vectors! 🧬", type: "Biotechnology" },
];

export const MASCOT_SPEECHES: Record<number | string, string[]> = {
  1: [
    "🧬 I am Labby, your friendly AI-SLT mascot! Beaker-lieve me, you're going to do amazing here!",
    "🧫 There is a beautiful culture of curiosity! Rate your scientific interests below to load raw scores."
  ],
  2: [
    "⚗️ Let's check your reaction levels! This section measures your patience, precision, and collaboration vibes.",
    "🧪 Chemists have excellent solutions... but usually, they are acid or alkaline! 🤭 Tell us how you work!"
  ],
  3: [
    "🧬 Splicing your ambition data! Rate how excited you are to work in Nigeria or global laboratories.",
    "⚛️ Keep going, investigator! You are radiating positive energy right now! Keep clicking."
  ],
  4: [
    "🧫 Double-blind lab scenarios! We have hidden the unit names so you can react with total objectivity.",
    "⚗️ Under pressure? Just like a gas law, your scientific brilliance expands when heated!"
  ],
  5: [
    "📝 Share your real verbal ambitions! These open narratives map your academic counsel files beautifully.",
    "🧬 Be as descriptive as you can. My expert academic advisors love reading qualitative research goals!"
  ],
  "landing": [
    "Hey there, science explorer! 🧪 Let us discover your perfect SLT specialization pathway. No lab explosions scheduled! 🤭",
    "Ready to catalyze your career? Enter your details to authorize the double-blind assessment metrics!"
  ]
};

// Interactive SVG Beaker progress visualizer
export const getBeakerProgressSVG = (progressPercent: number) => {
  const liquidHeight = Math.min(100, Math.max(0, progressPercent));
  const yFill = 80 - (liquidHeight * 0.6); // scale 0-100 down to bottom-top coordinate
  
  // Choose beautiful purple colors based on progress percentage
  let liquidColor = '#7c3aed'; // default beautiful purple-600
  if (progressPercent < 30) liquidColor = '#c084fc'; // light purple-400
  else if (progressPercent < 60) liquidColor = '#a855f7'; // purple-500
  else if (progressPercent < 85) liquidColor = '#9333ea'; // violet / deep purple
  else liquidColor = '#7c3aed'; // intense violet-purple

  return (
    <div className="relative flex items-center space-x-3 bg-slate-50 border border-slate-200/60 p-2.5 rounded-2xl shadow-sm select-none shrink-0">
      <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Beaker contour glass */}
          <path 
            d="M35,16 L35,26 L20,78 A5,5 0 0,0 25,85 L75,85 A5,5 0 0,0 80,78 L65,26 L65,16 Z" 
            fill="none" 
            stroke="#475569" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Measuring metric ticks */}
          <line x1="45" y1="38" x2="52" y2="38" stroke="#64748b" strokeWidth="2.5" />
          <line x1="42" y1="52" x2="52" y2="52" stroke="#64748b" strokeWidth="2.5" />
          <line x1="38" y1="68" x2="50" y2="68" stroke="#64748b" strokeWidth="2.5" />

          {/* Liquid group clipped by inner beaker area */}
          <g clipPath="url(#beaker-inner-clip)">
            <path 
              d={`M15,${yFill} Q32,${yFill - 2} 50,${yFill} T85,${yFill} L85,90 L15,90 Z`}
              fill={liquidColor} 
              className="transition-all duration-500 ease-out"
              opacity="0.8"
            />
            {/* Ambient bubble elements in flask liquid */}
            {progressPercent > 5 && (
              <>
                <circle cx="32" cy="74" r="3.5" fill="white" opacity="0.6" className="animate-pulse" />
                <circle cx="56" cy="62" r="2" fill="white" opacity="0.5" />
                <circle cx="44" cy="78" r="4.5" fill="white" opacity="0.4" />
                <circle cx="66" cy="68" r="2.5" fill="white" opacity="0.7" />
              </>
            )}
          </g>

          {/* Steaming reaction circles when progress is high */}
          {progressPercent > 10 && (
            <g className="animate-pulse">
              <circle cx="50" cy="11" r="2.5" fill={liquidColor} opacity="0.8" />
              <circle cx="44" cy="6" r="1.5" fill={liquidColor} opacity="0.5" />
              <circle cx="56" cy="4" r="2" fill={liquidColor} opacity="0.6" />
            </g>
          )}

          <defs>
            <clipPath id="beaker-inner-clip">
              <path d="M37,17 L37,26 L22,77 A3,3 0 0,0 25,83 L75,83 A3,3 0 0,0 78,77 L63,26 L63,17 Z" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div>
        <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider leading-none">Mixture Progress</span>
        <span className="text-sm font-black text-slate-800 font-mono mt-0.5 block">{progressPercent}% Loaded</span>
      </div>
    </div>
  );
};

// Simple print trigger helper
const handlePrintReport = () => {
  window.print();
};

export default function App() {
  // Navigation State
  const [view, setView] = useState<'landing' | 'student-info' | 'quiz' | 'submitting' | 'result' | 'admin-login' | 'admin-dashboard'>('landing');

  // Interactive student-centric features
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [mascotQuoteIndex, setMascotQuoteIndex] = useState(0);

  // Student demographics state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    matricNo: '',
    email: '',
  });

  // Current session results
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);

  // Quiz progression state
  const [quizStep, setQuizStep] = useState(1); // 1 = Personal, 2 = Personality, 3 = Careers, 4 = Scenarios, 5 = Reflections
  const [innerPage, setInnerPage] = useState(0); // page within category

  // Answers Map: questionId -> 1..5 LikertValue
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [passionAnswers, setPassionAnswers] = useState<PassionAnswers>({ ...INITIAL_PASSION_ANSWERS });

  // Randomized Section 4 sequence
  const [randomizedScenarios, setRandomizedScenarios] = useState<typeof SECTION_4_QUESTIONS>([]);

  // Admin section state
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('slt_admin_token'));
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState<'All' | Unit>('All');
  const [selectedSubReport, setSelectedSubReport] = useState<Submission | null>(null);

  // Form error trackers
  const [demoError, setDemoError] = useState('');

  // Automatically rotate mascot tips and play slide whoosh SFX
  useEffect(() => {
    playSound('whoosh', soundEnabled);
    setMascotQuoteIndex(Math.floor(Math.random() * 2));
  }, [quizStep, innerPage, view]);

  // Real-time answer tracking progress
  const answeredCount = useMemo(() => {
    const mainAnswers = Object.keys(answers).length;
    const writtenReflections = Object.values(passionAnswers).filter(t => typeof t === 'string' && (t as string).trim().length > 3).length;
    return mainAnswers + writtenReflections;
  }, [answers, passionAnswers]);

  const totalQuestionsList = 50; // 5 + 5 + 10 + 25 + 5
  const progressPercent = useMemo(() => {
    return Math.min(100, Math.round((answeredCount / totalQuestionsList) * 100));
  }, [answeredCount]);

  // Submit loader text cyclic state
  const [loaderIndex, setLoaderIndex] = useState(0);
  const loadingPhrases = [
    'Mapping raw interest scores onto standard curriculum vectors...',
    'Interpreting qualitative temperament and patience levels...',
    'Analyzing scenario responses to isolate physical/chemical parameters...',
    'Consulting deep academic advisors to draft clinical career pathways in Nigeria...',
    'Constructing international professional certification routes...'
  ];

  useEffect(() => {
    if (view === 'submitting') {
      const interval = setInterval(() => {
        setLoaderIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Load Submissions when Admin Dashboard is unlocked
  const fetchSubmissions = async () => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/submissions', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      } else {
        // Stale token fallback
        setAdminToken(null);
        localStorage.removeItem('slt_admin_token');
      }
    } catch (err) {
      console.error('Failed to load submissions', err);
    }
  };

  useEffect(() => {
    if (adminToken && view === 'admin-dashboard') {
      fetchSubmissions();
    }
  }, [adminToken, view]);

  // Handle Admin Login submission
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminToken(data.token);
        localStorage.setItem('slt_admin_token', data.token);
        setAdminUsername('');
        setAdminPassword('');
        setView('admin-dashboard');
      } else {
        setAdminError(data.error || 'Invalid administrator credentials');
      }
    } catch (err) {
      setAdminError('Server communication failure. Please verify connection.');
    }
  };

  // Handle Admin Log out
  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('slt_admin_token');
    setView('landing');
  };

  // Delete submission
  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you strictly sure you want to delete this student record? This cannot be undone.')) return;
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selectedSubReport?.id === id) {
          setSelectedSubReport(null);
        }
      }
    } catch (err) {
      alert('Failed to erase submission.');
    }
  };

  // Shuffles Section 4 Questions once on initialization of quiz
  const initializeQuiz = () => {
    if (!studentInfo.name.trim() || !studentInfo.matricNo.trim() || !studentInfo.email.trim()) {
      setDemoError('Please complete all fields prior to starting.');
      return;
    }
    // Simple email validator
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentInfo.email.trim())) {
      setDemoError('Please enter a valid academic/personal email address.');
      return;
    }
    setDemoError('');
    
    // Mix and randomize Section 4 scenario questions
    const shuffled = [...SECTION_4_QUESTIONS].sort(() => Math.random() - 0.5);
    setRandomizedScenarios(shuffled);
    
    // Reset responses
    setAnswers({});
    setPassionAnswers({ ...INITIAL_PASSION_ANSWERS });
    
    // Reset steps
    setQuizStep(1);
    setInnerPage(0);
    setView('quiz');
  };

  // Paginated elements helper
  const getCurrentQuestions = () => {
    const limit = 5;
    const start = innerPage * limit;
    if (quizStep === 1) {
      return {
        title: 'Section 1: Personal Scientific Interests',
        subtitle: 'Rate your alignment with the scientific concepts and topics described below. Reflect honestly on daily curiosity.',
        questions: SECTION_1_QUESTIONS.slice(start, start + limit),
        totalPages: Math.ceil(SECTION_1_QUESTIONS.length / limit)
      };
    } else if (quizStep === 2) {
      return {
        title: 'Section 2: Work Style and Personality Traits',
        subtitle: 'Select options reflecting your inherent temperament, work methods, teamwork bias, and patience levels.',
        questions: SECTION_2_QUESTIONS.slice(start, start + limit),
        totalPages: Math.ceil(SECTION_2_QUESTIONS.length / limit)
      };
    } else if (quizStep === 3) {
      return {
        title: 'Section 3: Professional/Career Aspirations',
        subtitle: 'Specify your level of excitement regarding working in these specific industrial, global, or clinical settings.',
        questions: SECTION_3_QUESTIONS.slice(start, start + limit),
        totalPages: Math.ceil(SECTION_3_QUESTIONS.length / limit)
      };
    } else if (quizStep === 4) {
      return {
        title: 'Section 4: Practice & Laboratory Scenarios',
        subtitle: 'Incorporate realistic scientific and workplace scenarios. (Double-blind: unit labels are fully hidden to improve objectivity)',
        questions: randomizedScenarios.slice(start, start + limit),
        totalPages: Math.ceil(randomizedScenarios.length / limit)
      };
    }
    return { title: '', subtitle: '', questions: [], totalPages: 0 };
  };

  const activeSegment = getCurrentQuestions();

  // Answer handler
  const handleAnswerSelect = (qId: string, val: LikertValue) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    playSound('pop', soundEnabled);
  };

  // Nav helpers within the assessment questionnaire
  const handlePageNext = () => {
    // Audit if all questions in the current viewport page are filled
    const currentList = activeSegment.questions;
    const unfilled = currentList.find(q => answers[q.id] === undefined);
    if (unfilled) {
      alert('To ensure calculation accuracy, please complete all visible questions on this page before moving forward.');
      return;
    }

    if (innerPage < activeSegment.totalPages - 1) {
      setInnerPage(prev => prev + 1);
    } else {
      // Transitioning to a new primary category step
      if (quizStep < 4) {
        setQuizStep(prev => prev + 1);
        setInnerPage(0);
      } else {
        // Go to Section 5 reflection questions
        setQuizStep(5);
        setInnerPage(0);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePagePrev = () => {
    if (innerPage > 0) {
      setInnerPage(prev => prev - 1);
    } else {
      if (quizStep > 1) {
        const prevStep = (quizStep - 1) as 1 | 2 | 3 | 4;
        setQuizStep(prevStep);
        // Determine the last page index of the previous segment
        const limit = 5;
        let count = 0;
        if (prevStep === 1) count = SECTION_1_QUESTIONS.length;
        if (prevStep === 2) count = SECTION_2_QUESTIONS.length;
        if (prevStep === 3) count = SECTION_3_QUESTIONS.length;
        if (prevStep === 4) count = randomizedScenarios.length;
        setInnerPage(Math.ceil(count / limit) - 1);
      } else {
        // Go back to demographics
        setView('landing');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 5 Text inputs validator
  const handleReflectionsSubmit = async () => {
    // Check if at least 5 reflection questions have robust text
    const entries = Object.values(passionAnswers) as string[];
    const insufficient = entries.filter(txt => txt.trim().length < 4);
    if (insufficient.length > 3) {
      alert('Kindly fill in the open-ended text fields with realistic opinions before submitting, as this maps your personalized career counseling profile.');
      return;
    }

    setView('submitting');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: studentInfo,
          answers,
          passionAnswers
        })
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentSubmission(data.submission);
        playSound('success', soundEnabled);
        setView('result');
      } else {
        alert('Assessment computation failed. Falling back.');
        setView('quiz');
      }
    } catch (e) {
      alert('Network failure processing results. Recovering state.');
      setView('quiz');
    }
  };

  // Reset tool handler
  const resetAssessment = () => {
    setStudentInfo({ name: '', matricNo: '', email: '' });
    setAnswers({});
    setPassionAnswers({ ...INITIAL_PASSION_ANSWERS });
    setQuizStep(1);
    setInnerPage(0);
    setCurrentSubmission(null);
    setView('landing');
  };

  // Convert current submissions base data to clean structured CSV layout for Joanna
  const exportToCSV = () => {
    if (!submissions.length) return;
    const headers = [
      'Student Name',
      'Matric Number',
      'Student Email',
      'Top Recommended Specialisation',
      'Second Best Alternate',
      'Match Strength Level',
      'Biotechnology %',
      'Biochemistry %',
      'Microbiology %',
      'Chemistry %',
      'Physics %',
      'Completion Date'
    ];

    const rows = submissions.map(sub => [
      `"${sub.student.name.replace(/"/g, '""')}"`,
      `"${sub.student.matricNo.replace(/"/g, '""')}"`,
      `"${sub.student.email.replace(/"/g, '""')}"`,
      `"${sub.result.topUnit}"`,
      `"${sub.result.secondUnit}"`,
      `"${sub.result.matchLevel}"`,
      sub.result.percentages.Biotechnology,
      sub.result.percentages.Biochemistry,
      sub.result.percentages.Microbiology,
      sub.result.percentages.Chemistry,
      sub.result.percentages.Physics,
      `"${new Date(sub.timestamp).toLocaleDateString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SLT_Assessment_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed summary metrics for Joanna's bento cards
  const stats = useMemo(() => {
    if (!submissions.length) return { total: 0, units: {}, matchLv: {} };

    const total = submissions.length;
    const unitsMap: Record<string, number> = {
      Biotechnology: 0,
      Biochemistry: 0,
      Microbiology: 0,
      Chemistry: 0,
      Physics: 0
    };
    const matchLvMap: Record<string, number> = {
      'Strong Match': 0,
      'Good Match': 0,
      'Moderate Match': 0,
      'Weak Match': 0
    };

    submissions.forEach(s => {
      const top = s.result.topUnit;
      if (unitsMap[top] !== undefined) unitsMap[top]++;
      
      const ml = s.result.matchLevel;
      if (matchLvMap[ml] !== undefined) matchLvMap[ml]++;
    });

    return {
      total,
      units: unitsMap,
      matchLv: matchLvMap
    };
  }, [submissions]);

  // Client filtered submissions list mapping
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        s.student.name.toLowerCase().includes(query) ||
        s.student.matricNo.toLowerCase().includes(query) ||
        s.student.email.toLowerCase().includes(query);

      const matchesUnit = unitFilter === 'All' || s.result.topUnit === unitFilter;

      return matchesSearch && matchesUnit;
    });
  }, [submissions, searchQuery, unitFilter]);

  // Likert Option Labels helper
  const likertOptions: { val: LikertValue; label: string; color: string }[] = [
    { val: 1, label: 'Strongly Disagree', color: 'bg-rose-50 border-rose-200 text-rose-700 active:bg-rose-200' },
    { val: 2, label: 'Disagree', color: 'bg-amber-50 border-amber-200 text-amber-700 active:bg-amber-200' },
    { val: 3, label: 'Neutral', color: 'bg-slate-50 border-slate-200 text-slate-700 active:bg-slate-200' },
    { val: 4, label: 'Agree', color: 'bg-sky-50 border-sky-200 text-sky-700 active:bg-sky-200' },
    { val: 5, label: 'Strongly Agree', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 active:bg-emerald-200' },
  ];

  return (
    <div id="app_root" className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-purple-50/70 text-slate-800 font-sans antialiased selection:bg-purple-100 selection:text-purple-900 print:bg-white print:text-black">
      
      {/* HEADER / NAVIGATION BAR (Hidden in Print layout) */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-purple-100/80 px-4 py-3 print:hidden shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => resetAssessment()}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-sm">
              <FlaskConical className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg block">SLT Specialism Assessor</span>
              <span className="text-[10.5px] font-mono tracking-wider text-slate-500 uppercase block leading-none">Science Lab Technology</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio Feedback Switch */}
            <button
              onClick={() => {
                const updated = !soundEnabled;
                setSoundEnabled(updated);
                playSound(updated ? 'click' : 'whoosh', updated);
              }}
              title={soundEnabled ? "Mute SFX" : "Enable SFX"}
              className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                soundEnabled 
                  ? 'border-indigo-100 bg-indigo-55/40 text-indigo-650 hover:bg-indigo-100/80 animate-pulse' 
                  : 'border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-650'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {view === 'admin-dashboard' ? (
              <button
                id="btn_admin_logout"
                onClick={() => handleAdminLogout()}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors text-xs font-semibold cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout Joanna</span>
              </button>
            ) : view !== 'admin-login' ? (
              <button
                id="btn_navigate_admin"
                onClick={() => {
                  if (adminToken) setView('admin-dashboard');
                  else setView('admin-login');
                }}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 border border-indigo-200/60 font-semibold transition-colors text-xs cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <button
                id="btn_back_landing"
                onClick={() => setView('landing')}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                Back to Student Hub
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 print:p-0">
        
        {/* =============== VIEW 1: LANDING HERO =============== */}
        {view === 'landing' && (
          <div className="max-w-4xl mx-auto mt-6 text-center">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100 shadow-2xs mb-6 select-none">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Academic Specialization Placement Protocol</span>
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto mb-4 text-balance">
              Discover Your Academic Specialisation Pathway
            </h1>
            
            <p className="text-slate-600 sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 text-pretty">
              A comprehensive Science Laboratory Technology (SLT) evaluation to help undergraduate students analyze their real interests, temperament alignment, and laboratory work styles across the five core specializations.
            </p>

            {/* Animated Mascot Intro Card */}
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-50 to-indigo-100/40 border border-indigo-100 rounded-2xl p-5 mb-6 text-left shadow-xs flex items-center space-x-4">
              <div className="h-14 w-14 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-white text-3xl shrink-0 shadow-lg relative select-none animate-bounce">
                🧪
                <div className="absolute -top-1 -right-1 bg-emerald-500 h-4.5 w-4.5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold">●</div>
              </div>
              <div className="flex-1">
                <span className="text-[9px] font-mono tracking-widest text-indigo-750 font-black uppercase block leading-none">Interactive Mascot Assistant</span>
                <p className="font-bold text-slate-900 text-sm mt-1">Meet Labby, Your Specialism Catalyst!</p>
                <p className="text-indigo-950 font-medium text-xs mt-1.5 leading-relaxed italic">
                  "{MASCOT_SPEECHES["landing"][mascotQuoteIndex]}"
                </p>
              </div>
              <button 
                onClick={() => {
                  playSound('pop', soundEnabled);
                  setMascotQuoteIndex(prev => (prev + 1) % 2);
                }}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-indigo-700 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
              >
                Poke Labby 🤭
              </button>
            </div>

            {/* Fun Interactive Laboratory joke of the day */}
            <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-5 mb-8 text-left shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0 select-none text-xl">
                  💡
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-amber-600 uppercase font-black block leading-none">Investigator Humour</span>
                  <p className="text-slate-500 text-[10px] font-semibold mt-0.5">Scientific Catalyst of the Day:</p>
                  <p className="text-slate-800 font-bold text-xs sm:text-[13px] mt-1 pr-2">
                    {SCIENCE_TRIVIA[triviaIndex].text}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setTriviaIndex((prev) => (prev + 1) % SCIENCE_TRIVIA.length);
                }}
                className="px-3 text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 hover:scale-101 select-none font-bold rounded-xl transition-all border border-amber-200/50 cursor-pointer py-1.5 shrink-0"
              >
                Another Joke 🤭
              </button>
            </div>

            {/* Student Enrollment Form Integration (Directly on Landing) */}
            <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-7 shadow-xs mt-4 mb-10 text-left">
              <div className="text-center mb-6">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 mx-auto mb-3 border border-indigo-100 shadow-3xs">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Enrollment</h2>
                <p className="text-slate-500 text-xs mt-1">Enter your valid university demographics to authorize and start the placement engine.</p>
              </div>

              {demoError && (
                <div className="mb-5 p-3.5 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg text-rose-800 text-xs flex items-start space-x-2">
                  <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{demoError}</span>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); initializeQuiz(); }} className="space-y-4">
                <div>
                  <label className="text-[10.5px] font-bold text-slate-705 tracking-wider block uppercase mb-1.5 font-mono">Full Name</label>
                  <input
                    id="inp_student_name"
                    type="text"
                    required
                    placeholder="e.g. Chioma Adebayo"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 focus:bg-white transition-all shadow-inner block"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-slate-705 tracking-wider block uppercase mb-1.5 font-mono">Matriculation Number</label>
                  <input
                    id="inp_student_matric"
                    type="text"
                    required
                    placeholder="e.g. SLT/2023/1024"
                    value={studentInfo.matricNo}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, matricNo: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 focus:bg-white transition-all shadow-inner block"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-slate-705 tracking-wider block uppercase mb-1.5 font-mono">Email Address</label>
                  <input
                    id="inp_student_email"
                    type="email"
                    required
                    placeholder="e.g. chioma@university.edu.ng"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 focus:bg-white transition-all shadow-inner block"
                  />
                </div>

                <button
                  id="btn_authorize_quiz"
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>Authorize & Begin Placement Evaluation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Curriculum breakdown badges */}
            <div className="border-t border-slate-200 pt-8 max-w-2xl mx-auto">
              <span className="text-[10.5px] font-mono tracking-widest text-slate-400 uppercase font-bold block mb-4">5 Core Curriculums Integrated</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'].map((item) => (
                  <span key={item} className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-705 rounded-lg text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =============== VIEW 3: QUIZ CONTAINER =============== */}
        {view === 'quiz' && (
          <div className="max-w-3xl mx-auto mt-2">
            
            {/* STAGE CHART HEADER */}
            <div className="bg-white border border-purple-100/90 rounded-2xl p-5 shadow-xs mb-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-purple-700 uppercase">Assessment Stepper progress</span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">Section {quizStep}/5</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Answered: <span className="font-mono font-bold text-slate-800">{answeredCount}</span> of <span className="font-mono font-bold text-slate-800">{totalQuestionsList}</span> questions.
                  </p>
                </div>
                
                {/* Dynamic Science Beaker progress loadout */}
                {getBeakerProgressSVG(progressPercent)}
              </div>

              {/* Progress Bar Grid */}
              <div className="grid grid-cols-5 gap-2 border-t border-slate-100 pt-4">
                {[1, 2, 3, 4, 5].map((sNum) => {
                  let barColor = 'bg-slate-100'; // defaults inactive
                  if (quizStep > sNum) barColor = 'bg-purple-600'; // passed
                  else if (quizStep === sNum) barColor = 'bg-purple-400 animate-pulse'; // active
                  return (
                    <div key={sNum} className="space-y-1">
                      <div className={`h-2 rounded-full transition-colors ${barColor}`} />
                      <span className={`text-[9px] font-mono tracking-widest uppercase block ${quizStep === sNum ? 'text-purple-700 font-bold' : 'text-slate-400'}`}>
                        {sNum === 1 && 'Interests'}
                        {sNum === 2 && 'Workstyle'}
                        {sNum === 3 && 'Careers'}
                        {sNum === 4 && 'Scenarios'}
                        {sNum === 5 && 'Reflections'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive mascot speech bubble during assessment */}
            <div className="bg-linear-to-r from-purple-50 via-white to-purple-50 border border-purple-100 rounded-2xl p-4.5 mb-6 text-left shadow-2xs flex items-start space-x-3.5">
              <div className="text-2xl select-none shrink-0 animate-bounce">
                🧪
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-purple-700 uppercase font-black block">Labby's Experimental Notes</span>
                <p className="text-slate-700 text-xs mt-1 italic font-medium">
                  "{MASCOT_SPEECHES[quizStep]?.[mascotQuoteIndex] || 'Reflect truthfully to build raw academic vectors!'}"
                </p>
              </div>
            </div>

            {/* MAIN QUESTIONNAIRE PANEL */}
            <div className="bg-white border border-purple-200 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-9 text-left transition-all">
              {quizStep < 5 ? (
                // LIKERT LADDERS (Sections 1 to 4)
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{activeSegment.title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed mb-8">{activeSegment.subtitle}</p>

                  <div className="space-y-8 divide-y divide-slate-100">
                    {activeSegment.questions.map((q, idx) => {
                      const ansVal = answers[q.id];
                      return (
                        <div key={q.id} className={`pt-6 ${idx === 0 ? 'pt-0' : ''}`}>
                          <div className="flex items-start space-x-3 mb-4">
                            <span className="h-6 w-6 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-xs font-mono font-bold text-purple-600 shrink-0">
                              {(innerPage * 5) + idx + 1}
                            </span>
                            <div>
                              <p className="text-slate-800 font-medium text-[15px] sm:text-[16px] leading-relaxed">
                                {q.text}
                              </p>
                              {q.category && quizStep !== 4 && (
                                <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 text-[10px] font-mono mt-1 border border-purple-100/50">
                                  {q.category}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Likert Scale Buttons Array */}
                          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 mt-4">
                            {likertOptions.map((opt) => {
                              const isSelected = ansVal === opt.val;
                              return (
                                <button
                                  key={opt.val}
                                  id={`btn_ans_${q.id}_${opt.val}`}
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, opt.val)}
                                  className={`px-1 rounded-xl border text-center py-2.5 sm:py-3.5 cursor-pointer flex flex-col items-center justify-between transition-all select-none hover:shadow-xs ${
                                    isSelected
                                      ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500'
                                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600'
                                  }`}
                                >
                                  {/* Point indicator */}
                                  <div className={`h-4.5 w-4.5 rounded-full border mb-1 flex items-center justify-center font-bold text-[9px] ${
                                    isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-300 text-slate-500'
                                  }`}>
                                    {isSelected ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : opt.val}
                                  </div>
                                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-tight text-slate-700 leading-tight">
                                    {opt.val === 5 && 'Strongly Agree'}
                                    {opt.val === 4 && 'Agree'}
                                    {opt.val === 3 && 'Neutral'}
                                    {opt.val === 2 && 'Disagree'}
                                    {opt.val === 1 && 'Strongly Disagree'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // QUALITATIVE PASSION TEXTS (Section 5)
                <div>
                  <div className="flex items-center space-x-2.5 text-purple-700 mb-2">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Qualitative Narrative synthesis</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Section 5: Passion & Ambition Reflection</h3>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed mb-6">
                    A comprehensive career advisory profile combines quantitative measurements with your raw verbal goals. Write 1-2 honest, brief sentences back for each query.
                  </p>

                  <div className="space-y-6">
                    {PASSION_QUESTIONS.map((pq, pIdx) => {
                      const key = pq.id as keyof PassionAnswers;
                      return (
                        <div key={pq.id} className="space-y-2">
                          <label className="text-sm font-semibold text-slate-800 flex items-start space-x-2">
                            <span className="h-5.5 w-5.5 rounded bg-purple-50 text-purple-605 border border-purple-100 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                              {pIdx + 1}
                            </span>
                            <span className="leading-tight">{pq.label}</span>
                          </label>
                          <textarea
                            id={`inp_passion_${pq.id}`}
                            rows={2}
                            required
                            placeholder="Write your brief honest reflection here..."
                            value={passionAnswers[key]}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPassionAnswers(prev => ({ ...prev, [key]: val }));
                            }}
                            className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all shadow-inner block"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between mt-10 border-t border-slate-100 pt-6">
                <button
                  id="btn_quiz_prev"
                  type="button"
                  onClick={() => handlePagePrev()}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>

                {quizStep < 5 ? (
                  <button
                    id="btn_quiz_next"
                    type="button"
                    onClick={() => handlePageNext()}
                    className="flex items-center space-x-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Save & Continue</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    id="btn_submit_answers"
                    type="button"
                    onClick={() => handleReflectionsSubmit()}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md"
                  >
                    <span>Finalise Assessment</span>
                    <CheckCircle2 className="h-4 w-4 text-purple-100" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =============== VIEW 4: SUBMITTING / PROCESSING SCREEN =============== */}
        {view === 'submitting' && (
          <div className="max-w-md mx-auto py-16 text-center mt-8">
            <div className="relative h-20 w-20 mx-auto mb-6">
              {/* Spinning animated outline */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
              {/* Inner animated pulsing core */}
              <div className="absolute inset-2 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse">
                <FlaskConical className="h-7 w-7 text-indigo-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Evolving Alignment Matrix</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto animate-pulse mt-1 mb-8">Computing your custom Science Laboratory Technology suitability profile...</p>
            
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm text-left max-w-sm mx-auto">
              <span className="text-[8.5px] font-mono font-bold tracking-widest text-indigo-700 uppercase block mb-1">Advisor Telemetry Engine</span>
              <p className="text-slate-600 text-xs leading-relaxed font-mono">
                {loadingPhrases[loaderIndex]}
              </p>
            </div>
          </div>
        )}

        {/* =============== VIEW 5: COMPREHENSIVE RESULT SCREEN =============== */}
        {view === 'result' && currentSubmission && (
          <div className="max-w-4xl mx-auto space-y-8 mt-2 text-left">
            
            {/* ALERT BOX CONFIRMING COMPLETION */}
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl shadow-xs flex items-center justify-between text-left print:hidden">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5.5 w-5.5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-900 text-[14.5px]">Assessment Process Complete</p>
                  <p className="text-slate-500 text-xs">A comprehensive counselor profile has been generated successfully for {currentSubmission.student.name}.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="btn_download_report_html"
                  onClick={() => {
                    playSound('success', soundEnabled);
                    downloadHTMLReport(currentSubmission);
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-650 hover:bg-indigo-700 hover:scale-101 rounded-xl transition-all shadow-md cursor-pointer"
                  title="Download offline report file (bypasses iframe restrictions)"
                >
                  <Download className="h-4 w-4 text-indigo-200" />
                  <span>Download Printable Report Card</span>
                </button>
                <button
                  id="btn_print_results"
                  onClick={() => {
                    playSound('click', soundEnabled);
                    try {
                      window.print();
                    } catch (e) {
                      alert("Direct print blocked by sandbox restrictions. Please download the Printable Report file! It works flawlessly when opened directly.");
                    }
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Direct Browser Print</span>
                </button>
                <button
                  id="btn_retake_quiz"
                  onClick={() => {
                    playSound('whoosh', soundEnabled);
                    resetAssessment();
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100/80 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>

            {/* HIGH-FIDELITY OUTLET PAGE */}
            <div className="bg-white border border-slate-250/90 rounded-3xl p-6 sm:p-10 shadow-sm print:shadow-none print:border-none print:p-0">
              
              {/* PRINT HEADER OVERLAY (ONLY DISPLAYED IN PRINT LAYOUT) */}
              <div className="hidden print:block border-b border-indigo-200 pb-5 mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-none">University Placement Council</h1>
                    <span className="text-xs font-mono text-slate-400 block mt-1 uppercase">SLT Specialisation Assessment Record</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">Date of Run: {new Date(currentSubmission.timestamp).toLocaleDateString()}</span>
                    <span className="text-[10px] font-mono text-indigo-700 block uppercase font-bold">Confidential Counselor File</span>
                  </div>
                </div>
              </div>

              {/* STUDENT PROFILE SECTION */}
              <div className="grid md:grid-cols-3 gap-6 pb-8 border-b border-slate-100 mb-8">
                <div className="md:col-span-2 space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Biographical Registry</span>
                  <h2 className="text-3xl font-black text-slate-900 leading-none">{currentSubmission.student.name}</h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1 text-slate-600 text-sm">
                    <span className="flex items-center space-x-1">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span>Matric No: <strong>{currentSubmission.student.matricNo}</strong></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span>Email: <strong>{currentSubmission.student.email}</strong></span>
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Match Confidence</span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-2xl font-black text-indigo-700">{currentSubmission.result.matchLevel}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-none">Scored relative to top core metrics.</p>
                </div>
              </div>

              {/* PRIMARY RECOMMENDATION BADGE BANNER */}
              <div className="grid md:grid-cols-5 gap-6 mb-10">
                
                {/* TOP SPECIALISM CARD */}
                <div className="md:col-span-3 bg-gradient-to-tr from-indigo-700 to-indigo-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10">
                    <FlaskConical className="h-32 w-32" />
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-white/10 w-fit px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase backdrop-blur-md mb-4 pr-3 pl-2 sm:text-[10.5px]">
                    <Award className="h-3.5 w-3.5 text-indigo-200 stroke-[2.5]" />
                    <span>Top Recommended Specialisation</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                    {currentSubmission.result.topUnit}
                  </h3>

                  <p className="text-indigo-150 text-sm leading-relaxed text-pretty">
                    {UNIT_DETAILS[currentSubmission.result.topUnit].overview}
                  </p>
                </div>

                {/* SECOND BEST PATH CARD */}
                <div className="md:col-span-2 bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-slate-500 mb-4 text-[10.5px] font-mono font-bold uppercase">
                      <Compass className="h-3.5 w-3.5 text-slate-400" />
                      <span>Second-Best Alternative</span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                      {currentSubmission.result.secondUnit}
                    </h4>

                    <p className="text-slate-500 text-xs leading-relaxed mt-2">
                      An excellent interdisciplinary buffer route. Allows valuable flexibility for double major pathways or overlapping laboratory sectors.
                    </p>
                  </div>

                  <div className="border-t border-slate-200/60 pt-4 mt-4">
                    <span className="text-[10.5px] font-mono text-indigo-600 block font-semibold leading-none">Why It Fits:</span>
                    <span className="text-[11.5px] text-slate-600 leading-tight block mt-1">Matches backup interests {currentSubmission.result.percentages[currentSubmission.result.secondUnit]}% alignment.</span>
                  </div>
                </div>

              </div>

              {/* ALL UNITS COMPATIBILITY GAUGE CHART (Tailwind Custom Grid Chart) */}
              <div className="mb-10 text-left bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <span className="text-[10px] font-mono tracking-widest text-indigo-700 uppercase font-bold block mb-1">Background scoring metrics</span>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight mb-5">Compatibility Breakdown Across All Units</h3>
                
                <div className="space-y-4">
                  {(['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'] as Unit[]).map((unit) => {
                    const percentage = currentSubmission.result.percentages[unit];
                    const isTop = unit === currentSubmission.result.topUnit;
                    const isSecond = unit === currentSubmission.result.secondUnit;

                    // Theme mappings for visual variance
                    let unitColor = 'bg-slate-300';
                    let barColor = 'from-slate-400 to-slate-500 animate-none';
                    if (unit === 'Biotechnology') barColor = 'from-indigo-500 to-indigo-700';
                    if (unit === 'Biochemistry') barColor = 'from-teal-500 to-teal-700';
                    if (unit === 'Microbiology') barColor = 'from-emerald-500 to-emerald-700';
                    if (unit === 'Chemistry') barColor = 'from-amber-500 to-amber-700';
                    if (unit === 'Physics') barColor = 'from-rose-500 to-rose-700';

                    return (
                      <div key={unit} className="space-y-1">
                        <div className="flex items-center justify-between font-semibold text-slate-800 text-xs sm:text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-505 to-indigo-650" style={{ backgroundImage: `linear-gradient(to right, var(--color-indigo-500), var(--color-indigo-700))` }}>
                              <span className={`block w-full h-full rounded-full bg-gradient-to-r ${barColor}`} />
                            </span>
                            <span className="font-bold text-slate-900">{unit}</span>
                            {isTop && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider bg-indigo-100 text-indigo-700 uppercase rounded-sm">
                                Recommended Primary
                              </span>
                            )}
                            {isSecond && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider bg-slate-100 text-slate-700 uppercase rounded-sm">
                                Alternative Option
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-sm block font-black text-slate-900">{percentage}%</span>
                        </div>

                        {/* Relative bar wrapper */}
                        <div className="w-full h-3.5 bg-slate-200/60 rounded-full overflow-hidden relative shadow-inner">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000`} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PERSONALIZED COUNSEL REPORT (INCORPORATING COMPONENT FROM GEMINI CORE) */}
              <div className="border border-indigo-150 bg-indigo-50/20 rounded-2xl p-6 sm:p-8 mb-10 text-left print:border-slate-300">
                <div className="flex items-center space-x-2 text-indigo-700 mb-3 block">
                  <Sparkles className="h-5 w-5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wide">AI Academic Counselor Narrative Analysis</span>
                </div>

                <div 
                  id="advise_markdown_body"
                  className="prose prose-sm max-w-none text-slate-700 text-sm sm:text-[14.5px] leading-relaxed font-normal whitespace-pre-line"
                >
                  {currentSubmission.result.aiSummary}
                </div>
              </div>

              {/* DYNAMIC TWO-COLUMN REVELATION GRID */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                
                {/* COLUMN 1: STRENGTHS & IMPROVEMENTS */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15.5px] uppercase tracking-wide border-b border-slate-100 pb-2 mb-3 flex items-center space-x-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600" />
                      <span>Strengths Profile Identified</span>
                    </h3>
                    <ul className="space-y-1.5 text-slate-650 text-sm">
                      {currentSubmission.result.strengths.map((str, sIdx) => (
                        <li key={sIdx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-[15.5px] uppercase tracking-wide border-b border-slate-100 pb-2 mb-3 flex items-center space-x-2">
                      <AlertCircle className="h-4.5 w-4.5 text-indigo-600" />
                      <span>Areas for Personal Development</span>
                    </h3>
                    <ul className="space-y-1.5 text-slate-650 text-sm">
                      {currentSubmission.result.improvements.map((imp, impIdx) => (
                        <li key={impIdx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* COLUMN 2: INDUSTRIAL OPPORTUNITIES IN NIGERIA AND GLOBALLY */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15.5px] uppercase tracking-wide border-b border-slate-100 pb-2 mb-3 flex items-center space-x-2">
                      <Compass className="h-4.5 w-4.5 text-indigo-600" />
                      <span>Career Horizons & Nigeria Outlets</span>
                    </h3>
                    <div className="space-y-2 text-slate-650 text-sm">
                      <p className="text-xs font-bold text-indigo-700 leading-none">Local Framework Outlets:</p>
                      <ul className="space-y-1">
                        {UNIT_DETAILS[currentSubmission.result.topUnit].careersNigeria.map((co, idx) => (
                          <li key={idx} className="text-xs flex items-center space-x-1.5 text-slate-700 font-medium">
                            <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">·</span>
                            <span>{co}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="text-xs font-bold text-slate-500 leading-none pt-2">Global Horizons:</p>
                      <ul className="space-y-1">
                        {UNIT_DETAILS[currentSubmission.result.topUnit].careersGlobal.map((co, idx) => (
                          <li key={idx} className="text-xs flex items-center space-x-1.5 text-slate-505 font-medium">
                            <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">·</span>
                            <span>{co}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* TIMELINE CERTIFICATIONS AND SKILLS TIMEOUT */}
              <div className="grid md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider block mb-3 leading-none">Primary Skills To Cultivate Immediately</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSubmission.result.skills.map((tool, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-850 rounded-lg text-xs font-mono font-medium shadow-2xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider block mb-3 leading-none">Suggested Certification Credentials</h3>
                  <div className="space-y-1.5">
                    {UNIT_DETAILS[currentSubmission.result.topUnit].suggestedCertifications.map((sc, scIdx) => (
                      <div key={scIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-650">
                        <CheckCircle2 className="h-4 w-4 text-slate-400 inline shrink-0" />
                        <span>{sc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Print trigger fallback link */}
            <div className="text-center pt-2 pb-12 print:hidden">
              <button
                id="btn_quiz_restart"
                onClick={() => resetAssessment()}
                className="inline-flex items-center space-x-1 hover:text-indigo-800 text-indigo-700 font-bold transition-all text-sm cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Return to Student Landing Hub</span>
              </button>
            </div>

          </div>
        )}

        {/* =============== VIEW 6: ADMIN LOGIN PAGE CODE =============== */}
        {view === 'admin-login' && (
          <div className="max-w-md mx-auto bg-white border border-slate-200/80 rounded-2xl p-8 shadow-md mt-6">
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mx-auto mb-3 border border-slate-200 shadow-sm">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Administrator Login</h2>
              <p className="text-slate-500 text-sm mt-1">This terminal requires counselor-level security authorization.</p>
            </div>

            {adminError && (
              <div className="mb-5 p-3.5 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg text-rose-800 text-xs flex items-start space-x-2">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 tracking-wide block uppercase mb-1.5">Joanna Username</label>
                <input
                  id="inp_admin_username"
                  type="text"
                  required
                  placeholder="Admin Username"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 tracking-wide block uppercase mb-1.5">Joanna Security Password</label>
                <input
                  id="inp_admin_password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <button
                id="btn_authorize_admin"
                type="submit"
                className="w-full mt-6 bg-slate-900 hover:bg-slate-850 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
              >
                <span>Authorize Counsel Controls</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* =============== VIEW 7: COMPREHENSIVE ADMINISTRATOR CONTROLS (JOANNA) =============== */}
        {view === 'admin-dashboard' && (
          <div className="space-y-8 text-left mt-2">
            
            {/* COHORT STATISTICS GRID (Custom Interactive Tailwind Charts & Bento) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Bento KPI 1: Total run counters */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block leading-none">Database Volumes</span>
                <span className="text-4xl font-black text-slate-900 block mt-1.5 leading-none">{stats.total}</span>
                <span className="text-[11.5px] text-slate-500 block font-semibold mt-1">Total Submissions Collected</span>
              </div>

              {/* Bento KPI 2: High Match counts */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm md:col-span-3">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block leading-none">Placement Unit matches</span>
                
                <div className="grid grid-cols-5 gap-3 mt-3">
                  {(['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'] as Unit[]).map((unit) => {
                    const count = stats.units[unit] || 0;
                    const percent = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <div key={unit} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                        <span className="text-[10.5px] font-bold text-slate-900 leading-none block">{unit}</span>
                        <div className="mt-2.5 flex items-baseline space-x-1 leading-none">
                          <span className="text-lg font-black block text-indigo-700">{count}</span>
                          <span className="text-[9.5px] text-slate-400 font-mono">({percent}%)</span>
                        </div>
                        {/* Interactive mini progress div */}
                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-2">
                          <div className="bg-indigo-600 h-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* High level control layout: search, filter, export and clear filters */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-lg relative">
                <Search className="h-4.5 w-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="inp_admin_search"
                  type="text"
                  placeholder="Search students by Name, Matriculation ID, or Email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2 text-slate-820 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0 flex-wrap gap-y-2">
                <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <span className="text-slate-400 text-[10.5px] font-mono leading-none">Placement Filter:</span>
                  <select
                    id="sel_placement_filter"
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value as any)}
                    className="border-none bg-transparent hover:text-indigo-800 text-xs font-semibold text-slate-700 p-0 focus:ring-0 leading-none focus:outline-hidden cursor-pointer"
                  >
                    <option value="All">All Units</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>

                <button
                  id="btn_export_data"
                  onClick={() => exportToCSV()}
                  disabled={!submissions.length}
                  className="flex items-center space-x-1.5 px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Download className="h-4 w-4 text-emerald-600" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* CORE TABLE OF SUBMISSIONS */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 font-mono tracking-widest text-[#64748b] uppercase font-bold">
                      <th className="px-6 py-3.5">Student Info</th>
                      <th className="px-6 py-3.5 font-semibold">Recommended Specialisation</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Scores Breakdown</th>
                      <th className="px-6 py-3.5 font-semibold">Test Completion Date</th>
                      <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 text-[13px] block">{sub.student.name}</span>
                            <span className="text-[10.5px] font-mono text-slate-400 block tracking-tight mt-0.5">{sub.student.matricNo}</span>
                            <span className="text-[10px] text-slate-500 block leading-none">{sub.student.email}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex py-1 px-2 text-[10.5px] font-bold tracking-tight rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                              {sub.result.topUnit}
                            </span>
                            <span className="text-[9.5px] text-slate-450 block font-medium mt-1">Secondary: {sub.result.secondUnit}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-block space-y-1 text-center font-mono">
                              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-md font-semibold text-slate-650">
                                BT {sub.result.percentages.Biotechnology}% · BC {sub.result.percentages.Biochemistry}% · MB {sub.result.percentages.Microbiology}% · CH {sub.result.percentages.Chemistry}% · PH {sub.result.percentages.Physics}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-mono">
                            {new Date(sub.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                id={`btn_view_${sub.id}`}
                                onClick={() => setSelectedSubReport(sub)}
                                className="flex items-center space-x-1 px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 text-[11px] rounded-lg transition-colors font-semibold cursor-pointer"
                              >
                                <FileText className="h-3 w-3" />
                                <span>Report Card</span>
                              </button>
                              <button
                                id={`btn_delete_${sub.id}`}
                                onClick={() => handleDeleteSubmission(sub.id)}
                                className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-100 cursor-pointer"
                                title="Delete Test Submission"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-20 text-center">
                          <div className="max-w-xs mx-auto text-center">
                            <Users className="h-10 w-10 text-slate-350 mx-auto" />
                            <p className="text-slate-900 font-bold tracking-tight mt-3">No matching student tests discovered</p>
                            <p className="text-slate-450 text-xs mt-1">Refine your active search query input above or placement selections.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* =============== POPUP SUB-MODAL: INDIVIDUAL DETAILED STUDENT REPORT (ADMIN OVERLAY) =============== */}
      <AnimatePresence>
        {selectedSubReport && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/30 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-4xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              
              {/* MODAL ACTION BAR */}
              <div className="bg-slate-50 border-b border-slate-150 px-6 py-4 shrink-0 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-mono tracking-wider font-bold text-indigo-700 uppercase">Assessment record modal viewer</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5 leading-none">Counselor Audit for {selectedSubReport.student.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      playSound('success', soundEnabled);
                      downloadHTMLReport(selectedSubReport);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-semibold cursor-pointer"
                    title="Download fully-styled report document card"
                  >
                    <Download className="h-3.5 w-3.5 shrink-0 text-indigo-200" />
                    <span>Download Report (Printable)</span>
                  </button>
                  <button
                    onClick={() => {
                      playSound('click', soundEnabled);
                      setCurrentSubmission(selectedSubReport);
                      setTimeout(() => {
                        try {
                          window.print();
                        } catch (e) {
                          alert("Iframe sandbox restrictions blocked direct printing. Please use 'Download Report (Printable)' to print/save perfectly!");
                        }
                      }, 200);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 text-xs rounded-xl transition-all font-semibold cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5 shrink-0" />
                    <span>Direct Print</span>
                  </button>
                  <button
                    onClick={() => {
                      playSound('whoosh', soundEnabled);
                      setSelectedSubReport(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold transition-colors text-xs cursor-pointer"
                  >
                    Close Sheet
                  </button>
                </div>
              </div>

              {/* MODAL WRAPPED BODY (DYNAMIC RESULTS RENDER) */}
              <div className="p-6 overflow-y-auto text-left space-y-8 select-text">
                
                {/* BIO CARD IN MODAL */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
                  <div className="sm:col-span-2 space-y-2">
                    <span className="text-[10.5px] font-mono tracking-widest text-slate-400 uppercase font-black block leading-none">Aspirant Profile Demographics</span>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight block">{selectedSubReport.student.name}</h3>
                    <p className="text-slate-550 text-xs inline-flex items-center space-x-3">
                      <span>Matric: <strong>{selectedSubReport.student.matricNo}</strong></span>
                      <span className="text-slate-300">|</span>
                      <span>Email: <strong>{selectedSubReport.student.email}</strong></span>
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-150/50 p-4 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider block font-bold leading-none">Top Outcome placement</span>
                    <span className="text-xl font-bold text-indigo-700 block mt-1 leading-none">{selectedSubReport.result.topUnit}</span>
                    <span className="text-[9.5px] text-slate-500 block font-semibold mt-1">Confidence rating is {selectedSubReport.result.matchLevel}</span>
                  </div>
                </div>

                {/* VISUAL CHARTS WRAPPED */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5">
                  <span className="text-[10.5px] font-mono tracking-wider font-bold text-slate-450 block mb-3 uppercase leading-none font-black text-[9.5px]">Hidden Scoring Algorithms Matrix (%)</span>
                  
                  <div className="space-y-3">
                    {(['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'] as Unit[]).map((unit) => {
                      const percentage = selectedSubReport.result.percentages[unit];
                      const isTop = unit === selectedSubReport.result.topUnit;
                      
                      let barColor = 'from-slate-400 to-slate-500';
                      if (unit === 'Biotechnology') barColor = 'from-indigo-500 to-indigo-700';
                      if (unit === 'Biochemistry') barColor = 'from-teal-500 to-teal-700';
                      if (unit === 'Microbiology') barColor = 'from-emerald-500 to-emerald-700';
                      if (unit === 'Chemistry') barColor = 'from-amber-500 to-amber-700';
                      if (unit === 'Physics') barColor = 'from-rose-500 to-rose-700';

                      return (
                        <div key={unit} className="space-y-1">
                          <div className="flex justify-between items-center text-slate-800 font-semibold text-xs leading-none">
                            <span className="font-bold flex items-center space-x-1.5">
                              <span>{unit}</span>
                              {isTop && <span className="text-[7.5px] px-1 py-0.5 uppercase tracking-wide bg-indigo-150 border border-indigo-200 font-bold rounded-sm text-indigo-700">Top Match</span>}
                            </span>
                            <span className="font-mono text-[11px] font-black">{percentage}%</span>
                          </div>
                          
                          <div className="w-full h-2.5 bg-slate-200/60 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${barColor}`} style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI ADVICE WRAPPED INSIDE MODAL */}
                <div className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-6">
                  <span className="text-xs font-mono font-bold text-indigo-650 tracking-wider inline-flex items-center gap-1 uppercase block mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600 inline" />
                    <span>AI Counselor Narrative Report Statement</span>
                  </span>
                  <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line leading-relaxed">
                    {selectedSubReport.result.aiSummary}
                  </p>
                </div>

                {/* DETAILED RESPONSES INDEX REVIEW */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase leading-none block font-black">Reflexive Narratives Index Review</span>
                  
                  <div className="space-y-3.5 divide-y divide-slate-100">
                    {PASSION_QUESTIONS.slice(0, 4).map((pq) => {
                      const key = pq.id as keyof PassionAnswers;
                      const responseTxt = selectedSubReport.passionAnswers[key];
                      return (
                        <div key={pq.id} className="pt-3.5 first:pt-0">
                          <span className="text-xs font-bold text-slate-800 block">{pq.label}</span>
                          <span className="text-slate-600 font-mono italic block text-xs mt-1 leading-relaxed">
                            "{responseTxt || 'Empty submission responses.'}"
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center select-none text-[10.5px] font-mono tracking-widest text-[#94a3b8] uppercase mt-20 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span>Science Laboratory Technology Guidance Matrix © 2026</span>
          <span className="text-slate-400 normal-case">
            Authorized Academic Personnel Only
          </span>
        </div>
      </footer>

    </div>
  );
}
