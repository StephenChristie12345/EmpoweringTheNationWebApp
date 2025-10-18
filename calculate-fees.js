// calculate-fees.js — tiers + 15% VAT + UI + PDF (Step 2 with layout fix)

const VAT_RATE = 0.15; // 15%

function discountPercentFor(count) {
  if (count > 3) return 15;
  if (count === 3) return 10;
  if (count === 2) return 5;
  return 0;
}

const ZAR = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculate-fees-form');
  if (!form) return;

  const courseInputs = [...form.querySelectorAll('#courses input[type="checkbox"][name="course"]')];

  const selectedList = document.getElementById('selected-list');
  const subtotalEl   = document.getElementById('subtotal');
  const discountsEl  = document.getElementById('discounts');
  const vatEl        = document.getElementById('vat');
  const totalEl      = document.getElementById('total');
  const breakdownEl  = document.getElementById('discount-breakdown');

  const quoteSection = document.getElementById('quote');
  const btnDownload  = document.getElementById('btn-download');
  const statusEl     = document.getElementById('quote-status');

  const chipEl       = document.getElementById('discount-chip');
  const meterFillEl  = document.getElementById('meter-fill');

  courseInputs.forEach(cb => cb.addEventListener('change', () => {
    recalc();
    updateQuoteVisibility();
  }));

  recalc();
  updateQuoteVisibility();

  function recalc() {
    const selected = courseInputs
      .filter(cb => cb.checked)
      .map(cb => ({
        id: cb.value,
        title: cb.dataset.title,
        price: Number(cb.dataset.price)
      }));

    const subtotal      = round(sum(selected.map(x => x.price)));
    const pct           = discountPercentFor(selected.length);
    const discount      = round(subtotal * (pct / 100));
    const afterDiscount = round(subtotal - discount);
    const vat           = round(afterDiscount * VAT_RATE);
    const total         = round(afterDiscount + vat);

    renderSelected(selectedList, selected);

    subtotalEl.value  = ZAR.format(subtotal);
    discountsEl.value = discount > 0 ? '-' + ZAR.format(discount) : ZAR.format(0);
    vatEl.value       = ZAR.format(vat);
    totalEl.value     = ZAR.format(total);

    breakdownEl.innerHTML =
      pct > 0
        ? `<ul><li>${pct}% discount on ${selected.length} course(s): -${ZAR.format(discount)}</li></ul>`
        : `<em>No discounts applied yet.</em>`;

    // Chip + progress meter
    if (chipEl) chipEl.textContent = `${pct}% discount tier`;
    if (meterFillEl) {
      const fill = pct === 0 ? 0 : pct === 5 ? 33 : pct === 10 ? 66 : 100;
      meterFillEl.style.width = fill + '%';
    }
  }

  function updateQuoteVisibility() {
    if (!quoteSection) return;
    const anySelected = courseInputs.some(cb => cb.checked);
    quoteSection.hidden = !anySelected;
    if (btnDownload) btnDownload.disabled = !anySelected;
    if (statusEl) statusEl.textContent = '';
  }

  // Build real PDF using current UI data (with spacing fix)
  btnDownload?.addEventListener('click', () => {
    const { name, email, phone, notes } = readQuoteInputs();
    if (!name || !email) {
      return setStatus('Please enter your name and email to generate the PDF.', 'error');
    }

    const data = collectQuoteData();

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'A4' });

      // --- layout column guides ---
      const x0 = 56;             // left margin
      const xRight = 539;        // right edge (595 - 56)
      const amountX = xRight;    // all amounts align to hard right
      const labelX  = amountX - 190; // column for totals labels (wider to avoid squish)
      let y = 72;

      // --- header ---
      doc.setFont('Helvetica', 'bold'); doc.setFontSize(22);
      doc.text('Empowering the Nation — QUOTE', x0, y);
      y += 10;
      doc.setLineWidth(1.2); doc.setDrawColor('#2e7d32');
      doc.line(x0, y, xRight, y); y += 24;

      // --- issuer & customer ---
      doc.setFont('Helvetica','normal'); doc.setFontSize(10);
      const issued = data.meta.createdAt.toLocaleString('en-ZA', { dateStyle:'medium', timeStyle:'short' });
      doc.text([
        'From:',
        'Empowering the Nation',
        'hello@empoweringthenation.org',
        `Quote ID: ${data.meta.quoteId}`,
        `Issued:   ${issued}`
      ], x0, y);

      const custX = 320;
      const custLines = ['To:', name, email, phone ? phone : ''].filter(Boolean);
      doc.text(custLines, custX, y);
      y += 90;

      // --- items table ---
      doc.setFont('Helvetica','bold'); doc.setFontSize(12);
      doc.text('Description', x0, y);
      doc.text('Price (ZAR)', amountX, y, { align:'right' });
      y += 8; doc.setLineWidth(0.5); doc.setDrawColor('#999'); doc.line(x0, y, xRight, y); y += 14;

      doc.setFont('Helvetica','normal');
      const maxDescWidth = labelX - x0 - 10; // ensure a gutter before amounts
      data.items.forEach(i => {
        const wrapped = doc.splitTextToSize(i.title, maxDescWidth);
        doc.text(wrapped, x0, y);
        doc.text(ZAR.format(i.price), amountX, y, { align:'right' });
        // advance by one line-height per wrapped line
        const lines = Array.isArray(wrapped) ? wrapped.length : 1;
        y += 18 * lines;
      });

      y += 6; doc.setDrawColor('#ddd'); doc.line(x0, y, xRight, y); y += 12;

      // --- totals block (labels fixed column, values right-aligned) ---
      const right = (label, value, bold=false) => {
        if (bold) doc.setFont('Helvetica','bold'); else doc.setFont('Helvetica','normal');
        doc.text(label, labelX, y);                         // label column
        doc.text(value, amountX, y, { align:'right' });     // amount column
        y += 18;
      };

      right('Subtotal', ZAR.format(data.totals.subtotal));
      if (data.totals.discount > 0) {
        right(`Discount (${data.meta.discountPct}%)`, `-${ZAR.format(data.totals.discount)}`);
      } else {
        right('Discount', ZAR.format(0));
      }
      right('VAT (15%)', ZAR.format(data.totals.vat));
      right('Total', ZAR.format(data.totals.total), true);

      // --- notes ---
      y += 12; doc.setFont('Helvetica','normal'); doc.setFontSize(9); doc.setTextColor('#444');
      const extra = [];
      if (notes) extra.push(`Customer notes: ${notes}`);
      extra.push('Quote valid for 14 days. Seats subject to availability.');
      extra.push('Bank: Example Bank · Acc 123456789 · Branch 000000 · Reference: quote ID + surname.');
      doc.text(extra, x0, y);

      const outName = `Empowering-Nation_Quote_${safeFileSlug(name)}_${data.meta.quoteId}.pdf`;
      doc.save(outName);
      setStatus(`✅ Invoice generated: ${outName}`, 'success');
    } catch (e) {
      console.error(e);
      setStatus('❌ Could not generate PDF.', 'error');
    }
  });

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'status' + (kind ? ' ' + kind : '');
  }
});

// helpers
function sum(arr){ return arr.reduce((s, n) => s + Number(n || 0), 0); }
function round(n){ return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
function renderSelected(container, items){
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<li><em>No courses selected.</em></li>';
    return;
  }
  const nf = new Intl.NumberFormat('en-ZA', { style:'currency', currency:'ZAR' });
  const frag = document.createDocumentFragment();
  for (const i of items){
    const li = document.createElement('li');
    li.textContent = `${i.title} — ${nf.format(i.price)}`;
    frag.appendChild(li);
  }
  container.appendChild(frag);
}

function readQuoteInputs(){
  return {
    name:  (document.getElementById('q-name')  || {}).value?.trim() || '',
    email: (document.getElementById('q-email') || {}).value?.trim() || '',
    phone: (document.getElementById('q-phone') || {}).value?.trim() || '',
    notes: (document.getElementById('q-notes') || {}).value?.trim() || ''
  };
}

function collectQuoteData(){
  const checks = [...document.querySelectorAll('#courses input[type="checkbox"][name="course"]')];
  const items = checks.filter(cb => cb.checked).map(cb => ({
    id: cb.value,
    title: cb.dataset.title,
    price: Number(cb.dataset.price)
  }));

  const subtotal = round(sum(items.map(i => i.price)));
  const discountPct = discountPercentFor(items.length);
  const discount = round(subtotal * (discountPct / 100));
  const afterDiscount = round(subtotal - discount);
  const vat = round(afterDiscount * VAT_RATE);
  const total = round(afterDiscount + vat);

  return {
    items,
    totals: { subtotal, discount, vat, total },
    meta: {
      discountPct,
      quoteId: makeQuoteId(),
      createdAt: new Date()
    }
  };
}

function makeQuoteId(){
  // e.g. Q25-10-18-1342-AB7
  const d = new Date();
  const pad = n => n.toString().padStart(2,'0');
  const rand = Math.random().toString(36).slice(2,5).toUpperCase();
  return `Q${String(d.getFullYear()).slice(2)}-${pad(d.getMonth()+1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${rand}`;
}

function safeFileSlug(s){
  return s.replace(/[^a-z0-9]+/gi,'-').replace(/^-+|-+$/g,'');
}
