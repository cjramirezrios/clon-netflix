import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DescriptionPipe } from '../../../shared/pipes/description.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [DescriptionPipe,CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges, OnInit{
  @Input({required:true}) bannerTitle='';
  @Input() bannerOverview='';
  @Input() key='';
  estado:boolean=false;
  private DomSanitizer=inject(DomSanitizer)
  videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
  
  ngOnInit(): void {
    this.videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
    this.verificarTamanoPantalla();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
   }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.verificarTamanoPantalla();
  }

  verificarTamanoPantalla(): void {
    this.estado = window.innerWidth < 1100;
  }
}
