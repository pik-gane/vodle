/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
*/

/** The icons the app's templates and menus name, registered with Ionic.
 *
 * Ionic's standalone build bundles no icon it is not told about: each name an
 * `<ion-icon name>` or a menu entry uses is imported here and registered
 * (ionicons' addIcons), so the build carries these sixty-odd SVGs instead of
 * loading them one by one.
 *
 * A name that is NOT here renders nothing at all. The build does copy
 * ionicons' SVGs to `./svg/` (angular.json) and the deployment serves them,
 * but the standalone `ion-icon` never asks: measured in the deployed app on
 * 2026-10-15, an unregistered name leaves the icon's shadow root at
 * `<div class="icon-inner"><slot></slot></div>` with no request made. So a
 * forgotten icon costs the icon, which is how the draft poll page's kebab
 * button came to be an empty space (#368).
 *
 * `node scripts/check-icons.js` compares this list against every name the
 * templates and the menu entries use; CI runs it on every pull request.
 */
import { addIcons } from 'ionicons';
import {
  add,
  addCircleOutline,
  alertOutline,
  analyticsOutline,
  archiveOutline,
  arrowBackOutline,
  arrowDownOutline,
  arrowForwardOutline,
  arrowUndoOutline,
  atOutline,
  ban,
  bulbOutline,
  caretBackOutline,
  caretDown,
  caretDownOutline,
  caretForwardOutline,
  checkmark,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  checkmarkOutline,
  chevronDownOutline,
  chevronForwardOutline,
  chevronUpOutline,
  close,
  closeCircleOutline,
  closeOutline,
  cloudDownloadOutline,
  cloudOfflineOutline,
  colorWandOutline,
  copyOutline,
  cut,
  cutOutline,
  documentOutline,
  downloadOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  eyeOffOutline,
  eyeOutline,
  flagOutline,
  folderOpenOutline,
  helpCircle,
  helpCircleOutline,
  home,
  informationCircleOutline,
  languageOutline,
  logOut,
  mailOpenOutline,
  openOutline,
  paperPlane,
  pauseOutline,
  pencilOutline,
  peopleOutline,
  personOutline,
  playOutline,
  playSkipForwardOutline,
  refreshOutline,
  reloadOutline,
  removeCircleOutline,
  settings,
  share,
  shareSocial,
  shareSocialOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  stopCircleOutline,
  swapVerticalOutline,
  trashOutline,
  trophy,
  trophyOutline,
  warningOutline,
} from 'ionicons/icons';

addIcons({
  'add': add,
  'add-circle-outline': addCircleOutline,
  'alert-outline': alertOutline,
  'analytics-outline': analyticsOutline,
  'archive-outline': archiveOutline,
  'arrow-back-outline': arrowBackOutline,
  'arrow-down-outline': arrowDownOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'arrow-undo-outline': arrowUndoOutline,
  'at-outline': atOutline,
  'ban': ban,
  'bulb-outline': bulbOutline,
  'caret-back-outline': caretBackOutline,
  'caret-down': caretDown,
  'caret-down-outline': caretDownOutline,
  'caret-forward-outline': caretForwardOutline,
  'checkmark': checkmark,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'checkmark-outline': checkmarkOutline,
  'chevron-down-outline': chevronDownOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'chevron-up-outline': chevronUpOutline,
  'close': close,
  'close-circle-outline': closeCircleOutline,
  'close-outline': closeOutline,
  'cloud-download-outline': cloudDownloadOutline,
  'cloud-offline-outline': cloudOfflineOutline,
  'color-wand-outline': colorWandOutline,
  'copy-outline': copyOutline,
  'cut': cut,
  'cut-outline': cutOutline,
  'document-outline': documentOutline,
  'download-outline': downloadOutline,
  'ellipsis-horizontal': ellipsisHorizontal,
  'ellipsis-vertical': ellipsisVertical,
  'eye-off-outline': eyeOffOutline,
  'eye-outline': eyeOutline,
  'flag-outline': flagOutline,
  'folder-open-outline': folderOpenOutline,
  'help-circle': helpCircle,
  'help-circle-outline': helpCircleOutline,
  'home': home,
  'information-circle-outline': informationCircleOutline,
  'language-outline': languageOutline,
  'log-out': logOut,
  'mail-open-outline': mailOpenOutline,
  'open-outline': openOutline,
  'paper-plane': paperPlane,
  'pause-outline': pauseOutline,
  'pencil-outline': pencilOutline,
  'people-outline': peopleOutline,
  'person-outline': personOutline,
  'play-outline': playOutline,
  'play-skip-forward-outline': playSkipForwardOutline,
  'refresh-outline': refreshOutline,
  'reload-outline': reloadOutline,
  'remove-circle-outline': removeCircleOutline,
  'settings': settings,
  'share': share,
  'share-social': shareSocial,
  'share-social-outline': shareSocialOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'sparkles-outline': sparklesOutline,
  'stop-circle-outline': stopCircleOutline,
  'swap-vertical-outline': swapVerticalOutline,
  'trash-outline': trashOutline,
  'trophy': trophy,
  'trophy-outline': trophyOutline,
  'warning-outline': warningOutline,
});
