import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService, Poll, Option } from "../global.service";

@Component({
  selector: 'app-explainsupport',
  templateUrl: './explainsupport.page.html',
  styleUrls: ['./explainsupport.page.scss'],
})
export class ExplainsupportPage implements OnInit {

  public Math = Math;

  public p: Poll;
  public oid: string;
  public o: Option; 
  public rs: number[];
  public rmin: number;
  public a: number;
  public cs: string[];
  public n: number;
  public myr: number;
  public myi: number;

  constructor(private route: ActivatedRoute, public g: GlobalService) { }

  ngOnInit() {
    let p = this.p = this.g.openpoll,
        oid = this.oid = this.route.snapshot.paramMap.get('oid'),  
        o = this.o = this.p.options[this.oid],
        rs = this.rs = [],
        rmin = p.rmins[oid],
        cs = this.cs = [],
        myr = this.myr = p.getRating(oid, p.myvid);
    for (let vid of p.vids) {
      rs.push(p.getRating(oid, vid));
    }
    rs.sort((a,b)=>a-b);
    let n = this.n = rs.length;
    for (let i=0; i<n; i++) {
      let r = rs[i];
      cs.push((r==0)?'#d33939':(r<rmin)?'#3465a4':'#62a73b');
    }
    this.myi = rs.indexOf(myr);
    this.a = p.apprs[oid];
  }

}
