import { Component, OnInit, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImageZoomModule } from 'angular2-image-zoom';
// import './single-product.js';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { HomeService } from '../home/home.services';
import { LoginService } from '../log-in/log-in.services';
import swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';
import {ImageViewerModule, ImageViewerConfig, CustomEvent} from 'ngx-image-viewer';
declare const $: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],

})
export class SingleProductComponent implements OnInit {
  config: ImageViewerConfig = {customBtns: [{name: 'print', icon: 'fa fa-print'}]};
// , {name: 'link', icon: 'fa fa-link'}
  imageIndexOne = 0;
  imageIndexTwo = 0;
  private sub: any;
  model: any = {};
  GetallPhoneProduct: any = [];
  GetallProductReview: any = [];
  element: HTMLElement;
  LoginID:  Boolean = false;
  login_error:  Boolean = false;
  ProID: string;
  Getphoto: any = [];
  NewBidInserted = false ;
  NewCart = false ;
  ViewItemCheck = false ;
  Timeclose = false ;
  MinBidPrice = false ;
  amountoffer = false ;
  AuctionTest = true;
  noreview = false;
  Solddd = false;
  soldfix = false;
  WatchStatus = false;
  minOffer = false;
  openreviews = true;
  ourproduct = false;
  minOfferDone = false;
  AuctionProductPrice: number;

  istimer = true;

  resultProduct: any = [];
  ProPics: any = [];
  ProPDes: any = [];
  BidingProduct: any[] = [];
  // onePeoduct: Productlist[];
  onePeoduct: any = [];
  products: any = {'products': []};

  TmpresultProduct: any = {'products': []};
  ViewedProduct: any = {'products': []};
  GeProductBiding: any = [];
  PicList: any = [];
  ProductPictures: any = [];
  Calculation: any = [];
  invoice: any = [];
  searchQuery:any;
  CatName: string;
  starp: any = 0;
  DbDate: string;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  user: any;
  product:any;
  RedirectFromlogin: string;
  LocalStoreName: any;
  MinimumbestOffer: any;
  opSearch: number = 0;
  AuctionDayDB: string;
  highestbid = false;
  zerobid = false;
  AverageRating: any=0;
  AverageRating1: any=0;
  TotalRating: any=0;
  StarPercent: any=0;
  count0:any=0;
  count1:any=0;
  count2:any=0;
  count3:any=0;
  count4:any=0;
  count5:any=0;
  username:any;
  Title: any;

  // imageIndex = this.ProPics;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private route: ActivatedRoute,
               private GetAdd: HomeService,
               private LOginObj: LoginService,
               private httpService: BuyerDashboardServices,
               private router: Router) { }


  ngOnInit() {



    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.timer(this.element);
      }, 1000);
      // window.setInterval(function () {
      //
      //
      // }, 1000);

      this.username= localStorage.getItem('UserName');


      this.GetAdd.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
        this.GetallPhoneProduct = resSlidersData;
      });

      window.scrollTo(0, 0);
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.CatName = params['CatName'] || '0';
          this.ProID = params['ProID'] || '0';
          this.RedirectFromlogin = params['Redirect'] || null;
          if (this.RedirectFromlogin !== null) {
            if (this.RedirectFromlogin === 'MakeOffer') {
              this.amountoffer = true;
            }
          }

          if (localStorage.getItem('UserID') !== null) {
            this.LoginID = true;
            this.WatchObserver();
          } else {
            this.LoginID = false;
          }
          this.httpService.GetallIDByUser(this.ProID, localStorage.getItem('UserID')).subscribe(
            data => {
              this.invoice = data;
              // if ( this.invoice['0']['id'] !== null ) {
              //   this.openreviews = true;
              // }
            });

          if (this.ProID !== '0') {
            this.GetAdd.GetAllProductPicture(this.ProID).subscribe(resSlidersData => {
              this.ProductPictures = resSlidersData;
            });
          }

          this.ProductReviews();

          this.GetAdd.GetallBidsProductdbyProductID(this.ProID).subscribe(resSlidersData => {

            this.BidingProduct = resSlidersData;
            // console.log('Bidding Products are:', this.BidingProduct);


            this.BidingProduct.sort(function (a, b) {
              // alert('first')
              if (a.Price > b.Price) {
                return -1;
              } else if (a.Price < b.Price) {
                return 1;
              } else {
                return 0;
              }
            });
            if(this.BidingProduct.length) {
              console.log('Bidding Products are:', this.BidingProduct);
              if (this.BidingProduct[0]['User_Id'] === localStorage.getItem('UserName')) {
                this.highestbid = true;
              }
            } else {
              this.zerobid =true;
            }
          });
        });
      this.GetAdd.GetphotoById().subscribe(resSlidersData => {
        this.Getphoto = resSlidersData;
      });

      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      }
      this.PhoneTablet();
    }

  }

  ProductReviews(){
    this.GetAdd.GetallUserReviewsBYProductId(this.ProID).subscribe(resSlidersData => {
      this.GetallProductReview = resSlidersData;
      if (this.GetallProductReview.length !== 0){

        this.GetAdd.GetallUserReviewsCalculationBYProductId(this.ProID).subscribe(data => {
          this.Calculation = data;
          console.log('Calculation issss:', this.Calculation);
          this.TotalRating = this.Calculation.Sum;
          this.AverageRating = 3.7;
          this.AverageRating1 = (this.AverageRating *10)%10;
          console.log('Mode number is:', this.AverageRating1);
          this.StarPercent = (this.AverageRating1/10) * 100;
          console.log('StarPercent is:', this.StarPercent);
          // this.AverageRating=(this.Calculation.Average).toFixed(1);
          // this.AverageRating1=(this.Calculation.Average).toFixed();
          this.count0=this.Calculation.Percentage0;
          this.count1=this.Calculation.Percentage1;
          this.count2=this.Calculation.Percentage2;
          this.count3=this.Calculation.Percentage3;
          this.count4=this.Calculation.Percentage4;
          this.count5=this.Calculation.Percentage5;
        });
      } else if (this.GetallProductReview.length === 0) {
        this.noreview = true;

      }
    });
  }
  handleEvent(event: CustomEvent) {

      console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

      switch (event.name) {
        case 'print':
          console.log('run print logic');
          break;
      }
  }

  IndexChange(index) {
    this.imageIndexOne = index;
  }

  PhoneTablet(){
    this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData => {
      this.resultProduct = resSlidersData;
      this.Title = this.resultProduct['P_Title']
      console.log('Description of product is:', this.resultProduct['P_Des']);
      this.ProPDes = this.resultProduct['P_Des'].split('\n');

      this.ProPics = this.resultProduct['Pic'].split(',');

      for(let i=0; i<this.ProPics.length-1; i++) {
          this.PicList[i]=this.ProPics[i+1];
      }

      console.log('Pics Before:', this.ProPics);
      console.log('Pics after:', this.PicList);


      console.log('Pics are:', this.ProPics);
      if (this.resultProduct['StoreName'] === localStorage.getItem('StoreName')) {
        this.ourproduct = true;

      }
      try {

        if (localStorage.getItem('ViewedItem') !== null) {

          this.ViewedProduct = JSON.parse(localStorage.getItem('ViewedItem'));
          for (const ABCC of this.ViewedProduct['products']) {

            if (ABCC.ProductID === this.ProID) {  // Checking if the same product also present in cart.
              this.ViewItemCheck = true;

            }
          }
          if (this.ViewItemCheck === false) {
            this.ViewedProduct = JSON.parse(localStorage.getItem('ViewedItem'));
            this.ViewedProduct['products'].push(this.resultProduct);
            localStorage.setItem('ViewedItem', JSON.stringify(this.ViewedProduct));

          }
        } else {

          this.ViewedProduct['products'].push(this.resultProduct);
          localStorage.setItem('ViewedItem', JSON.stringify(this.ViewedProduct));
        }
      } catch (e) {
        this.ViewedProduct['products'].push(this.resultProduct);
        localStorage.setItem('ViewedItem', JSON.stringify(this.ViewedProduct));
      }
      if (this.resultProduct.Quantity <= 0) {
        this.soldfix = true;
      }
      console.log('Product attributes', this.resultProduct);
      this.LocalStoreName = this.resultProduct.StoreName;
      this.MinimumbestOffer = this.resultProduct.Addbestoffer;
      if (this.resultProduct.Auction) {
        this.DbDate = this.resultProduct.CreatedDate;
        this.AuctionDayDB = this.resultProduct.AuctionListing;
        const auctiondays = +this.AuctionDayDB * 86400000;
        console.log('Auction days:', auctiondays);
        const time0 = new Date();
        console.log('time0:', time0);
        const time1 = new Date(this.DbDate);
        console.log('time1:',time1);
        const time3 = ((time1.getTime() - time0.getTime()) + auctiondays);
        console.log('time3:',time3);
        console.log('Bidding Products Are:', this.BidingProduct)
        if(time3<=0 && this.BidingProduct.length !==0){
          console.log('This Bidder wins:', this.BidingProduct[0]);
          this.user=this.BidingProduct[0]['User_Id']
          this.product=this.BidingProduct[0]['Product_Id']
          this.GetAdd.InsertwinnerBid(this.user, this.product).subscribe();
        }
        // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
        let x = time3 / 1000;
        this.seconds = Math.floor(x % 60);
        console.log('Seconds are:', this.seconds);
        x /= 60;
        this.minutes = Math.floor(x % 60);
        console.log('Minutes are:', this.minutes);
        x /= 60;
        this.hours = Math.floor(x % 24);
        console.log('Hours are:', this.hours);
        x /= 24;
        this.days = Math.floor(x);
        console.log('Days are:', this.days);


      }

    });
  }

  WatchObserver() {
    if (isPlatformBrowser(this.platformId)) {
    this.httpService.WatchStatus(this.ProID, localStorage.getItem('UserID')).subscribe( data => {
      console.log('checkkkkkkkkkkk  ',data);
      this.WatchStatus=data.Res
    });
    }
  }

  WatchProduct() {
    if (isPlatformBrowser(this.platformId)) {
      this.GetAdd.WatchProduct(
        this.resultProduct['ProductID'],
        localStorage.getItem('UserID'),
        this.resultProduct['Cat_Name'],
      ).subscribe(data => {
          // console.log(data);
          // this.WatchStatus=false;
          this.WatchObserver();
        },
        error => {
          // console.log(error);
          // this.WatchStatus=true;
        });
    }
  }
  UnwatchProduct() {
    if (isPlatformBrowser(this.platformId)) {
      this.GetAdd.UnwatchProduct(
        this.resultProduct['ProductID'],
        localStorage.getItem('UserID'),
      ).subscribe(data => {
          // console.log(data);
          // this.WatchStatus=false;
          this.WatchObserver();
        },
        error => {
          // console.log(error);
          // this.WatchStatus=true;
        });
    }
  }
  getValueq(event) {
    // //alert(event)
    this.starp = event;
    // //alert(this.star)
  }


  InsertBid(startingPrice: number, MaxPrice: number ) {

    console.log('max', this.resultProduct);
    console.log('start', startingPrice);
    // console.log('UserId is ',this.resultProduct['User_ID']);
    if (localStorage.getItem('UserID')) {
      if (this.model.UserPriceBid > MaxPrice) {
        this.MinBidPrice = false;
        this.GetAdd.InsertUserBid(localStorage.getItem('UserID'), this.ProID, this.model.UserPriceBid).subscribe(data => {
          this.zerobid = false;
          this.httpService.InsertPhoneMaxBid(this.resultProduct['ProductID'], this.model.UserPriceBid).subscribe();
          this.highestbid = true;
          this.RefreshBids();
        });
        console.log(this.GeProductBiding);
        // this.someMethod(true, this.ProID, startingPrice );

      } else {
        this.MinBidPrice = true;
      }
    } else {
      swal('Login Required','','error')
    }


  }
  RefreshBids() {
    this.GetAdd.GetallBidsProductdbyProductID(this.ProID).subscribe(resSlidersData => {

      this.BidingProduct = resSlidersData;

      this.BidingProduct.sort(function(a, b) {

        if (a.Price > b.Price) {
          return -1;
        } else if (a.Price < b.Price) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log('Bidddddddddd', this.BidingProduct);
    });
  }

  LoginUser() {

    this.LOginObj.loged_No_redirect(this.model.Username, this.model.Password).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
        this.LoginID = true;
        this.login_error = false;
      },
      (err) => {
        this.login_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }

  Addtocart(Abc: any) {
    if (isPlatformBrowser(this.platformId)) {
      // alert('Message of error');
      // console.log(Abc);
      // console.log('esssssssssss  ', this.resultProduct.Quantity);
      // console.log(this.resultProduct['Quantity']);

      if (Abc === '') {
        swal('Please Select Product Quantity first','','error');
      } else if (Abc > this.resultProduct.Quantity) {
        swal('You are exceding from Maximum Quantity of product available','','error');
      } else {


        try {


          // this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
          // alert(this.TmpresultProduct['products']);

          if (localStorage.getItem('Cartdata') !== null) {

            this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
            for (const ABCC of this.TmpresultProduct['products']) {

              if (ABCC.ProductID === this.ProID) {  // Checking if the same product also present in cart.
                this.NewCart = true;

              }
            }
            if (this.NewCart === false) {

              // console.log('eeeeeeeee',this.resultProduct);
              this.resultProduct.itemsqty = +Abc;
              this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
              this.TmpresultProduct['products'].push(this.resultProduct);
              localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));

              // console.log(this.products);
              this.router.navigate(['/checkout2']);
            } else {
              this.router.navigate(['/checkout2']);
            }
          } else {

            this.resultProduct.itemsqty = +Abc;
            this.TmpresultProduct['products'].push(this.resultProduct);
            localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
            // console.log(this.products);
            this.router.navigate(['/checkout2']);
          }
        } catch (e) {
          this.resultProduct.itemsqty = +Abc;
          this.TmpresultProduct['products'].push(this.resultProduct);
          localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
          // console.log(this.products);
          this.router.navigate(['/checkout2']);
        }

      }
    }
  }

  ClearSession() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  }

  CancelOffer() {
   this.amountoffer=false;
  }
  MakeAnOffer() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('Authorization') !== null) {
        this.LOginObj.verify_tokenWithNoRedirict().subscribe((response) => {

            if (response) {

              this.amountoffer = true;
            } else {


              this.router.navigate(['/login'], {queryParams: {CatName: this.CatName, ProID: this.ProID}});

            }
          },
          (err) => {

            console.log('ERROR:' + err);
            alert(err);
            // this._nav.navigate(['/login']);
          },
          () => {
          }
        );


      } else {

        this.router.navigate(['/login'], {queryParams: {CatName: this.CatName, ProID: this.ProID}});
      }
    }
  }


  SubmitOffer() {
    this.minOfferDone = false;
    this.minOffer = false;
    // console.log('offer amount is', this.model.OfferAmount);
    // console.log('offer Quantity is', this.model.QuantityProduct);
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

       this.GetAdd.ProductOffers(this.ProID, this.LocalStoreName,this.resultProduct['P_Title'], this.CatName, this.model).subscribe((response) => {
           /* this function is executed every time there's a new output */
           // console.log("VALUE RECEIVED: "+response);
         // alert('inserted');
           swal('Your offer has been sent to the seller. Please wait for the seller to respond.','','success');
           this.minOfferDone = true;
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
  timer(element: HTMLElement) {

     if (!this.Timeclose) {
    //   alert(this.Timeclose)
      this.seconds -= 1;
      if (this.seconds <= 0) {
        this.seconds = 59;
        this.minutes -= 1;
        if (this.minutes <= 0) {
          this.minutes = 59;
          this.hours -= 1;
          if (this.hours <= 0) {
            this.hours = 23;
            this.days -= 1;
            if (this.days <= 0) {
              this.Timeclose = true;
              this.Solddd = true;

              this.seconds = 0;
              this.minutes = 0;
              this.hours = 0;
              this.days = 0;
            }

          }
        }

      }

    }
  }

  SubmitReview() {
    console.log('Store Name is', this.resultProduct['StoreName']);
    this.GetAdd.InsertProductReviews(localStorage.getItem('UserName'), localStorage.getItem('UserID'), this.model.YourReview, this.ProID, this.starp, this.resultProduct['StoreName']).subscribe(resSlidersData => {
        swal('Your Review has been submitted','','success');
        this.GetAdd.GetallUserReviewsBYProductId(this.ProID).subscribe(resSlidersData => {
          this.GetallProductReview = resSlidersData;
          this.noreview = false;
        });
        this.ProductReviews();
        const selectElement = <HTMLSelectElement>document.getElementById('reviewsForm');
        selectElement.reset();
      },
      (err) => {
        this.searchQuery = err;
        // alert(this.searchQuery);
        console.log('Error is suberror:',this.searchQuery);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }

}
