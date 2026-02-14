function normalizeString(value) {
  return String(value || '').trim()
}

function toList(textBlock) {
  return normalizeString(textBlock)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseCommaList(value) {
  return normalizeString(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function mapToJsonResume(internalCvData = {}) {
  const basics = {
    name: normalizeString(internalCvData.name),
    label: normalizeString(internalCvData.label),
    email: normalizeString(internalCvData.email),
    phone: normalizeString(internalCvData.phone),
    website: normalizeString(internalCvData.website),
    summary: normalizeString(internalCvData.summary),
    location: {
      city: normalizeString(internalCvData.city),
      region: normalizeString(internalCvData.region),
      countryCode: normalizeString(internalCvData.countryCode),
    },
    profiles: [
      {
        network: normalizeString(internalCvData.profileNetwork),
        username: normalizeString(internalCvData.profileUsername),
        url: normalizeString(internalCvData.profileUrl),
      },
    ].filter((profile) => profile.network || profile.username || profile.url),
  }

  const work = [
    {
      name: normalizeString(internalCvData.workCompany),
      position: normalizeString(internalCvData.workPosition),
      startDate: normalizeString(internalCvData.workStartDate),
      endDate: normalizeString(internalCvData.workEndDate),
      summary: normalizeString(internalCvData.workSummary),
      highlights: toList(internalCvData.workHighlights),
    },
  ].filter((item) => item.name || item.position || item.summary || item.highlights.length)

  const education = [
    {
      institution: normalizeString(internalCvData.educationInstitution),
      area: normalizeString(internalCvData.educationArea),
      studyType: normalizeString(internalCvData.educationStudyType),
      startDate: normalizeString(internalCvData.educationStartDate),
      endDate: normalizeString(internalCvData.educationEndDate),
      score: normalizeString(internalCvData.educationScore),
      courses: toList(internalCvData.educationCourses),
    },
  ].filter((item) => item.institution || item.area || item.studyType || item.courses.length)

  const skills = [
    {
      name: normalizeString(internalCvData.skillsCategory || 'Core Skills'),
      level: normalizeString(internalCvData.skillsLevel),
      keywords: parseCommaList(internalCvData.skillsKeywords),
    },
  ].filter((item) => item.name || item.level || item.keywords.length)

  const projects = [
    {
      name: normalizeString(internalCvData.projectName),
      description: normalizeString(internalCvData.projectDescription),
      url: normalizeString(internalCvData.projectUrl),
      highlights: toList(internalCvData.projectHighlights),
    },
  ].filter((item) => item.name || item.description || item.url || item.highlights.length)

  return {
    basics,
    work,
    education,
    skills,
    projects,
  }
}
