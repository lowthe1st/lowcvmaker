function buildPreviewDocument(html) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root { color-scheme: light; }
    html, body {
      margin: 0;
      padding: 0;
      background: #eef1f8;
      font-family: Inter, 'Segoe UI', Arial, sans-serif;
    }
    .preview-wrap {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 24px 12px;
      box-sizing: border-box;
    }
    .a4-shell {
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      box-shadow: 0 10px 26px rgba(15, 23, 42, 0.15);
      overflow: hidden;
    }
    @media (max-width: 980px) {
      .a4-shell {
        width: 100%;
        min-height: 100vh;
      }
    }
    @media print {
      body { background: #fff; }
      .preview-wrap { padding: 0; }
      .a4-shell {
        width: auto;
        min-height: auto;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="preview-wrap">
    <div class="a4-shell">${html}</div>
  </div>
</body>
</html>`
}

function ResumePreviewFrame({ html, title = 'Resume preview' }) {
  return (
    <iframe
      className="resume-preview-frame"
      title={title}
      srcDoc={buildPreviewDocument(html)}
      sandbox="allow-same-origin"
    />
  )
}

export default ResumePreviewFrame
