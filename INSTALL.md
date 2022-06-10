# Installation

*End users: On our end user website [vodle.it](http://vodle.it), you can directly use vodle in your browser or install it as a smartphone app.*

This page describes how [contributors](./CONTRIBUTING.md) who want to test code can install vodle on their machine.

## Setting up a development and testing environment

### Setting up Node, Ionic, and the vodle web app

- We assume you have `git` already installed on your system. If you are on Windows, some of the commands below may have to be issued in [`git bash`](https://gitforwindows.org/) instead of the Windows command line.
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
  $ sudo docker run --restart unless-stopped --name vodle-dev-couchdb -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 --expose 5984 -m 1G -d couchdb
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
- If you have to choose a different port than 5984 for your CouchDB for some reason, you need to adjust your [src/proxy.conf.json](./src/proxy.conf.json) file, on the line saying 
  ```
  "target": "http://localhost:5984/",
  ``` 
  and then add this file to your local `.gitignore` file to avoid passing this modification back to the remote repository.

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

- See the CouchDB logs:
  ```
  $ sudo docker logs vodle-dev-couchdb
  ```

- If you need to log into the CouchDB docker container for some reason:
  ```
  $ sudo docker exec -it vodle-dev-couchdb bash
  ```

- If you want to improve CouchDB performance, you can try limiting number of revisions to 2:
  ```
  $ curl -u admin:password -X PUT -d "2" http://localhost:5984/vodle/_revs_limit
  ```
  See [here](https://docs.couchdb.org/en/stable/maintenance/performance.html?highlight=performance) for other optimization options.

- If you want to delete old documents from the CouchDB based on the respective polls' due dates, use
  ```
  $ curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle/_list/poll_docs_by_due/poll_due_doc_by_doc_id?include_docs=true&before=YYYY-MM-DD" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
  ```
  where `YYYY-MM-DD` is the first due date you want to *keep*, or
  ```
  $ curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle/_list/poll_docs_by_due/poll_due_doc_by_doc_id?include_docs=true&older_than=X" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
  ```
  where `X` is the number of days the due date must be over to be deleted. Note that this will NOT delete these docs from any user device, since the purge is not replicated to these devices!

- If you want to delete old documents from the CouchDB based on the respective user's last_access dates, use
  ```
  $ curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle_lists/_list/user_docs_by_last_access/user_last_access_doc_by_doc_id?include_docs=true&before=YYYY/MM" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
  ```
  where `YYYY-MM-DD` is the first last_access date you want to *keep*, or
  ```
  $ curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle_lists/_list/user_docs_by_last_access/user_last_access_doc_by_doc_id?include_docs=true&older_than=X" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
  ```
  where `X` is the number of months the last_access date must be over to be deleted. Note that this will NOT delete these docs from any user device, since the purge is not replicated to these devices!
