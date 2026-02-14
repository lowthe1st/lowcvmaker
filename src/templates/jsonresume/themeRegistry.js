export const jsonResumeThemeRegistry = [
  {
    id: 'even',
    displayName: 'Even',
    packageName: 'jsonresume-theme-even',
    license: 'MIT',
    sourceUrl: 'https://github.com/rbardini/jsonresume-theme-even',
    homepageUrl: 'https://www.npmjs.com/package/jsonresume-theme-even',
    description: 'Balanced two-column layout with strong section hierarchy.',
  },
  {
    id: 'projects',
    displayName: 'Projects',
    packageName: 'jsonresume-theme-projects',
    license: 'MIT',
    sourceUrl: 'https://github.com/dmsemenov/jsonresume-theme-projects',
    homepageUrl: 'https://www.npmjs.com/package/jsonresume-theme-projects',
    description: 'Project-forward modern resume with clean typography and structured sections.',
  },
  {
    id: 'short',
    displayName: 'Short',
    packageName: 'jsonresume-theme-short',
    license: 'MIT',
    sourceUrl: 'https://github.com/isnotahippy/jsonresume-theme-short',
    homepageUrl: 'https://www.npmjs.com/package/jsonresume-theme-short',
    description: 'Compact single-page style focused on concise, quick-to-scan resumes.',
  },
  {
    id: 'flat',
    displayName: 'Flat',
    packageName: 'jsonresume-theme-flat',
    license: 'MIT',
    sourceUrl: 'https://github.com/erming/jsonresume-theme-flat',
    homepageUrl: 'https://www.npmjs.com/package/jsonresume-theme-flat',
    description: 'Classic clean layout with strong section dividers and readable hierarchy.',
  },
]

export function getThemeById(themeId) {
  return jsonResumeThemeRegistry.find((theme) => theme.id === themeId) || null
}
