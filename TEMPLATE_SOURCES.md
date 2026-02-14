# Real CV Template Sources and Strategy

This project can support real template workflows without paid APIs or runtime remote fetches.

## Practical Sources (Open and Realistic)

1. JSON Resume ecosystem
- Site: https://jsonresume.org
- Schema docs: https://jsonresume.org/schema
- Why: standardized resume JSON structure and reusable theme rendering.

2. JSON Resume theme: Even
- Package: `jsonresume-theme-even`
- Source: https://github.com/rbardini/jsonresume-theme-even
- License: MIT
- Status in this project: integrated as the first live code-based theme.

3. moderncv (LaTeX, CTAN)
- Source: https://ctan.org/pkg/moderncv
- Why: mature professional CV layout patterns.
- License: verify current CTAN metadata/version before redistribution.

4. AltaCV (LaTeX templates)
- Source: CTAN/GitHub mirrors
- Why: modern one-page CV style and clean typography.
- License: verify per package/repo.

5. Awesome-CV (open-source)
- Source: GitHub project commonly known as Awesome-CV
- Why: strong modern professional structure.
- License: follow repository license and attribution requirements.

6. Europass structure
- Source: official Europass platform/documentation
- Why: recognizable EU-friendly CV structure.
- Note: implement our own HTML/CSS structure; do not copy proprietary site assets.

7. Reactive Resume (open-source reference)
- Source: Reactive Resume OSS repository
- Why: useful builder and template architecture ideas.
- License: check copyleft/commercial constraints before direct reuse.

## Licensing and Attribution Notes

- Keep origin + license metadata for every template/theme in our registry.
- Verify license at the exact version used.
- Add attribution when required by license terms.
- Prefer "inspired-by" implementations in our own code when license terms are restrictive.
- Do not import paid marketplace templates without explicit license rights.

## Recommended Path for This Project

1. Keep templates local as data
- Use local template registry (`src/templates/templates.js` and `src/templates.js`).

2. Keep theme metadata local
- Use `src/templates/jsonresume/themeRegistry.js` for package + license + source metadata.

3. Map editor data to JSON Resume
- Use `mapToJsonResume` to normalize internal CV fields into official schema-compatible JSON.

4. Render in browser
- Use runtime theme renderer (`renderTheme`) and show output in iframe (`ResumePreviewFrame`) for safe isolation.

5. Export options
- HTML download from rendered theme output.
- PDF fallback via browser print dialog (Save as PDF).

## Clarification on Harvard/Oxford

Harvard and Oxford are mainly citation/writing conventions, not official CV template standards. They can inspire tone/structure, but should not be treated as primary template source standards.
