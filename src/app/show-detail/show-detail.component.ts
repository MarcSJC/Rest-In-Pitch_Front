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

  show= {};
  user: {};
  username: string;
  userSize: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');

    this.userSize = Object.keys(this.user).length;

    this.getShowDetail(this.route.snapshot.params['id']);
  }

  getShowDetail(id) {
   this.http.get('https://rest-in-pitch.herokuapp.com/rest/show/'+id).subscribe( data => {
     this.show = data;
   });
 }

 backClicked() {
   this.location.back();
 }

 addToWatchlist() {
   let id = Object.values(this.show)[0];
   this.user = localStorage.getItem('currentUser') ||'{}';
   let httpOpt = {
   		responseType: 'text'/*,
   		new HttpHeaders({
   			'Authorization': this.user
   		})*/
	}
   let preq = this.http.post('https://rest-in-pitch.herokuapp.com/rest/watchlist/add/' + id, this.user, httpOpt);
     preq.subscribe(res => {
       }, (err) => {
         console.log(err);
       }
     );
 }

}
