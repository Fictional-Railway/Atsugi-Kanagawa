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