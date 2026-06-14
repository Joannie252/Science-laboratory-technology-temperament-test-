export type Unit = 'Biotechnology' | 'Biochemistry' | 'Microbiology' | 'Chemistry' | 'Physics';

export interface StudentInfo {
  name: string;
  matricNo: string;
  email: string;
}

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  section: 1 | 2 | 3 | 4;
  text: string;
  // Weight mappings to load points on specific units
  // Key: Unit, Value: Number multiplier of score (typically +1 or -1)
  weights: Partial<Record<Unit, number>>;
  reverseScored?: boolean;
  category?: string; // e.g., "Bacteria", "Metabolism", "Patience" (hidden details)
  scenarioContext?: string; // Scenario explanation for Section 4
}

export interface PassionAnswers {
  q1: string; // What scientific discovery excites you the most?
  q2: string; // If given a fully equipped laboratory, what would you research?
  q3: string; // What type of problem would you like to solve in society?
  q4: string; // Which science documentaries or topics do you naturally enjoy?
  q5: string; // What area of technology/instrumentation are you eager to master?
}

export interface ScoreBreakdown {
  Biotechnology: number;
  Biochemistry: number;
  Microbiology: number;
  Chemistry: number;
  Physics: number;
}

export interface AssessmentResult {
  topUnit: Unit;
  secondUnit: Unit;
  scores: ScoreBreakdown;
  maxPossibleWeights: ScoreBreakdown;
  percentages: ScoreBreakdown;
  strengths: string[];
  improvements: string[];
  skills: string[];
  matchLevel: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Weak Match';
  aiSummary?: string; // Personalized advice synthesized by Gemini
}

export interface Submission {
  id: string;
  student: StudentInfo;
  answers: Record<string, LikertValue>; // questionId -> value (1-5)
  passionAnswers: PassionAnswers;
  result: AssessmentResult;
  timestamp: string;
}

export interface UnitDetail {
  name: Unit;
  overview: string;
  focus: string[];
  traits: string[];
  challenges: string[];
  difficultConcepts: string[];
  natureOfWork: string;
  careersNigeria: string[];
  careersGlobal: string[];
  advantages: string[];
  skillsGained: string[];
  futureRelevance: string;
  suggestedCertifications: string[];
  suggestedActivities: string[];
}
