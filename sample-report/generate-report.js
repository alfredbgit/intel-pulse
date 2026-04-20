const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const CUSTOMER_SLUG = 'a-plus-japanese-auto-repair';
const REPORT_DATE = '2026-04-12';
const REPORT_DATE_FRIENDLY = 'April 12, 2026';

const base = '/Users/alfredbutler/Projects/alfreds-lair/staff/logan/ventures/intel-pulse/reports/a-plus-japanese-auto-repair';
const outDir = '/Users/alfredbutler/Projects/alfreds-apps/intel-pulse/reports';

const load = (file) => JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));
const cover = load('report-01-cover.json');
const landscape = load('report-02-landscape.json');
const pricing = load('report-03-pricing.json');
const reviews = load('report-04-reviews.json');
const seo = load('report-05-seo.json');
const social = load('report-06-social.json');
const findings = load('report-07-findings.json');
const roadmap = load('report-08-roadmap.json');

function esc(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function link(href, text) {
  if (!href) return `<span class="no-link">${text}</span>`;
  return `<a href="${href}" target="_blank">${text}</a>`;
}
function linkBtn(href, label) {
  if (!href) return '';
  return ` <a href="${href}" target="_blank" class="ext-label">${label}</a>`;
}
function typeBadge(type) {
  const m = { Chain:'badge-chain', Independent:'badge-indie', Specialist:'badge-specialist', Dealership:'badge-dealership', Franchise:'badge-chain' };
  return `<span class="badge ${m[type]||'badge-chain'}">${esc(type||'Chain')}</span>`;
}
function threatLabel(t) {
  if (t==='HIGH') return '<span class="threat-high">HIGH</span>';
  if (t==='MEDIUM') return '<span class="threat-medium">MEDIUM</span>';
  return '<span class="threat-low">LOW</span>';
}
function speedBadge(s) {
  if (s==='quick') return '<span class="speed-badge speed-quick">Quick</span>';
  if (s==='medium') return '<span class="speed-badge speed-medium">Medium</span>';
  return '<span class="speed-badge speed-long">Long</span>';
}
function presencePill(p) {
  if (p==='active') return '<span class="presence-pill presence-active">Active</span>';
  if (p==='dormant') return '<span class="presence-pill presence-dormant">Dormant</span>';
  return '<span class="presence-pill presence-absent">Absent</span>';
}
function priorityPill(p) {
  if (p==='high') return '<span class="priority-high-label">HIGH</span>';
  if (p==='medium') return '<span class="priority-med-label">MED</span>';
  return '<span class="priority-low-label">LOW</span>';
}

const competitors = landscape.competitors;
const compMap = {};
competitors.forEach(c => { compMap[c.name] = c; });

const PAGE_BOTTOM = `<div class="page-bottom-bar"><span>IntelPulse · Confidential · For ${esc(cover.business_name)} internal use only</span><span>PN</span></div>`;

// ── PAGE 1 ──
const overviewRows = competitors.map(c => {
  const webLink = c.urls && c.urls.website ? link(c.urls.website, c.name) : esc(c.name);
  const gLink = linkBtn(c.urls && c.urls.google_maps, 'Maps');
  const total = c.total_reviews ? c.total_reviews.toLocaleString() : '—';
  return `<tr>
    <td><span class="comp-name">${webLink}</span><br><span class="comp-tagline">${esc(c.address)}</span>${gLink}</td>
    <td>${typeBadge(c.type)}</td>
    <td style="font-size:7pt;">${esc(c.key_differentiator||'—')}</td>
    <td>${threatLabel(c.threat)}</td>
    <td>${c.google_rating?c.google_rating+'★':'—'} / ${c.yelp_rating?c.yelp_rating+'★':'—'}<br><span style="font-size:6pt;color:var(--text-muted)">${total} total reviews</span></td>
  </tr>`;
}).join('');

const compCards = competitors.slice(0,6).map(c => {
  const gLink = linkBtn(c.urls && c.urls.google_maps, 'Google Maps');
  const yLink = linkBtn(c.urls && c.urls.yelp, 'Yelp');
  return `<div class="comp-card no-break">
    <div class="comp-card-header">
      <div>
        <div class="comp-card-name">${link(c.urls&&c.urls.website,c.name)||esc(c.name)}</div>
        <div class="comp-card-tagline">${esc(c.address)}</div>
      </div>
      ${typeBadge(c.type)}
    </div>
    <div class="comp-card-body">
      <div class="comp-field">
        <div class="comp-field-label">Google Rating</div>
        <div class="comp-field-value">${c.google_rating?c.google_rating+'★ ('+c.google_review_count?.toLocaleString()+' reviews)':'No data'}</div>
      </div>
      <div class="comp-field">
        <div class="comp-field-label">Yelp Rating</div>
        <div class="comp-field-value">${c.yelp_rating?c.yelp_rating+'★ ('+c.yelp_review_count?.toLocaleString()+' reviews)':'No data'}</div>
      </div>
      <div class="comp-field">
        <div class="comp-field-label">Key Strength</div>
        <div class="comp-field-value strength-value">${esc(c.key_differentiator?c.key_differentiator.split('—')[0].trim():'—')}</div>
      </div>
      <div class="comp-field">
        <div class="comp-field-label">Opportunity for A+</div>
        <div class="comp-field-value opp-value">${esc(c.key_differentiator&&c.key_differentiator.includes('—')?c.key_differentiator.split('—')[1].trim():'Monitor this competitor')}</div>
      </div>
    </div>
  </div>`;
}).join('');

const page1 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span><span>Competitors: <strong>${competitors.length} tracked</strong></span><span>Market: <strong>${esc(cover.location)}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Executive Summary</p>
    <h1 class="page-title">Auto Repair Competitive Landscape</h1>
    <p class="page-subtitle">${esc(cover.location)} — ${competitors.length}-competitor intelligence brief for ${esc(cover.business_name)}. Data collected ${REPORT_DATE_FRIENDLY}.</p>
    <div class="metrics-bar">
      <div class="metric-item"><div class="metric-label">Competitors Tracked</div><div class="metric-value">${competitors.length}</div><div class="metric-sub">10-market scan</div></div>
      <div class="metric-item"><div class="metric-label">High-Threat Competitors</div><div class="metric-value">${landscape.summary.high_threat}</div><div class="metric-sub">Requires attention</div></div>
      <div class="metric-item"><div class="metric-label">Top Opportunity</div><div class="metric-value" style="font-size:8pt;line-height:1.4;padding-top:2px;">"Japanese Specialist"</div><div class="metric-sub">No competitor owns it</div></div>
    </div>
    <div class="exec-summary-box">${esc(cover.executive_summary_paragraph||'Executive summary pending.')}</div>
    <p class="section-label">Competitor Overview</p>
    <div class="overview-table-wrap">
      <table class="overview-table">
        <thead><tr><th>Competitor</th><th>Type</th><th>Key Differentiator</th><th>Threat</th><th>Rating / Reviews</th></tr></thead>
        <tbody>${overviewRows}</tbody>
      </table>
    </div>
    <p class="section-label" style="margin-top:0;">Competitor Profiles</p>
    <div class="section-header"><h2>Full Competitor Breakdowns</h2><span class="section-sub">Google/Yelp ratings, locations, and competitive threat levels</span></div>
    <div class="competitor-grid">${compCards}</div>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 1')}
</div>`;

// ── PAGE 2 ──
const promoCompetitors = pricing.competitors.filter(c => c.has_promotions);
const promoRows = promoCompetitors.map(c => {
  const promos = c.promotions.map(p => {
    const pLink = p.source_url ? ` <a href="${p.source_url}" target="_blank" class="ext-label">Link</a>` : '';
    return `<div style="margin-bottom:3px;">• ${esc(p.description)}${pLink}</div>`;
  }).join('');
  return `<tr><td class="shop-name">${esc(c.name)}</td><td>${typeBadge(compMap[c.name]?.type||'Chain')}</td><td style="font-size:7pt;">${promos||'No active promotions found'}</td></tr>`;
}).join('');

const pricingInsights = `<div class="analysis-grid">
  <div class="analysis-card"><h3>Market Pricing Pattern</h3><ul>
    <li>${esc(pricing.promo_summary||'Most competitors use quote-required pricing.')}</li>
    <li>${esc(pricing.market_opportunity?.gap_service||'Full-service menu pricing is a first-mover opportunity.')}</li>
  </ul></div>
  <div class="analysis-card"><h3>Active Promotions</h3><ul>
    ${promoCompetitors.length>0?promoCompetitors.map(c=>`<li><strong>${esc(c.name)}:</strong> ${c.promotions.length} active promo${linkBtn(c.promotions[0]?.source_url,'Details')||''}</li>`).join(''):'<li>No active promotions found across competitors.</li>'}
  </ul></div>
</div>`;

const page2 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Pricing &amp; Promotions</p>
    <div class="section-header"><h2>Competitor Pricing &amp; Promotions</h2><span class="section-sub">Market-wide pricing patterns and active promotions</span></div>
    ${pricingInsights}
    <div class="opp-callout"><div class="opp-callout-label">Opportunity for ${esc(cover.business_name)}</div><p>${esc(pricing.market_opportunity?.opportunity_note||'No competitor publishes pricing for transmission or major repair. First-mover advantage for transparent menu pricing.')}</p></div>
    <p class="section-label">Active Promotions Tracker</p>
    <table class="pricing-matrix"><thead><tr><th>Shop</th><th>Type</th><th>Active Promotions</th></tr></thead><tbody>${promoRows||<tr><td colspan="3" style="font-size:7pt;color:var(--text-muted);padding:8px;">No competitors have active published promotions.</td></tr>}</tbody></table>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 2')}
</div>`;

// ── PAGE 3 ──
const revCompRows = reviews.competitors.filter(r => r.total_reviews_analyzed > 0).slice(0,8).map(r => {
  const comp = compMap[r.name] || {};
  const yLink = linkBtn(comp.urls && comp.urls.yelp, 'Yelp');
  const gLink = linkBtn(comp.urls && comp.urls.google_maps, 'Maps');
  return `<tr>
    <td class="shop-name">${esc(r.name)}</td>
    <td>${r.rating_label ? `<span class="rating-pill ${r.rating_label.includes('positive')?'rating-pos':r.rating_label.includes('negative')||r.rating_label==='mixed'?'rating-neg':'rating-mixed'}">${r.rating_label.replace(/_/g,' ')}</span>` : '—'}</td>
    <td>${r.total_reviews_analyzed}</td>
    <td>${r.top_praise_themes&&r.top_praise_themes[0]?esc(r.top_praise_themes[0].theme):'—'}</td>
    <td>${r.top_complaint_themes&&r.top_complaint_themes[0]?esc(r.top_complaint_themes[0].theme):'—'}</td>
    <td>${r.price_sentiment?.net_sentiment||'—'}</td>
    <td>${yLink}${gLink?' ':''}${gLink}</td>
  </tr>`;
}).join('');

const marketPraise = reviews.market_sentiment?.top_praise_across_all?.map(p => `<li>${esc(p.theme)} <span style="font-size:5.5pt;color:var(--text-muted)">(${p.frequency})</span></li>`).join('')||'';
const marketComplaints = reviews.market_sentiment?.market_wide_complaints?.map(c => `<li>${esc(c.theme)} <span style="font-size:5.5pt;color:var(--text-muted)">(${c.frequency})</span></li>`).join('')||'';

const page3 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Review Sentiment Analysis</p>
    <div class="section-header"><h2>Customer Review Intelligence</h2><span class="section-sub">${reviews.total_reviews_analyzed} reviews analyzed across ${reviews.total_competitors_analyzed} competitors</span></div>
    <div class="review-themes-grid">
      <div class="review-theme-card"><h3 style="color:var(--green);">Top Praise Themes (Market-Wide)</h3><ul>${marketPraise||'<li>Data pending</li>'}</ul></div>
      <div class="review-theme-card"><h3 style="color:var(--red);">Top Complaint Themes (Market-Wide)</h3><ul>${marketComplaints||'<li>Data pending</li>'}</ul></div>
    </div>
    <p class="section-label">Competitor Sentiment Table</p>
    <table class="sentiment-table"><thead><tr><th>Competitor</th><th>Sentiment</th><th>Reviews Analyzed</th><th>Top Praise</th><th>Top Complaint</th><th>Price Sentiment</th><th>Links</th></tr></thead><tbody>${revCompRows||<tr><td colspan="7" style="padding:10px;font-size:7pt;color:var(--text-muted);">No review data available.</td></tr>}</tbody></table>
    ${reviews.ownable_gaps&&reviews.ownable_gaps.length>0?`<p class="section-label">Ownable Gaps</p>`+reviews.ownable_gaps.map(g=>`<div class="opp-callout"><div class="opp-callout-label">Gap Identified</div><p><strong>${esc(g.gap)}</strong> — ${esc(g.opportunity)}</p></div>`).join(''):''}
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 3')}
</div>`;

// ── PAGE 4 ──
const actionInsights = reviews.actionable_insights||[];
const actionCards = actionInsights.map((ins,i) => `<div class="analysis-card"><h3>Insight ${i+1}</h3><ul><li><strong>${esc(ins.insight)}</strong></li><li style="font-size:7pt;color:var(--text-muted);">${esc(ins.implication)}</li></ul></div>`).join('');

const pricePosQuotes = reviews.market_sentiment?.price_sentiment_summary?.price_positive_quotes||[];
const priceNegQuotes = reviews.market_sentiment?.price_sentiment_summary?.price_negative_quotes||[];
const priceQuotes = `<div class="analysis-grid">
  <div class="analysis-card"><h3 style="color:var(--green);">Price Praise Quotes</h3><ul>${pricePosQuotes.length?pricePosQuotes.map(q=>`<li>"${esc(q.substring(0,120))}..."</li>`).join(''):'<li>No quotes available.</li>'}</ul></div>
  <div class="analysis-card"><h3 style="color:var(--red);">Price Complaint Quotes</h3><ul>${priceNegQuotes.length?priceNegQuotes.map(q=>`<li>"${esc(q.substring(0,120))}..."</li>`).join(''):'<li>No quotes available.</li>'}</ul></div>
</div>`;

const page4 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Review Sentiment — Deeper Analysis</p>
    <div class="section-header"><h2>Actionable Review Insights</h2><span class="section-sub">What customers say and what it means for ${esc(cover.business_name)}</span></div>
    ${actionCards||'<p style="font-size:7pt;color:var(--text-muted);">Insights pending.</p>'}
    <p class="section-label">Price Sentiment Sample Quotes</p>
    ${priceQuotes}
    <div class="gap-note">Source: Yelp + Google reviews analyzed across ${reviews.total_competitors_analyzed} competitors. ${reviews.market_sentiment?.price_sentiment_summary?.percent_positive||'?'}% of price mentions were positive.</div>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 4')}
</div>`;

// ── PAGE 5 ──
const gbRows = seo.google_presence_ranking.slice(0,8).map(g => {
  const comp = compMap[g.name]||{};
  const gLink = linkBtn(comp.urls&&comp.urls.google_maps,'Maps');
  return `<tr>
    <td>${g.rank}</td>
    <td class="shop-name">${esc(g.name)}</td>
    <td>${g.google_presence}</td>
    <td>${g.google_rating?g.google_rating+'★':'—'}</td>
    <td>${g.google_reviews?.toLocaleString()||'—'}</td>
    <td>${g.local_pack_observed?'<span style="color:var(--green);font-size:7pt;font-weight:700;">Yes</span>':'<span style="color:var(--text-muted);font-size:7pt;">No</span>'}</td>
    <td>${gLink}</td>
  </tr>`;
}).join('');

const localPackRows = seo.local_pack_summary.map(lp => {
  const observed = lp.competitors_observed_in_pack.length > 0 ? lp.competitors_observed_in_pack.join(', ') : 'None';
  const opportunities = lp.open_terms && lp.open_terms.length > 0 ? lp.open_terms.join(', ') : '—';
  return `<tr>
    <td style="font-size:7pt;font-weight:600;">${esc(lp.search_term)}</td>
    <td style="font-size:7pt;">${esc(observed)}</td>
    <td style="font-size:7pt;color:var(--green);">${esc(opportunities)}</td>
  </tr>`;
}).join('');

const citationRows = seo.citation_gaps.map(cg => {
  return `<tr>
    <td class="shop-name">${esc(cg.directory)}</td>
    <td>${priorityPill(cg.priority)}</td>
    <td style="font-size:7pt;">${esc(cg.note||'—')}</td>
  </tr>`;
}).join('');

const quickWinRows = (seo.quick_wins_for_customer||[]).map(qw => {
  return `<tr>
    <td class="shop-name">${esc(qw.action)}</td>
    <td style="font-size:7pt;">${esc(qw.timeframe)}</td>
    <td style="font-size:7pt;">${esc(qw.expected_impact)}</td>
  </tr>`;
}).join('');

const page5 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">SEO &amp; Discovery</p>
    <div class="section-header"><h2>Search &amp; Citation Analysis</h2><span class="section-sub">Google presence ranking, local pack opportunities, and citation gaps</span></div>
    <p class="section-label">Google Presence Ranking</p>
    <table class="seo-table"><thead><tr><th>#</th><th>Competitor</th><th>Presence</th><th>Rating</th><th>Reviews</th><th>Local Pack?</th><th>Maps</th></tr></thead><tbody>${gbRows}</tbody></table>
    <p class="section-label">Local Pack Opportunities</p>
    <table class="seo-table"><thead><tr><th>Search Term</th><th>Competitors in Pack</th><th>Open Terms / Opportunity</th></tr></thead><tbody>${localPackRows}</tbody></table>
    <div class="opp-callout"><div class="opp-callout-label">SEO Opportunity</div><p>${seo.seo_opportunities&&seo.seo_opportunities[0]?esc(seo.seo_opportunities[0].competitor_weakness)+' — '+esc(seo.seo_opportunities[0].opportunity):'No competitor owns the "Japanese auto repair" local search term.'}</p></div>
    <p class="section-label">Citation Gaps</p>
    <table class="citation-table"><thead><tr><th>Directory</th><th>Priority</th><th>Note</th></tr></thead><tbody>${citationRows}</tbody></table>
    <p class="section-label">Quick Wins</p>
    <table class="metrics-table"><thead><tr><th>Action</th><th>Timeframe</th><th>Expected Impact</th></tr></thead><tbody>${quickWinRows}</tbody></table>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 5')}
</div>`;

// ── PAGE 6 ──
const socialRows = social.competitors.slice(0,8).map(s => {
  const fbLink = s.facebook_url ? link(s.facebook_url, 'Facebook') : '<span class="no-link">—</span>';
  const igNote = social.uncontested_platforms?.find(u => u.platform==='Instagram') ? 'Instagram: Uncontested' : '';
  return `<tr>
    <td class="shop-name">${esc(s.name)}</td>
    <td>${presencePill(s.presence)}</td>
    <td>${fbLink}</td>
    <td style="font-size:6.5pt;">${s.followers?s.followers.toLocaleString():'—'}</td>
  </tr>`;
}).join('');

const dormantRows = (social.dormant_competitors||[]).map(d => {
  const fbLink = d.facebook_url ? link(d.facebook_url,'Facebook') : '—';
  return `<tr><td class="shop-name">${esc(d.name)}</td><td>${fbLink}</td><td style="font-size:7pt;color:var(--amber);">Dormant — not posting</td></tr>`;
}).join('');

const page6 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Social Media</p>
    <div class="section-header"><h2>Social Media Landscape</h2><span class="section-sub">All 10 competitors — zero active social media presence detected</span></div>
    <div class="opp-callout"><div class="opp-callout-label">Opportunity — Social Media is Completely Uncontested</div><p>${esc(social.market_pattern||'No competitor has active social media. A+ can establish clear dominance.')}</p></div>
    <p class="section-label">Competitor Social Presence</p>
    <table class="social-table"><thead><tr><th>Competitor</th><th>Status</th><th>Facebook</th><th>Followers</th></tr></thead><tbody>${socialRows||'<tr><td colspan="4" style="font-size:7pt;padding:8px;">No data available.</td></tr>'}</tbody></table>
    ${dormantRows?`<p class="section-label">Dormant Competitors</p><table class="social-table"><thead><tr><th>Competitor</th><th>Facebook</th><th>Status</th></tr></thead><tbody>${dormantRows}</tbody></table>`:''}
    ${social.uncontested_platforms&&social.uncontested_platforms.length>0?`<div class="analysis-grid" style="margin-top:10px;">${social.uncontested_platforms.map(p=>`<div class="analysis-card"><h3>${esc(p.platform)} — Uncontested</h3><ul><li>${esc(p.note)}</li></ul></div>`).join('')}</div>`:''}
    <p class="section-label">Social Opportunities</p>
    ${(social.social_opportunities||[]).slice(0,2).map(opp => `<div class="opp-callout"><div class="opp-callout-label">Opportunity</div><p><strong>${esc(opp.competitor_weakness)}</strong> — ${esc(opp.opportunity)}</p></div>`).join('')}
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 6')}
</div>`;

// ── PAGE 7 ──
const findingsCards = (findings.findings||[]).map(f => {
  return `<div class="finding-card">
    <div class="finding-header">
      <div class="finding-rank">${f.rank}</div>
      <div class="finding-title">${esc(f.title||'Untitled Finding')}</div>
      ${speedBadge(f.speed)}
    </div>
    <div class="finding-insight">${esc(f.insight||'')}</div>
    <div class="finding-why"><strong>Why it matters:</strong> ${esc(f.why_it_matters||'')}</div>
    <div class="finding-action"><strong>Action:</strong> ${esc(f.specific_action||'')}</div>
  </div>`;
}).join('');

const page7 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Key Findings</p>
    <h1 class="page-title">Top 5 Actionable Findings</h1>
    <p class="page-subtitle">Prioritized by competitive impact and speed to execute — based on all 6 research modules</p>
    <div class="findings-grid">${findingsCards||'<p style="font-size:7pt;color:var(--text-muted);">Findings pending.</p>'}</div>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 7')}
</div>`;

// ── PAGE 8 ──
function buildWeek(weekData, weekNum) {
  if (!weekData) return `<div class="roadmap-week"><div class="roadmap-week-header">Week ${weekNum}</div><div class="roadmap-week-body"><p style="font-size:7pt;color:var(--text-muted);">Data pending.</p></div></div>`;
  const actions = (weekData.actions||[]).map((a,i) => `
    <div class="roadmap-action">
      <div class="roadmap-action-num">${i+1}</div>
      <div><strong>${esc(a.action)}</strong>${a.deliverable?`<br><span style="color:var(--text-muted)">Deliverable: ${esc(a.deliverable)}</span>`:''}</div>
    </div>`).join('');
  return `<div class="roadmap-week">
    <div class="roadmap-week-header">Week ${weekNum} — ${esc(weekData.theme||'TBD')}</div>
    <div class="roadmap-week-body">${actions}</div>
  </div>`;
}

const weeksHtml = [1,2,3,4].map((w,i) => {
  const wd = roadmap[`week_${w}`]||null;
  return buildWeek(wd, w);
}).join('');

const month1Rows = (roadmap.month_1_metrics||[]).map(m => `<tr><td class="shop-name">${esc(m.metric)}</td><td style="font-size:7pt;">${esc(m.target)}</td><td style="font-size:7pt;color:var(--text-muted);">${esc(m.source_finding||'')}</td></tr>`).join('');

const month2Rows = (roadmap.month_2_lookahead||[]).map((m,i) => `<div class="lookahead-item"><div class="lookahead-icon">${i+1}</div><div><strong>${esc(m.action)}</strong><br><span style="font-size:6.5pt;color:var(--text-muted);">${esc(m.details||'')}</span></div></div>`).join('');

const page8 = `<div class="page">
  <div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel · ${esc(cover.location)} Market · ${REPORT_DATE_FRIENDLY}</div></div>
  <div class="meta-bar">
    <div class="client-name">Client: ${esc(cover.business_name)} · ${esc(cover.location)}</div>
    <div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div>
  </div>
  <div class="body">
    <p class="section-label">Implementation Roadmap</p>
    <h1 class="page-title">30-Day Action Roadmap</h1>
    <p class="page-subtitle">Week-by-week execution plan for ${esc(cover.business_name)}</p>
    <div class="roadmap-grid">${weeksHtml}</div>
    <p class="section-label">Month 1 Success Metrics</p>
    <table class="metrics-table"><thead><tr><th>Metric</th><th>Target</th><th>Source</th></tr></thead><tbody>${month1Rows||<tr><td colspan="3" style="font-size:7pt;padding:8px;">Metrics pending.</td></tr>}</tbody></table>
    <p class="section-label">Month 2 Lookahead</p>
    <div class="lookahead-grid">${month2Rows||<p style="font-size:7pt;color:var(--text-muted);">Month 2 plan pending.</p>}</div>
  </div>
  ${PAGE_BOTTOM.replace('PN','Page 8')}
</div>`;

// ── ASSEMBLE FULL HTML ──
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Competitive Intel Report — ${esc(cover.business_name)} | IntelPulse</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@700;900&display=swap" rel