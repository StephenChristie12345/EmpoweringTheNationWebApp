// calculate-fees.js — unified tiers + 15% VAT

const VAT_RATE = 0.15; // 15%

// Exact rule set from the brief:
// 1 course = 0%, 2 = 5%, 3 = 10%, >3 = 15%
function discountPercentFor(count) {
  if (count > 3) return 15;
  if (count === 3) return 10;
  if (count === 2) return 5;
  return 0;
}

const ZAR = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculate-fees-form');
  const courseInputs = [...form.querySelectorAll('#courses input[type="checkbox"][name="course"]')];

  const selectedList = document.getElementById('selected-list');
  const subtotalEl = document.getElementById('subtotal');
  const discountsEl = document.getElementById('discounts');
  const vatEl = document.getElementById('vat');
  const totalEl = document.getElementById('total');
  const breakdownEl = document.getElementById('discount-breakdown');

  courseInputs.forEach(cb => cb.addEventListener('change', recalc));
  recalc();

  function recalc() {
    const selected = courseInputs
      .filter(cb => cb.checked)
      .map(cb => ({
        title: cb.dataset.title,
        price: Number(cb.dataset.price)
      }));

    const subtotal = round(sum(selected.map(x => x.price)));
    const pct = discountPercentFor(selected.length);
    const discount = round(subtotal * (pct / 100));
    const afterDiscount = round(subtotal - discount);
    const vat = round(afterDiscount * VAT_RATE);
    const total = round(afterDiscount + vat);

    // Render list
    renderSelected(selectedList, selected);

    // Numbers
    subtotalEl.value = ZAR.format(subtotal);
    discountsEl.value = discount > 0 ? '-' + ZAR.format(discount) : ZAR.format(0);
    vatEl.value = ZAR.format(vat);
    totalEl.value = ZAR.format(total);

    // Breakdown text
    breakdownEl.innerHTML =
      pct > 0
        ? `<ul><li>${pct}% discount on ${selected.length} course(s): -${ZAR.format(discount)}</li></ul>`
        : `<em>No discounts applied.</em>`;
  }
});

// helpers
function sum(arr) { return arr.reduce((s, n) => s + Number(n || 0), 0); }
function round(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
function renderSelected(container, items) {
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<li><em>No courses selected yet.</em></li>';
    return;
    }
  const nf = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });
  const frag = document.createDocumentFragment();
  items.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${i.title} — ${nf.format(i.price)}`;
    frag.appendChild(li);
  });
  container.appendChild(frag);
}
