import { Fragment } from 'react';
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import ThemesAndSuch from '../components/themes-and-such';
import { UpcomingEvents } from '../components/event-related';

export default () => {
  return (
    <Fragment>
      <Head>
        <title>Toronto Deep Learning Series #TDLS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="./index.html" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131780670-1"></script>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <ThemesAndSuch />
        <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css" />

        <link rel="icon" type="image/png" href="/static/images/tdls_logo.png" />
      </Head>
      <Header />
      <main role="main">
        <section id="welcome">
          <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="/static/images/slide_02.jpeg" alt="Second slide" />
                <div className="carousel-caption d-none d-md-block bg-dark">
                  <h3>#tdls: intellectually curious individuals</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="/static/images/slide_01.jpeg" alt="First slide" />
                <div className="carousel-caption d-none d-md-block bg-dark">
                  <h3>#tdls: welcoming & supportive community</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="/static/images/slide_03.jpeg" alt="Third slide" />
                <div className="carousel-caption d-none d-md-block bg-dark">
                  <h3>#tdls: engaging technical discussions</h3>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <a className="scroll-button" href="#intro"><span></span></a>

        </section>


        <section className="container tdls-intro" id="intro">
          <h1 className="title">Toronto Deep Learning Series (#TDLS)</h1>
          <div className="abstract">
            <p className="lead">
              TDLS is a community of intellectually curious individuals, centered around technical
              review and discussion
              of advances in machine learning.
      </p>
            <p>
              <a className="btn" href="#events">Our events...</a>
            </p>
          </div>
        </section>

        <section id="events" className="container">
          <hr />
          <h2 className="inline">Events</h2>
          &nbsp;(<a className="event-link" href="#upcoming-events">Upcoming</a>,&nbsp;
    <a className="event-link" href="#past-events">Past</a>)
    <p>We meet twice a week to review advances in machine learning in various "streams".
      <br />
            Click on each stream name to
      know more about them and then explore our upcoming and past events.</p>
          <ul className="list-inline legend-list" id="streams">
            <li className="list-inline-item">
              <a href="" className="legend-event-main" data-toggle="modal" data-target="#modal_main_stream">
                <span className="legend main">&nbsp;</span>
                &nbsp;Main stream<i className="fa fa-question"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="" data-toggle="modal" className="legend-event-classics" data-target="#modal_classics_stream">
                <span className="legend classics"></span>
                &nbsp;Classics Stream<i className="fa fa-question"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="" data-toggle="modal" className="legend-event-fasttrack" data-target="#modal_fast_stream">
                <span className="legend fasttrack"></span>
                &nbsp;Fast Track Stream<i className="fa fa-question"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="" data-toggle="modal" className="legend-event-codereview" data-target="#modal_codereview_stream">
                <span className="legend codereview"></span>
                &nbsp;Code Review Stream<i className="fa fa-question"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="" data-toggle="modal" className="legend-event-authors" data-target="#modal_authors_stream">
                <span className="legend authors"></span>
                &nbsp;Authors Stream<i className="fa fa-question"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <span className="legend tentative"></span>&nbsp;
            <span className="legend-event-tentative">Tentative Sessions</span>
            </li>
          </ul>
          <div className="modal" tabIndex="-1" role="dialog" id="modal_main_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Main Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    This stream is for recent papers. For these papers, our discussions are typically within a few months
                    or up to a couple of years of publication.
            </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabIndex="-1" role="dialog" id="modal_classics_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Classics Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    This stream is for concept defining papers. These papers are typically older than those in the Main
                    Stream.
            </p>
                  <p>For inspiration, check out our <a href="https://docs.google.com/spreadsheets/d/1PTaFyE2AsgTd0p7A5aHvEw0lLzw-9OXJC8Wa1Bg10ug"
                    target="_blank">classic paper list <i className="fa fa-external-link"></i></a>.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabIndex="-1" role="dialog" id="modal_fast_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Fast Track Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body yt-player">
                  <p>
                    This stream is for recent papers within a few weeks of publication.
            </p>
                  <p>
                    In our main stream, we build in time for revisions to settle and speakers to prepare. But when new
                    papers seem particularly important to the machine learning community, we want to discuss them sooner!
                    Hence, the Fast Track stream.
            </p>
                  <iframe style={{ width: '100%', minHeight: '300px' }} src="https://www.youtube.com/embed/1jkmNnHs18M"
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabIndex="-1" role="dialog" id="modal_codereview_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Main Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    This stream is for reviewing implementations of papers.
            </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabIndex="-1" role="dialog" id="modal_authors_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Classics Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    This stream is for papers presented by their original authors.
            </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <h3>Upcoming Sessions</h3>
          <article id="upcoming-events">
            <UpcomingEvents />
          </article>
          <h3 id="past-events-title">Past Sessions</h3>
          <article id="past-events">
            Something went wrong. Please use a modern browser or contact administrator.
          </article>
        </section>

        <section id="areas" className="container">

          <h2>Subject Matter Areas</h2>
          <div className="row">
            <div className="col-lg-6" id="sma-links">

            </div>
            <div className="col-lg-6">
              <iframe width="100%" height="600" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRY6QXhp9sU4Y_ede25AEAwkSnS-xcOCQhxJMUfiq4xtWB04chEpkyDgWvFHSD0zakgSqnxuNzTGwk6/pubchart?oid=1131229791&format=interactive"></iframe>
            </div>
          </div>
        </section>
        <section className="container" id="useful_links" >
          <hr />
          <h2>Useful Links</h2>
          <article id="useful-links"></article>
        </section>
      </main>
      <div className="modal" id="event-popup" tabIndex="-1" role="dialog" aria-labelledby="eventPopup" aria-hidden="true">
      </div>
      <Footer />
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>,
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>,
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js" crossOrigin="anonymous"></script>,
    <script async src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>,
    <script src="/static/main.js"></script>,
    <script src="https://apis.google.com/js/platform.js"></script>
    </Fragment>
  );
}
