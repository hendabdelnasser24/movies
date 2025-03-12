import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private _httpclient: HttpClient) { }

  trendMovies(mediaType: string): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=09a9c9d85e17c15723e9721f00211445`)
  }

  getMediaDetailsByTypeAndId(mediaType: string, id: string): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=09a9c9d85e17c15723e9721f00211445&language=en-US`)
  }

  showMoviesByGenre(code: string, pageNumber: number): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=09a9c9d85e17c15723e9721f00211445&with_genres=${code}&language=en-US&page=${pageNumber}`)
  }

  getMovieGenreIdAndName(): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=09a9c9d85e17c15723e9721f00211445`)
  }

  showTvByGenre(code: string, pageNumber: number): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/discover/tv?api_key=09a9c9d85e17c15723e9721f00211445&with_genres=${code}&language=en-US&page=${pageNumber}`)
  }

  getTvGenreIdAndName(): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=09a9c9d85e17c15723e9721f00211445`)
  }

  getUpcomingMovies(pageNumber: number): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=09a9c9d85e17c15723e9721f00211445&language=en-US&page=${pageNumber}`)
  }

  getSimilarMovies(mediaType: string, id: string): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=09a9c9d85e17c15723e9721f00211445&language=en-US&page=1`)
  }

  getDataBySearching(query: string): Observable<any> {
    return this._httpclient.get(`https://api.themoviedb.org/3/search/multi?api_key=09a9c9d85e17c15723e9721f00211445&query=${query}`)
  }
  
}
