import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule,DescriptionPipe,ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
  animations:[
    trigger('fade',[
      transition('void => *',[
        style({opacity:0}),
        animate(300,style({opacity:1}))
      ])
    ]),
    trigger('fades',[
      transition('void => *',[
        style({opacity:0}),
        animate(100,style({opacity:1}))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements AfterViewInit,OnInit{
  @Input() videoContents: IVideoContent[]=[]
  @Input() title:string='';
  @ViewChild('swiperContainer') swiperContainer!:ElementRef;
  estado:boolean=false;
  selectionMovies:string | null=null;
  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnInit(): void {
    this.verificarTamanoPantalla();
  }
  private initSwiper(){
    return new Swiper(this.swiperContainer.nativeElement,{
      slidesPerView:3,
      slidesPerGroup:2,
      centeredSlides:true,
      loop:true,
      breakpoints:{
        600:{
          slidesPerView:2,
          slidesPerGroup:2,
          spaceBetween:5,
          centeredSlides:true,
        },
        900:{
          slidesPerView:3,
          slidesPerGroup:3,
          spaceBetween:5,
          centeredSlides:true,
        },
        1200:{
          slidesPerView:4,
          slidesPerGroup:4,
          spaceBetween:5,
          centeredSlides:true,
        },
        1500:{
          slidesPerView:5,
          slidesPerGroup:5,
          spaceBetween:5,
          centeredSlides:true,
        },
        1800:{
          slidesPerView:5,
          slidesPerGroup:6,
          spaceBetween:5,
          centeredSlides:true,
        }
      }
    }) 
  }

  setHoverMovie(movie:IVideoContent){
    this.selectionMovies=movie.title??movie.name;
  }

  clearHoverMovie(){
    this.selectionMovies=null
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.verificarTamanoPantalla();
  }

  verificarTamanoPantalla(): void {
    this.estado = window.innerWidth < 800;
  }


}
