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
    if (!expanded) {
      mainNav.style.display = 'block';
      navToggle.setAttribute('aria-label','メニューを閉じる');
    } else {
      mainNav.style.display = '';
      navToggle.setAttribute('aria-label','メニューを開く');
    }
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
      { flight: "ATG410", route: "鹿児島", time: "12:10", status: "定刻" },
      { flight: "ATG512", route: "仙台", time: "13:25", status: "遅延" },
      { flight: "ATG601", route: "那覇", time: "15:00", status: "定刻" },
    ],
    evening: [
      { flight: "ATG702", route: "新千歳", time: "17:40", status: "搭乗中" },
      { flight: "ATG806", route: "関西", time: "18:30", status: "定刻" },
      { flight: "ATG912", route: "福岡", time: "20:05", status: "定刻" },
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
