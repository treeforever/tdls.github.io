
import fetch from 'isomorphic-unfetch'

async function fetchRawEventData() {
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
  // broadly speaking, a question mark indicates uncertainty
  if (fac1 && fac1.indexOf('?') < 0) { facilitators.push(fac1) }
  if (fac2 && fac2.indexOf('?') < 0) { facilitators.push(fac2) }

  const dataset1 = rawRow[rawHeader.indexOf('Dataset Link 1')];
  const dataset2 = rawRow[rawHeader.indexOf('Dataset Link 2')];
  const code_official = rawRow[rawHeader.indexOf('Official Github Link')];
  const code_unofficial = rawRow[rawHeader.indexOf('Unofficial Github Link')];
  const reddit = rawRow[rawHeader.indexOf('Reddit Link')];
  const type = rawRow[rawHeader.indexOf('Stream')];
  const subjects = (rawRow[rawHeader.indexOf('Subject Matter Area')] || '').split(',').map(s => s.trim()).filter(s => s);

  const dateAtMidnight = new Date((rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, ''));
  const dateAtSeven = new Date(dateAtMidnight.getTime() + 19 * 60 * 60 * 1000);
  return {
    title,
    date: dateAtSeven,
    lead,
    venue,
    facilitators,
    subjectMatterArea: rawRow[rawHeader.indexOf('Subject Matter Area')],
    video,
    type,
    paper,
    slides,
    subjects,
    dataset1,
    dataset2,
    code_unofficial,
    code_official,
    reddit
  }
}
