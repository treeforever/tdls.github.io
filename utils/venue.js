
export function venueToLink(name) {
  const url = {
    'RBC': 'https://www.rbcroyalbank.com',
    'Rangle': 'https://rangle.io',
    'Randstad Technologies': 'https://www.randstad.ca/our-divisions/technologies/',
    'Ryerson': 'https://www.ryerson.ca/',
    'Shopify': 'https://www.shopify.ca/',
    'SAS': 'https://www.sas.com/en_ca/home.html',
    'Aviva': 'https://www.aviva.ca/en/',
  }[name];
  if (!url) {
    return name;
  } else {
    return (
      <a className="venue-name" href={url} target="_blank">
        {name}&nbsp;<i className="fa fa-external-link"></i>
      </a>
    );
  }
}