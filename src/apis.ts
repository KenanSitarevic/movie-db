import axios from 'axios';
import { Movie } from './types/movies';
import { Show } from './types/shows';

const _options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_API_KEY
  }
};

export async function getTopTenMovies(): Promise<Movie[]> {
  const options = {..._options, url: _options.url + 'movie/top_rated?language=en-US&page=1'};

  return axios
    .request(options)
    .then(function (response) {
      console.log('first movie:',response.data.results[0])
      return response.data?.results.slice(0, 10)
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function getTopTenShows(): Promise<Show[]> {
  const options = {..._options, url: _options.url + 'tv/top_rated?language=en-US&page=1'};

  return axios
    .request(options)
    .then(function (response) {
      console.log('first show:',response.data.results[0])
      return response.data?.results.slice(0, 10)
    })
    .catch(function (error) {
      console.error(error);
    });
}
