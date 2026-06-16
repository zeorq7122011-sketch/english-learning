export interface LessonTopic {
  day: number
  week: number
  stage: 1 | 2 | 3 | 4
  title: string
  chineseTitle: string
  systemPrompt: string
}

export const LESSON_TOPICS: LessonTopic[] = [
  // Week 1 - Stage 1: Foundation (已完成，可複習)
  { day: 1, week: 1, stage: 1, title: "Subject + Be Verb", chineseTitle: "主詞 + be 動詞", systemPrompt: "Teach am/is/are/was/were in QC work context. The material is ready. The parts are not ready yet. This issue is important. Focus on work states and conditions." },
  { day: 2, week: 1, stage: 1, title: "Regular Verbs", chineseTitle: "一般動詞", systemPrompt: "Teach common QC verbs: check, inspect, confirm, provide, find, deliver, update. We check the parts. The supplier delivers the material. Focus on present tense work actions." },
  { day: 3, week: 1, stage: 1, title: "Negative Sentences", chineseTitle: "否定句", systemPrompt: "Teach don't/doesn't/isn't/aren't/has not in QC context. The material is not ready yet. We did not find any defects. The supplier has not provided the report yet." },
  { day: 4, week: 1, stage: 1, title: "Question Sentences", chineseTitle: "疑問句", systemPrompt: "Teach Do/Does/Is/Are/Has questions plus When can you / When did you difference. Has the customer replied? When can you confirm? When did you confirm? Is the material ready?" },
  { day: 5, week: 1, stage: 1, title: "Past Tense", chineseTitle: "過去式", systemPrompt: "Teach past tense for QC: checked/inspected, found/discovered, provided, confirmed, requested. We checked these parts yesterday. We found grease residue on the surface. The customer requested a report." },
  { day: 6, week: 1, stage: 1, title: "Future: will & plan to", chineseTitle: "未來式：will 和 plan to", systemPrompt: "Teach will + V and plan to + V with time expressions: by Friday, this afternoon, tomorrow, next week. We will provide the report tomorrow. The supplier plans to update the SOP this week. We will confirm by Friday." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review + Weak Points", chineseTitle: "第一週複習 + 弱點加強", systemPrompt: "Review Week 1 with focus on known weak points: (1) request + person + to V: The customer requested us to provide the report. (2) When can you vs When did you. (3) corrective actions (plural) vs corrective action report. Include 10 mixed exercises." },

  // Week 2 - Stage 2: Work Sentence Patterns
  { day: 8, week: 2, stage: 2, title: "Confirm & Follow Up", chineseTitle: "確認問題 / 追蹤問題", systemPrompt: "Teach: I need to confirm/check this issue. We will follow up on this case (NOT: follow up this). Please help confirm the root cause. The supplier needs to confirm whether this is a process issue. whether = 是否. Use QC/supplier context." },
  { day: 9, week: 2, stage: 2, title: "Explain Reasons", chineseTitle: "說明原因", systemPrompt: "Teach: The issue happened because ___ . We found defects due to ___. The material was rejected because it did not meet the specification. Use because / due to / as a result of in QC context." },
  { day: 10, week: 2, stage: 2, title: "Report Status", chineseTitle: "說明現狀與結果", systemPrompt: "Teach: We have already confirmed the issue. The material has been inspected. We found that the surface has grease residue. The status is ___. Currently, we are waiting for ___. Use present perfect and status reporting in QC emails." },
  { day: 11, week: 2, stage: 2, title: "Request & Ask Politely", chineseTitle: "請求協助 / 有禮貌地要求", systemPrompt: "Teach: Could you please provide the report? We would like to request ___. Please help confirm ___. The customer requested us to provide the corrective action report. Focus on request + person + to V pattern which is a known weak point." },
  { day: 12, week: 2, stage: 2, title: "Deadlines & Schedules", chineseTitle: "期限與時程", systemPrompt: "Teach: Please provide the report by Friday. We expect to receive the corrective actions by next Monday. When can you confirm the shipment schedule? The deadline is ___. We plan to complete this by ___. Focus on by + deadline and when can you questions." },
  { day: 13, week: 2, stage: 2, title: "QC Vocabulary Deep Dive", chineseTitle: "品質用語精確練習", systemPrompt: "Focus on precise QC terminology the student has encountered: corrective action vs corrective actions vs corrective action report. inspect vs check. grease residue. root cause. process issue. IQC. SOP. specification. defect rate. Use each in context." },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review all Week 2 patterns with a realistic scenario: A supplier delivered parts with grease residue. Write emails to follow up, request corrective actions, set deadlines. Mix all patterns learned in Week 2." },

  // Week 3 - Stage 3: Reading & Email Writing
  { day: 15, week: 3, stage: 3, title: "Read a QC Email", chineseTitle: "讀懂品質郵件", systemPrompt: "Provide a realistic QC supplier email (5-6 sentences). Teach student to identify: sender's purpose, what action is needed, what the deadline is, who is responsible. Break down each sentence." },
  { day: 16, week: 3, stage: 3, title: "Understand Cause & Effect", chineseTitle: "原因與結果", systemPrompt: "Teach because/therefore/as a result/due to/which caused in QC reports. The parts were rejected because the dimension did not meet spec, which caused a production delay. Identify cause-effect in 4-5 example paragraphs." },
  { day: 17, week: 3, stage: 3, title: "Read a Full QC Report", chineseTitle: "閱讀完整品質報告", systemPrompt: "Provide a complete short QC inspection report. Teach to find: what was found, quantity affected, root cause, corrective action, deadline. Ask comprehension questions after each section." },
  { day: 18, week: 3, stage: 3, title: "Passive Voice in QC", chineseTitle: "被動語態（品質報告常用）", systemPrompt: "Teach passive voice common in QC: The parts were inspected. The material was rejected. The SOP has been updated. The report has been submitted. Contrast with active: We inspected / We rejected. Explain when QC reports use passive." },
  { day: 19, week: 3, stage: 3, title: "Write a Complaint Email", chineseTitle: "寫投訴郵件", systemPrompt: "Teach writing a supplier complaint email step by step: (1) State the issue found, (2) Quantity affected, (3) Request root cause analysis, (4) Request corrective actions, (5) Set deadline. Provide template and practice." },
  { day: 20, week: 3, stage: 3, title: "Write a Follow-up Email", chineseTitle: "寫追蹤郵件", systemPrompt: "Teach writing a follow-up email when supplier hasn't replied: We would like to follow up on our previous email. As of today, we have not received ___. Could you please provide ___ by ___? We look forward to your reply." },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Give student a scenario: received defective parts, need to write 2 short emails (complaint + follow-up). Then provide a QC report paragraph to read and answer questions about. Mix reading and writing." },

  // Week 4 - Stage 4: Natural Communication
  { day: 22, week: 4, stage: 4, title: "Describe Your Job", chineseTitle: "描述你的工作", systemPrompt: "Teach describing QC role naturally: I am responsible for incoming quality control. My job is to inspect materials before they enter production. I work with suppliers to resolve quality issues. I report to ___. Practice 5-6 sentences about their actual role." },
  { day: 23, week: 4, stage: 4, title: "Explain a Problem Clearly", chineseTitle: "清楚說明問題", systemPrompt: "Teach explaining quality problems clearly in sequence: We received the parts on ___. During IQC inspection, we found ___. The defect rate is ___. This issue affects ___. We need ___ by ___. Practice with a realistic QC issue." },
  { day: 24, week: 4, stage: 4, title: "Meeting & Verbal Communication", chineseTitle: "會議與口語溝通", systemPrompt: "Teach short verbal responses for work meetings: I understand. I will check and get back to you. Could you clarify ___? I agree with ___. I think we should ___. The issue is ___. Practice common work conversation phrases in QC context." },
  { day: 25, week: 4, stage: 4, title: "Write a Complete QC Email", chineseTitle: "寫完整品質郵件", systemPrompt: "Teach a complete professional QC email: Subject line, greeting (Dear ___,), opening sentence, issue description, requested action, deadline, closing (Best regards / Please let us know if you have any questions). Student writes a full email from a scenario." },
  { day: 26, week: 4, stage: 4, title: "Numbers & Data in Reports", chineseTitle: "報告中的數字與數據", systemPrompt: "Teach expressing numbers/data in QC context: We inspected 500 pieces. The defect rate is 3.5%. 15 out of 200 parts were rejected. The dimension is 0.5mm over the specification. Teach how to say percentages, quantities, measurements naturally." },
  { day: 27, week: 4, stage: 4, title: "Express Opinions Professionally", chineseTitle: "專業表達意見", systemPrompt: "Teach professional opinion expressions: Based on our inspection, we believe ___. We suggest that the supplier ___. In our opinion, the root cause is ___. We recommend ___. The data indicates ___. Practice expressing QC findings and recommendations." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive final review. Give a full scenario: supplier sent defective material, student must: (1) identify the problem, (2) write a complaint email, (3) set a deadline, (4) follow up. Mix all 4 weeks of learning. 10 varied exercises." },
]

export function getLessonByDay(day: number): LessonTopic | undefined {
  return LESSON_TOPICS.find((l) => l.day === day)
}

export function getStageLabel(stage: number): string {
  const labels: Record<number, string> = {
    1: "Stage 1: Foundation",
    2: "Stage 2: Work Patterns",
    3: "Stage 3: Reading",
    4: "Stage 4: Writing & Speaking",
  }
  return labels[stage] || ""
}
