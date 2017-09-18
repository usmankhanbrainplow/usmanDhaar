import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import { LoginService } from '../log-in/log-in.services';
import { HomeService } from '../home/home.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  ServerUrl =  'http://localhost:8000/';
  NewPostcheck = false ;
  ActiveProduct: any = [];
  GetUSerDOne: any = [];

  GetUSerOffer: any[] = [];
  USerName: any;
  SessionstoreName: any;

  constructor(private _http: Http ,
              private Profile: LoginService,
              private HomeServics: HomeService,
              private _nav: Router) {
  }

  ngOnInit() {
    this.Profile.GetUSerdetailsByUserId(sessionStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;

    });
    this.Profile.verify_token().subscribe((response) => {
        this.USerName =  this.jwtHelper.decodeToken(sessionStorage.getItem('Authorization'))['user_id'];



      },
      (err) => {
        console.log('ERROR:' + err);
        this._nav.navigate(['/login']);
      },
      () => {
      }
    );
    if ( sessionStorage.getItem('NewPost') === 'Done') {
          this.NewPostcheck = true;
      sessionStorage.setItem('NewPost', null);

  }
    window.scrollTo(0, 0);

    this.Profile.GetStoreInformationByUserId(sessionStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        if (this.ActiveProduct.length > 0 ) {
          sessionStorage.setItem('StoreName', this.ActiveProduct[0].StoreName);
          this.HomeServics.GetallProductsOffersByStoreName(1, sessionStorage.getItem('StoreName') ).subscribe(resSlidersData => {
            this.GetUSerOffer = resSlidersData;

          });
          this.SessionstoreName = sessionStorage.getItem('StoreName');
        } else {
          this._nav.navigate(['/login']);
        }



      });




  }

  clearSessionstoreage() {
    sessionStorage.clear();
  }

}
