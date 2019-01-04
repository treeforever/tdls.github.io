
document.addEventListener('DOMContentLoaded', () => {
  // main script entry point
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
  // pad single digit number with zero
  return num < 10 ? '0' + num : num;
}

function toShortDateString(d) {
  // returns YYYY-MM-DD
  return `${d.getYear() + 1900}-${pad(d.getMonth())}-${pad(d.getDate())}`;
}

function isTentative(ev) {
  // broadly speaking, a question mark indicates uncertainty
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
  <table class="table table-striped table-condensed" id="past-event-list">
  <thead><tr>${
    ['Date', 'Title', 'Lead', 'Facilitators', 'Venue'].map(lbl => `
  <th>${lbl}</th>
  `).join('')
    }</tr></thead>
  <tbody>
  ${pastEvents.map(ev => `
  <tr>
    <td class="align-middle">${toShortDateString(ev.date)}</td>
    <td class="align-middle">${ev.title}
    &nbsp;${ev.slides ? `<a target="_blank" href="${ev.slides}"><i class="fa fa-file-powerpoint-o"></i></a>` : ''}
    &nbsp;${ev.paper ? `<a target="_blank" href="${ev.paper}"><i class="fa fa-file-text-o"></i></a>` : ''}
    &nbsp;${ev.video ? `<a target="_blank" href="${ev.video}"><i class="fa fa-play-circle"></i></a>` : ''}
    </td>
    <td class="align-middle">${ev.lead}</td>
    <td class="align-middle">${ev.facilitators.join(', ')}</td>
    <td class="align-middle">${ev.venue}</td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`;

  // load up DataTable for cool gadgets such as pagination, sorting and search
  $(pastElem.querySelector('#past-event-list')).DataTable({
    order: [[ 0, "desc" ]],
    columnDefs: [
      { "width": "70", "targets": 0 }
    ]
  });
}

function splitEvents(events) {
  // split into the past and future
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

  // get raw sheet data in JSON
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

  // convert raw JSON rows to our own event data type
  const events = rawRows.map(
    rawR => rawRowToRow(rawHeader, rawR)).filter(
      //only care about rows that have both title and lead
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
  const slides = rawRow[rawHeader.indexOf('Slides Link')];
  const facilitators = [];
  const fac1 = rawRow[rawHeader.indexOf('Facilitator 1')];
  const fac2 = rawRow[rawHeader.indexOf('Facilitator 2')];
  const type = getEventType(title);

  // broadly speaking, a question mark indicates uncertainty
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
    paper,
    slides
  }
}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543