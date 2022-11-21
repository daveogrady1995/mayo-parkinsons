import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  constructor(
    private db: AngularFirestore, 
    private toastr: ToastrService) {}

  clientForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    town: new FormControl('', Validators.required),
    county: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.clientForm.valid) {
      this.toastr.error('Error!', 'Missing fields');
      return;
    }

    let member: Member = {
      firstName: this.clientForm.get('firstName').value,
      lastName: this.clientForm.get('lastName').value,
      addressLine1: this.clientForm.get('addressLine1').value,
      addressLine2: this.clientForm.get('addressLine2').value,
      town: this.clientForm.get('town').value,
      county: this.clientForm.get('county').value,
      phoneNumber: this.clientForm.get('phoneNumber').value,
      email: this.clientForm.get('email').value
    }
    this.db.collection('members').add(member).then(() => {
      this.toastr.success('Success!', 'Member created');
    }).catch(() => {
      this.toastr.error('Error!', 'Failed to create member');
    })
  }

}
