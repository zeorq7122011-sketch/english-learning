export interface LessonTopic {
  day: number
  week: number
  stage: 1 | 2 | 3 | 4
  title: string
  chineseTitle: string
  systemPrompt: string
}

export const LESSON_TOPICS: LessonTopic[] = [
  // Week 1 - Stage 1: Foundation
  { day: 1, week: 1, stage: 1, title: "Subject + Verb", chineseTitle: "主詞 + 動詞", systemPrompt: "Teach the basic S+V structure. Examples: I work. He studies. We check." },
  { day: 2, week: 1, stage: 1, title: "Be Verbs", chineseTitle: "be 動詞", systemPrompt: "Teach am/is/are/was/were. Examples: I am tired. This is important. The parts are ready." },
  { day: 3, week: 1, stage: 1, title: "Regular Verbs", chineseTitle: "一般動詞", systemPrompt: "Teach common verbs for QC work. Examples: I need help. We check the parts. They deliver the goods." },
  { day: 4, week: 1, stage: 1, title: "Negative Sentences", chineseTitle: "否定句", systemPrompt: "Teach don't/doesn't/isn't/aren't. Examples: I don't know. It is not ready. We don't have the report." },
  { day: 5, week: 1, stage: 1, title: "Question Sentences", chineseTitle: "疑問句", systemPrompt: "Teach Do/Does/Is/Are questions. Examples: Do you understand? Is it OK? Are the parts ready?" },
  { day: 6, week: 1, stage: 1, title: "Present & Past Tense", chineseTitle: "現在式 & 過去式", systemPrompt: "Teach present vs past tense in work context. Examples: We check / We checked. We find / We found." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review", chineseTitle: "第一週複習", systemPrompt: "Review all Week 1 topics with work-related examples. Mix all structures learned." },

  // Week 2 - Stage 2: Work Sentence Patterns
  { day: 8, week: 2, stage: 2, title: "Confirm & Follow Up", chineseTitle: "確認問題 / 追蹤問題", systemPrompt: "Teach: I need to confirm/check. We will follow up on. Please help confirm. The supplier needs to confirm whether." },
  { day: 9, week: 2, stage: 2, title: "Express Needs & Reasons", chineseTitle: "表達需求 / 說明原因", systemPrompt: "Teach: I need to ___ because. The issue happened because. We require ___ in order to." },
  { day: 10, week: 2, stage: 2, title: "Report Issues & Status", chineseTitle: "報告問題 / 說明現狀", systemPrompt: "Teach: We found that. The material is/was. The status is. We have already." },
  { day: 11, week: 2, stage: 2, title: "Request Help & Suggest", chineseTitle: "請求協助 / 提出建議", systemPrompt: "Teach: Could you please. We suggest that. It would be helpful if. We recommend." },
  { day: 12, week: 2, stage: 2, title: "Deadlines & Planning", chineseTitle: "時間規劃 / 截止日期", systemPrompt: "Teach: We plan to ___ by. Please provide ___ before. The deadline is. We expect to receive." },
  { day: 13, week: 2, stage: 2, title: "Supplier Communication", chineseTitle: "供應商溝通", systemPrompt: "Teach full supplier communication: reporting defects, requesting corrective action, follow-up on delivery." },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review all Week 2 patterns with realistic QC/supplier email scenarios." },

  // Week 3 - Stage 3: Reading Comprehension
  { day: 15, week: 3, stage: 3, title: "Find Subject & Verb", chineseTitle: "找主詞和動詞", systemPrompt: "Teach sentence parsing: identify subject, verb, object in work-related sentences." },
  { day: 16, week: 3, stage: 3, title: "Find Time & Location", chineseTitle: "找時間和地點", systemPrompt: "Teach identifying time expressions and locations in sentences. at IQC, by Friday, on Monday." },
  { day: 17, week: 3, stage: 3, title: "Understand Cause & Effect", chineseTitle: "理解原因和結果", systemPrompt: "Teach because/therefore/as a result/due to. Identify cause-effect relationships in QC reports." },
  { day: 18, week: 3, stage: 3, title: "Read a Full Paragraph", chineseTitle: "閱讀完整段落", systemPrompt: "Teach reading a complete QC report paragraph. Break it down: who, what, when, where, why." },
  { day: 19, week: 3, stage: 3, title: "Email Reading", chineseTitle: "讀懂英文郵件", systemPrompt: "Teach reading supplier/customer emails. Identify: purpose, action required, deadline." },
  { day: 20, week: 3, stage: 3, title: "QC Report Reading", chineseTitle: "讀懂品質報告", systemPrompt: "Teach reading quality inspection reports. Common terms: defect rate, root cause, corrective action." },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Review reading skills with mixed paragraphs from emails and QC reports." },

  // Week 4 - Stage 4: Writing & Speaking
  { day: 22, week: 4, stage: 4, title: "Self Introduction", chineseTitle: "自我介紹", systemPrompt: "Teach work self-introduction: name, role, responsibilities in quality control." },
  { day: 23, week: 4, stage: 4, title: "Describe Your Work", chineseTitle: "說明工作內容", systemPrompt: "Teach describing daily QC tasks: I am responsible for. My job is to. I work with." },
  { day: 24, week: 4, stage: 4, title: "Reply to Questions", chineseTitle: "回答問題", systemPrompt: "Teach natural responses to work questions. Yes/No + explanation. I think / In my opinion." },
  { day: 25, week: 4, stage: 4, title: "Write a Short Email", chineseTitle: "寫簡短郵件", systemPrompt: "Teach writing a complete short email: greeting, purpose, action needed, closing." },
  { day: 26, week: 4, stage: 4, title: "Write a QC Report", chineseTitle: "寫品質報告", systemPrompt: "Teach writing a simple quality issue report: issue found, quantity affected, root cause, action taken." },
  { day: 27, week: 4, stage: 4, title: "Express Opinions", chineseTitle: "表達意見", systemPrompt: "Teach expressing opinions professionally: I believe, I suggest, It seems that, The data shows." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive review of all 4 stages. Mixed exercises covering foundation to writing." },
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
