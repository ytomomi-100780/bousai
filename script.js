let days = 3;
let currentPersons = 1;
let currentConditions = new Set();
let viewMode = "check";

const checkedItems = {};
const priorityItems = {};

const BASIC_CATEGORIES = new Set(["水・食料", "衛生用品", "防災用具", "生活用品"]);

/* ── SVGイラスト（アイテムID別） ───────────── */
const ILLUST = {
  1:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 5C24 5 9 21 9 31C9 40 16 45 24 45C32 45 39 40 39 31C39 21 24 5 24 5Z" fill="#a8d8ea" stroke="#6ab0c8" stroke-width="1.5" stroke-linejoin="round"/><path d="M15 33C15 38 18.5 42 24 43" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.7"/></svg>`,
  2:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 7L41 37Q41 43 36 43L12 43Q7 43 7 37Z" fill="#f5e6c8" stroke="#c8a87a" stroke-width="1.5" stroke-linejoin="round"/><rect x="7" y="29" width="34" height="8" rx="1.5" fill="#2d2d2d" opacity="0.82"/><circle cx="24" cy="21" r="5" fill="white" opacity="0.55"/></svg>`,
  3:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="16" width="16" height="26" rx="4" fill="#e0ddd8" stroke="#b0a898" stroke-width="1.5"/><rect x="18" y="10" width="12" height="8" rx="2.5" fill="#c0b8b0" stroke="#b0a898" stroke-width="1.2"/><rect x="20" y="7" width="8" height="5" rx="1.5" fill="#a8a098" stroke="#909088" stroke-width="1"/><line x1="24" y1="28" x2="24" y2="36" stroke="#b0a898" stroke-width="2" stroke-linecap="round"/></svg>`,
  4:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="34" rx="16" ry="11" fill="#f0f0e8" stroke="#b4b49a" stroke-width="1.5"/><ellipse cx="24" cy="34" rx="11" ry="7" fill="#dde0d8" stroke="#b4b49a" stroke-width="1.2"/><rect x="16" y="17" width="16" height="7" rx="2.5" fill="#e8e8e0" stroke="#b4b49a" stroke-width="1.2"/><rect x="19" y="10" width="10" height="8" rx="2.5" fill="#f5f5f0" stroke="#b4b49a" stroke-width="1.2"/></svg>`,
  5:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="12" width="28" height="28" rx="5" fill="#e8f0e8" stroke="#90b890" stroke-width="1.5"/><path d="M16 26Q24 20 32 26" stroke="#90b890" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M16 31Q24 25 32 31" stroke="#90b890" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6"/><rect x="20" y="8" width="8" height="6" rx="2" fill="#b8d4b8" stroke="#90b890" stroke-width="1.2"/></svg>`,
  6:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 19Q7 13 24 13Q41 13 41 19L41 30Q41 38 24 38Q7 38 7 30Z" fill="#f0f4ff" stroke="#a0b4e0" stroke-width="1.5"/><path d="M13 24Q24 29 35 24" stroke="#a0b4e0" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M7 20L3 17" stroke="#a0b4e0" stroke-width="1.5" stroke-linecap="round"/><path d="M7 28L3 31" stroke="#a0b4e0" stroke-width="1.5" stroke-linecap="round"/><path d="M41 20L45 17" stroke="#a0b4e0" stroke-width="1.5" stroke-linecap="round"/><path d="M41 28L45 31" stroke="#a0b4e0" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  7:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="16" width="20" height="26" rx="4" fill="#e8f0f8" stroke="#8aaad0" stroke-width="1.5"/><rect x="18" y="10" width="12" height="8" rx="3" fill="#a0bcde" stroke="#8aaad0" stroke-width="1.2"/><rect x="21" y="25" width="6" height="12" rx="2" fill="#8aaad0" opacity="0.6"/><rect x="18" y="28" width="12" height="6" rx="2" fill="#8aaad0" opacity="0.6"/></svg>`,
  8:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="20" width="12" height="22" rx="3" fill="#6e7c8c" stroke="#4a5568" stroke-width="1.2"/><path d="M16 20L19 14L29 14L32 20Z" fill="#8fa0b4" stroke="#4a5568" stroke-width="1.2" stroke-linejoin="round"/><ellipse cx="24" cy="14" rx="5.5" ry="3" fill="#ffe97a" stroke="#e6c84a" stroke-width="1.2"/><path d="M11 8L14 12" stroke="#ffe97a" stroke-width="1.5" stroke-linecap="round"/><path d="M24 5L24 10" stroke="#ffe97a" stroke-width="1.5" stroke-linecap="round"/><path d="M37 8L34 12" stroke="#ffe97a" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  9:  `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="16" width="38" height="26" rx="5" fill="#e8d5b7" stroke="#b89a6a" stroke-width="1.5"/><rect x="9" y="21" width="16" height="12" rx="2.5" fill="#a8c8e8" stroke="#7aabce" stroke-width="1.2"/><circle cx="35" cy="27" r="6" fill="#f5ede9" stroke="#b85c4a" stroke-width="1.2"/><circle cx="35" cy="27" r="2.5" fill="#b85c4a"/><line x1="28" y1="16" x2="33" y2="5" stroke="#888" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  10: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="13" width="24" height="26" rx="3.5" fill="#f5e6c8" stroke="#c8a87a" stroke-width="1.5"/><rect x="19" y="8" width="10" height="7" rx="2" fill="#c8a87a"/><path d="M20 27L22 20L24 27L26 20L28 27" stroke="#e87a20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  11: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="32" height="20" rx="4" fill="#e0e8f0" stroke="#8aaad0" stroke-width="1.5"/><rect x="40" y="22" width="4" height="8" rx="2" fill="#8aaad0"/><rect x="11" y="19" width="10" height="14" rx="2" fill="#5c8abf" opacity="0.7"/><rect x="11" y="19" width="5" height="14" rx="2" fill="#3a6a9a" opacity="0.5"/></svg>`,
  12: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="10" width="34" height="28" rx="5" fill="#fff5f5" stroke="#e8a0a0" stroke-width="1.5"/><rect x="21" y="14" width="6" height="20" rx="2.5" fill="#e87070"/><rect x="14" y="21" width="20" height="6" rx="2.5" fill="#e87070"/></svg>`,
  13: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="32" height="22" rx="4" fill="#c8d8f0" stroke="#8aaad0" stroke-width="1.5"/><rect x="8" y="14" width="10" height="22" rx="4" fill="#a0bcde" stroke="#8aaad0" stroke-width="1.5"/><path d="M18 17L18 33" stroke="#8aaad0" stroke-width="1.2" stroke-dasharray="2.5 2.5"/></svg>`,
  14: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 40L14 20Q14 17 17 17Q20 17 20 20L20 16Q20 13 23 13Q26 13 26 16L26 14Q26 11 29 11Q32 11 32 14L32 16Q32 13 34.5 13Q37 13 37 16L37 27Q37 37 29 40Z" fill="#e8d4a8" stroke="#c4a86a" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 25Q10 23 10 28Q10 33 14 33" fill="#e8d4a8" stroke="#c4a86a" stroke-width="1.5"/></svg>`,
  15: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 9L10 19L7 43L41 43L38 19Z" fill="#a8d4c0" stroke="#6ab09a" stroke-width="1.5" stroke-linejoin="round"/><circle cx="24" cy="13" r="4" fill="#fdfcfa" stroke="#6ab09a" stroke-width="1.2"/></svg>`,
  16: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 20Q16 40 24 40Q32 40 34 20Z" fill="#e0e8d8" stroke="#90a880" stroke-width="1.5"/><rect x="11" y="14" width="26" height="6" rx="2" fill="#b0c4a0" stroke="#90a880" stroke-width="1.2"/><rect x="18" y="9" width="12" height="6" rx="2" fill="#c8d8b8" stroke="#90a880" stroke-width="1.2"/></svg>`,
  17: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="20" height="24" rx="3" fill="#e8f4f8" stroke="#8aaad0" stroke-width="1.5"/><path d="M17 18Q24 22 31 18" stroke="#8aaad0" stroke-width="1" stroke-linecap="round" opacity="0.6"/><path d="M17 23Q24 27 31 23" stroke="#8aaad0" stroke-width="1" stroke-linecap="round" opacity="0.6"/><path d="M17 28Q24 32 31 28" stroke="#8aaad0" stroke-width="1" stroke-linecap="round" opacity="0.6"/></svg>`,
  18: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8L14 18L10 42L38 42L34 18L30 8Z" fill="#f5f0e8" stroke="#c8b898" stroke-width="1.5" stroke-linejoin="round"/><path d="M16 18L32 18" stroke="#c8b898" stroke-width="1.2"/><path d="M18 28Q24 32 30 28" stroke="#c8b898" stroke-width="1" stroke-linecap="round" opacity="0.6"/></svg>`,
  19: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18Q8 12 24 12Q40 12 40 18L40 34Q40 40 24 40Q8 40 8 34Z" fill="#e8f0f8" stroke="#a0b4d0" stroke-width="1.5"/><path d="M8 26Q16 30 24 26Q32 22 40 26" stroke="#a0b4d0" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  20: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="16" width="20" height="22" rx="4" fill="#fdf0e0" stroke="#d4a870" stroke-width="1.5"/><rect x="18" y="10" width="12" height="8" rx="3" fill="#d4a870" stroke="#b88850" stroke-width="1.2"/><path d="M18 27Q24 31 30 27" stroke="#d4a870" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  21: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="16" width="24" height="20" rx="8" fill="#f5e0ec" stroke="#d4a0c0" stroke-width="1.5"/><path d="M16 26Q24 30 32 26" stroke="#d4a0c0" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  22: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16L16 38L24 28L32 38L38 16Z" fill="#e8d0e8" stroke="#b890b8" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  23: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8C24 8 10 16 10 28C10 36 16 42 24 42C32 42 38 36 38 28C38 16 24 8 24 8Z" fill="#e8e8d0" stroke="#a8a870" stroke-width="1.5"/><path d="M18 30Q24 34 30 30" stroke="#a8a870" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  24: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="24" height="30" rx="4" fill="#f0e8d8" stroke="#b8a880" stroke-width="1.5"/><path d="M16 20L32 20" stroke="#b8a880" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M16 26L32 26" stroke="#b8a880" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/><path d="M16 32L28 32" stroke="#b8a880" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/><circle cx="34" cy="14" r="5" fill="#e87070" stroke="#c05050" stroke-width="1.2"/></svg>`,
  25: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 20Q6 12 24 12Q42 12 42 20L42 36Q42 44 24 44Q6 44 6 36Z" fill="#e8e8f4" stroke="#a0a0c8" stroke-width="1.5"/><path d="M6 28Q14 34 24 28Q34 22 42 28" stroke="#a0a0c8" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
};

/* ── ユーティリティ ────────────────────────── */
function calcRequired(item, persons, days) {
  switch (item.calcType) {
    case "per_person_per_day": return persons * days * item.value;
    case "per_person":         return persons * item.value;
    case "per_day":            return days * item.value;
    case "fixed":              return item.value;
    default:                   return item.value;
  }
}

function filterItems(items, activeConditions) {
  return items.filter((item) => {
    if (!item.conditions) return true;
    return item.conditions.some((c) => activeConditions.has(c));
  });
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}

/* ── チェックリスト描画 ────────────────────── */
function render(persons, activeConditions, days) {
  const container = document.getElementById("stock-list");
  container.innerHTML = "";

  const filtered = filterItems(stockItems, activeConditions);
  const grouped  = groupByCategory(filtered);

  let basicGroupStarted   = false;
  let specialGroupStarted = false;
  let specialGrid         = null;

  for (const [category, items] of Object.entries(grouped)) {
    const isBasic   = BASIC_CATEGORIES.has(category);
    const firstItem = items[0];
    const catEn     = firstItem.catEn || "";

    if (isBasic && !basicGroupStarted) {
      const gh = document.createElement("div");
      gh.className = "group-heading";
      gh.innerHTML = `<span class="group-heading-jp">非常持ち出し袋</span><span class="group-heading-en">EMERGENCY SUPPLIES</span>`;
      container.appendChild(gh);
      basicGroupStarted = true;
    }

    if (!isBasic && !specialGroupStarted) {
      const sep = document.createElement("div");
      sep.className = "group-separator";
      container.appendChild(sep);

      const gh2 = document.createElement("div");
      gh2.className = "group-heading group-heading--special";
      gh2.innerHTML = `<span class="group-heading-jp">世帯別の備え</span><span class="group-heading-en">FOR YOUR HOUSEHOLD</span>`;
      container.appendChild(gh2);

      specialGrid = document.createElement("div");
      specialGrid.className = "special-sections-grid";
      container.appendChild(specialGrid);
      specialGroupStarted = true;
    }

    const section = document.createElement("section");
    section.className = isBasic ? "category-section" : "category-section special-section";

    const heading = document.createElement("div");
    heading.className = "category-heading";
    heading.innerHTML = `<span class="cat-name-jp">${category}</span><span class="cat-name-en">${catEn}</span>`;
    section.appendChild(heading);

    const ul = document.createElement("ul");
    for (const item of items) {
      const qty       = calcRequired(item, persons, days);
      const isChecked = checkedItems[item.id] ?? false;
      const noteHtml  = item.calcType === "per_day"
        ? '<span class="item-note">一人分の目安です</span>'
        : "";
      const illustSvg = ILLUST[item.id] || "";

      const li = document.createElement("li");
      li.innerHTML = `
        <div class="item-illust ${isChecked ? "item-illust--checked" : ""}">${illustSvg}</div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-name-en">${item.en || ""}</span>
          ${noteHtml}
        </div>
        <div class="item-right">
          <span class="item-qty">${qty}<small>${item.unit}</small></span>
          <div class="switch-wrap">
            <span class="switch-label-off ${!isChecked ? "active" : ""}">ない</span>
            <label class="switch">
              <input type="checkbox" data-id="${item.id}" ${isChecked ? "checked" : ""} />
              <span class="switch-track"></span>
            </label>
            <span class="switch-label-on ${isChecked ? "active" : ""}">ある</span>
          </div>
        </div>
      `;
      ul.appendChild(li);
    }

    section.appendChild(ul);
    (isBasic ? container : specialGrid).appendChild(section);
  }
}

/* ── ビュー切り替え ────────────────────────── */
function setViewMode(mode) {
  viewMode = mode;
  document.getElementById("check-view").classList.toggle("hidden", mode !== "check");
  document.getElementById("shopping-view").classList.toggle("hidden", mode !== "shopping");
}

/* ── 買い物リスト生成 ──────────────────────── */
function generateShoppingList() {
  const visible = filterItems(stockItems, currentConditions);
  const toBuy   = visible.filter((item) => !(checkedItems[item.id] ?? false));
  const container = document.getElementById("shopping-list");

  if (toBuy.length === 0) {
    container.innerHTML = `
      <div class="shopping-empty">
        <div class="empty-icon">✓</div>
        <p class="empty-title">すべて揃っています！</p>
        <p class="empty-sub">定期的に見直しましょう</p>
      </div>
    `;
    setViewMode("shopping");
    return;
  }

  const grouped = groupByCategory(toBuy);

  // ヘッダー
  let html = `
    <div class="shopping-header">
      <h3 class="shopping-title">買い物リスト</h3>
      <div class="shopping-col-header">
        <span>アイテム</span>
        <span>数量 / 優先度</span>
      </div>
    </div>
    <div class="shopping-grid">
  `;

  let basicGroupStarted   = false;
  let specialGroupStarted = false;

  for (const [category, items] of Object.entries(grouped)) {
    const isBasic   = BASIC_CATEGORIES.has(category);
    const firstItem = items[0];
    const catEn     = firstItem.catEn || "";

    if (isBasic && !basicGroupStarted) {
      html += `<div class="shopping-group-heading full-width"><span>非常持ち出し袋</span></div>`;
      basicGroupStarted = true;
    }

    if (!isBasic && !specialGroupStarted) {
      html += `<div class="shopping-special-divider full-width"><span>世帯別の備え</span></div>`;
      specialGroupStarted = true;
    }

    html += `
      <div class="shopping-cat-block${isBasic ? "" : " shopping-cat-block--special"}">
        <div class="shopping-cat-header">
          <div class="scat-accent"></div>
          <span class="scat-jp">${category}</span>
          <span class="scat-en">${catEn}</span>
        </div>
        <ul class="shopping-items">
    `;

    for (const item of items) {
      const qty      = calcRequired(item, currentPersons, days);
      const priority = priorityItems[item.id] ?? "";
      const noteHtml = item.calcType === "per_day"
        ? '<span class="item-note">目安/日</span>'
        : "";

      html += `
        <li>
          <label class="shopping-row">
            <input type="checkbox" />
            <div class="item-info">
              <span class="item-name-jp">${item.name}</span>
              <span class="item-name-en-small">${item.en || ""}${noteHtml}</span>
            </div>
          </label>
          <div class="shopping-item-right">
            <span class="shopping-qty-badge${isBasic ? "" : " shopping-qty-badge--special"}">${qty}${item.unit}</span>
            <div class="priority-group">
              <label class="priority-radio">
                <input type="radio" name="priority-${item.id}" value="high"   data-id="${item.id}" ${priority === "high"   ? "checked" : ""}/>
                <span>高</span>
              </label>
              <label class="priority-radio">
                <input type="radio" name="priority-${item.id}" value="medium" data-id="${item.id}" ${priority === "medium" ? "checked" : ""}/>
                <span>中</span>
              </label>
              <label class="priority-radio">
                <input type="radio" name="priority-${item.id}" value="low"    data-id="${item.id}" ${priority === "low"    ? "checked" : ""}/>
                <span>低</span>
              </label>
            </div>
          </div>
        </li>
      `;
    }

    html += `</ul></div>`;
  }

  html += `</div>`; // .shopping-grid

  container.innerHTML = html;
  setViewMode("shopping");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── localStorage ──────────────────────────── */
function saveToStorage() {
  const conditions = [...document.querySelectorAll(".cond-checkbox")]
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.cond);

  localStorage.setItem("checkedItems",  JSON.stringify(checkedItems));
  localStorage.setItem("priorityItems", JSON.stringify(priorityItems));
  localStorage.setItem("persons",       String(currentPersons));
  localStorage.setItem("conditions",    JSON.stringify(conditions));
}

function loadFromStorage() {
  try {
    const savedChecked = localStorage.getItem("checkedItems");
    if (savedChecked) Object.assign(checkedItems, JSON.parse(savedChecked));

    const savedPriority = localStorage.getItem("priorityItems");
    if (savedPriority) Object.assign(priorityItems, JSON.parse(savedPriority));

    const savedPersons = localStorage.getItem("persons");
    if (savedPersons) document.getElementById("persons").value = savedPersons;

    const savedConditions = localStorage.getItem("conditions");
    if (savedConditions) {
      const conds = JSON.parse(savedConditions);
      document.querySelectorAll(".cond-checkbox").forEach(cb => {
        cb.checked = conds.includes(cb.dataset.cond);
      });
    }
  } catch {
    // 破損データは無視
  }
}

/* ── イベント登録 ──────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const personsInput   = document.getElementById("persons");
  const condCheckboxes = document.querySelectorAll(".cond-checkbox");
  const tabBtns        = document.querySelectorAll(".tab-btn");
  const stockList      = document.getElementById("stock-list");
  const shoppingList   = document.getElementById("shopping-list");

  function getActiveConditions() {
    const active = new Set();
    condCheckboxes.forEach((cb) => {
      if (cb.checked) active.add(cb.dataset.cond);
    });
    return active;
  }

  function update() {
    const val = parseInt(personsInput.value, 10);
    currentPersons = isNaN(val) || val < 1 ? 1 : val;
    currentConditions = getActiveConditions();
    render(currentPersons, currentConditions, days);
    saveToStorage();
  }

  // ある/なしスイッチ
  stockList.addEventListener("change", (e) => {
    const input = e.target.closest("input[data-id]");
    if (!input) return;
    const id = parseInt(input.dataset.id, 10);
    checkedItems[id] = input.checked;
    const wrap = input.closest(".switch-wrap");
    wrap.querySelector(".switch-label-off").classList.toggle("active", !input.checked);
    wrap.querySelector(".switch-label-on").classList.toggle("active",  input.checked);
    // イラストのハイライトも更新
    const illust = input.closest("li").querySelector(".item-illust");
    if (illust) illust.classList.toggle("item-illust--checked", input.checked);
    saveToStorage();
  });

  // 優先度ラジオボタン
  shoppingList.addEventListener("change", (e) => {
    const radio = e.target.closest("input[type='radio'][data-id]");
    if (!radio) return;
    const id = parseInt(radio.dataset.id, 10);
    priorityItems[id] = radio.value;
    saveToStorage();
  });

  // タブ
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      days = parseInt(btn.dataset.days, 10);
      tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
      update();
    });
  });

  // リセット
  document.getElementById("reset-btn").addEventListener("click", () => {
    Object.keys(checkedItems).forEach(k => delete checkedItems[k]);
    Object.keys(priorityItems).forEach(k => delete priorityItems[k]);
    personsInput.value = 1;
    condCheckboxes.forEach(cb => { cb.checked = false; });
    localStorage.clear();
    update();
  });

  document.getElementById("gen-shopping-list").addEventListener("click", generateShoppingList);
  document.getElementById("back-btn").addEventListener("click", () => setViewMode("check"));

  document.getElementById("print-btn").addEventListener("click", () => {
    if (viewMode !== "shopping") return;
    window.print();
  });

  personsInput.addEventListener("input", update);
  condCheckboxes.forEach((cb) => cb.addEventListener("change", update));

  loadFromStorage();
  setViewMode("check");
  update();
});
