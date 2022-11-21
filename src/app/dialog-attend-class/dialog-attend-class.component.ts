import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MemberClass } from '../model/memberClass';
import { DatabaseManagerService } from 'src/app/database-manager.service'
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChildActivationEnd } from '@angular/router';


@Component({
  selector: 'app-dialog-attend-class',
  templateUrl: './dialog-attend-class.component.html',
  styleUrls: ['./dialog-attend-class.component.scss']
})
export class DialogAttendClassComponent implements OnInit {

  attendClassForm = new FormGroup({
    className: new FormControl('', Validators.required),
    classDate: new FormControl('', Validators.required),
    amountPaid: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAttendClassComponent>,
    private databaseManager: DatabaseManagerService, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.attendClassForm.valid) {
      this.toastr.error('Error!', 'Missing fields');
      return;
    }

    const classDate: string = this.attendClassForm.get('classDate').value;

    const dateSplitArray = classDate.split('-')

    const dateFormatted = this.formatDateToLocalToLocalString(dateSplitArray)

    const classYear = new Date(classDate).getFullYear();

    let memberClass: MemberClass = {
      className: this.attendClassForm.get('className').value,
      classDate: dateFormatted,
      year: classYear,
      amountPaid: this.attendClassForm.get('amountPaid').value,
    }

    this.databaseManager.memberAttendNewClass(this.data, memberClass)
    this.databaseManager.classYearSelected = memberClass.year
    this.toastr.info('Submited!', 'Now Attending Class');
    this.dialogRef.close()
  }

  formatDateToLocalToLocalString(classDateArray: string[]): string {
    return classDateArray[2] + '/' + classDateArray[1] + '/' + classDateArray[0];
  }

}
