# maxparc-ionic

## Specification notes

* app name will be "vodle", logo exists
* main focus for now: get base functionality going (setting up polls, voting, closing a poll)

### Priotitised list of wanted features

* poll setup, invitation by email
* basic nonencrypted communication via realtime.co
* interactive voting gui
* at deadline: poll tally, broadcast result via realtime.co
* custom uri scheme & file extension
* invitation and notifications via other messengers
* "vodle" button for integration in websites, using custom uri + standard webservice interface to open polls
* integration with slack via slackbot "vodle"
* extracting lists of potential options from webpages (e.g. movie theatre program) 
* personal prioritization of polls
* customized notification options (updates, result)
* text message broadcast and personal messages

## Ideas for publication

### channels

* app shops
* "vodle.co" web app
* promote "vodle" button to cinemas etc.
* get startups to use it

### application situations

* movie
* date
* holiday destination
* band name
* company logo
* art awards
* group speaker/rep

## Implementation notes

* many small TODOs etc. are contained in inline comments in code

### Building

I did the following to get the android build going:

sudo npm i -g cordova

npm install @ionic-native/push

npm install cordova-plugin-ionic@^5.0.0

npm install ajv@^6.9.1

npm install fsevents@1.2.7

sudo apt install openjdk-8-jdk

sudo update-alternatives - -config java

then select 1.8

sudo update-alternatives - -config javac

then select 1.8

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/

sudo apt install gradle android-sdk-build-tools

/home/jobst/android-sdk-linux/tools/bin/sdkmanager --install "platforms;android-27"

/home/jobst/android-sdk-linux/tools/bin/sdkmanager --install "build-tools;26.0.2"

/home/jobst/android-sdk-linux/tools/bin/sdkmanager --update

yes | /home/jobst/android-sdk-linux/tools/bin/sdkmanager --licenses

export ANDROID_HOME=/home/jobst/android-sdk-linux/

ionic cordova build --prod android --verbose

### Useful links

* sorting and filtering a list: https://www.djamware.com/post/5a37ceaf80aca7059c142970/ionic-3-and-angular-5-search-and-sort-list-of-data
* push notifications: https://ionicframework.com/docs/native/push/
* realtime.co: https://framework.realtime.co/messaging/
* app-specific url schemes (use "maxparc"?): 
    https://developer.apple.com/documentation/uikit/core_app/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app
    https://stackoverflow.com/questions/2448213/how-to-implement-my-very-own-uri-scheme-on-android
* file extension "maxparc":
    https://www.codenameone.com/blog/associating-your-app-with-file-extension-mime-types-iphone-android-windows.html
    https://stackoverflow.com/questions/3760276/android-intent-filter-associate-app-with-file-extension
    
