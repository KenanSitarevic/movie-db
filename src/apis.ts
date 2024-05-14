import axios from 'axios';
import { Movie } from './types/movies';
import { Show } from './types/shows';
import { MovieDetailed } from './types/movieDetailed';
import { ShowDetailed } from './types/showDetailed';

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
      return response.data?.results.slice(0, 10)
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function getMovieDetails(id:string): Promise<MovieDetailed> {
  const options = {..._options, url: _options.url + `movie/${id}?language=en-US`};

  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function getShowDetails(id:string): Promise<ShowDetailed> {
  const options = {..._options, url: _options.url + `tv/${id}?language=en-US`};

  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function searchMovies(searchInput: string): Promise<Movie[]> {
  const options = {..._options, url: _options.url + `search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`};

  return axios
    .request(options)
    .then(function (response) {
      return response.data?.results.slice(0, 10)
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function searchShows(searchInput: string): Promise<Show[]> {
  const options = {..._options, url: _options.url + `search/tv?query=${searchInput}&include_adult=false&language=en-US&page=1`};

  return axios
    .request(options)
    .then(function (response) {
      return response.data?.results.slice(0, 10)
    })
    .catch(function (error) {
      console.error(error);
    });
}
