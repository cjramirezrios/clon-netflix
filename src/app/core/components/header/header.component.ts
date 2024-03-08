import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { OutsideDirective } from '../../../drectives/outside.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,OutsideDirective,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit{
  @ViewChild('input') inputHeader!:ElementRef;
  @Output() inputValue=new EventEmitter<string>();
  search:boolean=false
  valorInput:string='';
  listNav:string[]=["Home","TV Shows News & Popular","My List","Browser by Language"]
  
  ngAfterViewInit(): void {
    this.autoFocus();
  }

  changueSearch(){
    this.search=true;
    console.log('Aqui en change')
    //this.autoFocus()
  }

  sendValueInput(value:string){
    this.inputValue.emit(value);
  }

  autoFocus(){
    this.inputHeader.nativeElement.focus();
    console.log("Aqui en el autoFocus")
  }

  clickedOutside():void{
    this.search=false;
    console.log('Aqui en outside')
  }

}
