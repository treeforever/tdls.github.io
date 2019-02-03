import { Fragment } from 'react';

import React, { useState, useEffect } from 'react';
import { getEventsAndGroupings, getLinkedInProfiles } from '../utils/event';

export const UpcomingEvents = ({ }) => {

  const [{ events }, setEventsData] = useState({ events: [] });
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetPastEvent = async () => {
    const { futureEvents } = await getEventsAndGroupings();
    setEventsData({ events: futureEvents });
  }

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles();
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    fetchAndSetPastEvent();
    fetchAndSetProfile();
  }, []);

  return (
    <ul className="list-group upcoming-event-list">
      {
        // display only first 3
        events.slice(0, 3).map(event => {
          const leadLink = linkedInDict[event.lead];
          const facLinks = event.facilitators.map(n => linkedInDict[n]);
          return (
            <UpcomingEventItem
              {...{ event, leadLink, facLinks }}
            />
          );
        })
      }
    </ul>
  );
}

const UpcomingEventItem = ({ event: ev, leadLink, facLinks }) => {
  return (
    <li className={'list-group-item' + (ev.type ? ' event-' + ev.type : '') + (isTentative(ev) ? ' tentative' : '')}>
      <p>
        {WEEKDAYS[ev.date.getDay()]},&nbsp;
  {ev.date.getDate()}-{MONTH_NAMES[ev.date.getMonth()]}-{ev.date.getYear() + 1900}
      </p>
      <h5 className="title">
        <a className="title" href={`/#/events/${getEventId(ev)}`}>
          {ev.type !== 'main' ? `[${READABLE_EVENT_TYPE[ev.type].toLowerCase()}]` : ''}
          &nbsp;{ev.title.toLowerCase()}
        </a>
        {ev.paper ? <a target="_blank" href={ev.paper}>&nbsp;
        <i className="fa fa-file-text-o"></i></a> : null}
      </h5>
      {ev.lead.indexOf('?') < 0 ? <Fragment>
        Discussion Lead: <strong>{nameToLink(ev.lead, leadLink)}</strong>
      </Fragment> : null}
      {ev.facilitators.length == 0 ? null : <Fragment>
        &nbsp;| Facilitators: {
          ev.facilitators.map((f, i) => <strong key={i}>{nameToLink(f, facLinks[i])}</strong>)
        }
      </Fragment>}
    </li>
  );
}

function getEventId(ev) {
  // TODO: this event hashing unique by date, but if we have two events
  // on the same date in the future we are screwed 
  return "" + toShortDateString(ev.date);
}

function nameToLink(name, link) {
  if (!link) {
    return name;
  } else {
    return (
      <a className="person-name" href={link} target="_blank">
        {name}&nbsp;
        <i className="fa fa-linkedin-square"></i>
      </a>
    );
  }
}