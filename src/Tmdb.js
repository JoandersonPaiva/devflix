require('dotenv').config()

const API_KEY = '38272748dec9ec9a3570521b5a3dd9c5'
const URL_BASE = 'https://api.themoviedb.org/3'
const language = 'language=pt-BR&api_key='
const genres = '/discover/movie?with_genres='


const basicFetch = async (endpoint) => {
  const req = await fetch(`${URL_BASE}${endpoint}`)
  const json = await req.json()
  return json
}

// eslint-disable-next-line
export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&${language}${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch(`/trending/all/week?${language}${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?${language}${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`${genres}28&${language}${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`${genres}35&${language}${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`${genres}27&${language}${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`${genres}10749&${language}${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentário',
        items: await basicFetch(`${genres}99&${language}${API_KEY}`)
      },
    ]
  },
  getMovieInfo: async (movieId, type) => {
    let info = {}
    if(movieId) {

      switch(type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?${language}${API_KEY}`)
        break
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?${language}${API_KEY}`)
        break
        default:
          info = null
        break
      }
    }

    return info
  }
}