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



<!-- PROJECT LOGO -->
<br />
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

We are on our way towards a First Stable Release ([want to help?](./CONTRIBUTING.md)).
- A *Minimal Viable Product (MVP)* is almost finished (90%) and will be ready in May or June.
- Over the summer, we will use the MVP as a demonstrator to win contributors and testers, and to identify missing features for the *First Stable Release.* 

## About the Project

<!--Screenshot slideshow?: [![Product Name Screen Shot][product-screenshot]](https://example.com)-->

Once released, vodle will help groups make better decisions – fairer, more efficient, more consensus-oriented, interactive, and for free. Its underlying algorithm is based on thorough science and makes sure that all participants get the exact same influence on the decision, and that the power any faction receives is proportional to their size. This distinguishes vodle from almost every other voting app, where even a slight majority can make all the decisions. With vodle, a majority of 51% has only 51% power rather than 100%. In vodle, voters can give all options a rating from 0 to 100 or can choose to delegate their rating of an option to another voter they trust. 

This page is mainly for potential contributors and other people interested in how vodle works under the hood.

We are also building a [Website for end users: vodle.it](http://vodle.it).

### Built With

* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [CouchDB](https://couchdb.apache.org/)

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

### I simply want to use it!

The app is not yet ready to be used.

Once the Minimal Viable Product is finished (May or June), you can simply go to [www.vodle.it](http://www.vodle.it) to use vodle as a **web app in your browser**.

Later, when the First Stable Release is ready, you can alternatively install vodle as an **app on your smartphone** via certain app stores.

### I want to learn about the project

You can read about the **scientific basis** for vodle in this [research article](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3751225).

Or you can simply drop me a message to start a **conversation**: [Jobst Heitzig](mailto:heitzig@pik-potsdam.de).

We are currently working towards improving this page to provide you with a detailed documentation of vodle's software architecture.

### I want to set up a vodle database server for my group

While vodle can be used with our central database server, you can get improved performance and privacy if you set up your own database server to be used with vodle in your group. The vodle web app will guide you through the steps required for this. (You will mainly install a standard [CouchDB Docker container](https://hub.docker.com/_/couchdb) on some machine that your group can access)  

### I may want to contribute

You are highly welcome to get involved in any of a number of ways! We have a whole page devoted to this here: [CONTRIBUTING.md](./CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

