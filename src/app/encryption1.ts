import * as forge from "node-forge";
//var myenc = require("encryption.js");
import { Component, OnInit } from "@angular/core";
import { GlobalService } from "./global.service";

export class Encryption {
  private privkey: string;
  public pubkey: string;
  public rsa = forge.pki.rsa;
  constructor() {}
  generatePair() {
    var keypair = this.rsa.generateKeyPair();

    var msg = "hallo hoffentlich";

    var pu = keypair.publicKey.encrypt(msg);

    var de = keypair.privateKey.decrypt(pu);

    console.log(pu + de);
  }
}
