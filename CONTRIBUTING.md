# Contributing to ![vodle](https://github.com/pik-gane/vodle/blob/main/resources/icon_tight24.png)  vodle

##### CONTENTS

1. [Introduction](#1-introduction)
2. [Getting started](#2-getting-started)
3. [Contributing code](#3-contributing-code)
4. [Working on translations](#4-working-on-translations)

## 1. Introduction

***The vodle team will be very happy if you choose to contribute to vodle!***

You could do so in any number of ways, not just by writing code, for example:

**Make vodle fly**, by identifying promising groups of potential testers and early users of the MVP, finding potential funders for the subsequent development of a first major release, and developing vodle's long-term vision further.

**Help making vodle more accessible** by translating it into further languages, improving and completing existing translations, adding a dark, high-contrast, or color-blind-friendly theme, improving accessibility for screen readers, or designing and improving in-app aids such as hints, the FAQ and help texts, or a tutorial, demo, or walkthrough.

**Making vodle more stable and sustainable** by improving its overall documentation, identifying bugs and missing inline documentation, turning cryptic "FIXME" and "TODO" comments into proper issues.

**Improving privacy and security** by reviewing and improving vodle's data handling and use of encryption and designing additional protocols.

Later **assist in project and community management** by prioritizing feature requests and bug reports, moderating discussions, offering user support.

Or simply start and **be a friendly observer, frank commentator and neutral advisor** for the project.

If you want to talk to us in person, you can [schedule a zoom meeting](https://app.simplymeet.me/vodle).

### Our commitment

As we are on our way towards a First Stable Release, we currently spend about 10 hours a week on improving the MVP. 
*We commit to reply to your messages in the issue tracker or discussion board within one day.*

If you decide to contribute something, we are very happy to help you get started.
*So if you get stuck at some point in the following section, don't hesitate to ask on the discussion board!* 

## 2. Getting started

You might begin by just scanning our [End user website](http://vodle.it) and reading some of the top-level documentation texts in the [./documentation/development](./documentation/development/) folder, maybe starting with the description of vodle's overall [Architecture](./documentation/development/ARCHITECTURE.md) and the ["poll" entry](./documentation/development/GLOSSARY.md#poll) in the extensive cross-linked [Glossary](./documentation/development/GLOSSARY.md) of the terms and concepts used in the app's UI and code.

If you are interested in code-related stuff, you might then continue with browsing the [Code](#finding-your-way-around-the-code) and the [Issue tracker](https://github.com/pik-gane/vodle/issues) to identify a *good first issue* (some are labelled as such). While the issue tracker is used to report bugs and list enhancements that are ready to implement, our [Discussions page](https://github.com/pik-gane/vodle/discussions) is the place for feature requests, ideas, questions, and the like. There you can see what we're currently thinking about. 

The most important issues at the moment are [those related to the First Stable Release](https://github.com/pik-gane/vodle/milestone/2).

Some types of contribution can be made without installing a development version of vodle on your own computer, such as documentation-related thinds, code reviews, designing stuff.

But other types of contribution will require *setting up a development and testing environment* – that is described in [INSTALL.md](./INSTALL.md).

In any case, it might be a good idea to take a short tour as described [here](./documentation/development/BASIC_MANUAL_TEST_TOUR.md). 

## 3. Contributing code
We are very happy if you decide to contribute code! We are committed to keep all contributions to vodle free and open-source software, licensed under the very strong copyleft license AGPL-3.0 or later. Hence we need all contributors to give use the necessary nonexclusive rights that will allow us to enforce this license. This is the reason why we ask you to sign a Contributor License Agreement (CLA) before we merge your pull request. We have chosen a very light and balanced version of CLA designed by the Free Software Foundation Europe, the so-called "Fiduciary License Agreement (FLA) 2.0" which was [designed to ensure that the software will forever remain Free Software](https://fsfe.org/activities/fla/fla.en.html) without giving us undue power. If you have any questions about this, please contact us.

Before you start coding: 
- Please set up your git to [sign all commits](https://docs.github.com/articles/about-gpg/) automatically, because our branch protection rules require all commits to be signed before merging them into main, and it is easier to do it right away than signing them afterwards. (In case you forgot to sign some commits before pushing them, you can follow [this guide](https://webdevstudios.com/2020/05/26/retroactively-sign-git-commits/) to sign then retroactively, but that requires more work than setting it up in advance).

Once you do a pull request:
- Please [sign our Contributor License Agreement](https://cla-assistant.io/pik-gane/vodle).

### 3.1. Finding your way around the code

Each app page and dialog lives as a ***component*** in its own folder inside [src/app/](./src/app/). 
Its layout and UI are given by an Angular template file `*.page.html`,
while the top-level logics is coded in a Typescript file `*.page.ts`.

Lower-level logics are implemented via ***services*** that are used by the page components. Each service is coded in a Typescript file `*.service.ts` inside [src/](./src/):
- The [GlobalService](./src/app/global.service.ts) is the entry point for all services. 
- The [PollService](./src/app/poll.service.ts) defines classes for [polls](./documentation/development/GLOSSARY.md#poll) and [options](./documentation/development/GLOSSARY.md#option) and handles the [tallying](./documentation/development/GLOSSARY.md#tallying) of [results](./documentation/development/GLOSSARY.md#results).
- The [DelegationService](./src/app/delegation.service.ts) handles everything related to [delegation](./documentation/development/GLOSSARY.md#delegation).
- The [NewsService](./src/app/news.service.ts) handles [news items](./documentation/development/GLOSSARY.md#news-item).
- The [SettingsService](./src/app/settings.service.ts) manages a [user](./documentation/development/GLOSSARY.md#user)'s settings.
- Finally, the [DataService](./src/app/data.service.ts) handles the bottom-level [data management](./documentation/development/GLOSSARY.md#user-data-item) (see [Architecture](./documentation/development/ARCHITECTURE.md)).

When coding, please try to stick to the style you see in the existing code. There are only a very few [conventions](./documentation/development/CONVENTIONS.md).

## 4. Working on translations

Currently, the following workflow for translations has proved useful:

1. If the language you want to work on is not yet supported at all, open an issue in the issue tracker (https://github.com/pik-gane/vodle/issues) similar to this one: https://github.com/pik-gane/vodle/issues/61  In that issue, indicate whether you prefer to use [Crowdin](https://crowdin.com) or [Weblate](https://weblate.org/en/) for working on the translations. Even though we [have used Crowdin in the past](https://crowdin.com/project/vodle), **we encourage you to use Weblate** instead since it is libre software. Both tools will be free of charge for you (you have to register for free accounts there however). A third option would be to work on the JSON files directly, but we discourage this since it makes the review process harder; if you still choose this way, please contact us first before you work on a JSON file directly.
2. Once there is an issue and prospective contributor for a language, we will set up that language in Crowdin or Weblate and put the link to it into the issue. The current weblate translations can be found [here](https://hosted.weblate.org/projects/vodle/).
3. If working with Crowdin, you can start working on new or existing translations by clicking on the language and then on "en.json". The Crowdin GUI lets you filter text snippets by status, but we recommend to use the filter "Show all" since that keeps the text snippets in a logical ordering, grouped by context / app page (the same ordering they appear in the corresponding JSON file). 
4. If working with Weblate, please look at this [video tutorial](https://www.youtube.com/watch?v=VFwTn32MrBw) for now. Once we have collected experiences with it, we will add some details here as well. 
5. Some text snippets begin with "COMMENT" – they are meant to guide you and need not be translated. An additional orientation about where a snippet eventually goes can be seen under the "context" headline below the text snippet on the right-hand side of the Crowdin GUI.
6. If you are unsure where a particular text snippet goes, you can browse [this gallery of screeenshots](https://github.com/pik-gane/vodle/files/9815313/translate_key_screenshots.zip) for its key.
7. Some terms (e.g., "wap", "approve", "option") require special care and are thus described in Crowdin's glossary/terminology, which you can switch on via the third button on the right-hand side of the Crowdin editor: ![image](https://user-images.githubusercontent.com/22815964/197727161-956ebd09-6682-4515-b660-8c846dadac3f.png) 
8. While you're working on a translation, please report ever so often in the corresponding issue page, where we can also clarify questions.
9. If you spot an error in the English base text, please *do not* correct it within the translation tool but rather report it in the issue page.
10. Once you want to have a look at your changes in a test installation, simply tell us in the issue page and we will set up a test installation for you.
11. Once you want your changes reviewed, we need to identify another person who speaks that language, and we would be grateful if you could suggest someone for this task :-)

If you are more experienced with Weblate than us and can recommend improvements to our workflow especially regarding the review process and synchronisation between the git repo and the translation tool, please let us know!

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

