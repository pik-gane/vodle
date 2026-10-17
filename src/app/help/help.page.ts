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

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HelpPage implements OnInit {

  e_short = true;
  e_long = false;
  e_faq = false;
  /** which questions are open, by id */
  e_q: Record<string, boolean> = {};

  /** The FAQ, in the order shown. Each id names a question and its answer in
   *  the translation files, help.faq.<id>.q and help.faq.<id>.a. They were
   *  hard-coded here in English, so the FAQ was the one part of the help
   *  page that no translation could reach. */
  static readonly FAQ_IDS = [
    'pronounce', 'wap-37', 'approve', 'winning-probabilities', 'shares',
    'most-approved', 'chance', 'not-summed', 'one-at-100', 'more-than-one',
    'which-positive', 'better-than-average', 'how-large', 'not-too-many',
    'no-consensus', 'several-consensus', 'agreement', 'ai-assessment',
    // not yet written: why anonymous (minority protection, vote trading);
    // when and how to delegate (trust, better informed, similar
    // preferences); why control some waps yourself when delegating; why not
    // anonymous when delegated; why delegation chains; why sometimes reduce
    // a wap again
  ];
  faqs = HelpPage.FAQ_IDS;

  constructor(public translate: TranslateService) { }

  ngOnInit() { }

}
