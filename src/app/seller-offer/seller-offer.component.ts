import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import swal from "sweetalert2";



@Component({
  selector: 'app-seller-offer',
  templateUrl: './seller-offer.component.html',
  styleUrls: ['./seller-offer.component.scss']
})
export class SellerOfferComponent implements OnInit {
  sub;
  model: any = {};
  ProductOffer: any = [];
  ActiveProduct: any = [];
  PicServrUrl = 'https://apis.dhaar.pk/media/';
  errormessage = false;
  SessionstoreName: any;
  seller = false;
  r: any;
  pageno: any;
  user: any;
  Product: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: ActiveAdServices,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      if (localStorage.getItem('UserID') === null) {

        this._nav.navigate(['/login']);
      }
      this.SessionstoreName = localStorage.getItem('StoreName');

      this.httpService.GetStoreOffers(this.SessionstoreName).subscribe(data => {
        this.ProductOffer = data;
      });

    }

  }
  AcceptOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.acceptOffer(this.user,this.Product).subscribe( data => {
      swal('This Offer has been Accepted', '', 'success')
    });
  }
  RejectOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.rejectOffer(this.user,this.Product).subscribe( data => {
      swal('This Offer has been Rejected', '', 'success')
    });
  }
  CounterOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
  }

  UpdateCounterOffer() {
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

      this.httpService.SellerCounterOffers(this.user,this.Product,this.model).subscribe((response) => {
          /* this function is executed every time there's a new output */
          // console.log("VALUE RECEIVED: "+response);
          // alert('inserted');
          swal('Your offer has been Updated. Please wait for the seller to respond.','','success');
        },
        (err) => {
          //erro
        },
        () => {
          /* this function is executed when the observable ends (completes) its stream */
          //   console.log("COMPLETED");
        }
      );
    } else {
      swal('Please Enter both Fields, Quantiy and Price per Quantity','','error');

    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
  }
}
