import {
  createColorClasses,
  init_theme_byZM6qHV
} from "./chunk-VEPFSKM7.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-avatar_3.entry.js
var avatarIosCss, avatarMdCss, Avatar, badgeIosCss, badgeMdCss, Badge, thumbnailCss, Thumbnail;
var init_ion_avatar_3_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-avatar_3.entry.js"() {
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    init_theme_byZM6qHV();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    avatarIosCss = () => `:host{border-radius:var(--border-radius);display:block}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}:host{--border-radius:50%;width:48px;height:48px}`;
    avatarMdCss = () => `:host{border-radius:var(--border-radius);display:block}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}:host{--border-radius:50%;width:64px;height:64px}`;
    Avatar = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        return h(Host, { key: "998217066084f966bf5d356fed85bcbd451f675a", class: getIonMode(this) }, h("slot", { key: "1a6f7c9d4dc6a875f86b5b3cda6d59cb39587f22" }));
      }
    };
    Avatar.style = {
      ios: avatarIosCss(),
      md: avatarMdCss()
    };
    badgeIosCss = () => `:host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);--padding-top:3px;--padding-end:8px;--padding-bottom:3px;--padding-start:8px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:inline-block;min-width:10px;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);font-size:0.8125rem;font-weight:bold;line-height:1;text-align:center;white-space:nowrap;contain:content;vertical-align:baseline}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(:empty){display:none}:host{border-radius:10px;font-size:max(13px, 0.8125rem)}`;
    badgeMdCss = () => `:host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);--padding-top:3px;--padding-end:8px;--padding-bottom:3px;--padding-start:8px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:inline-block;min-width:10px;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);font-size:0.8125rem;font-weight:bold;line-height:1;text-align:center;white-space:nowrap;contain:content;vertical-align:baseline}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(:empty){display:none}:host{--padding-top:3px;--padding-end:4px;--padding-bottom:4px;--padding-start:4px;border-radius:4px}`;
    Badge = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "1a2d39c5deec771a2f2196447627b62a7d4c8389", class: createColorClasses(this.color, {
          [mode]: true
        }) }, h("slot", { key: "fc1b6587f1ed24715748eb6785e7fb7a57cdd5cd" }));
      }
    };
    Badge.style = {
      ios: badgeIosCss(),
      md: badgeMdCss()
    };
    thumbnailCss = () => `:host{--size:48px;--border-radius:0;border-radius:var(--border-radius);display:block;width:var(--size);height:var(--size)}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}`;
    Thumbnail = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        return h(Host, { key: "ff9d2a4886b1c90a316c761f1160111f0e997f5d", class: getIonMode(this) }, h("slot", { key: "9a0f0d69e3713831e88c8770a60b28ff1a03abb6" }));
      }
    };
    Thumbnail.style = thumbnailCss();
  }
});
init_ion_avatar_3_entry();
export {
  Avatar as ion_avatar,
  Badge as ion_badge,
  Thumbnail as ion_thumbnail
};
//# debugId=6f6a5f85-9a87-52f6-8728-9e9350cc65a6
//# sourceMappingURL=chunk-ZDQNLV4G.js.map
