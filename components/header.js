import Link from 'next/link';

export default () => (
  <header id="main-navbar">
    <nav
      className="navbar navbar-expand-md fixed-top navbar-light"
      style={{ backgroundColor: 'white' }}
    >
      <a href="/" className="navbar-brand">
        <img src="/static/images/tdls_logo.svg" style={{ height: '30px' }} />{' '}
        TDLS
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Events
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/#streams">
                Streams
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/#upcoming-events">
                Upcoming Sessions
              </a>
              <a className="dropdown-item" href="/#past-events">
                Past Sessions
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#areas">
              Subject Areas
            </a>
          </li>
          <li className="nav-item">
            <Link href="/get-engaged">
              <a className="nav-link">Get Engaged</a>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link href="/about">
              <a className="nav-link">About Us</a>
            </Link>
          </li>
        </ul>
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <div
              className="g-ytsubscribe"
              data-channelid="UCfk3pS8cCPxOgoleriIufyg"
              data-layout="default"
              data-theme="default"
              data-count="default"
            />
          </li>
          <li className="list-inline-item">
            <a
              href="https://www.youtube.com/c/TorontoDeepLearningSeries"
              target="_blank"
            >
              <i className="fa fa-youtube fa-2x" />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.reddit.com/user/tdls_to" target="_blank">
              <i className="fa fa-reddit fa-2x" />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://twitter.com/tdls_to" target="_blank">
              <i className="fa fa-twitter fa-2x" />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://github.com/TDLS" target="_blank">
              <i className="fa fa-github fa-2x" />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.instagram.com/tdls_to/" target="_blank">
              <i className="fa fa-instagram fa-2x" />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="mailto:tdls@torontomachinelearning.com" target="_blank">
              <i className="fa fa-envelope fa-2x" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
