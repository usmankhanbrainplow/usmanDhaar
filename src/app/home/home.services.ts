import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()

export class HomeService {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl =  'http://127.0.0.1:8000/products/';


  constructor(private _http: Http ,
              private _nav: Router) {
  }

  GetAllPhoneandtabletsProducts() {

    return this._http.get(this.ServerUrl + 'getphoneproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }


  GetWomenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getwomenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetMenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getmenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  getTvVideoaudio8() {

    return this._http.get(this.ServerUrl + 'gettvaudioproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  // id: string
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }




  get_PhoneAndTabletProduct_ProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getphoneproductsById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getWomenFashionProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getwomenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getMenFashionProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getmenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  geTVAudioVideoProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'gettvaudiovideoproductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getComputingLaptopsProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getComputingLaptopsProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getHomeAppliancesProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getHomeAppliancesProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }




  GetAuctionProductPriceById(proId: string ) {

    return this._http.get(this.ServerUrl + 'GetAuctionProductPriceById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }

  InsertUserBid(User_Id: any, Product_ID: any, Price: any) {


    // console.log(Pidd);


    return this._http.post(this.ServerUrl + 'InsertUserBid/' + Product_ID,
      {

        'User_Id': User_Id ,
        'Product_Id': Product_ID,
        'Price': Price,

        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
       // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

         // console.log('this is the id' + responce_data.id);
          // localStorage.setItem('Authorization', res.json().token);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }





}
