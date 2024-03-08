import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { DescriptionPipe } from '../../shared/pipes/description.pipe';
import { Observable, forkJoin, map } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SearchMoviesComponent } from '../../core/components/search-movies/search-movies.component';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [BannerComponent,HeaderComponent,MovieCarouselComponent,CommonModule,SearchMoviesComponent,FooterComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',

})
export class BrowseComponent implements OnInit{
  movieService=inject(MovieService);
  listmovies:IVideoContent[]=[]
  input:string='';
  filteredMovies:IVideoContent[]=[];
  flagInput:boolean=false;
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  //ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  bannerDetails=new Observable<any>();
  bannerVideo=new Observable<any>();
  sources = [
    this.movieService.getMovies(),
    this.movieService.geTVShows(),
   // this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    forkJoin(
      this.sources
    ).pipe(
      map(([movies,tvShows,nowPlayingMovies,popularMovies,topRatedMovies,upcomingMovies])=>{
        this.bannerDetails=this.movieService.getBannerDetail(movies.results[5].id);
        this.bannerVideo=this.movieService.getBannerVideo(movies.results[5].id);
        return {movies,tvShows,nowPlayingMovies,popularMovies,topRatedMovies,upcomingMovies}
      })
    ).subscribe((res:any)=>{
      console.log('Este es el res:',res);
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      //this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlayingMovies.results as IVideoContent[];
      this.upcomingMovies = res.upcomingMovies.results as IVideoContent[];
      this.popularMovies = res.popularMovies.results as IVideoContent[];
      this.topRatedMovies = res.topRatedMovies.results as IVideoContent[];
      this.getMovieKey();
    })
  }

  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id)
    .subscribe(res=>{
      console.log(res);
    })
  }
  
  captionInput(value:string){
    this.input=value;
    if(value!==''){
      this.flagInput=true;
      const newValue=value.toLowerCase();
      this.filteredMovies=[...this.movies.filter(movie=>movie.original_title.toLowerCase().includes(newValue))];
      
    }else{
      this.flagInput=false
    }
    console.log('Este es el valor recepcionado',value)
  }

}
