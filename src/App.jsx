import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// BRAND DESIGN SYSTEM
// Extracted directly from Charlene's brand assets:
//   Background: #131210 (logo bg — near-black warm)
//   Gold:       #a78757 (logo gold, gradient to #d6b370)
//   Cream:      #e8e1d4 (R letterform cream)
//   Navy:       #012446 (email signature navy)
//   Crimson:    #850003 (podcast curtain red)
// ═══════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* ── Core palette ── */
  --black:    #131210;
  --black2:   #1c1b18;
  --gold:     #d6b370;
  --gold-dim: #a78757;
  --gold-dark:#7a5e35;
  --cream:    #e8e1d4;
  --cream-dim:#b8ae9f;
  --navy:     #012446;
  --crimson:  #850003;
  --crimson2: #a50004;
  --white:    #f5f2ec;

  /* ── Semantic ── */
  --bg:          var(--black);
  --surface:     var(--black2);
  --surface2:    #232219;
  --border:      rgba(214,179,112,0.18);
  --border-hover:rgba(214,179,112,0.5);
  --text-primary: var(--cream);
  --text-muted:   var(--cream-dim);
  --accent:      var(--gold);
  --btn-primary-bg: linear-gradient(135deg, #d6b370 0%, #a78757 100%);
  --btn-primary-text: var(--black);
  --radius: 10px;
  --radius-lg: 16px;

  /* ── Gold divider line (like YOUR in logo) ── */
  --gold-line: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
}

html, body { height: 100%; background: var(--bg); }
body {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  color: var(--cream);
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}
#root { min-height: 100vh; display: flex; flex-direction: column; }

/* ── TYPOGRAPHY ── */
.display {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 700;
  letter-spacing: .02em;
  color: #f5f0e8;
}
.serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.italic { font-style: italic; }
.gold { color: var(--gold); }
.cream { color: var(--cream); }
.muted { color: var(--cream-dim); }
.small { font-size: .82rem; }
.fw-500 { font-weight: 500; }
.fw-600 { font-weight: 600; }
.tracking { letter-spacing: .12em; text-transform: uppercase; font-size: .72rem; }

/* ── LAYOUT ── */
.page {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.center-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ── GOLD DIVIDER (like YOUR in logo) ── */
.gold-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
}
.gold-divider::before,
.gold-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--gold-line);
}
.gold-divider span {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: var(--gold);
  font-size: .85rem;
  letter-spacing: .1em;
  white-space: nowrap;
}

/* ── SURFACE CARD ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px;
}
.card-glow {
  box-shadow: 0 0 0 1px rgba(214,179,112,.08), 0 8px 32px rgba(0,0,0,.4);
}

/* ── INPUTS ── */
textarea, input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  font-family: 'Raleway', sans-serif;
  font-size: .95rem;
  font-weight: 400;
  color: var(--cream);
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  outline: none;
  resize: none;
  transition: border-color 240ms ease, background 240ms ease;
  line-height: 1.6;
}
textarea:focus, input:focus {
  border-color: rgba(214,179,112,.55);
  background: rgba(255,255,255,.06);
}
textarea { min-height: 100px; }
::placeholder { color: rgba(184,174,159,.4); }

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: .78rem;
  border: none;
  border-radius: var(--radius);
  padding: 14px 24px;
  cursor: pointer;
  transition: all 240ms cubic-bezier(.4,0,.2,1);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.btn:disabled { opacity: .4; cursor: not-allowed; pointer-events: none; }

/* Primary — gold gradient */
.btn-gold {
  background: var(--btn-primary-bg);
  color: var(--black);
}
.btn-gold::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background 240ms;
}
.btn-gold:hover::after { background: rgba(255,255,255,.12); }
.btn-gold:active { transform: scale(.98); }

/* Secondary — outlined gold */
.btn-outline {
  background: transparent;
  color: var(--gold);
  border: 1px solid rgba(214,179,112,.4);
}
.btn-outline:hover {
  border-color: var(--gold);
  background: rgba(214,179,112,.07);
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--cream-dim);
  font-size: .75rem;
  width: auto;
  padding: 8px 4px;
  letter-spacing: .06em;
}
.btn-ghost:hover { color: var(--cream); }

/* Choice button — the core UI element (matches Adalo style) */
.btn-choice {
  background: rgba(255,255,255,.04);
  color: var(--cream);
  border: 2px solid rgba(214,179,112,.35);
  border-radius: var(--radius);
  padding: 14px 18px;
  text-align: center;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: all 200ms ease;
  display: block;
  width: 100%;
  line-height: 1.4;
}
.btn-choice:hover {
  border-color: rgba(214,179,112,.5);
  background: rgba(214,179,112,.08);
  color: var(--gold);
}
.btn-choice.selected {
  border-color: var(--gold);
  background: rgba(214,179,112,.12);
  color: var(--gold);
  font-weight: 500;
}

.btn-sm { padding: 9px 16px; font-size: .72rem; width: auto; }

/* ── PROGRESS BAR ── */
.progress-wrap {
  height: 2px;
  background: linear-gradient(90deg, #7a5e35, #d6b370);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 28px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold));
  border-radius: 2px;
  transition: width 400ms cubic-bezier(.4,0,.2,1);
}

/* ── RULE DISPLAY ── */
.rule-box {
  background: rgba(214,179,112,.06);
  border: 1px solid rgba(214,179,112,.25);
  border-radius: var(--radius-lg);
  padding: 22px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.55;
  color: var(--cream);
}

.rewrite-box {
  background: rgba(214,179,112,.1);
  border: 1px solid rgba(214,179,112,.4);
  border-radius: var(--radius-lg);
  padding: 22px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.55;
  color: var(--gold);
}

/* ── HEADER ── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 0;
  margin-bottom: 2px;
}
.logo-mark {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-rx {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 1.4rem;
  background: linear-gradient(135deg, var(--cream) 30%, var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.logo-sub {
  font-family: 'Raleway', sans-serif;
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--gold-dim);
  line-height: 1.2;
}

/* ── TRACK SELECTOR ── */
.track-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
  font-size: .7rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--gold-dim);
}

/* ── LOADER ── */
.loader {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(214,179,112,.2);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-up { animation: fadeUp .38s cubic-bezier(.4,0,.2,1) both; }
.fade-in { animation: fadeIn .3s ease both; }

/* ── OVERLAY ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(13,12,10,.92);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn .25s ease both;
  backdrop-filter: blur(6px);
}

/* ── TABS ── */
.tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 22px; }
.tab {
  font-family: 'Raleway', sans-serif;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--cream-dim);
  background: transparent;
  border: none;
  padding: 10px 0;
  margin-right: 24px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 200ms, border-color 200ms;
}
.tab.active { color: var(--gold); border-bottom-color: var(--gold); }

/* ── ENTRY CARD ── */
.entry-card {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 200ms, background 200ms;
}
.entry-card:hover {
  border-color: rgba(214,179,112,.4);
  background: var(--surface2);
}

/* ── INSIGHT BLOCK ── */
.insight-block {
  background: rgba(214,179,112,.05);
  border: 1px solid rgba(214,179,112,.15);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
}

/* ── TAG ── */
.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: .68rem;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  background: rgba(214,179,112,.1);
  color: var(--gold-dim);
  border: 1px solid rgba(214,179,112,.2);
}

/* ── COMPLETE ── */
.complete-ring {
  width: 72px; height: 72px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 28px;
  font-size: 1.8rem;
  background: rgba(214,179,112,.08);
  box-shadow: 0 0 40px rgba(214,179,112,.15);
}

/* ── AUTH ── */
.auth-wrap {
  display: flex; flex-direction: column; justify-content: center;
  min-height: 100vh; padding: 40px 28px;
  max-width: 420px; margin: 0 auto; width: 100%;
}

/* ── DECORATIVE ── */
.grain-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: .025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px;
}

/* ── ERROR ── */
.error-msg { color: #e87070; font-size: .82rem; margin-top: 6px; }

/* ── SPACING UTILS ── */
.mt-4  { margin-top: 4px; }
.mt-8  { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mt-20 { margin-top: 20px; }
.mt-24 { margin-top: 24px; }
.mt-28 { margin-top: 28px; }
.mt-32 { margin-top: 32px; }
.mb-4  { margin-bottom: 4px; }
.mb-8  { margin-bottom: 8px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-20 { margin-bottom: 20px; }
.mb-24 { margin-bottom: 24px; }
.mb-28 { margin-bottom: 28px; }
.pb-48 { padding-bottom: 48px; }
.pb-64 { padding-bottom: 64px; }
.flex  { display: flex; }
.col   { flex-direction: column; }
.row   { flex-direction: row; }
.center { align-items: center; }
.between { justify-content: space-between; }
.wrap  { flex-wrap: wrap; }
.gap-4 { gap: 4px; }
.gap-8 { gap: 8px; }
.gap-10{ gap: 10px; }
.gap-12{ gap: 12px; }
.gap-16{ gap: 16px; }
.gap-20{ gap: 20px; }
.text-center { text-align: center; }
.w-full { width: 100%; }
`;

// ─────────────────────────────────────────────
// FIREBASE CONFIG
// ─────────────────────────────────────────────
const FB = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "REPLACE_ME",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "REPLACE_ME",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "REPLACE_ME",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "REPLACE_ME",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| "REPLACE_ME",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "REPLACE_ME",
};
const DEMO = FB.apiKey === "REPLACE_ME";

let _db = null, _auth = null;
async function getFirebase() {
  if (_db && _auth) return { db: _db, auth: _auth };
  const { initializeApp, getApps } = await import("firebase/app");
  const { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp }
    = await import("firebase/firestore");
  const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
          sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
          onAuthStateChanged, signOut } = await import("firebase/auth");
  const app = getApps().length ? getApps()[0] : initializeApp(FB);
  _db   = { db: getFirestore(app), collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp };
  _auth = { auth: getAuth(app), createUserWithEmailAndPassword, signInWithEmailAndPassword,
            sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, signOut };
  return { db: _db, auth: _auth };
}

// ─────────────────────────────────────────────
// LOCAL STORAGE FALLBACK
// ─────────────────────────────────────────────
const LS = "ryr_v2_entries";
const lsGet  = () => { try { return JSON.parse(localStorage.getItem(LS)||"[]"); } catch { return []; } };
const lsSave = (e) => {
  const all = lsGet();
  const entry = { ...e, id: Date.now().toString(), createdAt: new Date().toISOString() };
  all.unshift(entry);
  localStorage.setItem(LS, JSON.stringify(all.slice(0,200)));
  return entry;
};

// ─────────────────────────────────────────────
// AI HELPERS
// ─────────────────────────────────────────────
async function callClaude(prompt, system) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const d = await r.json();
    return d.content?.map(b => b.text||"").join("") || null;
  } catch { return null; }
}

async function aiExtractRule(emotion, urge, risk, obligation) {
  return callClaude(
    `Emotion: ${emotion}\nUrge (what I wanted to do): ${urge}\nWhat felt at risk: ${risk}\nObligation I felt: ${obligation}`,
    `You distill a person's automatic internal rule from four inputs.
Write 1 clear sentence starting with "My internal rule is..." or "When [situation], I must/need to..."
Sound like the person's own inner voice. Direct, not clinical. Under 25 words.
Return ONLY the rule. No quotes, no preamble.`
  );
}

async function aiPatternInsight(entries) {
  if (entries.length < 2) return null;
  const sample = entries.slice(0,8).map(e =>
    `Rule: ${e.rule||""}. Emotion: ${e.emotion||""}. Urge: ${e.urge||""}`
  ).join("\n");
  return callClaude(sample,
    `Identify the single most repeated pattern. Write 1–2 calm sentences starting with "You often..." 
Not diagnostic. Not therapeutic. Direct and grounded. Return ONLY the insight text.`
  );
}

async function aiRefineRewrite(oldRule, choice) {
  return callClaude(
    `Old rule: ${oldRule}\nNew choice: ${choice}`,
    `Help articulate a clean replacement rule — their conscious choice instead of the default.
Keep their exact meaning. First-person, grounded, 1 sentence.
Examples: "Tension does not require me to fix it." / "I can stay present without shrinking."
Return ONLY the replacement rule.`
  );
}

// ─────────────────────────────────────────────
// PATTERN TAGS
// ─────────────────────────────────────────────
const ALL_TAGS = [
  "criticism","conflict","belonging","control","urgency",
  "perfectionism","people-pleasing","over-responsibility","avoidance","over-analysis"
];
function detectTags(text = "") {
  const t = text.toLowerCase();
  return ALL_TAGS.filter(tag => {
    const kw = tag.replace(/-/g," ");
    if (t.includes(kw)) return true;
    const map = {
      criticism:           ["criti","judg","wrong","blame"],
      conflict:            ["tense","tension","fight","disagree"],
      belonging:           ["exclud","reject","left out","alone","abandon","belong"],
      urgency:             ["urgent","immediately","right now","hurry","asap"],
      perfectionism:       ["perfect","enough","fail","standard","not good"],
      "people-pleasing":   ["disappoint","please","upset","make it okay","make them happy"],
      "over-responsibility":["my fault","responsible","fix it","take care","make sure"],
      avoidance:           ["avoid","pull back","withdraw","hide","escape"],
      "over-analysis":     ["overthink","spiral","loop","figure out","analyze"],
    };
    return (map[tag]||[]).some(k => t.includes(k));
  });
}

// ─────────────────────────────────────────────
// FLOW CONTENT — Track 1: Compulsive Responses
// ─────────────────────────────────────────────
const EMOTIONS = [
  "Anxious","Overwhelmed","Angry","Insecure","Shut Down",
  "Hurt","Guilty","Something else…"
];
const URGES = [
  "Confront","Immediately Fix","Push Myself","Analyze",
  "Distract Myself","Appease","Seek Reassurance","Procrastinate",
  "Something else…"
];
const RISKS = [
  "An Important Relationship","My Peace","My Safety","My Freedom",
  "My Integrity","My Financial Security","Something else…"
];
const OBLIGATIONS = [
  "I Have To",
  "I Should",
  "I Don't Know How NOT To",
  "Something else…"
];
const REWRITE_OPTIONS = [
  "Disengage","Set a Boundary","Directly Ask For What I Need",
  "Initiate Repair","Create Space To Think","Take One Small Step","Something else…"
];
const ALIGNMENT_OPTIONS = [
  "Resentment",
  "Self-Respect",
  "A Bit of Both",
  "Neither",
];
const HELPFUL_OPTIONS = [
  "I see a choice now, but didn't before",
  "I saw a choice before, but see a new choice now",
  "I saw choices before + see the same ones now",
  "I didn't see choices before + still don't",
  "None of the above",
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function fmtDate(ts) {
  if (!ts) return "";
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now()-d)/1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return d.toLocaleDateString("en-US",{month:"short",day:"numeric"});
}
const STEPS = 10;

// ─────────────────────────────────────────────
// STYLE TAG
// ─────────────────────────────────────────────
function S() { return <style dangerouslySetInnerHTML={{ __html: CSS }} />; }

// ─────────────────────────────────────────────
// LOGO MARK
// ─────────────────────────────────────────────
function LogoMark({ size = "md" }) {
  const big = size === "lg";
  if (big) {
    return (
      <img
        src="/Logo_Square_Rewriting_Your_Rulebook.png"
        alt="Rewriting Your Rulebook"
        style={{ height: "120px", width: "auto", objectFit: "contain", display: "block" }}
      />
    );
  }
  return (
    <img
      src="/Logo_Banner_Rewriting_Your_Rulebook_720_x_180_px.png"
      alt="Rewriting Your Rulebook"
      style={{
        height: "52px",
        width: "auto",
        maxWidth: "260px",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// GOLD DIVIDER
// ─────────────────────────────────────────────
function GoldDivider({ label }) {
  return (
    <div className="gold-divider" style={{ margin: "12px 0" }}>
      {label && <span>{label}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────
function ProgressBar({ step }) {
  return (
    <div className="progress-wrap">
      <div className="progress-fill" style={{ width: `${(step/STEPS)*100}%` }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// BACK BUTTON
// ─────────────────────────────────────────────
function BackBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "1.5px solid rgba(214,179,112,.45)",
        borderRadius: 8,
        color: "var(--gold)",
        fontFamily: "'Raleway', sans-serif",
        fontSize: ".8rem",
        fontWeight: 600,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        padding: "10px 18px",
        cursor: "pointer",
        marginBottom: 16,
        marginTop: 4,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 200ms ease",
        width: "auto",
      }}
    >
      ← Go Back
    </button>
  );
}

// ─────────────────────────────────────────────
// CHOICE LIST — the main UI pattern
// ─────────────────────────────────────────────
function ChoiceList({ options, value, onChange, onOther }) {
  return (
    <div className="flex col gap-10">
      {options.map(opt => {
        const isSomething = opt.toLowerCase().includes("something else");
        return (
          <button
            key={opt}
            className={`btn-choice ${value === opt ? "selected" : ""}`}
            onClick={() => {
              if (isSomething) onOther?.();
              else onChange(opt);
            }}
            style={isSomething ? { color: "var(--gold-dim)", borderStyle: "dashed" } : {}}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// FREE-TEXT FALLBACK SCREEN
// ─────────────────────────────────────────────
function FreeTextScreen({ title, placeholder, onContinue, onBack }) {
  const [val, setVal] = useState("");
  return (
    <div className="page pb-64 fade-up">
      <div className="app-header"><LogoMark /></div>
      <BackBtn onClick={onBack} />
      <h2 className="display mt-16 mb-20" style={{ fontSize: "1.5rem", color: "#f5f0e8" }}>{title}</h2>
      <textarea value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} />
      <button className="btn btn-gold mt-16" disabled={!val.trim()} onClick={() => onContinue(val.trim())}>
        Continue
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// AUTH SCREEN
// ─────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode]       = useState("login");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]       = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  async function submit() {
    if (!email) { setError("Email required."); return; }
    setError(""); setLoading(true);
    if (DEMO) { onLogin({ uid: "demo", email, displayName: name }); setLoading(false); return; }
    try {
      const { auth: A } = await getFirebase();
      if (mode === "signup") {
        const r = await A.createUserWithEmailAndPassword(A.auth, email, password);
        onLogin(r.user);
      } else if (mode === "login") {
        const r = await A.signInWithEmailAndPassword(A.auth, email, password);
        onLogin(r.user);
      } else {
        await A.sendSignInLinkToEmail(A.auth, email, { url: window.location.href, handleCodeInApp: true });
        localStorage.setItem("ryr_email_link", email);
        setMagicSent(true);
      }
    } catch (e) {
      setError(e.message?.replace("Firebase: ","").replace(/\(auth\/[^)]+\)/,"").trim());
    }
    setLoading(false);
  }

  if (magicSent) return (
    <div className="auth-wrap center-page fade-up">
      <S />
      <div className="grain-overlay" />
      <div style={{ fontSize: "2.5rem", marginBottom: 20 }}>✉️</div>
      <h2 className="display mb-8" style={{ color: "var(--gold)" }}>Check your inbox</h2>
      <p className="muted" style={{ maxWidth: 280 }}>
        Sign-in link sent to <span style={{ color: "var(--cream)" }}>{email}</span>.
        Tap it to continue.
      </p>
    </div>
  );

  return (
    <div className="auth-wrap fade-up">
      <S />
      <div className="grain-overlay" />

      {/* Logo */}
      <div className="text-center mb-32">
        <img
          src="/Logo_Square_Rewriting_Your_Rulebook.png"
          alt="Rewriting Your Rulebook"
          style={{ width: 220, height: 220, objectFit: "contain", margin: "0 auto 24px", display: "block", borderRadius: 24 }}
        />
        <p className="muted mt-8" style={{ fontSize: ".88rem" }}>Every time you see a rule, you get to choose.</p>
      </div>

      {DEMO && (
        <div className="insight-block mb-20">
          <p style={{ color: "var(--gold-dim)", fontSize: ".82rem", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--gold)" }}>Demo mode</strong> — add Firebase keys to enable accounts. Data saves locally for now.
          </p>
        </div>
      )}

      <div className="tabs">
        <button className={`tab ${mode==="login"?"active":""}`}  onClick={() => setMode("login")}>Sign in</button>
        <button className={`tab ${mode==="signup"?"active":""}`} onClick={() => setMode("signup")}>Sign up</button>
        <button className={`tab ${mode==="magic"?"active":""}`}  onClick={() => setMode("magic")}>Magic link</button>
      </div>

      <div className="flex col gap-12">
        {mode === "signup" &&
          <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />}
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&submit()} />
        {mode !== "magic" &&
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==="Enter"&&submit()} />}
        {error && <p className="error-msg">{error}</p>}
        <button className="btn btn-gold mt-8" onClick={submit} disabled={loading}>
          {loading ? <span className="loader" /> :
            mode==="login" ? "Sign In" : mode==="signup" ? "Create Account" : "Send Magic Link"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ENTRY DETAIL
// ─────────────────────────────────────────────
function EntryDetail({ entry, onClose }) {
  return (
    <div className="overlay fade-in" onClick={onClose}>
      <div className="card card-glow w-full fade-up"
        style={{ maxWidth: 440, maxHeight: "88vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}>
        <div className="flex between center mb-16">
          <span className="muted small">{fmtDate(entry.createdAt)}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="flex col gap-16 pb-48">
          {[
            ["Emotion", entry.emotion],
            ["Urge", entry.urge],
            ["What felt at risk", entry.risk],
            ["Obligation", entry.obligation],
          ].filter(([,v]) => v).map(([label, val]) => (
            <div key={label}>
              <p className="tracking mb-4" style={{ color: "var(--gold-dim)" }}>{label}</p>
              <p style={{ color: "var(--cream)", fontSize: ".95rem" }}>{val}</p>
            </div>
          ))}
          {entry.rule && (
            <div>
              <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Default Rule</p>
              <div className="rule-box">{entry.rule}</div>
            </div>
          )}
          {entry.rewriteChoice && (
            <div>
              <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>New Choice</p>
              <div className="rewrite-box">{entry.rewriteChoice}</div>
            </div>
          )}
          {entry.finalChoice && (
            <div>
              <p className="tracking mb-4" style={{ color: "var(--gold-dim)" }}>Chosen Action</p>
              <p className="fw-500" style={{ color: "var(--gold)", fontSize: ".95rem" }}>→ {entry.finalChoice}</p>
            </div>
          )}
          {entry.feedback && (
            <div>
              <p className="tracking mb-4" style={{ color: "var(--gold-dim)" }}>Feedback</p>
              <p style={{ color: "var(--cream-dim)", fontSize: ".9rem" }}>{entry.feedback}</p>
            </div>
          )}
          {entry.tags?.length > 0 && (
            <div className="flex wrap gap-8">
              {entry.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
function Dashboard({ user, onCapture, onLogout }) {
  const [entries, setEntries]   = useState([]);
  const [insight, setInsight]   = useState(null);
  const [insL, setInsL]         = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => { load(); }, []);
  useEffect(() => { if (entries.length >= 1 && !insight) genInsight(); }, [entries]);

  async function load() {
    if (DEMO) { setEntries(lsGet()); return; }
    try {
      const { db: D } = await getFirebase();
      const q = D.query(D.collection(D.db,"entries"), D.where("userId","==",user.uid),
        D.orderBy("createdAt","desc"), D.limit(20));
      const s = await D.getDocs(q);
      setEntries(s.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch { setEntries(lsGet()); }
  }

  async function genInsight() {
    setInsL(true);
    const t = await aiPatternInsight(entries);
    if (t) setInsight(t);
    setInsL(false);
  }

  const recent = entries.slice(0,5);

  return (
    <div className="page pb-64 fade-up">
      <S />
      <div className="grain-overlay" />
      {selected && <EntryDetail entry={selected} onClose={() => setSelected(null)} />}

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 0 0" }}>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log Out</button>
      </div>

      {/* Hero */}
      <div style={{ paddingTop: 4, paddingBottom: 4, textAlign: "center" }}>
        <img
          src="/Logo_Square_Rewriting_Your_Rulebook.png"
          alt="Rewriting Your Rulebook"
          style={{ width: "min(280px, 72vw)", height: "min(280px, 72vw)", objectFit: "contain", margin: "0 auto 12px", display: "block", borderRadius: 24 }}
        />
        <p className="tracking" style={{ color: "var(--gold-dim)", fontSize: ".9rem", letterSpacing: ".18em" }}>Welcome Back</p>
      </div>

      {/* CTA */}
      <button className="btn btn-gold"
        style={{ marginTop: 28, marginBottom: 32, padding: "16px 24px", fontSize: ".82rem" }}
        onClick={onCapture}>
        ✦ Start a Rulebook Session
      </button>

      {/* Pattern Insight */}
      {entries.length >= 1 && (
        <div className="insight-block mb-24">
          <div className="flex between center mb-8">
            <p className="tracking" style={{ color: "var(--gold-dim)" }}>Pattern Insight</p>
            <button className="btn btn-ghost btn-sm" onClick={genInsight}>
              {insL ? <span className="loader" style={{ width:12,height:12 }} /> : "Refresh"}
            </button>
          </div>
          {insight
            ? <p style={{ color: "var(--cream)", fontSize: ".92rem", lineHeight: 1.7, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"1.05rem" }}>{insight}</p>
            : <p className="muted small">{insL ? "Analyzing your patterns…" : "Generating insight…"}</p>
          }
        </div>
      )}

      {/* Recent */}
      {recent.length > 0 && (
        <>
          <p className="tracking mb-12" style={{ color: "var(--gold-dim)" }}>Recent Sessions</p>
          <div className="flex col gap-10">
            {recent.map(e => (
              <div key={e.id} className="entry-card" onClick={() => setSelected(e)}>
                <div className="flex between center mb-6">
                  <span className="muted" style={{ fontSize: ".72rem" }}>{fmtDate(e.createdAt)}</span>
                  <div className="flex gap-8 wrap">
                    {e.tags?.slice(0,2).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <p className="fw-500 mb-4" style={{ fontSize: ".88rem", color: "var(--cream)", lineHeight: 1.4 }}>
                  {e.emotion && e.emotion}
                </p>
                {e.rule && (
                  <p className="muted italic serif" style={{ lineHeight: 1.5, fontSize: ".95rem" }}>
                    {(() => {
                      const r = (e.rule || "").trim();
                      const cap = r.charAt(0).toUpperCase() + r.slice(1);
                      return cap.slice(0,90) + (r.length > 90 ? "…" : "");
                    })()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {entries.length === 0 && (
        <div className="text-center mt-32">
          <p className="muted" style={{ fontSize: ".9rem", lineHeight: 1.9 }}>
            No sessions yet.<br />
            Start one when you notice a pattern activating.
          </p>
        </div>
      )}

      {/* Footer quote */}
      <div className="text-center mt-32">
        <GoldDivider />
        <p className="muted" style={{ fontSize: ".78rem", fontStyle: "italic", lineHeight: 1.7 }}>
          "Every time you see a rule, you get to choose.<br />
          And every time you choose, you get a bit more of yourself back."
        </p>
        <p className="tracking mt-8" style={{ fontSize: ".65rem", color: "var(--gold-dim)" }}>
          — Charlene Uli
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CAPTURE FLOW — matches Adalo screens exactly
// ─────────────────────────────────────────────
function CaptureFlow({ user, onBack, onDone, onLogout }) {
  const [step, setStep]           = useState(1);
  const [emotion, setEmotion]     = useState("");
  const [urge, setUrge]           = useState("");
  const [risk, setRisk]           = useState("");
  const [obligation, setObligation] = useState("");
  const [rule, setRule]           = useState("");
  const [ruleL, setRuleL]         = useState(false);
  const [rewriteChoice, setRewriteChoice] = useState("");
  const [alignment, setAlignment] = useState("");
  const [helpful, setHelpful]     = useState("");
  const [feedback, setFeedback]   = useState("");
  const [finalAction, setFinalAction] = useState("");
  const [saving, setSaving]       = useState(false);
  const [rewriteL, setRewriteL]   = useState(false);

  // Shared header
  const H = ({ s }) => (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0" }}>
        <LogoMark />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={onBack}
            title="Home"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--gold)", fontSize: "1.6rem", padding: "4px", lineHeight: 1 }}
          >⌂</button>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log Out</button>
        </div>
      </div>
      <ProgressBar step={s} />
    </>
  );

  // Build rule (step 4 → 5)
  async function buildRule() {
    setRuleL(true);
    setStep(5);
    const ai = await aiExtractRule(emotion, urge, risk, obligation);
    setRule(ai || `When I feel ${emotion.toLowerCase()} and sense ${risk.toLowerCase()} is at risk, I ${urge.toLowerCase()}.`);
    setRuleL(false);
  }

  // Refine rewrite (step 7 → 8)
  async function doRefine(choice) {
    setRewriteChoice(choice);
    setRewriteL(true);
    setStep(8);
    const ref = await aiRefineRewrite(rule, choice);
    setFinalAction(ref || choice);
    setRewriteL(false);
  }

  // Save entry
  async function save() {
    setSaving(true);
    const combo = `${emotion} ${urge} ${risk} ${obligation} ${rule} ${rewriteChoice}`;
    const tags = detectTags(combo);
    const entry = {
      userId: user.uid, emotion, urge, risk, obligation, rule,
      rewriteChoice, alignment, helpful, feedback, finalAction, tags,
      patternGroup: tags[0] || "",
    };
    if (DEMO) { lsSave(entry); }
    else {
      try {
        const { db: D } = await getFirebase();
        await D.addDoc(D.collection(D.db,"entries"), { ...entry, createdAt: D.serverTimestamp() });
      } catch { lsSave(entry); }
    }
    setSaving(false);
    onDone();
  }

  // ── SCREEN 1: Emotion ──
  if (step === 1) return (
    <div className="page pb-64 fade-up">
      <H s={1} />
      <BackBtn onClick={onBack} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 1 of 9 · Emotion</p>
      <h2 className="display mb-24" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        The strongest emotion I feel right now is…
      </h2>
      <ChoiceList
        options={EMOTIONS}
        value={emotion}
        onChange={v => { setEmotion(v); setTimeout(() => setStep(2), 200); }}
        onOther={() => setStep(11)}
      />
    </div>
  );

  // ── FREE TEXT: Emotion ──
  if (step === 11) return (
    <FreeTextScreen
      title="The strongest emotion I feel right now is…"
      placeholder="Enter your emotion"
      onContinue={v => { setEmotion(v); setStep(2); }}
      onBack={() => setStep(1)}
    />
  );

  // ── SCREEN 2: Urge ──
  if (step === 2) return (
    <div className="page pb-64 fade-up">
      <H s={2} />
      <BackBtn onClick={() => setStep(1)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 2 of 9 · Urge</p>
      <h2 className="display mb-8" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        The strongest urge I feel right now is to…
      </h2>
      <ChoiceList
        options={URGES}
        value={urge}
        onChange={v => { setUrge(v); setTimeout(() => setStep(3), 200); }}
        onOther={() => setStep(22)}
      />
    </div>
  );

  if (step === 22) return (
    <FreeTextScreen
      title="The strongest urge I feel right now is to…"
      placeholder="Enter your urge"
      onContinue={v => { setUrge(v); setStep(3); }}
      onBack={() => setStep(2)}
    />
  );

  // ── SCREEN 3: Risk ──
  if (step === 3) return (
    <div className="page pb-64 fade-up">
      <H s={3} />
      <BackBtn onClick={() => setStep(2)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 3 of 9 · Risk</p>
      <h2 className="display mb-24" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        The thing that feels the most at risk right now is…
      </h2>
      <ChoiceList
        options={RISKS}
        value={risk}
        onChange={v => { setRisk(v); setTimeout(() => setStep(4), 200); }}
        onOther={() => setStep(33)}
      />
    </div>
  );

  if (step === 33) return (
    <FreeTextScreen
      title="The thing that feels most at risk is…"
      placeholder="Enter what feels at risk"
      onContinue={v => { setRisk(v); setStep(4); }}
      onBack={() => setStep(3)}
    />
  );

  // ── SCREEN 4: Obligation ──
  if (step === 4) return (
    <div className="page pb-64 fade-up">
      <H s={4} />
      <BackBtn onClick={() => setStep(3)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 4 of 9 · Obligation</p>
      <h2 className="display mb-8" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        Right now, it feels like…
      </h2>

      {/* Dynamic options using actual urge */}
      <div className="flex col gap-10 mb-16">
        {[
          "I Have To",
          "I Should",
          "I Don't Know How NOT To",
          "Something else…",
        ].map(opt => {
          const isSomething = opt.includes("Something else");
          return (
            <button key={opt} className={`btn-choice ${obligation===opt?"selected":""}`}
              onClick={() => {
                if (isSomething) setStep(44);
                else { setObligation(opt); setTimeout(() => buildRule(), 0); }
              }}
              style={isSomething ? { color:"var(--gold-dim)", borderStyle:"dashed" } : {}}>
              {opt}
            </button>
          );
        })}
      </div>


    </div>
  );

  if (step === 44) return (
    <FreeTextScreen
      title="Right now, it feels like…"
      placeholder="e.g., I am expected to…"
      onContinue={v => { setObligation(v); buildRule(); }}
      onBack={() => setStep(4)}
    />
  );

  // ── SCREEN 5: See the Rule ──
  if (step === 5) return (
    <div className="page pb-64 fade-up">
      <H s={5} />
      <BackBtn onClick={() => setStep(4)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 5 of 9 · See The Rule</p>
      <h2 className="display mb-20" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        My internal rule running right now is…
      </h2>

      {ruleL ? (
        <div style={{ textAlign:"center", padding: "40px 0" }}>
          <span className="loader" style={{ width:28,height:28,display:"inline-block" }} />
          <p className="muted mt-16 small">Finding the rule underneath…</p>
        </div>
      ) : (
        <>
          {/* Rule box: natural sentence order */}
          <div className="rule-box mb-24" style={{ textAlign: "center", fontStyle: "italic" }}>
            When I feel {emotion} and sense {risk} is at risk, {obligation} {urge}.
          </div>

          <p className="fw-600 mb-16 tracking" style={{ color: "var(--cream)", fontSize: ".75rem", textAlign: "center" }}>
            Since what stays in my Rulebook is my choice, I choose to…
          </p>
          <div className="flex col gap-10">
            <button className="btn-choice"
              style={{ borderColor:"rgba(214,179,112,.4)", color:"var(--gold)" }}
              onClick={() => { setRewriteChoice(urge); setStep(8); }}>
              Continue with: {urge}
            </button>
            <button className="btn-choice"
              onClick={() => setStep(6)}>
              Choose Differently
            </button>
          </div>
        </>
      )}
    </div>
  );

  // ── SCREEN 6: Rewriting My Rulebook ──
  if (step === 6) return (
    <div className="page pb-64 fade-up">
      <H s={6} />
      <BackBtn onClick={() => setStep(5)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 6 of 9 · Rewriting</p>
      <h2 className="display mb-24" style={{ fontSize: "1.5rem", lineHeight: 1.35, color: "#f5f0e8" }}>
        In this moment, I choose to…
      </h2>
      <ChoiceList
        options={REWRITE_OPTIONS}
        value={rewriteChoice}
        onChange={v => { doRefine(v); }}
        onOther={() => setStep(66)}
      />
    </div>
  );

  if (step === 66) return (
    <FreeTextScreen
      title="In this moment, I choose to…"
      placeholder="Enter your new choice"
      onContinue={v => { doRefine(v); }}
      onBack={() => setStep(6)}
    />
  );

  // ── SCREEN 7: Alignment Check ──
  if (step === 7) return (
    <div className="page pb-64 fade-up">
      <H s={7} />
      <BackBtn onClick={() => setStep(6)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 7 of 9 · Alignment Check</p>
      <h2 className="display mb-8" style={{ fontSize: "1.4rem", lineHeight: 1.4, color: "#f5f0e8" }}>
        When I think about following through with the choice to{" "}
        <span style={{ color: "var(--gold)" }}>{rewriteChoice}</span>
        {" "}right now, I feel…
      </h2>
      <ChoiceList
        options={ALIGNMENT_OPTIONS}
        value={alignment}
        onChange={v => { setAlignment(v); setTimeout(() => setStep(9), 200); }}
      />
    </div>
  );

  // ── SCREEN 8: Refined rewrite display ──
  if (step === 8) return (
    <div className="page pb-64 fade-up">
      <H s={8} />
      {rewriteL ? (
        <div style={{ textAlign:"center", padding: "40px 0" }}>
          <span className="loader" style={{ width:28,height:28,display:"inline-block" }} />
          <p className="muted mt-16 small">Refining your new rule…</p>
        </div>
      ) : (
        <>
          <BackBtn onClick={() => setStep(6)} />
          <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 8 of 9 · Alignment</p>

          <div className="rewrite-box mb-28" style={{ textAlign: "center" }}>
            I am feeling <span style={{ fontWeight: 600 }}>{emotion}</span> and sense{" "}
            <span style={{ fontWeight: 600 }}>{risk}</span> is at risk. I feel{" "}
            <span style={{ fontWeight: 600 }}>{obligation}</span>{" "}
            <span style={{ fontWeight: 600 }}>{urge}</span>, and am consciously choosing to{" "}
            <span style={{ fontWeight: 600 }}>{finalAction || rewriteChoice}</span> right now.
          </div>

          <h2 className="display mb-16" style={{ fontSize: "1.4rem", lineHeight: 1.4, color: "#f5f0e8" }}>
            When I think about following through with the choice to{" "}
            <span style={{ color: "var(--gold)" }}>{finalAction || rewriteChoice}</span>
            {" "}right now, I feel…
          </h2>
          <ChoiceList
            options={ALIGNMENT_OPTIONS}
            value={alignment}
            onChange={v => { setAlignment(v); setTimeout(() => setStep(9), 200); }}
          />
        </>
      )}
    </div>
  );

  // ── SCREEN 9: Helpful? ──
  if (step === 9) return (
    <div className="page pb-64 fade-up">
      <H s={9} />
      <BackBtn onClick={() => setStep(8)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Step 9 of 9 · Reflection</p>
      <h2 className="display mb-24" style={{ fontSize: "1.4rem", lineHeight: 1.4, color: "#f5f0e8" }}>
        Which of the following is most accurate?
      </h2>
      <ChoiceList
        options={HELPFUL_OPTIONS}
        value={helpful}
        onChange={v => { setHelpful(v); setTimeout(() => setStep(10), 200); }}
      />
    </div>
  );

  // ── SCREEN 10: Custom Feedback + Closing ──
  if (step === 10) return (
    <div className="page pb-64 fade-up">
      <H s={10} />
      <BackBtn onClick={() => setStep(9)} />
      <p className="tracking mb-8" style={{ color: "var(--gold-dim)" }}>Optional · Appreciated</p>
      <h2 className="display mb-8" style={{ fontSize: "1.4rem", lineHeight: 1.4, color: "#f5f0e8" }}>
        Is there anything you want to suggest or share?
      </h2>
      <p className="muted mb-16" style={{ fontSize: ".85rem" }}>
        Did anything feel unclear, slow, unnecessary, or incomplete?
      </p>
      <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
        placeholder="Optional feedback…" style={{ minHeight: 90 }} />

      <button className="btn btn-gold mt-20" onClick={save} disabled={saving}>
        {saving ? <span className="loader" /> : "Submit & Finish"}
      </button>
      <button className="btn btn-ghost mt-8" onClick={save} disabled={saving}>
        Skip
      </button>
    </div>
  );

  return null;
}

// ─────────────────────────────────────────────
// COMPLETE SCREEN
// ─────────────────────────────────────────────
function CompleteScreen({ onDone }) {
  return (
    <div className="page center-page fade-up pb-48">
      <S />
      <div className="grain-overlay" />
      <div style={{ position: "absolute", top: 18, right: 22 }}>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>Log Out</button>
      </div>
      <img
        src="/Logo_Square_Rewriting_Your_Rulebook.png"
        alt="Rewriting Your Rulebook"
        style={{ width: 100, height: 100, objectFit: "contain", margin: "0 auto 24px", display: "block", borderRadius: 16 }}
      />
      <h2 className="display mb-12" style={{ color: "var(--gold)", fontSize: "2rem" }}>Session Complete</h2>
      <GoldDivider />
      <p className="muted mt-16" style={{ maxWidth: 300, lineHeight: 1.8, fontSize: ".9rem" }}>
        Every time you see a rule,<br />
        you get to choose.<br />
        And every time you choose,<br />
        you get a bit more of yourself back.
      </p>
      <p className="tracking mt-12" style={{ color: "var(--gold-dim)", fontSize: ".65rem" }}>
        — Charlene Uli
      </p>
      <button className="btn btn-gold mt-32" style={{ maxWidth: 280 }} onClick={onDone}>
        Return to Your Rulebook
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser]     = useState(null);

  useEffect(() => {
    if (DEMO) {
      const s = localStorage.getItem("ryr_session");
      if (s) { try { setUser(JSON.parse(s)); setScreen("dashboard"); return; } catch {} }
      setScreen("auth"); return;
    }
    getFirebase().then(({ auth: A }) => {
      if (A.isSignInWithEmailLink(A.auth, window.location.href)) {
        const email = localStorage.getItem("ryr_email_link") || prompt("Confirm your email:");
        if (email) {
          A.signInWithEmailLink(A.auth, email, window.location.href)
            .then(r => { setUser(r.user); setScreen("dashboard"); })
            .catch(() => setScreen("auth"));
          return;
        }
      }
      A.onAuthStateChanged(A.auth, u => {
        if (u) { setUser(u); setScreen("dashboard"); }
        else setScreen("auth");
      });
    });
  }, []);

  function login(u) {
    setUser(u);
    if (DEMO) localStorage.setItem("ryr_session", JSON.stringify(u));
    setScreen("dashboard");
  }

  async function logout() {
    if (DEMO) { localStorage.removeItem("ryr_session"); setUser(null); setScreen("auth"); return; }
    const { auth: A } = await getFirebase();
    await A.signOut(A.auth);
    setUser(null); setScreen("auth");
  }

  return (
    <>
      <S />
      <div className="grain-overlay" />
      {screen === "loading" && (
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh" }}>
          <span className="loader" style={{ width:28,height:28 }} />
        </div>
      )}
      {screen === "auth"      && <AuthScreen onLogin={login} />}
      {screen === "dashboard" && user && <Dashboard user={user} onCapture={() => setScreen("capture")} onLogout={logout} />}
      {screen === "capture"   && user && <CaptureFlow user={user} onBack={() => setScreen("dashboard")} onDone={() => setScreen("complete")} onLogout={logout} />}
      {screen === "complete"  && <CompleteScreen onDone={() => setScreen("dashboard")} />}
    </>
  );
}
