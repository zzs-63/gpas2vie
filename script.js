
document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(animeData => {
      const animeListContainer = document.querySelector('.anime-list');
      if (animeListContainer) {
        animeData.forEach(anime => {
          const animeCard = document.createElement('div');
          animeCard.classList.add('anime-card');
          animeCard.innerHTML = `
            <img src="${anime.image}" alt="${anime.titre}">
            <h2>${anime.titre}</h2>
            <a href="lecture.html?anime=${anime.id}">Regarder</a>
          `;
          animeListContainer.appendChild(animeCard);
        });
      }

      const urlParams = new URLSearchParams(window.location.search);
      const animeId = urlParams.get('anime');
      if (animeId && document.getElementById('video-player')) {
        const selectedAnime = animeData.find(anime => anime.id === animeId);
        if (selectedAnime) {
          document.getElementById('video-player').innerHTML = `
            <iframe src="${selectedAnime.lecteur}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>
          `;
        }
      }
    });
});
