import { ProductDetails } from './home.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  public selectedModule= new Subject<string>();
  constructor(public http:HttpClient) { }

  getProductDetails() {
    let products:ProductDetails[]=[];
    let product1 =
    {
      product: 'Product 1',
      createdDate: '12-Jan-2020',
      size: '100Kg',
      owner: 'Jim Laker',
      materialStatus: 'NA',
      delivery: 'Factory 1',
      approval: 'Yet to Approve',
      status: 'In Production'
    };
    let product2 =
    {
      product: 'Product 2',
      createdDate: '15-Jan-2020',
      size: '103Kg',
      owner: 'John Parker',
      materialStatus: 'Checked',
      delivery: 'Factory 2',
      approval: 'Approved',
      status: 'In Production'
    };
    for (let i = 1; i < 31; i++) { 
      if(i%2==0)  
        products.push(product1);
      else
        products.push(product2);   
    }
    return products;
  }
  getChartData(index?) {
    let data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Delivery',
          data: [40, 50, 60, 55, 62, 43, 32],
          lineTension: 0,
          fill: false
        }
      ]
    };
    return data;
  }

  emitModule(module) {
    this.selectedModule.next(module);
  }

  getModule(): Observable<any> {
    return this.selectedModule.asObservable();
  }

  getCardDetails(){
    return this.http.get("./../assets/card-details.json");
  }

}