import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges, OnInit{
  @Input({required:true}) bannerTitle='';
  @Input() bannerOverview='';
  @Input() key='';
  private DomSanitizer=inject(DomSanitizer)
  videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
  
  ngOnInit(): void {
    this.videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl=this.DomSanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?start=0&autoplay=1&mute=1&loop=1&controls=0&fs=0&rel=0&iv_load_policy=0`);
   }
  }
}
