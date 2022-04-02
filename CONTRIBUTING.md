# Contributing to ![vodle](https://github.com/pik-gane/vodle/blob/main/resources/icon_tight24.png)  vodle

***The vodle team will be very happy if you choose to contribute to vodle!***

You could do so in any number of ways, not just by writing code, for example:

**Make vodle fly after the minimal viable product (MVP) is launched** in summer, by identifying promising groups of potential testers and early users of the MVP (V0.9), finding potential funders for the subsequent development of a first major release (V1.0), and developing vodle's long-term vision further.

**Help making vodle more accessible** by translating it into further languages, improving and completing existing translations, adding a dark, high-contrast, or color-blind-friendly theme, improving accessibility for screen readers, or designing and improving in-app aids such as hints, the FAQ and help texts, or a tutorial, demo, or walkthrough.

**Making vodle more stable and sustainable** by improving its overall documentation, identifying bugs and missing inline documentation, turning cryptic "FIXME" and "TODO" comments into proper issues.

**Improving privacy and security** by reviewing and improving vodle's data handling and use of encryption and designing additional protocols.

Later **assist in project and community management** by prioritizing feature requests and bug reports, moderating discussions, offering user support.

Or simply start and **be a friendly observer, frank commentator and neutral advisor** for the project.

### Our commitment

As we are on our way towards a Minimal Viable Product, we currently spend about 15 hours a week on developing vodle. 
*We commit to reply to your messages in the discussion board within one day.*

If you decide to contribute something, we are very happy to help you get started.
*So if you get stuck at some point in the following section, don't hesitate to ask on the discussion board!* 

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
  $ sudo docker run --name vodle-dev-couchdb -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -m 1G -d couchdb
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

1. On the *My polls* page (see here for its [Angular template](./src/app/mypolls/mypolls.page.html) and [Typescript source code](./src/app/mypolls/mypolls.page.ts)), click the **+** button in the bottom right corner to create a new poll, which should bring you to the *[Draft poll](./src/app/draftpoll/)* page.
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
15. In the main menu, click *Log out*, confirm with *Yes, log out*, and log in with a *different* email than before.
16. Fetch your earlier sent email and click the link contained in it, which should get you to the *[Join a poll](./src/app/joinpoll/)* page. Clicking *OK, let's go* should get you again to the *Poll* page.
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
  $ sudo docker start vodle-dev-couchdb
  ```

Please don't forget to frequently `git pull` upstream changes and merge them into your working branch to avoid divergence.

### Building native apps

For most of the time, it is probably most convenient to work with the local web app as described above. In some cases, however, you might want to test a native app version of vodle.

#### Android
For the android version, you need to install [Android Studio](https://developer.android.com/studio) and [configure it as described here](https://ionicframework.com/docs/v5/developing/android) (in that doc, skip the section on Cordova and continue with the section on Capacitor). Instead of 
```
$ ionic capacitor copy android
``` 
and starting Android Studio manually, you can also do
```
$ ionic capacitor build android
```
which will automatically start Android Studio, where you can then do `Run -> run app`.

In some cases, running the app like this only succeeds after doing
```
$ adb start-server
```

#### iOS
For iOS, we have not tested it yet, but [it should work like this](https://ionicframework.com/docs/v5/developing/ios).

### Other useful commands

- If you need to log into the CouchDB docker container for some reason:
  ```
  $ sudo docker exec -it vodle-dev-couchdb bash
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

When coding, please try to stick to the style you see in the existing code. There are only a very few [conventions](./doc/development/CONVENTIONS.md).


<!--

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

## Prioritised list of wanted features

* custom uri scheme & file extension
* standard notification when some bar has changed by more than 5% or some pin's distance to bar end gets below 5% or time gets late
* "vodle" button for integration in websites, using custom uri + standard webservice interface to open polls
* integration with slack via slackbot "vodle"
* extracting lists of potential options from webpages (e.g. movie theatre program) 
* personal prioritization of polls
* customized notification options (updates, result)
* text message broadcast and personal messages
* observer-only view for stakeholders or public projection 



-->
