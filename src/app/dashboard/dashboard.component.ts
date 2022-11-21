import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseManagerService } from 'src/app/database-manager.service'
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  members: any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 
  'addressLine1', 'town', 'county', 'edit'];

  constructor(
    private databaseManager: DatabaseManagerService, 
    private router: Router) { }

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getMembers()
  }

  getMembers() {

    this.databaseManager.getMembers()
      .subscribe(data => {
        this.members = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          }
        })
        this.dataSource = new MatTableDataSource(this.members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getMemberDetails(member: any) {
    const link = ['/detail', member.id];
    this.router.navigate(link);
  }

}
