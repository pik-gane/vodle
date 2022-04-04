# Contributing to ![vodle](https://github.com/pik-gane/vodle/blob/main/resources/icon_tight24.png)  vodle

##### CONTENTS

1. [Introduction](#1-introduction)
2. [Getting started](#2-getting-started)
3. [Finding your way around the code](#3-finding-your-way-around-the-code)
4. [Working on translations](#4-working-on-translations)

## 1. Introduction

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

## 2. Getting started

You might begin by just scanning our [End user website](http://vodle.it) and reading some of the top-level documentation texts in the [doc/development](./doc/development/) folder, maybe starting with the description of vodle's overall [Architecture](./doc/development/ARCHITECTURE.md) and the extensive [Glossary](./doc/development/GLOSSARY.md) of terms used in the app's UI and code.

If you are interested in code-related stuff, you might then continue with browsing the [Code](#finding-your-way-around-the-code) and the [Issue tracker](https://github.com/pik-gane/vodle/issues) to identify a *good first issue* (some are labelled as such). While the issue tracker is used to report bugs and list enhancements that are ready to implement, our [Discussions page](https://github.com/pik-gane/vodle/discussions) is the place for feature requests, ideas, questions, and the like. There you can see what we're currently thinking about. 

The most important issues at the moment are [those related to the Minimal Viable Product Milestone (MVP)](https://github.com/pik-gane/vodle/issues?q=is%3Aopen+is%3Aissue+milestone%3AMVP).

Some types of contribution can be made without installing a development version of vodle on your own computer, such as documentation-related thinds, code reviews, designing stuff.

But other types of contribution will require setting up a development and testing environment – that is described in [INSTALL.md](./INSTALL.md).

In any case, it might be a good idea to take a short tour as described [here](./doc/development/BASIC_MANUAL_TEST_TOUR.md). 

## 3. Finding your way around the code

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

## 4. Working on translations

We will soon provide detailed information on this... in the meantime, please look at the JSON files under [src/assets/i18n/](./src/assets/i18n/).



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
