# Architecture

This doc describes the overall architecture of vodle.

## Main local and remote components

### Local app on user's end device

Almost all of the work is done by a local app on the user's end device.
This is either the *vodle web app* (which is however *not* a "progressive web app") running inside a web browser,
or a *"native" vodle app* installed on an Android or IOS smartphone.

Even though the app exists in three different platform versions, 
there is only a single code base for all of them!
This is made possible by using [Ionic](https://ionicframework.com/) as our top-level development framework, where the native vodle apps are using Ionic's [Capacitor](https://capacitorjs.com/) runtime.

One level deeper, we use the [Angular](https://angular.io/) flavour of Ionic (not the React or Vue flavours), 
allowing us to design a complex UI in the form of HTML page templates using the powerful [Angular template language](https://angular.io/guide/template-syntax).

All logics is implemented in [Typescript](https://www.typescriptlang.org/), 
which is "JavaScript with syntax for types".

### Web server deploying the web app

The native vodle app versions will be deployed via certain standard app stores and don't require a central web server.

The vodle web app however must be deployed via a standard web server. 
The web server only serves static files: an `index.html` page, many javascript files, and all needed assets (fonts, icons, images, etc.). 
There is *no* server-side logic such as Perl scripts or similar. 
In particular, *no* user data whatsoever is ever sent from the app to the web server. 

The vodle project maintainers plan to provide a central web server for the first year after the launch, 
but depending on usage additional servers might be needed. 
E.g., regular user groups can easily set up their own vodle web server.

### CouchDB server(s) used for communication and roaming

Different end users' vodle apps communicate by writing and reading poll-specific JSON documents in some dedicated [CouchDB](https://couchdb.apache.org/) server, typically an instance of a [standard CouchDB docker container](https://hub.docker.com/_/couchdb), which is configured in a certain way by uploading a bunch of administrative JSON documents.
A CouchDB server is also used to store other user data to allow users to use vodle consistently on several devices (roaming).

Besides basic authentification, authorization, and document validation, there is no logic implemented in the CouchDB server, it is simply used as a place to exchange pieces of encrypted data between users. 

All user data stored on a CouchDB server is encrypted by the user's password, all poll data stored on a CouchDB server is encrypted by the poll password that is known to all participants in the poll. The only data item that is not encrypted is the closing date of each poll, which must be readable by the CouchDB server's validation scripts to prohibit certain changes after a poll has closed. 

Just like for the web server, the vodle project maintainers plan to provide a central vodle CouchDB server for at least the first year after the launch, 
but depending on usage and security requirements additional servers might be needed. 
E.g., regular user groups can easily set up their own vodle CouchDB server.

A user might use different CouchDB servers for their user data and for each poll they participate in.

### Later: Key distribution server

In some future release, vodle will optionally make use of another server component to make sure only authorized users can vote in a poll and can only vote once. To achieve this, the key distribution server's sole job is  to distribute a set of unique voting keys in a random order to a set of voters and send each of them a (possibly encrypted) email with their unique key.

The key distribution server is meant to be hosted by a trusted third party separate from the group of voters since it will be the sole entity that knows the mapping between voter ids and voter email addresses. It will not have access to any poll data stored in the CouchDB servers, and will not know the poll passwords to encrypt that data.

Without the key distribution server, anyone knowing the poll password can vote using any email address they like.

## Data management

Most persistent data is stored redundantly in several places which are continuosly synchronized. Each of these data items (e.g., the rating of a certain option by a certain voter) is stored at the same time as:
- A key-value pair in the app's temporary memory (called a `cache` in the code)
- A JSON doc in a local PouchDB database inside the app's persistent local storage, containing the same key-value pair, but now with password-encrypted value
- A copy of the same JSON doc in a remote CouchDB database that is automatically synchronized with the local PouchDB as long as the app is connected to the internet.

These synchronizations are managed by vodle's Angular component [`DataService`](../../src/app/data.service.ts) and are happening asynchronously in the background.

Many key-value pairs are also synchronized with certain properties of certain javascript objects. Those synchronizations are managed by the respective object's class via getter and setter methods (see, e.g., the end of the file [`poll.service.ts`](../../src/app/poll.service.ts) for how the `Option` class syncs its `name` property via the methods `getp` and `setp` provided by `DataService`).

For performance reasons, especially for the real-time tallying of polls while voters change their ratings, some groups of key-value pairs are also additionally stored in further data structures, mostly in (flat or nested) [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Records](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type), or standard Arrays. An example of such a nested data structure is `inv_direct_delegation_map_caches` in [`DataService`](../../src/app/data.service.ts).

**Caution:** Since we use all of Arrays, Records, Sets, and Maps, special care has to be taken not to confuse their syntax for accessing and looping over entries, which can cause very hard-to-identify bugs. There is a [cheat sheet](../../src/app/typescript_cheat_sheet.md) summarizing the differences. For this reason, all variables of type Map or Set have `_map` or `_set` in their name.

## Technology stack and versions

- [Ionic v5](https://ionicframework.com/docs/v5/) (planning to update to v6) 
- [Angular](https://angular.io/) 13.0.0 (planning to update to 13.3.0)
- [Typescript 4.4.3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html)
- [PouchDB](https://pouchdb.com/) 7.2.2 (data synchronisation between local app and remote CouchDB database)
- Sodium: [libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers) (encryption)
- [Node.js](https://nodejs.org/en/)
- [ngx-translate](https://github.com/ngx-translate/core) (translations)
