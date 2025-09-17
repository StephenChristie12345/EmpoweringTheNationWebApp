// calculate-fees.js — unified tiers + 15% VAT + UI polish

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
  const btnQuote     = document.getElementById('btn-quote');
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
    if (btnQuote) btnQuote.disabled = !anySelected;
    if (statusEl) statusEl.textContent = '';
  }

  // Placeholder: wire to an endpoint later
  btnQuote?.addEventListener('click', () => {
    const name  = (document.getElementById('q-name')  || {}).value?.trim() || '';
    const email = (document.getElementById('q-email') || {}).value?.trim() || '';
    if (!name || !email) {
      return setStatus('Please enter your name and email to request a quote.', 'error');
    }
    setStatus('Quote ready. Hook up an endpoint to send it.', 'success');
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
