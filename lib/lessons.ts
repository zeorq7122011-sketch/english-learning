export interface LessonTopic {
  day: number
  week: number
  stage: 1 | 2 | 3 | 4
  title: string
  chineseTitle: string
  systemPrompt: string
}

// ─── QC / Factory English ────────────────────────────────────────────────────
const QC_ENGLISH: LessonTopic[] = [
  { day: 1, week: 1, stage: 1, title: "Subject + Be Verb", chineseTitle: "主詞 + be 動詞", systemPrompt: "Teach am/is/are/was/were in QC work context. The material is ready. The parts are not ready yet. This issue is important. Focus on work states and conditions." },
  { day: 2, week: 1, stage: 1, title: "Regular Verbs", chineseTitle: "一般動詞", systemPrompt: "Teach common QC verbs: check, inspect, confirm, provide, find, deliver, update. We check the parts. The supplier delivers the material. Focus on present tense work actions." },
  { day: 3, week: 1, stage: 1, title: "Negative Sentences", chineseTitle: "否定句", systemPrompt: "Teach don't/doesn't/isn't/aren't/has not in QC context. The material is not ready yet. We did not find any defects. The supplier has not provided the report yet." },
  { day: 4, week: 1, stage: 1, title: "Question Sentences", chineseTitle: "疑問句", systemPrompt: "Teach Do/Does/Is/Are/Has questions plus When can you / When did you difference. Has the customer replied? When can you confirm? When did you confirm? Is the material ready?" },
  { day: 5, week: 1, stage: 1, title: "Past Tense", chineseTitle: "過去式", systemPrompt: "Teach past tense for QC: checked/inspected, found/discovered, provided, confirmed, requested. We checked these parts yesterday. We found grease residue on the surface. The customer requested a report." },
  { day: 6, week: 1, stage: 1, title: "Future: will & plan to", chineseTitle: "未來式：will 和 plan to", systemPrompt: "Teach will + V and plan to + V with time expressions: by Friday, this afternoon, tomorrow, next week. We will provide the report tomorrow. The supplier plans to update the SOP this week." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review + Weak Points", chineseTitle: "第一週複習 + 弱點加強", systemPrompt: "Review Week 1 with focus on known weak points: request + person + to V, When can you vs When did you, corrective actions (plural). Include 10 mixed exercises." },
  { day: 8, week: 2, stage: 2, title: "Confirm & Follow Up", chineseTitle: "確認問題 / 追蹤問題", systemPrompt: "Teach: I need to confirm/check this issue. We will follow up on this case. Please help confirm the root cause. The supplier needs to confirm whether this is a process issue. whether = 是否." },
  { day: 9, week: 2, stage: 2, title: "Explain Reasons", chineseTitle: "說明原因", systemPrompt: "Teach: The issue happened because ___. We found defects due to ___. The material was rejected because it did not meet the specification. Use because / due to / as a result of in QC context." },
  { day: 10, week: 2, stage: 2, title: "Report Status", chineseTitle: "說明現狀與結果", systemPrompt: "Teach: We have already confirmed the issue. The material has been inspected. We found that the surface has grease residue. The status is ___. Currently, we are waiting for ___." },
  { day: 11, week: 2, stage: 2, title: "Request & Ask Politely", chineseTitle: "請求協助 / 有禮貌地要求", systemPrompt: "Teach: Could you please provide the report? We would like to request ___. Please help confirm ___. The customer requested us to provide the corrective action report. Focus on request + person + to V." },
  { day: 12, week: 2, stage: 2, title: "Deadlines & Schedules", chineseTitle: "期限與時程", systemPrompt: "Teach: Please provide the report by Friday. We expect to receive the corrective actions by next Monday. When can you confirm the shipment schedule? Focus on by + deadline." },
  { day: 13, week: 2, stage: 2, title: "QC Vocabulary Deep Dive", chineseTitle: "品質用語精確練習", systemPrompt: "Focus on QC terminology: corrective action vs corrective actions vs corrective action report. inspect vs check. grease residue. root cause. process issue. IQC. SOP. specification. defect rate." },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review all Week 2 patterns. Scenario: A supplier delivered parts with grease residue. Write emails to follow up, request corrective actions, set deadlines. Mix all patterns." },
  { day: 15, week: 3, stage: 3, title: "Read a QC Email", chineseTitle: "讀懂品質郵件", systemPrompt: "Provide a realistic QC supplier email (5-6 sentences). Teach student to identify sender's purpose, what action is needed, deadline, who is responsible. Break down each sentence." },
  { day: 16, week: 3, stage: 3, title: "Understand Cause & Effect", chineseTitle: "原因與結果", systemPrompt: "Teach because/therefore/as a result/due to/which caused in QC reports. The parts were rejected because the dimension did not meet spec, which caused a production delay." },
  { day: 17, week: 3, stage: 3, title: "Read a Full QC Report", chineseTitle: "閱讀完整品質報告", systemPrompt: "Provide a complete short QC inspection report. Teach to find: what was found, quantity affected, root cause, corrective action, deadline. Ask comprehension questions." },
  { day: 18, week: 3, stage: 3, title: "Passive Voice in QC", chineseTitle: "被動語態", systemPrompt: "Teach passive voice common in QC: The parts were inspected. The material was rejected. The SOP has been updated. Contrast with active voice. Explain when QC reports use passive." },
  { day: 19, week: 3, stage: 3, title: "Write a Complaint Email", chineseTitle: "寫投訴郵件", systemPrompt: "Teach writing a supplier complaint email: state the issue, quantity affected, request root cause analysis, request corrective actions, set deadline. Provide template and practice." },
  { day: 20, week: 3, stage: 3, title: "Write a Follow-up Email", chineseTitle: "寫追蹤郵件", systemPrompt: "Teach writing a follow-up email: We would like to follow up on our previous email. As of today, we have not received ___. Could you please provide ___ by ___?" },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Give a scenario: received defective parts, need to write 2 short emails (complaint + follow-up). Provide a QC report paragraph to read and answer questions. Mix reading and writing." },
  { day: 22, week: 4, stage: 4, title: "Describe Your Job", chineseTitle: "描述你的工作", systemPrompt: "Teach describing QC role: I am responsible for incoming quality control. My job is to inspect materials. I work with suppliers to resolve quality issues. Practice 5-6 sentences." },
  { day: 23, week: 4, stage: 4, title: "Explain a Problem Clearly", chineseTitle: "清楚說明問題", systemPrompt: "Teach explaining quality problems in sequence: We received the parts on ___. During IQC inspection, we found ___. The defect rate is ___. This issue affects ___. We need ___ by ___." },
  { day: 24, week: 4, stage: 4, title: "Meeting & Verbal Communication", chineseTitle: "會議與口語溝通", systemPrompt: "Teach short verbal responses: I understand. I will check and get back to you. Could you clarify ___? I agree with ___. I think we should ___. Practice common work conversation phrases." },
  { day: 25, week: 4, stage: 4, title: "Write a Complete QC Email", chineseTitle: "寫完整品質郵件", systemPrompt: "Teach a complete professional QC email: Subject line, greeting, opening sentence, issue description, requested action, deadline, closing. Student writes a full email from a scenario." },
  { day: 26, week: 4, stage: 4, title: "Numbers & Data in Reports", chineseTitle: "報告中的數字與數據", systemPrompt: "Teach expressing numbers/data: We inspected 500 pieces. The defect rate is 3.5%. 15 out of 200 parts were rejected. The dimension is 0.5mm over specification. Teach percentages, quantities, measurements." },
  { day: 27, week: 4, stage: 4, title: "Express Opinions Professionally", chineseTitle: "專業表達意見", systemPrompt: "Teach professional opinion expressions: Based on our inspection, we believe ___. We suggest that the supplier ___. In our opinion, the root cause is ___. We recommend ___." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive final review. Scenario: supplier sent defective material. Student must: identify the problem, write a complaint email, set a deadline, follow up. 10 varied exercises." },
]

// ─── Daily Conversation ──────────────────────────────────────────────────────
const DAILY_CONVERSATION: LessonTopic[] = [
  { day: 1, week: 1, stage: 1, title: "Greetings & Introductions", chineseTitle: "打招呼與自我介紹", systemPrompt: "Teach natural greetings and self-introductions for daily life. Hello/Hi/Hey, How are you/How's it going, Nice to meet you, My name is/I'm/I go by. Include casual and slightly formal contexts. Show how to respond naturally." },
  { day: 2, week: 1, stage: 1, title: "Talking About Your Day", chineseTitle: "描述日常生活", systemPrompt: "Teach how to describe daily routines and talk about your day. I usually/always/sometimes, I wake up at, I had a busy/good/rough day, What did you do today? Focus on simple present and past tense in daily life context." },
  { day: 3, week: 1, stage: 1, title: "At a Restaurant", chineseTitle: "在餐廳點餐", systemPrompt: "Teach restaurant English: ordering food, asking for recommendations, dietary restrictions, paying the bill. Can I get/I'd like/I'll have, What do you recommend?, Is this dish spicy?, Can we get the check? Include common phrases waiters say." },
  { day: 4, week: 1, stage: 1, title: "Shopping", chineseTitle: "購物對話", systemPrompt: "Teach shopping English: asking for help, sizes/colors, prices, trying things on, paying. Do you have this in a larger size?, How much is this?, I'm just browsing, Can I try this on?, I'll take it. Include phrases for complaining about defects." },
  { day: 5, week: 1, stage: 1, title: "Asking for Directions", chineseTitle: "問路與指路", systemPrompt: "Teach asking and giving directions: Excuse me, how do I get to ___?, Turn left/right, Go straight, It's on your left, It's about 5 minutes away. Include landmarks and transportation references." },
  { day: 6, week: 1, stage: 1, title: "Weather & Small Talk", chineseTitle: "天氣與日常閒聊", systemPrompt: "Teach weather expressions and small talk: What's the weather like today?, It's hot/cold/humid, Looks like rain, I love/hate this weather. Plus common small talk topics: weekends, hobbies, food. Teach how to keep a conversation going." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review", chineseTitle: "第一週複習", systemPrompt: "Review Week 1 daily conversation topics: greetings, daily routines, restaurant, shopping, directions, small talk. Create a realistic scenario combining these topics. 10 mixed exercises covering all situations." },
  { day: 8, week: 2, stage: 2, title: "Making Plans", chineseTitle: "約定計畫", systemPrompt: "Teach making plans and invitations: Are you free this weekend?, Would you like to ___, Let's meet at ___, I can't make it, How about ___instead?, Sounds great! Include accepting, declining politely, and rescheduling." },
  { day: 9, week: 2, stage: 2, title: "At the Doctor / Pharmacy", chineseTitle: "看醫生與藥局", systemPrompt: "Teach medical English: describing symptoms, I have a headache/fever/sore throat, How long have you had this?, Take this twice a day, Do you have this over the counter? Include pharmacy phrases and understanding prescriptions." },
  { day: 10, week: 2, stage: 2, title: "Phone & Text Conversations", chineseTitle: "電話與訊息對話", systemPrompt: "Teach phone etiquette: Hello, this is ___, May I speak with ___?, Hold on a second, Can I take a message?, I'll call you back. Also teach texting shorthand and how to start/end phone calls politely." },
  { day: 11, week: 2, stage: 2, title: "Expressing Opinions", chineseTitle: "表達個人意見", systemPrompt: "Teach expressing and discussing opinions: I think/believe/feel that ___, In my opinion, I agree/disagree because ___, That's a good point but ___, What do you think about ___? Include polite ways to disagree." },
  { day: 12, week: 2, stage: 2, title: "Hobbies & Interests", chineseTitle: "興趣與嗜好", systemPrompt: "Teach discussing hobbies: What do you do in your free time?, I'm into/passionate about ___, I've been doing ___ for years, You should try ___. Include how to ask about and share interests naturally in conversation." },
  { day: 13, week: 2, stage: 2, title: "Compliments & Encouragement", chineseTitle: "讚美與鼓勵", systemPrompt: "Teach giving and receiving compliments: That looks great on you!, You did an amazing job!, I love your ___. And encouragement: Keep it up!, Don't give up!, You're almost there! Include how to respond to compliments naturally." },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review Week 2: making plans, medical, phone calls, opinions, hobbies, compliments. Scenario: you run into a friend, make plans, talk about hobbies, give compliments. 10 mixed exercises." },
  { day: 15, week: 3, stage: 3, title: "Describing People & Places", chineseTitle: "描述人物與地點", systemPrompt: "Teach descriptive language: physical descriptions (tall, curly hair, wearing ___), personality (outgoing, kind, funny), and places (cozy, crowded, modern). Include relative clauses: the person who ___, the place that ___." },
  { day: 16, week: 3, stage: 3, title: "Telling Stories", chineseTitle: "說故事", systemPrompt: "Teach storytelling in English: So this one time ___, You won't believe what happened, First/Then/After that/Finally, Suddenly/All of a sudden. Include narrative past tense and how to make stories engaging." },
  { day: 17, week: 3, stage: 3, title: "Expressing Feelings", chineseTitle: "表達感受與情緒", systemPrompt: "Teach emotional expressions: I'm overwhelmed/frustrated/thrilled/anxious, I feel like ___, That really got to me, I was so relieved when ___. Include empathetic responses: I understand how you feel, That must be tough." },
  { day: 18, week: 3, stage: 3, title: "Making Suggestions", chineseTitle: "給建議", systemPrompt: "Teach making and responding to suggestions: Why don't you ___, Have you tried ___, You might want to ___, If I were you I'd ___, That's worth trying. Include how to give advice tactfully and respond to suggestions." },
  { day: 19, week: 3, stage: 3, title: "Apologizing & Resolving Conflicts", chineseTitle: "道歉與化解衝突", systemPrompt: "Teach apologizing: I'm sorry for ___, I apologize for ___, That was my fault, I didn't mean to ___. And conflict resolution: Let's sort this out, I understand your frustration, Can we find a middle ground?" },
  { day: 20, week: 3, stage: 3, title: "Talking About the Future", chineseTitle: "談論未來計畫", systemPrompt: "Teach future expressions: I'm planning to ___, I hope to ___, I'm thinking about ___, In the next few years I want to ___. Include discussing dreams, goals and upcoming events with will/going to/planning to differences." },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Review Week 3: describing, storytelling, feelings, suggestions, apologies, future plans. Scenario: tell a story about something that happened, express feelings, and talk about future plans. 10 mixed exercises." },
  { day: 22, week: 4, stage: 4, title: "Discussing News & Current Events", chineseTitle: "討論新聞與時事", systemPrompt: "Teach discussing news: Did you hear about ___?, What do you think of ___?, That's concerning/interesting/hard to believe, I read that ___. Include how to share opinions on current events without being offensive." },
  { day: 23, week: 4, stage: 4, title: "Humor & Jokes", chineseTitle: "幽默與笑話", systemPrompt: "Teach English humor: wordplay, puns, self-deprecating humor. That's hilarious!, I don't get it, That went over my head. Include common English expressions of amusement and how humor works differently across cultures." },
  { day: 24, week: 4, stage: 4, title: "Giving Advice", chineseTitle: "給建議與意見", systemPrompt: "Teach giving advice in different situations: You should/shouldn't ___, The best thing would be to ___, Have you considered ___?, In your shoes I would ___. Include asking for advice and responding to it naturally." },
  { day: 25, week: 4, stage: 4, title: "Sharing Experiences", chineseTitle: "分享個人經歷", systemPrompt: "Teach sharing experiences: Have you ever ___?, The most memorable experience I've had was ___, I'll never forget when ___, It was unlike anything I'd experienced before. Include asking follow-up questions to show interest." },
  { day: 26, week: 4, stage: 4, title: "Talking About Food & Culture", chineseTitle: "飲食文化對話", systemPrompt: "Teach food and culture conversations: What's your favorite cuisine?, Have you tried ___?, Back in my country we usually ___, Food is a big part of our culture. Include comparisons across cultures and food descriptions." },
  { day: 27, week: 4, stage: 4, title: "Natural Flowing Conversations", chineseTitle: "自然流暢的對話", systemPrompt: "Teach conversation flow skills: filler phrases (Well/Actually/You know), transition expressions (Speaking of which/By the way), showing interest (Really?/No way!/That's interesting). Include how to avoid awkward silences." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive review of all daily conversation topics. Scenario: meet someone new, have a full conversation covering introductions, daily life, opinions, stories, future plans. 10 varied exercises testing all skills." },
]

// ─── Business English ────────────────────────────────────────────────────────
const BUSINESS_ENGLISH: LessonTopic[] = [
  { day: 1, week: 1, stage: 1, title: "Professional Self-Introduction", chineseTitle: "專業自我介紹", systemPrompt: "Teach professional introductions in business settings: I'm responsible for ___, My role involves ___, I specialize in ___, Nice to connect with you. Include elevator pitch format and how to introduce yourself in meetings vs. networking events." },
  { day: 2, week: 1, stage: 1, title: "Business Email Basics", chineseTitle: "商業郵件基礎", systemPrompt: "Teach professional email structure: subject lines, Dear/Hi ___, I am writing to ___, Please find attached, I look forward to hearing from you, Best regards. Include the difference between formal and semi-formal business emails." },
  { day: 3, week: 1, stage: 1, title: "Scheduling & Meetings", chineseTitle: "安排會議", systemPrompt: "Teach scheduling in English: Would you be available on ___, Let's set up a meeting, I'd like to reschedule, Could we move our meeting to ___?, The meeting is confirmed for ___. Include calendar-related vocabulary and how to send meeting invites." },
  { day: 4, week: 1, stage: 1, title: "Making Professional Requests", chineseTitle: "專業請求與委派任務", systemPrompt: "Teach professional requests: Could you please ___, Would it be possible to ___, I was wondering if you could ___, I need this by ___. Include delegating tasks, setting expectations, and following up on requests politely." },
  { day: 5, week: 1, stage: 1, title: "Presenting Data & Numbers", chineseTitle: "報告數據與數字", systemPrompt: "Teach presenting data professionally: The figures show ___, Sales increased by 15%, As you can see from the chart ___, The data indicates that ___. Include how to describe trends (rose/fell/remained stable) and percentages." },
  { day: 6, week: 1, stage: 1, title: "Basic Negotiation Phrases", chineseTitle: "談判基礎用語", systemPrompt: "Teach negotiation basics: Our position is ___, We can offer ___, That's not within our budget, Can we find a middle ground?, If you can do ___ we can agree to ___. Include starting, progressing, and concluding negotiations." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review", chineseTitle: "第一週複習", systemPrompt: "Review Week 1 business topics: introductions, emails, scheduling, requests, data, negotiation. Scenario: new business partner contact. Write an intro email, schedule a meeting, and request information. 10 mixed exercises." },
  { day: 8, week: 2, stage: 2, title: "Conference Calls & Video Meetings", chineseTitle: "電話與視訊會議", systemPrompt: "Teach virtual meeting language: Can everyone hear me?, You're on mute, Let's get started, Going back to the agenda, I'll hand it over to ___, Any questions before we wrap up? Include how to manage technical issues professionally." },
  { day: 9, week: 2, stage: 2, title: "Writing Professional Reports", chineseTitle: "撰寫專業報告", systemPrompt: "Teach report writing: Executive summary, The purpose of this report is ___, Key findings include ___, Based on the analysis ___, We recommend ___. Include how to structure business reports and use formal academic-style language." },
  { day: 10, week: 2, stage: 2, title: "Problem-Solving Discussions", chineseTitle: "問題分析與討論", systemPrompt: "Teach problem-solving language: The main issue is ___, One possible solution is ___, The root cause appears to be ___, Let's brainstorm ___, What are the pros and cons of ___? Include facilitating group discussions." },
  { day: 11, week: 2, stage: 2, title: "Client Communication", chineseTitle: "客戶溝通", systemPrompt: "Teach client-facing language: Thank you for your continued partnership, We understand your concerns, We'll do our best to ___, I want to assure you that ___. Include managing client expectations and building rapport professionally." },
  { day: 12, week: 2, stage: 2, title: "Project Updates & Status Reports", chineseTitle: "專案進度更新", systemPrompt: "Teach project update language: We're on track to complete ___ by ___, There's been a slight delay due to ___, The next milestone is ___, We need your sign-off on ___. Include status report format and escalating issues professionally." },
  { day: 13, week: 2, stage: 2, title: "Giving & Receiving Feedback", chineseTitle: "給予與接收回饋", systemPrompt: "Teach professional feedback: This is well done, One area for improvement is ___, I appreciate the effort but ___, Have you considered ___? And receiving feedback: Thank you for the feedback, I'll work on that, Could you elaborate on ___?" },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review Week 2: virtual meetings, reports, problem-solving, client communication, project updates, feedback. Scenario: project behind schedule, communicate to client, problem-solve with team. 10 mixed exercises." },
  { day: 15, week: 3, stage: 3, title: "Presentations & Public Speaking", chineseTitle: "簡報與公開演講", systemPrompt: "Teach presentation structure: Today I'll be talking about ___, Let me start with ___, Moving on to ___, To summarize ___, I'll now take any questions. Include opening hooks, transitions, and closing strongly." },
  { day: 16, week: 3, stage: 3, title: "Contract & Legal Language", chineseTitle: "合約與法律用語", systemPrompt: "Teach basic contract language: Terms and conditions, Subject to ___, In accordance with ___, The parties agree to ___, This agreement shall remain in effect until ___. Include common business contract phrases and how to ask for clarification." },
  { day: 17, week: 3, stage: 3, title: "Handling Complaints Professionally", chineseTitle: "專業處理投訴", systemPrompt: "Teach complaint handling: I understand your frustration, I sincerely apologize for ___, We take this matter seriously, Here's what we'll do to resolve this ___, We'll make sure this doesn't happen again. Include de-escalation language." },
  { day: 18, week: 3, stage: 3, title: "Cross-Cultural Business Communication", chineseTitle: "跨文化商業溝通", systemPrompt: "Teach cross-cultural awareness in business: cultural communication styles (direct vs. indirect), hierarchy sensitivity, relationship-building vs task-focused cultures. Include how to adapt communication style for different audiences." },
  { day: 19, week: 3, stage: 3, title: "Leadership & Management Language", chineseTitle: "領導力與管理用語", systemPrompt: "Teach leadership language: I'm counting on the team to ___, Let's align on our priorities, I want to empower you to ___, The vision for this project is ___. Include motivating teams, giving direction, and decision-making language." },
  { day: 20, week: 3, stage: 3, title: "Strategic Planning Discussions", chineseTitle: "策略規劃對話", systemPrompt: "Teach strategic language: Our long-term goal is ___, We need to leverage ___, The key opportunity here is ___, The risk we face is ___, In order to scale we should ___. Include SWOT discussion language and strategic meeting vocabulary." },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Review Week 3: presentations, contracts, complaints, cross-cultural, leadership, strategy. Scenario: present a business proposal, handle a complaint, discuss strategy. 10 mixed exercises." },
  { day: 22, week: 4, stage: 4, title: "Persuasive Writing & Proposals", chineseTitle: "說服性寫作與提案", systemPrompt: "Teach persuasive business writing: The reason we recommend ___ is ___, The benefits far outweigh ___, Based on market data ___, We are confident that ___. Include how to structure a business proposal and write compelling calls to action." },
  { day: 23, week: 4, stage: 4, title: "Job Interviews & Career Language", chineseTitle: "面試與職涯英文", systemPrompt: "Teach interview language: Tell me about yourself, My greatest strength is ___, I've been responsible for ___, I'm particularly proud of ___, Where do you see yourself in 5 years?. Include STAR method answers and closing questions." },
  { day: 24, week: 4, stage: 4, title: "Networking & Professional Relationships", chineseTitle: "建立人脈", systemPrompt: "Teach networking language: What do you do?, We should connect on LinkedIn, I'd love to learn more about your work, Have you met ___?, Let me introduce you to ___. Include how to follow up after networking events professionally." },
  { day: 25, week: 4, stage: 4, title: "Advanced Negotiation", chineseTitle: "進階談判技巧", systemPrompt: "Teach advanced negotiation: Anchoring (Our initial offer is ___), Concession language (We could consider ___ if you can ___), Deadlock phrases (I think we've reached an impasse), Closing (I think we have a deal). Include win-win negotiation strategies." },
  { day: 26, week: 4, stage: 4, title: "Business Storytelling", chineseTitle: "商業故事敘述", systemPrompt: "Teach business storytelling: The challenge we faced was ___, What we did differently was ___, The result was impressive — ___, The lesson we learned ___. Include how to use stories in presentations, pitches and client meetings." },
  { day: 27, week: 4, stage: 4, title: "Expressing Opinions in Meetings", chineseTitle: "會議中表達意見", systemPrompt: "Teach confident opinion expression in meetings: I'd like to push back on that ___, I see it differently — ___, Building on what ___ said ___, To play devil's advocate ___, I think we should table this discussion. Include diplomatic disagreement." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive business English review. Scenario: job interview, then present a proposal to a client, handle a complaint, negotiate terms. 10 varied exercises covering all business communication skills learned." },
]

// ─── Travel English ──────────────────────────────────────────────────────────
const TRAVEL_ENGLISH: LessonTopic[] = [
  { day: 1, week: 1, stage: 1, title: "At the Airport", chineseTitle: "在機場", systemPrompt: "Teach airport English: check-in (I'd like to check in for my flight, window/aisle seat, carry-on), security (Please remove your shoes), departure gates, boarding announcements. Include asking for help when lost in an airport." },
  { day: 2, week: 1, stage: 1, title: "Immigration & Customs", chineseTitle: "入境與海關", systemPrompt: "Teach immigration and customs conversations: What's the purpose of your visit?, How long will you be staying?, Do you have anything to declare?, I'm here for tourism/business. Include filling out arrival cards and common customs questions." },
  { day: 3, week: 1, stage: 1, title: "Getting Around — Transportation", chineseTitle: "交通與移動", systemPrompt: "Teach transportation English: taxis (Take me to ___ please, How much will that be?), buses, trains, subway (Which line goes to ___?, A round trip ticket to ___), rideshare apps. Include understanding transport announcements." },
  { day: 4, week: 1, stage: 1, title: "Checking into a Hotel", chineseTitle: "飯店入住", systemPrompt: "Teach hotel English: I have a reservation under ___, What time is check-out?, Could I get a wake-up call?, The Wi-Fi password is ___?, Is breakfast included?. Include requesting amenities, reporting problems, and checking out." },
  { day: 5, week: 1, stage: 1, title: "Ordering Food & Drinks", chineseTitle: "點餐與飲料", systemPrompt: "Teach restaurant and café English: I'd like to order ___, What do you recommend?, I'm allergic to ___, Can I get this without ___?, The check please. Include menu vocabulary, food descriptions, and how to send food back politely." },
  { day: 6, week: 1, stage: 1, title: "Shopping & Bargaining", chineseTitle: "購物與殺價", systemPrompt: "Teach shopping and market English: How much is this?, Is this the best price?, Can you do better on the price?, I'll take two, Do you accept credit cards?. Include market/souvenir shopping, size conversions, and returning items." },
  { day: 7, week: 1, stage: 1, title: "Week 1 Review", chineseTitle: "第一週複習", systemPrompt: "Review Week 1 travel topics: airport, immigration, transportation, hotel, food, shopping. Scenario: first day arriving in a new country. 10 mixed exercises covering all arrival and settling-in situations." },
  { day: 8, week: 2, stage: 2, title: "Asking for Help", chineseTitle: "尋求幫助", systemPrompt: "Teach asking for help while traveling: Excuse me, could you help me?, I'm looking for ___, I think I'm lost, Could you point me in the right direction?, Is there a ___ nearby?. Include polite ways to approach strangers and understand responses." },
  { day: 9, week: 2, stage: 2, title: "Sightseeing & Attractions", chineseTitle: "觀光與景點", systemPrompt: "Teach sightseeing English: What are the must-see places here?, What time does ___ open?, How much is the entrance fee?, Can I take photos here?, Do you offer guided tours?. Include museum, landmark, and tour vocabulary." },
  { day: 10, week: 2, stage: 2, title: "Entertainment & Activities", chineseTitle: "娛樂與活動", systemPrompt: "Teach activity booking English: I'd like to book a ___ tour, What activities do you recommend?, Is there a minimum age requirement?, What should I wear/bring?. Include theme parks, water sports, hiking, cooking classes vocabulary." },
  { day: 11, week: 2, stage: 2, title: "Handling Emergencies", chineseTitle: "緊急情況應對", systemPrompt: "Teach emergency English: I need help!, Call an ambulance/the police, I've lost my passport/wallet, I don't feel well, Where is the nearest hospital/embassy?. Include reporting theft, medical emergencies, and contacting your embassy." },
  { day: 12, week: 2, stage: 2, title: "Making Reservations", chineseTitle: "預訂與預約", systemPrompt: "Teach reservation English: I'd like to book a table for ___ at 7pm, Do you have availability on ___, I'd like to reserve ___, Can I modify my booking?. Include restaurant reservations, tours, and accommodation booking phrases." },
  { day: 13, week: 2, stage: 2, title: "Cultural Etiquette", chineseTitle: "文化禮儀與習慣", systemPrompt: "Teach cultural awareness while traveling: polite phrases (Please/Thank you/Excuse me in local context), tipping culture, dress codes at religious sites, photography etiquette, table manners. Include how to politely ask about local customs." },
  { day: 14, week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習", systemPrompt: "Review Week 2: asking for help, sightseeing, activities, emergencies, reservations, cultural etiquette. Scenario: full day of sightseeing, booking a tour, and handling a lost item. 10 mixed exercises." },
  { day: 15, week: 3, stage: 3, title: "Making Friends with Locals", chineseTitle: "與當地人交友", systemPrompt: "Teach connecting with locals: Where are you from?, What do you do?, Do you have any local recommendations?, I love your city!, What's it like living here?. Include cultural exchange conversation and showing genuine interest in local life." },
  { day: 16, week: 3, stage: 3, title: "Healthcare Abroad", chineseTitle: "海外就醫與藥局", systemPrompt: "Teach medical English for travel: I need to see a doctor, I have a fever/rash/pain in my ___, I'm taking medication for ___, Do you take travel insurance?, I need a receipt for insurance purposes. Include pharmacy vocabulary and understanding prescriptions." },
  { day: 17, week: 3, stage: 3, title: "Dealing with Travel Problems", chineseTitle: "處理旅遊問題", systemPrompt: "Teach complaint and problem-solving: My flight has been cancelled, My luggage hasn't arrived, There's a problem with my room, This isn't what I ordered. Include compensation requests, filing complaints, and staying calm under stress." },
  { day: 18, week: 3, stage: 3, title: "Extended Stay & Daily Life", chineseTitle: "長住與日常生活", systemPrompt: "Teach longer-stay English: renting an apartment (utilities, lease), opening a bank account, grocery shopping vocabulary, laundromat. Include conversations for people living abroad short-term and navigating day-to-day tasks." },
  { day: 19, week: 3, stage: 3, title: "Nature & Adventure Travel", chineseTitle: "自然與冒險旅遊", systemPrompt: "Teach outdoor and adventure English: hiking trail vocabulary, What's the difficulty level?, Is this safe for beginners?, wildlife descriptions, I'd like to go scuba diving/zip-lining/trekking. Include safety instructions and nature descriptions." },
  { day: 20, week: 3, stage: 3, title: "Food Culture & Exploration", chineseTitle: "飲食文化探索", systemPrompt: "Teach food culture conversation: What is this dish made of?, How is this traditionally prepared?, This is delicious!, I've never tried this before, What's the etiquette for eating this?. Include exploring local markets and street food." },
  { day: 21, week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習", systemPrompt: "Review Week 3: local interactions, healthcare, travel problems, daily life, adventure, food culture. Scenario: extended stay trip, solve a flight cancellation, connect with locals, explore food. 10 mixed exercises." },
  { day: 22, week: 4, stage: 4, title: "Writing About Your Travels", chineseTitle: "寫旅遊日記與評論", systemPrompt: "Teach writing travel reviews and postcards: The hotel exceeded my expectations, A hidden gem in ___, Must-visit for anyone who loves ___, The service was outstanding/disappointing. Include TripAdvisor-style review language and postcard writing." },
  { day: 23, week: 4, stage: 4, title: "Describing Your Travel Experiences", chineseTitle: "描述旅遊經歷", systemPrompt: "Teach vivid travel storytelling: The moment I arrived, I knew ___, It was breathtaking/overwhelming/unlike anything I'd seen, The highlight of the trip was ___. Include past perfect tense and descriptive adjectives for travel narratives." },
  { day: 24, week: 4, stage: 4, title: "Travel Planning Conversations", chineseTitle: "旅遊規劃對話", systemPrompt: "Teach travel planning English: We're thinking of going to ___, What's the best time to visit?, How should we get around?, We're on a budget of ___, What would you prioritize?. Include comparing destinations and practical planning advice." },
  { day: 25, week: 4, stage: 4, title: "Cultural Immersion Language", chineseTitle: "文化融入", systemPrompt: "Teach deeper cultural engagement: I'd love to learn a few words in your language, What does this tradition mean to you?, How do locals usually celebrate ___?, I want to experience the real ___, not just the tourist spots. Include respectful cultural curiosity." },
  { day: 26, week: 4, stage: 4, title: "Connecting with Fellow Travelers", chineseTitle: "與其他旅客交流", systemPrompt: "Teach hostel/traveler community English: How long have you been traveling?, Where have you been so far?, Any must-sees I shouldn't miss?, Want to grab dinner together?. Include backpacker culture vocabulary and sharing travel tips." },
  { day: 27, week: 4, stage: 4, title: "Advanced Travel Conversations", chineseTitle: "進階旅遊對話", systemPrompt: "Teach fluent traveler conversations: navigating complex situations (missed connections, travel insurance claims), debating travel styles, giving and receiving nuanced recommendations. Include idioms travelers use: off the beaten path, travel bug, bucket list." },
  { day: 28, week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習", systemPrompt: "Comprehensive travel English review. Scenario: full trip — airport arrival, hotel check-in, sightseeing, emergency situation, making local friends, writing a travel review. 10 varied exercises covering all travel communication skills." },
]

// ─── Custom Course Generator ─────────────────────────────────────────────────

const CUSTOM_TEMPLATE: { title: string; chineseTitle: string; week: number; stage: 1 | 2 | 3 | 4 }[] = [
  { week: 1, stage: 1, title: "Key Vocabulary & Core Expressions", chineseTitle: "關鍵詞彙與核心表達" },
  { week: 1, stage: 1, title: "Basic Sentence Patterns", chineseTitle: "基礎句型" },
  { week: 1, stage: 1, title: "Asking Questions", chineseTitle: "提問技巧" },
  { week: 1, stage: 1, title: "Negative & Conditional Forms", chineseTitle: "否定句與條件句" },
  { week: 1, stage: 1, title: "Talking About Past Experiences", chineseTitle: "描述過去經歷" },
  { week: 1, stage: 1, title: "Future Plans & Intentions", chineseTitle: "未來計畫與意圖" },
  { week: 1, stage: 1, title: "Week 1 Review", chineseTitle: "第一週複習" },
  { week: 2, stage: 2, title: "Describing Situations in Detail", chineseTitle: "詳細描述情況" },
  { week: 2, stage: 2, title: "Explaining Causes & Reasons", chineseTitle: "說明原因" },
  { week: 2, stage: 2, title: "Making Requests Politely", chineseTitle: "有禮貌地提出請求" },
  { week: 2, stage: 2, title: "Reporting Status & Updates", chineseTitle: "說明現狀與更新" },
  { week: 2, stage: 2, title: "Setting Expectations & Timelines", chineseTitle: "設定期待與時程" },
  { week: 2, stage: 2, title: "Key Phrases & Useful Idioms", chineseTitle: "實用片語與慣用語" },
  { week: 2, stage: 2, title: "Week 2 Review", chineseTitle: "第二週複習" },
  { week: 3, stage: 3, title: "Understanding Written Context", chineseTitle: "理解書面語境" },
  { week: 3, stage: 3, title: "Cause & Effect Language", chineseTitle: "因果關係表達" },
  { week: 3, stage: 3, title: "Reading Longer Texts", chineseTitle: "閱讀較長文章" },
  { week: 3, stage: 3, title: "Formal vs Informal Register", chineseTitle: "正式與非正式語氣" },
  { week: 3, stage: 3, title: "Writing Practice", chineseTitle: "寫作練習" },
  { week: 3, stage: 3, title: "Follow-up & Clarification", chineseTitle: "追問與釐清" },
  { week: 3, stage: 3, title: "Week 3 Review", chineseTitle: "第三週複習" },
  { week: 4, stage: 4, title: "Expressing Opinions Naturally", chineseTitle: "自然表達意見" },
  { week: 4, stage: 4, title: "Complex Descriptions", chineseTitle: "複雜描述" },
  { week: 4, stage: 4, title: "Natural Conversation Flow", chineseTitle: "自然對話流程" },
  { week: 4, stage: 4, title: "Written Communication Skills", chineseTitle: "書面溝通技巧" },
  { week: 4, stage: 4, title: "Numbers, Data & Details", chineseTitle: "數字、數據與細節" },
  { week: 4, stage: 4, title: "Professional Expression", chineseTitle: "專業表達方式" },
  { week: 4, stage: 4, title: "Month 1 Final Review", chineseTitle: "第一個月總複習" },
]

export function getCustomLessons(goal: string): LessonTopic[] {
  return CUSTOM_TEMPLATE.map((t, i) => ({
    day: i + 1,
    week: t.week,
    stage: t.stage,
    title: t.title,
    chineseTitle: t.chineseTitle,
    systemPrompt: `You are an English tutor. The student's learning goal is: "${goal}". Today's lesson topic is: "${t.title}". All vocabulary, examples, patterns, and exercises must be directly relevant to achieving this goal. Teach practical language the student can use immediately in their specific context. Provide 2-3 sentence patterns, examples, and 5 exercises.`,
  }))
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export const LESSONS_BY_COURSE: Record<string, LessonTopic[]> = {
  "qc-english": QC_ENGLISH,
  "daily": DAILY_CONVERSATION,
  "business": BUSINESS_ENGLISH,
  "travel": TRAVEL_ENGLISH,
}

export function getLessonsForCourse(courseType: string, customGoal?: string): LessonTopic[] {
  if (courseType === "custom" && customGoal) return getCustomLessons(customGoal)
  return LESSONS_BY_COURSE[courseType] ?? QC_ENGLISH
}

export function getLessonByDay(day: number, courseType = "qc-english", customGoal?: string): LessonTopic | undefined {
  return getLessonsForCourse(courseType, customGoal).find((l) => l.day === day)
}

export function getStageLabel(stage: number): string {
  const labels: Record<number, string> = {
    1: "Stage 1: Foundation",
    2: "Stage 2: Core Patterns",
    3: "Stage 3: Reading & Writing",
    4: "Stage 4: Fluency",
  }
  return labels[stage] || ""
}

// Backward-compatible alias for existing code that imports LESSON_TOPICS
export const LESSON_TOPICS = QC_ENGLISH
