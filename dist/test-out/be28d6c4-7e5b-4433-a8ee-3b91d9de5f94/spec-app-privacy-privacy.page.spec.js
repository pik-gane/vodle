import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import "./chunk-HQCDYSGJ.js";
import "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import {
  DomSanitizer,
  init_platform_browser
} from "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
  Pipe,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/privacy/privacy.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/privacy/privacy.page.ts
init_tslib_es6();

// angular:jit:template:src/app/privacy/privacy.page.html
var privacy_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'privacy.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<!-- IF GERMAN, USE GERMAN VERSION: -->

@if (translate.currentLang()=='de') {
  <ion-content class="ion-padding">
    <ion-item color="primary">
      <ion-label><span [innerHtml]="E.privacy_statement_headline"></span></ion-label>
    </ion-item>
    <br/>
    <iframe width="100%" height="60%" frameBorder="5"
      [src]="E.privacy_statement_url|safe">
    </iframe>
    <br/>
    <br/>
    <ion-item color="primary">
      <ion-label>
        Kurzform: Was \u2013 warum \u2013 wie?
      </ion-label>
    </ion-item>
    <p>
      Den Entwickler:innen und Betreiber:innen von vodle ist der Schutz Deiner Daten sehr wichtig. Dieser Text beschreibt allgemeinverst\xE4ndlich, welche Daten wir verwenden, wie wir sie sch\xFCtzen, und was Du zur Wahrnehmung Deiner Rechte tun kannst. Die rechtlich verbindliche vollst\xE4ndige Datenschutzerkl\xE4rung findest Du weiter oben unter A.
    </p>
    <h3>
      Zusammenfassung: Wie werden meine Daten gesch\xFCtzt?
    </h3>
    <p>
      vodle sch\xFCtzt Deine Daten auf mehrere Weisen:
    </p>
    <ul>
      <li><p>
        Es werden nur Daten gespeichert, die f\xFCr die Zwecke der Software n\xF6tig sind (siehe Abschnitt 1 und 2 weiter unten).
      </p>
      <li><p>
        Daten werden nur dort gespeichert, wo sie zur Verarbeitung oder zum Datenaustausch zwischen Endger\xE4ten oder Teilnehmer:innen ben\xF6tigt werden (siehe Abschnitt 3).
      </p>
      <li><p>
        Daten werden verschl\xFCsselt gespeichert, wo sie nicht in unverschl\xFCsselter Form ben\xF6tigt werden, so dass niemand sie lesen kann (siehe Abschnitt 3).
      </p>
      <li><p>
        Daten werden pseudonymisiert gespeichert, wo sie nicht in Personen zugeordneter Form ben\xF6tigt werden, so dass sie niemand direkt Deiner Person zuordnen kann (siehe Abschnitt 3).
      </p>
      <li><p>
        Es bekommen nur Personen Zugriff auf die Daten, die Zugriff ben\xF6tigen (siehe Abschnitt 4).
      </p>
      <li><p>
        Die Daten werden nur solange gespeichert, wie n\xF6tig (siehe Abschnitt 5).
      </p>
    </ul>
    <h2>
      1. Welche personenbezogenen Daten verwendet vodle?
    </h2>
    <p>
      In vodle werden drei Arten von personenbezogenen Daten verwendet: Nutzerdaten, Abstimmungsdaten und Deine IP-Adresse.
    </p>
    <h3>
      1.1. Nutzerdaten
    </h3>
    <p>
      Deine Nutzerdaten gehen nur Dich etwas an und werden lediglich zwischen Deinen eigenen Endger\xE4ten in verschl\xFCsselter Form ausgetauscht (siehe unten). Nutzerdaten sind:
    </p>
    <ul>
      <li><p>
        Deine E-Mail-Adresse (aber <i>keine</i> sonstigen identifizierenden Merkmale wie etwa Name, Adresse oder Telefonnummer)
      </p>
      <li><p>
        Ein von Dir gew\xE4hltes Passwort
      </p>
      <li><p>
        Zu welchen Abstimmungen Du eingeladen wurdest, an welchen Du teilnimmst, und welche Du selbst erstellt hast
      </p>
      <li><p>
        Von Dir gew\xE4hlte Spitznamen von Personen, an die Du delegierst (aber <i>keine</i> sonstigen identifizierenden Merkmale wie etwa E-Mail-Adresse, Adresse oder Telefonnummer)
      </p>
      <li><p>
        Einstellungen, die Du auf der Einstellungsseite vornehmen kannst, insbesondere: bevorzugten Sprache, Farbschema, gew\xFCnschten Benachrichtigungen
      </p>
      <li><p>
        Texte und Einstellungen in Entw\xFCrfen von Abstimmungen, die Du noch nicht gestartet hast, insbesondere: Typ, Sprache und Enddatum der Abstimmung, \xDCberschriften, Namen von Optionen, Beschreibungstexte und Adressen von externen Webseiten
      </p>
      <li><p>
        Falls Du als Speicherort Deiner verschl\xFCsselten Nutzerdaten einen anderen Datenbankserver als den zentralen vodle-Datenbankserver angegeben hast (siehe unten), dann speichert vodle auch die Adresse und das Passwort dieses Datenbankservers.
      </p>
    </ul>
    <h3>
      1.2. Abstimmungsdaten
    </h3>
    <p>
      Abstimmungsdaten sind Daten, die zur Durchf\xFChrung von Abstimmungen n\xF6tig sind. Sie gehen daher alle Teilnehmer:innen etwas an und werden deshalb mit diesen in pseudonymisierter und verschl\xFCsselter Form ausgetauscht (siehe unten). Abstimmungsdaten sind:
    </p>
    <p><b>
      Ver\xE4nderbare Abstimmungsdaten:
    </b></p>
    <ul>
      <li><p>
        Die Stellung der Schieberegler, mit denen Du Deine Bereitschaft signalisierst, den einzelnen Optionen in einer Abstimmung zuzustimmen (\u201EWaps\u201C)
      </p>
      <li><p>
        Welche Anfragen nach Delegation Du an andere Personen gestellt hast, welche davon angenommen oder abgelehnt wurden, und die Stellung der Schalter, mit denen Du die Delegation einzelner Optionen an und ausschalten kannst
      </p>
      <li><p>
        Welche Anfragen nach Delegation anderer Personen Du selbst angenommen oder abgelehnt hast
      </p>
    </ul>
    <p><b>
      Unver\xE4nderliche Abstimmungsdaten:
    </b></p>
    <ul>
      <li><p>
        Texte und Einstellungen, die Du bei der Erstellung von neuen Abstimmungen oder Optionen eingegeben hast, insbesondere: Typ, Sprache und Enddatum der Abstimmung, \xDCberschriften, Namen von Optionen,Beschreibungstexte und Adressen von externen Webseiten
      </p>
      <li><p>
        Falls Du als Speicherort der verschl\xFCsselten Abstimmungsdaten einen anderen Datenbankserver als den zentralen vodle-Datenbankserver angegeben hast (siehe unten), dann f\xE4llt hierunter auch die Adresse und das Passwort dieses Datenbankservers.
      </p>
    </ul>
    <h3>
      1.3. Deine IP-Adresse
    </h3>
    <p>
      Siehe hierzu Abschnitt 6 weiter unten.
    </p>
    <h2>
      2. Wozu verwendet vodle diese Daten?
    </h2>
    <p>
      vodle verwendet Deine Nutzerdaten\u2026
    </p>
    <ul>
      <li><p>
        damit Du an vodle-Abstimmungen teilnehmen und selbst vodle-Abstimmungen ansto\xDFen kannst
      </p>
      <li><p>
        damit Du Deine Abstimmungsdaten \xFCber mehrere vodle-Sitzungen (im Browser oder in der vodle-App) hinweg und \xFCber mehrere Endger\xE4te hinweg verfolgen, ver\xE4ndern und an die Situation anpassen kannst
      </p>
      <li><p>
        damit Du Deine Waps an andere Teilnehmer:innen delegieren und deren Delegationsanfragen beantworten kannst
      </p>
      <li><p>
        damit Du die vodle-App an Deine Bed\xFCrfnisse anpassen kannst
      </p>
    </ul>
    <p>
      vodle verwendet Deine Abstimmungsdaten\u2026
    </p>
    <ul>
      <li><p>
        damit andere Personen an von Dir angesto\xDFenen Abstimmungen teilnehmen und von Dir vorgeschlagene Optionen sehen k\xF6nnen
      </p>
      <li><p>
        damit der momentane Stand der Abstimmung und das endg\xFCltige Abstimmungsergebnis berechnet und von allen Teilnehmer:innen auf Stimmigkeit \xFCberpr\xFCft werden k\xF6nnen
      </p>
    </ul>
    <h2>
      3. Wo speichert vodle meine Daten?
    </h2>
    <p>
      vodle speichert Nutzer- und Abstimmungsdaten auf Deinem Endger\xE4t und in verschl\xFCsselter Form auch auf einem oder mehreren von Dir ausgew\xE4hlten Datenbankserver(n).
    </p>
    <p>
      Deine Abstimmungsdaten werden au\xDFerdem in pseudonymisierter Form auch auf den Endger\xE4ten anderer Abstimmungsteilnehmer:innen gespeichert. Dies ist n\xF6tig, damit alle Teilnehmer:innen das Abstimmungsergebnis ermitteln und dessen G\xFCltigkeit pr\xFCfen k\xF6nnen.
    </p>
    <p>
      vodle sendet dar\xFCberhinaus <u>keinerlei</u> Daten an sonstige Dritte, insbesondere <u>nicht</u> an Anbieter von Schriftarten, Bildern oder anderen Inhalten, Services zur Nutzerverfolgung oder Nutzungsanalyse, Werbetreibende oder \xE4hnliche.
    </p>
    <h3><b>
      3.1. Eigene Endger\xE4te
    </b></h3>
    <p>
      Auf Deinem Endger\xE4t werden die Daten in unverschl\xFCsselter Form gespeichert, solange Du angemeldet bist. Sie werden dort vollst\xE4ndig gel\xF6scht, sobald Du Dich abmeldest. vodle verwendet <i>keinerlei Cookies</i>. Stattdessen speichert vodle die Daten in der sogenannten \u201Elokalen Speicherung\u201C (\u201Elocal storage\u201C) des Browsers oder der vodle-App.
    </p>
    <h3>
      3.2. Datenbankserver
    </h3>
    <p>
      Als Datenbankserver kann der vom Potsdam-Institut f\xFCr Klimafolgenforschung bereitgestellte Standardserver (\u201Evodle cloud\u201C) oder beliebige andere f\xFCr vodle geeignete Datenbankserver verwendet werden, die von Dir selbst oder von Dritten bereitgestellt werden.
    </p>
    <p>
      Wenn Du unter \u201EEinstellungen\u201C keinen anderen Server ausw\xE4hlst, verwendet vodle f\xFCr Deine Nutzerdaten den zentralen Server \u201Evodle cloud\u201C. F\xFCr Deine Abstimmungsdaten wird jeweils derjenige Server verwendet, der bei der Erstellung der Abstimmung ausgew\xE4hlt wurde. Wenn dort nichts Anderes eingestellt wurde, ist dies ebenfalls der zentrale Server \u201Evodle cloud\u201C.
    </p>
    <p>
      Auf diesem oder diesen Datenbankserver(n) werden die Daten nur in pseudonymisierter und verschl\xFCsselter Form gespeichert.
    </p>
    <p>
      Zur <b>Verschl\xFCsselung</b> Deiner Nutzerdaten dient das von Dir gew\xE4hlte Passwort. Zur Verschl\xFCsselung Deiner Abstimmungsdaten dient ein automatisch generiertes Abstimmungspasswort, das allen Teilnehmer:innen der Abstimmung bekannt ist.
    </p>
    <p>
      Lediglich das Enddatum einer Abstimmung wird unverschl\xFCsselt gespeichert. Dies ist notwendig, damit der Datenbankserver anhand des Enddatums \xFCberpr\xFCfen kann, ob gew\xFCnschte \xC4nderungen an Abstimmungsdaten zul\xE4ssig sind, denn \xC4nderungen sind nach dem Enddatum unzul\xE4ssig.
    </p>
    <p>
      Zur <b>Pseudonymisierung</b> Deiner Nutzerdaten dient ein Schl\xFCssel, der aus Deiner E-Mail-Adresse und Deinem Passwort erzeugt wird, aus dem aber andersherum weder Deine E-Mail-Adresse noch Dein Passwort abgelesen werden k\xF6nnen. Das sorgt daf\xFCr, dass weder die verschl\xFCsselten noch die entschl\xFCsselten Daten direkt Deiner Person zugeordnet werden k\xF6nnen, es sei denn, man kennt sowohl Deine E-Mail-Adresse und Dein Passwort. Zur Pseudonymisierung Deiner Abstimmungsdaten dient ein individueller Schl\xFCssel, der beim ersten Betreten der Abstimmung zuf\xE4llig erzeugt und in Deinen Nutzerdaten gespeichert wird.
    </p>
    <h3>
      3.3. Endger\xE4te anderer Teilnehmer:innen
    </h3>
    <p>
      Auf den Endger\xE4ten der anderen Abstimmungsteilnehmer:innen werden Deine Abstimmungsdaten unverschl\xFCsselt aber pseudonymisiert gespeichert, so dass ohne den Pseudonymisierungsschl\xFCssel keine direkte Zuordnung zu Deiner Person m\xF6glich ist.
    </p>
    <h2>
      4. Wer hat Zugriff auf meine Daten und wer kann meine Daten meiner Person zuordnen?
    </h2>
    <p>
      Solange Du im Browser oder der vodle-App bei vodle eingeloggt bist, hat jede Person, die Deinen Browser oder Deine vodle-App \xF6ffnen kann, Zugriff auf Deine Daten, kann diese auch \xE4ndern und \xFCber Deine E-Mail-Adresse Deiner Person zuordnen.
    </p>
    <p><i>
      Du solltest Dich deshalb auf gemeinsam genutzten oder nicht hinreichend gesch\xFCtzten Endger\xE4ten immer zwischen den Sitzungen von vodle abmelden!
    </i></p>
    <p>
      Die Betreiber:innen von Datenbankservern und andere Personen, die Zugriff auf die Datenbankserver haben, haben lediglich Zugriff auf die pseudonymisierten und verschl\xFCsselten Daten. Sie k\xF6nnen diese daher weder entschl\xFCsseln noch direkt Deiner Person zuordnen, es sei denn, sie kennen Deine E-Mail-Adresse oder Dein Passwort. <i>Du solltest deshalb den Betreiber:innen von Datenbankservern auf keinen Fall Dein Passwort mitteilen!</i>
    </p>
    <h3>
      4.1. Nutzerdaten
    </h3>
    <p>
      Wenn Du aus vodle ausgeloggt bist, hat niemand Zugriff auf Deine Nutzerdaten, es sei denn, man kennt Deine E-Mail-Adresse, Dein Passwort, den Server, den Du f\xFCr Deine Nutzerdaten verwendest, und das Server-Passwort.
    </p>
    <h3>
      4.2. Abstimmungsdaten
    </h3>
    <p>
      Wenn Du aus vodle ausgeloggt bist, hat au\xDFer den Teilnehmer:innen einer Abstimmung niemand Zugriff auf Deine Abstimmungsdaten f\xFCr diese Abstimmung, es sei denn, man kennt Deine E-Mail-Adresse, Dein Passwort, den Server, den Du f\xFCr Deine Nutzerdaten verwendest, und das Server-Passwort.
    </p>
    <p>
      Die Teilnehmer:innen einer Abstimmung k\xF6nnen Deine Abstimmungsdaten nur in pseudonymisierter Form sehen, aber nicht \xE4ndern. Wenn ein:e Teilnehmer:in einer Abstimmung eingeloggt ist, kann auch jede Person, die den Browser oder die vodle-App dieser Person \xF6ffnen kann, Deine Abstimmungsdaten dieser Abstimmung in pseudonymisierter Form sehen, aber nicht \xE4ndern.
    </p>
    <p>
      Solange Du keine Delegationsanfrage an eine:n andere:n Teilnehmer:in stellst oder eine solche von einer anderen Person annimmst, kann niemand Deine Abstimmungsdaten direkt Deiner Person zuordnen.
    </p>
    <p>
      <b>Offenlegung bei Delegation.</b>
      Wenn Du eine Delegationsanfrage an eine:n andere:n Teilnehmer:in stellst oder eine solche von einer anderen Person annimmst, kann diese Person allerdings Deine Abstimmungsdaten direkt Deiner Person zuordnen. Umgekehrt kannst Du dann auch die Abstimmungsdaten dieser Person direkt dieser Person zuordnen. Wenn die Person eingeloggt ist, kann auch jede andere Person, die den Browser oder die vodle-App dieser Person \xF6ffnen kann, Deine Abstimmungsdaten dieser Abstimmung m\xF6glicherweise direkt Deiner Person zuordnen.
    </p>
    <p><i>
      Du solltest also nur von vertrauensw\xFCrdigen Personen Delegation erbitten oder deren Delegationsanfragen annehmen!
    </i></p>
    <h2>
      5. Wie lange werden meine Daten gespeichert?
    </h2>
    <h3>
      5.1. Nutzerdaten
    </h3>
    <p>
      Auf Deinem Endger\xE4t werden Deine Nutzerdaten solange gespeichert, bis Du sie \xE4nderst oder alle Daten komplett l\xF6schst.
    </p>
    <p>
      Auf dem verwendeten Datenbankserver werden Deine Nutzerdaten solange gespeichert, bis Du sie auf Deinem Endger\xE4t \xE4nderst oder alle Daten komplett l\xF6schst und der Browser oder die vodle-App diese \xC4nderung oder L\xF6schung an den Server mitteilen konnte. Dazu ist eine Internetverbindung n\xF6tig.
    </p>
    <h3>
      5.2. Abstimmungsdaten
    </h3>
    <p>
      Auf Deinem Endger\xE4t werden Deine Abstimmungsdaten solange gespeichert, bis Du sie \xE4nderst oder alle Daten komplett l\xF6schst. \xC4nderungen sind allerdings nur an ver\xE4nderbaren Abstimmungsdaten m\xF6glich, und dies auch nur vor dem Enddatum der Abstimmung.
    </p>
    <p>
      Auf dem verwendeten Datenbankserver werden Deine Abstimmungsdaten solange gespeichert, bis Du sie auf Deinem Endger\xE4t \xE4nderst und der Browser oder die vodle-App diese \xC4nderung an den Server mitteilen konnte. Dazu ist eine Internetverbindung n\xF6tig.
    </p>
    <p>
      <b>Achtung:</b>
      Auch wenn Du auf Deinem Endger\xE4t alle Daten komplett l\xF6schst, bleiben Deine Abstimmungsdaten auf dem Datenbankserver und den Endger\xE4ten der anderen Teilnehmer:innen dennoch in pseudonymisierter Form gespeichert, bis sie nach einer hinreichend langen Pr\xFCfzeit nach dem Ende der Abstimmung durch die Datenbank oder die vodle-App der Teilnehmer:innen gel\xF6scht werden. Dies ist notwendig, um die Eindeutigkeit des Abstimmungsergebnisses zu gew\xE4hrleisten und alle Teilnehmer:innen die \xDCberpr\xFCfung seiner G\xFCltigkeit zu erm\xF6glichen. Diese verl\xE4ngerte Speicherung betrifft aber nur Deine Abstimmungsdaten, nicht Deine Nutzerdaten.
    </p>
    <h2>
      6. Deine IP-Adresse
    </h2>
    <ul>
      <li><p>
        <b>Webserver.</b>
        Wenn Du vodle im Browser statt in der vodle-App verwendest, wird am Anfang jeder vodle-Sitzung Deine IP-Adresse an den zentralen vodle-Webserver am Potsdam-Institut f\xFCr Klimafolgenforschung gesendet, um von dort die vodle-Software inklusive aller Schriftarten und Bilder in Deinen Browser zu laden. Der Webserver speichert Deine IP-Adresse jedoch <u>nicht</u>. vodle sendet Deine IP-Adresse auch <u>nicht</u> an Dritte wie z.B. Anbieter von Schriftarten, Bildern oder Software-Komponenten.
      </p>
      <li><p>
        <b>Datenbankserver.</b>
        Beim Datenaustausch zwischen Deinem Endger\xE4t und den verwendeten Datenbankservern wird Deine IP-Adresse an diese Datenbankserver \xFCbermittelt. Der vom Potsdam-Institut f\xFCr Klimafolgenforschung bereitgestellte Datenbankserver \u201Evodle cloud\u201C speichert Deine IP-Adresse <u>nicht</u>. Wenn Du einen eigenen Datenbankserver verwendest und wie in vodle beschrieben konfigurierst, dann speichert dieser IP-Adressen bereitgestellt werden, k\xF6nnten aber IP-Adressen speichern.
      </p>
      <li><p>
        <b>Externe Webseiten.</b>
        Die Beschreibungen von Abstimmungen in vodle k\xF6nnen Links zu externen Webseiten enthalten, wenn die Ersteller:innen der Abstimmungen solche Links eingetragen haben. Wenn Du auf einen solchen Link klickst, sendet Dein Endger\xE4t m\xF6glicherweise Deine IP-Adresse an die externe Webseite, um den externen Inhalt abzurufen. Dieser Abruf geschieht allerdings in einer getrennten Browser-Sitzung, so dass die externe Webseite keinen Zugriff auf Session-Daten Deiner vodle-Sitzung bekommt.
      </p>
    </ul>
    <p>
      Wenn Du die hier beschriebenen \xDCbermittlungen Deiner IP-Adresse verhindern willst, kannst Du Ma\xDFnahmen zum anonymen Surfen ergreifen, z.B. einen Proxyserver verwenden.
    </p>
  </ion-content>
}


<!-- OTHERWISE USE ENGLISH VERSION: -->

@if (translate.currentLang()!='de') {
  <ion-content class="ion-padding">
    <ion-item color="primary">
      <ion-label><span [innerHtml]="E.privacy_statement_headline"></span></ion-label>
    </ion-item>
    <br/>
    <iframe width="100%" height="60%" frameBorder="5"
      [src]="E.privacy_statement_url|safe">
    </iframe>
    <br/>
    <br/>
    <ion-item color="primary">
      <ion-label>
        In brief: What \u2013 why \u2013 how?
      </ion-label>
    </ion-item>
    <p>
      The protection of your data is very important to the developers and operators of vodle. This text describes in general terms what data we use, how we protect it and what you can do to exercise your rights. The legally binding complete data protection statement can be found above under A.
    </p>
    <h3>
      Summary: How is my data protected?
    </h3>
    <p>
      vodle protects your information in several ways:
    </p>
    <ul>
      <li><p>
        Only data that is necessary for the purposes of the software is stored (see sections 1 and 2 below).
      </p>
      <li><p>
        Data is only stored where it is needed for processing or data exchange between devices or participants (see section 3 below).
      </p>
      <li><p>
        Data is stored in encrypted form where it is not needed in unencrypted form so that no one can read it (see section 3).
      </p>
      <li><p>
        Data is stored pseudonymously where it is not needed in person-identified form, so that no one can attribute it directly to your person (see section 3).
      </p>
      <li><p>
        Only persons who need access to the data are granted access (see section 4).
      </p>
      <li><p>
        The data will only be stored as long as necessary (see section 5).
      </p>
    </ul>
    <h2>
      1. What personal data does vodle use?
    </h2>
    <p>
      Three types of personal data are used in vodle: user data, poll data and your IP address.
    </p>
    <h3>
      1.1. User data
    </h3>
    <p>
      Your user data is your business and is only exchanged between your own end devices in encrypted form (see below). User data are:
    </p>
    <ul>
      <li><p>
        Your e-mail address (but <i>no</i> other identifying characteristics such as name, address or telephone number).
      </p>
      <li><p>
        A password chosen by you
      </p>
      <li><p>
        The polls you have been invited to, the polls you participate in, and the polls you have created yourself
      </p>
      <li><p>
        Nicknames you choose for people you delegate to (but <i>no</i> other identifying characteristics such as email address, address or phone number).
      </p>
      <li><p>
        Settings you can make on the settings page, in particular: preferred language, colour scheme, desired notifications
      </p>
      <li><p>
        Texts and settings in drafts of polls that you have not yet started, in particular: type, language and end date of the poll, headings, names of options, description texts and addresses of external websites.
      </p>
      <li><p>
        If you have specified a database server other than the central vodle database server as the storage location of your encrypted user data (see below), vodle will also store the address and password of this database server.
      </p>
    </ul>
    <h3>
      1.2. Poll data
    </h3>
    <p>
      Poll data is data that is necessary for conducting polls. It therefore concerns all participants and is therefore exchanged with them in pseudonymised and encrypted form (see below). Poll data are:
    </p>
    <p><b>
      Modifiable poll data:
    </b></p>
    <ul>
      <li><p>
        The position of the sliders with which you signal your willingness to approve the individual options in a poll (\u201CWaps\u201D).
      </p>
      <li><p>
        Which requests for delegation you have made to other persons, which of these have been accepted or rejected, and the position of the switches with which you can switch the delegation of individual options on and off.
      </p>
      <li><p>
        Which requests for delegation from other persons you yourself have accepted or rejected.
      </p>
    </ul>
    <p><b>
      Unchangeable poll data:
    </b></p>
    <ul>
      <li><p>
        Texts and settings that you have entered when creating new polls or options, in particular: type, language and end date of the poll, headings, names of options, description texts and addresses of external websites.
      </p>
      <li><p>
        If you have specified a database server other than the central vodle database server as the storage location of the encrypted poll data (see below), then this also includes the address and password of this database server.
      </p>
    </ul>
    <h3>
      1.3. Your IP address
    </h3>
    <p>
      See section 6 below.
    </p>
    <h2>
      2. What does vodle use this data for?
    </h2>
    <p>
      vodle uses your user data...
    </p>
    <ul>
      <li><p>
        so that you can participate in vodle polls and initiate vodle polls yourself
      </p>
      <li><p>
        so that you can track, modify and adapt your poll data across multiple vodle sessions (in the browser or in the vodle app) and across multiple devices
      </p>
      <li><p>
        so that you can delegate your waps to other participants and respond to their delegation requests.
      </p>
      <li><p>
        so that you can adapt the vodle app to your needs
      </p>
    </ul>
    <p>
      vodle uses your poll data...
    </p>
    <ul>
      <li><p>
        so that other people can participate in polls you have initiated and see options you have proposed
      </p>
      <li><p>
        so that the current status of the poll and the final poll results can be calculated and checked for consistency by all participants
      </p>
    </ul>
    <h2>
      3. Where does vodle store my data?
    </h2>
    <p>
      vodle stores user and poll data on your device and in encrypted form also on one or more database server(s) selected by you.
    </p>
    <p>
      Your poll data will also be stored in pseudonymised form on the devices of other participants. This is necessary so that all participants can determine the poll results and check their validity.
    </p>
    <p>
      Other than that, vodle does <u>not</u> send any data to other third parties, in particular not to providers of fonts, images or other content, services for user tracking or usage analysis, advertisers or similar.
    </p>
    <h3><b>
      3.1. Own devices
    </b></h3>
    <p>
      On your device, the data is stored in unencrypted form as long as you are logged in. It will be completely deleted as soon as you log out. vodle does not use any cookies. Instead, vodle stores the data in the so-called \u201Clocal storage\u201D of the browser or the vodle app.
    </p>
    <h3>
      3.2. Database server
    </h3>
    <p>
      The database server can be the standard server provided by the Potsdam Institute for Climate Impact Research (\u201Cvodle cloud\u201D) or any other database server suitable for vodle, provided by yourself or by third parties.
    </p>
    <p>
      If you do not select a different server under \u201CSettings\u201D, vodle will use the central server \u201Cvodle cloud\u201D for your user data. For your poll data, the server that was selected when the poll was created will be used. If nothing else has been set there, this is also the central server \u201Cvodle cloud\u201D.
    </p>
    <p>
      On this or these database server(s), the data is only stored in pseudonymised and encrypted form.
    </p>
    <p>
      To <b>encrypt</b> your user data, the password you choose is used. Your poll data is encrypted by an automatically generated poll password which is known to all participants in the poll.  </p>
      <p>
        Only the end date of a poll is stored unencrypted. This is necessary so that the database server can use the end date to check whether desired changes to poll data are permitted, because changes after the end date are not permitted.
      </p>
      <p>
        To <b>pseudonymise</b> your user data, we use a key. This key is generated from your e-mail address and your password, but neither your e-mail address nor your password can be inferred from it. This ensures that neither the encrypted nor the decrypted data can be directly attributed to your person, unless they know both your e-mail address and your password. An individual key is used to pseudonymise your poll data. This key is randomly generated the first time you enter the poll and is stored in your user data.
      </p>
      <h3>
        3.3. End devices of other participants
      </h3>
      <p>
        On the devices of other participants your poll data will be stored unencrypted but pseudonymised, so that without the pseudonymisation key no direct allocation to your person is possible.
      </p>
      <h2>
        4. Who has access to my data and who can attribute my data to my person?
      </h2>
      <p>
        As long as you are logged in to vodle in your browser or vodle app, anyone who can open your browser or vodle app has access to your data, can also change it and attribute it to your person via your e-mail address.
      </p>
      <p><i>
        You should therefore always log out of vodle between sessions on shared or insufficiently protected end devices!
      </i></p>
      <p>
        The operators of database servers and other persons who have access to the database servers only have access to the pseudonymised and encrypted data. They can therefore neither decrypt it nor attribute it directly to you, unless they know your e-mail address or password. <i>You should therefore never give your password to the operators of database servers!</i>
      </p>
      <h3>
        4.1. User data
      </h3>
      <p>
        If you are logged out of vodle, no one has access to your user data unless they know your e-mail address, your password, the server you use for your user data and the server password.
      </p>
      <h3>
        4.2. Poll data
      </h3>
      <p>
        If you are logged out of vodle, no one other than the participants of a poll will have access to your poll data for that poll unless they know your e-mail address, password, the server you are using for your user data and the server password.
      </p>
      <p>
        The participants in a poll can only see your voting data in pseudonymised form, but cannot change it. If a participant of a poll is logged in, every person who can open the browser or the vodle app of this person can also see your poll data of this poll in pseudonymised form, but cannot change it.
      </p>
      <p>
        As long as you do not make a delegation request to another participant or accept such a request from another person, no one can attribute your poll data directly to your person.
      </p>
      <p>
        <b>Disclosure in case of delegation.</b>
        However, if you make a delegation request to or accept a delegation request from another person, that person will be able to attribute your poll data directly to you. Conversely, you can then also attribute the poll data of this person directly to this person. If the person is logged in, any other person who can open that person's browser or vodle app may also be able to associate your poll data directly with that person.
      </p>
      <p><i>
        So you should only ask for delegation from trusted people or accept their delegation requests!
      </i></p>
      <h2>
        5. How long will my data be stored?
      </h2>
      <h3>
        5.1. User data
      </h3>
      <p>
        Your user data is stored on your end device until you change it or delete all data completely.
      </p>
      <p>
        Your user data will be stored on the database server used until you change it on your device or delete all data completely and the browser or the vodle app has been able to communicate this change or deletion to the server. An internet connection is required for this.
      </p>
      <h3>
        5.2. Poll data
      </h3>
      <p>
        On your end device, your poll data is stored until you change it or delete all data completely. However, changes are only possible on changeable poll data, and only before the end date of the poll.
      </p>
      <p>
        On the database server used, your poll data is stored until you change it on your end device and the browser or vodle app has been able to communicate this change to the server. An internet connection is required for this.
      </p>
      <p>
        <b>Please note:</b>
        Even if you completely delete all data on your end device, your poll data will still be stored in pseudonymised form on the database server and the end devices of the other participants until they are deleted by the database or the vodle app of the participants after a sufficiently long check period after the end of the poll. This is necessary to ensure the uniqueness of the poll results and to enable all participants to check their validity. However, this extended storage only affects your poll data, not your user data.
      </p>
      <h2>
        6. Your IP address
      </h2>
      <ul>
        <li><p>
          <b>Web server.</b>
          If you use vodle in the browser instead of the vodle app, your IP address will be sent to the central vodle web server at the Potsdam Institute for Climate Impact Research at the beginning of each vodle session in order to load the vodle software including all fonts and images into your browser. However, the web server does <i>not</i> store your IP address. vodle does <i>not</i> send your IP address to third parties such as providers of fonts, images or software components.
        </p>
        <li><p>
          <b>Database server.</b>
          When data is exchanged between your device and the database servers used, your IP address is transmitted to these database servers. The database server \u201Cvodle cloud\u201D provided by the Potsdam Institute for Climate Impact Research does <i>not</i> store your IP address. If you use your own database server and configure it as described in vodle, it will store IP addresses but could store IP addresses.
        </p>
        <li><p>
          <b>External websites.</b>
          The descriptions of polls in vodle may contain links to external websites if the creators of the poll have entered such links. When you click on such a link, your device may send your IP address to the external website to retrieve the external content. However, this retrieval takes place in a separate browser session, so that the external website does not have access to session data of your vodle session.
        </p>
      </ul>
      <p>
        If you want to prevent the transmission of your IP address described here, you can take measures to surf anonymously, e.g. use a proxy server.
      </p>
    </ion-content>
  }`;

// angular:jit:style:src/app/privacy/privacy.page.scss
var privacy_page_default2 = "/* src/app/privacy/privacy.page.scss */\n/*# sourceMappingURL=privacy.page.css.map */\n";

// src/app/privacy/privacy.page.ts
init_core();
init_environment();
init_core();
init_platform_browser();
init_ngx_translate_core();
var SafePipe = class SafePipe2 {
  constructor(domSanitizer) {
    this.domSanitizer = domSanitizer;
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  static {
    this.ctorParameters = () => [
      { type: DomSanitizer }
    ];
  }
};
SafePipe = __decorate([
  Pipe({ name: "safe", standalone: false })
], SafePipe);
var PrivacyPage = class PrivacyPage2 {
  constructor(translate) {
    this.translate = translate;
    this.E = environment;
  }
  ngOnInit() {
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService }
    ];
  }
};
PrivacyPage = __decorate([
  Component({
    selector: "app-privacy",
    template: privacy_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [privacy_page_default2]
  })
], PrivacyPage);

// src/app/privacy/privacy.page.spec.ts
describe("PrivacyPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPage, SafePipe],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(PrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=d47536be-2f32-506d-b773-af436b80b745
//# sourceMappingURL=spec-app-privacy-privacy.page.spec.js.map
