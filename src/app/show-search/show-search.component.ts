import { ViewChild, Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-search',
  templateUrl: './show-search.component.html',
  styleUrls: ['./show-search.component.css']
})

export class ShowSearchComponent implements OnInit {
  shows: any;
  name = "query"

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // let str : string = (<HTMLInputElement>document.getElementById("search")).value;
    //this.getSearchShow(this.route.snapshot.queryParams["name"]);
  }

  getSearchShow(query) {
    this.http.get('http://localhost:8080/rest-in-pitch/rest/shows/search',
    {
      params: {'name' : query}
      }).subscribe(data => {
        this.shows = data;
      });
  }


}
