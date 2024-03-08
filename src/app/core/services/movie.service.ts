import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  params:{
    api_key : '394211dc2ea593df75bada642eb0c13c',
    include_adult:'false',
    include_video:'true',
    language:'en-US',
    page:'1',
    sort_by:'population.desc',
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQyMTFkYzJlYTU5M2RmNzViYWRhNjQyZWIwYzEzYyIsInN1YiI6IjY1ZTM1YWJmMmFjNDk5MDE4NmVlNGJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7uGIzwJJG9mpbYQupoRFm1D7JI9Uu6kfnE4fiEDXhgE'
  }
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http=inject(HttpClient)
  constructor() { }

  getMovies(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options);
  }
  
  geTVShows(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options);
  }

  getRatedMovies() {
    return this.http.get('https://api.themoviedb.org/3/guest_session/1/rated/movies',options)
  }

  getBannerImage(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie/575264/images',options);
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`,options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`,options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
}
