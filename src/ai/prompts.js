export function buildOnboardingPrompt({ mode, answers }) {
  // mode: 'cv' | 'coverLetter'
  return [
    {
      role: 'system',
      content:
        'You are a helpful career assistant. You MUST output valid JSON only. No markdown, no extra text. Never use placeholder values like "string", "number", "N/A", "TBD", "...", or empty filler text.',
    },
    {
      role: 'user',
      content: `
Create structured content for a ${mode === 'cv' ? 'CV' : 'cover letter'}.
Use the user's answers. Output JSON only.

User answers (JSON):
${JSON.stringify(answers, null, 2)}

Output JSON schema:
{
  "summary": "string",
  "workHighlights": ["string", "string", "string"],
  "skillsKeywords": ["string","string"],
  "coverLetterDraft": "string"
}

Rules:
- WorkHighlights should be achievement-focused, use numbers if possible.
- SkillsKeywords: keep them concise.
- If mode is "cv", coverLetterDraft can be "".
- If mode is "coverLetter", coverLetterDraft must be 150-250 words.
- Replace every schema placeholder with real content based on the user answers.
- Never output the literal words "string" or "number" as field values.
`,
    },
  ]
}

export function buildReviewPrompt({ resumeJson, targetRole }) {
  return [
    {
      role: 'system',
      content:
        'You are a strict CV reviewer. Output valid JSON only. No markdown, no extra text. Never use placeholder values like "string", "number", "N/A", "TBD", or "...".',
    },
    {
      role: 'user',
      content: `
Review this resume JSON and suggest improvements.
Target role: ${targetRole || 'unknown'}.

Resume JSON:
${JSON.stringify(resumeJson, null, 2)}

Output JSON schema:
{
  "score": number,
  "issues": [{"title":"string","severity":"low|medium|high","detail":"string"}],
  "suggestions": [
    {
      "id":"string",
      "label":"string",
      "field":"summary|workHighlights|skillsKeywords|coverLetterDraft",
      "before":"string",
      "after":"string"
    }
  ]
}

Rules:
- score 0-100.
- suggestions must be concrete text replacements.
- keep suggestions to max 6.
- Replace every schema placeholder with actual values.
- Never output the literal words "string" or "number" as field values.
- If score is below 100, include at least 1 suggestion.
- If score is 60 or below, include at least 3 suggestions.
`,
    },
  ]
}

export function safeParseJson(text) {
  try {
    return { ok: true, data: JSON.parse(text) }
  } catch (e) {
    return { ok: false, error: 'AI returned invalid JSON.' }
  }
}
