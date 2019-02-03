import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';

const GetEngaged = ({ }) => [
  <Head>
    <title>Get Engaged</title>
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
    <ThemesAndSuch />
  </Head>,
  <Header />,
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
  </section>,
  <Footer />
];

export default GetEngaged;