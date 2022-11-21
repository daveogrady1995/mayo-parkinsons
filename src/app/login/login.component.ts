import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AngularFireAuth, 
    private toastr: ToastrService) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.loginForm.valid) {
      this.toastr.error('Error!', 'Missing fields');
      return;
    }

    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.toastr.success('Success!', 'You are now logged in');
      const link = ['/dashboard'];
      this.router.navigate(link);
    }).catch((error) => {
      this.toastr.error('Sign In', 'Email or password is incorrect');
    })


    
  }

}
