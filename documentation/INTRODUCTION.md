*This is a slightly more comprehensive summary of what vodle is than in the 
[README](README.md). More details can be found by following the links to individual 
[glossary](documentation/development/GLOSSARY.md) entries throughout this text.*

Vodle is a *web-app* (later also a *smartphone app*) that lets a 
[user](documentation/development/GLOSSARY.md#user) (the 
"initiator") set up a 
["poll"]](documentation/development/GLOSSARY.md#poll)
stating a collective decision problem such as 
choosing a single 
[option](documentation/development/GLOSSARY.md#option)
out of a number of options, choosing a fixed number 
of candidates from a list of candidates, distributing a budget of some sort 
(monetary, time, space, other resources) among a list of projects, etc. The 
initiator can then invite a selected group of 
["participants"](](documentation/development/GLOSSARY.md#participant) 
(or the general 
public) to participate in the poll by sending them an email containing an 
[invitation](documentation/development/GLOSSARY.md#poll-invitation)
link or direct message containing a deep link to the poll. The 
invited participants can then take part in an interactive, consensus-oriented 
decision process until the set deadline at which the poll will end. Once the 
poll [ends](documentation/development/GLOSSARY.md#closing),
the [results](documentation/development/GLOSSARY.md#results)
are determined by a certain 
[tallying algorithm](documentation/development/GLOSSARY.md#tallying) 
that was optimized for fairness and for giving participants incentives to find 
a good compromise and choose that compromise as a full or as-broad-as-possible 
consensus.

That social choice algorithm (published in this 
[theoretical paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3751225)) 
is based on the 
idea that participants may conditionally commit to 
[approve](documentation/development/GLOSSARY.md#approval) 
an option if enough 
other participants do so as well. To this end, each participant can give each 
option a ["wap"](documentation/development/GLOSSARY.md#wap) 
(willingness to approve) between 0 and 100, where 0 means 
"don't approve", 100 means "approve for sure", and 1..99 means "approve 
conditionally". More precisely, a wap of X means the participant will approve 
iff strictly less than X% of all participants do not approve. The rationale for 
this mechanism is that this gives participants an incentive to approve good 
compromise options without risking that participants with opposing preferences 
exploit this cooperative behaviour (somewhat similar to a prisoners dilemma). 
(Rational participants can be proven to thus converge to a consensus.) A 
central feature is that participants can see the development of support for 
all options in real time in an aggregate, anonymized way, and can react to it 
by adding promising compromise options and adjusting their waps at any time 
before the deadline.

Once the poll [ends](documentation/development/GLOSSARY.md#ending), 
everyone's [waps](documentation/development/GLOSSARY.md#wap) 
are turned into [approvals](documentation/development/GLOSSARY.md#approval), 
and based on 
these every option gets a ["share"](documentation/development/GLOSSARY.md#share)
of the budget or of the overall winning 
probability. The share of an option equals the proportion of participants that 
approve that option but approve no other option that received more overall 
approval. In other words, each participant can be seen to "control" an equal 
share, which goes to the most popular option among those approved by that 
participant. This way, the mechanism gives all groups, whether in a majority or 
a minority, control over a fair share of the winning probability or budget, 
rather than concentrating all power on a (possibly very slight) majority.

Another central feature is that participants may 
[delegate](documentation/development/GLOSSARY.md#delegation) 
their specification 
of a wap for all or a selected number of options to some other participant 
that they trust and whose waps would then also count as the waps of the 
delegating participant, in a way similar to the concept of Liquid Democracy.

All data processing and tallying logics are implemented in the local front-end 
(browser or phone), the only central server component is a freely selectable 
public [database](documentation/development/GLOSSARY.md#user-database) 
(CouchDB) used for exchanging end-to-end encrypted data 
between the participants.

While many aspects of vodle are similar to d**dle, the main focus of vodle is 
not to collect data about preferences but to actually arrive at a collective
decision in a transparent, privacy-preserving, and consensus-oriented way.
