# Deploying vodle via [F-Droid](https://f-droid.org)

Status: trying to find out how this works by reading 
- https://f-droid.org/en/docs/Submitting_to_F-Droid_Quick_Start_Guide/
- https://f-droid.org/en/docs/Build_Metadata_Reference/
- https://f-droid.org/en/docs/All_About_Descriptions_Graphics_and_Screenshots/

Progress:
- forked fdroiddata, switched to branche it.vodle
- added `metadata/it.vodle.yml` and edited it
- on console:
```
sudo docker run --rm -itu vagrant --entrypoint /bin/bash \
-v ~/git/fdroiddata:/build:z \
-v ~/git/fdroidserver:/home/vagrant/fdroidserver:Z \
registry.gitlab.com/fdroid/fdroidserver:buildserver
```
- in container (takes about 10 minutes):
```
. /etc/profile
export PATH="$fdroidserver:$PATH" PYTHONPATH="$fdroidserver"
cd /build
fdroid readmeta
#fdroid rewritemeta it.vodle
fdroid checkupdates it.vodle
fdroid lint it.vodle
fdroid build --on-server it.vodle
```
- finally this succeeded and produced an unsigned APK.


## Necessary meta-data

- applicationId: it.vodle

## Meeting F-Droid Prerequisites

### Only use acceptably licensed components
- see https://forum.f-droid.org/t/nativescript-apache-cordova-ionic-framework-apps/9442
- @capacitor/local-notifications: MIT



 