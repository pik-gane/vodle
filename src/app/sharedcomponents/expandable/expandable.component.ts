import { Component, OnInit, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';

import { IonicModule } from '@ionic/angular';
@Component({
  imports: [ IonicModule ],
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  constructor(public renderer: Renderer2) {

  }

  ngAfterViewInit(){
      this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');    
  }

  ngOnInit() { }
}
