assembleEvent(document.getElementById('upcoming-events'), document.getElementById('past-events'));

async function assembleEvent(upcomingElem, pastElem) {
  const events = await getEvents();
  const [pastEvents, futureEvents] = splitEvents(events);
  const t = `
  <table id="past-event-list">
  <thead><tr>${
    ['Date', 'Title', 'Lead', 'Facilitator 1', 'Facilitator 2', 'Venue'].map(lbl => `
  <th>${lbl}</th>
  `).join('')
    }</tr></thead>
  <tbody>
  ${pastEvents.map(ev => `
  <tr>
    <td>${ev.date}</td>
    <td>${ev.title}</td>
    <td>${ev.lead}</td>
    <td>${ev.facilitator1}</td>
    <td>${ev.facilitator2}</td>
    <td>${ev.venue}</td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`;
  pastElem.innerHTML = t;
  $(pastElem.querySelector('#past-event-list')).DataTable();
}

function splitEvents(events) {
  events = events.sort((e1, e2) => e2.date - e1.date);
  const past = [];
  const future = [];
  events.forEach(e => {
    if (e.date > new Date()) { future.push(e); }
    else { past.push(e); }
  });
  console.log(past);
  return [past, future];
}

async function getRawData() {

  const SHEET_ID = '1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE';
  const KEY = 'AIzaSyAUMihCUtNS35espxycitPYrTE_78W93Ps';
  const SHEET_VALUE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Schedule?key=${KEY}`;

  const resp = await fetch(SHEET_VALUE_URL, {
    method: 'GET',
    cache: 'default'
  });
  const raw = await resp.json();
  return raw;
}

async function getEvents() {
  const data = await getRawData();
  const [rawHeader, ...rawRows] = data.values;
  const events = rawRows.map(rawR => rawRowToRow(rawHeader, rawR)).filter(e => e.title && e.venue && e.lead);
  return events;
}

function rawRowToRow(rawHeader, rawRow) {
  const title = rawRow[rawHeader.indexOf('Title')];
  const venue = rawRow[rawHeader.indexOf('Venue')];
  const lead = rawRow[rawHeader.indexOf('Lead')];
  return {
    title,
    date: new Date((rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, '')),
    lead,
    venue,
    facilitator1: rawRow[rawHeader.indexOf('Facilitator 1')],
    facilitator2: rawRow[rawHeader.indexOf('Facilitator 2')],
    subjectMatterArea: rawRow[rawHeader.indexOf('Subject Matter Area')]
  }
}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
