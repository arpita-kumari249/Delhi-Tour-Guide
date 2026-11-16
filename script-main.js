/* ---------- 1. PLACE LIST (file names match the saved HTML files) ---------- */
const PLACES = [
  { name: 'India Gate',     file: 'India_Gate.html',    area: 'central', tags: ['historical', 'parks'],     hours: 1.5, outdoor: true,  night: true,  aliases: ['kartavya path', 'war memorial'] },
  { name: 'Red Fort',       file: 'Red_Fort.html',      area: 'old',     tags: ['historical', 'museums'],   hours: 2.5, outdoor: true,  night: false, aliases: ['lal qila', 'lal kila'] },
  { name: 'Qutub Minar',    file: 'Qutub_Minar.html',   area: 'south',   tags: ['historical'],              hours: 2,   outdoor: true,  night: false, aliases: ['qutb minar', 'qutab minar', 'mehrauli'] },
  { name: 'Akshardham',     file: 'Akshardham.html',    area: 'east',    tags: ['religious', 'museums'],    hours: 3,   outdoor: false, night: true,  aliases: ['swaminarayan', 'akshardham temple'] },
  { name: 'Lotus Temple',   file: 'Lotus_Temple.html',  area: 'south',   tags: ['religious', 'parks'],      hours: 1.5, outdoor: false, night: false, aliases: ['bahai temple', 'lotus'] },
  { name: "Humayun's Tomb", file: 'Humayuns_Tomb.html', area: 'central', tags: ['historical', 'parks'],     hours: 2,   outdoor: true,  night: false, aliases: ['humayun', 'humayuns tomb'] },
  { name: 'Jama Masjid',    file: 'Jama_Masjid.html',   area: 'old',     tags: ['religious', 'historical'], hours: 1.5, outdoor: false, night: false, aliases: ['jama', 'jami masjid'] },
  { name: 'Lodhi Garden',   file: 'Lodhi_Garden.html',  area: 'central', tags: ['parks', 'historical'],     hours: 1.5, outdoor: true,  night: false, aliases: ['lodi garden', 'lodhi'] },
  { name: 'Chandni Chowk',  file: 'Chandni_Chowk.html', area: 'old',     tags: ['markets'],                 hours: 2.5, outdoor: false, night: true,  aliases: ['chandni', 'old delhi market'] },
  { name: 'Purana Qila',    file: 'Purana_Qila.html',   area: 'central', tags: ['historical', 'parks'],     hours: 2,   outdoor: true,  night: false, aliases: ['old fort', 'purana kila', 'indraprastha'] }
];

// which areas are next to each other (used to sort the itinerary)
const NEAR = {
  central: ['old', 'south', 'east'],
  old:     ['central', 'north'],
  south:   ['central'],
  east:    ['central'],
  north:   ['old']
};

/* ---------- 2. NAVBAR SEARCH ---------- */
const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function findPlace(query) {
  const q = clean(query);
  if (q.length < 3) return null;
  const names = p => [p.name, ...p.aliases].map(clean);
  return PLACES.find(p => names(p).includes(q))
      || PLACES.find(p => names(p).some(n => n.includes(q) || (n.length >= 6 && q.includes(n))));
}

function showToast(message) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.classList.remove('show'), 3500);
}

function setupSearch() {
  const list = document.createElement('datalist');
  list.id = 'place-list';
  PLACES.forEach(p => {
    const o = document.createElement('option');
    o.value = p.name;
    list.appendChild(o);
  });
  document.body.appendChild(list);

  document.querySelectorAll('.nav-search').forEach(box => {
    const input = box.querySelector('input');
    const button = box.querySelector('button');
    if (!input || !button) return;
    input.setAttribute('list', 'place-list');

    const go = () => {
      const text = input.value.trim();
      if (!text) return showToast('Type a place name to search, e.g. "Red Fort".');
      const hit = findPlace(text);
      if (hit) window.location.href = hit.file;
      else showToast(`🚧 "${text}" is work in progress. We are adding more places soon!`);
    };

    button.addEventListener('click', go);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  });
}

/* ---------- 3. HOMEPAGE: ONE SECTION AT A TIME ---------- */
function setupPages() {
  const hero = document.getElementById('home');
  if (!hero) return;

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(s => s.classList.add('page'));
  const links = document.querySelectorAll('.nav-links a');

  function route() {
    const id = (location.hash || '#home').slice(1);
    let found = false;
    sections.forEach(s => {
      const on = s.id === id;
      s.classList.toggle('active', on);
      if (on) found = true;
    });
    hero.classList.toggle('is-hidden', found);
    const current = found ? id : 'home';
    links.forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#' + current));
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
}

/* ---------- 4. ITINERARY MAKER ---------- */
function fmt(h) {
  const H = Math.floor(h);
  let M = Math.round((h - H) * 60);
  let HH = H;
  if (M === 60) { M = 0; HH += 1; }
  return `${((HH + 11) % 12) + 1}:${String(M).padStart(2, '0')} ${HH >= 12 ? 'PM' : 'AM'}`;
}

function setupItinerary() {
  const form = document.querySelector('.itinerary-form');
  const out = document.getElementById('itinerary-result');
  if (!form || !out) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const limit = Number(d.get('time')), area = d.get('area'), month = d.get('month');
    const weather = d.get('weather'), daytime = d.get('daytime'), likes = d.getAll('interest');

    const days = limit === 24 ? 2 : 1;
    const perDay = limit === 24 ? 9 : limit;
    const start = { morning: 8, afternoon: 13, evening: 16.5 }[daytime];

    const dist = p => p.area === area ? 0 : (NEAR[area] || []).includes(p.area) ? 1 : 2;
    const rank = p => dist(p)
                    - 10 * p.tags.filter(t => likes.includes(t)).length
                    + (weather === 'rainy' && p.outdoor ? 6 : 0);

    let pool = PLACES.filter(p => !likes.length || p.tags.some(t => likes.includes(t)));
    if (daytime === 'evening') pool = pool.filter(p => p.night);
    pool.sort((a, b) => rank(a) - rank(b));

    // fill each day with the best-ranked places that fit the time limit
    const plan = [];
    for (let i = 0; i < days; i++) {
      let t = start, used = 0;
      const stops = [];
      pool.slice().forEach(p => {
        const need = p.hours + (stops.length ? 0.5 : 0);   // 30 min travel between stops
        const closes = p.night ? 21.5 : 18;                // monuments close around sunset
        if (used + need <= perDay && t + p.hours <= closes) {
          stops.push({ p, at: t });
          t += p.hours + 0.5;
          used += need;
          pool.splice(pool.indexOf(p), 1);
        }
      });
      plan.push(stops);
    }

    if (!plan.some(s => s.length)) {
      out.innerHTML = `<div class="plan-notes"><h3>No matching plan</h3>
        <p>Try more time, a different time of day, or fewer place types.</p></div>`;
      out.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const notes = [];
    if (weather === 'hot' || ['April', 'May', 'June'].includes(month))
      notes.push('Expect heat: carry water, wear light cotton and keep indoor stops for the middle of the day.');
    if (weather === 'rainy' || ['July', 'August', 'September'].includes(month))
      notes.push('Carry an umbrella. Monsoon showers can interrupt outdoor sites and slow traffic.');
    if (weather === 'cold' || ['December', 'January'].includes(month))
      notes.push('Winter mornings can be cold and foggy: dress in layers and allow extra travel time.');
    if (['October', 'November', 'December', 'January'].includes(month))
      notes.push('Air quality can be poor in winter. Check the AQI and carry a mask if you are sensitive.');
    if (!notes.length) notes.push(`${month} is usually a comfortable month for sightseeing in Delhi.`);
    if (daytime === 'evening')
      notes.push('Most protected monuments close around sunset, so this plan keeps to places that stay open or lively after dark.');
    const names = plan.flat().map(s => s.p.name);
    if (['Red Fort', 'Lotus Temple', 'Akshardham'].some(n => names.includes(n)))
      notes.push('Red Fort, Lotus Temple and Akshardham are closed on Mondays. Check current timings before you go.');
    notes.push('Use the <a href="#travel" style="color:#D5A66F">Travel</a> section to book a metro, cab or Rapido between stops.');

    out.innerHTML = plan.map((stops, i) => stops.length ? `
      <div class="plan-day">
        <h3>${days > 1 ? 'Day ' + (i + 1) : 'Your Itinerary'}</h3>
        ${stops.map(s => `
          <div class="plan-stop">
            <div class="plan-time">${fmt(s.at)}</div>
            <div><a href="${s.p.file}">${s.p.name}</a>
            <span>About ${s.p.hours} hours · ${s.p.tags.join(', ')}</span></div>
          </div>`).join('')}
      </div>` : '').join('')
      + `<div class="plan-notes"><h3>Travel tips</h3><ul>${notes.map(n => `<li>${n}</li>`).join('')}</ul></div>`;

    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---------- START ---------- */
setupSearch();
setupPages();
setupItinerary();