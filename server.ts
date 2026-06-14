import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { calculateScores } from './src/evaluator.js';
import { Submission, StudentInfo, PassionAnswers, LikertValue } from './src/types.js';
import nodemailer from 'nodemailer';

// Helper function to send email notification to student & copy to admin
async function sendAssessmentEmails(submission: Submission) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Academic Advisor" <${user || 'no-reply@university.edu.ng'}>`;
  const adminRecipient = process.env.ADMIN_EMAIL || 'urohjohanna25@gmail.com';

  const studentEmail = submission.student.email;
  const studentName = submission.student.name;
  const result = submission.result;

  console.log(`[Email Dispatcher] Preparing email payload for ${studentName} (${studentEmail})...`);

  const studentHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your SLT Placement Evaluation Report</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; padding: 25px; margin: 0; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .header { background: linear-gradient(135deg, #4f46e5, #6366f1); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .content { padding: 30px; }
        .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #4338ca; letter-spacing: 0.1em; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .student-meta { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px; margin-bottom: 25px; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
        .meta-item { margin-bottom: 8px; }
        .meta-label { font-weight: bold; color: #64748b; font-size: 11px; text-transform: uppercase; }
        .meta-val { color: #0f172a; font-weight: 600; }
        .badge { display: inline-block; padding: 6px 12px; border-radius: 8px; font-size: 14px; font-weight: bold; text-align: center; margin-right: 5px; }
        .badge-primary { background-color: #e0e7ff; color: #4338ca; }
        .badge-secondary { background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        .score-bar-container { background: #e2e8f0; border-radius: 8px; height: 10px; overflow: hidden; margin: 8px 0 20px 0; }
        .score-bar { background: #4f46e5; height: 100%; border-radius: 8px; }
        .advice-box { background-color: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 0 10px 10px 0; padding: 20px; font-style: italic; color: #4c1d95; line-height: 1.6; font-size: 14px; margin-top: 20px; }
        .footer { background-color: #f8fafc; text-align: center; padding: 20px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <p>Science Laboratory Technology</p>
          <h1>Placement Guidance Matrix</h1>
        </div>
        <div class="content">
          <div class="student-meta">
            <div class="section-title">Authorized Student Profile</div>
            <div class="meta-grid">
              <div class="meta-item">
                <div class="meta-label">Full Name</div>
                <div class="meta-val">${submission.student.name}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Matric Number</div>
                <div class="meta-val">${submission.student.matricNo}</div>
              </div>
              <div class="meta-item" style="grid-column: span 2;">
                <div class="meta-label">Email Address</div>
                <div class="meta-val">${submission.student.email}</div>
              </div>
            </div>
          </div>

          <div class="section-title">Evaluation Outcome</div>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #475569;">Based on your responses, you are most suited for specialization in:</p>
            <div style="margin-top: 12px;">
              <span class="badge badge-primary" style="margin-right: 10px;">${result.topUnit} (${result.percentages[result.topUnit]}% match)</span>
              <span class="badge badge-secondary">Alternative: ${result.secondUnit}</span>
            </div>
          </div>

          <div class="section-title">Suitability Scores</div>
          <p style="font-size: 12px; color: #64748b; margin-top: 0;">Compatibility across curriculum blocks:</p>
          ${Object.entries(result.percentages).map(([unit, pct]) => `
            <div style="margin-bottom: 12px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 3px;">
                <span>${unit}</span>
                <span>${pct}%</span>
              </div>
              <div class="score-bar-container">
                <div class="score-bar" style="width: ${pct}%;"></div>
              </div>
            </div>
          `).join('')}

          <div class="section-title">Academic & Career Counseling Advice</div>
          <div class="advice-box">
            ${result.aiSummary.replace(/\n/g, '<br />')}
          </div>
        </div>
        <div class="footer">
          This is an authorized diagnostic career placement email.<br>
          © 2026 Department of Science Laboratory Technology. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Placement Alert: ${studentName}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 25px; margin: 0; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #cbd5e1; overflow: hidden; }
        .header { background: #0f172a; padding: 20px; color: #ffffff; text-align: center; }
        .header h1 { margin: 0; font-size: 18px; font-weight: bold; }
        .content { padding: 25px; font-size: 14px; line-height: 1.5; }
        .field { margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
        .label { font-weight: bold; color: #64748b; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; }
        .val { font-size: 14px; color: #1e293b; font-weight: bold; }
        .essay-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-size: 12px; color: #334155; margin-top: 6px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🧪 Placement Complete Notification</h1>
        </div>
        <div class="content">
          <p>Hello Joanna,</p>
          <p>A student has successfully completed the Placement Guidance Matrix evaluation. Here are the core details of the submission:</p>
          
          <div class="field">
            <div class="label">Student Name</div>
            <div class="val">${studentName}</div>
          </div>
          <div class="field">
            <div class="label">Matric Number</div>
            <div class="val">${submission.student.matricNo}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="val">${studentEmail}</div>
          </div>
          <div class="field">
            <div class="label">Recommended Major</div>
            <div class="val" style="color: #4f46e5;">${result.topUnit} (${result.percentages[result.topUnit]}% match)</div>
          </div>
          <div class="field">
            <div class="label">Alternate Choice</div>
            <div class="val">${result.secondUnit} (${result.percentages[result.secondUnit]}% match)</div>
          </div>

          <p style="font-weight: bold; margin-top: 20px; font-size: 13px; text-transform: uppercase; color: #4338ca; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px;">Student Passion Essays Summary</p>
          <div style="margin-top: 10px;">
            <div style="margin-bottom: 10px;">
              <div class="label">1. Exciting Discovery</div>
              <div class="essay-box">"${submission.passionAnswers.q1 || 'N/A'}"</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">2. Lab Research Topic</div>
              <div class="essay-box">"${submission.passionAnswers.q2 || 'N/A'}"</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">3. Societal Problem</div>
              <div class="essay-box">"${submission.passionAnswers.q3 || 'N/A'}"</div>
            </div>
          </div>

          <p style="margin-top: 25px; font-size: 12px; color: #64748b;">To review their fully-compiled PDF or delete this entry, log in to your Counselor & Administrator Hub page using your credentials.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!user || !pass) {
    console.warn(`[SMTP Warning] SMTP_USER and SMTP_PASS are not configured. Actual email sending is inactive.`);
    console.log(`[SMTP Stub Log] Email transmission simulated successfully: Student to ${studentEmail}, Teacher Alert to ${adminRecipient}.`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    // Send student email
    console.log(`[SMTP] Sending advice report to student ${studentEmail}...`);
    await transporter.sendMail({
      from,
      to: studentEmail,
      subject: `🧪 Your Science Laboratory Technology Placement Report - ${studentName}`,
      html: studentHtml
    });
    console.log(`[SMTP] Successfully delivered student report email!`);

    // Send admin notification
    console.log(`[SMTP] Sending administrative alert to ${adminRecipient}...`);
    await transporter.sendMail({
      from,
      to: adminRecipient,
      subject: `🧪 PLACEMENT ALERT: New Student Assessment Submitted - ${studentName}`,
      html: adminHtml
    });
    console.log(`[SMTP] Successfully delivered teacher notification email to ${adminRecipient}!`);

  } catch (err) {
    console.error(`[SMTP Error] Failed to send diagnostic emails:`, err);
  }
}

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to JSON DB
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'submissions.json');

// Helper to load submissions
function loadSubmissions(): Submission[] {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      // Write initial mock submissions so Joanna has interactive data right away
      const initialMock: Submission[] = [
        {
          id: 'sub_1',
          student: {
            name: 'Chioma Adebayo',
            matricNo: 'SLT/2023/1024',
            email: 'chioma.adebayo@uni.edu.ng'
          },
          answers: {
            s1_q1: 5, s1_q2: 3, s1_q3: 4, s1_q4: 4, s1_q5: 4, s1_q6: 3, s1_q7: 2, s1_q8: 5, s1_q9: 4, s1_q10: 4, s1_q11: 4, s1_q12: 2, s1_q13: 3, s1_q14: 2, s1_q15: 5,
            s2_q1: 4, s2_q2: 4, s2_q3: 5, s2_q4: 3, s2_q5: 3, s2_q6: 4, s2_q7: 5, s2_q8: 4, s2_q9: 4, s2_q10: 3, s2_q11: 3, s2_q12: 5, s2_q13: 4, s2_q14: 3, s2_q15: 3,
            s3_q1: 5, s3_q2: 4, s3_q3: 3, s3_q4: 5, s3_q5: 4, s3_q6: 4, s3_q7: 4, s3_q8: 5, s3_q9: 3, s3_q10: 4, s3_q11: 4, s3_q12: 4, s3_q13: 2, s3_q14: 4, s3_q15: 5,
            s4_bt1: 5, s4_bt2: 5, s4_bt3: 5, s4_bt4: 5, s4_bt5: 4, s4_bc1: 4, s4_bc2: 4, s4_bc3: 3, s4_bc4: 4, s4_bc5: 4, s4_mb1: 4, s4_mb2: 4, s4_mb3: 4, s4_mb4: 4, s4_mb5: 4, s4_ch1: 3, s4_ch2: 3, s4_ch3: 3, s4_ch4: 3, s4_ch5: 4, s4_phy1: 2, s4_phy2: 2, s4_phy3: 2, s4_phy4: 3, s4_phy5: 4
          },
          passionAnswers: {
            q1: 'The discovery of CRISPR Cas9 genetic editing tools.',
            q2: 'Developing transgenic crops to survive sub-Saharan Sahel droughts.',
            q3: 'Food insecurity in dry climates within northern territories.',
            q4: 'Our Planet, genetic biology engineering documentaries.',
            q5: 'Advanced gene gun machinery and laboratory DNA sequencers.'
          },
          result: {
            topUnit: 'Biotechnology',
            secondUnit: 'Microbiology',
            scores: { Biotechnology: 45, Biochemistry: 36, Microbiology: 39, Chemistry: 28, Physics: 16 },
            maxPossibleWeights: { Biotechnology: 50, Biochemistry: 50, Microbiology: 50, Chemistry: 50, Physics: 50 },
            percentages: { Biotechnology: 91, Biochemistry: 72, Microbiology: 78, Chemistry: 56, Physics: 32 },
            strengths: ['High suitability for Biotechnology experimental paradigms.', 'A natural affinity towards recombinant genetics.', 'Excellent cross-disciplinary logical thinking.'],
            improvements: ['Patience required for extended bio-incubation timelines.', 'Familiarity with computational algorithms for bioinfo analysis.'],
            skills: ['Plasmid Extraction', 'PCR Splicing', 'BLAST Sequence Alignment'],
            matchLevel: 'Strong Match',
            aiSummary: 'Chioma possesses an impressive conceptual grasp of molecular biology and genetic engineering paradigms. Her deep interest in tackling Nigerian agricultural yield stresses through localized genomic adaptations makes her an flawless fit for the Biotechnology unit. She has strong analytical foresight and will thrive at NAPRI or IITA.'
          },
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          id: 'sub_2',
          student: {
            name: 'Abubakar Ibrahim',
            matricNo: 'SLT/2023/1182',
            email: 'abubakar.i@uni.edu.ng'
          },
          answers: {
            s1_q1: 2, s1_q2: 5, s1_q3: 3, s1_q4: 5, s1_q5: 3, s1_q6: 4, s1_q7: 5, s1_q8: 3, s1_q9: 3, s1_q10: 2, s1_q11: 3, s1_q12: 5, s1_q13: 4, s1_q14: 5, s1_q15: 2,
            s2_q1: 3, s2_q2: 5, s2_q3: 3, s2_q4: 5, s2_q5: 2, s2_q6: 5, s2_q7: 3, s2_q8: 2, s2_q9: 3, s2_q10: 5, s2_q11: 2, s2_q12: 3, s2_q13: 3, s2_q14: 5, s2_q15: 5,
            s3_q1: 3, s3_q2: 3, s3_q3: 5, s3_q4: 3, s3_q5: 3, s3_q6: 5, s3_q7: 4, s3_q8: 2, s3_q9: 5, s3_q10: 4, s3_q11: 2, s3_q12: 3, s3_q13: 5, s3_q14: 3, s3_q15: 3,
            s4_bt1: 2, s4_bt2: 3, s4_bt3: 3, s4_bt4: 2, s4_bt5: 3, s4_bc1: 3, s4_bc2: 3, s4_bc3: 3, s4_bc4: 3, s4_bc5: 3, s4_mb1: 2, s4_mb2: 2, s4_mb3: 2, s4_mb4: 3, s4_mb5: 3, s4_ch1: 4, s4_ch2: 4, s4_ch3: 4, s4_ch4: 4, s4_ch5: 3, s4_phy1: 5, s4_phy2: 5, s4_phy3: 5, s4_phy4: 5, s4_phy5: 1
          },
          passionAnswers: {
            q1: 'Thermodynamics, energy harvesting systems, and solar microcontrollers.',
            q2: 'Designing automated electronic calibrations for optical spectrometry and vacuum rigs.',
            q3: 'Deficit of robust electricity networks and power grid metrics in rural communities.',
            q4: 'How It Works, Mechanical Universe, and materials science series.',
            q5: 'Digital oscilloscopes, programmable micro-sensors, and solar controller logs.'
          },
          result: {
            topUnit: 'Physics',
            secondUnit: 'Chemistry',
            scores: { Biotechnology: 18, Biochemistry: 24, Microbiology: 15, Chemistry: 37, Physics: 47 },
            maxPossibleWeights: { Biotechnology: 50, Biochemistry: 50, Microbiology: 50, Chemistry: 50, Physics: 50 },
            percentages: { Biotechnology: 36, Biochemistry: 48, Microbiology: 30, Chemistry: 74, Physics: 94 },
            strengths: ['Exceptional hardware diagnostics and calibration capabilities.', 'A high comfort with numeric physics models.', 'Practical logic for resolving electronic circuit flow errors.'],
            improvements: ['Broaden biology comprehension slightly to integrate medical radiology frameworks.', 'Study the chemical physics of lithium and modern battery materials.'],
            skills: ['Oscilloscope Calibration', 'Analog Prototyping', 'Radiation Safety'],
            matchLevel: 'Strong Match',
            aiSummary: 'Abubakar exhibits rare, highly advanced physical scientific instincts. He excels at hardware diagnostics, digital calibrations, and sensor instrumentation. His passion for establishing rural off-grid energy grids in Nigeria is matches perfectly with the Physics unit. He will make an outstanding engineering technician or medical physicist.'
          },
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        },
        {
          id: 'sub_3',
          student: {
            name: 'Tariola Daniel',
            matricNo: 'SLT/2023/1517',
            email: 'tariola.d@uni.edu.ng'
          },
          answers: {
            s1_q1: 4, s1_q2: 2, s1_q3: 3, s1_q4: 2, s1_q5: 1, s1_q6: 3, s1_q7: 2, s1_q8: 3, s1_q9: 2, s1_q10: 5, s1_q11: 3, s1_q12: 2, s1_q13: 3, s1_q14: 2, s1_q15: 4,
            s2_q1: 5, s2_q2: 4, s2_q3: 3, s2_q4: 3, s2_q5: 2, s2_q6: 4, s2_q7: 4, s2_q8: 3, s2_q9: 5, s2_q10: 3, s2_q11: 3, s2_q12: 4, s2_q13: 2, s2_q14: 2, s2_q15: 4,
            s3_q1: 5, s3_q2: 3, s3_q3: 4, s3_q4: 5, s3_q5: 3, s3_q6: 3, s3_q7: 4, s3_q8: 3, s3_q9: 3, s3_q10: 3, s3_q11: 5, s3_q12: 3, s3_q13: 2, s3_q14: 3, s3_q15: 4,
            s4_bt1: 4, s4_bt2: 3, s4_bt3: 4, s4_bt4: 3, s4_bt5: 3, s4_bc1: 3, s4_bc2: 3, s4_bc3: 3, s4_bc4: 3, s4_bc5: 2, s4_mb1: 5, s4_mb2: 5, s4_mb3: 5, s4_mb4: 5, s4_mb5: 1, s4_ch1: 3, s4_ch2: 3, s4_ch3: 3, s4_ch4: 3, s4_ch5: 3, s4_phy1: 2, s4_phy2: 2, s4_phy3: 2, s4_phy4: 2, s4_phy5: 3
          },
          passionAnswers: {
            q1: 'Alexander Fleming discovering Penicillin.',
            q2: 'Isolating fungal strains from soil to extract antibiotic metabolites.',
            q3: 'Infectious cholera and typhus contamination in municipal drinking zones.',
            q4: 'Infectious disease documentaries and WHO microbiology logs.',
            q5: 'Laminar flow sterile cabinets and professional autoclave chambers.'
          },
          result: {
            topUnit: 'Microbiology',
            secondUnit: 'Biotechnology',
            scores: { Biotechnology: 32, Biochemistry: 28, Microbiology: 46, Chemistry: 26, Physics: 14 },
            maxPossibleWeights: { Biotechnology: 50, Biochemistry: 50, Microbiology: 50, Chemistry: 50, Physics: 50 },
            percentages: { Biotechnology: 64, Biochemistry: 56, Microbiology: 92, Chemistry: 52, Physics: 28 },
            strengths: ['Rigorous aseptic discipline and laboratory sanitation safety awareness.', 'High patience required during extensive culture incubation.', 'Deep investigative passion for disease diagnostic vectors.'],
            improvements: ['Familiarise with molecular genetics and plasmid vectors.', 'Familiarise with biochemical pathway maps related to pathogens.'],
            skills: ['Aseptic Plates Culture', 'Gram Stain Diagnostics', 'Antimicrobial Disk Susceptibility Testing'],
            matchLevel: 'Strong Match',
            aiSummary: 'Tariola is of the ideal investigative archetype for microbiology. She prioritises sterility, maintains intense attention to systemic detail, and possesses the immense patience required to culture slowly expanding organic matter. Her target to eradicate cholera in water systems lines up beautifully with the Microbiology section.'
          },
          timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
        }
      ];
      fs.writeFileSync(DB_FILE, JSON.stringify(initialMock, null, 2));
      return initialMock;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load submissions, falling back to empty', err);
    return [];
  }
}

// Helper to save submissions
function saveSubmissions(subs: Submission[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(subs, null, 2));
  } catch (err) {
    console.error('Failed to write submissions:', err);
  }
}

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Joanna' && password === 'Joanna!25') {
    return res.json({ success: true, token: 'session_token_admin_joanna_2026' });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// Submit results
app.post('/api/submit', async (req, res) => {
  try {
    const { student, answers, passionAnswers }: { student: StudentInfo; answers: Record<string, LikertValue>; passionAnswers: PassionAnswers } = req.body;

    if (!student || !student.name || !student.matricNo || !student.email) {
      return res.status(400).json({ error: 'Missing student demographics.' });
    }

    const result = calculateScores(answers);

    // Call Gemini to generate dynamic AI assessment Advice if API key is provided
    let aiSummary = '';
    if (ai) {
      try {
        const prompt = `You are an expert academic advisor and career coach specializing in Science Laboratory Technology (SLT) education and career structures specifically within Nigeria and globally.
Review this student SLT assessment results:
Student Name: ${student.name}
Matriculation ID: ${student.matricNo}
Email: ${student.email}

Assessment Scoring Compatibility:
- Biotechnology: ${result.percentages.Biotechnology}%
- Biochemistry: ${result.percentages.Biochemistry}%
- Microbiology: ${result.percentages.Microbiology}%
- Chemistry: ${result.percentages.Chemistry}%
- Physics: ${result.percentages.Physics}%

Top Recommended Unit: ${result.topUnit}
Second Best Alternative Unit: ${result.secondUnit}
Match Level Strength: ${result.matchLevel}

Student's written essay feedback for their Passion Reflection prompts:
1. Scientific discovery exciting them: "${passionAnswers.q1}"
2. Dream lab research topic: "${passionAnswers.q2}"
3. Societal problem they wish to solve: "${passionAnswers.q3}"
4. Documentaries they enjoy: "${passionAnswers.q4}"
5. Special tools they care to master: "${passionAnswers.q5}"

Write a detailed, personalized career report of about 200 words.
Address the student directly. Connect their scores to their specific answers. Explain *why* the recommended unit fits their temperament, interests, and laboratory work style. Mention specific Nigerian agencies or employers (e.g., NCDC, NAFDAC, IITA, NIH, NASENI, FMC) where relevant. Break it down into clean structural paragraphs. Use professional academic advice phrasing. Do not include introductory conversational filler or AI meta phrases like 'as an assistant'.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
        });

        if (response.text) {
          aiSummary = response.text;
        }
      } catch (gemError) {
        console.error('Gemini call failed, utilizing pre-coded academic fallback.', gemError);
      }
    }

    // Dynamic fallback summary as safe safeguard if AI key or quota is spent
    if (!aiSummary) {
      const p = result.percentages;
      aiSummary = `Dear ${student.name}, based on your excellent diagnostic profile, the assessment highlights a strong affinity for **${result.topUnit}** (${p[result.topUnit]}% compatibility).

Your written entries indicate a strong problem-solving orientation and interest in tackling local issues such as: "${passionAnswers.q3 || 'Nigerian infrastructure'}" and mastering "${passionAnswers.q5 || 'advanced diagnostics'}". 

This core temperament directly mirrors the workflow of **${result.topUnit}**, combining highly systematic measurements with industrial and research processes. Your second-best alternative unit is **${result.secondUnit}** (${p[result.secondUnit]}%), offering a valuable interdisciplinary buffer. We advise connecting with student groupings associated with the primary unit and seeking internship options in corresponding institutes across Nigeria (e.g., IITA Ibadan, NABDA, NCDC, NNPC laboratories, or major biomedical centers).`;
    }

    result.aiSummary = aiSummary;

    const newSubmission: Submission = {
      id: 'sub_' + Date.now(),
      student,
      answers,
      passionAnswers,
      result,
      timestamp: new Date().toISOString()
    };

    const currentSubs = loadSubmissions();
    currentSubs.unshift(newSubmission);
    saveSubmissions(currentSubs);

    // Dispatch customized email notices to student and Joanna without blocking main response
    sendAssessmentEmails(newSubmission).catch(err => {
      console.error('Async email dispatch failed:', err);
    });

    res.json({ success: true, submission: newSubmission });
  } catch (error: any) {
    console.error('Submission route error:', error);
    res.status(500).json({ error: 'Internal assessment error: ' + error.message });
  }
});

// Admin Route: retrieve all submissions (requires Authorization Header check)
app.get('/api/submissions', (req, res) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer session_token_admin_joanna_2026') {
    return res.status(403).json({ error: 'Unauthorized credentials.' });
  }
  const submissions = loadSubmissions();
  res.json({ submissions });
});

// Admin Route: delete a submission
app.delete('/api/submissions/:id', (req, res) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer session_token_admin_joanna_2026') {
    return res.status(403).json({ error: 'Unauthorized credentials.' });
  }
  const id = req.params.id;
  let submissions = loadSubmissions();
  submissions = submissions.filter(s => s.id !== id);
  saveSubmissions(submissions);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

async function run() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node Express Server active at http://0.0.0.0:${PORT}`);
  });
}

run();
