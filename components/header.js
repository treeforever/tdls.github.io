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
      </div>
    </nav>
  </header>
);
