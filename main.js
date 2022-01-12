const cssPromises = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;

      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }

  if (src.endsWith('.css') || !src.startsWith('https')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;

      cssPromises[src] = src;

      document.head.append(link);
    }
    return cssPromises[src];
  }

  return fetch(src).then(res => res.json())
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);

const episodeNumber = searchParams.get('episodNumber');

function renderPage(modulName, apiUrl, css, cssLocal) {
  Promise.all([modulName, apiUrl, css, cssLocal].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
      const cards = document.querySelectorAll('.card');
      const backBtn = document.querySelector('.back-btn');

      if (cards) {
        cards.forEach(card => {
          const urlEpisodeNumber = card.dataset.episodeNumber;
          card.addEventListener('click', function (evt) {
            evt.preventDefault();
            history.pushState(null, '', `index.html?episodNumber=${urlEpisodeNumber}`);
            renderPage(
              './film-details.js',
              `https://www.swapi.tech/api/films/${urlEpisodeNumber}`,
              'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
              './css/film-details.css'
            );
          })
        })
      }

      if (backBtn) {
        backBtn.addEventListener('click', function (evt) {
          evt.preventDefault();
          history.back()
        })
      }
    });
}

if (episodeNumber) {
  renderPage(
    './film-details.js',
    `https://www.swapi.tech/api/films/${episodeNumber}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    './css/film-details.css'
  );
} else {
  renderPage(
    './films-list.js',
    'https://www.swapi.tech/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    './css/films-list.css')
};

window.addEventListener('popstate', function () {
  const searchParams = new URLSearchParams(location.search);

  const episodeNumber = searchParams.get('episodNumber');

  if (episodeNumber) {
    renderPage(
      './film-details.js',
      `https://www.swapi.tech/api/films/${episodeNumber}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      './css/film-details.css'
    );
  } else {
    renderPage(
      './films-list.js',
      'https://www.swapi.tech/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      './css/films-list.css')
  };
})

