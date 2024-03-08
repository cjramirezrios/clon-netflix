import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DescriptionPipe } from '../../../shared/pipes/description.pipe';
import { IVideoContent } from '../../../shared/models/video-content.interface';
import { ImagePipe } from '../../../shared/pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-movies',
  standalone: true,
  imports: [CommonModule,DescriptionPipe,ImagePipe],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.scss',
  animations:[
    trigger('fade',[
      transition('void => *',[
        style({opacity:0}),
        animate(300,style({opacity:1}))
      ])
    ])
  ]
})
export class SearchMoviesComponent implements OnInit{
  @Input() listMovies:IVideoContent[]=[];
  @Input() input:string='';
  selectionMovies:string | null=null;
  ngOnInit(): void {
    
  }
  setHoverMovie(movie:IVideoContent){
    this.selectionMovies=movie.title??movie.name;
  }

  clearHoverMovie(){
    this.selectionMovies=null
  }
}
