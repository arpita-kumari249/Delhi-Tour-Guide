/* ---------- 1. SMALL HELPERS ---------- */
const LINE_COLOURS = {
  Yellow:  ['#F5C400', '#282722'],
  Blue:    ['#0B5CAB', '#FFFFFF'],
  Violet:  ['#7B3FA0', '#FFFFFF'],
  Magenta: ['#C2185B', '#FFFFFF'],
  Pink:    ['#E87AA6', '#282722'],
  Red:     ['#D32F2F', '#FFFFFF'],
  Green:   ['#2E8B57', '#FFFFFF']
};
const TRAVELLERS = ['Students', 'Solo', 'Family', 'Couples'];

const GENERAL_NOTE = 'Prices are indicative (checked November 2026) and can change. Confirm at the counter or on the official website before you go.';
const ASI_LINK = ['Book on the official ASI portal', 'https://asi.payumoney.com'];
const BIENNALE = 'India Biennale 2026 (4 Dec 2026 – 21 Mar 2027) uses this site as a venue. Expect extra exhibition tickets, bigger crowds or partial closures, and check the Biennale website before you visit.';

const mapsUrl = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const badge = l => `<span class="line-badge" style="background:${LINE_COLOURS[l][0]};color:${LINE_COLOURS[l][1]}">${l} Line</span>`;

/* ---------- 2. POPULAR SPOTS: [name, note, price 1-3, traveller types, Google Maps search] ---------- */
const S = {
  /* cafes and sweet stops */
  triveni:   ['Triveni Tea Terrace', 'Garden tea-and-snacks spot beside an art gallery, cheap and relaxed', 1, ['Students', 'Solo'], 'Triveni Tea Terrace Tansen Marg New Delhi'],
  lota:      ['Café Lota', 'Garden café at the National Crafts Museum serving Indian comfort food', 2, ['Family', 'Solo', 'Couples'], 'Cafe Lota National Crafts Museum Bhairon Marg New Delhi'],
  turtle:    ['Café Turtle', 'Bookshop café, quiet for reading or a solo coffee', 2, ['Solo', 'Students'], 'Cafe Turtle Khan Market New Delhi'],
  bigchill:  ['The Big Chill Café', 'Long-running café for pasta, desserts and shakes', 2, ['Family', 'Students', 'Couples'], 'The Big Chill Cafe Khan Market New Delhi'],
  haldirams: ['Haldiram’s, Chandni Chowk', 'Easy sit-down for chaat, thalis and sweets', 1, ['Family', 'Students', 'Solo'], "Haldiram's Chandni Chowk Delhi"],
  giani:     ['Giani’s (Giani Di Hatti)', 'Old Delhi ice cream and falooda', 1, ['Students', 'Family', 'Solo'], 'Giani Di Hatti Chandni Chowk Delhi'],
  kuremal:   ['Kuremal Mohan Lal Kulfi Wale', 'Known for fruit-stuffed kulfi', 1, ['Students', 'Family', 'Solo'], 'Kuremal Mohan Lal Kulfi Wale Chawri Bazar Delhi'],
  jalebi:    ['Old Famous Jalebi Wala', 'Hot jalebis at Dariba Kalan, an Old Delhi classic', 1, ['Students', 'Family', 'Solo'], 'Old Famous Jalebi Wala Dariba Kalan Delhi'],
  olive:     ['Olive Bar & Kitchen', 'Courtyard dining in Mehrauli, a treat rather than a budget meal', 3, ['Couples', 'Family'], 'Olive Bar and Kitchen Mehrauli Delhi'],
  chaayos_ss:['Chaayos, Saket', 'Budget chai and snacks for a quick break', 1, ['Students', 'Solo'], 'Chaayos Saket Delhi'],
  chaayos_mv:['Chaayos, Mayur Vihar', 'Budget chai and snacks for a quick break', 1, ['Students', 'Solo'], 'Chaayos Mayur Vihar Phase 1 Delhi'],
  chaayos_np:['Chaayos, Nehru Place', 'Budget chai and snacks for a quick break', 1, ['Students', 'Solo'], 'Chaayos Nehru Place Delhi'],
  haldirams_mv:['Haldiram’s, Mayur Vihar', 'Veg snacks and sweets, family friendly', 1, ['Family', 'Students'], "Haldiram's Mayur Vihar Phase 1 Delhi"],
  gk_cafes:  ['GK-II M-Block Market cafés', 'Cluster of casual cafés and bakeries', 2, ['Students', 'Solo', 'Couples'], 'M Block Market Greater Kailash 2 Delhi'],

  /* restaurants */
  andhra:    ['Andhra Pradesh Bhawan Canteen', 'Cheap, filling Andhra meals near India Gate', 1, ['Students', 'Solo', 'Family'], 'Andhra Pradesh Bhawan Canteen Ashoka Road New Delhi'],
  khanchacha:['Khan Chacha', 'Famous kebab rolls in Khan Market', 1, ['Students', 'Solo'], 'Khan Chacha Khan Market New Delhi'],
  bengali:   ['Bengali Sweet House', 'Bengali Market classic for chaat and sweets', 1, ['Students', 'Family'], 'Bengali Sweet House Bengali Market New Delhi'],
  nathus:    ['Nathu’s Sweets', 'Veg meals, chaat and sweets', 2, ['Family'], "Nathu's Sweets Bengali Market New Delhi"],
  paranthe:  ['Paranthe Wali Gali', 'Lane of stuffed-paratha shops', 1, ['Students', 'Solo', 'Family'], 'Paranthe Wali Gali Chandni Chowk Delhi'],
  natraj:    ['Natraj Dahi Bhalle Wala', 'Dahi bhalle and aloo tikki, a budget staple', 1, ['Students', 'Solo', 'Family'], 'Natraj Dahi Bhalle Wala Chandni Chowk Delhi'],
  karims:    ['Karim’s, Jama Masjid', 'Mughlai kebabs and curries behind the mosque', 2, ['Family', 'Solo'], "Karim's Jama Masjid Delhi"],
  aljawahar: ['Al Jawahar', 'Mughlai non-veg close to Jama Masjid', 2, ['Family', 'Solo'], 'Al Jawahar Restaurant Jama Masjid Delhi'],
  motimahal: ['Moti Mahal Delux, Daryaganj', 'Known for butter chicken', 2, ['Family'], 'Moti Mahal Delux Daryaganj Delhi'],
  karims_niz:['Karim’s, Nizamuddin', 'Mughlai kebabs, a short ride from Humayun’s Tomb', 2, ['Family', 'Solo'], "Karim's Nizamuddin Delhi"],
  sagar:     ['Sagar Ratna, Defence Colony', 'South Indian veg, quick and budget friendly', 1, ['Students', 'Family'], 'Sagar Ratna Defence Colony Delhi'],
  rajinder:  ['Rajinder Da Dhaba', 'Tandoori chicken and kebabs, Safdarjung Enclave', 2, ['Students', 'Solo'], 'Rajinder Da Dhaba Safdarjung Enclave Delhi'],
  naivedyam: ['Naivedyam', 'South Indian vegetarian in Hauz Khas Village', 2, ['Family', 'Solo'], 'Naivedyam Hauz Khas Village Delhi'],
  citywalk_fc:['Select Citywalk Food Court', 'Many cuisines under one roof, easy with families', 2, ['Family', 'Students'], 'Select Citywalk Food Court Saket Delhi'],
  govindas:  ['Govinda’s (ISKCON)', 'Pure-veg thali and buffet near the temple', 2, ['Family', 'Solo'], "Govinda's Restaurant ISKCON Temple East of Kailash Delhi"],
  crpark:    ['Chittaranjan Park Market No. 1', 'Bengali food, sweets and fish stalls', 1, ['Students', 'Family'], 'Chittaranjan Park Market No 1 Delhi'],
  premvati:  ['Premvati Food Court', 'Pure-veg food court inside the Akshardham complex', 1, ['Family', 'Solo'], 'Premvati Food Court Akshardham Delhi'],
  laxmi_food:['Laxmi Nagar street food', 'Chaat, momos and rolls in a student area', 1, ['Students', 'Solo'], 'Laxmi Nagar Market Delhi'],

  /* shops and markets */
  janpath:   ['Janpath Market', 'Bargain clothes, jewellery and souvenirs', 1, ['Students', 'Solo'], 'Janpath Market New Delhi'],
  cottage:   ['Central Cottage Industries Emporium', 'Fixed-price handicrafts, good for gifts', 2, ['Family', 'Solo'], 'Central Cottage Industries Emporium Janpath New Delhi'],
  khanmkt:   ['Khan Market', 'Bookshops, boutiques and gifts', 2, ['Solo', 'Family', 'Couples'], 'Khan Market New Delhi'],
  dillihaat: ['Dilli Haat INA', 'Craft stalls from across India, small entry fee', 2, ['Family', 'Solo', 'Students'], 'Dilli Haat INA New Delhi'],
  khari:     ['Khari Baoli Spice Market', 'One of Asia’s largest wholesale spice markets', 1, ['Family', 'Solo'], 'Khari Baoli Spice Market Delhi'],
  chawri:    ['Chawri Bazar', 'Paper, stationery and brassware', 1, ['Students', 'Solo'], 'Chawri Bazar Delhi'],
  dariba:    ['Dariba Kalan', 'Silver jewellery and attar perfumes', 2, ['Family', 'Solo', 'Couples'], 'Dariba Kalan Delhi'],
  kinari:    ['Kinari Bazar', 'Wedding trims, ribbons and accessories', 1, ['Students', 'Family'], 'Kinari Bazar Chandni Chowk Delhi'],
  meena:     ['Meena Bazar, Jama Masjid', 'Souvenirs, fabrics and everyday goods', 1, ['Students', 'Solo', 'Family'], 'Meena Bazar Jama Masjid Delhi'],
  chhatta:   ['Chhatta Chowk, Red Fort', 'Souvenir arcade just inside Lahori Gate', 2, ['Family', 'Solo'], 'Chhatta Chowk Red Fort Delhi'],
  hauzkhas:  ['Hauz Khas Village', 'Boutiques and design stores near a lake and ruins', 2, ['Students', 'Solo', 'Couples'], 'Hauz Khas Village Delhi'],
  onestyle:  ['One Style Mile, Mehrauli', 'Home décor and design shops', 3, ['Couples', 'Solo'], 'One Style Mile Mehrauli Delhi'],
  sarojini:  ['Sarojini Nagar Market', 'Budget clothing, a student favourite', 1, ['Students'], 'Sarojini Nagar Market Delhi'],
  lajpat:    ['Lajpat Nagar Central Market', 'Affordable clothes, fabric and street food', 1, ['Students', 'Family'], 'Lajpat Nagar Central Market Delhi'],
  defcol:    ['Defence Colony Market', 'Boutiques, bakeries and home stores', 2, ['Family', 'Solo'], 'Defence Colony Market Delhi'],
  nehru:     ['Nehru Place Market', 'Electronics and IT accessories at low prices', 1, ['Students'], 'Nehru Place Market Delhi'],
  lodhicolony:['Lodhi Colony Market', 'Street-art district with small cafés and shops', 1, ['Students', 'Solo', 'Couples'], 'Lodhi Colony Market Delhi'],
  laxmi:     ['Laxmi Nagar Market', 'Budget clothes and daily goods', 1, ['Students', 'Family'], 'Laxmi Nagar Market Delhi'],
  mayurvihar:['Mayur Vihar Phase 1 Market', 'Everyday shopping and local eateries', 1, ['Family', 'Students'], 'Mayur Vihar Phase 1 Market Delhi'],
  akshgift:  ['Akshardham gift shops', 'Books, souvenirs and keepsakes in the complex', 2, ['Family', 'Solo'], 'Akshardham Temple Delhi gift shop']
};

/* ---------- 3. THE TEN PLACES ----------
   Key = file name in lowercase with "_" turned into "-"  (India_Gate.html -> 'india-gate')
   metro.gate: set only when confirmed. Leave null to show "check the signboard". */
const PLACE_DATA = {

  'india-gate': {
    name: 'India Gate',
    facts: [['OPEN', 'All day'], ['BEST TIME', 'Evening, after sunset'], ['ENTRY', 'Free']],
    tickets: [['India Gate lawns', 'Free'], ['National War Memorial', 'Free']],
    ticketNote: GENERAL_NOTE,
    address: 'Kartavya Path, Central Secretariat, New Delhi – 110001',
    metro: { station: 'Central Secretariat', lines: ['Yellow', 'Violet'], gate: 'Gate 3 · India Gate / Boat Club', walk: 'About 2 km · auto, e-rickshaw or a long walk' },
    bus: { stop: 'India Gate' },
    reach: [
      ['From Connaught Place', 'Take the Yellow Line from Rajiv Chowk to Central Secretariat, exit Gate 3, then continue by auto or on foot along Kartavya Path.'],
      ['By cab or auto', 'Ask for “India Gate”. Expect traffic and security restrictions around national events.']
    ],
    near: ['National War Memorial', 'Rashtrapati Bhavan', 'National Gallery of Modern Art', 'Purana Qila', 'Delhi Zoo', 'Khan Market'],
    cafes: ['triveni', 'lota', 'turtle'], food: ['andhra', 'khanchacha', 'bengali'], shops: ['janpath', 'cottage', 'khanmkt']
  },

  'red-fort': {
    name: 'Red Fort',
    facts: [['OPEN', 'Tuesday – Sunday'], ['CLOSED', 'Mondays'], ['ENTRY', '₹35 (foreigners ~₹550)']],
    tickets: [['Indian, SAARC and BIMSTEC visitors', '₹35'], ['Foreign tourists', 'About ₹550'], ['Children under 15', 'Free']],
    ticketNote: GENERAL_NOTE + ' Museums and the evening sound and light show are ticketed separately.',
    ticketLink: ASI_LINK, alert: BIENNALE,
    address: 'Netaji Subhash Marg, Chandni Chowk, Old Delhi – 110006',
    metro: { station: 'Lal Qila', lines: ['Violet'], gate: 'Gate 1 · Red Fort / Lahori Gate side', walk: 'Short walk across the road' },
    bus: { stop: 'Red Fort (Lal Qila)' },
    reach: [
      ['From New Delhi Railway Station', 'Take the Yellow Line one stop to Chandni Chowk, then a cycle-rickshaw or a walk to the fort.'],
      ['From Connaught Place', 'Yellow Line from Rajiv Chowk to Central Secretariat, change to the Violet Line towards Kashmere Gate and get off at Lal Qila.']
    ],
    near: ['Jama Masjid', 'Chandni Chowk', 'Digambar Jain Temple', 'Gurudwara Sis Ganj Sahib', 'Fatehpuri Masjid'],
    cafes: ['haldirams', 'jalebi', 'giani'], food: ['paranthe', 'karims', 'natraj'], shops: ['chhatta', 'dariba', 'khari']
  },

  'qutub-minar': {
    name: 'Qutub Minar',
    facts: [['OPEN', 'Daily'], ['TIMING', 'Sunrise – Sunset'], ['ENTRY', '₹35 (foreigners ~₹550)']],
    tickets: [['Indian, SAARC and BIMSTEC visitors', '₹35'], ['Foreign tourists', 'About ₹550'], ['Children under 15', 'Free']],
    ticketNote: GENERAL_NOTE + ' Climbing the minar is not currently permitted.',
    ticketLink: ASI_LINK, alert: BIENNALE,
    address: 'Mehrauli, Seth Sarai, New Delhi – 110030',
    metro: { station: 'Qutub Minar', lines: ['Yellow'], gate: null, walk: 'About 1.3 km · auto or e-rickshaw' },
    bus: { stop: 'Qutab Minar' },
    reach: [
      ['From Rajiv Chowk', 'Take the Yellow Line towards HUDA City Centre and get off at Qutub Minar. Take an auto or e-rickshaw for the last stretch.'],
      ['By cab', 'Drop-off is near the main gate. Early mornings are easier for crowds and parking.']
    ],
    near: ['Mehrauli Archaeological Park', 'Jamali Kamali Mosque and Tomb', 'Hauz Khas Village', 'Garden of Five Senses'],
    cafes: ['olive', 'chaayos_ss'], food: ['naivedyam', 'citywalk_fc'], shops: ['hauzkhas', 'onestyle', 'dillihaat']
  },

  'akshardham': {
    name: 'Akshardham',
    facts: [['OPEN', 'Tuesday – Sunday'], ['CLOSED', 'Mondays'], ['ENTRY', 'Free · exhibitions ~₹260']],
    tickets: [['Main mandir entry', 'Free'], ['Exhibitions (adult)', 'About ₹260'], ['Water show (adult / senior)', 'About ₹110'], ['Water show, children 4–11', 'Lower fare'], ['Children under 4', 'Free']],
    ticketNote: GENERAL_NOTE + ' Exhibition and water show tickets are bought at counters in the complex. Mobile phones, cameras and bags are not allowed inside.',
    ticketLink: ['Akshardham official website', 'https://www.akshardham.com'],
    address: 'NH 24, Pramukh Swami Maharaj Marg, New Delhi – 110092',
    metro: { station: 'Akshardham', lines: ['Blue'], gate: 'Gate 1 · Swaminarayan Akshardham Mandir', walk: 'About 350 m · turn right, walk ~100 m, turn right again and walk ~250 m to Gate 1' },
    bus: { stop: 'Akshardham Mandir' },
    reach: [
      ['From New Delhi Railway Station', 'Yellow Line towards HUDA City Centre, change at Rajiv Chowk to the Blue Line towards Noida, and get off at Akshardham.'],
      ['From Old Delhi Railway Station', 'Walk to Chandni Chowk Metro, take the Yellow Line towards HUDA City Centre, change at Rajiv Chowk to the Blue Line and get off at Akshardham.']
    ],
    near: ['Yamuna riverfront', 'Noida Link Road', 'Mayur Vihar', 'Laxmi Nagar', 'Commonwealth Games Village'],
    cafes: ['chaayos_mv', 'haldirams_mv'], food: ['premvati', 'laxmi_food'], shops: ['laxmi', 'mayurvihar', 'akshgift']
  },

  'lotus-temple': {
    name: 'Lotus Temple',
    facts: [['OPEN', 'Tuesday – Sunday'], ['CLOSED', 'Mondays'], ['ENTRY', 'Free']],
    tickets: [['Entry', 'Free'], ['Photography inside the hall', 'Not allowed']],
    ticketNote: GENERAL_NOTE,
    address: 'Lotus Temple Road, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi – 110019',
    metro: { station: 'Kalkaji Mandir', lines: ['Violet', 'Magenta'], gate: 'Gate 2 · Lotus Temple / Kalkaji Mandir', walk: 'About 1 km · walk or e-rickshaw' },
    bus: { stop: 'Lotus Temple' },
    reach: [
      ['From Rajiv Chowk', 'Yellow Line to Central Secretariat, change to the Violet Line towards Raja Nahar Singh and get off at Kalkaji Mandir.'],
      ['Last stretch', 'Leave by Gate 2, then walk or take an e-rickshaw towards the temple gate.']
    ],
    near: ['ISKCON Temple', 'Kalkaji Mandir', 'Nehru Place', 'Okhla Bird Sanctuary'],
    cafes: ['chaayos_np', 'gk_cafes'], food: ['govindas', 'crpark'], shops: ['nehru', 'lajpat', 'sarojini']
  },

  'humayuns-tomb': {
    name: 'Humayun’s Tomb',
    facts: [['OPEN', 'Daily'], ['TIMING', 'Sunrise – Sunset'], ['ENTRY', '₹35 (foreigners ~₹550)']],
    tickets: [['Indian, SAARC and BIMSTEC visitors', '₹35'], ['Foreign tourists', 'About ₹550'], ['Children under 15', 'Free']],
    ticketNote: GENERAL_NOTE + ' Sunder Nursery next door has its own separate ticket.',
    ticketLink: ASI_LINK, alert: BIENNALE,
    address: 'Mathura Road, near Nizamuddin East, New Delhi – 110013',
    metro: { station: 'JLN Stadium', lines: ['Violet'], gate: null, walk: 'About 1.5 km · auto or e-rickshaw' },
    bus: { stop: 'Humayun’s Tomb / Nizamuddin' },
    reach: [
      ['From Connaught Place', 'Yellow Line to Central Secretariat, change to the Violet Line towards Raja Nahar Singh and get off at JLN Stadium. Then take an auto.'],
      ['Combine your visit', 'Sunder Nursery and Nizamuddin Dargah are right next door.']
    ],
    near: ['Sunder Nursery', 'Nizamuddin Dargah', 'Purana Qila', 'Crafts Museum'],
    cafes: ['lota', 'bigchill', 'turtle'], food: ['karims_niz', 'sagar', 'khanchacha'], shops: ['defcol', 'lajpat', 'dillihaat']
  },

  'jama-masjid': {
    name: 'Jama Masjid',
    facts: [['OPEN', 'Daily'], ['NOTE', 'Restricted at prayer times'], ['ENTRY', 'Free · minaret ~₹100']],
    tickets: [['Mosque entry', 'Free'], ['Minaret climb (when open)', 'About ₹100'], ['Camera or phone photography', 'Fee may apply at the gate']],
    ticketNote: GENERAL_NOTE,
    address: 'Meena Bazar, Jama Masjid Road, Old Delhi – 110006',
    metro: { station: 'Jama Masjid', lines: ['Violet'], gate: null, walk: 'Short walk through the market lanes' },
    bus: { stop: 'Jama Masjid Bus Terminal' },
    reach: [
      ['From Connaught Place', 'Yellow Line to Central Secretariat, change to the Violet Line towards Kashmere Gate and get off at Jama Masjid.'],
      ['From Red Fort', 'Cross the road and walk through Meena Bazar to the mosque gate. It is a short walk.']
    ],
    near: ['Red Fort', 'Chandni Chowk', 'Urdu Bazar', 'Karim’s'],
    cafes: ['kuremal', 'jalebi', 'giani'], food: ['karims', 'aljawahar', 'motimahal'], shops: ['meena', 'chawri', 'kinari']
  },

  'lodhi-garden': {
    name: 'Lodhi Garden',
    facts: [['OPEN', 'Daily'], ['BEST TIME', 'Early morning, winter'], ['ENTRY', 'Free']],
    tickets: [['Garden entry', 'Free'], ['Tombs and monuments inside', 'Free']],
    ticketNote: GENERAL_NOTE,
    alert: BIENNALE,
    address: 'Lodhi Road, near Khanna Market, New Delhi – 110003',
    metro: { station: 'Jor Bagh', lines: ['Yellow'], gate: null, walk: 'About 1 km · short walk or auto' },
    bus: { stop: 'Lodhi Garden / Lodhi Road' },
    reach: [
      ['From Connaught Place', 'Yellow Line towards HUDA City Centre, get off at Jor Bagh, then walk or take an auto to the garden gates.'],
      ['Alternative', 'Violet Line to JLN Stadium and continue by auto.']
    ],
    near: ['Safdarjung’s Tomb', 'Khan Market', 'India Habitat Centre', 'India International Centre', 'Humayun’s Tomb'],
    cafes: ['bigchill', 'turtle', 'triveni'], food: ['khanchacha', 'rajinder', 'sagar'], shops: ['lodhicolony', 'khanmkt', 'sarojini']
  },

  'chandni-chowk': {
    name: 'Chandni Chowk',
    facts: [['OPEN', 'Mostly 10 am – evening'], ['WEEKLY OFF', 'Many shops closed Sundays'], ['ENTRY', 'Free']],
    tickets: [['Market entry', 'Free']],
    ticketNote: GENERAL_NOTE + ' Cycle-rickshaw fares are not fixed, so agree the fare before you ride.',
    address: 'Chandni Chowk, Old Delhi – 110006',
    metro: { station: 'Chandni Chowk', lines: ['Yellow'], gate: null, walk: 'A few minutes to the start of the market' },
    bus: { stop: 'Chandni Chowk' },
    reach: [
      ['By metro', 'Take the Yellow Line to Chandni Chowk, then walk or hire a cycle-rickshaw down the main road towards the Red Fort.'],
      ['Best way to explore', 'On foot through the lanes. Carry only what you need and keep valuables close.']
    ],
    near: ['Red Fort', 'Jama Masjid', 'Khari Baoli', 'Gurudwara Sis Ganj Sahib'],
    cafes: ['haldirams', 'giani', 'kuremal'], food: ['paranthe', 'natraj', 'karims'], shops: ['khari', 'dariba', 'chawri']
  },

  'purana-qila': {
    name: 'Purana Qila',
    facts: [['OPEN', 'Daily'], ['TIMING', 'Sunrise – Sunset'], ['ENTRY', '~₹20 (foreigners ~₹200)']],
    tickets: [['Indian, SAARC and BIMSTEC visitors', 'About ₹20'], ['Foreign tourists', 'About ₹200'], ['Children under 15', 'Free']],
    ticketNote: GENERAL_NOTE + ' These two rates could not be confirmed, so check the ASI portal. The sound and light show is ticketed separately.',
    ticketLink: ASI_LINK, alert: BIENNALE.replace('uses this site as a venue', 'is the main venue'),
    address: 'Mathura Road, near Pragati Maidan, New Delhi – 110003',
    metro: { station: 'Supreme Court (Pragati Maidan)', lines: ['Blue'], gate: null, walk: 'About 1 km · walk or auto' },
    bus: { stop: 'Purana Qila / Pragati Maidan' },
    reach: [
      ['From Rajiv Chowk', 'Take the Blue Line towards Noida and get off at Supreme Court (Pragati Maidan), then walk or take an auto.'],
      ['Combine your visit', 'India Gate, Delhi Zoo and Humayun’s Tomb are all nearby.']
    ],
    near: ['India Gate', 'Delhi Zoo', 'Humayun’s Tomb', 'Sunder Nursery', 'Crafts Museum'],
    cafes: ['lota', 'triveni', 'bigchill'], food: ['nathus', 'andhra', 'bengali'], shops: ['cottage', 'janpath', 'dillihaat']
  }
};

/* ---------- 4. NAVBAR SEARCH (same as homepage) ---------- */
const SEARCH_PLACES = [
  { name: 'India Gate',     file: 'India_Gate.html',    aliases: ['kartavya path', 'war memorial'] },
  { name: 'Red Fort',       file: 'Red_Fort.html',      aliases: ['lal qila', 'lal kila'] },
  { name: 'Qutub Minar',    file: 'Qutub_Minar.html',   aliases: ['qutb minar', 'qutab minar', 'mehrauli'] },
  { name: 'Akshardham',     file: 'Akshardham.html',    aliases: ['swaminarayan', 'akshardham temple'] },
  { name: 'Lotus Temple',   file: 'Lotus_Temple.html',  aliases: ['bahai temple', 'lotus'] },
  { name: "Humayun's Tomb", file: 'Humayuns_Tomb.html', aliases: ['humayun', 'humayuns tomb'] },
  { name: 'Jama Masjid',    file: 'Jama_Masjid.html',   aliases: ['jama', 'jami masjid'] },
  { name: 'Lodhi Garden',   file: 'Lodhi_Garden.html',  aliases: ['lodi garden', 'lodhi'] },
  { name: 'Chandni Chowk',  file: 'Chandni_Chowk.html', aliases: ['chandni', 'old delhi market'] },
  { name: 'Purana Qila',    file: 'Purana_Qila.html',   aliases: ['old fort', 'purana kila', 'indraprastha'] }
];

const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function findPlace(query) {
  const q = clean(query);
  if (q.length < 3) return null;
  const names = p => [p.name, ...p.aliases].map(clean);
  return SEARCH_PLACES.find(p => names(p).includes(q))
      || SEARCH_PLACES.find(p => names(p).some(n => n.includes(q) || (n.length >= 6 && q.includes(n))));
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
  SEARCH_PLACES.forEach(p => {
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

/* ---------- 5. CARD BUILDERS ---------- */
function ticketCard(d) {
  const rows = d.tickets.map(([label, price]) =>
    `<div class="ticket${price === 'Free' ? ' free' : ''}"><span>${label}</span><strong>${price}</strong></div>`).join('');
  return `<section class="place-card" id="tickets">
    <h2>Ticket Prices</h2>
    <div class="ticket-grid">${rows}</div>
    ${d.alert ? `<div class="alert-box">⚠️ ${d.alert}</div>` : ''}
    <p class="ticket-note">${d.ticketNote}</p>
    ${d.ticketLink ? `<a class="btn" href="${d.ticketLink[1]}" target="_blank" rel="noopener">${d.ticketLink[0]}</a>` : ''}
  </section>`;
}

function locationCard(d) {
  const m = d.metro;
  const gate = m.gate
    ? `<p class="gate">🚪 Exit ${m.gate}</p>`
    : `<p class="gate unknown">🚪 Exit gate: follow the station signboard or the DMRC app</p>`;
  return `<section class="place-card" id="location">
    <h2>Location &amp; How to Reach</h2>
    <div class="loc-grid">
      <div class="loc-tile">
        <h3>📍 ADDRESS</h3>
        <p>${d.address}</p>
        <a class="loc-link" href="${mapsUrl(d.name + ' Delhi')}" target="_blank" rel="noopener">Open in Google Maps ↗</a>
      </div>
      <div class="loc-tile" style="border-top-color:${LINE_COLOURS[m.lines[0]][0]}">
        <h3>🚇 NEAREST METRO</h3>
        <p><strong>${m.station}</strong></p>
        <p>${m.lines.map(badge).join(' ')}</p>
        ${gate}
        <p>${m.walk}</p>
      </div>
      <div class="loc-tile">
        <h3>🚌 NEAREST BUS STOP</h3>
        <p><strong>${d.bus.stop}</strong></p>
        <p>Routes change, so check the One Delhi app or Google Maps for live buses.</p>
        <a class="loc-link" href="${mapsUrl(d.bus.stop + ' bus stop Delhi')}" target="_blank" rel="noopener">Find the stop ↗</a>
      </div>
    </div>
    <h3>GETTING THERE</h3>
    <ol class="reach-list">${d.reach.map(([t, x]) => `<li><strong>${t}</strong><span>${x}</span></li>`).join('')}</ol>
    <h3>ALSO NEARBY</h3>
    <div class="chips">${d.near.map(n => `<span>${n}</span>`).join('')}</div>
  </section>`;
}

function spotSection(title, icon, keys, d) {
  const items = [...new Set(keys)].map(k => S[k]).map(([name, note, price, who, q]) => `
    <li class="spot" data-who="${who.join(',')}">
      <div>
        <a href="${mapsUrl(q)}" target="_blank" rel="noopener">${name} ↗</a>
        <p>${note}</p>
        <div class="tags">${who.map(w => `<span>${w}</span>`).join('')}</div>
      </div>
      <span class="price-pill">${PRICE_LABEL[price]}</span>
    </li>`).join('');
  return `<section class="place-card">
    <h2>${icon} ${title} near ${d.name}</h2>
    <ul class="spot-list">${items}</ul>
    <p class="empty" hidden>No picks for this traveller type here yet. Try “All”.</p>
  </section>`;
}

function nearbyCards(d) {
  const intro = `<section class="place-card" id="nearby-intro">
    <h2>Eat, Sip &amp; Shop Near ${d.name}</h2>
    <p>Budget-friendly picks for every kind of traveller. Choose your style, then tap any name to open it on Google Maps.</p>
    <div class="nearby-tabs filter-bar">
      <button type="button" class="nearby-tab active" data-who="All">All</button>
      ${TRAVELLERS.map(t => `<button type="button" class="nearby-tab" data-who="${t}">${t}</button>`).join('')}
    </div>
  </section>`;
  return intro
    + spotSection('Cafés &amp; Sweet Stops', '☕', d.cafes, d)
    + spotSection('Restaurants', '🍽️', d.food, d)
    + spotSection('Shops &amp; Markets', '🛍️', d.shops, d);
}

function applyFilter(who) {
  document.querySelectorAll('.spot').forEach(li => {
    li.hidden = who !== 'All' && !li.dataset.who.split(',').includes(who);
  });
  document.querySelectorAll('.spot-list').forEach(ul => {
    const empty = ul.nextElementSibling;
    if (empty) empty.hidden = [...ul.children].some(li => !li.hidden);
  });
}

function htmlToNodes(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return [...tmp.children];
}

/* ---------- 6. BUILD THE PAGE (tickets, location, nearby) ---------- */
function buildPlacePage(d) {
  const main = document.querySelector('.place-content');
  if (!d || !main) return;

  // quick-facts strip at the top, with a coloured metro tile
  const qf = document.querySelector('.quick-facts');
  if (qf) {
    const m = d.metro;
    qf.innerHTML = d.facts.map(([l, v]) => `<div><strong>${l}</strong><span>${v}</span></div>`).join('')
      + `<div style="border-top-color:${LINE_COLOURS[m.lines[0]][0]}"><strong>NEAREST METRO</strong>
         <span>${m.station}</span><span>${m.lines.map(badge).join(' ')}</span></div>`;
  }

  // move the map / nearby / reviews block INTO <main> so it keeps the page width
  const extras = document.querySelector('.place-extras');
  const backRow = main.querySelector('.back-row');
  if (extras && extras.parentElement !== main) {
    if (backRow) main.insertBefore(extras, backRow); else main.appendChild(extras);
  }

  // replace the old Location card with tickets + the new location card
  let first = null;
  main.querySelectorAll(':scope > section.place-card').forEach(s => {
    const h = s.querySelector('h2');
    if (h && h.textContent.trim().toLowerCase() === 'location') s.remove();
    else if (!first) first = s;
  });
  const top = htmlToNodes(ticketCard(d) + locationCard(d));
  if (first) first.after(...top); else main.prepend(...top);

  // replace the old single "nearby" card with the three new sections
  const oldMap = document.getElementById('nearby-map');
  if (oldMap && oldMap.closest('section')) oldMap.closest('section').remove();
  const cards = htmlToNodes(nearbyCards(d));
  const reviewForm = document.getElementById('review-form');
  const reviewCard = reviewForm && reviewForm.closest('section');
  if (reviewCard) reviewCard.before(...cards);
  else (extras || main).append(...cards);

  // traveller filter
  document.querySelectorAll('.filter-bar .nearby-tab').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-bar .nearby-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.who);
  }));
}

/* ---------- 7. MAP + REVIEWS ---------- */
function setupMapAndReviews(d, id) {
  // use the place from PLACE_DATA, so a wrong data-place in the HTML can never show the wrong map
  const place = d ? `${d.name}, New Delhi` : ((document.querySelector('.place-extras') || {}).dataset || {}).place;
  if (!place) return;
  const q = encodeURIComponent(place);
  const shortName = place.split(',')[0];

  document.querySelectorAll('.place-name').forEach(s => { s.textContent = shortName; });

  const map = document.getElementById('place-map');
  if (map) map.src = `https://www.google.com/maps?q=${q}&output=embed`;
  const dir = document.getElementById('directions-link');
  if (dir) dir.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  // reviews are saved in this visitor's browser, one list per place
  const form = document.getElementById('review-form');
  const list = document.getElementById('review-list');
  const summary = document.getElementById('review-summary');
  const msg = document.getElementById('review-msg');
  if (!form || !list || !summary || !msg) return;

  const key = 'reviews:' + (id || place);
  const load = () => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (err) { return []; } };
  const save = items => { try { localStorage.setItem(key, JSON.stringify(items)); } catch (err) { /* storage blocked */ } };

  function render() {
    const reviews = load();
    list.textContent = '';
    if (!reviews.length) {
      summary.textContent = 'No reviews yet. Be the first to share your experience!';
      return;
    }
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    summary.textContent = `★ ${avg.toFixed(1)} / 5 · ${reviews.length} review${reviews.length > 1 ? 's' : ''}`;

    reviews.slice().reverse().forEach(r => {
      const item = document.createElement('div');
      item.className = 'review-item';

      const head = document.createElement('div');
      head.className = 'review-head';
      const who = document.createElement('strong');
      who.textContent = r.name;
      const stars = document.createElement('span');
      stars.className = 'review-stars';
      stars.textContent = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      head.append(who, stars);

      const meta = document.createElement('small');
      meta.textContent = `${r.type} · ${r.date}`;
      const text = document.createElement('p');
      text.textContent = r.text;

      item.append(head, meta, text);
      list.appendChild(item);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const rating = Number(data.get('rating'));
    if (!rating) { msg.textContent = 'Please choose a star rating.'; return; }

    const reviews = load();
    reviews.push({
      name: String(data.get('name')).trim(),
      rating,
      type: String(data.get('type')),
      text: String(data.get('text')).trim(),
      date: new Date().toLocaleDateString('en-IN')
    });
    save(reviews);
    form.reset();
    msg.textContent = 'Thank you! Your feedback has been added.';
    render();
  });

  render();
}

/* ---------- START ---------- */
(function init() {
  // India_Gate.html -> india-gate
  const file = decodeURIComponent(location.pathname.split('/').pop() || '');
  const id = file.replace(/\.html?$/i, '').toLowerCase().replace(/_/g, '-');
  const d = PLACE_DATA[id];

  setupSearch();
  buildPlacePage(d);          // tickets, location, nearby (runs first so the old nearby card is gone)
  setupMapAndReviews(d, id);  // map, directions, reviews
})();