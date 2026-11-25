"use client";

import { useMemo, useState } from "react";

const initialRows = [
  { month: "July", expected: 200, paid: 200 },
  { month: "August", expected: 500, paid: 500 },
  { month: "September", expected: 200, paid: 200 },
  { month: "October", expected: 300, paid: 150 },
  { month: "November", expected: 350, paid: 0 },
  { month: "December", expected: 350, paid: 0 }
];
const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const sections = ["Overview", "My Profile", "Contribution History", "Outstanding Balance", "Investment Returns", "Maturity Information", "Merchandise Portfolio", "Investment Documents", "Contact Information"];

export default function Home() {
  const [rows, setRows] = useState(initialRows);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Lori Pope", phone: "Add client phone number", email: "Add client email address" });
  const paid = useMemo(() => rows.reduce((sum, row) => sum + row.paid, 0), [rows]);
  const target = rows.reduce((sum, row) => sum + row.expected, 0);
  const outstanding = Math.max(target - paid, 0);
  const interest = target * 0.15;
  const updatePaid = (index: number, value: string) => setRows(current => current.map((row, i) => i === index ? { ...row, paid: Math.min(row.expected, Math.max(0, Number(value) || 0)) } : row));
  const jump = (label: string) => { document.getElementById(label.toLowerCase().replaceAll(" ", "-"))?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <main>
    <header className="topbar">
      <button className="menu-btn" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      <a className="brand" href="#overview"><span className="brand-mark">W</span><span><b>WESTERN STAR</b><small>MERCHANDISE CAPITAL PORTFOLIO</small></span></a>
      <span className="private-tag">PRIVATE CLIENT PORTAL</span>
    </header>
    {menuOpen && <><button className="scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} /><nav className="drawer">{sections.map(s => <button key={s} onClick={() => jump(s)}>{s}</button>)}</nav></>}
    <section className="hero" id="overview">
      <div className="hero-inner"><div><p className="eyebrow">CLIENT PORTFOLIO · JULY — DECEMBER 2026</p><h1>Welcome, {profile.name}.</h1><p className="hero-copy">Your investment overview, contributions and projected maturity benefits.</p></div><div className="period"><span>INVESTMENT PERIOD</span><b>JUL — DEC</b><small>2026</small></div></div>
    </section>
    <div className="content">
      <section className="metrics">
        <Metric label="Total Investment Target" value={money(target)} note="Agreed capital contribution" />
        <Metric label="Total Paid" value={money(paid)} note="Recorded contributions" />
        <Metric label="Outstanding" value={money(outstanding)} note="Remaining contribution" />
        <Metric label="Projected Interest" value={money(interest)} note="15% of full capital target" />
      </section>
      <section className="section" id="my-profile"><SectionTitle number="01" title="Client Profile" /><div className="profile-card"><div className="avatar">{profile.name.split(" ").map(x => x[0]).join("").slice(0,2).toUpperCase()}</div><div className="profile-info"><h3>{profile.name}</h3><p>{profile.phone}</p><p>{profile.email}</p></div><button className="outline-btn" onClick={() => setEditing(!editing)}>{editing ? "Close editor" : "Edit profile"}</button></div>{editing && <div className="edit-panel"><label>Full name<input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></label><label>Phone number<input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} /></label><label>Email address<input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} /></label><p className="hint">Demo edits are temporary and are not saved to a secure client database.</p></div>}</section>
      <section className="section" id="contribution-history"><SectionTitle number="02" title="Contribution History" /><div className="section-head"><p>Monthly contribution progress for the current investment period.</p><button className="outline-btn" onClick={() => setEditing(!editing)}>{editing ? "Finish editing" : "Edit demo payments"}</button></div><div className="table-wrap"><table><thead><tr><th>Month</th><th>Expected</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody>{rows.map((r,i) => <tr key={r.month}><td>{r.month} 2026</td><td>{money(r.expected)}</td><td>{editing ? <input className="amount-input" aria-label={r.month + " paid amount"} type="number" min="0" max={r.expected} value={r.paid} onChange={e => updatePaid(i,e.target.value)} /> : money(r.paid)}</td><td>{money(Math.max(r.expected-r.paid,0))}</td><td><span className={r.paid >= r.expected ? "status done" : r.paid > 0 ? "status partial" : "status pending"}>{r.paid >= r.expected ? "Completed" : r.paid > 0 ? "Partially paid" : "Pending"}</span></td></tr>)}</tbody><tfoot><tr><td>Total</td><td>{money(target)}</td><td>{money(paid)}</td><td>{money(outstanding)}</td><td>—</td></tr></tfoot></table></div>{editing && <p className="warning">Prototype only: these browser-side figures are not verified payment records.</p>}</section>
      <section className="section" id="outstanding-balance"><SectionTitle number="03" title="Outstanding Balance" /><div className="balance-card"><div><span className="eyebrow">REMAINING CONTRIBUTION</span><strong>{money(outstanding)}</strong><p>Proposed final settlement deadline: December 7, 2026.</p></div><div className="balance-breakdown">{rows.filter(r => r.expected-r.paid > 0).map(r => <div key={r.month}><span>{r.month}</span><b>{money(r.expected-r.paid)}</b></div>)}</div></div></section>
      <section className="section" id="investment-returns"><SectionTitle number="04" title="Investment Returns" /><div className="return-grid"><div><span>ORIGINAL CAPITAL</span><b>{money(target)}</b></div><div><span>AGREED INTEREST RATE</span><b>15%</b></div><div><span>PROJECTED INTEREST</span><b>{money(interest)}</b></div><div className="highlight"><span>PROJECTED TOTAL PAYOUT</span><b>{money(target+interest)}</b></div></div><p className="hint">Illustrative projection based on the full target contribution. Interest is calculated once on the full {money(target)} capital target; payout is not a guarantee.</p></section>
      <section className="section" id="maturity-information"><SectionTitle number="05" title="Maturity Information" /><div className="maturity"><div><span>PROPOSED MATURITY DATE</span><h3>January 31, 2027</h3></div><p>The projected maturity value is {money(target+interest)}, comprising original capital and projected interest, subject to the governing investment agreement and final reconciliation.</p></div></section>
      <section className="section" id="merchandise-portfolio"><SectionTitle number="06" title="Merchandise Portfolio" /><p className="section-intro">Merchandise brand references associated with the portfolio.</p><div className="brands"><div>WRANGLER<small>APPAREL</small></div><div>GOLDEN WEST BOOTS<small>FOOTWEAR</small></div><div>CHARLIE 1 HORSE<small>WESTERN HATS</small></div></div><p className="hint">Brand names are references only and do not imply sponsorship, endorsement or partnership.</p></section>
      <section className="section" id="investment-documents"><SectionTitle number="07" title="Investment Documents" /><div className="empty-state"><span>DOCUMENT CENTRE</span><p>Investment agreement, verified receipts and statements will appear here when secure document storage is connected.</p></div></section>
      <section className="section" id="contact-information"><SectionTitle number="08" title="Contact Information" /><div className="empty-state"><span>PORTFOLIO ADMINISTRATOR</span><p>Operator contact details have not yet been provided.</p></div></section>
      <footer><b>WESTERN STAR</b><span>MERCHANDISE CAPITAL PORTFOLIO</span><p>Private financial information. Access should be restricted to the client and authorized administrator.</p><small>© 2026 WESTERN STAR. All rights reserved.</small></footer>
    </div>
  </main>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}
function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="section-title"><span>{number}</span><h2>{title}</h2></div>;
}