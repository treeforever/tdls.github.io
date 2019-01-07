
document.addEventListener('DOMContentLoaded', () => {
  // main script entry point
  assembleEvents(
    document.getElementById('upcoming-events'),
    document.getElementById('past-events')
  );

  registerRoutes();
  handleHashChange(window.location.href);
})

function registerRoutes() {
  window.addEventListener("hashchange", ({ newURL }) => {
    handleHashChange(newURL);
  }, true);
}

async function handleHashChange(newURL) {
  if (!newURL) {
    return;
  } else {
    const hash = newURL.substring(newURL.indexOf('#') + 1);
    if (hash.startsWith('events/')) {
      const eventId = hash.substring('events/'.length);
      await showEvent(eventId);
    }
  }
}

function stripLeadingCategory(evTitle) {
  return evTitle.slice(evTitle.indexOf(']') + 1);
}

async function showEvent(eventId) {
  const events = await getEvents();
  const ev = events.find(ev => getEventId(ev) === eventId);
  console.log(ev.slides);
  $('#event-popup').html(`
  <div class="modal-dialog modal-lg modal-dialog-centered event-${ev.type}" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="title">
              ${stripLeadingCategory(ev.title)}
          </h4>
          
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          
        </div>
        <div class="modal-body ${isTentative(ev) ? 'tentative' : ''}">
          <dl class="row">
            <dt class="col-sm-4">Date:</dt> 
            <dd class="col-sm-8">
              ${WEEKDAYS[ev.date.getDay()]}, 
              ${ev.date.getDate()}-${MONTH_NAMES[ev.date.getMonth()]}-${ev.date.getYear() + 1900}
            </dd>
            ${ev.lead.indexOf('?') < 0 ? `
              <dt class="col-sm-4">Discussion lead</dt>
              <dd class="col-sm-8"><strong>${ev.lead}</strong>` : ''}</dd>
            ${ev.facilitators.length == 0 ? '' : `
              <dt class="col-sm-4">Discussion facilitators</dt> 
              <dd class="col-sm-8">${ev.facilitators.map(f => `<strong>${f}</strong>`).join(', ')}</dd>
            `}
            ${ev.paper ? `
              <dt class="col-sm-4">Paper: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.paper}"><i class="fa fa-file-text-o fa-lg"></i></a></dd>
            ` : ''}
            ${ev.slides ? `
              <dt class="col-sm-4">Slides: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.slides}"><i class="fa fa-file-powerpoint-o fa-lg"></i></a></dd>
            ` : ''}            
            ${ev.video ? `
              <dt class="col-sm-4">Recording: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.video}"><i class="fa fa-play-circle fa-lg"></i></a></dd>
            ` : ''}
            ${ev.reddit ? `
              <dt class="col-sm-4">Reddit: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.reddit}"><i class="fa fa fa-reddit fa-lg"></i></a></dd>
            ` : ''}     
            ${ev.code_official ? `
              <dt class="col-sm-4">Official Code: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.code_official}"><i class="fa fa-github fa-lg"></i></a></dd>
            ` : ''}
            ${ev.code_unofficial ? `
              <dt class="col-sm-4">Unofficial Code: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.code_unofficial}"><i class="fa fa-github fa-lg"></i></a></dd>
            ` : ''}
            ${ev.dataset1 ? `
              <dt class="col-sm-4">${ev.dataset2 ? `Dataset 1` : `Dataset`}: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.dataset1}"><i class="fa fa-database fa-lg"></i></a></dd>
            ` : ''}
            ${ev.dataset2 ? `
              <dt class="col-sm-4">Dataset 2: <i class="fa fa-external-link"></i></dt>
              <dd class="col-sm-8"><a target="_blank" href="${ev.dataset2}"><i class="fa fa-database fa-lg"></i></a></dd>
            ` : ''}
            <dt class="col-sm-4">Category:</dt> <dd class="col-sm-8">${READABLE_EVENT_TYPE[ev.type]}</dd>
          </dl>
        </div>
        <div class="modal-footer">
          <button 
          type="button" id="copy-link" class="btn btn-info"
          >Copy link</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `);

  $('#event-popup #copy-link').on('click', () => {
    copyToClipboard(window.location.href);
    $('#event-popup #copy-link').popover({
      content: 'Link to this event was copied to clipboard.',
      placement: 'left'
    })
  });

  const onModalClose = (e) => {
    history.pushState(null, null, '#events');
    $('event-popup').off('onModalClose');
  };

  $('#event-popup').on('hidden.bs.modal', onModalClose);
  $('#event-popup').modal();
}

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
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
  return `${d.getYear() + 1900}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function getEventId(ev) {
  // TODO: this event hashing is not unique by date 
  return "" + toShortDateString(ev.date);
}

function isTentative(ev) {
  // broadly speaking, a question mark indicates uncertainty
  return ev.title.indexOf('?') >= 0 ||
    ev.lead.indexOf('?') >= 0;
}

async function copyToClipboard(text) {
  try {
    const toCopy = text || location.href;
    await navigator.clipboard.writeText(toCopy);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}


async function assembleEvents(upcomingElem, pastElem) {
  const events = await getEvents();
  const [pastEvents, futureEvents] = splitEvents(events);

  upcomingElem.innerHTML = `
  <ul class="list-group upcoming-event-list">
  ${
    // display only first 5
    futureEvents.slice(0, 3).map(ev => `
    <li class="list-group-item ${ev.type ? 'event-' + ev.type : ''} ${isTentative(ev) ? 'tentative' : ''}">
    <p>
      ${WEEKDAYS[ev.date.getDay()]}, 
      ${ev.date.getDate()}-${MONTH_NAMES[ev.date.getMonth()]}-${ev.date.getYear() + 1900}
    </p>
    <h5 class="title">

      ${ev.title.toLowerCase()}
      ${ev.paper ? `<a target="_blank" href="${ev.paper}">&nbsp;<i class="fa fa-file-text-o"></i></a>` : ''}
  
    </h5>
    ${ev.lead.indexOf('?') < 0 ? `Lead: <strong>${ev.lead}</strong>` : ''}
    ${ev.facilitators.length == 0 ? '' : ' | Facilitators: ' + ev.facilitators.map(f => `<strong>${f}</strong>`).join(', ')}
    </li>
    `).join('')
    }
  </ul>
  `;

  pastElem.innerHTML = `
  <table class="table table-striped table-condensed past-event-list" id="past-event-list">
  <thead><tr>${
    ['Date', 'Detail'].map(lbl => `
  <th>${lbl}</th>
  `).join('')
    }</tr></thead>
  <tbody>
  ${pastEvents.map(ev => `
  <tr class="event-${ev.type}">
    <td class="align-middle">${toShortDateString(ev.date)}</td>
    <td class="align-middle ${ev.type ? 'event-' + ev.type : ''} ${isTentative(ev) ? 'tentative' : ''}">
    <p class="title"> 
      ${ev.title.toLowerCase()}
    </p>
    <p><b>Lead:</b> ${ev.lead}, ${ev.facilitators.length != 0 ? `<b>Facilitators:</b> ${ev.facilitators.join(', ')}, ` : ''}<b>Venue:</b> ${ev.venue}</p>
    &nbsp;<a class="title" href="#events/${getEventId(ev)}"><i class="fa fa-share-alt fa-lg"></i></a>
    &nbsp;${ev.paper ? `<a target="_blank" href="${ev.paper}"><i class="fa fa-file-text-o fa-lg"></i></a>` : ''}
    &nbsp;${ev.slides ? `<a target="_blank" href="${ev.slides}"><i class="fa fa-file-powerpoint-o fa-lg"></i></a>` : ''}
    &nbsp;${ev.video ? `<a target="_blank" href="${ev.video}"><i class="fa fa-play-circle fa-lg"></i></a>` : ''}
    &nbsp;${ev.reddit ? `<a target="_blank" href="${ev.reddit}"><i class="fa fa-reddit fa-lg"></i></a>` : ''}
    &nbsp;${ev.code_official ? `<a target="_blank" href="${ev.code_official}"><i class="fa fa-github fa-lg"></i></a>` : ''}
    &nbsp;${ev.code_unofficial ? `<a target="_blank" href="${ev.code_unofficial}"><i class="fa fa-github fa-lg"></i></a>` : ''}
    &nbsp;${ev.dataset1 ? `<a target="_blank" href="${ev.dataset1}"><i class="fa fa-database fa-lg"></i></a>` : ''}
    &nbsp;${ev.dataset2 ? `<a target="_blank" href="${ev.dataset2}"><i class="fa fa-database fa-lg"></i></a>` : ''}
    </td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`;

  // load up DataTable for cool gadgets such as pagination, sorting and search
  $(pastElem.querySelector('#past-event-list')).DataTable({
    order: [[0, "desc"]],
    columnDefs: [
      { "width": "75", "targets": 0 }
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

function g(onResult) {
  return new Promise((resolve) => {

  });
}

let eventFetchStatus = 'unfetched';
let eventFetchP = null;
let allEvents;

// cache-enabled, guarantees only one fetch
function getEvents() {
  if (eventFetchStatus === 'fetching') {
    return eventFetchP;
  } else if (eventFetchStatus === 'unfetched') {
    eventFetchStatus = 'fetching';
    eventFetchP = new Promise(async (resolve) => {
      const data = await getRawData();
      const [rawHeader, ...rawRows] = data.values;

      // convert raw JSON rows to our own event data type
      allEvents = rawRows.map(
        rawR => rawRowToRow(rawHeader, rawR)).filter(
          //only care about rows that have both title and lead
          e => e.title && e.lead
        );
      eventFetchStatus = 'fetched';
      resolve(allEvents);
      eventFetchP = null;
    });
    return eventFetchP;
  } else // fetched
  {
    return new Promise((resolve) => {
      resolve(allEvents);
    })
  }
}

const READABLE_EVENT_TYPE = {
  'classics': 'Classics Stream',
  'fasttrack': 'Fasttrack Stream',
  'regular': 'Main Stream'
}

function getEventType(title) {
  if (!title) {
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
  const dataset1 = rawRow[rawHeader.indexOf('Dataset Link 1')];
  const dataset2 = rawRow[rawHeader.indexOf('Dataset Link 2')];
  const code_official = rawRow[rawHeader.indexOf('Official Github Link')];
  const code_unofficial = rawRow[rawHeader.indexOf('Unofficial Github Link')];
  const reddit = rawRow[rawHeader.indexOf('Reddit Link')];
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
    slides,
    dataset1,
    dataset2,
    code_unofficial,
    code_official,
    reddit
  }
}


// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543