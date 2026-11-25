"use client";

import { useState } from "react";

const items = [
  ["Overview", "overview"],
  ["Investment History", "investment-history"],
  ["Outstanding Balance", "outstanding-balance"],
  ["Investment Returns", "investment-returns"],
  ["Maturity Information", "maturity-information"],
  ["Merchandise Portfolio", "merchandise-portfolio"],
  ["Investment Documents", "investment-documents"],
  ["Contact Information", "contact-information"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return <>
    <button className="menu-btn" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
    {open && <>
      <button className="scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />
      <nav className="drawer" aria-label="Dashboard sections">{items.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
    </>}
  </>;
}
