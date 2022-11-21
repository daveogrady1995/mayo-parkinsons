import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { MemberClass } from './model/memberClass'

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  // temporary here to keep track of year selelcted shared between 2 components
  public classYearSelected: number = 2020;

  constructor(private db: AngularFirestore) { }

  getMembers() {
    return this.db.collection<any>('members').snapshotChanges()
  }

  getMemberClasses(id: string, classYear: number) {
    return this.db.collection<any>('members')
    .doc(id)
    .collection<any>('classes', ref => ref.where('year', '==', classYear))
    .get()
  }

  getMemberById(id: string) {
    return this.db.collection<any>('members').doc(id)
    .get()
    .pipe(first())
  }

  memberAttendNewClass(id: string, memberClass: MemberClass) {
    this.db.collection('members')
    .doc(id)
    .collection<any>('classes')
    .add(memberClass)
  }

}
