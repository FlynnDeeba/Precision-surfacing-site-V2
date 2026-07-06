// Netlify serverless function: emails a new lead to the business and sends the
// customer an auto-reply. Uses Resend (https://resend.com) over its REST API,
// so there's no npm dependency — Node 18 on Netlify has global fetch.
//
// Required env var:  RESEND_API_KEY
// Optional env vars (sensible defaults below):
//   LEAD_TO   — inbox that receives leads      (default: info@psurfacing.co.uk)
//   MAIL_FROM — verified Resend sender          (default: Precision Surfacing <info@psurfacing.co.uk>)
//   REPLY_TO  — where customer replies should go (default: info@psurfacing.co.uk)
//   PHONE     — phone shown in the auto-reply    (default: 07836 441717)

const RESEND_URL = "https://api.resend.com/emails";

const esc = (s) =>
  String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method not allowed" });

  const key = process.env.RESEND_API_KEY;
  if (!key) return json(500, { ok: false, error: "Email is not configured yet." });

  let d;
  try { d = JSON.parse(event.body || "{}"); } catch { return json(400, { ok: false, error: "Bad request" }); }

  // Honeypot: a bot filled the hidden field — pretend success, send nothing.
  if (d.company) return json(200, { ok: true });

  const name = String(d.name || "").trim();
  const email = String(d.email || "").trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { ok: false, error: "A name and a valid email are required." });
  }

  const LEAD_TO = process.env.LEAD_TO || "info@psurfacing.co.uk";
  const MAIL_FROM = process.env.MAIL_FROM || "Precision Surfacing <info@psurfacing.co.uk>";
  const REPLY_TO = process.env.REPLY_TO || "info@psurfacing.co.uk";
  const PHONE = process.env.PHONE || "07836 441717";

  const service = Array.isArray(d.service) ? d.service.join(", ") : String(d.service || "");
  const rows = [
    ["Surface", service],
    ["What it's for", d.application],
    ["Approx size", d.size],
    ["Timeline", d.timeline],
    ["Name", name],
    ["Postcode", d.postcode],
    ["Phone", d.phone],
    ["Email", email],
    ["Notes", d.notes],
  ];
  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#777;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#111"><strong>${esc(v) || "&mdash;"}</strong></td></tr>`)
    .join("");

  const bizHtml = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 14px">New quote request</h2>
      <table style="border-collapse:collapse">${tableRows}</table>
    </div>`;

  const first = name.split(" ")[0] || name;
  const custHtml = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111;line-height:1.65">
      <p>Hi ${esc(first)},</p>
      <p>Thanks for getting in touch with <strong>Precision Surfacing</strong> — we've received your ${service ? esc(service.toLowerCase()) + " " : ""}enquiry and we'll be in touch within one working day to arrange your free site visit and quote.</p>
      <p>If it's urgent, call us on <strong>${esc(PHONE)}</strong> or just reply to this email.</p>
      <p style="margin-top:22px">Kind regards,<br>The Precision Surfacing team</p>
    </div>`;

  // 1) Notify the business (critical). reply_to = customer so you can reply straight back.
  const biz = await sendEmail(key, {
    from: MAIL_FROM, to: [LEAD_TO], reply_to: email,
    subject: `New quote request — ${name}`, html: bizHtml,
  });
  if (!biz.ok) return json(502, { ok: false, error: "Could not send your request." });

  // 2) Auto-reply the customer (best-effort; a failure here shouldn't fail the lead).
  await sendEmail(key, {
    from: MAIL_FROM, to: [email], reply_to: REPLY_TO,
    subject: "We've received your request — Precision Surfacing", html: custHtml,
  });

  return json(200, { ok: true });
};

async function sendEmail(key, payload) {
  try {
    const r = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: r.ok };
  } catch {
    return { ok: false };
  }
}

function json(statusCode, obj) {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj) };
}
