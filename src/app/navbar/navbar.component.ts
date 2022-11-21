import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
  }

  dashboard(): void {
    this.router.navigate(['dashboard'])
  }


  newMember(): void {
    this.router.navigate(['/new-member'])
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
