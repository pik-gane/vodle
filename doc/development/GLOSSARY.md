# Glossary of terms used in vodle UI and code

### Abstention
When a [voter's](#voter) [ratings](#rating) for all [options](#option) are zero, that voter *abstains* and thereby does not control any portion of the [share](#share). An abstaining voter is treated completely equivalent to a person who does not participate in the poll at all and does not specify any ratings.

### Approval
At each point in time after a [poll](#poll) has started, each [voter](#voter) either *approves* or does *oppose* (=*not approve*) each [option](#option). Whether she approves an option depends on her current [effective rating](#effective-rating) and on every other non-[abstaining](#abstention) voter's effective rating. If her effective rating is *r*, she approves the option if and only if strictly less than *r* percent of all non-abstaining voters oppose the option. 

Note that this is a recursive definition of "approval" which needs to be solved by a suitable **algorithm.** That algorithm is rather simple: Given all non-abstaining voters and their effective ratings of the option, we find the smallest value *r* such that strictly less than *r* percent of these ratings are smaller than *r*. Everyone with an effective rating at least *r* then approves, the others don't oppose. This procedure is visualized on the app's [ExplainApproval](../../src/app/explain-approval/explain-approval.page.html) page.

We make sure that every non-abstaining voter approves at least one option, see [effective rating](#effective-rating).

Based on everyone's approvals (in combination with the current [ranking](#ranking)), the [shares](#share) of all options are calculated during [tallying](#tallying).

*Note on language:* We say a voter *"approves an option"* and not that she "approves *of* an option" to make clear that this is a formal act rather than an expression of opinion.

### Approval score
At each point in time, each [option](#option) has an *approval score* between 0 (=0%) and 1 (=100%) which equals the percentage of non-[abstaining](#abstention) [voters](#voter) who currently [approve](#approval) the option. 
The approval scores are used to determine the [ranking](#ranking) and thereby influence the [shares](#share). 

### Ballot
See [voting interface](#voting-interface).

### Client
When a [voter](#voter) has [delegated](#delegation) to another voter, we say she is the *client* in this relationship, while the other voter is the [(direct) delegate](#direct-delegate). 

### Closing
When a [poll](#poll) reaches its [due date](#due-date-and-time), it is *closed*. No-one can change any ratings or delegations from that point on, and a final [tally](#tallying) is performed to determine the [results](#results).

### Delegate
[direct](#direct-delegate), [indirect](#indirect-delegate), [effective](#effective-delegate), [voter](#voter), [ratings](#rating)

### Delegation


### did

### Direct delegate

### Due data and time
[poll](#poll), [winner](#winner), [shares](#share)

### Effective delegate
[voter](#voter), [delegate](#delegate)

### Effective rating

### Indirect delegate

### News
[nid](#nid)

### nid
[news](#news)

### oid
[option](#option)

### Opposition
The opposite of [approval](#approval).

### Option
[oid](#oid)

### pid
[poll](#poll)

### Poll
[options](#option), [voters](#voter), [ratings](#rating)

### Poll database

### Poll data item

### Poll password

### Proxy rating

### Ranking
(not to be confused with [rating](#rating))

At any time, the [options](#option) in a [poll](#poll) are *ranked* (=sorted) from top to bottom of the [voting interface](#voting-interface) in order of descending [approval score](#approval score). Options that have the same approval score are ranked by descending [total ratings score](#total-ratings-score). So, 'higher-ranked' means having a higher approval score or equal approval score and higher total ratings score.

The ranking determines to which of a [voter](#voter)'s [approved](#approval) options that voter's [share](#share) goes: it goes to the highest-ranked option among those options she approves.

### Rating
[voter](#voter), [option](#option), [approval](#approval), [effective rating](#effective-rating), [proxy rating](#proxy-rating)

### Results

### Share
[option](#option)

### Tallying

### Total ratings score
The *total ratings score* of an [option](#option) equals the sum of all [effective ratings](#effective-rating) the option received from all [voters](#voter).

### User
(not to be confused with [voter](#voter))

A *user* is a person who uses vodle on one or more devices to initiate or participate in one or more [polls](#poll). A user is identified across devices and sessions by the cryptographic hash value of the combination of her *email address* and [user password](#user-password). This way, no-one except the user herself can infer anyone's email address. 

In each poll the user participates in, she has a poll-specific [voter](#voter) identity that no-one can link to her user identity or to the voter identities she has in other polls.

### User database

### User data item

### uid
[user](#user)

### User password
The password the [user](#user) specifies together with her email address to be able to access her [user database](#user-database) from different devices (roaming). Not to be confused with a [poll password](#poll-password). 

### Voter
[user](#user), [vid](#vid)

### Voter data item

### Voting interface


### Winner
[option](#option), [poll](#poll)

### Winning probability
[option](#option), [share](#share)

