
document.addEventListener('DOMContentLoaded', () => {
  // main script entry point
  assembleEvents(
    document.getElementById('useful-links'),
    document.getElementById('sma-links')
  );

  fixOffset();
  fixNavbarCollapse();
});

function fixNavbarCollapse() {
  $('.navbar-collapse a:not(.dropdown-toggle)').on('click', function () {
    $('.navbar-toggler').click(); //bootstrap 4.x
  });
}


// // subject filter implementation
// $.fn.dataTable.ext.search.push((_, data) => {
//   const val = $('#subject-filter').val();
//   if (!val || val.length === 0) {
//     return true;
//   } else {
//     const subjects = data[1].split(',').map(s => spacedToDashed(s.trim()));
//     return matchAll(val, subjects);
//   }
// });

// // stream filter implementation
// $.fn.dataTable.ext.search.push((_, data) => {
//   const val = $('#stream-filter').val();
//   if (!val || val.toLowerCase() === 'all') {
//     return true;
//   } else {
//     const stream = data[2].trim();
//     return val === stream;
//   }
// });

function matchAll(queries, candidates) {
  return queries.every(q => !!candidates.find(c => c === q));
}


const SMA = [
  ['General Areas of Machine Learning', [
    ['Deep Learning', 'various architectures, explainability, relation to geometry, etc'],
    ['Reinforcement Learning'],
    ['Generative Adversarial Networks'],
    ['Quantum Machine Learning'],
    ['Representation Learning', 'auto-encoders, transfer learning, etc'],
    ['General Machine Learning Theory'],
  ]],
  ['Applications of Machine Learning', [
    ['Natural Language Processing'],
    ['Natural Language Generation'],
    ['NN on Graph'],
    ['ML in health care'],
    ['NN on Source Code'],
    ['Recommender Engines'],
    ['Computer Vision'],
    ['Speech Recognition']
  ]],
  ['Other Statistical Methods', [
    ['Bayesian Statistics'],
    ['Experimental Design'],
    ['Graphical Models'],
    ['Bayesian Networks'],
    ['Information Geometry']
  ]]
];

function spacedToDashed(s) {
  return s.toLowerCase().replace(/ /g, '-');
}

async function assembleEvents(usefulLinksElem, smaLinksElem) {

  // load up DataTable for cool gadgets such as pagination, sorting and search
  // const dataTableElem = pastElem.querySelector('#past-event-list');
  // const table = $(dataTableElem).DataTable({
  //   order: [[0, "desc"]],
  //   // https://datatables.net/reference/option/dom
  //   dom: `
  //     <'row'<'col-sm-12 col-md-12 filter-tools' <"#stream-filter-area"> <"#subject-filter-area"> f l>>
  //     <'row'<'col-sm-12'tr>>
  //     <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>`,
  //   columnDefs: [
  //     { orderSequence: ["desc"], targets: [0] },
  //     // subjects
  //     { visible: false, targets: [0, 1, 2] },
  //   ],
  //   pageLength: 5
  // });

  // const { subjects, streams } = await getEventsAndGroupings();
  // const subjectFilterElem = document.querySelector('#subject-filter-area');
  // subjectFilterElem.innerHTML = `
  //   <div class="horizontal-elem">
  //   By subject: 
  //   </div>
  //   <div class="horizontal-elem">
  //     <select id="subject-filter" class="selectpicker" multiple data-max-options="3">
  //       ${ subjects.map(s => `
  //         <option value="${spacedToDashed(s)}">${s}</option>
  //       `).join('')}
  //     </select>
  //   </div>
  // `;
  // const subjectFilterSelect = subjectFilterElem.querySelector('#subject-filter');
  // $(subjectFilterSelect).on('changed.bs.select', () => {
  //   if ($(subjectFilterSelect).val() && $(subjectFilterSelect).val().length > 0) {
  //     $(subjectFilterSelect).parent().addClass('active');
  //   } else {
  //     $(subjectFilterSelect).parent().removeClass('active');
  //   }
  //   table.draw();
  // });

  // const streamFilterElem = document.querySelector('#stream-filter-area');
  // streamFilterElem.innerHTML = `
  //   <div class="horizontal-elem">
  //   By stream: 
  //   </div>
  //   <div class="horizontal-elem">
  //     <select id="stream-filter" class="selectpicker">
  //         <option value="all">[All]</option>
  //       ${ streams.map(s => `
  //         <option>${s}</option>
  //       `).join('')}
  //     </select>
  //   </div>
  // `;

  // const streamFilterSelect = streamFilterElem.querySelector('#stream-filter');
  // $(streamFilterSelect).on('changed.bs.select', () => {
  //   if ($(streamFilterSelect).val() !== 'all') {
  //     $(streamFilterSelect).parent().addClass('active');
  //   } else {
  //     $(streamFilterSelect).parent().removeClass('active');
  //   }
  //   table.draw();
  // });

  // smaLinksElem.innerHTML = `
  //   <dl>
  //   ${SMA.map(([g, areas]) => `
  //   <dt>${g}</dt>
  //   <dd>
  //     <ul class="list-unstyled">
  //     ${areas.map(([title, desc]) => `
  //     <li>
  //       ${subjects.indexOf(title) < 0 ? title : `<a href="/#/subjects/${spacedToDashed(title)}">${title}</a>`}
  //        ${desc ? `(${desc})` : ''}
  //     </li>
  //     `).join('')}
  //     </ul>
  //   </dd>
  //   `).join('')}
  // </dl>
  // `;

}

function fixOffset() {
  const HISTORY_SUPPORT = !!(history && history.pushState);

  const anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 120,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function () {
      this.scrollToCurrent();
      window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
      document.body.addEventListener('click', this.delegateAnchors.bind(this));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function () {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function (href, pushToHistory) {
      let match, rect, anchorOffset;

      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if (match) {
        rect = match.getBoundingClientRect();
        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
        window.scrollTo(window.pageXOffset, anchorOffset);

        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function () {
      this.scrollIfAnchor(window.location.hash);
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function (e) {
      const elem = e.target;

      if (
        elem.nodeName === 'A' &&
        this.scrollIfAnchor(elem.getAttribute('href'), true)
      ) {
        e.preventDefault();
      }
    }
  };

  window.addEventListener(
    'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
  );
}


$("#modal_fast_stream").on('hidden.bs.modal', function (e) {
  $("#modal_fast_stream iframe").attr("src", $("#modal_fast_stream iframe").attr("src"));
});


// fullstory

window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_org'] = 'HXRJS';
window['_fs_namespace'] = 'FS';
(function (m, n, e, t, l, o, g, y) {
  if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
  g = m[e] = function (a, b, s) { g.q ? g.q.push([a, b, s]) : g._api(a, b, s); }; g.q = [];
  o = n.createElement(t); o.async = 1; o.src = 'https://' + _fs_host + '/s/fs.js';
  y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
  g.identify = function (i, v, s) { g(l, { uid: i }, s); if (v) g(l, v, s) }; g.setUserVars = function (v, s) { g(l, v, s) }; g.event = function (i, v, s) { g('event', { n: i, p: v }, s) };
  g.shutdown = function () { g("rec", !1) }; g.restart = function () { g("rec", !0) };
  g.consent = function (a) { g("consent", !arguments.length || a) };
  g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v) };
  g.clearUserCookie = function () { };
})(window, document, window['_fs_namespace'], 'script', 'user');

// GA
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-131780670-1');

// https://spreadsheets.google.com/feeds/list/1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE/1/public/values?alt=json
// TODO: implement scrolling

// https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section/32396543
