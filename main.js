
document.addEventListener('DOMContentLoaded', () => {
  assembleEvents(document.getElementById('upcoming-events'), document.getElementById('past-events'));
})

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "April", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];


function pad(num) {
  return num < 10 ? '0' + num : num;
}

function toShortDateString(d) {
  return `${d.getYear() + 1900}-${pad(d.getMonth())}-${pad(d.getDate())}`;
}

function isTentative(ev) {
  return ev.title.indexOf('?') >= 0 ||
  ev.lead.indexOf('?') >=0;
}

async function assembleEvents(upcomingElem, pastElem) {
  const events = await getEvents();
  const [pastEvents, futureEvents] = splitEvents(events);

  upcomingElem.innerHTML = `
  <ul class="list-group upcoming-event-list">
  ${
    // display only first 5
    futureEvents.slice(0, 5).map(ev => `
    <li class="list-group-item ${ev.type ? 'event-' + ev.type : ''} ${isTentative(ev) ? 'tentative' : ''}">
    <p>${WEEKDAYS[ev.date.getDay()]}, 
    ${ev.date.getDate()}-${MONTH_NAMES[ev.date.getMonth()]}-${ev.date.getYear() + 1900}</p>
    <h5 class="title">
      ${ev.title}
      ${ev.paper ? `<a target="_blank" href="${ev.paper}"><i class="fa fa-file-text-o"></i></a>` : ''}
  
    </h5>
    ${ev.lead.indexOf('?') < 0 ? `Lead: <strong>${ev.lead}</strong>`: ''}
    ${ev.facilitators.length == 0 ? '' : ' | Facilitators: ' + ev.facilitators.map(f => `<strong>${f}</strong>`).join(', ')}
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
    <td>${toShortDateString(ev.date)}</td>
    <td>${ev.title} 
    &nbsp;${ev.paper ? `<a target="_blank" href="${ev.paper}"><i class="fa fa-file-text-o"></i></a>` : ''}
    &nbsp;${ev.video ? `<a target="_blank" href="${ev.video}"><i class="fa fa-play-circle"></i></a>` : ''}
    </td>
    <td>${ev.lead}</td>
    <td>${ev.facilitators.join(', ')}</td>
    <td>${ev.venue}</td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`;
  $(pastElem.querySelector('#past-event-list')).DataTable({
    "order": [[ 0, "desc" ]]
  });
}

function splitEvents(events) {
  let past = [];
  let future = [];
  events.forEach(e => {
    if (e.date > new Date()) { future.push(e); }
    else { past.push(e); }
  });
  past = past.sort((e1, e2) => e1.date - e2.date);
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
  console.log(JSON.stringify(raw, null, 2));
  return raw;
}

async function getEvents() {
  const data = await getRawData();
  const [rawHeader, ...rawRows] = data.values;
  const events = rawRows.map(
    rawR => rawRowToRow(rawHeader, rawR)).filter(
      e => e.title && e.lead
  );
  return events;
}

function getEventType(title) {
  if(!title) {
    return null;
  }
  const titleLower = title.toLowerCase();
  if (titleLower.startsWith('[classics]')) {
    return "classics";
  } else if (titleLower.startsWith('[fasttrack]')) {
    return 'fasttrack';
  } else {
    return 'regular';
  }
}

function rawRowToRow(rawHeader, rawRow) {
  const title = rawRow[rawHeader.indexOf('Title')];
  const venue = rawRow[rawHeader.indexOf('Venue')];
  const lead = rawRow[rawHeader.indexOf('Lead')];
  const video = rawRow[rawHeader.indexOf('Youtube Link')];
  const paper = rawRow[rawHeader.indexOf('Paper Reference')];
  const facilitators = [];
  const fac1 = rawRow[rawHeader.indexOf('Facilitator 1')];
  const fac2 = rawRow[rawHeader.indexOf('Facilitator 2')];
  const type = getEventType(title);
  if (fac1 && fac1.indexOf('?') < 0) { facilitators.push(fac1) }
  if (fac2 && fac2.indexOf('?') < 0) { facilitators.push(fac2) }
  return {
    title,
    date: new Date((rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, '')),
    lead,
    venue,
    facilitators,
    subjectMatterArea: rawRow[rawHeader.indexOf('Subject Matter Area')],
    video,
    type,
    paper
  }
}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543