import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = <any>{};
  log = <any>{};
  errorlog: string;
  errorreg:string

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {}

  addUser() {
    this.user.password = sha512(this.user.password);
    this.http.post('https://rest-in-pitch.herokuapp.com/rest/user/register', this.user).subscribe(res => {
        // login :
        this.http.post('https://rest-in-pitch.herokuapp.com/rest/user/login', this.user,  { responseType: 'text'})
          .subscribe(res => {
            let usertmp = {
              username: this.user.username,
              password: this.user.password
            };
            localStorage.setItem('currentUser', JSON.stringify(usertmp));
            this.router.navigate(['/show']);
            }, (err) => {
            }
          );
      }, (err) => {
          this.errorreg=err.error;
        }
      );
  }

  login() {
    this.log.password = sha512(this.log.password);

    this.http.post('https://rest-in-pitch.herokuapp.com/rest/user/login', this.log,  { responseType: 'text'})
      .subscribe(res => {
          let usertmp = {
          username: this.log.username,
          password: this.log.password
        };
        localStorage.setItem('currentUser', JSON.stringify(usertmp));
        this.router.navigate(['/show']);
        }, (err) => {
          this.errorlog=err.error;
        }
      );
  }

  backClicked() {
    this.location.back();
  }

}
