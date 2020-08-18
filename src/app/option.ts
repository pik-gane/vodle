import { GlobalService } from "./global.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs/operators";
//import { Storage } from "@ionic/storage";
//import { IGroup } from "./igroup";
import { Observable } from "rxjs";
import { IPoll } from "./ipoll";
import { IOption } from "./ioption";
import { Poll } from "./poll";
import { promise } from "protractor";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Option {
  constructor(
    public oid: string,
    public rev: string,
    public name: string,
    public desc: string,
    public uri: string
  ) {
    // this.p = p;
    // if (data) {
    //   for (let a of this.option_attributes) {
    //     if (a in data) {
    //       GlobalService.log("  " + a + ":" + data[a]);
    //       this[a] = data[a];
    //       GlobalService.log("    stored: " + this[a]);
    //     }
    //   }
    // }
    // this.registerOption();
    // GlobalService.log("option object for " + this.oid + " constructed");
    //    this.getCompleteState();
  }
}
