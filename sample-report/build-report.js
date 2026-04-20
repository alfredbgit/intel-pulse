#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CUSTOMER_SLUG = 'a-plus-japanese-auto-repair';
const REPORT_DATE_FRIENDLY = 'April 12, 2026';

const base = '/Users/alfredbutler/Projects/alfreds-lair/staff/logan/ventures/intel-pulse/reports/a-plus-japanese-auto-repair';
const outDir = '/Users/alfredbutler/Projects/alfreds-apps/intel-pulse/reports';
const tmplPath = '/Users/alfredbutler/Projects/alfreds-apps/intel-pulse/sample-report/index.html';

fs.mkdirSync(outDir, { recursive: true });

const load = f => JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));
const cover = load('report-01-cover.json');
const landscape = load('report-02-landscape.json');
const pricing = load('report-03-pricing.json');
const reviews = load('report-04-reviews.json');
const seo = load('report-05-seo.json');
const social = load('report-06-social.json');
const findings = load('report-07-findings.json');
const roadmap = load('report-08-roadmap.json');

const LOC = cover.location || 'Redwood City, CA';

function esc(s) { if (s == null) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function lnk(href, text) { if (!href) return `<span class="no-link">${text}</span>`; return `<a href="${href}" target="_blank">${text}</a>`; }
function btn(href, lbl) { if (!href) return ''; return ` <a href="${href}" target="_blank" class="ext-label">${lbl}</a>`; }
function tbg(t) { const m = {Chain:'badge-chain',Independent:'badge-indie',Specialist:'badge-specialist',Dealership:'badge-dealership',Franchise:'badge-chain'}; return `<span class="badge ${m[t]||'badge-chain'}">${esc(t||'Chain')}</span>`; }
function tl(t) { if (t==='HIGH') return '<span class="threat-high">HIGH</span>'; if (t==='MEDIUM') return '<span class="threat-medium">MEDIUM</span>'; return '<span class="threat-low">LOW</span>'; }
function sb(s) { if (s==='quick') return '<span class="speed-badge speed-quick">Quick</span>'; if (s==='medium') return '<span class="speed-badge speed-medium">Medium</span>'; return '<span class="speed-badge speed-long">Long</span>'; }
function pp(p) { if (p==='high') return '<span class="priority-high-label">HIGH</span>'; if (p==='medium') return '<span class="priority-med-label">MED</span>'; return '<span class="priority-low-label">LOW</span>'; }
function pres(p) { if (p==='active') return '<span class="presence-pill presence-active">Active</span>'; if (p==='dormant') return '<span class="presence-pill presence-dormant">Dormant</span>'; return '<span class="presence-pill presence-absent">Absent</span>'; }
function rat(l) { if (!l) return ''; if (l.includes('positive') && !l.includes('negative')) return `<span class="rating-pill rating-pos">${l.replace(/_/g,' ')}</span>`; if (l==='mixed') return '<span class="rating-pill rating-mixed">mixed</span>'; if (l.includes('negative')) return `<span class="rating-pill rating-neg">${l.replace(/_/g,' ')}</span>`; return `<span class="rating-pill rating-mixed">${l.replace(/_/g,' ')}</span>`; }

const competitors = landscape.competitors;
const compMap = {}; competitors.forEach(c => { compMap[c.name] = c; });
const PB = `<div class="page-bottom-bar"><span>IntelPulse \xb7 Confidential \xb7 For ${esc(cover.business_name)} internal use only</span><span>PN</span></div>`;

// ─── PAGE 1 ───────────────────────────────────────────────────────────────────
const ovRows = competitors.map(c => {
  const wl = c.urls && c.urls.website ? lnk(c.urls.website, c.name) : esc(c.name);
  const gl = btn(c.urls && c.urls.google_maps, 'Maps');
  const tot = c.total_reviews ? c.total_reviews.toLocaleString() : '\u2014';
  return `<tr><td><span class="comp-name">${wl}</span><br><span class="comp-tagline">${esc(c.address)}</span>${gl}</td><td>${tbg(c.type)}</td><td style="font-size:7pt;">${esc(c.key_differentiator||'\u2014')}</td><td>${tl(c.threat)}</td><td>${c.google_rating?c.google_rating+'\u2605':'--'} / ${c.yelp_rating?c.yelp_rating+'\u2605':'--'}<br><span style="font-size:6pt;color:var(--text-muted)">${tot} total reviews</span></td></tr>`;
}).join('');

const cc = competitors.slice(0,6).map(c => {
  const str = (c.key_differentiator && c.key_differentiator.includes('\u2014')) ? c.key_differentiator.split('\u2014')[0].trim() : '\u2014';
  const opp = (c.key_differentiator && c.key_differentiator.includes('\u2014')) ? c.key_differentiator.split('\u2014')[1].trim() : 'Monitor this competitor';
  return `<div class="comp-card no-break"><div class="comp-card-header"><div><div class="comp-card-name">${c.urls && c.urls.website ? lnk(c.urls.website, c.name) : esc(c.name)}</div><div class="comp-card-tagline">${esc(c.address)}</div></div>${tbg(c.type)}</div><div class="comp-card-body"><div class="comp-field"><div class="comp-field-label">Google Rating</div><div class="comp-field-value">${c.google_rating ? c.google_rating+'\u2605 ('+c.google_review_count?.toLocaleString()+' reviews)' : 'No data'}</div></div><div class="comp-field"><div class="comp-field-label">Yelp Rating</div><div class="comp-field-value">${c.yelp_rating ? c.yelp_rating+'\u2605 ('+c.yelp_review_count?.toLocaleString()+' reviews)' : 'No data'}</div></div><div class="comp-field"><div class="comp-field-label">Key Strength</div><div class="comp-field-value strength-value">${esc(str)}</div></div><div class="comp-field"><div class="comp-field-label">Opportunity for A+</div><div class="comp-field-value opp-value">${esc(opp)}</div></div></div></div>`;
}).join('');

const pg1 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span><span>Competitors: <strong>${competitors.length} tracked</strong></span><span>Market: <strong>${esc(LOC)}</strong></span></div></div><div class="body"><p class="section-label">Executive Summary</p><h1 class="page-title">Auto Repair Competitive Landscape</h1><p class="page-subtitle">${esc(LOC)} \u2014 ${competitors.length}-competitor intelligence brief for ${esc(cover.business_name)}. Data collected ${REPORT_DATE_FRIENDLY}.</p><div class="metrics-bar"><div class="metric-item"><div class="metric-label">Competitors Tracked</div><div class="metric-value">${competitors.length}</div><div class="metric-sub">full-market scan</div></div><div class="metric-item"><div class="metric-label">High-Threat Competitors</div><div class="metric-value">${landscape.summary.high_threat}</div><div class="metric-sub">requires attention</div></div><div class="metric-item"><div class="metric-label">Top Opportunity</div><div class="metric-value" style="font-size:8pt;line-height:1.4;padding-top:2px;">"Japanese Specialist"</div><div class="metric-sub">no competitor owns it</div></div></div><div class="exec-summary-box">${esc(cover.executive_summary_paragraph||'Executive summary pending.')}</div><p class="section-label">Competitor Overview</p><div class="overview-table-wrap"><table class="overview-table"><thead><tr><th>Competitor</th><th>Type</th><th>Key Differentiator</th><th>Threat</th><th>Rating / Reviews</th></tr></thead><tbody>${ovRows}</tbody></table></div><p class="section-label" style="margin-top:0;">Competitor Profiles</p><div class="section-header"><h2>Full Competitor Breakdowns</h2><span class="section-sub">Google/Yelp ratings, locations, and competitive threat levels</span></div><div class="competitor-grid">${cc}</div></div>${PB.replace('PN','Page 1')}</div>`;

// ─── PAGE 2 ───────────────────────────────────────────────────────────────────
const promoComps = pricing.competitors.filter(c => c.has_promotions);
const promoRows = promoComps.map(c => {
  const ps = c.promotions.map(p => {
    const pl = p.source_url ? ` <a href="${p.source_url}" target="_blank" class="ext-label">Link</a>` : '';
    return `<div style="margin-bottom:3px;">\u25cf ${esc(p.description)}${pl}</div>`;
  }).join('');
  return `<tr><td class="shop-name">${esc(c.name)}</td><td>${tbg(compMap[c.name]?.type||'Chain')}</td><td style="font-size:7pt;">${ps}</td></tr>`;
}).join('');

const pg2 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Pricing &amp; Promotions</p><div class="section-header"><h2>Competitor Pricing &amp; Promotions</h2><span class="section-sub">Market-wide pricing patterns and active promotions</span></div><div class="analysis-grid"><div class="analysis-card"><h3>Market Pricing Pattern</h3><ul><li>${esc(pricing.promo_summary||'Most competitors use quote-required pricing.')}</li><li>${esc(pricing.market_opportunity?.gap_service||'Full-service menu pricing is a first-mover opportunity.')}</li></ul></div><div class="analysis-card"><h3>Active Promotions</h3><ul>${promoComps.length > 0 ? promoComps.map(c => `<li><strong>${esc(c.name)}:</strong> ${c.promotions.length} active promo${c.promotions[0]?.source_url ? btn(c.promotions[0].source_url,'Details') : ''}</li>`).join('') : '<li>No active promotions found across competitors.</li>'}</ul></div></div><div class="opp-callout"><div class="opp-callout-label">Opportunity for ${esc(cover.business_name)}</div><p>${esc(pricing.market_opportunity?.opportunity_note||'No competitor publishes pricing for transmission or major repair. First-mover for transparent menu pricing.')}</p></div><p class="section-label">Active Promotions Tracker</p><table class="pricing-matrix"><thead><tr><th>Shop</th><th>Type</th><th>Active Promotions</th></tr></thead><tbody>${promoRows || '<tr><td colspan="3" style="font-size:7pt;color:var(--text-muted);padding:8px;">No competitors have active published promotions.</td></tr>'}</tbody></table></div>${PB.replace('PN','Page 2')}</div>`;

// ─── PAGE 3 ───────────────────────────────────────────────────────────────────
const revRows = reviews.competitors.filter(r => r.total_reviews_analyzed > 0).slice(0,8).map(r => {
  const comp = compMap[r.name]||{};
  const yl = btn(comp.urls && comp.urls.yelp, 'Yelp');
  const gl = btn(comp.urls && comp.urls.google_maps, 'Maps');
  return `<tr><td class="shop-name">${esc(r.name)}</td><td>${rat(r.rating_label)}</td><td>${r.total_reviews_analyzed}</td><td style="font-size:7pt;">${r.top_praise_themes && r.top_praise_themes[0] ? esc(r.top_praise_themes[0].theme) : '\u2014'}</td><td style="font-size:7pt;">${r.top_complaint_themes && r.top_complaint_themes[0] ? esc(r.top_complaint_themes[0].theme) : '\u2014'}</td><td>${esc(r.price_sentiment?.net_sentiment||'\u2014')}</td><td>${yl}${yl&&gl?' ':''}${gl}</td></tr>`;
}).join('');

const mPraise = (reviews.market_sentiment?.top_praise_across_all||[]).map(p => `<li>${esc(p.theme)} <span style="font-size:5.5pt;color:var(--text-muted)">(${p.frequency})</span></li>`).join('') || '<li>Data pending</li>';
const mComplaints = (reviews.market_sentiment?.market_wide_complaints||[]).map(c => `<li>${esc(c.theme)} <span style="font-size:5.5pt;color:var(--text-muted)">(${c.frequency})</span></li>`).join('') || '<li>Data pending</li>';
const ownGaps = (reviews.ownable_gaps||[]).map(g => `<div class="opp-callout"><div class="opp-callout-label">Gap Identified</div><p><strong>${esc(g.gap)}</strong> \u2014 ${esc(g.opportunity)}</p></div>`).join('');

const pg3 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Review Sentiment Analysis</p><div class="section-header"><h2>Customer Review Intelligence</h2><span class="section-sub">${reviews.total_reviews_analyzed} reviews analyzed across ${reviews.total_competitors_analyzed} competitors</span></div><div class="review-themes-grid"><div class="review-theme-card"><h3 style="color:var(--green);">Top Praise Themes (Market-Wide)</h3><ul>${mPraise}</ul></div><div class="review-theme-card"><h3 style="color:var(--red);">Top Complaint Themes (Market-Wide)</h3><ul>${mComplaints}</ul></div></div><p class="section-label">Competitor Sentiment Table</p><table class="sentiment-table"><thead><tr><th>Competitor</th><th>Sentiment</th><th>Reviews</th><th>Top Praise</th><th>Top Complaint</th><th>Price Sentiment</th><th>Links</th></tr></thead><tbody>${revRows || '<tr><td colspan="7" style="padding:10px;font-size:7pt;color:var(--text-muted);">No review data available.</td></tr>'}</tbody></table>${ownGaps}</div>${PB.replace('PN','Page 3')}</div>`;

// ─── PAGE 4 ───────────────────────────────────────────────────────────────────
const actInsights = reviews.actionable_insights||[];
const actCards = actInsights.map((ins,i) => `<div class="analysis-card"><h3>Insight ${i+1}</h3><ul><li><strong>${esc(ins.insight)}</strong></li><li style="font-size:7pt;color:var(--text-muted);">${esc(ins.implication)}</li></ul></div>`).join('');
const pq = (reviews.market_sentiment?.price_sentiment_summary?.price_positive_quotes||[]).slice(0,3).map(q => `<li>"${esc(q.substring(0,140))}..."</li>`).join('') || '<li>No quotes available.</li>';
const nq = (reviews.market_sentiment?.price_sentiment_summary?.price_negative_quotes||[]).slice(0,3).map(q => `<li>"${esc(q.substring(0,140))}..."</li>`).join('') || '<li>No quotes available.</li>';
const pct = reviews.market_sentiment?.price_sentiment_summary?.percent_positive;

const pg4 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Review Sentiment \u2014 Deeper Analysis</p><div class="section-header"><h2>Actionable Review Insights</h2><span class="section-sub">What customers say and what it means for ${esc(cover.business_name)}</span></div>${actCards || '<p style="font-size:7pt;color:var(--text-muted);">Insights pending.</p>'}<p class="section-label">Price Sentiment Sample Quotes</p><div class="analysis-grid"><div class="analysis-card"><h3 style="color:var(--green);">Price Praise Quotes</h3><ul>${pq}</ul></div><div class="analysis-card"><h3 style="color:var(--red);">Price Complaint Quotes</h3><ul>${nq}</ul></div></div><div class="gap-note">Source: Yelp + Google reviews analyzed across ${reviews.total_competitors_analyzed} competitors.${pct != null ? ' '+pct+'% of price mentions were positive.' : ''}</div></div>${PB.replace('PN','Page 4')}</div>`;

// ─── PAGE 5 ───────────────────────────────────────────────────────────────────
const gbRows = seo.google_presence_ranking.slice(0,8).map(g => {
  const comp = compMap[g.name]||{};
  const gl = btn(comp.urls && comp.urls.google_maps, 'Maps');
  return `<tr><td>${g.rank}</td><td class="shop-name">${esc(g.name)}</td><td>${esc(g.google_presence)}</td><td>${g.google_rating ? g.google_rating+'\u2605' : '\u2014'}</td><td>${g.google_reviews?.toLocaleString() || '\u2014'}</td><td>${g.local_pack_observed ? '<span style="color:var(--green);font-size:7pt;font-weight:700;">Yes</span>' : '<span style="color:var(--text-muted);font-size:7pt;">No</span>'}</td><td>${gl}</td></tr>`;
}).join('');
const lpRows = (seo.local_pack_summary||[]).map(lp => `<tr><td style="font-size:7pt;font-weight:600;">${esc(lp.search_term)}</td><td style="font-size:7pt;">${esc(lp.competitors_observed_in_pack?.join(', ')||'None')}</td><td style="font-size:7pt;color:var(--green);">${esc(lp.open_terms?.join(', ')||'\u2014')}</td></tr>`).join('');
const citRows = (seo.citation_gaps||[]).map(cg => `<tr><td class="shop-name">${esc(cg.directory)}</td><td>${pp(cg.priority)}</td><td style="font-size:7pt;">${esc(cg.note||'\u2014')}</td></tr>`).join('');
const qwRows = (seo.quick_wins_for_customer||[]).map(qw => `<tr><td class="shop-name">${esc(qw.action)}</td><td style="font-size:7pt;">${esc(qw.timeframe)}</td><td style="font-size:7pt;">${esc(qw.expected_impact)}</td></tr>`).join('');
const seoOpp1 = seo.seo_opportunities && seo.seo_opportunities[0];

const pg5 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">SEO &amp; Discovery</p><div class="section-header"><h2>Search &amp; Citation Analysis</h2><span class="section-sub">Google presence ranking, local pack opportunities, and citation gaps</span></div><p class="section-label">Google Presence Ranking</p><table class="seo-table"><thead><tr><th>#</th><th>Competitor</th><th>Presence</th><th>Rating</th><th>Reviews</th><th>Local Pack?</th><th>Maps</th></tr></thead><tbody>${gbRows}</tbody></table><p class="section-label">Local Pack Opportunities</p><table class="seo-table"><thead><tr><th>Search Term</th><th>Competitors in Pack</th><th>Open Terms / Opportunity</th></tr></thead><tbody>${lpRows}</tbody></table>${seoOpp1 ? `<div class="opp-callout"><div class="opp-callout-label">SEO Opportunity</div><p>${esc(seoOpp1.competitor_weakness)} \u2014 ${esc(seoOpp1.opportunity)}</p></div>` : ''}<p class="section-label">Citation Gaps</p><table class="citation-table"><thead><tr><th>Directory</th><th>Priority</th><th>Note</th></tr></thead><tbody>${citRows}</tbody></table><p class="section-label">Quick Wins</p><table class="metrics-table"><thead><tr><th>Action</th><th>Timeframe</th><th>Expected Impact</th></tr></thead><tbody>${qwRows}</tbody></table></div>${PB.replace('PN','Page 5')}</div>`;

// ─── PAGE 6 ───────────────────────────────────────────────────────────────────
const socRows = social.competitors.slice(0,8).map(s => {
  const fb = s.facebook_url ? lnk(s.facebook_url, 'Facebook') : '<span class="no-link">\u2014</span>';
  return `<tr><td class="shop-name">${esc(s.name)}</td><td>${pres(s.presence)}</td><td>${fb}</td><td style="font-size:6.5pt;">${s.followers ? s.followers.toLocaleString() : '\u2014'}</td></tr>`;
}).join('');
const dormRows = (social.dormant_competitors||[]).map(d => `<tr><td class="shop-name">${esc(d.name)}</td><td>${d.facebook_url ? lnk(d.facebook_url,'Facebook') : '\u2014'}</td><td style="font-size:7pt;color:var(--amber);">Dormant \u2014 not posting</td></tr>`).join('');
const uncont = (social.uncontested_platforms||[]).map(p => `<div class="analysis-card"><h3>${esc(p.platform)} \u2014 Uncontested</h3><ul><li>${esc(p.note)}</li></ul></div>`).join('');
const socOpps = (social.social_opportunities||[]).slice(0,2).map(o => `<div class="opp-callout"><div class="opp-callout-label">Opportunity</div><p><strong>${esc(o.competitor_weakness)}</strong> \u2014 ${esc(o.opportunity)}</p></div>`).join('');

const pg6 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Social Media</p><div class="section-header"><h2>Social Media Landscape</h2><span class="section-sub">All 10 competitors \u2014 zero active social media presence detected</span></div><div class="opp-callout"><div class="opp-callout-label">Opportunity \u2014 Social Media is Completely Uncontested</div><p>${esc(social.market_pattern||'No competitor has active social media. A+ can establish clear dominance.')}</p></div><p class="section-label">Competitor Social Presence</p><table class="social-table"><thead><tr><th>Competitor</th><th>Status</th><th>Facebook</th><th>Followers</th></tr></thead><tbody>${socRows || '<tr><td colspan="4" style="font-size:7pt;padding:8px;">No data available.</td></tr>'}</tbody></table>${dormRows ? `<p class="section-label">Dormant Competitors</p><table class="social-table"><thead><tr><th>Competitor</th><th>Facebook</th><th>Status</th></tr></thead><tbody>${dormRows}</tbody></table>` : ''}${uncont ? `<div class="analysis-grid" style="margin-top:10px;">${uncont}</div>` : ''}<p class="section-label">Social Opportunities</p>${socOpps}</div>${PB.replace('PN','Page 6')}</div>`;

// ─── PAGE 7 ───────────────────────────────────────────────────────────────────
const fCards = (findings.findings||[]).map(f => `<div class="finding-card"><div class="finding-header"><div class="finding-rank">${f.rank}</div><div class="finding-title">${esc(f.title||'Untitled')}</div>${sb(f.speed)}</div><div class="finding-insight">${esc(f.insight||'')}</div><div class="finding-why"><strong>Why it matters:</strong> ${esc(f.why_it_matters||'')}</div><div class="finding-action"><strong>Action:</strong> ${esc(f.specific_action||'')}</div></div>`).join('');

const pg7 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Key Findings</p><h1 class="page-title">Top 5 Actionable Findings</h1><p class="page-subtitle">Prioritized by competitive impact and speed to execute \u2014 based on all 6 research modules</p><div class="findings-grid">${fCards || '<p style="font-size:7pt;color:var(--text-muted);">Findings pending.</p>'}</div></div>${PB.replace('PN','Page 7')}</div>`;

// ─── PAGE 8 ───────────────────────────────────────────────────────────────────
function buildWeek(wd, n) {
  if (!wd) return `<div class="roadmap-week"><div class="roadmap-week-header">Week ${n}</div><div class="roadmap-week-body"><p style="font-size:7pt;color:var(--text-muted);">Data pending.</p></div></div>`;
  const acts = (wd.actions||[]).map((a,i) => `<div class="roadmap-action"><div class="roadmap-action-num">${i+1}</div><div><strong>${esc(a.action)}</strong>${a.deliverable ? `<br><span style="color:var(--text-muted)">Deliverable: ${esc(a.deliverable)}</span>` : ''}</div></div>`).join('');
  return `<div class="roadmap-week"><div class="roadmap-week-header">Week ${n} \u2014 ${esc(wd.theme||'TBD')}</div><div class="roadmap-week-body">${acts}</div></div>`;
}
const weeks = [1,2,3,4].map((w,i) => buildWeek(roadmap['week_'+w]||null, w)).join('');
const m1Rows = (roadmap.month_1_metrics||[]).map(m => `<tr><td class="shop-name">${esc(m.metric)}</td><td style="font-size:7pt;">${esc(m.target)}</td><td style="font-size:7pt;color:var(--text-muted);">${esc(m.source_finding||'')}</td></tr>`).join('');
const m2Rows = (roadmap.month_2_lookahead||[]).map((m,i) => `<div class="lookahead-item"><div class="lookahead-icon">${i+1}</div><div><strong>${esc(m.action)}</strong><br><span style="font-size:6.5pt;color:var(--text-muted);">${esc(m.details||'')}</span></div></div>`).join('');

const pg8 = `<div class="page"><div class="site-header"><div class="logo">Intel<span>Pulse</span></div><div class="tagline">Competitive Intel \xb7 ${esc(LOC)} Market \xb7 ${REPORT_DATE_FRIENDLY}</div></div><div class="meta-bar"><div class="client-name">Client: ${esc(cover.business_name)} \xb7 ${esc(LOC)}</div><div class="report-info"><span>Report: <strong>Competitive Intelligence</strong></span><span>Date: <strong>${REPORT_DATE_FRIENDLY}</strong></span></div></div><div class="body"><p class="section-label">Implementation Roadmap</p><h1 class="page-title">30-Day Action Roadmap</h1><p class="page-subtitle">Week-by-week execution plan for ${esc(cover.business_name)}</p><div class="roadmap-grid">${weeks}</div><p class="section-label">Month 1 Success Metrics</p><table class="metrics-table"><thead><tr><th>Metric</th><th>Target</th><th>Source</th></tr></thead><tbody>${m1Rows || '<tr><td colspan="3" style="font-size:7pt;padding:8px;">Metrics pending.</td></tr>'}</tbody></table><p class="section-label">Month 2 Lookahead</p><div class="lookahead-grid">${m2Rows || '<p style="font-size:7pt;color:var(--text-muted);">Month 2 plan pending.</p>'}</div></div>${PB.replace('PN','Page 8')}</div>`;

// ─── ASSEMBLE + WRITE ─────────────────────────────────────────────────────────
const allPages = pg1 + pg2 + pg3 + pg4 + pg5 + pg6 + pg7 + pg8;

// Extract CSS from template
const template = fs.readFileSync(tmplPath, 'utf8');
const cssMatch = template.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1] : '';

// Write combined JSON
const combinedJson = JSON.stringify({cover, landscape, pricing, reviews, seo, social, findings, roadmap}, null, 2);
const jsonOutPath = path.join(outDir, CUSTOMER_SLUG + '-research.json');
fs.writeFileSync(jsonOutPath, combinedJson);

// Write HTML
const htmlOutPath = path.join(outDir, CUSTOMER_SLUG + '.html');
const fullHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Competitive Intel Report \u2014 ${esc(cover.business_name)} | IntelPulse</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@700;900&display=swap" rel="stylesheet">\n<style>\n${css}\n</style>\n</head>\n<body>\n${allPages}\n</body>\n</html>`;
fs.writeFileSync(htmlOutPath, fullHtml);

console.log('HTML written: ' + htmlOutPath);
console.log('JSON written: ' + jsonOutPath);
console.log('All 8 pages generated successfully.');
