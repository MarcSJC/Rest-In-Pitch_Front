import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
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
   this.http.get('http://localhost:8080/rest-in-pitch/rest/show/'+id).subscribe( data => {
     this.show = data;
   });
 }

 backClicked() {
   this.location.back();
 }

 addToWatchlist() {
   let id = Object.values(this.show)[0];
   this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
   this.http.post('http://localhost:8080/rest-in-pitch/rest/watchlist/add/' + id, this.user,  { responseType: 'text'})
     .subscribe(res => {
       }, (err) => {
         console.log(err);
       }
     );
 }

}
