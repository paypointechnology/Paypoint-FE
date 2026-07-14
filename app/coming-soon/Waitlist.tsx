"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { joinWaitlist, submitWaitlistSurvey } from "./actions";
import { WhatsAppIcon, InstagramIcon } from "../pay/_components/icons";

/* ────────────────────────────────────────────────────────────────────────
   Reworked early-access / waitlist experience.
   - Captures the email the instant it's submitted (joinWaitlist).
   - Opens a 3-question survey modal to enrich the same row.
   No payment-processor names anywhere; the seller keeps their own bank.
──────────────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CHANNELS = [
  { val: "instagram", label: "Instagram" },
  { val: "whatsapp", label: "WhatsApp" },
  { val: "tiktok", label: "TikTok" },
  { val: "facebook", label: "Facebook" },
  { val: "x", label: "X (Twitter)" },
  { val: "other", label: "Somewhere else" },
];

const SELLS = [
  { val: "products", emoji: "🛍️", title: "Physical products", sub: "Fashion, food, beauty, gadgets" },
  { val: "services", emoji: "✂️", title: "Services", sub: "Makeup, photography, consulting" },
  { val: "digital", emoji: "📱", title: "Digital products", sub: "Courses, ebooks, templates" },
  { val: "events", emoji: "🎟️", title: "Events & bookings", sub: "Tickets, deposits, reservations" },
];

const CHALLENGES = [
  { val: "getting-paid", emoji: "💳", title: "Getting paid", sub: "Too much friction between yes and payment" },
  { val: "followup", emoji: "📨", title: "Following up", sub: "Chasing payments takes too much time" },
  { val: "orders", emoji: "📋", title: "Managing orders", sub: "Losing track of who ordered what" },
  { val: "professional", emoji: "✨", title: "Looking professional", sub: "Account numbers feel unprofessional" },
];

export default function Waitlist() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [emailHero, setEmailHero] = useState("");
  const [emailJoin, setEmailJoin] = useState("");
  const [error, setError] = useState<{ source: string; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [waitlistId, setWaitlistId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 welcome, 1-3 questions, 4 done

  const [sells, setSells] = useState<string | null>(null);
  const [channels, setChannels] = useState<string[]>([]);
  const [challenge, setChallenge] = useState<string | null>(null);

  // Scroll reveal for [data-reveal] elements.
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Lock body scroll + Escape-to-close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const join = useCallback(
    async (email: string, source: "hero" | "join") => {
      if (loading) return;
      const clean = email.trim();
      if (!EMAIL_RE.test(clean)) {
        setError({ source, msg: "Please enter a valid email address." });
        return;
      }
      setLoading(true);
      setError(null);
      const res = await joinWaitlist(clean, source);
      setLoading(false);
      if (!res.ok) {
        setError({ source, msg: res.error });
        return;
      }
      setWaitlistId(res.id);
      setStep(0);
      setOpen(true);
    },
    [loading],
  );

  async function finishSurvey() {
    if (waitlistId) {
      // Fire-and-forget from the user's view; the email is already captured.
      submitWaitlistSurvey(waitlistId, {
        sells: sells ?? undefined,
        channels,
        challenge: challenge ?? undefined,
      });
    }
    setStep(4);
  }

  function toggleChannel(val: string) {
    setChannels((c) => (c.includes(val) ? c.filter((x) => x !== val) : [...c, val]));
  }

  return (
    <div ref={rootRef} className="bg-white text-[#33323F]">
      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative overflow-hidden">
        {/* Brand glow + faint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(120%_90%_at_50%_0%,#F5F4FF_0%,#EEEDFE_42%,rgba(238,237,254,0)_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#14132b08_1px,transparent_1px),linear-gradient(to_bottom,#14132b08_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,#000_55%,transparent_100%)]"
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pt-36 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_400px]">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5F58F4]/20 bg-[#EEEDFE] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5F58F4]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F58F4] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5F58F4]" />
                </span>
                Early access · Now open
              </span>

              <h1 className="mt-6 text-[clamp(36px,5.4vw,58px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#14132B]">
                Turn every post into a{" "}
                <span className="text-[#5F58F4]">payment link.</span>
              </h1>

              <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-[#6C6B7B]">
                Paypoint is the fastest way for social sellers to turn attention
                into money in the bank. Join early access and start selling
                before we open to the public.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  join(emailHero, "hero");
                }}
                className="mt-8 flex max-w-[500px] flex-col gap-3 sm:flex-row"
                noValidate
              >
                <input
                  type="email"
                  value={emailHero}
                  onChange={(e) => setEmailHero(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="h-[52px] flex-1 rounded-xl border border-[#E3E2EE] bg-white px-4 text-[15px] text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[52px] shrink-0 rounded-xl bg-[#5F58F4] px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(95,88,244,0.7)] transition hover:-translate-y-0.5 hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:translate-y-0"
                >
                  {loading ? "Joining…" : "Join early access"}
                </button>
              </form>
              {error?.source === "hero" && (
                <p className="mt-2.5 text-sm font-medium text-[#B42318]" role="alert">
                  {error.msg}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                {["Free to join", "Early product access", "Founding seller benefits"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6C6B7B]"
                    >
                      <CheckDot />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Animated pipeline */}
            <div data-reveal className="reveal mx-auto w-full max-w-[400px]">
              <HeroPipeline />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY ══════════════════ */}
      <section className="bg-[#14132B] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
            Why we built Paypoint
          </span>
          <h2 className="mt-3 max-w-[560px] text-[clamp(26px,3.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
            Every day, businesses lose customers for one simple reason.
          </h2>
          <p className="mt-3 text-base text-white/50">
            Buying online still feels harder than it should.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ul data-reveal className="reveal flex flex-col">
              {[
                { i: "💬", t: "Customers ask for your account number" },
                { i: "⏳", t: "They wait for your reply" },
                { i: "📱", t: "They send payment screenshots" },
                { i: "🤔", t: "They forget" },
                { i: "↩️", t: "They change their minds" },
                { i: "🚪", t: "They leave" },
              ].map((row, idx, arr) => (
                <li
                  key={row.t}
                  className={`flex items-center gap-4 py-3.5 text-[15px] text-white/60 ${
                    idx < arr.length - 1 ? "border-b border-white/[0.07]" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sm">
                    {row.i}
                  </span>
                  {row.t}
                </li>
              ))}
            </ul>

            <div
              data-reveal
              className="reveal rounded-2xl border border-[#5F58F4]/30 bg-[#5F58F4]/[0.14] p-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C7C4F7]">
                Our belief
              </p>
              <p className="mt-4 text-[21px] font-bold leading-[1.45] tracking-[-0.01em] text-white">
                We think selling should be as easy as{" "}
                <span className="text-[#C7C4F7]">posting.</span>
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/55">
                No account numbers. No screenshots. No chasing. Just a link your
                customers tap, and money that lands straight in your bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHAT YOU'LL GET ══════════════════ */}
      <section className="bg-[#FAFAFE] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5F58F4]">
              What you&rsquo;ll get
            </span>
            <h2 className="mt-3 text-[clamp(26px,3.6vw,40px)] font-extrabold tracking-[-0.025em] text-[#14132B]">
              Built for the founders who get here first.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "1",
                t: "Early access",
                d: "Be among the first businesses to use Paypoint before we open to the public. You shape the product from the inside.",
              },
              {
                n: "2",
                t: "Help shape the product",
                d: "Your feedback directly influences what we build next. Founding sellers have a direct line to the team.",
              },
              {
                n: "3",
                t: "Founding seller benefits",
                d: "Exclusive perks reserved for the people who believed in Paypoint before everyone else did.",
              },
            ].map((c, i) => (
              <div
                key={c.n}
                data-reveal
                className="reveal group rounded-2xl border border-[#ECEBF3] bg-white p-7 transition hover:-translate-y-1 hover:border-[#5F58F4] hover:shadow-[0_18px_40px_-24px_rgba(95,88,244,0.5)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEEDFE] text-base font-extrabold text-[#5F58F4]">
                  {c.n}
                </div>
                <h3 className="mt-5 text-[17px] font-extrabold text-[#14132B]">
                  {c.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6C6B7B]">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO IT'S FOR ══════════════════ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5F58F4]">
            Who Paypoint is for
          </span>
          <h2 className="mt-3 text-[clamp(26px,3.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#14132B]">
            If you sell through social media, this is for you.
          </h2>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {[
              "👗 Fashion brands",
              "💄 Beauty businesses",
              "💼 Freelancers",
              "🎨 Creators",
              "📊 Consultants",
              "🍲 Food vendors",
              "📸 Photographers",
              "🎓 Coaches",
              "🎪 Event planners",
              "📱 Digital sellers",
              "✂️ Hair & styling",
            ].map((p, i) => (
              <span
                key={p}
                data-reveal
                className="reveal rounded-full border border-[#E3E2EE] bg-white px-4 py-2.5 text-sm font-semibold text-[#33323F] transition hover:-translate-y-0.5 hover:border-[#5F58F4] hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-7 text-base font-bold text-[#5F58F4]">
            Anyone selling through social media.
          </p>
        </div>
      </section>

      {/* ══════════════════ TODAY vs PAYPOINT ══════════════════ */}
      <section className="bg-[#14132B] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
              The future of selling
            </span>
            <h2 className="mt-3 text-[clamp(26px,3.6vw,40px)] font-extrabold tracking-[-0.025em] text-white">
              The journey is about to get much shorter.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {/* Today */}
            <div data-reveal className="reveal overflow-hidden rounded-2xl">
              <div className="bg-white/[0.04] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-white/35">
                Today
              </div>
              <div className="bg-white/[0.02] px-6 pb-6 pt-2">
                {[
                  { i: "📝", t: "Customer sees your post", s: "Interested, but doesn't know how to buy" },
                  { i: "💬", t: "Sends you a DM", s: "“Is this available? How much?”" },
                  { i: "🔢", t: "You send an account number", s: "They switch to their banking app" },
                  { i: "⏳", t: "They wait. You wait.", s: "Friction builds. Minds change." },
                  { i: "📷", t: "They send a screenshot", s: "You check your bank to confirm" },
                  { i: "🤦", t: "Some just disappear", s: "Lost sale, no way to know why" },
                ].map((row, idx, arr) => (
                  <div
                    key={row.t}
                    className={`flex items-start gap-3.5 py-3 ${
                      idx < arr.length - 1 ? "border-b border-white/[0.05]" : ""
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-xs">
                      {row.i}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white/45">{row.t}</div>
                      <div className="mt-0.5 text-xs text-white/25">{row.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* With Paypoint */}
            <div
              data-reveal
              className="reveal overflow-hidden rounded-2xl"
              style={{ transitionDelay: "90ms" }}
            >
              <div className="bg-[#5F58F4]/25 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-[#C7C4F7]">
                Now · with Paypoint
              </div>
              <div className="bg-[#5F58F4]/[0.08] px-6 pb-6 pt-2">
                {[
                  { i: "🔗", t: "Customer taps your link", s: "In your bio, status, or any post" },
                  { i: "🛒", t: "Opens your checkout", s: "A professional page, no DMs needed" },
                  { i: "💳", t: "Pays in seconds", s: "Secure checkout, no back-and-forth" },
                  { i: "🏦", t: "Bank alert. Done.", s: "Money in your account, automatically" },
                ].map((row, idx, arr) => (
                  <div
                    key={row.t}
                    className={`flex items-start gap-3.5 py-3 ${
                      idx < arr.length - 1 ? "border-b border-white/[0.05]" : ""
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#5F58F4]/50 bg-[#5F58F4]/30 text-xs">
                      {row.i}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{row.t}</div>
                      <div className="mt-0.5 text-xs text-white/45">{row.s}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#12B76A]/30 bg-[#12B76A]/[0.14] px-4 py-3">
                  <span className="text-lg">🎉</span>
                  <span className="text-sm font-bold text-[#12B76A]">
                    More sales. Less chasing. Every day.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ JOIN ══════════════════ */}
      <section id="join" className="bg-[#FAFAFE] py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5F58F4]">
            Join the first generation of Paypoint sellers
          </span>
          <h2 className="mt-4 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#14132B]">
            You&rsquo;re not joining another waitlist.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#6C6B7B]">
            You&rsquo;re helping shape how millions of African businesses will
            sell online.{" "}
            <span className="font-semibold text-[#14132B]">
              If you&rsquo;ve ever lost a sale because buying was too
              complicated, you&rsquo;re exactly who we&rsquo;re building for.
            </span>
          </p>

          <div data-reveal className="reveal mt-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A99A8]">
              You&rsquo;re joining builders like
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "👗 Fashion",
                "💄 Beauty",
                "📸 Photographers",
                "🎓 Coaches",
                "🍲 Food vendors",
                "💻 Freelancers",
                "🎨 Creators",
                "🏷️ Small businesses",
              ].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-[#E3E2EE] bg-white px-4 py-2 text-[13px] font-semibold text-[#33323F]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              join(emailJoin, "join");
            }}
            className="mx-auto mt-10 flex max-w-[500px] flex-col gap-3 sm:flex-row"
            noValidate
          >
            <input
              type="email"
              value={emailJoin}
              onChange={(e) => setEmailJoin(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="h-[54px] flex-1 rounded-xl border-2 border-[#E3E2EE] bg-white px-5 text-base text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4]"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-[54px] shrink-0 rounded-xl bg-[#5F58F4] px-7 text-[15px] font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7]"
            >
              {loading ? "Joining…" : "Be first"}
            </button>
          </form>
          {error?.source === "join" && (
            <p className="mt-2.5 text-sm font-medium text-[#B42318]" role="alert">
              {error.msg}
            </p>
          )}
          <p className="mt-3 text-[13px] text-[#9A99A8]">
            No spam. No commitments. Just early access.
          </p>
        </div>
      </section>

      {/* ══════════════════ CLOSING BAND ══════════════════ */}
      <section className="bg-[#14132B] py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[clamp(22px,3vw,32px)] font-extrabold leading-tight tracking-[-0.02em] text-white">
            Attention is everywhere. Revenue isn&rsquo;t.
          </p>
          <p className="mt-2 text-[15px] text-white/45">
            Let&rsquo;s fix that together.
          </p>
        </div>
      </section>

      {/* ══════════════════ SURVEY MODAL ══════════════════ */}
      {open && (
        <SurveyModal
          step={step}
          setStep={setStep}
          onClose={() => setOpen(false)}
          sells={sells}
          setSells={setSells}
          channels={channels}
          toggleChannel={toggleChannel}
          challenge={challenge}
          setChallenge={setChallenge}
          onFinish={finishSurvey}
        />
      )}
    </div>
  );
}

/* ────────────────────────── Hero pipeline visual ────────────────────────── */
function HeroPipeline() {
  return (
    <div className="rounded-[22px] border border-[#E3E2EE] bg-white p-5 shadow-[0_24px_60px_-30px_rgba(20,19,43,0.3)]">
      <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A99A8]">
        What happens when you use Paypoint
      </p>

      {/* Step 1: social */}
      <div className="flex items-center gap-3 rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEDFE] text-[#5F58F4]">
          <InstagramIcon size={17} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#14132B]">
            Instagram
            <span className="text-[#C7C4F7]">·</span> WhatsApp
            <span className="text-[#C7C4F7]">·</span> TikTok
          </div>
          <div className="mt-0.5 text-[11px] text-[#6C6B7B]">
            A customer sees your link in your bio or story
          </div>
        </div>
      </div>

      <Connector />

      {/* Step 2: mini checkout */}
      <div className="rounded-xl border border-[#ECEBF3] bg-white p-3.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#14132B]">Adaeze Couture</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#5F58F4]">
            <LockGlyph /> Secure
          </span>
        </div>
        <div className="text-[11px] text-[#6C6B7B]">Aso Oke Dress</div>
        <div className="my-1 text-[22px] font-extrabold tracking-[-0.02em] text-[#14132B]">
          ₦35,000
        </div>
        <div className="mt-1.5 rounded-lg bg-[#5F58F4] py-2 text-center text-[12px] font-bold text-white">
          Pay ₦35,000
        </div>
        <div className="mt-1.5 text-center text-[10px] text-[#9A99A8]">
          Secure checkout
        </div>
      </div>

      <Connector />

      {/* Step 3: bank alert */}
      <div className="flex items-center gap-3 rounded-xl bg-[#12111F] px-4 py-3">
        <span className="text-xl">🏦</span>
        <div>
          <div className="text-[10px] font-semibold text-[#8B8B99]">
            GTBank · Credit alert
          </div>
          <div className="mt-0.5 text-[15px] font-extrabold tracking-[-0.01em] text-[#12B76A]">
            ₦35,000.00 received
          </div>
          <div className="mt-0.5 text-[10px] text-[#5B5B6B]">
            From CHIDINMA OKEKE
          </div>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center gap-1 py-1.5">
      <span className="h-1 w-1 rounded-full bg-[#E3E2EE]" />
      <span className="h-1 w-1 rounded-full bg-[#E3E2EE]" />
      <span className="h-1 w-1 rounded-full bg-[#E3E2EE]" />
    </div>
  );
}

function CheckDot() {
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#12B76A] text-white">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function LockGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ─────────────────────────────── Survey modal ─────────────────────────────── */
function SurveyModal({
  step,
  setStep,
  onClose,
  sells,
  setSells,
  channels,
  toggleChannel,
  challenge,
  setChallenge,
  onFinish,
}: {
  step: number;
  setStep: (n: number) => void;
  onClose: () => void;
  sells: string | null;
  setSells: (v: string) => void;
  channels: string[];
  toggleChannel: (v: string) => void;
  challenge: string | null;
  setChallenge: (v: string) => void;
  onFinish: () => void;
}) {
  const showProgress = step >= 1 && step <= 3;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#14132B]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="A few quick questions"
    >
      <div
        className="animate-onboard-fade max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[24px] bg-white p-8 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        {showProgress && (
          <div className="mb-8 flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-colors ${
                  i < step ? "bg-[#5F58F4]" : i === step ? "bg-[#C7C4F7]" : "bg-[#E3E2EE]"
                }`}
              />
            ))}
          </div>
        )}

        {/* Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-4 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-[#14132B]">
              You&rsquo;re in.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[380px] text-[15px] leading-relaxed text-[#6C6B7B]">
              You&rsquo;ve joined the founding generation of sellers shaping how
              social businesses get paid in Africa.
            </p>
            <div className="mt-6 rounded-2xl border border-[#EEEDFE] bg-[#F5F4FF] p-5 text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5F58F4]">
                What happens next
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {[
                  "You'll get early access before the public launch",
                  "Your feedback will directly shape the product",
                  "Founding seller benefits, straight to your inbox",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-[#33323F]">
                    <CheckDot />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 h-12 w-full rounded-xl bg-[#5F58F4] text-[15px] font-semibold text-white transition hover:bg-[#4A43D6]"
            >
              Help us build for you
            </button>
            <p className="mt-2.5 text-[13px] text-[#9A99A8]">
              3 quick questions, about 30 seconds
            </p>
          </div>
        )}

        {/* Q1 */}
        {step === 1 && (
          <Question
            label="Question 1 of 3"
            title="What do you sell?"
            sub="Choose the one that fits best."
          >
            <div className="flex flex-col gap-2.5">
              {SELLS.map((o) => (
                <OptionRow
                  key={o.val}
                  emoji={o.emoji}
                  title={o.title}
                  sub={o.sub}
                  selected={sells === o.val}
                  onClick={() => setSells(o.val)}
                />
              ))}
            </div>
            <ModalButtons
              onSkip={() => setStep(2)}
              onNext={() => setStep(2)}
              nextDisabled={!sells}
              nextLabel="Continue"
            />
          </Question>
        )}

        {/* Q2 */}
        {step === 2 && (
          <Question
            label="Question 2 of 3"
            title="Where do most of your customers come from?"
            sub="Select all that apply."
          >
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((o) => {
                const on = channels.includes(o.val);
                return (
                  <button
                    key={o.val}
                    type="button"
                    onClick={() => toggleChannel(o.val)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                      on
                        ? "border-[#5F58F4] bg-[#F5F4FF] text-[#5F58F4]"
                        : "border-[#E3E2EE] bg-white text-[#33323F] hover:border-[#C7C4F7] hover:bg-[#F5F4FF]"
                    }`}
                  >
                    {o.val === "whatsapp" ? (
                      <WhatsAppIcon size={15} />
                    ) : o.val === "instagram" ? (
                      <InstagramIcon size={15} />
                    ) : null}
                    {o.label}
                  </button>
                );
              })}
            </div>
            <ModalButtons
              onSkip={() => setStep(3)}
              onNext={() => setStep(3)}
              nextDisabled={channels.length === 0}
              nextLabel="Continue"
            />
          </Question>
        )}

        {/* Q3 */}
        {step === 3 && (
          <Question
            label="Question 3 of 3"
            title="What's your biggest challenge today?"
            sub="Be honest, it helps us build the right things first."
          >
            <div className="flex flex-col gap-2.5">
              {CHALLENGES.map((o) => (
                <OptionRow
                  key={o.val}
                  emoji={o.emoji}
                  title={o.title}
                  sub={o.sub}
                  selected={challenge === o.val}
                  onClick={() => setChallenge(o.val)}
                />
              ))}
            </div>
            <ModalButtons
              onSkip={onFinish}
              onNext={onFinish}
              nextDisabled={!challenge}
              nextLabel="Finish"
            />
          </Question>
        )}

        {/* Done */}
        {step === 4 && (
          <div className="text-center">
            <div className="text-5xl">🚀</div>
            <h2 className="mt-4 text-[24px] font-extrabold tracking-[-0.02em] text-[#14132B]">
              We&rsquo;ll see you at launch.
            </h2>
            <p className="mx-auto mt-2.5 max-w-[400px] text-[15px] leading-relaxed text-[#6C6B7B]">
              You&rsquo;re now a founding Paypoint seller. We&rsquo;ll be in touch
              with early access details, product updates, and your founding
              benefits before anyone else.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-5 py-2 text-[13px] font-bold text-[#5F58F4]">
              🇳🇬 Founding seller · Early access
            </div>
            <button
              onClick={onClose}
              className="mt-6 h-12 w-full rounded-xl border border-[#EEEDFE] bg-[#F5F4FF] text-[15px] font-semibold text-[#5F58F4] transition hover:bg-[#EEEDFE]"
            >
              Close and return to page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Question({
  label,
  title,
  sub,
  children,
}: {
  label: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5F58F4]">
        {label}
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-[-0.01em] text-[#14132B]">
        {title}
      </h2>
      <p className="mb-6 mt-1.5 text-sm text-[#6C6B7B]">{sub}</p>
      {children}
    </div>
  );
}

function OptionRow({
  emoji,
  title,
  sub,
  selected,
  onClick,
}: {
  emoji: string;
  title: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition ${
        selected
          ? "border-[#5F58F4] bg-[#F5F4FF]"
          : "border-[#E3E2EE] bg-white hover:border-[#C7C4F7] hover:bg-[#F5F4FF]"
      }`}
    >
      <span className="text-xl">{emoji}</span>
      <span>
        <span
          className={`block text-[15px] font-bold ${
            selected ? "text-[#5F58F4]" : "text-[#14132B]"
          }`}
        >
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-[#6C6B7B]">{sub}</span>
      </span>
    </button>
  );
}

function ModalButtons({
  onSkip,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onSkip: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-6 flex gap-2.5">
      <button
        type="button"
        onClick={onSkip}
        className="rounded-xl border border-[#ECEBF3] px-5 py-3.5 text-sm font-semibold text-[#9A99A8] transition hover:border-[#E3E2EE] hover:text-[#6C6B7B]"
      >
        Skip
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 rounded-xl bg-[#5F58F4] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#E3E2EE] disabled:text-[#9A99A8]"
      >
        {nextLabel}
      </button>
    </div>
  );
}
