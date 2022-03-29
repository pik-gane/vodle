# Glossary of terms used in vodle UI and code

*(If you read this on GitHub, you can access a table of contents via the* ⋮☰ *button in the top-left corner of this panel)*

### Abstention
When a [voter's](#voter) [effective ratings](#effective-rating) for all [options](#option) are zero, that voter *abstains* and thereby does not control any portion of the [share](#share). An abstaining voter is treated completely equivalent to a person who does not participate in the poll at all and does not specify any ratings.

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
Only the delegate will know the identity of the client, as soon as the client sends her the delegation request.

### Closing
When a [poll](#poll) reaches its [due date](#due-date), it is *closed*. No-one can change any ratings or delegations from that point on, and a final [tally](#tallying) is performed to determine the final [results](#results).

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
When a [poll](#poll) is started, the settings made by the poll's creator determine the exact point in time at which the poll will [close](#closing), which is called the *due date* (and time).

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

### Own rating

### pid
[poll](#poll)

### Poll
[options](#option), [voters](#voter), [ratings](#rating)

### Poll database

### Poll data item

### Poll invitation
After a [poll](#poll) has been started, its creator is asked to invite participants by sending them a *poll invitation* containing a *poll invitation link* either by email, by her smartphone's share capabilities, or by copying the poll invidation link and sending it to the prospective participants in any other way.

When a prospective participant opens the poll invitation link, vodle fetches the poll data from the [poll's database](#poll-database) and registers the participant as a [voter](#voter) in this poll with a randomly generated [voter ID](#vid).

In the current version, poll invitations are not personalized, so every participant receives the same link, and everyone who gets access to the link can participate, in principle several times as different voters if she uses vodle on several devices with different email addresses.

In a future release, poll invitations will optionally be personalized with the help of a key distribution server (see [Architecture](ARCHITECTURE.md)).

### Poll password
All the [poll data](#poll-data-item) and [voter data](#voter-data-item) of a [poll](#poll) that is stored in its [poll database](#poll-database) is encrypted with a *poll password* that is only known by the poll's [voters](#voter), or, more precisely, by everyone how has access to the [poll invitation link](#poll-invitation). 

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

### Running

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
(aka participant)

[user](#user), [vid](#vid)

### Voter data item

### Voting interface


### Winner
[option](#option), [poll](#poll)

### Winning probability
[option](#option), [share](#share)

