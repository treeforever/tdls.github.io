import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import ThemesAndSuch from '../components/themes-and-such';

export default () => (
  [
    <Head>
      <title>Toronto Deep Learning Series #TDLS</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="canonical" href="./index.html" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131780670-1"></script>
      <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
      <ThemesAndSuch />
      <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css" />

      <link rel="icon" type="image/png" href="/static/images/tdls_logo.png" />
    </Head>,
    <Header />,
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
                <h5>#tdls: intellectually curious individuals</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/static/images/slide_01.jpeg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h5>#tdls: welcoming & supportive community</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/static/images/slide_03.jpeg" alt="Third slide" />
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h5>#tdls: engaging technical discussions</h5>
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
        &nbsp;(<a className="event-link" href="#upcoming-events">Upcoming</a>,
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
          Something went wrong. Please use a modern browser or contact administrator.
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


      <section className="container" id="get-engaged">
        <hr />
        <h2>Get Engaged</h2>
        <p>
          Want to get involved? Here are some ways you can join in the fun - or email/tweet at us if you have other
          thoughts or ideas!
    </p>

        <h4>Contribute to TDLS</h4>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Lead or facilitate discussions</h5>
                <p className="card-text">We'd love to have you! Please send us an email or tweet at us with any potential
              topics that you want to cover.</p>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20am%20interested%20to%20speak%20about:%20"
                  target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:I%20am%20interested%20to%20speak%20at%20TDLS" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Improve this site</h5>
                <p className="card-text">Amazing! We're open source, so feel free to clone our GitHub repo, make changes,
                  and
              submit a pull request - or you can email or tweet at us with your suggestions.</p>
                <a href="https://github.com/TDLS/tdls.github.io/blob/master/README.md" target="_blank">
                  <i className="fa fa-github fa-2x"></i>
                </a>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20Change%20suggestion%20for%20TDLS%20website:%20"
                  target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:Change%20suggestion%20for%20TDLS%20website"
                  target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Papers</h5>
                <p className="card-text"> We're all ears. Please send us an email or tweet at us with your favorite paper
                  and
              we'll put it on our list.</p>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20think%20you%20should%20cover%20X" target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:I%20think%20you%20should%20cover%20X" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Own a new stream</h5>
                <p className="card-text">Awesome! Please check out the details link below to learn more about what it
                  takes
              to own a stream, and write to us with your ideas.</p>
                <p>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal_own_stream">
                    Details
              </button>
                </p>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20want%20to%20own%20a%20stream" target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:%20I%20want%20to%20own%20a%20stream" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <h4>Stay up to date</h4>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Subscribe to Learn More about TDLS</h5>

                <div id="mc_embed_signup">
                  <form action="https://science.us20.list-manage.com/subscribe/post?u=c7831af29c0c46bd5ec4c04c7&amp;id=9e6c32b697"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span>
                        </label>
                        <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-FNAME">First Name </label>
                        <input type="text" name="FNAME" className="" id="mce-FNAME" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-LNAME">Last Name </label>
                        <input type="text" name="LNAME" className="" id="mce-LNAME" />
                      </div>
                      <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                        <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                      </div>
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true"><input type="text"
                          name="b_c7831af29c0c46bd5ec4c04c7_9e6c32b697"
                          tabIndex="-1" /></div>
                      <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                        className="button" /></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">YouTube</h5>
                <p className="card-text">To get updates about our videos subscribe to our YouTube channel for a front row
              seat.</p>
                <div className="g-ytsubscribe" data-channelid="UCfk3pS8cCPxOgoleriIufyg" data-layout="default" data-theme="default"
                  data-count="default"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Reddit</h5>
                <p className="card-text">We post our summaries, thoughts, and conclusions on Reddit. Please follow us on
              Reddit, and be sure to share your thoughts with us!</p>
                <a href="https://www.reddit.com/user/tdls_to" target="_blank">
                  <i className="fa fa-reddit fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h4>For organizations</h4>

        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Companies</h5>
                <p className="card-text">If you want to host us, please send us an email or tweet at us</p>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20We%20want%20to%20host%20TDLS" target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:%20We%20want%20to%20host%20TDLS" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Student Groups at Universities</h5>
                <p className="card-text">If you want to co-host an event with us, please send us an email or tweet at us</p>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20We%20want%20to%20co-host%20an%20event%20with%20TDLS"
                  target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:%20We%20want%20to%20co-host%20an%20event%20with%20TDLS"
                  target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Meetup Organizer</h5>
                <p className="card-text">We know lots of great folks who can speak about technical topics; check them out on
              our YouTube channel.</p>
                <a href="https://www.youtube.com/c/TorontoDeepLearningSeries" target="_blank">
                  <i className="fa fa-youtube fa-2x"></i>
                </a>
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20" target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:collaboration%20with%20meetups" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div >
        </div >
        <div className="modal" tabIndex="-1" role="dialog" id="modal_own_stream">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">What does it take to own a new stream?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  <li>You define the stream, including: why it should exist; what it includes; who the target
                    audience
                    is; suggestions for the discussion panel; whether the session format needs to be different from
                  typical; event cadence/frequency; etc.</li>
                  <li>You coordinate with the steering committee members to make sure that there is a venue sorted
                    out
                  (although you're not responsible to secure the venue)</li>
                  <li>You coordinate with the steering committee members to ensure that the recording is sorted out
                  (although you're not responsible for doing the recording)</li>
                  <li>You coordinate the discussion panel (leads and facilitators) for your sessions (including the
                  paper they will present)</li>
                  <li>You're responsible for communications with the panel members (initial arrangement, 2 weeks
                    before, and post event; follow up for the panel to send their slides in time for review (if
                  necessary), and then for the final version)</li>
                  <li>You moderate the sessions in your stream</li>
                </ul>
              </div>
              <div className="modal-footer">
                <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20want%20to%20own%20a%20stream" target="_blank">
                  <i className="fa fa-twitter fa-2x"></i>
                </a>
                <a href="mailto:tdls@torontomachinelearning.com?subject:%20I%20want%20to%20own%20a%20stream" target="_blank">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="container" id="useful_links" >
        <hr />
        <h2>Useful Links</h2>
        <article id="useful-links"></article>
      </section>
    </main >,
    <Footer />,
    <div className="modal" id="event-popup" tabIndex="-1" role="dialog" aria-labelledby="eventPopup" aria-hidden="true">
    </div>,

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>,
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>,
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" crossOrigin="anonymous"></script>,
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js" crossOrigin="anonymous"></script>,
    <script async src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>,
    <script src="/static/main.js"></script>,
    <script src="https://apis.google.com/js/platform.js"></script>

  ]
);
