import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseManagerService } from 'src/app/database-manager.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MemberClass } from '../model/memberClass';
import { DialogAttendClassComponent } from '../dialog-attend-class/dialog-attend-class.component';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  memberClasses = new Array<any>();

  totalPaid: number = 0;

  member: any;
  memberId: string;

  yearLabel: number = 2020;
  years = new Array<number>();

  yearAttendanceForm = new FormGroup({
    yearControl: new FormControl('',)
  })

  constructor(
    private route: ActivatedRoute,
    private databaseManager: DatabaseManagerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.memberId = id;
        this.databaseManager
        .getMemberById(id)
        .subscribe(res => {
          this.member = res.data()
        })
      }
      this.populateYearDropdown();

      this.getMemberClasses();
    })
  }

  yearChanged(): void {
    this.databaseManager.classYearSelected = Number(this.yearAttendanceForm.get('yearControl').value);
    this.getMemberClasses();
    this.calculateTotalPaid();
    this.yearLabel = this.databaseManager.classYearSelected;
  }

  openAttendClassDialog() {
    this.dialog.open(DialogAttendClassComponent, {
      width: '50%', data: this.memberId}).afterClosed().subscribe(() => {
        this.getMemberClasses()
      })
  }

  getMemberClasses() {
    this.memberClasses = []
    this.databaseManager.getMemberClasses(this.memberId, this.databaseManager.classYearSelected)
    .subscribe(data => {
      data.forEach(element => {
        this.memberClasses.push(element.data())
      });
      this.calculateTotalPaid()
      this.yearLabel = this.databaseManager.classYearSelected;
      this.yearAttendanceForm.controls['yearControl'].setValue(this.databaseManager.classYearSelected)

    })
  }

  populateYearDropdown() {
    var d = new Date();
    var year = d.getFullYear();

    for (let i = 0; i < 3; i++) {
      this.years.push(year - i)
    }
  }

  calculateTotalPaid() {
    this.totalPaid = 0;
    this.memberClasses.forEach(memClass => {
      this.totalPaid += memClass.amountPaid;
    });

  }

}
