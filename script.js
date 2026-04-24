let days = 3;
let currentPersons = 1;
let currentConditions = new Set();
let viewMode = "check"; // ★追加

const checkedItems = {};
const priorityItems = {};

function calcRequired(item, persons, days) {
  switch (item.calcType) {
    case "per_person_per_day":
      return persons * days * item.value;
    case "per_person":
      return persons * item.value;
    case "fixed":
      return item.value;
    default:
      return item.value;
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

function render(persons, activeConditions, days) {
  const container = document.getElementById("stock-list");
  container.innerHTML = "";

  const filtered = filterItems(stockItems, activeConditions);
  const grouped = groupByCategory(filtered);

  for (const [category, items] of Object.entries(grouped)) {
    const section = document.createElement("section");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.textContent = category;
    section.appendChild(heading);

    const ul = document.createElement("ul");

    for (const item of items) {
      const qty = calcRequired(item, persons, days);
      const isChecked = checkedItems[item.id] ?? false;

      const li = document.createElement("li");
      li.innerHTML = `
        <span class="item-name">${item.name}</span>
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
    container.appendChild(section);
  }
}

// ★ viewModeをちゃんと状態として持つ
function setViewMode(mode) {
  viewMode = mode;

  document.getElementById("check-view").classList.toggle("hidden", mode !== "check");

  document.getElementById("shopping-view").classList.toggle("hidden", mode !== "shopping");
}

function generateShoppingList() {
  const visible = filterItems(stockItems, currentConditions);
  const toBuy = visible.filter((item) => !(checkedItems[item.id] ?? false));
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

  let html = `
    <h3 class="shopping-title">買い物リスト</h3>
    <div class="shopping-col-header">
      <span>アイテム</span>
      <span>買い物優先度</span>
    </div>
  `;

  for (const [category, items] of Object.entries(grouped)) {
    html += `<p class="shopping-cat-name">${category}</p><ul class="shopping-items">`;

    for (const item of items) {
      const qty = calcRequired(item, currentPersons, days);
      const priority = priorityItems[item.id] ?? "";

      html += `
        <li>
          <label class="shopping-row">
            <input type="checkbox" />
            <span>${item.name}　${qty}${item.unit}</span>
          </label>

          <div class="priority-group">
            <label class="priority-radio">
              <input type="radio" name="priority-${item.id}" value="high" data-id="${item.id}" ${priority === "high" ? "checked" : ""}/>
              <span>高</span>
            </label>
            <label class="priority-radio">
              <input type="radio" name="priority-${item.id}" value="medium" data-id="${item.id}" ${priority === "medium" ? "checked" : ""}/>
              <span>中</span>
            </label>
            <label class="priority-radio">
              <input type="radio" name="priority-${item.id}" value="low" data-id="${item.id}" ${priority === "low" ? "checked" : ""}/>
              <span>低</span>
            </label>
          </div>
        </li>
      `;
    }

    html += `</ul>`;
  }

  container.innerHTML = html;

  setViewMode("shopping");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

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

document.addEventListener("DOMContentLoaded", () => {
  const personsInput = document.getElementById("persons");
  const condCheckboxes = document.querySelectorAll(".cond-checkbox");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const stockList = document.getElementById("stock-list");
  const shoppingList = document.getElementById("shopping-list");

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

  // スイッチ
  stockList.addEventListener("change", (e) => {
    const input = e.target.closest("input[data-id]");
    if (!input) return;

    const id = parseInt(input.dataset.id, 10);
    checkedItems[id] = input.checked;

    const wrap = input.closest(".switch-wrap");
    wrap.querySelector(".switch-label-off").classList.toggle("active", !input.checked);
    wrap.querySelector(".switch-label-on").classList.toggle("active", input.checked);
    saveToStorage();
  });

  // 優先度
  shoppingList.addEventListener("change", (e) => {
    const radio = e.target.closest("input[type='radio'][data-id]");
    if (!radio) return;

    const id = parseInt(radio.dataset.id, 10);
    priorityItems[id] = radio.value;
    saveToStorage();
  });

  // タブ（ここはOKだったのでそのまま）
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      days = parseInt(btn.dataset.days, 10);
      tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
      update();
    });
  });

  document.getElementById("gen-shopping-list").addEventListener("click", generateShoppingList);

  document.getElementById("back-btn").addEventListener("click", () => setViewMode("check"));

  window.scrollTo({ top: 0, behavior: "smooth" });

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
