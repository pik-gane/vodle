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
But if no option has the support of all voters, this means there is incomplete consensus.
To give all voters the same influence, vodle cannot simply declare the most-supported option the winner.
Instead, it must follow an approach similar to a green-card lottery then:
one voter is drawn by lot, and an option supported by that voter wins.
Still, even then the broadest possible consensus is sought: 
among the options supported by the drawn voter, the one with the largest overall support wins. 
`],
["Why should I accept that chance may play a role?", `
vodle uses chance only to make sure everyone has a fair chance of being heard.
One can prove mathematically that it is not possible to give all voters the same power without using some amount of chance in some situations.
You can make sure that chance does <i>not</i> play a role if you find an option that everyone can support and give that option at least a rating of 1.
On the other hand, chance is an unavoidable ingredient of life. 
Even if a vote tallying rule does not explicitly use chance, the overall decision process always contains chance elements anyway in the real world:
at what time a decision is sought, what options are on offer, which voter has which information, what the consequences of the options would be 
– all these questions involve some chance element.
`],
["Why are the ratings not simply summed up?", `
Simply summing up all ratings for an option might sound like a good idea at first, but it would not give every voter a fair chance of influencing the result.
Imagine there are two polar options A and B, with A being favoured by 55% of voters and B by 45%,  
and assume there is a potential consensus option C that all voters consider almost as good as their favourite option. 
Then one would want C to win, and vodle makes this very likely.<br/>
But if instead ratings would simply be summed up, 
then the 55% A-voters could rate A at 100 and rate B and C at 0. 
Then A would wins for sure, no matter what the ratings of the other 45% are.
So those 45% would have no influence on the result at all, and the potential consensus option would not have a chance of winning.<br/>
With vodle however, the same "noncooperative" ratings would guarantee A only a winning probability of 55% rather than 100%
since every group of voters can only control a share of the winning probability that equals their share of voters.
If C is a potential consensus, those 55% would prefer getting C for sure rather than getting A with only 55% probability and getting B with 45% probability.
So with vodle, the 55% would give C a positive rating, and so would the other 45%.
This way, both factions avoid the uncertain lottery outcome A or B and rather make C the sure winner.
One can even prove using game theory that such ratings form a very strong form of strategic equilibrium when voters are rational.<br/>
One can also prove similarly, that when ratings were simply summed up instead, rational voters would never give a rating other than zero or 100 to any option,
and a majority would always get their will however slight the majority is, so that method would not be much different from plain majority voting.
`],
["Why should I rate <i>at least one</i> option at 100?", `
A rating of 100 does not mean that you are completely happy with that option!
It rather means that this option is the best or least bad <i>among those options on offer</i>.
If you give no option a rating of 100, it may happen that your vote is wasted since you end up supporting no option at all.
By giving at least one option a rating of 100, you make sure that you retain control over a fair share of the overall decision power
and that the share of winning probability that you control does not go to any option that you rate at zero. 
`],
["Why should I give <i>more than one</i> option a <i>positive</i> rating?", `
If everyone gives just one option a positive rating, the winner will be determined by lot 
and every option wins with a probability equal to its support among voters.
No potential consensus option would get a chance.
This highly random result can be avoided by giving potential consensus options a positive rating as well.
By doing so, you indicate that you would agree to transfer the share of winning probability controlled by you
from your favourite option to the consensus option if other voters do so as well. 
`],
["Which options should get a positive rating?", `
A good rule of thumb is to give an option a positive rating if it is "better than average".
`],
['What does "better than average" mean?', `
Imagine one voter was drawn by lot and could decide on their own. Let's call this the "random dictator lottery".
Now for each option, you ask yourself: would I rather have this option for sure than having the random dictator lottery performed?
If the answer is yes, this option is "better than average" and should get a positive rating.<br/>
If you have no idea about the other voters' preferences, 
you could assume that every option has roughly the same support among voters.
As the poll evolves, you can watch the degree of support each option gets
and thus improve your estimate of what the random dictator lottery would bring.
`],
['How large should a rating for a "better-than-average" option be?', `
If you have an idea about the views of the other voters,
you should set your rating in the following way.
First, you estimate what percentage of the voters finds this option better than average as well (like you).
Let's say you think 63% of voters find the option better than average.
Then you subtract this from 100 (which gives 37 in this example) and add some safety margin (giving something like 40 in the example).
This should be your rating.<br/>
<i>Why?</i> Because if the other potential supporters of the option do the same, 
then vodle will correctly register you as a supporter of this option:
your rating (40) plus the percentage of other supporters (63) will exceed 100,
and this is the criterion for support that vodle uses.<br/>
<b>And what if I have no idea about potential supporters?</b>
Then a good rule of thumb is to scale your ratings from 0 to 100 according to your relative preference.
0 would mean "just average" and 100 would mean "best of the available options".
As the poll evolves, you can watch how the support for each option grows,
and you can test how far to the right you have to move your slider before the support increases.
If other voters have already set their ratings based on the above rule of thumb,
the light support bar should start moving towards your slider once your rating gets large enough.
`],
["Why should I not give <i>too many</i> ratings of 100?", `
By giving a compromise option a positive rating smaller than 100, 
you indicate that you will support this option only if enough other voters do so as well. 
This way, you give other voters an incentive to also give that option a positive rating.
If you gave the option a rating of 100, other voters could simply rate it at 0.
The result could be that your share of the winning probability would be transferred from your favourite option to the compromise option,
but the other voters' shares would remain with their favourite options. 
This would be no compromise but would only be to your disadvantage.
Only giving a rating properly between 0 and 100 can ensure that you and other voters <i>collectively</i> 
transfer your shares from your various favourite options to the compromise option.
`],
["What if no option appeals to everyone?", `
Ideally, some option <i>would be</i> considered better than average by all voters if they are honest,
and in that case a very small positive rating of just 1 would suffice to make this option the sure winner.
But in reality, even then there will likely be some small percentage of voters 
who do not realize that this option would make a good consensus and would rate it at zero instead.
This is why you should add some safety margin to your rating, and rather give a rating of, say, 5 or 10, than just 1.<br/>
If there really is no option with almost full consensus potential, 
there might still be one that at least appeal to, say, 80 percent.
In that case, these 80% should give it a rating of 100 – 80 = 20, 
plus some safety margin, so maybe a rating of 25.
This way, this broad "partial" consensus option wins with a very large probability of 80%,
and the remaining 20% winning probability remain under the control of the minority 20% 
who cannot agree to that consensus, which is only fair.
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
