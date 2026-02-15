(function(s,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("@rbardini/html"),require("micromark"),require("striptags"),require("feather-icons")):typeof define=="function"&&define.amd?define(["exports","@rbardini/html","micromark","striptags","feather-icons"],t):(s=typeof globalThis<"u"?globalThis:s||self,t(s.jsonresumeThemeEven={},s.html,s.micromark,s.striptags,s.feather))})(this,(function(s,t,j,z,b){"use strict";var x=Object.freeze,K=Object.defineProperty;var w=(s,t)=>x(K(s,"raw",{value:x(t||s.slice())}));var D;const L=`const pluralize = (num, str) => \`\${num} \${num === 1 ? str : str.concat('s')}\`

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
`,T=':root{color-scheme:light dark;--color-background-light: #ffffff;--color-dimmed-light: #f3f4f5;--color-primary-light: #191e23;--color-secondary-light: #6c7781;--color-accent-light: #0073aa;--color-background-dark: #191e23;--color-dimmed-dark: #23282d;--color-primary-dark: #fbfbfc;--color-secondary-dark: #ccd0d4;--color-accent-dark: #00a0d2;--color-background: var(--color-background-light);--color-dimmed: var(--color-dimmed-light);--color-primary: var(--color-primary-light);--color-secondary: var(--color-secondary-light);--color-accent: var(--color-accent-light);--scale-ratio: 1.25;--scale0: 1rem;--scale1: calc(var(--scale0) * var(--scale-ratio));--scale2: calc(var(--scale1) * var(--scale-ratio));--scale3: calc(var(--scale2) * var(--scale-ratio));--scale4: calc(var(--scale3) * var(--scale-ratio));--scale5: calc(var(--scale4) * var(--scale-ratio))}@media (prefers-color-scheme: dark){:root{--color-background: var(--color-background-dark);--color-dimmed: var(--color-dimmed-dark);--color-primary: var(--color-primary-dark);--color-secondary: var(--color-secondary-dark);--color-accent: var(--color-accent-dark)}}*{box-sizing:border-box;margin:0;padding:0}html{font-size:14px}body{background:var(--color-background);color:var(--color-primary);display:grid;font:1em/1.5 Lato,sans-serif;gap:2em;grid-template-columns:[full-start] 1fr [main-start side-start] minmax(min-content,12em) [side-end content-start] minmax(min-content,36em) [main-end content-end] 1fr [full-end];grid-template-rows:auto [content] 0;margin-bottom:4em}body:before{content:"";grid-column:full;grid-row:content}ol,ul{padding-left:1em}:not(.icon-list,.tag-list)>li+li{margin-top:.4em}li::marker,.network{color:var(--color-secondary)}a{color:var(--color-accent);text-decoration:none}a:focus,a:hover{text-decoration:underline}h1,h2,h3,h5{font-weight:400}h1,h2,h3{line-height:1.2}h1{font-size:var(--scale5)}h2{color:var(--color-secondary);font-size:var(--scale4)}h3{color:var(--color-secondary);font-size:var(--scale3);grid-column:side;margin-bottom:1rem}h4{font-size:var(--scale2)}h5{font-size:var(--scale1)}h6{font-size:var(--scale0)}blockquote{border-left:.2em solid var(--color-dimmed);padding-left:1em}cite{color:var(--color-secondary);font-style:inherit}cite:before{content:"— "}svg{margin-right:.2em;vertical-align:text-bottom}.masthead{background:var(--color-dimmed);display:inherit;gap:inherit;grid-column:full;grid-template-columns:inherit;padding:4em 0;text-align:center}.masthead>*,section{grid-column:main}.masthead>img{border:4px solid;border-radius:50%;margin:0 auto;max-width:12em}article>*+*,blockquote>*+*,.timeline>div>*+*{margin-top:.6em}.meta{color:var(--color-secondary)}.stack{display:grid;gap:1.5em}.icon-list{display:flex;flex-wrap:wrap;gap:.4em 1em;justify-content:center;list-style:none;padding:0}.grid-list{display:grid;gap:1em}.tag-list{display:flex;flex-wrap:wrap;gap:.4em;list-style:none;padding:0}.tag-list>li{background:var(--color-dimmed);border-radius:.2em;padding:.2em .6em}.timeline>div{position:relative}.timeline>div:not(:last-child){padding-bottom:1rem}.timeline>div:not(:last-child):before{content:"";position:absolute;top:1rem;left:-15px;width:2px;height:100%;background:var(--color-secondary)}.timeline>div:not(:only-child):after{content:"";position:absolute;top:.6rem;left:-20px;width:8px;height:8px;background:var(--color-secondary);border:2px solid var(--color-background);border-radius:50%}@media print,(min-width: 48em){h3{text-align:right;margin-bottom:inherit}.masthead{text-align:inherit}.masthead>*,section{grid-column:content}.masthead img{grid-column:side;grid-row:span 2;max-width:100%}section{display:contents}.icon-list{flex-direction:column}.grid-list{grid-template-columns:repeat(auto-fit,minmax(calc((100% - 1em)/2),1fr))}}time+time-duration:before{content:"· "}@media print{time-duration{display:none}}';function C(e={}){const i=e.themeOptions?.colors;return i&&Object.entries(i).map(([n,[o,a=o]])=>`--color-${n}-light:${o}; --color-${n}-dark:${a};`).join(" ")}function d(e,i=!1){const n=j(e);return i?z(n):n}const I=e=>new Date(e).toLocaleDateString("en",{month:"short",year:"numeric",timeZone:"UTC"});function v(e){return t.html`<time datetime="${e}">${I(e)}</time>`}function q(e=[]){return e.length>0&&t.html`
      <section id="awards">
        <h3>Awards</h3>
        <div class="stack">
          ${e.map(({awarder:i,date:n,summary:o,title:a})=>t.html`
              <article>
                <header>
                  <h4>${a}</h4>
                  <div class="meta">
                    ${i&&t.html`<div>Awarded by <strong>${i}</strong></div>`} ${n&&v(n)}
                  </div>
                </header>
                ${o&&d(o)}
              </article>
            `)}
        </div>
      </section>
    `}const P=e=>e.replace(/^(https?:|)\/\//,"").replace(/\/$/,"");function h(e,i){return i?e?t.html`<a href="${e}">${i}</a>`:i:e&&t.html`<a href="${e}">${P(e)}</a>`}function R(e=[]){return e.length>0&&t.html`
      <section id="certificates">
        <h3>Certificates</h3>
        <div class="stack">
          ${e.map(({date:i,issuer:n,name:o,url:a})=>t.html`
              <article>
                <header>
                  <h4>${h(a,o)}</h4>
                  <div class="meta">
                    ${n&&t.html`<div>Issued by <strong>${n}</strong></div>`} ${i&&v(i)}
                  </div>
                </header>
              </article>
            `)}
        </div>
      </section>
    `}function k(e){const i=e.map(({startDate:n,endDate:o})=>[n||"",o||""]).flat().join("|");return t.html`<time-duration dates="${i}"></time-duration>`}function p(e,i){return i===e?v(i):t.html`${v(e)} – ${i?v(i):"Present"} ${k([{startDate:e,endDate:i}])}`}function S(e=[]){return e.length>0&&t.html`
      <section id="education">
        <h3>Education</h3>
        <div class="stack">
          ${e.map(({area:i,courses:n=[],institution:o,startDate:a,endDate:c,studyType:r,url:l})=>t.html`
              <article>
                <header>
                  <h4>${h(l,o)}</h4>
                  <div class="meta">
                    <div>${[r,i&&t.html`<strong>${i}</strong>`].filter(Boolean).join(" in ")}</div>
                    ${a&&t.html`<div>${p(a,c)}</div>`}
                  </div>
                </header>
                ${n.length>0&&t.html`
                  <h5>Courses</h5>
                  <ul>
                    ${n.map(m=>t.html`<li>${d(m)}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function f(e,i){return(b.icons[e.toLowerCase()]||i&&b.icons[i.toLowerCase()])?.toSvg({width:16,height:16})}const E=e=>Intl.DisplayNames?new Intl.DisplayNames(["en"],{type:"region"}).of(e):e;function O(e={}){const{email:i,image:n,label:o,location:a,name:c,phone:r,profiles:l=[],summary:m,url:u}=e;return t.html`
    <header class="masthead">
      ${n&&t.html`<img src="${n}" alt="" />`}
      <div>${c&&t.html`<h1>${c}</h1>`} ${o&&t.html`<h2>${o}</h2>`}</div>
      ${m&&t.html`<article>${d(m)}</article>`}
      <ul class="icon-list">
        ${a?.city&&t.html`
          <li>
            ${f("map-pin")} ${a.city}${a.countryCode&&t.html`, ${E(a.countryCode)}`}
          </li>
        `}
        ${i&&t.html`
          <li>
            ${f("mail")}
            <a href="mailto:${i}">${i}</a>
          </li>
        `}
        ${r&&t.html`
          <li>
            ${f("phone")}
            <a href="tel:${r.replace(/\s/g,"")}">${r}</a>
          </li>
        `}
        ${u&&t.html`<li>${f("link")} ${h(u)}</li>`}
        ${l.map(({network:$,url:g,username:y})=>t.html`
            <li>
              ${$&&f($,"user")} ${h(g,y)}
              ${$&&t.html`<span class="network">(${$})</span>`}
            </li>
          `)}
      </ul>
    </header>
  `}function A(e=[]){return e.length>0&&t.html`
      <section id="interests">
        <h3>Interests</h3>
        <div class="grid-list">
          ${e.map(({keywords:i=[],name:n})=>t.html`
              <div>
                ${n&&t.html`<h4>${n}</h4>`}
                ${i.length>0&&t.html`
                  <ul class="tag-list">
                    ${i.map(o=>t.html`<li>${o}</li>`)}
                  </ul>
                `}
              </div>
            `)}
        </div>
      </section>
    `}function B(e=[]){return e.length>0&&t.html`
      <section id="languages">
        <h3>Languages</h3>
        <div class="grid-list">
          ${e.map(({fluency:i,language:n})=>t.html`<div>${n&&t.html`<h4>${n}</h4>`} ${i}</div>`)}
        </div>
      </section>
    `}function M(e={}){const{name:i,summary:n}=e;return t.html`
    ${i&&t.html`<title>${i}</title>`}
    ${n&&t.html`<meta name="description" content="${d(n,!0)}" />`}
  `}const F=e=>Intl.ListFormat?new Intl.ListFormat("en").format(e):e.join(", ");function W(e=[]){return e.length>0&&t.html`
      <section id="projects">
        <h3>Projects</h3>
        <div class="stack">
          ${e.map(({description:i,entity:n,highlights:o=[],keywords:a=[],name:c,startDate:r,endDate:l,roles:m=[],type:u,url:$})=>t.html`
              <article>
                <header>
                  <h4>${h($,c)}</h4>
                  <div class="meta">
                    <div>
                      ${m.length>0&&t.html`<strong>${F(m)}</strong>`}
                      ${n&&t.html`at <strong>${n}</strong>`}
                    </div>
                    ${r&&t.html`<div>${p(r,l)}</div>`}
                    ${u&&t.html`<div>${u}</div>`}
                  </div>
                </header>
                ${i&&d(i)}
                ${o.length>0&&t.html`
                  <ul>
                    ${o.map(g=>t.html`<li>${d(g)}</li>`)}
                  </ul>
                `}
                ${a.length>0&&t.html`
                  <ul class="tag-list">
                    ${a.map(g=>t.html`<li>${g}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function H(e=[]){return e.length>0&&t.html`
      <section id="publications">
        <h3>Publications</h3>
        <div class="stack">
          ${e.map(({name:i,publisher:n,releaseDate:o,summary:a,url:c})=>t.html`
              <article>
                <header>
                  <h4>${h(c,i)}</h4>
                  <div class="meta">
                    ${n&&t.html`<div>Published by <strong>${n}</strong></div>`}
                    ${o&&v(o)}
                  </div>
                </header>
                ${a&&d(a)}
              </article>
            `)}
        </div>
      </section>
    `}function N(e=[]){return e.length>0&&t.html`
      <section id="references">
        <h3>References</h3>
        <div class="stack">
          ${e.map(({name:i,reference:n})=>t.html`
              <blockquote>
                ${n&&d(n)}
                ${i&&t.html`
                  <p>
                    <cite>${i}</cite>
                  </p>
                `}
              </blockquote>
            `)}
        </div>
      </section>
    `}function U(e=[]){return e.length>0&&t.html`
      <section id="skills">
        <h3>Skills</h3>
        <div class="grid-list">
          ${e.map(({keywords:i=[],name:n})=>t.html`
              <div>
                ${n&&t.html`<h4>${n}</h4>`}
                ${i.length>0&&t.html`
                  <ul class="tag-list">
                    ${i.map(o=>t.html`<li>${o}</li>`)}
                  </ul>
                `}
              </div>
            `)}
        </div>
      </section>
    `}function V(e=[]){return e.length>0&&t.html`
      <section id="volunteer">
        <h3>Volunteer</h3>
        <div class="stack">
          ${e.map(({highlights:i=[],organization:n,position:o,startDate:a,endDate:c,summary:r,url:l})=>t.html`
              <article>
                <header>
                  <h4>${h(l,n)}</h4>
                  <div class="meta">
                    <strong>${o}</strong>
                    ${a&&t.html`<div>${p(a,c)}</div>`}
                  </div>
                </header>
                ${r&&d(r)}
                ${i.length>0&&t.html`
                  <ul>
                    ${i.map(m=>t.html`<li>${d(m)}</li>`)}
                  </ul>
                `}
              </article>
            `)}
        </div>
      </section>
    `}function Y(e=[]){const i=e.reduce((n,{description:o,name:a,url:c,...r})=>{const l=n[n.length-1];return l&&l.name===a&&l.description===o&&l.url===c?l.items.push(r):n.push({description:o,name:a,url:c,items:[r]}),n},[]);return e.length>0&&t.html`
      <section id="work">
        <h3>Work</h3>
        <div class="stack">
          ${i.map(({description:n,name:o,url:a,items:c=[]})=>{const r=c.length===1?c[0]:void 0;return t.html`
              <article>
                <header>
                  <h4>${r?r.position:h(a,o)}</h4>
                  <div class="meta">
                    ${r?t.html`
                          <div>
                            ${[t.html`<strong>${h(a,o)}</strong>`,n].filter(Boolean).join(" · ")}
                          </div>
                          ${r.startDate&&t.html`<div>${p(r.startDate,r.endDate)}</div>`}
                          ${r.location&&t.html`<div>${r.location}</div>`}
                        `:t.html`
                          ${n&&t.html`<div>${n}</div>`}
                          ${c.some(l=>l.startDate)&&t.html`<div>${k(c)}</div>`}
                        `}
                  </div>
                </header>
                <div class="timeline">
                  ${c.map(({highlights:l=[],location:m,position:u,startDate:$,endDate:g,summary:y})=>t.html`
                      <div>
                        ${!r&&t.html`
                          <div>
                            <h5>${u}</h5>
                            <div class="meta">
                              ${$&&t.html`<div>${p($,g)}</div>`}
                              ${m&&t.html`<div>${m}</div>`}
                            </div>
                          </div>
                        `}
                        ${y&&d(y)}
                        ${l.length>0&&t.html`
                          <ul>
                            ${l.map(J=>t.html`<li>${d(J)}</li>`)}
                          </ul>
                        `}
                      </div>
                    `)}
                </div>
              </article>
            `})}
        </div>
      </section>
    `}function Z(e,{css:i,js:n}={}){return t.html`<!doctype html>
    <html lang="en" style="${C(e.meta)}">
      <head>
        <meta charset="utf-8" />
        ${M(e.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        ${i&&t.html`<style>
          ${i}
        </style>`}
        ${n&&t.html(D||(D=w([`<script type="module">
          `,`
        <\/script>`])),n)}
      </head>
      <body>
        ${O(e.basics)} ${Y(e.work)} ${V(e.volunteer)} ${S(e.education)}
        ${W(e.projects)} ${q(e.awards)} ${R(e.certificates)}
        ${H(e.publications)} ${U(e.skills)} ${B(e.languages)}
        ${A(e.interests)} ${N(e.references)}
      </body>
    </html>`}const _={mediaType:"print",printBackground:!0},G=e=>Z(e,{css:T,js:L});s.pdfRenderOptions=_,s.render=G,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})}));
