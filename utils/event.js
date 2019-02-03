
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

// cache-enabled, guarantees only one fetch
function runOnlyOnce(fetcher) {
  let executeStatus = 'unfetched';
  let executeP = null;
  let cachedResult = null;

  return () => {
    if (executeStatus === 'fetching') {
      return executeP;
    } else if (executeStatus === 'unfetched') {
      executeStatus = 'fetching';
      executeP = new Promise(async (resolve) => {
        cachedResult = await fetcher();

        executeStatus = 'fetched';
        executeP = null;

        resolve(cachedResult);

      });
      return executeP;
    } else // fetched
    {
      return new Promise((resolve) => {
        resolve(cachedResult);
      });
    }
  }
}

export const getEventsAndGroupings = runOnlyOnce(async () => {
  const data = await getRawEventData();
  const [rawHeader, ...rawRows] = data.values;

  // convert raw JSON rows to our own event data type
  const events = rawRows.map(
    rawR => rawRowToRow(rawHeader, rawR)).filter(
      //only care about rows that have both title and lead
      e => e.title && e.lead
    );

  const [pastEvents, futureEvents] = splitEvents(events);

  const subjects = pastEvents.reduce((subjects, ev) => {
    const newSubjects = [];
    for (let sub of ev.subjects) {
      if (subjects.indexOf(sub) < 0) {
        newSubjects.push(sub);
      }
    }
    return subjects.concat(newSubjects);
  }, []);

  const streams = pastEvents.reduce((streams, ev) => {
    const newStreams = [];
    if (streams.indexOf(ev.type) < 0) {
      newStreams.push(ev.type);
    }
    return streams.concat(newStreams);
  }, []);

  return { pastEvents, futureEvents, subjects, streams };
})


export const getLinkedInProfiles = runOnlyOnce(async () => {
  const data = await getRawLinkedInData();
  const linkedInProfileByName = {};
  const [rawHeader, ...rawRows] = data.values;
  rawRows.forEach(r => {
    const name = r[rawHeader.indexOf('Name')];
    const link = r[rawHeader.indexOf('LinkedIn')];
    if (link) {
      linkedInProfileByName[name.trim()] = link.trim();
    }
  });
  return linkedInProfileByName;
});