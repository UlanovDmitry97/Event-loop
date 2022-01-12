export function render(data) {
  const planetsUrl = [];
  const speciesUrl = [];

  for (const planetUrl of data.result.properties.planets) {
    planetsUrl.push(planetUrl);
  }

  for (const specieUrl of data.result.properties.species) {
    speciesUrl.push(specieUrl);
  }

  const container = document.createElement('div');
  container.classList.add(
    'container',
    'py-4'
  );

  const title = document.createElement('h1');
  const episodeNumber = document.createElement('span');
  const btnReturn = document.createElement('a');
  const episodeInfo = document.createElement('p');
  const planetTitle = document.createElement('h2');
  const speciesTitle = document.createElement('h2');
  const planetsList = document.createElement('ul');
  const speciesList = document.createElement('ul');

  getPlanetList(planetsUrl).then((planetsData) => {
    for (const planetsDataItem of planetsData) {
      const planetListItem = document.createElement('li');
      planetsList.classList.add('list-item');
      planetListItem.innerText = getName(planetsDataItem);

      planetsList.append(planetListItem);
    }
  });

  getSpeciesList(speciesUrl).then((speciesData) => {
    for (const speciesDataItem of speciesData) {
      const speciesListItem = document.createElement('li');
      speciesListItem.classList.add('list-item');
      speciesListItem.innerText = getName(speciesDataItem);

      speciesList.append(speciesListItem);
    }
  });


  title.classList.add('details-title');
  title.innerText = `"${data.result.properties.title}"`;
  episodeNumber.innerText = `Episode ${data.result.properties.episode_id}`;
  episodeNumber.classList.add('episode-number');
  btnReturn.classList.add('btn', 'btn-warning', 'back-btn');
  btnReturn.innerText = '🠔 Back to episodes';
  btnReturn.href = 'index.html';
  episodeInfo.classList.add('episode-info');
  episodeInfo.innerText = data.result.properties.opening_crawl;
  planetTitle.classList.add('section-title');
  planetTitle.innerText = 'Planets';
  speciesTitle.classList.add('section-title');
  speciesTitle.innerText = 'Species';
  planetsList.classList.add('list');
  speciesList.classList.add('list');


  title.append(episodeNumber);
  container.append(title);
  container.append(btnReturn);
  container.append(episodeInfo);
  container.append(planetTitle);
  container.append(planetsList);
  container.append(speciesTitle);
  container.append(speciesList);

  return container;
}


function getName(Data) {
  return Data.result.properties.name;

}

function fetchJson(url) {
  return fetch(url).then(res => res.json())
}


function getPlanetList(planetsUrl) {
  return Promise.all(planetsUrl.map(url => fetchJson(url)));
}

function getSpeciesList(speciesUrl) {
  return Promise.all(speciesUrl.map(url => fetchJson(url)));
}
