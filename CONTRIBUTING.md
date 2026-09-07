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

vodle's user interface lives in one JSON file per language under
[`src/assets/i18n/`](./src/assets/i18n/), with `en.json` as the source of truth.
We manage translations through [Weblate](https://hosted.weblate.org/projects/vodle/),
which is libre software and free of charge for you (you need a free account there).

We have [used Crowdin in the past](https://crowdin.com/project/vodle) and
`crowdin.yml` is still in the repository, but Weblate is the tool we actively
maintain. Please start there unless you have a specific reason not to.

Editing the JSON files directly is a third option, but we discourage it: it makes
review harder and Weblate will overwrite the file on its next sync. If you still
want to go that way, please talk to us first.

### For translators

1. **If your language is not supported yet**, open an issue in the
   [issue tracker](https://github.com/pik-gane/vodle/issues), similar to
   [#61](https://github.com/pik-gane/vodle/issues/61). We will set the language up
   in Weblate and put the link into the issue.
2. **Getting started with Weblate**: this
   [video tutorial](https://www.youtube.com/watch?v=VFwTn32MrBw) is a good
   introduction. Pick the vodle project, then your language, then the
   *user interface* component.
3. **Ordering.** The strings are grouped by app page, in the same order as in the
   JSON file. Browsing in that order gives you far more context than jumping
   between untranslated strings, so we recommend working through a page at a time
   rather than filtering by state.
4. **Comments.** Strings beginning with `[COMMENT]`, and keys starting with an
   underscore (`_HEADER_`, `_OVERALL_CONVENTIONS_`, …), are guidance for you and
   need not be translated. Leave them as they are.
5. **Where does this string go?** The key name tells you the page
   (`poll.winner-is` is on the poll page). If that is not enough, browse
   [this gallery of screenshots](https://github.com/pik-gane/vodle/files/9815313/translate_key_screenshots.zip)
   for the key.
6. **Special terms.** Some words — "wap", "approve", "option", "share" — carry a
   specific meaning in vodle and should be translated consistently. See the
   `glossary` entries in `en.json`, and ask in your language's issue if a term is
   unclear.
7. **Sentence fragments.** Several keys are pieces of a sentence that surround an
   inserted value, e.g. `explain.among-them-line-1-before-optionname` and
   `…-after-optionname`. Your language may not need any text in one of these
   positions. **Do not just leave it empty** — say so in your language's issue, so
   we can register it (see *Empty strings* below). An empty string means "not
   translated yet" and will be shown in English.
8. **Errors in the English source text**: please do *not* fix them in Weblate.
   Report them in the issue instead, so the change reaches every language.
9. **Progress and questions**: report in your language's issue every so often —
   that is also where we sort out anything unclear.
10. **Trying it out**: say so in the issue and we will set up a test installation
    for you.
11. **Review**: we look for a second speaker of the language to review. If you can
    suggest someone, we would be grateful.

### How the synchronisation works

Useful to know, because the behaviour is not obvious:

- **Weblate does not push to `main`.** It pushes to its own fork and keeps a
  single pull request open against this repository
  ([#281](https://github.com/pik-gane/vodle/pull/281)), rebasing it as
  translations come in. So "Push" succeeding in Weblate and nothing appearing in
  `main` is the normal state, not a failure. The changes arrive when a maintainer
  merges that PR.
- **The PR needs a maintainer.** `main` is a protected branch, so the Weblate PR
  will sit at "blocked" until someone reviews and merges it. If it has been quiet
  for a while, that is the thing to check.
- **Empty strings mean "untranslated".** Weblate writes out every key for every
  language and fills the ones nobody has translated yet with `""`.
  [ngx-translate](https://github.com/ngx-translate/core) only falls back to the
  default language when a key is *missing*, not when it is present and empty, so
  such strings would render blank. [`src/app/i18n-loader.ts`](./src/app/i18n-loader.ts)
  strips empty values at load time, which turns them back into genuine misses and
  restores the English fallback.
- **Intentionally empty strings** — see translator step 7 — must therefore be
  registered in the `INTENTIONALLY_EMPTY` map in `src/app/i18n-loader.ts`, keyed by
  language and dot-separated path. Anything not listed there is treated as
  untranslated. Nothing is ever pruned from `en.json`, since that is the fallback
  target.

If you are more experienced with Weblate than we are and can suggest improvements
to this workflow — especially around review — please let us know.

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

