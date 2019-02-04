import React, { Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";

import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';

import {
  READABLE_EVENT_TYPE, getEventId, isTentative,
  nameToLink, getEventsAndGroupings, getLinkedInProfiles,
  toShortDateString
} from '../utils/event';
import { ytThumb } from '../utils/youtube';
import { ModalVideoContext } from '../components/youtube-modal';

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
            <UpcomingEventItem key={getEventId(event)}
              {...{ event, leadLink, facLinks }}
            />
          );
        })
      }
    </ul>
  );
}

const UpcomingEventItem = ({ event: ev, leadLink, facLinks }) => {
  const date = (
    <p>
      {WEEKDAYS[ev.date.getDay()]},&nbsp;
{ev.date.getDate()}-{MONTH_NAMES[ev.date.getMonth()]}-{ev.date.getYear() + 1900}
    </p>
  );
  return (
    <li className={'list-group-item' + (ev.type ? ' event-' + ev.type : '') + (isTentative(ev) ? ' tentative' : '')}>
      {date}
      <h5 className="title">
        <a className="title" href={`/#/events/${getEventId(ev)}`}>
          {ev.type !== 'main' && `[${READABLE_EVENT_TYPE[ev.type].toLowerCase()}] `}
          {ev.title.toLowerCase()}
        </a>
        &nbsp;{ev.paper && <a target="_blank" href={ev.paper}>
          &nbsp;<i className="fa fa-file-text-o"></i></a>}
        &nbsp;{ev.code_official && <a target="_blank" href={ev.code_official}>
          &nbsp;<i className="fa fa-github"></i></a>}
        &nbsp;{ev.code_unofficial && <a target="_blank" href={ev.code_unofficial}>
          &nbsp;<i className="fa fa-github"></i></a>}
      </h5>
      {ev.lead.indexOf('?') < 0 && (
        <Fragment>
          Discussion Lead: <strong>{nameToLink(ev.lead, leadLink)}</strong>
        </Fragment>
      )}
      {ev.facilitators.length !== 0 && (
        <Fragment>
          &nbsp;| Facilitators: {
            ev.facilitators.map((f, i) => (
              <Fragment key={i}>
                <strong key={i}>{nameToLink(f, facLinks[i])}</strong>&nbsp;
              </Fragment>
            ))
          }
        </Fragment>
      )}
    </li>
  );
}

export const PastEvents = ({ }) => {
  const [{ events }, setEventsData] = useState({ events: [] });
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetPastEvent = async () => {
    const { pastEvents } = await getEventsAndGroupings();
    setEventsData({ events: pastEvents });
  }

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles();
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    fetchAndSetPastEvent();
    fetchAndSetProfile();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    variableHeight: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />
  };

  return (
    <Slider className="past-event-list" {...settings}>
      {events.map((event, idx) => {
        const leadLink = linkedInDict[event.lead];
        const facLinks = event.facilitators.map(n => linkedInDict[n]);
        return (
          <EventCard key={idx} {...{ event, leadLink, facLinks }} />
        );
      })}
    </Slider>
  );
}

const EventCard = ({ event: ev, leadLink, facLinks }) => {
  const cardTitle = (
    <a className="title card-title" href={`/#/events/${getEventId(ev)}`}>
      {ev.type !== 'main' ? `[${READABLE_EVENT_TYPE[ev.type]}]`.toLowerCase() + ' ' : null}
      {ev.title.toLowerCase()}
    </a>
  )
  const cardDesc = (
    <p className="card-text">
      Discussion lead by {nameToLink(ev.lead, leadLink)}
      {ev.facilitators.length != 0 ? (
        <Fragment>
          and facilitated by {
            ev.facilitators.map(
              (f, i) => nameToLink(f, facLinks[i])
            )
          }
        </Fragment>
      ) : null}
      <br />Venue: <strong>{venueToLink(ev.venue)}</strong></p>
  );

  const [{ isOpen }, setData] = useState({ isOpen: false });

  const toolbar = (
    <div className="toolbar">
      &nbsp;<a href="#/events/${getEventId(ev)}"><i className="fa fa-share-alt fa-lg"></i></a>
      {ev.paper ? <a target="_blank" href="${ev.paper}"><i className="fa fa-file-text-o fa-lg"></i></a> : null}
      {ev.video ? <a target="_blank" href="${ev.paper}"><i className="fa fa-play-circle fa-lg"></i></a> : null}
      {ev.slides ? <a target="_blank" href="/static/${ev.slides}"><i className="fa fa-file-powerpoint-o fa-lg"></i></a> : null}
      {ev.reddit ? <a target="_blank" href="${ev.reddit}"><i className="fa fa-reddit fa-lg"></i></a> : null}
      {ev.code_official ? <a target="_blank" href="${ev.code_official}"><i className="fa fa-github fa-lg"></i></a> : null}
      {ev.code_unofficial ? <a target="_blank" href="${ev.code_unofficial}"><i className="fa fa-github fa-lg"></i></a> : null}
      {ev.dataset1 ? <a target="_blank" href="${ev.dataset1}"><i className="fa fa-database fa-lg"></i></a> : null}
      {ev.dataset2 ? <a target="_blank" href="${ev.dataset2}"><i className="fa fa-database fa-lg"></i></a> : null}
    </div>
  );

  const thumb = (
    <img className="card-img-top" src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.png'} alt="Card image cap" />
  );

  return (
    <div className={"event card " + (ev.type ? ' event-' + ev.type : '')}>
      {
        ev.video ? <ModalVideoContext.Consumer>
          {(openYoutube) => (
            <a type="button" onClick={() => openYoutube(getYouTubeId(ev.video))}>
              <div className="youtube-thumb-outer">
                {thumb}
                <div className="overlay">
                </div>
              </div>
            </a>
          )}
        </ModalVideoContext.Consumer> : thumb
      }

      <div className="card-body">
        {cardTitle}
        {cardDesc}
        {toolbar}
        <p className="card-text date">
          <small className="text-muted">
            {toShortDateString(ev.date)}
          </small>
        </p>
      </div>
    </div>
  );
}

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}
