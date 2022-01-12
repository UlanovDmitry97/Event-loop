export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );

  for (const film of data.result) {
    const card = document.createElement('a');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');

    const urlEpisodeNumber = film.properties.url.slice(-1);

    card.style.width = '30%'
    card.classList.add('card', 'py-3', 'text-center', 'my-2', 'text-decoration-none');
    card.href = `?episodNumber=${urlEpisodeNumber}`;
    card.dataset.episodeNumber = urlEpisodeNumber;
    cardTitle.classList.add('card-title');
    cardTitle.textContent = `Episode ${film.properties.episode_id}`
    cardText.classList.add('card-text');
    cardText.textContent = `"${film.properties.title}"`;

    cardBody.append(cardTitle);
    cardBody.append(cardText);
    card.append(cardBody);


    container.append(card);
  }

  return container;
}


