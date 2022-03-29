

You can sign our Contributor License Agreement (CLA) here: [vodle CLA](https://contributoragreements.org/query2form/?_replyto=heitzig@pik-potsdam.de&_subject=Contributor%20License%20Agreement%20E-Signing&_body=Fill%20out%20the%20following%20form,%20then%20sign%20your%20initials%20to%20complete%20the%20Contributor%20License%20Agreement.&agreement-type[]=individual&agreement-type[]=entity&fullname=&title=&company=&email-address=&physical-address=&your-initials=&signed-agreement_s=%3Fyour-date%3D%40_time%26your-name%3D%40fullname%26your-title%3D%40title%26your-address%3D%40email-address%26your-patents%3D%40Patent-IDs-and-Country_t%26process-url%3D%40_processurl%26action%3Dsign-%40agreement-type%26%40u2s&_processurl=@processurl&_action[0]=http://contributoragreements.org/query2email/&_action[1]=http://contributoragreements.org/query2update/&_next=View%20More%20Contributor%20License%20Agreement%20Signers.&_success=Thank%20you%20for%20using%20contributoragreements.org.%20The%20agreement%20has%20been%20signed%20and%20sent%20via%20E-Mail%20and%20will%20not%20be%20stored.&_submit=Sign%20Your%20Contributor%20License%20Agreement.)

<!--


# Development of a group decision / voting app "vodle"

Current goal: complete a minimum viable product (MVP) that runs as a web-app only and provides base functionality (setting up polls, voting, seeing and understanding results).

Current state: pre-alpha, ~ 80 percent complete. 

(Later: extend functionality and deploy as android/ios app as well)

**Contributors: please look at the Issues page and the folder [doc/development](doc/development)!**

## Basic architecture

* web/android/ios app
* communication between voters via any couchdb database
* no other central server for now (but probably later for certain tasks)

## Technology stack

* App development framework: Ionic (typescript, angular)
* GUI: html, svg
* Communication: JSON, Email (later also messenger apps), Deep links

## Very coarse overview of source code file tree

* src/app/about|help|home|mypolls|openpoll|pollstats etc.: folders of individual app pages.
* src/app/whatever/whatever.page.ts|html: gui logics and layout
* src/app/global.service.ts: background logics with classes for polls and options etc.

## Useful commands

Running locally:
* running locally in dev mode: in main directory of git repo: ionic serve
* running locally in dev mode with external access: in main directory of git repo: ionic serve --external
* running locally in prod mode with external access: in main directory of git repo: ionic serve --prod --external

CouchDB:
* starting local couchdb in docker: sudo docker run --name couch --memory 1G -p 5984:5984 -d couchdb --storage-opt size=1G
* logging into container: sudo docker exec -it couch bash
* sending config option to couchdb: https://docs.couchdb.org/en/stable/config/couchdb.html
* preparing couchdb for use with vodle: `cd couchdb` and `couchdb-bootstrap http://<adminuser>:<password>@<url>` (this populates the db with the contents of the couchdb folder) 

Building app:
* `ionic capacitor build android`, then in Android Studio `Run -> run app`

## Ideas for publication

### channels

* web app at vodle.it
* app shops
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


# [OLD STUFF, please ignore for now:]

## Building

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

## Prioritised list of wanted features

* poll setup, invitation by email
* basic nonencrypted communication via realtime.co
* at deadline: poll tally, broadcast result via realtime.co
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


## Implementation notes

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

Currently, a cloud database is used to store data persistently as JSON documents


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
* re-rendering: https://forum.ionicframework.com/t/ionic-refresh-current-page/47167/11, https://forum.ionicframework.com/t/how-to-properly-re-render-a-component-in-ionic-manually/97343?u=hugopetla
* async functions: https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90, https://javascript.info/async-await
* http: https://angular.io/api/common/http/HttpClient, https://blog.angular-university.io/angular-http/
* trigger svg animation: https://stackoverflow.com/questions/8455773/svg-trigger-animation-with-event
* charts: https://www.chartjs.org/
* fullscreen: https://ionicframework.com/docs/native/android-full-screen


### lessons from copan test

* many avoid a 100 rating, leading to many abstentions -> add warnings, maybe also add "submit" button?
* clearer explanations (+ Q&A)

-->
