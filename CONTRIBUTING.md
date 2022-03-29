# Contributing to vodle

***The vodle team will be very happy if you choose to contribute to vodle!***

You could do so in any number of ways, not just by writing code, for example:

**Make vodle fly after the minimal viable product (MVP) is launched** in summer, by identifying promising groups of potential testers and early users of the MVP (V0.9), finding potential funders for the subsequent development of a first major release (V1.0), and developing vodle's long-term vision further.

**Help making vodle more accessible** by translating it into further languages, improving and completing existing translations, adding a dark, high-contrast, or color-blind-friendly theme, improving accessibility for screen readers, or designing and improving in-app aids such as hints, the FAQ and help texts, or a tutorial, demo, or walkthrough.

**Making vodle more stable and sustainable** by improving its overall documentation, identifying bugs and missing inline documentation, turning cryptic "FIXME" and "TODO" comments into proper issues.

**Improving privacy and security** by reviewing and improving vodle's data handling and use of encryption and designing additional protocols.

Later **assist in project and community management** by prioritizing feature requests and bug reports, moderating discussions, offering user support.

Or simply start and **be a friendly observer, frank commentator and neutral advisor** for the project.

## Getting started

You might begin by just scanning our [end user website](http://vodle.it) and reading some of the top-level documentation texts in the [doc/development](./doc/development/) folder, maybe starting with the description of vodle's overall [architecture](./doc/development/ARCHITECTURE.md) and the extensive [glossary](./doc/development/GLOSSARY.md) of terms used in the app's UI and code.

If you are interested in code-related stuff, you might then continue with browsing the [issue tracker](https://github.com/pik-gane/vodle/issues) and identify a *good first issue* (some are labelled as such).

Some types of contribution can be made without installing a development version of vodle on your own computer, such as documentation-related thinds, code reviews, designing stuff.

But other types of contribution will require setting up a development and testing environment:

## Setting up a development and testing environment

### Setting up Node, Ionic, and the vodle web app

- Follow [these instructions](https://ionicframework.com/docs/v5/intro/environment) to set up a basic environment for working with Ionic, basically consisting of [Node.js](https://ionicframework.com/docs/v5/reference/glossary#node) and [npm](https://ionicframework.com/docs/v5/reference/glossary#npm).
- Either fork vodle's git repository [https://github.com/pik-gane/vodle](https://github.com/pik-gane/vodle) or, even better, ask us to grant you write access to it! We are happy to do this since we have protected important branches sufficiently. 
- Make sure you have at least 2GB free space on your disk. Then clone the (forked or original) repository to your machine and switch to a new branch for your contribution:
  ```
  $ git clone https://github.com/pik-gane/vodle.git
  $ cd vodle
  $ git switch -c my-new-branch
  ```
- Follow [these instructions](https://ionicframework.com/docs/v5/intro/cli#install-the-ionic-cli) to install the Ionic Command Line Interface (but nothing more from those instructions – in particular, *don't* "start an app"!). Depending on your operating system, you might have to do this as an administrator, e.g. on Linux by saying
  ```
  $ sudo npm install -g @ionic/cli
  ```
- Install all needed javascript packages:
  ```
  $ npm install
  ```
  (this will install everything listed in [package.json](./package.json))
- Test whether you can start the vodle web app in development mode:
  ```
  $ ionic serve
  ```
  After less than a minute, the log should say something like 
  ```
  Development server running!
  Local: http://localhost:8100
  Use Ctrl+C to quit this process
  [ng] ✔ Compiled successfully
  ```
  Also, a browser should open (if not, open one yourself and go to [localhost:8100](http://localhost:8100) or whatever the log said instead) and show vodle's Welcome/Login screen, asking you for your preferred language or whether you have used vodle before. 
  
  (If the log shows a warning that ```CommonJS or AMD dependencies can cause optimization bailouts```, ignore it.)
- Choose a language or click *No* to test whether the app is responsive at all, but stop when you get asked for your email address.
- In the terminal, quit the development server by pressing Ctrl-C (or whatever the log said instead).

### Setting up a local CouchDB for development

- Now install the [docker engine](https://docs.docker.com/engine/install/) and pull the [CouchDB docker image](https://hub.docker.com/_/couchdb). Depending on your operating system, you might again have to do this as an administrator, e.g. on Linux by saying
  ```
  $ sudo docker pull couchdb
  ```
- Then create an instance of the image, and check that it is running:
  ```
  $ sudo docker run --name vodle-dev-couchdb -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -d couchdb
  $ sudo docker ps -a
  ```
  which should say something like
  ```
  CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                       PORTS                                                           NAMES
  321363d1e666   couchdb        "tini -- /docker-ent…"   3 seconds ago    Up 2 seconds                 4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp, :::5984->5984/tcp   vodle-dev-couchdb
  ```
- In a browser, go to [localhost:5984](http://localhost:5984/), which should show a page with a JSON doc similar to this:
  ```  	
  couchdb	"Welcome"
  version	"3.2.0"
  git_sha	"efb409bba"
  uuid	"3e74df7f8bd4adb5da56df5f3284cd6c"
  features	
    0	"access-ready"
    1	"partitioned"
    2	"pluggable-storage-engines"
    3	"reshard"
    4	"scheduler"
  vendor	
    name	"The Apache Software Foundation"
  ```
- Install [couchdb-bootstrap](https://www.npmjs.com/package/couchdb-bootstrap) to be able to bulk-load data into your CouchDB database:
  ```
  $ sudo npm install -g couchdb-bootstrap
  ```
- Use it to initialize your CouchDB database for use with vodle:
  ```
  $ cd couchdb
  $ couchdb-bootstrap http://admin:password@localhost:5984
  ```
  which should respond with a long JSON doc in the log looking like this, with many `"ok": true`:
  ```
  {
    "configure": {
      "httpd/enable_cors": {
        "ok": true,
        "value": "true"
      },
      ...
        {
          "ok": true,
          "id": "examples:scify",
          "rev": "1-8418d51bcd89e746fbb14f3a37167dec"
        }
      ]
    }
  }
  ``` 
- Now restart the Ionic development server,
  ```
  $ cd ..
  $ ionic serve
  ```
  then go back to [localhost:8100](http://localhost:8100) and try logging into the app by choosing a language, saying *No* when asked whether you used vodle before, and entering some (possibly fictitious) email address and a password. If this gets you to the *My polls* page, the connection to your local CouchDB has worked. If you see and error like this instead in your web browser's console, then something is wrong:
  ```
  VODLE DataService.get_remote_connection could not log into http://localhost:5984//_users as user 'vodle': TypeError: NetworkError when attempting to fetch resource.
  ```
- If you have to choose a different port than 5984 for your CouchDB for some reason, you need to adjust your [src/environments/environment.ts](./src/environments/environment.ts) file, on the line saying 
  ```
  central_db_server_url: "http://localhost:5984/"
  ``` 
  and then add this file to your local `.gitignore` file to avoid passing this modification back to the remote repository.

### Setting up a test poll and looking into all corners

1. On the *My polls* page (see here for its [Angular template](./src/app/mypolls/mypolls.page.html) and [Typescript source code](./src/app/mypolls/mypolls.module.ts)), click the **+** button in the bottom right corner to create a new poll, which should bring you to the *[Draft poll](./src/app/draftpoll/)* page.
2. Choose *select one of several options*, then click the three dots in the top right corner, which should open a [menu](./src/app/draftpoll-kebap/).
3. Choose *Use an example > Icecream flavour (large test poll)*, which should fill the form with a poll title, description, due date, and some options. Adjust the *Poll will close...* setting to *after one hour* to have enough time for your test. 
4. Click the bottom right *Ready* button, which should trigger a short notification by your browser that the poll was saved under 'drafts' and then bring you to the *[Please check](./src/app/previewpoll/)* page.
5. Click *Start the poll now*, which should bring you to the *[Invite poll participants](./src/app/inviteto/)* page.
6. Click *Compose email*, which should open your mail application and show a draft of an invitation email. Send this email to yourself. 
7. Back in the browser, click *Copy link* and verify that the browser shows you a notification that the link was copied to the clipboard, and that the clipboard actually contains an invitation link.
8. In the main menu on the left (maybe hidden behind the three lines main menu button on the top left), choose *My polls*, which should bring you back to that page. Verify that now your new poll is listed under *Running polls* with a badge saying *New*. 
9. Click on the poll to open the *[Poll](./src/app/poll/)* page, which should show you a voting interface with five sliders and a **+** button.
10. Move the rating slider for *Strawberry* slowly to the right and verify that it turns from red to blue to dark green as it enters the light approval bar, and that the hint above the sliders changes from red to yellow.
11. Move the rating slider for *Lemon* slowly to the right and verify that the hint changes in the beginning and again when you pass the rating for *Strawberry*, and that the slider turns light green as it enters the light approval bar.
12. Click the **>** button to the left of *Strawberry* to expand this option's details.
13. Click the *(explain)* link at the end of that expanded text, which should open an overlay page *Approval for Strawberry* showing an animation that explains how this option's approval score is determined. Try the playback controls at the bottom. Then click the arrow in the top-right corner to switch to another animation that explains how this option's share is determined. Then close the overlay.
14. Click the **+** button on the bottom left, which should open an overlay for adding another option. Enter some data, click *Add*, and verify that your browser shows a short notification and the new option is now listed last. 
15. In the main menu, click *Log out*, confirm with *Yes, log out*, and close the browser tab.
16. Fetch your earlier sent email and click the link contained in it, which should open a new browser tab and get you back to the login page. This time, log in with a different email than before. After logging in, you should see the *[Join a poll](./src/app/joinpoll/)* page. Clicking *OK, let's go* should get you again to the *Poll* page.
17. This time, click *Delegate* in the top right, which should open a [delegation dialog](./src/app/delegation-dialog/). Enter some nickname for your other persona (the one that set up the poll), e.g. simply the first email address you used. Then click *Compose an email* and again send the email to yourself. The *Poll* page should now note that your other persona has not yet responded to your delegation request.
18. Open a second, independent browser session that does not share cookies with the first session (In Chrome, you can do this by opening a *New Incognito Window*), and paste the delegation link from the last email into its URL field. This should again ask you to log in. Do so with the email address you used to set up the poll. Now you can simulate both voters simulateneously. After the login, you should see the *[Act as delegate?](./src/app/delrespond/)* page. 
19. Click *Accept*, which should make your other browser window fire a notification that the delegation request was accepted, and should bring this browser window to the *Poll* page. There you should see a note that "Some of the ratings below are also used for one other voter...".
20. Behind that note, click the three dots, which should expand the note to show you your accepted delegation. Clicking on it will bring you back to the response page. 
21. Clicking *Revoke* will fire another notification in the other window that the request was declined after all, and your own window should now say "You have declined all delegation requests". 
22. Again click the three dots and the request card and now *Accept* again. This will fire another notification in the other window that the request was accepted after all.
23. Switch to the other browser window, which should still be on the *Poll* page. On the top of that page, you should now see some news items with the same information as the earlier notifications.
24. Go to *My polls*, where you should see the same news items. Dismiss them by clicking their **x**. The line listing the test poll should now have a badge saying *Delegated*. Enter the poll again.
25. On the *Poll* page, you should now also see a note that "... controls all of your ratings as your delegate", and a set of delegation toggles on the right edge. Play around with them and verify that the note and ratings sliders change accordingly.
<!--
26. An hour after you started the poll, go back to the *Poll* page to see the results and their explanation.
-->

### Pausing and resuming your work

While working on vodle, you can normally keep your Ionic development server running. In development mode, it will automatically recompile the app and the browser will automatically reload the app whenever you make changes to the code and save them to disk. If you still need to restart the app, simply quit is as above and start it new by saying 
  ```
  $ ionic serve
  ``` 
in the base directory (`vodle`) of the repository.

In your deserved breaks from vodling, you can stop and later restart your CouchDB instance by saying (possibly as administrator):
  ```
  $ sudo docker stop vodle-dev-couchdb
  $ sudo docker startp vodle-dev-couchdb
  ```

## Working on translations

We will soon provide detailed information on this... in the meantime, please look at the JSON files under [src/assets/i18n/](./src/assets/i18n/).

## Finding your way around the code

Each app page and dialog lives as a ***component*** in its own folder inside [src/app/](./src/app/). 
Its layout and UI are given by an Angular template file `*.page.html`,
while the top-level logics is coded in a Typescript file `*.page.ts`.

Lower-level logics are implemented via ***services*** that are used by the page components. Each service is coded in a Typescript file `*.service.ts` inside [src/](./src/):
- The [GlobalService](./src/app/global.service.ts) is the entry point for all services. 
- The [PollService](./src/app/poll.service.ts) defines the `Poll` and `Option` classes and handles the tallying of results.
- The [DelegationService](./src/app/delegation.service.ts) handles everything related to delegations.
- The [NewsService](./src/app/news.service.ts) handles news items.
- The [SettingsService](./src/app/settings.service.ts) manages a user's settings.
- Finally, the [DataService](./src/app/data.service.ts) handles the bottom-level data management (see [Architecture](./doc/development/ARCHITECTURE.md)).


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
