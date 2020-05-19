import { HomeService } from './home.service';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
// import { Card } from './home.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalCardData: any = [];
  moduleDetails: any;
  data: any;
  columns: any;
  listValues: any = [];
  deliveryOptions: SelectItem[] = [];
  deliveryFilter: any;
  statusOptions: SelectItem[] = [];
  statusFilter: any;
  nextClick: number = 0;
  previousClick: number = 0;
  selectedModule: string = 'ModuleName 1';
  moduleSubcription: Subscription;
  cardSubscription: Subscription;
  searchInput: string;
  suggestionList: any = [];
  searchList: any = [];
  hideNext: boolean = false;
  hidePrev: boolean = false;
  uploadText:string = ' May 16,2020 Sur les ailes du Temps la tristesse s’envole; Le Temps ramène les plaisirs';
  uploadPercent:number =25;

  constructor(public homeService: HomeService) {
    this.moduleDetails = {
      id: '7896054',
      region: 'Europe',
      createdDate: "23-Jan-2020",
      status: 'Approval Pending',
      updatedDate: "05-May-2020",
      owner: "John Hopkins"
    };
    this.data = this.homeService.getChartData();
    this.columns = [
      { field: 'product', header: 'Products' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'size', header: 'Size' },
      { field: 'owner', header: 'Owner' },
      { field: 'materialStatus', header: 'Material Status' },
      { field: 'delivery', header: 'Delivery To' },
      { field: 'approval', header: 'Final Approval' },
      { field: 'status', header: 'Status' }
    ];
    this.searchList = ['search input', 'search input2', 'input search3', 'search input4'];
  }

  ngOnInit() {
    this.getCardDetails();
    this.getDelieveryOptions();
    this.getStatusOptions();
    this.moduleSubcription = this.homeService.getModule().subscribe(x => {
      this.selectedModule = x;
    })
    this.listValues = this.homeService.getProductDetails();
  }

  getDelieveryOptions() {
    this.deliveryOptions.push({ label: 'All', value: 'All' });
    if (this.listValues && this.listValues.length > 0) {
      for (let i = 0; i < this.listValues.length; i++) {
        this.deliveryOptions.push({ label: this.listValues[i].delivery, value: this.listValues[i].delivery });
      }
    }
  }

  getStatusOptions() {
    this.statusOptions.push({ label: 'All', value: 'All' });
    if (this.listValues && this.listValues.length > 0) {
      for (let i = 0; i < this.listValues.length; i++) {
        this.statusOptions.push({ label: this.listValues[i].approval, value: this.listValues[i].approval });
      }
    }
  }

  displayNext() {
    this.hidePrev = false;
    let next = document.getElementsByClassName("ui-carousel-next");
    if (next[0]) {
      let nextButton = next[0] as HTMLInputElement;
      if (!nextButton.disabled) {
        let c = next[0] as HTMLElement;
        c.click();
      } else {
        this.hideNext = true;
      }
    }
  }

  displayPrevious() {
    this.hideNext = false;
    let prev = document.getElementsByClassName("ui-carousel-prev");
    if (prev[0]) {
      let prevButton = prev[0] as HTMLInputElement;
      if (!prevButton.disabled) {
        let c = prev[0] as HTMLElement;
        c.click();
      } else {
        this.hidePrev = true;
      }
    }

  }

  getCardDetails() {
    this.cardSubscription = this.homeService.getCardDetails().subscribe(x => {
      this.totalCardData = x;
    });
  }

  onDeliveryChange(event) {
    if (event.value !== 'All') {
      let filter = this.homeService.getProductDetails().filter(s => s.delivery === event.value);
      this.listValues = filter;
    } else {
      this.listValues = this.homeService.getProductDetails();
    }
  }

  onStatusChange(event) {
    if (event.value !== 'All') {
      let filter = this.homeService.getProductDetails().filter(s => s.approval === event.value);
      this.listValues = filter;
    } else {
      this.listValues = this.homeService.getProductDetails();
    }
  }

  searchTech(event) {
    this.suggestionList = this.searchList.filter(sugg =>
      sugg.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
  }

  onTabChange(event) {
    this.homeService.getChartData(event.index);
  }

  ngOnDestroy() {
    this.moduleSubcription.unsubscribe();
    this.cardSubscription.unsubscribe();
  }
}
