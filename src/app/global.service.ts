import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public myratings = new Object(); // dict by oid
  public otherratings = new Object(); // dict by oid, vid
  public approvals = new Object(); // dict by oid
  public probs = new Object(); // dict by oid
}
