import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = <any>{};
  log = <any>{};

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {}

  addUser() {
    this.http.post('http://localhost:8080/rest-in-pitch/rest/user/register', this.user).subscribe(res => {
        // login :
        this.http.post('http://localhost:8080/rest-in-pitch/rest/user/login', this.user,  { responseType: 'text'})
          .subscribe(res => {
            localStorage.setItem('currentUser', res);
            this.router.navigate(['/show']);
            }, (err) => {
              console.log(err);
            }
          );
      }, (err) => {
          console.log(err);
        }
      );
  }

  login() {
    this.http.post('http://localhost:8080/rest-in-pitch/rest/user/login', this.log,  { responseType: 'text'})
      .subscribe(res => {
        localStorage.setItem('currentUser', res);
        this.router.navigate(['/show']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  backClicked() {
    this.location.back();
  }

}
