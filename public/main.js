const $moviesList = document.querySelector('#movies-list')

function renderMovies (data) {
  const $moviesHTML = data?.movies?.map( (movie) =>{
    const $html = `
    <li data-id="${movie.id}" class="movie">
      <article class="movie__card">
      <h2>${movie.title}</h2>
        <div class='movie__poster'>
          <img src="${movie.poster}" alt="${movie.title} poster">
        </div>
        <p class='movie__director'>${movie.director}</p>
        <div class='movie__info'>
          <p>Rating: ${movie.rate}/10</p>
          <span>${movie.year}</span>
          <span>${movie.duration}M</span>
        </div>
        <div class='movie__actions'>
          <a href="#" class="movie__trailer" id=${movie.id}>Watch Trailer</a>
          <button class="movie__delete">Delete</button>
        </div>
      </article>
    </li>
    `
    return $html
  }).join('')

  $moviesList.innerHTML += $moviesHTML
}

const deleteMovie = async (movieID, $movieItem) => {
  const options = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  }
  const res = await fetch(`http://localhost:5000/api/v1/movies/${movieID}`, options)
  const result = await res.json()
  if(!result.ok)  return null
  $movieItem.remove()
}


$moviesList?.addEventListener('click', event => {
  if (!event.target.matches('button')) return null
  const $movieItem = event.target.closest('li')
  const movieID = $movieItem.dataset?.id
  deleteMovie(movieID, $movieItem)
})

const res = await fetch('http://localhost:5000/api/v1/movies')
const json = await res.json()
renderMovies(json?.data)


