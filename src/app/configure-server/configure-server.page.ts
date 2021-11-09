import { Component, OnInit } from '@angular/core';

/*
- ask for url, admin user + pwd. check connection.
- ask for db name, user, pwd. generate db and user, add user as member to _users
- config: max_doc_size, etc.
- security? do all users need to be mentioned in it?
- generate _design docs: validation functions, update functions
*/

@Component({
  selector: 'app-configure-server',
  templateUrl: './configure-server.page.html',
  styleUrls: ['./configure-server.page.scss'],
})
export class ConfigureServerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
