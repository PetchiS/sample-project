import { HomeService } from './../home/home.service';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  regions: SelectItem[];

  selectedRegion: string;

  value:Date = new Date;
  items:any=[];
  filterArray: any=[];

  constructor(public homeService:HomeService) {
    this.regions = [
      {label:'All', value:null},
      {label:'New York', value:'NY'},
      {label:'Rome', value:'RM'},
      {label:'London', value:'LDN'},
      {label:'Istanbul', value:'IST'},
      {label:'Paris', value:'PRS'}
  ];

   }

  ngOnInit() {
    let t:string = 'Module '
    for(let i=1;i<=11;i++){     
      this.items.push(t+i);
    }
  }

  onModuleClick(item){
   this.homeService.emitModule(item);
  }

  onRegionChange(event){
    let filter=[];
    if(event.value && this.filterArray.length  >0){
      filter = this.filterArray.filter(x=>x.region === this.filterArray.region);
    }
    return filter;
  }

}
