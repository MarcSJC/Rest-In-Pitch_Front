import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  shows: any;
  res: string;
  user: {};
  userSize: number;
  username: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') ||'{}');
    this.userSize = Object.keys(this.user).length;
    if(this.user != null) {
      this.username = String(Object.values(this.user)[0]);
    }

    this.http.post('https://rest-in-pitch.herokuapp.com/rest/watchlist', this.user).subscribe(data => {
          this.shows = data;
        }, (err) => {
          console.log(err);
        }
      );
  }

  logout(){
    localStorage.clear();
    this.location.back();
 }

}
