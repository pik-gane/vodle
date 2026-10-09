import {
  init_dist,
  registerPlugin
} from "./chunk-A2IUBHOU.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@capacitor/local-notifications/dist/esm/definitions.js
var Weekday;
var init_definitions = __esm({
  "node_modules/@capacitor/local-notifications/dist/esm/definitions.js"() {
    (function(Weekday2) {
      Weekday2[Weekday2["Sunday"] = 1] = "Sunday";
      Weekday2[Weekday2["Monday"] = 2] = "Monday";
      Weekday2[Weekday2["Tuesday"] = 3] = "Tuesday";
      Weekday2[Weekday2["Wednesday"] = 4] = "Wednesday";
      Weekday2[Weekday2["Thursday"] = 5] = "Thursday";
      Weekday2[Weekday2["Friday"] = 6] = "Friday";
      Weekday2[Weekday2["Saturday"] = 7] = "Saturday";
    })(Weekday || (Weekday = {}));
  }
});

// node_modules/@capacitor/local-notifications/dist/esm/index.js
var LocalNotifications;
var init_esm = __esm({
  "node_modules/@capacitor/local-notifications/dist/esm/index.js"() {
    init_dist();
    init_definitions();
    LocalNotifications = registerPlugin("LocalNotifications", {
      web: () => import("./chunk-4NKIFESB.js").then((m) => new m.LocalNotificationsWeb())
    });
  }
});

export {
  LocalNotifications,
  init_esm
};
//# debugId=e7fa4b38-5945-56fe-bb08-143f5277ad14
//# sourceMappingURL=chunk-CHXUQIDJ.js.map
