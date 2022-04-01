# Glossary of terms used in vodle UI and code

*(If you read this on GitHub, you can access a table of contents via the* ⋮☰ *button in the top-left corner of this panel)*

### Abstention
When a [voter's](#voter) [effective ratings](#effective-rating) for all [options](#option) are zero, that voter *abstains* and thereby does not control any portion of the [share](#share). An abstaining voter is treated completely equivalent to a person who does not participate in the poll at all and does not specify any ratings.

### Approval
At each point in time after a [poll](#poll) has started, each [voter](#voter) either *approves* or does *oppose* (=*not approve*) each [option](#option). Whether she approves an option depends on her current [effective rating](#effective-rating) and on every other non-[abstaining](#abstention) voter's effective rating. If her effective rating is *r*, she approves the option if and only if strictly less than *r* percent of all non-abstaining voters oppose the option. 

Note that this is a recursive definition of "approval" which needs to be solved by a suitable **algorithm.** That algorithm is rather simple: 
Given all non-abstaining voters and their effective ratings of the option, we find the smallest value *r* such that strictly less than *r* percent of these ratings are smaller than *r*. This number *r* is called the [approval threshold](#approval-threshold) of the option.
Everyone with an effective rating at least *r* then approves, the others don't oppose. 
This procedure is visualized on the app's [ExplainApproval](../../src/app/explain-approval/explain-approval.page.html) page.

We make sure that every non-abstaining voter approves at least one option, see [effective rating](#effective-rating).

Based on everyone's approvals (in combination with the current [ranking](#ranking)), the [shares](#share) of all options are calculated during [tallying](#tallying).

*Note on language:* We say a voter *"approves an option"* and not that she "approves *of* an option" to make clear that this is a formal act rather than an expression of opinion.

### Approval threshold
The *approval threshold* of an [option](#option) is the smallest [effective rating](#effective-rating) at which the [voters](#voter) [approve](#approval) the option. 
It is determined during [tallying](#tallying) by finding the smallest number *r* between 0 and 100 for which the percentage of non-[abstaining](#abstention) voters who have an effective rating strictly below *r* is strictly smaller than *r*.
All voters with an effective rating at least *r* then approve the option, the others [oppose](#opposition) the option.

### Approval score
At each point in time, each [option](#option) has an *approval score* between 0 (=0%) and 1 (=100%) which equals the percentage of non-[abstaining](#abstention) [voters](#voter) who currently [approve](#approval) the option. 
The approval scores are used to determine the [ranking](#ranking) and thereby influence the [shares](#share). 

### Ballot
Instead of a traditional ballot on which a voter makes some choices once and then submits it, vodle uses an interactive [voting interface](#voting-interface).

### Client
When a [voter](#voter) has [delegated](#delegation) to another voter, we say she is the *client* in this relationship, while the other voter is the [(direct) delegate](#direct-delegate).
Only the delegate will know the identity of the client, as soon as the client sends her the delegation request.

### Closing
When a [poll](#poll) reaches its [due date](#due-date), it is *closed*. No-one can change any ratings or delegations from that point on, and a final [tally](#tallying) is performed to determine the final [shares](#share). 
For polls of [type](#poll-type) "winner", also the [winner](#winner) of the poll is then drawn on the basis of these shares. 
See also [results](#results).

### Database username
We control access to [user data](#user-data-item), [poll data](#poll-data-item) and [voter data](#voter-data-item) in the [user database](#user-database) and [poll databases](#poll-database) by defining several technical *database usernames* in the respective CouchDB servers.

- The username `vodle` is used to create the other database usernames and to write [poll data](#poll-data-item). 
- Usernames of the form `vodle.user.UUU`, where `UUU` is the hash of the combination of user email address and [user password](#user-password), are used to write [user data](#user-data-item).
- Usernames of the form `vodle.voter.VVV`, where `VVV` is a [voter ID](#vid), are used to write [voter data](#voter-data-item).

(See comments in [DataService](../../src/app/data.service.ts) for details)

### Delegate
If a [voter](#voter) acts as a *delegate* for another voter, some or all of her [(proxy) ratings](#rating) are also used as the [proxy ratings](#proxy-rating) of the other voter. 

If *D* is a delegate for *A* then *D* is either *A*'s [direct delegate](#direct-delegate) (if *A* has sent a [delegation request](#delegation-request) to *D* that *D* has accepted),
or is an [indirect delegate](#indirect-delegate) for *A* (if there is a sequence of direct delegations from *A* to *D* via some intermediate delegates).

### Delegation
Instead of choosing [ratings](#rating) herself, a [voter](#voter) can also ask another voter who participates (or is authorized to participate) in the same poll to act as her [delegate](#delegate) via a [delegation request](#delegation-request). If the prospective delegate accepts the request, the first voter becomes the [client](#client) and the second voter the [direct delegate](#direct-delegate) in this relationship. 
As a consequence, some or all of the delegate's proxy ratings will automatically be used as the client's [proxy ratings](#proxy-rating) as well, instead of the client's [own ratings](#own-rating).
This is as long as the client's request is not withdrawn and the delegate's acceptance is not revoked. During that time, the client can also switch the delegation on and off for individual [option](#option) via [delegation toggles](#delegation-toggle) and thus control the [proxy ratings](#proxy-rating) of certain options herself via her [own ratings](#own-rating).

The delegate can also delegate her own and her client's ratings further to some third voter. This way, a complex delegation network can emerge in which some voters effectively rate on behalf of a smaller or larger number of other voters. Those voters, who have not themselves delegated, are the [effective delegates](#effective-delegate). 

We make sure that the delegation network has no cycles by preventing that a voter agrees to a delegation request that would create a cycle.
Also, vodle currently enforces a limit to the number of other voters a voter may have as direct or indirect clients. This limit is currently set at 9. 

In a future release, a voter may herself set a limit on how many steps her ratings may be delegated further, and how many (indirect or direct) clients her effective delegate may have. Also, in a future release a voter may delegate her rating of different options to different delegates. To prepare for this, the code already now manages all delegations on the level of individual options.

### Delegation request
When a [voter](#voter) requests [delegation](#delegation) to another voter, vodle asks her to sent a *delegation request* containing a *delegation request link* to the other voter either by email, by her smartphone's share capabilities, or by copying the delegation request link and sending it to the other voter in any other way.

When the prospective delegate opens the delegation request link, she is asked to either *accept* or *decline* the request. She can change her choice at any time later via her [voting interface](#voting-interface).

In principle, the delegate can learn the client's [voter ID](#vid) from the delegation request and thus learn about her ratings even without accepting the request, and the client can learn the delegate's voter ID as soon as the delegate answers the request. In practise, the app will however not show either of the two this information. Still, as soon as the delegate accepts the request, both will know each other's proxy ratings because the delegate control both and the client it shown the resulting ratings in her own [voting interface](#voting-interface).

Each delegation request has a unique [Delegation request ID (did)](#did).

### Delegation toggle
When a [voter](#voter) has [delegated](#delegation) to another voter, her [voting interface](#voting-interface) shows a toggle behind each [option](#option)'s [rating slider](#rating-slider) which she can use to determine whether for this particular option, either her [own rating](#own-rating) or the [(proxy) rating](#proxy-rating) of her [delegate](#delegate) shall be used as he [proxy rating](#proxy-rating).

### did
A *did* is the unique ID of a [delegation request](#delegation-request).

### Direct delegate
If a [voter](#voter) *A* has asked  via a [delegation request](#delegation-request) another voter *D* to act as her [delegate](#delegate), and if *D* has accepted the request, then *D* is *A*'s *direct delegate* and *A* is *D*'s [client](#client).

### Due date
When a [poll](#poll) is started, the settings made by the poll's creator determine the exact point in time at which the poll will [close](#closing), which is called the *due date* (and time) in the code. In the app, we use the formulation *"the poll closes on ..."* and *"closing date"* instead.

### Effective delegate
If a [voter](#voter) *A* has [delegated](#delegation) to some other voter, one can follow the sequence of delegations from *A* forward through all of *A*'s [direct](#direct-delegate) and [indirect delegates](#indirect-delegate) and will arrive at a voter who has not delegated herself to any other voter. That voter voter is *A*'s *effective delegate*. The [ratings](#rating) of *A*'s effective delegate are used as *A*'s [proxy ratings](#proxy-rating) instead of the ratings that *A* might have selected herself before delegating.


### Effective rating
A [voter](#voter)'s *effective rating* of an [option](#option) is an auxiliary form of rating used to make sure that every non-[abstaining](#abstention) voter [approves](#approval) at least one option. 
It is calculated from her [proxy rating](#proxy-rating) of this option and her proxy ratings of all other options in the following way:
If her proxy ratings of all options are all zero, then her effective ratings of all options are also zero and she abstains.
If her proxy rating of at least one option is 100, then her effective ratings of all options equal her proxy ratings of those options.
Only if her largest proxy rating is properly between 0 and 100, the effective ratings differ from her proxy ratings: In that case, the effective rating(s) of those option(s) that received her highest proxy rating are set to 100 to make sure she approves her highest-rated option(s); the effective ratings of all other options equal their proxy ratings also in this case.

In other words: A voter's effective ratings equal her proxy ratings, only if the largest rating is larger than zero but smaller than 100, the corresponding effective rating is moved up to 100.

The effective ratings are then used to determine who [approves](#approval) what.

### Indirect delegate
If a [voter](#voter) *A* has delegated to some other voter *B* who in turn has delegated to another voter *C* and so on, then all of *B*, *C*, etc. are *indirect delegates* of *A*. The final voter in this delegation sequence is *A*'s [effective delegate](#effective-delegate).

While *A* knows the identity of her [direct delegate](#direct-delegate) *B*, she won't know the identity of her indirect delegates or her effective delegate.

In a later release, voters may restrict how long this delegation sequence may get.

### News item
A *news item* is a small message notifying the user about some relevant event. In contrast to other notifications that may occurr immediately as a consequence of the user's actions, such as the notification that a link was copied, news items notify the user about events triggered by other users' actions, such as new options being added to a poll, delegation requests being answered, etc.

News items appear at the top of the *My polls* page and the [voting interface](#voting-interface) as cards that can be dismissed.

Each news item has a unique [ID](#nid).

### nid
The globally unique ID of a [news item](#news-item).

### oid
The ID of an [option](#option), unique in the [poll](#poll)'s scope.

### Opposition
The opposite of [approval](#approval).

### Option
Options are the entities that [voters](#voter) in a [poll](#poll) collectively decide about.

If the [poll type](#poll-type) is "winner", the options represents mutually exclusive alternatives of which the group must collectively select exactly one. In other words, in a "winner" poll, the question the group faces can be formulated as "either option A or option B or option C ...".  

If the poll type is "share", the options represent possible targets, activities, recipients, etc., between which the group must collectively divide some given budget or resource. So in a "share" poll, the question the group faces can be formulated as "how much for A, how much for B, how much for C ...".

Each option has a unique [option ID](#oid).

### Own rating
A [voter](#voter)'s *own rating* of an [option](#option) is the rating she herself gives by adjusting the [rating slider](#rating-slider) of that option. It is only relevant if she has not [delegated](#delegation) her rating of that option to another voter. If she hasn't, her *own rating* also becomes her [proxy rating](#proxy-rating) of the option. Otherwise, her *own rating* is ignored and her [delegate](#delegate)'s proxy rating of the option also becomes her proxy rating of the option.

### pid
The globally unique ID of a [poll](#poll).

### Poll
A *poll* is the central object type in vodle. 
A poll represents a single decision problem for some group of users. 
In each poll, there are two or more [options](#option). 

There are several [poll types](#poll-type).
The poll type determines whether, as the final [result](#results) of the poll, 
one option will be declared the winner of the poll,
or whether option will be assigned some share of a certain resource or budget, etc.

During its lifetime, a poll lives through three successive [states](#poll-state): *draft*, *running*, and *closed*.

As soon as a user starts drafting a poll, the poll is "born" in state *draft*. 
Once the user has finished creating the poll and starts it, is becomes *running*. 
While it is *running*, [users](#users) who get invited to participate in the poll can take the role of a [voter](#voter) in the poll and use the [voting interface](#voting-interface) to see and influence the intermediate [results](#results) of the poll by [rating](#rating) and/or [delegating](#delegation), and to add further options.
Once the [due date](#due-date) of the poll is reached, the poll gets [*closed*](#closing) and the final results are determined.

Each poll has a unique [poll ID](#pid).

### Poll cache
The contents of each [poll database](#poll-database), i.e., the poll's [poll data items](#poll-data-item) and [voter data items](#voter-data-item), are mirrored for performance reasons as key-value pairs in a simple hash table (a typescript object of type Record) called a *poll cache*.

### Poll database
For each [poll](#poll), there are three types of relevant data:
1. data that is only *relevant for one* [voter](#voter) (e.g., a personal note),
2. data that is *relevant for all* voters of the poll but is *owned by one* voter (e.g., a rating), and
3. data that is *common to all voters* of the poll (e.g., the poll's title).

The first type of data is stored as [user data items](#user-data-item) in the voter's [user database](#user-database) to allow roaming.

The other two types of data are stored in the form of [voter data items](#voter-data-item) (2.) and [poll data items](#poll-data-item) (3.). 
Both these types are exchanged between the voters via the poll's *poll database*, 
which is some CouchDB database that all voters have access to. 
Several polls might use the same CouchDB database as their poll database without any interference between the different polls.
Indeed, by default all polls use the same CouchDB database called "vodle central".

### Poll data item
A *poll data item* is a data item that is related to a particular [poll](#poll) and is common to all [voters](#voter) in that poll (rather than owned by a single voter, compare [voter data item](#voter-data-item)).
It is stored as a key-value pair in the [poll database](#poll-database) and the [poll cache](#poll-cache).
Most poll data items are also implemented as properties of the class `Poll`. 
Examples of poll data items are the poll's [type](#poll-type), title, description, "read-more"-URL, [due date](#due-date), and [state](#poll-state), and all [option](#option)'s names, descriptions, and "read-more"-URLs.
A poll data item can be created by any voter in a poll, can be decrypted and thus read by all voters in the same poll by using the [poll password](#poll-password), but can usually neither be updated nor deleted. (Only the [poll state](#poll-state) can be updated according to certain rules.)

### Poll invitation
After a [poll](#poll) has been started, its creator is asked to invite participants by sending them a *poll invitation* containing a *poll invitation link* either by email, by her smartphone's share capabilities, or by copying the poll invidation link and sending it to the prospective participants in any other way.

When a prospective participant opens the poll invitation link, vodle fetches the poll data from the [poll's database](#poll-database) and registers the participant as a [voter](#voter) in this poll with a randomly generated [voter ID](#vid).

In the current version, poll invitations are not personalized, so every participant receives the same link, and everyone who gets access to the link can participate, in principle several times as different voters if she uses vodle on several devices with different email addresses.

In a future release, poll invitations will optionally be personalized with the help of a key distribution server (see [Architecture](ARCHITECTURE.md)).

### Poll password
(not to be confused with [user password](#user-password))

All the [poll data](#poll-data-item) and [voter data](#voter-data-item) of a [poll](#poll) that is stored in its [poll database](#poll-database) is encrypted with a poll password that is only known by the poll's [voters](#voter), or, more precisely, by everyone how has access to the [poll invitation link](#poll-invitation). 

So poll passwords are used to restrict who can read a [poll](#poll)'s data, but not who has write access to it. 
Instead, write access is controlled by document validation functions in the CouchDB server.

### Poll state
Each [poll](#poll) is first in state *draft*, then *running*, then *closed*. See [poll](#poll) for details.

### Poll type
Each [poll](#poll) is of either of the following types:
- In a poll of type "winner", marked by a "trophy" icon in the UI, the group must collectively pick exactly one of several mutually exclusive options (or "alternatives").
- In a poll of type "share", marked by a "scissors" icon in the UI, the group must collectively divide a certain budget or resource (money, time, space, etc.) among several options (targets, recipients, projects, activities, etc.)
 
In a future release, there might be further types, such as a "fixed number of winners" type in which the group collectively picks a predetermined number (e.g., three) of the options.

The type determines what kind of [results](#results) the poll has and how these are determined in the [tallying](#tallying) procedure and presented in the [voting interface](#voting-interface). 

### Proxy rating
A [voter](#voter)'s *proxy rating* of a certain [option](#option) is an intermediate form of rating used in [tallying](#tallying). It is the form of rating that is shown by the [ratings sliders](#rating-slider) in the[voting interface](#voting-interface).

If the voter has not [delegated](#delegation) her rating of that option, her proxy rating equals her [own rating](#own-rating) of that option. If she has delegated, her proxy rating equals the own rating of her [effective delegate](#effective-delegate). It then also equals the proxy rating of her [direct delegate](#direct-delegate).

### Ranking
(not to be confused with [rating](#rating))

At any time, the [options](#option) in a [poll](#poll) are *ranked* (=sorted) from top to bottom of the [voting interface](#voting-interface) in order of descending [approval score](#approval score). Options that have the same approval score are ranked by descending [total ratings score](#total-ratings-score). So, 'higher-ranked' means having a higher approval score or equal approval score and higher total ratings score.

The ranking determines to which of a [voter](#voter)'s [approved](#approval) options that voter's [share](#share) goes: it goes to the highest-ranked option among those options she approves.

(Note that while an option may be *rated* differently by every voter, the options' *ranking* is common to all voters because it is computed from all ratings. This is in contrast to some other voting systems (like IRV, STV, the "Alternative Vote", or most "Condorcet" methods) in which voters do not *rate* the options but instead each voter directly submits *her own ranking* of all options.)

### Rating
(not to be confused with [ranking](#ranking))

*Ratings* (possibly in combination with [delegation](#delegation)) are the basic way in which [voters](#voter) influence the [results](#results) of a [poll](#poll). Basically, each voter rates each [option](#option) between 0 and 100. The rating of an option *X* by some voter represents a conditional commitment of that voter to [approve](#approval) *X* if enough other voters also approve *X*, or, equivalently, if not too many voters [oppose](#opposition) (=don't approve) *X*. More precisely, by giving *X* a rating of *r*, the voter commits to approve *X* if and only if strictly less than *r* per cent of all non-[abstaining](#abstention) voters oppose *X*. See [approval](#approval) for more details on this.

Because of the possibility of [delegation](#delegation), we distinguish between a voter's [own rating](#own-rating) of an option and a voter's [proxy rating](#proxy-rating) of that option. Because we want to make sure that no non-[abstaining](#abstention) voter's share is lost, we also distinguish between a voter's proxy rating and her [effective rating](#effective-rating) of an option (but most of the time these are the same). It is the latter that determines who [approves](#approval) what and eventually whose [share](#share) goes where.

The procedure that determines the [results](#results) from all ratings is called [tallying](#tallying).

### Rating slider
In a [voter](#voter)'s [voting interface](#voting-interface), each [option](#option) has a *rating slider* attached which shows the voter's [proxy rating](#proxy-rating) of that option. If the voter has not delegated any rating, the proxy rating equals the voter's [own rating](#own-rating) of that option, and the voter can use the slider to adjust this rating. If the voter has delegated some ratings but not this one (because she used the [delegation toggle](#delegation-toggle) to regain control), the slider also shows her own rating and, in addition, a dashed line above it shows the proxy rating of her delegate for comparison. If she has delegated her rating of this option, the slider only shows the proxy rating of her delegate (which is then also her own proxy rating) and cannot be adjusted (which is indicated by a smaller knob).

### Results
What kind of results a [poll](#poll) has depends on its [type](#poll-type). 

1. For a poll of **type "share"**, the main result is an **allocation of [shares](#share)** to [options](#option), reported in per cent of the budget or resource in question. In other words, each option gets a share between 0% and 100%, and all these shares add up to 100%. So if the result says 70% *X* and 30% *Y*, then option *X* shall get 70% of the budget or resource in question and option *Y* shall get 30%. For this poll type, there is no randomization involved, the formula that turns everyone's effective ratings into option shares is totally deterministic.

2. For a poll of **type "winner"**, the **intermediate results** that are shown while the poll is still *running* are the same as for a poll of type "share". 
But the reported shares are now representing **winning probabilities** rather than as parts of a budget or resource. 
After a poll of type "winner" has [*closed*](#closing), the **final result** of the poll is **a single option as the ["winner"](#winner)** of the poll.  
This option is either the option that received a share of 100%, if such an option exists, or it is determined by drawing from the probability distribution defined by the shares. 
In other words, the probability that option *X* wins equals *X*'s share. 
vodle performs this draw only once as soon as the poll is closed. 
Although there is no central server that does this draw but the draw is performed by each voter's vodle app, we have made sure that all voters see the same winner. 
This is achieved by using a pseudo-random number generator that is based on the [poll database's](#poll-database) revision number of the poll's ["state" data item](#poll-data-item), which is the same for all voters and cannot be predicted before the poll's state is changed from *running* to *closed*.

In addition to the shares, vodle also shows the voter 
- for each option the sorted list of [effective ratings](#effective-rating) of this option (on the "explain-approval" page), 
- all options' resulting [approval scores](#approval-score),
- which options she herself approves, and
- which option "her" share goes to. 

### Running
This is one of the three successive [states](#poll-state) of a [poll](#poll). 
Once started, a poll is running until its [due date](#due-date) is reached.

While the poll is *running*, [voters](#voter) can [rate](#rating), [delegate](#delegation), add options,
and immediately see the effect of their and other voters' actions on the intermediate [results](#results),
which are continuously updated by the [tallying](#tallying) algorithm.
This interactive process will ideally make the voters' ratings converge to a combination in which a single option receives all or almost all of the [share](#share), or in which the shares are distributed in some other way that is desirable or at least acceptable for all voters. 

### Share
As the main part of the intermediate and final [results](#results) of a [poll](#poll), each [option](#option) gets assigned a *share* between 0% and 100%. 
All options' shares add up to 100%.
What the share of an option means depends on the [poll type](#poll type):
- For a poll of type "winner", the share of an option states how likely the option will be drawn as the [winner](#winner) of the poll when the poll [closes](#closing).
- For a poll of type "share", the share of an option states what part of the budget or resource in question this option gets allocated. For example, if the resource is 40 hours of time and the option's final share is 30%, then 12 hours are allocated to the option.

An option's share equals the percentage of non-[abstaining](#abstention) voters who approve this option but don't approve any higher-[ranked](#ranking) option.
One can interpret this by saying that each non-abstaining voter "controls" an equal share of 100%/*N*, where *N* is the number of non-abstaining voters.
Therefore we also say that a "voter's share" goes to a certain option. 
On the level of the code (but not in the UI), we also call this share the voter's ["vote"](#vote) and say that she "votes for" a certain option. 

### Tallying
Whenever a [voter](#voter) changes her [own rating](#own-rating) of some [option](#option) and whenever some [delegation](#delegation) relationship changes, the intermediate [results](#results) of the [poll](#poll) are updated or calculated freshly. 
This process is called *tallying*.

During the tallying process, the following things are updated or calculated freshly in this order:
1. For each voter and option:
    1. if the voter has delegated for this option, find the [effective delegate](#effective-delegate) of that voter for that option.
    2. calculate the [proxy rating](#proxy-rating) of that voter for that option, based on her or her effective delegate's [own rating](#own-rating), and show it in the [rating slider](#rating-slider).
2. For each voter: 
    1. set all her [effective ratings](#effective-rating) based on all her proxy ratings.
    2. using them, check whether she [abstains](#abstention).
3. For each option: find its [approval threshold](#approval-threshold), based on the effective ratings of the non-abstaining voters. The voter can see this in the "explain" page.
4. For each option and non-abstaining voter: check whether she [approves](#approval) the option, based on the option's approval threshold and her effective rating of the option.
5. For each option:
    1. calculate its [approval score](#approval-score) on the basis of all non-abstaining voters' approval of the option.
    2. calculate its [total ratings score](#total-ratings-score) on the basis of all non-abstaining voters' effective ratings of the option.
6. Determine the options' [ranking](#ranking) based on their approval and total ratings scores.
7. For each non-abstaining voter: determine which option that "voter's share" goes to, based on the voter's approvals and the options' ranking. In the code, this option is called the voter's ["vote"](#vote).
8. Finally, for each option: calculate its [share](#share) based on the voters' votes. The voter can see this in the "explain" page.

The details of this algorithm have been very carefully designed to guarantee a number of things such as fairness, neutrality, proportionality, low manipulability, consistent sensitivity to changes, etc. For more details on this, please see the [scientific article](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3751225) on the underlying decision method.

### Total ratings score
The *total ratings score* of an [option](#option) equals the sum of all [effective ratings](#effective-rating) the option received from all [voters](#voter).

### User
(not to be confused with [voter](#voter))

A *user* is a person who uses vodle on one or more devices to initiate or participate in one or more [polls](#poll). A user is identified across devices and sessions by the cryptographic hash value of the combination of her *email address* and [user password](#user-password). This way, no-one except the user herself can infer anyone's email address. 

In each poll the user participates in, she has a poll-specific [voter](#voter) identity that no-one can link to her user identity or to the voter identities she has in other polls.

### User cache
The contents of the [user database](#user-database) are mirrored for performance reasons as key-value pairs in a simple hash table (a typescript object of type Record) called the *user cache*.

### User database


### User data item

### uid
[user](#user)

### User password
The password the [user](#user) specifies together with her email address to be able to access her [user database](#user-database) from different devices (roaming). Not to be confused with a [poll password](#poll-password). 

### Vote

### Voter
(aka participant)

[user](#user), [vid](#vid)

### Voter data item
A *voter data item* is a data item that is related to a particular [poll](#poll) and is owned by a particular [voter](#voter) in that poll (rather than being common to all voters, compare [poll data item](#poll-data-item)).
It is stored as a key-value pair in the [poll database](#poll-database) and the [poll cache](#poll-cache).
Examples of voter data items are the voter's [ratings](#rating) of all [options](#option), and the voter's [delegation requests](#delegation-request) or responses to others' delegation requests.
A voter data item can be decrypted and thus read by all voters in the same poll by using the [poll password](#poll-password),
but can be created, updated or deleted at only by the voter owning the data item.
Additional restrictions prevent a voter from changing her ratings or delegations after a poll has closed.

### Voting interface


### Winner
[option](#option), [poll](#poll)

### Winning probability
[option](#option), [share](#share)

