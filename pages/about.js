import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';

const About = ({ contributors }) => [
  <Head>
    <ThemesAndSuch />
  </Head>,
  <Header />,
  <section className="container" id="about_us">
    <hr />
    <h2>About TDLS</h2>
    <p>
      <i> TDLS is a community of intellectually curious individuals centered around technical review and discussion
        of advances in machine learning. </i>
    </p>
    <p>
      We are a welcoming, supportive community of machine learning practitioner and researchers. Our technical
      backgrounds are diverse; we come from industry and academia, with an array of experience, from avid learners to
      experts in their fields.
    </p>
    <p>
      Our group is centred around consistent meetings focused on meticulous but friendly discussions of advances in
      machine learning (typically scientific publications). In our discussions, we strive to cover both intuitive
      conceptual understanding and foundational mathematical details.
    </p>

    <h3 id="community">Our community in numbers! </h3>
    <div className="row community-charts">
      <div className="col-xl-4 col-lg-6 chart">
        <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=1837496004&amp;format=interactive"></iframe>
      </div>
      <div className="col-xl-4 col-lg-6 chart">
        <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=1981502753&amp;format=interactive"></iframe>
      </div>
      <div className="col-xl-4 col-lg-6 chart">
        <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=2092973435&amp;format=interactive"></iframe>
      </div>
    </div>

    <h3 id="steering-committee">Steering Committee</h3>
    <div className="row profile-list">
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/amir.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/amirfzpr/">
              <b>Amir Feizpour
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Founder and Head of Operations
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/ehsan.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/ehsanamjadian/">
              <b>Ehsan Amjadian
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Head of Research
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/felipe.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/felipe-perez-/">
              <b>Felipe Pérez
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              "Classics" Stream Lead
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/gordon.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/gordon-gibson-874b3130/">
              <b>Gordon Gibson
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              “Fast Track” Stream Lead
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/lindsay.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/lindsaydbrin/">
              <b>Lindsay Brin
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Chief Phrasing Officer and Inclusivity Lead
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/serena.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/serenamcdonnell/">
              <b>Serena McDonnell
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              "Main" Stream Lead
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/xiyang.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/">
              <b>Xiyang Chen
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Head of Technology and "Code Review" Stream Lead
            </p>
          </div>
        </div>
      </div>
    </div>

    <h3 id="volunteers">TDLS Friends</h3>
    <div className="row profile-list">
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/paul.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/paulfinlay314/">
              <b>Paul Finlay
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Sound Engineer
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/mark.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/markdonaldson888/">
              <b>Mark Donaldson
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Social Media Lead
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="media-top">
          <img className="profile rounded-circle" src="static/images/helen.jpeg" className="mr-3" width="120px" />
          <div className="media-body">
            <a href="https://www.linkedin.com/in/helen-ngo/">
              <b>Helen Ngo
                <i className="fa fa-linkedin-square"></i>
              </b>
            </a>
            <p>
              Former Steering Committee Member
            </p>
          </div>
        </div>
      </div>
    </div>

    <h3>Website Contributors</h3>
    <p>We're open source, so feel free to clone our GitHub repo, make changes, and submit a pull request, and your
      GitHub handle would show up here</p>
    {
      contributors ? <article id="site-contributors">
        <div className="row">
          {contributors.map(c =>
            <div key={c.id} className="media-top">
              <div className="col-lg-3 col-sm-6">
                <a href={c.html_url} target="_blank" data-toggle="tooltip" title={`${c.login} contributed ${c.contributions} commit(s)`}>
                  <img className="rounded-circle" src={c.avatar_url} className="mr-3" width="50px" />
                </a>
              </div>
            </div>
          )}
        </div>
      </article> : null
    }

  </section>,
  <Footer />
];


About.getInitialProps = async function () {
  const contributors = await getContributors();
  if (contributors && contributors.length) {
    return { contributors }
  } else {
    return {}
  }
}

async function getContributors() {
  const url = `https://api.github.com/repos/TDLS/tdls.github.io/contributors`;
  const resp = await fetch(url, {
    method: 'GET',
    cache: 'default'
  });
  const raw = await resp.json();
  return raw;
}

export default About;