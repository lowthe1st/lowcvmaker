"use strict";var y=Object.freeze,j=Object.defineProperty;var b=(t,i)=>y(j(t,"raw",{value:y(i||t.slice())}));Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("@rbardini/html"),z=require("micromark"),L=require("striptags"),k=require("feather-icons"),C=`const pluralize = (num, str) => \`\${num} \${num === 1 ? str : str.concat('s')}\`

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
`,I=':root{color-scheme:light dark;--color-background-light: #ffffff;--color-dimmed-light: #f3f4f5;--color-primary-light: #191e23;--color-secondary-light: #6c7781;--color-accent-light: #0073aa;--color-background-dark: #191e23;--color-dimmed-dark: #23282d;--color-primary-dark: #fbfbfc;--color-secondary-dark: #ccd0d4;--color-accent-dark: #00a0d2;--color-background: var(--color-background-light);--color-dimmed: var(--color-dimmed-light);--color-primary: var(--color-primary-light);--color-secondary: var(--color-secondary-light);--color-accent: var(--color-accent-light);--scale-ratio: 1.25;--scale0: 1rem;--scale1: calc(var(--scale0) * var(--scale-ratio));--scale2: calc(var(--scale1) * var(--scale-ratio));--scale3: calc(var(--scale2) * var(--scale-ratio));--scale4: calc(var(--scale3) * var(--scale-ratio));--scale5: calc(var(--scale4) * var(--scale-ratio))}@media (prefers-color-scheme: dark){:root{--color-background: var(--color-background-dark);--color-dimmed: var(--color-dimmed-dark);--color-primary: var(--color-primary-dark);--color-secondary: var(--color-secondary-dark);--color-accent: var(--color-accent-dark)}}*{box-sizing:border-box;margin:0;padding:0}html{font-size:14px}body{background:var(--color-background);color:var(--color-primary);display:grid;font:1em/1.5 Lato,sans-serif;gap:2em;grid-template-columns:[full-start] 1fr [main-start side-start] minmax(min-content,12em) [side-end content-start] minmax(min-content,36em) [main-end content-end] 1fr [full-end];grid-template-rows:auto [content] 0;margin-bottom:4em}body:before{content:"";grid-column:full;grid-row:content}ol,ul{padding-left:1em}:not(.icon-list,.tag-list)>li+li{margin-top:.4em}li::marker,.network{color:var(--color-secondary)}a{color:var(--color-accent);text-decoration:none}a:focus,a:hover{text-decoration:underline}h1,h2,h3,h5{font-weight:400}h1,h2,h3{line-height:1.2}h1{font-size:var(--scale5)}h2{color:var(--color-secondary);font-size:var(--scale4)}h3{color:var(--color-secondary);font-size:var(--scale3);grid-column:side;margin-bottom:1rem}h4{font-size:var(--scale2)}h5{font-size:var(--scale1)}h6{font-size:var(--scale0)}blockquote{border-left:.2em solid var(--color-dimmed);padding-left:1em}cite{color:var(--color-secondary);font-style:inherit}cite:before{content:"— "}svg{margin-right:.2em;vertical-align:text-bottom}.masthead{background:var(--color-dimmed);display:inherit;gap:inherit;grid-column:full;grid-template-columns:inherit;padding:4em 0;text-align:center}.masthead>*,section{grid-column:main}.masthead>img{border:4px solid;border-radius:50%;margin:0 auto;max-width:12em}article>*+*,blockquote>*+*,.timeline>div>*+*{margin-top:.6em}.meta{color:var(--color-secondary)}.stack{display:grid;gap:1.5em}.icon-list{display:flex;flex-wrap:wrap;gap:.4em 1em;justify-content:center;list-style:none;padding:0}.grid-list{display:grid;gap:1em}.tag-list{display:flex;flex-wrap:wrap;gap:.4em;list-style:none;padding:0}.tag-list>li{background:var(--color-dimmed);border-radius:.2em;padding:.2em .6em}.timeline>div{position:relative}.timeline>div:not(:last-child){padding-bottom:1rem}.timeline>div:not(:last-child):before{content:"";position:absolute;top:1rem;left:-15px;width:2px;height:100%;background:var(--color-secondary)}.timeline>div:not(:only-child):after{content:"";position:absolute;top:.6rem;left:-20px;width:8px;height:8px;background:var(--color-secondary);border:2px solid var(--color-background);border-radius:50%}@media print,(min-width: 48em){h3{text-align:right;margin-bottom:inherit}.masthead{text-align:inherit}.masthead>*,section{grid-column:content}.masthead img{grid-column:side;grid-row:span 2;max-width:100%}section{display:contents}.icon-list{flex-direction:column}.grid-list{grid-template-columns:repeat(auto-fit,minmax(calc((100% - 1em)/2),1fr))}}time+time-duration:before{content:"· "}@media print{time-duration{display:none}}';function q(t={}){const i=t.themeOptions?.colors;return i&&Object.entries(i).map(([n,[o,l=o]])=>`--color-${n}-light:${o}; --color-${n}-dark:${l};`).join(" ")}function d(t,i=!1){const n=z(t);return i?L(n):n}const T=t=>new Date(t).toLocaleDateString("en",{month:"short",year:"numeric",timeZone:"UTC"});function u(t){return e.html`<time datetime="${t}">${T(t)}</time>`}function P(t=[]){return t.length>0&&e.html`
      <section id="awards">
        <h3>Awards</h3>
        <div class="stack">
          ${t.map(({awarder:i,date:n,summary:o,title:l})=>e.html`
              <article>
                <header>
                  <h4>${l}</h4>
                  <div class="meta">
                    ${i&&e.html`<div>Awarded by <strong>${i}</strong></div>`} ${n&&u(n)}
                  </div>
                </header>
                ${o&&d(o)}
              </article>
            `)}
        </div>
      </section>
    `}const R=t=>t.replace(/^(https?:|)\/\//,"").replace(/\/$/,"");function h(t,i){return i?t?e.html`<a href="${t}">${i}</a>`:i:t&&e.html`<a href="${t}">${R(t)}</a>`}function S(t=[]){return t.length>0&&e.html`
      <section id="certificates">
        <h3>Certificates</h3>
        <div class="stack">
          ${t.map(({date:i,issuer:n,name:o,url:l})=>e.html`
              <article>
                <header>
                  <h4>${h(l,o)}</h4>
                  <div class="meta">
                    ${n&&e.html`<div>Issued by <strong>${n}</strong></div>`} ${i&&u(i)}
                  </div>
                </header>
              </article>
            `)}
        </div>
      </section>
    `}function x(t){const i=t.map(({startDate:n,endDate:o})=>[n||"",o||""]).flat().join("|");return e.html`<time-duration dates="${i}"></time-duration>`}function p(t,i){return i===t?u(i):e.html`${u(t)} – ${i?u(i):"Present"} ${x([{startDate:t,endDate:i}])}`}function O(t=[]){return t.length>0&&e.html`
      <section id="education">
        <h3>Education</h3>
        <div class="stack">
          ${t.map(({area:i,courses:n=[],institution:o,startDate:l,endDate:r,studyType:a,url:c})=>e.html`
              <article>
                <header>
                  <h4>${h(c,o)}</h4>
                  <div class="meta">
                    <div>${[a,i&&e.html`<strong>${i}</strong>`].filter(Boolean).join(" in ")}</div>
                    ${l&&e.html`<div>${p(l,r)}</div>`}
                  </div>
                </header>
                ${n.length>0&&e.html`
                  <h5>Courses</h5>
                  <ul>
                    ${n.map(s=>e.html`<li>${d(s)}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function v(t,i){return(k.icons[t.toLowerCase()]||i&&k.icons[i.toLowerCase()])?.toSvg({width:16,height:16})}const A=t=>Intl.DisplayNames?new Intl.DisplayNames(["en"],{type:"region"}).of(t):t;function B(t={}){const{email:i,image:n,label:o,location:l,name:r,phone:a,profiles:c=[],summary:s,url:$}=t;return e.html`
    <header class="masthead">
      ${n&&e.html`<img src="${n}" alt="" />`}
      <div>${r&&e.html`<h1>${r}</h1>`} ${o&&e.html`<h2>${o}</h2>`}</div>
      ${s&&e.html`<article>${d(s)}</article>`}
      <ul class="icon-list">
        ${l?.city&&e.html`
          <li>
            ${v("map-pin")} ${l.city}${l.countryCode&&e.html`, ${A(l.countryCode)}`}
          </li>
        `}
        ${i&&e.html`
          <li>
            ${v("mail")}
            <a href="mailto:${i}">${i}</a>
          </li>
        `}
        ${a&&e.html`
          <li>
            ${v("phone")}
            <a href="tel:${a.replace(/\s/g,"")}">${a}</a>
          </li>
        `}
        ${$&&e.html`<li>${v("link")} ${h($)}</li>`}
        ${c.map(({network:m,url:g,username:f})=>e.html`
            <li>
              ${m&&v(m,"user")} ${h(g,f)}
              ${m&&e.html`<span class="network">(${m})</span>`}
            </li>
          `)}
      </ul>
    </header>
  `}function E(t=[]){return t.length>0&&e.html`
      <section id="interests">
        <h3>Interests</h3>
        <div class="grid-list">
          ${t.map(({keywords:i=[],name:n})=>e.html`
              <div>
                ${n&&e.html`<h4>${n}</h4>`}
                ${i.length>0&&e.html`
                  <ul class="tag-list">
                    ${i.map(o=>e.html`<li>${o}</li>`)}
                  </ul>
                `}
              </div>
            `)}
        </div>
      </section>
    `}function M(t=[]){return t.length>0&&e.html`
      <section id="languages">
        <h3>Languages</h3>
        <div class="grid-list">
          ${t.map(({fluency:i,language:n})=>e.html`<div>${n&&e.html`<h4>${n}</h4>`} ${i}</div>`)}
        </div>
      </section>
    `}function F(t={}){const{name:i,summary:n}=t;return e.html`
    ${i&&e.html`<title>${i}</title>`}
    ${n&&e.html`<meta name="description" content="${d(n,!0)}" />`}
  `}const W=t=>Intl.ListFormat?new Intl.ListFormat("en").format(t):t.join(", ");function H(t=[]){return t.length>0&&e.html`
      <section id="projects">
        <h3>Projects</h3>
        <div class="stack">
          ${t.map(({description:i,entity:n,highlights:o=[],keywords:l=[],name:r,startDate:a,endDate:c,roles:s=[],type:$,url:m})=>e.html`
              <article>
                <header>
                  <h4>${h(m,r)}</h4>
                  <div class="meta">
                    <div>
                      ${s.length>0&&e.html`<strong>${W(s)}</strong>`}
                      ${n&&e.html`at <strong>${n}</strong>`}
                    </div>
                    ${a&&e.html`<div>${p(a,c)}</div>`}
                    ${$&&e.html`<div>${$}</div>`}
                  </div>
                </header>
                ${i&&d(i)}
                ${o.length>0&&e.html`
                  <ul>
                    ${o.map(g=>e.html`<li>${d(g)}</li>`)}
                  </ul>
                `}
                ${l.length>0&&e.html`
                  <ul class="tag-list">
                    ${l.map(g=>e.html`<li>${g}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function N(t=[]){return t.length>0&&e.html`
      <section id="publications">
        <h3>Publications</h3>
        <div class="stack">
          ${t.map(({name:i,publisher:n,releaseDate:o,summary:l,url:r})=>e.html`
              <article>
                <header>
                  <h4>${h(r,i)}</h4>
                  <div class="meta">
                    ${n&&e.html`<div>Published by <strong>${n}</strong></div>`}
                    ${o&&u(o)}
                  </div>
                </header>
                ${l&&d(l)}
              </article>
            `)}
        </div>
      </section>
    `}function U(t=[]){return t.length>0&&e.html`
      <section id="references">
        <h3>References</h3>
        <div class="stack">
          ${t.map(({name:i,reference:n})=>e.html`
              <blockquote>
                ${n&&d(n)}
                ${i&&e.html`
                  <p>
                    <cite>${i}</cite>
                  </p>
                `}
              </blockquote>
            `)}
        </div>
      </section>
    `}function V(t=[]){return t.length>0&&e.html`
      <section id="skills">
        <h3>Skills</h3>
        <div class="grid-list">
          ${t.map(({keywords:i=[],name:n})=>e.html`
              <div>
                ${n&&e.html`<h4>${n}</h4>`}
                ${i.length>0&&e.html`
                  <ul class="tag-list">
                    ${i.map(o=>e.html`<li>${o}</li>`)}
                  </ul>
                `}
              </div>
            `)}
        </div>
      </section>
    `}function Y(t=[]){return t.length>0&&e.html`
      <section id="volunteer">
        <h3>Volunteer</h3>
        <div class="stack">
          ${t.map(({highlights:i=[],organization:n,position:o,startDate:l,endDate:r,summary:a,url:c})=>e.html`
              <article>
                <header>
                  <h4>${h(c,n)}</h4>
                  <div class="meta">
                    <strong>${o}</strong>
                    ${l&&e.html`<div>${p(l,r)}</div>`}
                  </div>
                </header>
                ${a&&d(a)}
                ${i.length>0&&e.html`
                  <ul>
                    ${i.map(s=>e.html`<li>${d(s)}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function Z(t=[]){const i=t.reduce((n,{description:o,name:l,url:r,...a})=>{const c=n[n.length-1];return c&&c.name===l&&c.description===o&&c.url===r?c.items.push(a):n.push({description:o,name:l,url:r,items:[a]}),n},[]);return t.length>0&&e.html`
      <section id="work">
        <h3>Work</h3>
        <div class="stack">
          ${i.map(({description:n,name:o,url:l,items:r=[]})=>{const a=r.length===1?r[0]:void 0;return e.html`
              <article>
                <header>
                  <h4>${a?a.position:h(l,o)}</h4>
                  <div class="meta">
                    ${a?e.html`
                          <div>
                            ${[e.html`<strong>${h(l,o)}</strong>`,n].filter(Boolean).join(" · ")}
                          </div>
                          ${a.startDate&&e.html`<div>${p(a.startDate,a.endDate)}</div>`}
                          ${a.location&&e.html`<div>${a.location}</div>`}
                        `:e.html`
                          ${n&&e.html`<div>${n}</div>`}
                          ${r.some(c=>c.startDate)&&e.html`<div>${x(r)}</div>`}
                        `}
                  </div>
                </header>
                <div class="timeline">
                  ${r.map(({highlights:c=[],location:s,position:$,startDate:m,endDate:g,summary:f})=>e.html`
                      <div>
                        ${!a&&e.html`
                          <div>
                            <h5>${$}</h5>
                            <div class="meta">
                              ${m&&e.html`<div>${p(m,g)}</div>`}
                              ${s&&e.html`<div>${s}</div>`}
                            </div>
                          </div>
                        `}
                        ${f&&d(f)}
                        ${c.length>0&&e.html`
                          <ul>
                            ${c.map(D=>e.html`<li>${d(D)}</li>`)}
                          </ul>
                        `}
                      </div>
                    `)}
                </div>
              </article>
            `})}
        </div>
      </section>
    `}var w;function _(t,{css:i,js:n}={}){return e.html`<!doctype html>
    <html lang="en" style="${q(t.meta)}">
      <head>
        <meta charset="utf-8" />
        ${F(t.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        ${i&&e.html`<style>
          ${i}
        </style>`}
        ${n&&e.html(w||(w=b([`<script type="module">
          `,`
        <\/script>`])),n)}
      </head>
      <body>
        ${B(t.basics)} ${Z(t.work)} ${Y(t.volunteer)} ${O(t.education)}
        ${H(t.projects)} ${P(t.awards)} ${S(t.certificates)}
        ${N(t.publications)} ${V(t.skills)} ${M(t.languages)}
        ${E(t.interests)} ${U(t.references)}
      </body>
    </html>`}const G={mediaType:"print",printBackground:!0},J=t=>_(t,{css:I,js:C});exports.pdfRenderOptions=G;exports.render=J;
