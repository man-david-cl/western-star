import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/access";
import Navigation from "@/components/Navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const investments = [
  { month: "July", expected: 200, paid: 200 },
  { month: "August", expected: 500, paid: 500 },
  { month: "September", expected: 200, paid: 200 },
  { month: "October", expected: 300, paid: 150 },
  { month: "November", expected: 350, paid: 0 },
  { month: "December", expected: 350, paid: 0 },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ws_access")?.value;
  const access = accessToken ? verifyAccessToken(accessToken) : null;

  if (!access) {
    return (
      <main className="locked-screen">
        <div className="locked-card">
          <span className="brand-mark">W</span>
          <p className="eyebrow">WESTERN STAR · PRIVATE PORTFOLIO</p>
          <h1>This portfolio is private.</h1>
          <p>To view Lori Pope’s portfolio, open the secure access link that was sent to you.</p>
          <small>For assistance, contact the portfolio administrator.</small>
        </div>
      </main>
    );
  }

  const target = investments.reduce((sum, row) => sum + row.expected, 0);
  const paid = investments.reduce((sum, row) => sum + row.paid, 0);
  const outstanding = Math.max(target - paid, 0);
  const interest = Math.round(target * 0.15);
  const payout = target + interest;

  return (
    <main>
      <header className="topbar">
        <Navigation />
        <a className="brand" href="#overview">
          <span className="brand-mark">W</span>
          <span><b>WESTERN STAR</b><small>MERCHANDISE CAPITAL PORTFOLIO</small></span>
        </a>
        <span className="private-tag">PRIVATE CLIENT PORTAL</span>
      </header>

      <section className="hero" id="overview">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">CLIENT PORTFOLIO · JULY — DECEMBER 2026</p>
            <h1>Welcome, Lori Pope.</h1>
            <p className="hero-copy">A clear view of your investments, remaining balance and projected maturity benefits.</p>
          </div>
          <div className="period"><span>INVESTMENT PERIOD</span><b>JUL — DEC</b><small>2026</small></div>
        </div>
      </section>

      <div className="content">
        <div className="notice-strip"><span>PORTFOLIO SUMMARY</span><p>Figures shown are based on the investment schedule supplied for this portfolio and remain subject to reconciliation against verified payment records and the governing agreement.</p></div>

        <section className="client-profile" aria-label="Client profile"><div className="client-avatar">LP</div><div><span>CLIENT PROFILE</span><h2>Lori Pope</h2><p>Phone number and email address will be added after confirmation.</p></div><small>PRIVATE CLIENT</small></section>

        <section className="metrics" aria-label="Financial overview">
          <Metric label="Total Investment Target" value={money(target)} note="Scheduled capital investment" />
          <Metric label="Total Paid" value={money(paid)} note="Recorded in the supplied schedule" />
          <Metric label="Outstanding" value={money(outstanding)} note="Remaining scheduled investment" />
          <Metric label="Projected Interest" value={money(interest)} note="15% of full target capital" />
        </section>

        <section className="section" id="investment-history">
          <SectionTitle number="01" title="Investment History" />
          <p className="section-intro">Monthly investment investment schedule for July to December 2026.</p>
          <div className="table-wrap"><table><thead><tr><th>Month</th><th>Expected</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
            <tbody>{investments.map((row) => {
              const balance = Math.max(row.expected - row.paid, 0);
              const status = balance === 0 ? "Completed" : row.paid > 0 ? "Partially paid" : "Pending";
              return <tr key={row.month}><td>{row.month} 2026</td><td>{money(row.expected)}</td><td>{money(row.paid)}</td><td>{money(balance)}</td><td><span className={balance === 0 ? "status done" : row.paid > 0 ? "status partial" : "status pending"}>{status}</span></td></tr>;
            })}</tbody>
            <tfoot><tr><td>Total</td><td>{money(target)}</td><td>{money(paid)}</td><td>{money(outstanding)}</td><td>—</td></tr></tfoot>
          </table></div>
        </section>

        <section className="section" id="outstanding-balance">
          <SectionTitle number="02" title="Outstanding Balance" />
          <div className="balance-card">
            <div><span className="eyebrow">FINAL Investment SETTLEMENT</span><strong>{money(outstanding)}</strong><p>Proposed settlement deadline: December 7, 2026.</p></div>
            <div className="balance-breakdown">
              <div><span>October balance</span><b>{money(150)}</b></div>
              <div><span>November investment</span><b>{money(350)}</b></div>
              <div><span>December investment</span><b>{money(350)}</b></div>
              <div className="balance-total"><span>Total outstanding</span><b>{money(outstanding)}</b></div>
            </div>
          </div>
        </section>

        <section className="section" id="investment-returns">
          <SectionTitle number="03" title="Your Maturity Benefits" />
          <div className="return-grid">
            <div><span>ORIGINAL CAPITAL</span><b>{money(target)}</b></div>
            <div><span>AGREED INTEREST RATE</span><b>15%</b></div>
            <div><span>PROJECTED INTEREST</span><b>{money(interest)}</b></div>
            <div className="highlight"><span>TOTAL PROJECTED PAYOUT</span><b>{money(payout)}</b></div>
          </div>
          <p className="hint">The projected interest is calculated once at 15% of the full {money(target)} capital target. This is a projection, not a guarantee of payment or return.</p>
        </section>

        <section className="section" id="maturity-information">
          <SectionTitle number="04" title="Maturity Information" />
          <div className="maturity">
            <div><span>PROPOSED MATURITY DATE</span><h3>January 31, 2027</h3></div>
            <p>Projected maturity value: <strong>{money(payout)}</strong>. This comprises the original capital target and projected interest, subject to completion of investments, final reconciliation and the terms of the signed agreement.</p>
          </div>
        </section>

        <section className="section" id="merchandise-portfolio">
          <SectionTitle number="05" title="Merchandise Portfolio" />
          <p className="section-intro">A snapshot of established names in the Western apparel and merchandise category.</p>
          <div className="brands"><div>WRANGLER<small>DENIM & WESTERN APPAREL</small></div><div>GOLDEN WEST BOOTS<small>WESTERN FOOTWEAR</small></div><div>CHARLIE 1 HORSE<small>WESTERN HATS</small></div></div>
          <p className="hint">These names are included for industry reference only. No sponsorship, endorsement or commercial partnership is implied.</p>
        </section>

        <section className="section" id="investment-documents">
          <SectionTitle number="06" title="Investment Documents" />
          <div className="empty-state"><span>DOCUMENT CENTRE</span><p>Signed agreements, verified payment receipts and account statements will be added here once secure document storage has been configured. No documents are currently represented as uploaded.</p></div>
        </section>

        <section className="section" id="contact-information">
          <SectionTitle number="07" title="Contact Information" />
          <div className="empty-state"><span>PORTFOLIO ADMINISTRATOR</span><p>Administrator name, business address, telephone number and email will be displayed here once confirmed.</p></div>
        </section>

        <footer><b>WESTERN STAR</b><span>MERCHANDISE CAPITAL PORTFOLIO</span><p>Privacy notice: This portfolio contains private financial information and is intended only for the authorized recipient. Please do not forward the access link. Contact the portfolio administrator if you believe the link has been shared without permission.</p><small>© 2026 WESTERN STAR. All rights reserved.</small></footer>
      </div>
    </main>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}
function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="section-title"><span>{number}</span><h2>{title}</h2></div>;
}
