var y = Object.freeze, z = Object.defineProperty;
var b = (t, i) => y(z(t, "raw", { value: y(i || t.slice()) }));
import { html as e } from "@rbardini/html";
import L from "micromark";
import j from "striptags";
import k from "feather-icons";
const C = `const pluralize = (num, str) => \`\${num} \${num === 1 ? str : str.concat('s')}\`

class TimeDuration extends HTMLElement {
  connectedCallback() {
    const dates = this.getAttribute('dates')
    if (!dates) return this.remove()

    const duration = dates.split('|').reduce((acc, _date, i, dates) => {
      if (i % 2) return acc
      const [startDate, endDate] = dates.slice(i)
      return acc + (startDate ? +new Date(endDate || Date.now()) - +new Date(startDate) : 0)
    }, 0)

    const diffDate = new Date(duration)
    const years = diffDate.getFullYear() - 1970
    const months = diffDate.getMonth()
    const days = diffDate.getDate() - 1

    const segments = [
      years && pluralize(years, 'yr'),
      months && pluralize(months, 'mo'),
      days && !years && !months && pluralize(days, 'day'),
    ].filter(Boolean)
    if (!segments.length) return

    this.textContent = segments.join(' ')
  }
}

customElements.define('time-duration', TimeDuration)
`, I = ':root{color-scheme:light dark;--color-background-light: #ffffff;--color-dimmed-light: #f3f4f5;--color-primary-light: #191e23;--color-secondary-light: #6c7781;--color-accent-light: #0073aa;--color-background-dark: #191e23;--color-dimmed-dark: #23282d;--color-primary-dark: #fbfbfc;--color-secondary-dark: #ccd0d4;--color-accent-dark: #00a0d2;--color-background: var(--color-background-light);--color-dimmed: var(--color-dimmed-light);--color-primary: var(--color-primary-light);--color-secondary: var(--color-secondary-light);--color-accent: var(--color-accent-light);--scale-ratio: 1.25;--scale0: 1rem;--scale1: calc(var(--scale0) * var(--scale-ratio));--scale2: calc(var(--scale1) * var(--scale-ratio));--scale3: calc(var(--scale2) * var(--scale-ratio));--scale4: calc(var(--scale3) * var(--scale-ratio));--scale5: calc(var(--scale4) * var(--scale-ratio))}@media (prefers-color-scheme: dark){:root{--color-background: var(--color-background-dark);--color-dimmed: var(--color-dimmed-dark);--color-primary: var(--color-primary-dark);--color-secondary: var(--color-secondary-dark);--color-accent: var(--color-accent-dark)}}*{box-sizing:border-box;margin:0;padding:0}html{font-size:14px}body{background:var(--color-background);color:var(--color-primary);display:grid;font:1em/1.5 Lato,sans-serif;gap:2em;grid-template-columns:[full-start] 1fr [main-start side-start] minmax(min-content,12em) [side-end content-start] minmax(min-content,36em) [main-end content-end] 1fr [full-end];grid-template-rows:auto [content] 0;margin-bottom:4em}body:before{content:"";grid-column:full;grid-row:content}ol,ul{padding-left:1em}:not(.icon-list,.tag-list)>li+li{margin-top:.4em}li::marker,.network{color:var(--color-secondary)}a{color:var(--color-accent);text-decoration:none}a:focus,a:hover{text-decoration:underline}h1,h2,h3,h5{font-weight:400}h1,h2,h3{line-height:1.2}h1{font-size:var(--scale5)}h2{color:var(--color-secondary);font-size:var(--scale4)}h3{color:var(--color-secondary);font-size:var(--scale3);grid-column:side;margin-bottom:1rem}h4{font-size:var(--scale2)}h5{font-size:var(--scale1)}h6{font-size:var(--scale0)}blockquote{border-left:.2em solid var(--color-dimmed);padding-left:1em}cite{color:var(--color-secondary);font-style:inherit}cite:before{content:"— "}svg{margin-right:.2em;vertical-align:text-bottom}.masthead{background:var(--color-dimmed);display:inherit;gap:inherit;grid-column:full;grid-template-columns:inherit;padding:4em 0;text-align:center}.masthead>*,section{grid-column:main}.masthead>img{border:4px solid;border-radius:50%;margin:0 auto;max-width:12em}article>*+*,blockquote>*+*,.timeline>div>*+*{margin-top:.6em}.meta{color:var(--color-secondary)}.stack{display:grid;gap:1.5em}.icon-list{display:flex;flex-wrap:wrap;gap:.4em 1em;justify-content:center;list-style:none;padding:0}.grid-list{display:grid;gap:1em}.tag-list{display:flex;flex-wrap:wrap;gap:.4em;list-style:none;padding:0}.tag-list>li{background:var(--color-dimmed);border-radius:.2em;padding:.2em .6em}.timeline>div{position:relative}.timeline>div:not(:last-child){padding-bottom:1rem}.timeline>div:not(:last-child):before{content:"";position:absolute;top:1rem;left:-15px;width:2px;height:100%;background:var(--color-secondary)}.timeline>div:not(:only-child):after{content:"";position:absolute;top:.6rem;left:-20px;width:8px;height:8px;background:var(--color-secondary);border:2px solid var(--color-background);border-radius:50%}@media print,(min-width: 48em){h3{text-align:right;margin-bottom:inherit}.masthead{text-align:inherit}.masthead>*,section{grid-column:content}.masthead img{grid-column:side;grid-row:span 2;max-width:100%}section{display:contents}.icon-list{flex-direction:column}.grid-list{grid-template-columns:repeat(auto-fit,minmax(calc((100% - 1em)/2),1fr))}}time+time-duration:before{content:"· "}@media print{time-duration{display:none}}';
function T(t = {}) {
  const i = t.themeOptions?.colors;
  return i && Object.entries(i).map(([o, [n, a = n]]) => `--color-${o}-light:${n}; --color-${o}-dark:${a};`).join(" ");
}
function d(t, i = !1) {
  const o = (
    /** @type {string} */
    L(t)
  );
  return i ? j(o) : o;
}
const P = (t) => new Date(t).toLocaleDateString("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});
function v(t) {
  return e`<time datetime="${t}">${P(t)}</time>`;
}
function R(t = []) {
  return t.length > 0 && e`
      <section id="awards">
        <h3>Awards</h3>
        <div class="stack">
          ${t.map(
    ({ awarder: i, date: o, summary: n, title: a }) => e`
              <article>
                <header>
                  <h4>${a}</h4>
                  <div class="meta">
                    ${i && e`<div>Awarded by <strong>${i}</strong></div>`} ${o && v(o)}
                  </div>
                </header>
                ${n && d(n)}
              </article>
            `
  )}
        </div>
      </section>
    `;
}
const q = (t) => t.replace(/^(https?:|)\/\//, "").replace(/\/$/, "");
function h(t, i) {
  return i ? t ? e`<a href="${t}">${i}</a>` : i : t && e`<a href="${t}">${q(t)}</a>`;
}
function A(t = []) {
  return t.length > 0 && e`
      <section id="certificates">
        <h3>Certificates</h3>
        <div class="stack">
          ${t.map(
    ({ date: i, issuer: o, name: n, url: a }) => e`
              <article>
                <header>
                  <h4>${h(a, n)}</h4>
                  <div class="meta">
                    ${o && e`<div>Issued by <strong>${o}</strong></div>`} ${i && v(i)}
                  </div>
                </header>
              </article>
            `
  )}
        </div>
      </section>
    `;
}
function w(t) {
  const i = t.map(({ startDate: o, endDate: n }) => [o || "", n || ""]).flat().join("|");
  return e`<time-duration dates="${i}"></time-duration>`;
}
function p(t, i) {
  return i === t ? v(i) : e`${v(t)} – ${i ? v(i) : "Present"} ${w([{ startDate: t, endDate: i }])}`;
}
function B(t = []) {
  return t.length > 0 && e`
      <section id="education">
        <h3>Education</h3>
        <div class="stack">
          ${t.map(
    ({ area: i, courses: o = [], institution: n, startDate: a, endDate: l, studyType: r, url: c }) => e`
              <article>
                <header>
                  <h4>${h(c, n)}</h4>
                  <div class="meta">
                    <div>${[r, i && e`<strong>${i}</strong>`].filter(Boolean).join(" in ")}</div>
                    ${a && e`<div>${p(a, l)}</div>`}
                  </div>
                </header>
                ${o.length > 0 && e`
                  <h5>Courses</h5>
                  <ul>
                    ${o.map((s) => e`<li>${d(s)}</li>`)}
                  </ul>
                `}
              </article>
            `
  )}
        </div>
      </section>
    `;
}
function u(t, i) {
  return (k.icons[
    /** @type {FeatherIconNames} */
    t.toLowerCase()
  ] || i && k.icons[
    /** @type {FeatherIconNames} */
    i.toLowerCase()
  ])?.toSvg({ width: 16, height: 16 });
}
const E = (t) => Intl.DisplayNames ? new Intl.DisplayNames(["en"], { type: "region" }).of(t) : t;
function S(t = {}) {
  const { email: i, image: o, label: n, location: a, name: l, phone: r, profiles: c = [], summary: s, url: $ } = t;
  return e`
    <header class="masthead">
      ${o && e`<img src="${o}" alt="" />`}
      <div>${l && e`<h1>${l}</h1>`} ${n && e`<h2>${n}</h2>`}</div>
      ${s && e`<article>${d(s)}</article>`}
      <ul class="icon-list">
        ${a?.city && e`
          <li>
            ${u("map-pin")} ${a.city}${a.countryCode && e`, ${E(a.countryCode)}`}
          </li>
        `}
        ${i && e`
          <li>
            ${u("mail")}
            <a href="mailto:${i}">${i}</a>
          </li>
        `}
        ${r && e`
          <li>
            ${u("phone")}
            <a href="tel:${r.replace(/\s/g, "")}">${r}</a>
          </li>
        `}
        ${$ && e`<li>${u("link")} ${h($)}</li>`}
        ${c.map(
    ({ network: m, url: g, username: f }) => e`
            <li>
              ${m && u(m, "user")} ${h(g, f)}
              ${m && e`<span class="network">(${m})</span>`}
            </li>
          `
  )}
      </ul>
    </header>
  `;
}
function F(t = []) {
  return t.length > 0 && e`
      <section id="interests">
        <h3>Interests</h3>
        <div class="grid-list">
          ${t.map(
    ({ keywords: i = [], name: o }) => e`
              <div>
                ${o && e`<h4>${o}</h4>`}
                ${i.length > 0 && e`
                  <ul class="tag-list">
                    ${i.map((n) => e`<li>${n}</li>`)}
                  </ul>
                `}
              </div>
            `
  )}
        </div>
      </section>
    `;
}
function M(t = []) {
  return t.length > 0 && e`
      <section id="languages">
        <h3>Languages</h3>
        <div class="grid-list">
          ${t.map(
    ({ fluency: i, language: o }) => e`<div>${o && e`<h4>${o}</h4>`} ${i}</div>`
  )}
        </div>
      </section>
    `;
}
function O(t = {}) {
  const { name: i, summary: o } = t;
  return e`
    ${i && e`<title>${i}</title>`}
    ${o && e`<meta name="description" content="${d(o, !0)}" />`}
  `;
}
const W = (t) => Intl.ListFormat ? new Intl.ListFormat("en").format(t) : t.join(", ");
function H(t = []) {
  return t.length > 0 && e`
      <section id="projects">
        <h3>Projects</h3>
        <div class="stack">
          ${t.map(
    ({
      description: i,
      entity: o,
      highlights: n = [],
      keywords: a = [],
      name: l,
      startDate: r,
      endDate: c,
      roles: s = [],
      type: $,
      url: m
    }) => e`
              <article>
                <header>
                  <h4>${h(m, l)}</h4>
                  <div class="meta">
                    <div>
                      ${s.length > 0 && e`<strong>${W(s)}</strong>`}
                      ${o && e`at <strong>${o}</strong>`}
                    </div>
                    ${r && e`<div>${p(r, c)}</div>`}
                    ${$ && e`<div>${$}</div>`}
                  </div>
                </header>
                ${i && d(i)}
                ${n.length > 0 && e`
                  <ul>
                    ${n.map((g) => e`<li>${d(g)}</li>`)}
                  </ul>
                `}
                ${a.length > 0 && e`
                  <ul class="tag-list">
                    ${a.map((g) => e`<li>${g}</li>`)}
                  </ul>
                `}
              </article>
            `
  )}
        </div>
      </section>
    `;
}
function N(t = []) {
  return t.length > 0 && e`
      <section id="publications">
        <h3>Publications</h3>
        <div class="stack">
          ${t.map(
    ({ name: i, publisher: o, releaseDate: n, summary: a, url: l }) => e`
              <article>
                <header>
                  <h4>${h(l, i)}</h4>
                  <div class="meta">
                    ${o && e`<div>Published by <strong>${o}</strong></div>`}
                    ${n && v(n)}
                  </div>
                </header>
                ${a && d(a)}
              </article>
            `
  )}
        </div>
      </section>
    `;
}
function U(t = []) {
  return t.length > 0 && e`
      <section id="references">
        <h3>References</h3>
        <div class="stack">
          ${t.map(
    ({ name: i, reference: o }) => e`
              <blockquote>
                ${o && d(o)}
                ${i && e`
                  <p>
                    <cite>${i}</cite>
                  </p>
                `}
              </blockquote>
            `
  )}
        </div>
      </section>
    `;
}
function V(t = []) {
  return t.length > 0 && e`
      <section id="skills">
        <h3>Skills</h3>
        <div class="grid-list">
          ${t.map(
    ({ keywords: i = [], name: o }) => e`
              <div>
                ${o && e`<h4>${o}</h4>`}
                ${i.length > 0 && e`
                  <ul class="tag-list">
                    ${i.map((n) => e`<li>${n}</li>`)}
                  </ul>
                `}
              </div>
            `
  )}
        </div>
      </section>
    `;
}
function Y(t = []) {
  return t.length > 0 && e`
      <section id="volunteer">
        <h3>Volunteer</h3>
        <div class="stack">
          ${t.map(
    ({ highlights: i = [], organization: o, position: n, startDate: a, endDate: l, summary: r, url: c }) => e`
              <article>
                <header>
                  <h4>${h(c, o)}</h4>
                  <div class="meta">
                    <strong>${n}</strong>
                    ${a && e`<div>${p(a, l)}</div>`}
                  </div>
                </header>
                ${r && d(r)}
                ${i.length > 0 && e`
                  <ul>
                    ${i.map((s) => e`<li>${d(s)}</li>`)}
                  </ul>
                `}
              </article>
            `
  )}
        </div>
      </section>
    `;
}
function Z(t = []) {
  const i = t.reduce(
    (o, { description: n, name: a, url: l, ...r }) => {
      const c = o[o.length - 1];
      return c && c.name === a && c.description === n && c.url === l ? c.items.push(r) : o.push({ description: n, name: a, url: l, items: [r] }), o;
    },
    /** @type {NestedWork[]} */
    []
  );
  return t.length > 0 && e`
      <section id="work">
        <h3>Work</h3>
        <div class="stack">
          ${i.map(({ description: o, name: n, url: a, items: l = [] }) => {
    const r = l.length === 1 ? l[0] : void 0;
    return e`
              <article>
                <header>
                  <h4>${r ? r.position : h(a, n)}</h4>
                  <div class="meta">
                    ${r ? e`
                          <div>
                            ${[e`<strong>${h(a, n)}</strong>`, o].filter(Boolean).join(" · ")}
                          </div>
                          ${r.startDate && e`<div>${p(r.startDate, r.endDate)}</div>`}
                          ${r.location && e`<div>${r.location}</div>`}
                        ` : e`
                          ${o && e`<div>${o}</div>`}
                          ${l.some((c) => c.startDate) && e`<div>${w(l)}</div>`}
                        `}
                  </div>
                </header>
                <div class="timeline">
                  ${l.map(
      ({ highlights: c = [], location: s, position: $, startDate: m, endDate: g, summary: f }) => e`
                      <div>
                        ${!r && e`
                          <div>
                            <h5>${$}</h5>
                            <div class="meta">
                              ${m && e`<div>${p(m, g)}</div>`}
                              ${s && e`<div>${s}</div>`}
                            </div>
                          </div>
                        `}
                        ${f && d(f)}
                        ${c.length > 0 && e`
                          <ul>
                            ${c.map((D) => e`<li>${d(D)}</li>`)}
                          </ul>
                        `}
                      </div>
                    `
    )}
                </div>
              </article>
            `;
  })}
        </div>
      </section>
    `;
}
var x;
function _(t, { css: i, js: o } = {}) {
  return e`<!doctype html>
    <html lang="en" style="${T(t.meta)}">
      <head>
        <meta charset="utf-8" />
        ${O(t.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        ${i && e`<style>
          ${i}
        </style>`}
        ${o && e(x || (x = b([`<script type="module">
          `, `
        <\/script>`])), o)}
      </head>
      <body>
        ${S(t.basics)} ${Z(t.work)} ${Y(t.volunteer)} ${B(t.education)}
        ${H(t.projects)} ${R(t.awards)} ${A(t.certificates)}
        ${N(t.publications)} ${V(t.skills)} ${M(t.languages)}
        ${F(t.interests)} ${U(t.references)}
      </body>
    </html>`;
}
const tt = {
  mediaType: "print",
  printBackground: !0
}, et = (t) => _(t, { css: I, js: C });
export {
  tt as pdfRenderOptions,
  et as render
};
