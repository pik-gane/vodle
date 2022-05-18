/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK) authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

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
