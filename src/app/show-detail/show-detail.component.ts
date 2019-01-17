import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})

export class ShowDetailComponent implements OnInit {

  show = {};
  user: {};
  username: string;
  userSize: number;
  inWatchlist: boolean;
  id:number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
    this.userSize = Object.keys(this.user).length;
    this.id = this.route.snapshot.params['id'];
    this.getShowDetail(this.id);
    this.checkWatchlist();
  }

  getShowDetail(idshow) {
   this.http.get('https://rest-in-pitch.herokuapp.com/rest/show/'+idshow).subscribe( data => {
     this.show = data;
   });
 }

 backClicked() {
   this.location.back();
 }

 addToWatchlist() {
   this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
   let preq = this.http.post('https://rest-in-pitch.herokuapp.com/rest/watchlist/' + this.id, this.user, { responseType: 'text' });
     preq.subscribe(res => {
        window.location.reload();
       }, (err) => {
         console.log(err);
       }
     );
   }

   checkWatchlist() {
     this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
     this.http.post('https://rest-in-pitch.herokuapp.com/rest/watchlist/check/'+this.id, this.user, { responseType: 'text' }).subscribe( data => {
         this.inWatchlist = data.toString() === 'true' ? true : false;
        }, (err) => {
          console.log(err);
      }
   );
   }

   deleteFromWatchlist(){
     this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
    //  this.http.delete('https://rest-in-pitch.herokuapp.com/rest/watchlist/'+this.id, { body : this.user, responseType: 'text' }).subscribe(res => {
    //       window.location.reload();
    //     }, (err) => {
    //       console.log(err);
    //     }
    // );

    this.http.request('DELETE','https://rest-in-pitch.herokuapp.com/rest/watchlist/'+this.id,{ body : this.user, responseType: 'text' }).subscribe(res => {
          window.location.reload();
        }, (err) => {
          console.log(err);
        }
    );
   }

}
