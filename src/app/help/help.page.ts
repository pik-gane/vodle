import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  public e_short = true;
  public e_long = false;
  public e_faq = false;
  public e_q = [];

  public faqs = [
["What does a rating of 37 mean?", `
If you rate an option at 37 you promise to support that option if at least 63% of all voters support it as well. Why 63? Because 37 + 63 = 100.
`],
["What happens if I support an option?", `
If you support an option (green slider), you increase the likelihood that it wins (for single-winner polls) 
or the share of the budget it gets (for allocation polls).
`],
["How does my support affect the winning probabilities?", `
If a unique option is supported by all voters, it wins for sure.
Otherwise, one voter is drawn by lot and one of the options this voter supports will win.
If you are this voter, your support will decide which option wins:
among all options you support, the one with the largest overall support will win.
`],
["How does my support affect the allocated shares?", `
An option's share is proportional to the number of voters who support this option and support no other option with a larger overall support.
So if there are N voters in total, you control a share of 1/N of the total budget.
If you support only one option, this share under your control goes to that option.
If you support several options, your share goes to the one with the largest overall support among those options you support.
`],
["Why may the most-supported option still not win?", `
If a unique option is supported by all voters, it will win.
But if no option is supported by all voters, this means there is incomplete consensus.
To 
`],
/*
["", `
`],
*/
];

  constructor() { }

  ngOnInit() {
  }

}
