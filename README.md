## Specification notes

* app name is "vodle", logo exists, domain name vodle.it is reserved
* main focus for now: get base functionality going (setting up polls, voting, closing a poll)

### Prioritised list of wanted features

* poll setup, invitation by email
* basic nonencrypted communication via realtime.co
* interactive voting gui, changing pin color depending on approval state
* at deadline: poll tally, broadcast result via realtime.co
* add non-probabilistic mode ("allocate a budget", "allocate resources", "elect temporary representatives" 
* optimized explanations, howtos, guides (using text of different detail and animations)
* custom uri scheme & file extension
* standard notification when some bar has changed by more than 5% or some pin's distance to bar end gets below 5% or time gets late
* invitation and notifications via other messengers
* "vodle" button for integration in websites, using custom uri + standard webservice interface to open polls
* integration with slack via slackbot "vodle"
* extracting lists of potential options from webpages (e.g. movie theatre program) 
* personal prioritization of polls
* customized notification options (updates, result)
* text message broadcast and personal messages
* observer-only view for stakeholders or public projection 

## Ideas for publication

### channels

* app shops
* web app at vodle.it
* promote "vodle" button to cinemas etc.
* get startups to use it

### application situations

#### probabilistic:

* movie (<-- movie theatre)
* restaurant (<-- gastro pages)
* hotel (<-- booking engine)
* what to cook (<-- recipe server)
* date
* train/flight connection (<-- carrier or specialized search engine)
* holiday destination
* product variant (<-- webshop)
* band name
* company logo

### proportional allocation:

* art award money
* group speaker/rep temporary service time
* budget, time or other resources for projects

## Implementation notes

* many small TODOs etc. are contained in inline comments in code

### Building

I did the following to get the unsigned android debug build going:

* sudo npm i -g cordova
* npm install @ionic-native/push
* npm install cordova-plugin-ionic@^5.0.0
* npm install ajv@^6.9.1
* npm install fsevents@1.2.7
* sudo apt install openjdk-8-jdk
* sudo update-alternatives - -config java
  then select 1.8
* sudo update-alternatives - -config javac
  then select 1.8
* export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
* sudo apt install gradle android-sdk-build-tools
* ...android-sdk-linux/tools/bin/sdkmanager --install "platforms;android-27"
* ...android-sdk-linux/tools/bin/sdkmanager --install "build-tools;26.0.2"
* ...android-sdk-linux/tools/bin/sdkmanager --update
* yes | ...android-sdk-linux/tools/bin/sdkmanager --licenses
* export ANDROID_HOME=...android-sdk-linux/
* ionic cordova build --prod android --verbose

On the test web server:

* sudo /usr/local/bin/ionic serve --ssl --prod --address sandstorm.pik-potsdam.de --port 443  

### Useful commands

* running in dev mode: in main directory of git repo: ionic serve
* updating icons using source put in resources: 

### Message retention

On the free plan, realtime.co deletes unserved messages after 2 minutes, so an offline user will get only the messages from the last two minutes when reconnecting.
Hence we must make sure someone sends full rating state data at least every two minutes, 
so that a reconnecting app will receive at least one such full state together with all subsequent updates.
The protocol for this is this:

* whenever receiving a full state, the app adds a random number between 1 and 2 minutes to that state's timestamp 
  and sets this as her "broadcast full state time".
* when receiving newer full states, a new "broadcast full state time" is set.
* when reaching the "broadcast full state time" before another full state is received, 
  the app broadcasts the current full state.
* to make sure state does not get lost when users are only online sporadically,
  a central, continuously online maxparc server listens on the same channel, 
  and when it has not received a full state for longer than, say, 110 seconds, 
  it computes a new full state and broadcasts it.
  this could even be done by a cron job executing every, say, 55 seconds.
* note that with 100 voters and 10 options, a full state is just 1KB of data,
  so the server only needs that much permanent storage per open poll.

Alternatively, a cloud database such as IBM Cloudant could be used to store data persistently as JSON documents

### JSON document database design

(all ids are uuids or guids, all `data` elements are inner json documents encrypted by a poll-specific key distributed initially but not stored in the db)

poll document:
```
{
    "pid":  string, // poll id
    "data": string,
}
```
where data contains:
```
{
    "title":    string,
    "desc":     string,
    "uri":      string|null, // general weblink
    "repo_uri": string|null, // weblink to repository of potential options

    "due":      timestamp,
    "status":   "draft"|"open"|"closed",
    "winner":   string|null, // option id
}
```

option document (added by individual voter, never changed later):
```
{
    "pid":  string,
    "oid":  string, // option id
    "data": string,
}
```
where data contains:
```
{
    "name": string,
    "desc": string,
    "appr": float,
    "prob": float,
}
```

voter document (controlled by single voter, updated whenever some rating is updated):
```
    "pid":  string,
    "vid":  string, // voter id
    "data": string,
}
```
where data contains:
```
{
    "pubkey":  string, // used for signing stuff?
    "ratings": { oid: int, ... }, // dictionary of ratings
}
```


### Useful links

* http://unhosted.org/ for ideas on decentralization
* sorting and filtering a list: https://www.djamware.com/post/5a37ceaf80aca7059c142970/ionic-3-and-angular-5-search-and-sort-list-of-data
* push notifications: https://ionicframework.com/docs/native/push/
* realtime.co: https://framework.realtime.co/messaging/, http://demos.realtime.co/demos/poll2.aspx, http://messaging-public.realtime.co/documentation/starting-guide/quickstart-js.html
* possible alternative to realtime.co: http://sockethub.org/
* ionic and rest webservices: https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova#ch2 
* ionic and IBM cloudant (for persistance?): 
    https://console.bluemix.net/docs/services/Cloudant/api/cloudant_query.html#finding-documents-by-using-an-index, 
    https://ionicframework.com/docs/native/http/, https://ionicacademy.com/http-calls-ionic/,
    https://console.bluemix.net/docs/services/Cloudant/api/document.html#documents, 
    https://www.npmjs.com/package/@cloudant/cloudant, 
    https://www.ibm.com/blogs/bluemix/2016/12/create-feedback-app-ionic-cloudant/, 
    https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html#getting-started-tutorial
* app-specific url schemes (use "maxparc"?): 
    https://developer.apple.com/documentation/uikit/core_app/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app
    https://stackoverflow.com/questions/2448213/how-to-implement-my-very-own-uri-scheme-on-android
* file extension "maxparc":
    https://www.codenameone.com/blog/associating-your-app-with-file-extension-mime-types-iphone-android-windows.html
    https://stackoverflow.com/questions/3760276/android-intent-filter-associate-app-with-file-extension
* expandable lists (for mypolls and openpoll pages): https://www.joshmorony.com/creating-an-accordion-list-in-ionic/
* re-rendering: https://forum.ionicframework.com/t/how-to-properly-re-render-a-component-in-ionic-manually/97343?u=hugopetla
* async functions: https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90, https://javascript.info/async-await
* http: https://angular.io/api/common/http/HttpClient, https://blog.angular-university.io/angular-http/


### Issues
* see inline!

### TODO until Springe

mandatory
* enter name, use hash value as vid, notify if already in use
* make sure data exchange works seemless
* store time series of aggregate data: min/avg/max appr., nonabstentions, min/avg/max own rating, no.approved own, amount of rating change per time 
* deal with due date
* ensure availability of server
* distinguish alloc from choice in wording

optionally
* add option functionality
* redirect vodle.it to sandstorm.pik-potsdam.de

in print:
* predefined usernames, short explanation, anonymity disclaimer

on some questionnaire website:
* short exit poll: rate useability of gui, transparency of algorithm, acceptability of result, free text for improvement
