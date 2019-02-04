
import React, { useState, useEffect, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ModalVideoContext, YouTubeModalWrapper } from '../components/youtube-modal';
import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';
import { ytThumb, getYouTubeId } from '../utils/youtube';
import {
  READABLE_EVENT_TYPE, getEventId, isTentative,
  nameToLink, getEventsAndGroupings, getLinkedInProfiles
} from '../utils/event';

export const EventModalContext = React.createContext();


export const EventModalWrapper = ({ children }) => {
  const [{ isOpen, modalEventId }, setModalState] = useState({ isOpen: false });

  const [{ event: ev }, setEventsData] = useState({ events: [] });
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetEvent = async (eventId) => {
    const { pastEvents, futureEvents } = await getEventsAndGroupings();
    const event = futureEvents.find(ev => getEventId(ev) === eventId) || pastEvents.find(ev => getEventId(ev) === eventId);
    setEventsData({ event });
  }

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles();
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    if (modalEventId) {
      fetchAndSetEvent(modalEventId);
      fetchAndSetProfile();
    }
  }, [modalEventId]);

  const openEventModal = async (eventId) => {
    setModalState({ isOpen: true, modalEventId: eventId });
  }

  const closeEventModal = () => {
    setModalState({ isOpen: false, modalEventId: null });
    history.pushState(null, null, '#/events');
  }

  function iconLinkFn(iconClass) {
    return (url) => (
      <a target="_blank" href={url}><i className={`fa fa-lg ${iconClass}`}></i></a>
    );
  }

  const expired = eventExpired(ev);

  return (
    <EventModalContext.Provider
      value={(eventId) => openEventModal(eventId)}
    >
      <YouTubeModalWrapper>

        {children}
        {ev &&
          <Modal centered={true}
            show={isOpen} size="lg" onHide={closeEventModal}>
            <Modal.Header closeButton>
              <Modal.Title className="title">{ev.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={isTentative(ev) ? 'tentative' : ''}>
              <dl className="row">
                <dt className="col-sm-4">Date:</dt>
                <dd className="col-sm-8">
                  {WEEKDAYS[ev.date.getDay()]},&nbsp;
              {ev.date.getDate()}-{MONTH_NAMES[ev.date.getMonth()]}-{ev.date.getYear() + 1900}
                  {expired && ' (This is a past event.)'}
                </dd>
                {!expired ? (
                  <Fragment>
                    <dt className="col-sm-4">Venue:</dt>
                    <dd className="col-sm-8">
                      (TDLS members: please refer to Slack or your calendar invite for location)
                  </dd>
                  </Fragment>
                ) : (
                    <Fragment>
                      <dt className="col-sm-4">Venue:</dt>
                      <dd className="col-sm-8">
                        {venueToLink(ev.venue)}
                      </dd>
                    </Fragment>
                  )
                }
                {ev.lead.indexOf('?') < 0 && (
                  <Fragment>
                    <dt className="col-sm-4">Discussion lead:</dt>
                    <dd className="col-sm-8"><strong>{nameToLink(ev.lead, linkedInDict[ev.lead])}</strong></dd>
                  </Fragment>
                )}
                {ev.facilitators.length !== 0 && (
                  <Fragment>
                    <dt className="col-sm-4">Discussion facilitators: </dt>
                    <dd className="col-sm-8">{ev.facilitators.map((f, i) => (
                      <Fragment key={i}>
                        <strong key={i}>{nameToLink(f, linkedInDict[f])}</strong>&nbsp;
                  </Fragment>
                    ))}</dd>
                  </Fragment>
                )}
                {[
                  [ev.video, 'Recording', ytThumbLink],
                  [ev.paper, 'Paper', iconLinkFn('fa-file-text-o')],
                  [ev.slides, 'Slides', link => iconLinkFn('fa-file-powerpoint-o')(`/static/${link}`)],
                  [ev.reddit, 'Reddit post', iconLinkFn('fa-reddit')],
                  [ev.code_official, 'Official code', iconLinkFn('fa-github')],
                  [ev.code_unofficial, 'Unofficial code', iconLinkFn('fa-github')],
                  [ev.dataset1, 'Unofficial code 1', iconLinkFn('fa-database')],
                  [ev.dataset2, 'Unofficial code 2', iconLinkFn('fa-database')],

                ].map(([content, label, linkFn]) => content &&
                  (
                    <Fragment key={label}>
                      < dt className="col-sm-4">{label}</dt>
                      <dd className="col-sm-8">{linkFn(content)} <i className="fa fa-external-link"></i></dd>
                    </Fragment>
                  ))}
                {!expired && (
                  <Fragment>
                    <dt className="col-sm-4">Agenda:</dt>
                    <dd className="col-sm-8">
                      <ul className="list-unstyled">
                        <li>5:30-6:15,   arrivals and socializing</li>
                        <li>6:15-6:30    intros and announcements</li>
                        <li>6:30-7:15,   algorithm review</li>
                        <li>7:15-8:00,   results and discussions</li>
                      </ul>
                    </dd>
                  </Fragment>
                )}
                <dt className="col-sm-4">Category:</dt> <dd className="col-sm-8">{READABLE_EVENT_TYPE[ev.type]}</dd>
              </dl>
            </Modal.Body>
            <Modal.Footer>
              <Button id="copy-link" variant="info" onClick={copyLink}>Copy link</Button>
              <a href="/get-engaged" className="btn btn-primary">Get Engaged</a>
              <Button variant="secondary" onClick={closeEventModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        }
      </YouTubeModalWrapper>
    </EventModalContext.Provider>
  );
};

function ytThumbLink(url) {
  return (
    <ModalVideoContext.Consumer>
      {(openYoutube) => (
        <a type="button" onClick={() => openYoutube(getYouTubeId(url))}>
          <div className="youtube-thumb-outer">
            <img src={ytThumb(url)} />
            <div className="overlay">
            </div>
          </div>
        </a>
      )}
    </ModalVideoContext.Consumer>
  )

}

async function copyLink() {
  await copyToClipboard(window.location.href);
}

async function copyToClipboard(text) {
  try {
    const toCopy = text || location.href;
    await navigator.clipboard.writeText(toCopy);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}


function eventExpired(ev) {
  return ev && ev.date < new Date();
}

