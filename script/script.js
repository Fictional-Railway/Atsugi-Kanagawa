// script.js
// シンプルなインタラクション：ナビの開閉、時計、フライト検索・フィルタ、デモのフォーム送信防止

document.addEventListener('DOMContentLoaded', () => {
  // 年表示
  document.getElementById('year').textContent = new Date().getFullYear();

  // 時計（ローカルタイムを毎秒更新）
  const clockEl = document.getElementById('localClock');
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

// ナビゲーション（ハンバーガー）
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));

  mainNav.classList.toggle('active'); // ← displayじゃなくてクラス切り替え！

  navToggle.setAttribute(
    'aria-label',
    expanded ? 'メニューを開く' : 'メニューを閉じる'
  );
});


  // フライト検索とフィルター
  const flightsBody = document.getElementById('flightsBody');
  const flightSearch = document.getElementById('flightSearch');
  const filterSelect = document.getElementById('filterSelect');

  function filterFlights(){
    const q = flightSearch.value.trim().toLowerCase();
    const filter = filterSelect.value; // all / arrival / departure
    const rows = flightsBody.querySelectorAll('tr');
    rows.forEach(row => {
      const cells = Array.from(row.children).map(td => td.textContent.toLowerCase());
      const type = row.querySelector('.type')?.textContent.toLowerCase() || '';
      const matchesQuery = q === '' || cells.some(c => c.includes(q));
      const matchesFilter = (filter === 'all') || (filter === 'arrival' && type.includes('到着')) || (filter === 'departure' && type.includes('出発'));
      row.style.display = (matchesQuery && matchesFilter) ? '' : 'none';
    });
  }
  flightSearch.addEventListener('input', filterFlights);
  filterSelect.addEventListener('change', filterFlights);

  // サンプル：フォーム送信を止めてデモのメッセージを表示
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('送信しました。ご意見ありがとうございます！ (これはデモです)');
    contactForm.reset();
  });

  // 真面目なヒント: 実運用では
  // - フライトはサーバーAPI（例: /api/flights）から fetchして表示
  // - 時刻やステータスはタイムゾーンとISO 8601を正しく扱う
  // - フォームはサーバー側のバリデーションとCSRF対策が必要
});

document.addEventListener('DOMContentLoaded', () => {
  const flightsBody = document.getElementById('flightsBody');

  // ▼ 各時間帯のフライトスケジュール（モックデータ）
  const schedules = {
    morning: [
      { flight: "ATG101", route: "札幌（新千歳）", time: "07:30", status: "出発済" },
      { flight: "ATG205", route: "大阪（伊丹）", time: "09:05", status: "搭乗中" },
      { flight: "ATG304", route: "福岡", time: "09:40", status: "定刻" },
    ],
    noon: [
      { flight: "ATG1210", route: "ソウル（仁川）", time: "12:10", status: "定刻" },
      { flight: "ATG512", route: "仙台", time: "13:25", status: "遅延" },
      { flight: "ATG601", route: "那覇", time: "15:00", status: "定刻" },
    ],
    evening: [
      { flight: "ATG1211", route: "新千歳", time: "17:40", status: "搭乗中" },
      { flight: "ATG806", route: "関西", time: "18:30", status: "定刻" },
      { flight: "ATG1361", route: "上海", time: "20:05", status: "定刻" },
    ],
    night: [
      { flight: "ATG1001", route: "那覇", time: "22:40", status: "準備中" },
      { flight: "ATG1103", route: "新千歳", time: "23:10", status: "準備中" },
    ]
  };

  // ▼ 現在時刻から時間帯を判定
  const now = new Date();
  const hour = now.getHours();
  let period = '';

  if (hour >= 6 && hour < 10) period = 'morning';
  else if (hour >= 10 && hour < 16) period = 'noon';
  else if (hour >= 16 && hour < 22) period = 'evening';
  else period = 'night';

  // ▼ 表示を更新
  const flights = schedules[period];
  flightsBody.innerHTML = '';

  flights.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.flight}</td>
      <td>${f.route}</td>
      <td>${f.time}</td>
      <td>${f.status}</td>
    `;
    flightsBody.appendChild(tr);
  });

  // ▼ タイトル表示
  const title = document.querySelector('.flights h2');
  if (period === 'morning') title.textContent = '現在のフライト情報';
  else if (period === 'noon') title.textContent = '現在のフライト情報';
  else if (period === 'evening') title.textContent = '現在のフライト情報';
  else title.textContent = '現在のフライト情報';
});



// === 現在時刻を表示 ===
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("currentTime").textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// === 便スケジュール ===
const flightSchedule = {
  "15:00": [
    ["KK703", "札幌(新千歳)", "15:10", "A2", "定刻"],
    ["KK905", "ソウル(金浦)", "15:20", "B1", "定刻"],
    ["KK421", "那覇", "15:25", "A4", "定刻"]
  ],
  "15:30": [
    ["KK711", "大阪(関西)", "15:40", "A3", "搭乗中"],
    ["KK913", "台北(桃園)", "15:45", "B3", "搭乗準備中"]
  ],
  "16:00": [
    ["KK715", "名古屋(中部)", "16:10", "A1", "定刻"],
    ["KK923", "香港", "16:20", "B2", "定刻"],
    ["KK727", "鹿児島", "16:25", "A4", "搭乗中"]
  ],
  "16:30": [
    ["KK733", "福岡", "16:40", "A2", "搭乗準備中"],
    ["KK925", "マニラ", "16:50", "B3", "定刻"]
  ],
};

// === 最も近い時間帯を見つける関数 ===
function getNearestSlot() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const slots = Object.keys(flightSchedule);

  let nearestSlot = slots[0];
  let minDiff = Infinity;

  for (const slot of slots) {
    const [h, m] = slot.split(":").map(Number);
    const slotMinutes = h * 60 + m;
    const diff = Math.abs(slotMinutes - currentMinutes);

    if (diff < minDiff) {
      minDiff = diff;
      nearestSlot = slot;
    }
  }

  console.log("Nearest slot:", nearestSlot); // デバッグ用
  return nearestSlot;
}

// === 表を更新 ===
function updateFlightTable() {
  const slot = getNearestSlot();
  const flights = flightSchedule[slot];

  const title = document.getElementById("time-slot-title");
  const tbody = document.getElementById("flight-body");

  if (!flights) {
    title.textContent = "現在の時間帯に便情報がありません。";
    tbody.innerHTML = "";
    return;
  }

  title.textContent = `現在の便情報（${slot} 発）`;
  tbody.innerHTML = "";

  flights.forEach(flight => {
    const row = document.createElement("tr");
    flight.forEach(detail => {
      const cell = document.createElement("td");
      cell.textContent = detail;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

// === 初期化と定期更新 ===
updateFlightTable();
setInterval(updateFlightTable, 30 * 60 * 1000); // 30分ごと