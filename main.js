assembleEvents(document.getElementById('upcoming-events'), document.getElementById('past-events'));

async function assembleEvents(upcomingElem, pastElem) {
  const events = await getEvents();
  const [pastEvents, futureEvents] = splitEvents(events);

  upcomingElem.innerHTML = `
  <ul class="list-group">
  ${
    // display only first 5
    futureEvents.slice(0, 5).map(ev => `
    <li class="list-group-item">
    <p>${ev.date}</p>
    <h5>${ev.title}</h5>
    Lead: ${ev.lead}${ev.facilitators.length == 0 ? '' : ' | Facilitators: ' + ev.facilitators.join(', ')}
    </li>
    `).join('')
    }
  </ul>
  `;

  pastElem.innerHTML = `
  <table id="past-event-list">
  <thead><tr>${
    ['Date', 'Title', 'Lead', 'Facilitators', 'Venue'].map(lbl => `
  <th>${lbl}</th>
  `).join('')
    }</tr></thead>
  <tbody>
  ${pastEvents.map(ev => `
  <tr>
    <td>${ev.date}</td>
    <td>${ev.title} ${ev.video ? `<a target="_blank" href="${ev.video}"><i class="fa fa-youtube"></i></a>` : ''}</td>
    <td>${ev.lead}</td>
    <td>${ev.facilitators.join(', ')}</td>
    <td>${ev.venue}</td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`;
  $(pastElem.querySelector('#past-event-list')).DataTable();
}

function splitEvents(events) {
  let past = [];
  let future = [];
  events.forEach(e => {
    if (e.date > new Date()) { future.push(e); }
    else { past.push(e); }
  });
  past = past.sort((e1, e2) => e2.date - e1.date);
  future = future.sort((e1, e2) => e1.date - e2.date);

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
  const events = rawRows.map(rawR => rawRowToRow(rawHeader, rawR)).filter(e => e.title && e.lead);
  return events;
}

function rawRowToRow(rawHeader, rawRow) {
  const title = rawRow[rawHeader.indexOf('Title')];
  const venue = rawRow[rawHeader.indexOf('Venue')];
  const lead = rawRow[rawHeader.indexOf('Lead')];
  const video = rawRow[rawHeader.indexOf('Youtube Link')];
  const facilitators = [];
  const fac1 = rawRow[rawHeader.indexOf('Facilitator 1')];
  const fac2 = rawRow[rawHeader.indexOf('Facilitator 2')];
  if (fac1 && fac1.indexOf('?') < 0) { facilitators.push(fac1) }
  if (fac2 && fac2.indexOf('?') < 0) { facilitators.push(fac2) }
  return {
    title,
    date: new Date((rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, '')),
    lead,
    venue,
    facilitators,
    subjectMatterArea: rawRow[rawHeader.indexOf('Subject Matter Area')],
    video
  }
}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543