import { LikertValue, AssessmentResult, Unit, ScoreBreakdown } from './types';
import { SECTION_1_QUESTIONS, SECTION_2_QUESTIONS, SECTION_3_QUESTIONS, SECTION_4_QUESTIONS } from './questions';
import { UNIT_DETAILS } from './unitDetails';

export function calculateScores(answers: Record<string, LikertValue>): AssessmentResult {
  const allQuestions = [
    ...SECTION_1_QUESTIONS,
    ...SECTION_2_QUESTIONS,
    ...SECTION_3_QUESTIONS,
    ...SECTION_4_QUESTIONS
  ];

  const scores: ScoreBreakdown = {
    Biotechnology: 0,
    Biochemistry: 0,
    Microbiology: 0,
    Chemistry: 0,
    Physics: 0
  };

  const maxPossibleWeights: ScoreBreakdown = {
    Biotechnology: 0,
    Biochemistry: 0,
    Microbiology: 0,
    Chemistry: 0,
    Physics: 0
  };

  allQuestions.forEach(q => {
    const studentAnswer = answers[q.id];
    if (studentAnswer === undefined) return; // Unanswered questions safe guard

    // 1. Resolve reverse scoring (Strongly Agree (5) -> 1 or Disagree (2) -> 4)
    const studentVal = q.reverseScored ? (6 - studentAnswer) : studentAnswer;

    // 2. Iterate through weights
    const units: Unit[] = ['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'];
    units.forEach(unit => {
      const W = q.weights[unit];
      if (W !== undefined && W !== 0) {
        if (W > 0) {
          scores[unit] += studentVal * W;
          maxPossibleWeights[unit] += 5 * W;
        } else {
          // Negative weight (disalignment): if student scores low (which means they disagree with the disaligned item),
          // they align with this unit.
          scores[unit] += (6 - studentVal) * Math.abs(W);
          maxPossibleWeights[unit] += 5 * Math.abs(W);
        }
      }
    });
  });

  // Calculate percentages
  const percentages: ScoreBreakdown = {
    Biotechnology: 0,
    Biochemistry: 0,
    Microbiology: 0,
    Chemistry: 0,
    Physics: 0
  };

  const units: Unit[] = ['Biotechnology', 'Biochemistry', 'Microbiology', 'Chemistry', 'Physics'];
  units.forEach(unit => {
    const max = maxPossibleWeights[unit];
    if (max > 0) {
      percentages[unit] = Math.round((scores[unit] / max) * 100);
    } else {
      percentages[unit] = 0;
    }
  });

  // Sort units by percentage to find top and second best
  const sortedUnits = [...units].sort((a, b) => {
    if (percentages[b] !== percentages[a]) {
      return percentages[b] - percentages[a];
    }
    // alphabetical fallback for stable ties
    return a.localeCompare(b);
  });

  const topUnit = sortedUnits[0] as Unit;
  const secondUnit = sortedUnits[1] as Unit;
  const topPercentage = percentages[topUnit];

  // Match levels
  let matchLevel: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Weak Match' = 'Weak Match';
  if (topPercentage >= 82) {
    matchLevel = 'Strong Match';
  } else if (topPercentage >= 68) {
    matchLevel = 'Good Match';
  } else if (topPercentage >= 50) {
    matchLevel = 'Moderate Match';
  }

  // Pick static lists of strengths, improvements, and skills from detailed mappings
  const details = UNIT_DETAILS[topUnit];
  
  // Custom smart selection of strengths
  const strengths = [
    `High suitability for ${topUnit} experimental paradigms.`,
    `A natural affinity towards "${details.focus[0]}".`,
    `Demonstrated trait of: ${details.traits[0]}.`
  ];

  const improvements = [
    `Familiarise with initial core difficulties: ${details.challenges[0]}.`,
    `Proactively study theoretical bases such as "${details.difficultConcepts[0]}".`
  ];

  const skills = [
    ...details.skillsGained.slice(0, 3)
  ];

  return {
    topUnit,
    secondUnit,
    scores,
    maxPossibleWeights,
    percentages,
    strengths,
    improvements,
    skills,
    matchLevel
  };
}
