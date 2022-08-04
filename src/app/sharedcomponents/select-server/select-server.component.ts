/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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

import { Component, OnInit, Input } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { GlobalService } from "../../global.service";

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.component.html',
  styleUrls: ['./select-server.component.scss'],
})
export class SelectServerComponent implements OnInit {

  E = environment;
  Object = Object;

  showing_db_custom_password: boolean;

  @Input() page: string; // the name of that page provided in its template
  @Input() page_object; // the name of that page provided in its template

  selectServerFormGroup: UntypedFormGroup;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public G: GlobalService,
  ) { }

  ngOnInit() {
    this.G.L.entry("SelectServerComponent.ngOnInit");
    this.selectServerFormGroup = this.formBuilder.group({
      db: new UntypedFormControl(this.page=='settings'?'central':'default', Validators.required),
      db_from_pid: new UntypedFormControl('TODO', Validators.required),
      db_custom_server_url: new UntypedFormControl('', Validators.pattern(this.G.urlRegex)),
      db_custom_password: new UntypedFormControl('', Validators.required), // TODO: validator?
    });
    this.showing_db_custom_password = false;
    if (this.page_object) {
      this.page_object.onSelectServerReady(this);
    }
  }

  validation_messages = {
    'db_custom_server_url': [
      { type: 'required', message: 'validation.db-server-url-required' },
      { type: 'pattern', message: 'validation.db-server-url-pattern' }
    ],
    'db_custom_password': [
      { type: 'required', message: 'validation.db-pw-required' }
    ],
  }

  blur() {
    // TODO: remove focus from any input element and optionally set it on parent component's next element
  }
  
  set_db() {
    let c = this.selectServerFormGroup.get('db');
    if (c.valid && (c.value!='') && c.value) {
      this.page_object.set_db(c.value);
    }
  }
  set_db_from_pid() {
    let c = this.selectServerFormGroup.get('db_from_pid');
    if (c.valid) this.page_object.set_db_from_pid(c.value);
  }
  set_db_custom_server_url() {
    let c = this.selectServerFormGroup.get('db_custom_server_url');
    if (c.valid) this.page_object.set_db_custom_server_url(c.value);
  }
  set_db_custom_password() {
    let c = this.selectServerFormGroup.get('db_custom_password');
    if (c.valid) this.page_object.set_db_custom_password(c.value);
  }

}
