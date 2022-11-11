<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]-->
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) 
[![try the MVP](https://img.shields.io/badge/Status-Minimal%20Viable%20Product%20available-brightgreen)](http://app.vodle.it)
![](https://img.shields.io/badge/Status-Approaching%20First%20Release-green)

## *[Contributions welcome!](CONTRIBUTING.md)*


<!-- PROJECT LOGO -->
<div align="center">

  
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/assets/topleft_icon.png" alt="Logo" height="80">
  </a>

  <h1 align="center">A fair and efficient, interactive, general-purpose<br/>group-decision app</h1>

  <!--
  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
  -->
</div>



<!-- TABLE OF CONTENTS - ->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
-->

## Current State & Next Steps

**We are on our way towards a First Stable Release ([want to help?](./CONTRIBUTING.md)).**

- **A *Minimal Viable Product (MVP)* is finished since end of June '22 and can be tried out online at [app.vodle.it](http://app.vodle.it).**

  *--> Are you in a group of people that would be willing to try vodle with our support, to enable us to improve it further?*

- **For now, we will use the MVP as a demonstrator to win contributors and testers, and to identify missing features for the *First Stable Release (V1.0).***

### [See here for possible use cases!](USE_CASES.md) And [here's some gallery of screenshots](https://github.com/pik-gane/vodle/discussions/88#discussion-3973721).

A few of them also here:

<img src="https://user-images.githubusercontent.com/22815964/160769162-0bf8b0b5-31c3-40b6-9efb-3fb40df3d54c.png" width="50%"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/22815964/160769828-991c4886-ed87-457c-8099-8975459311dc.png" width="20%"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/22815964/160771224-38f50a63-8278-43bf-a055-7cb1057e0e5b.png" width="20%"/>

## About the Project

<!--Screenshot slideshow?: [![Product Name Screen Shot][product-screenshot]](https://example.com)-->

vodle is developed by the [FutureLab on Game Theory and Networks of Interacting Agents](https://www.pik-potsdam.de/en/institute/futurelabs/gane) at the [Potsdam Institute for Climate Impact Research](https://www.pik-potsdam.de/), with contributions from the open-source community. 

Once released, ***vodle will help groups make better decisions** – fairer, more efficient, more consensus-oriented, interactive, and for free.* Its underlying algorithm is based on thorough science and makes sure that all participants get the exact same influence on the decision, and that the power any faction receives is proportional to their size. This distinguishes vodle from almost every other voting app, where even a slight majority can make all the decisions. With vodle, a majority of 51% has only 51% power rather than 100%. In vodle, voters can give all options a "wap" from 0 to 100 or can choose to delegate their waps of an option to another voter they trust. Based on the waps, vodle will determine the winner in a fair, proportional, and efficient way.

It's all based on science: [Main article](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3751225) | [Earlier article](https://link.springer.com/article/10.1007/s00355-010-0517-y)

*This page is mainly for potential contributors and other people interested in how vodle works under the hood.*

More details in this [more comprehensive introduction](documentation/INTRODUCTION.md) is

We also have a [Website for end users: **vodle.it**](http://www.vodle.it).

### Built With 

* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [Typescript](https://www.typescriptlang.org/)
* [CouchDB](https://couchdb.apache.org/)

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg" alt="ionic" height="40"/>&nbsp;<img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" height="40"/>&nbsp;<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" height="40"/>&nbsp;<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/couchdb/couchdb-original.svg" alt="couchdb" height="40"/> 

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

### I simply want to use it!

You can easily **set up a poll at [app.vodle.it](http://app.vodle.it/#/draftpoll)** and then send the invite link to your participants.

If you want to try it out first in an existing demo poll, visit **[demo.vodle.it](http://demo.vodle.it)**.

Even though it might still have some smaller bugs *([you can do something about that](CONTRIBUTING.md))*., the app seems to work decently already.

Later, when the First Stable Release is ready, you can alternatively install vodle as an **app on your smartphone** via certain app stores.

### I want to learn about the project

You can read about the **scientific basis** for vodle in this [research article](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3751225).

Or you can simply **talk to us** by starting a new thread on our [discussions page](https://github.com/pik-gane/vodle/discussions).

We are currently working towards improving this page to provide you with a detailed documentation of vodle's software architecture.

### I want to set up a vodle database server for my group

While vodle can be used with our central database server, you can get improved performance and privacy if you set up your own database server to be used with vodle in your group. The vodle web app will guide you through the steps required for this. (You will mainly install a standard [CouchDB Docker container](https://hub.docker.com/_/couchdb) on some machine that your group can access)  

### I may want to contribute

You are highly welcome to get involved in any of a number of ways! We have a whole page devoted to this here: [CONTRIBUTING.md](./CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

## Licenses

- [See here](./LICENSE) for vodle's main license
- [See here](./docs/3rdpartylicenses.txt) for the licenses of 3rd-party components used

<!--TODO: artwork-->

- The AMP runtime used in the landing page is licensed under the CC-BY-4.0 lincense
- The used google fonts Quicksand and Comfortaa are lincensed under the [Open Font License](https://scripts.sil.org/OFL) 
- The delegation and flowers icons are also lincensed under CC-BY lincenses
- The outstretched arms background image is modified from https://pixabay.com/vectors/businessman-silhouette-2873115/ which has a Pixabay license https://pixabay.com/service/license/

(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see [AUTHORS](AUTHORS).


## *Disclaimer: We're Using GitHub Under Protest*

*This project is currently hosted on GitHub.  This is not ideal; GitHub is a
proprietary, trade-secret system that is not Free and Open Souce Software
(FOSS).  We are deeply concerned about using a proprietary system like GitHub
to develop our FOSS project.  We have an
[open discussion](https://github.com/pik-gane/vodle/discussions/215) where the
project contributors are actively discussing how we can move away from GitHub
in the long term.  We urge you to read about the
[Give up GitHub](https://GiveUpGitHub.org) campaign from
[the Software Freedom Conservancy](https://sfconservancy.org) to understand
some of the reasons why GitHub is not a good place to host FOSS projects.*

*If you are a contributor who personally has already quit using GitHub, please
[check this resource](https://github.com/pik-gane/vodle/discussions/215) for how to send us contributions without
using GitHub directly.*

***Any use of this project's code by GitHub Copilot, past or present, is done
without our permission.  We do not consent to GitHub's use of this project's
code in Copilot.***

![Logo of the GiveUpGitHub campaign](https://sfconservancy.org/img/GiveUpGitHub.png)


