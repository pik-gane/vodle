import {
  WebPlugin,
  init_dist
} from "./chunk-A2IUBHOU.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@capacitor/local-notifications/dist/esm/web.js
var LocalNotificationsWeb;
var init_web = __esm({
  "node_modules/@capacitor/local-notifications/dist/esm/web.js"() {
    init_dist();
    LocalNotificationsWeb = class extends WebPlugin {
      constructor() {
        super(...arguments);
        this.pending = [];
        this.deliveredNotifications = [];
        this.hasNotificationSupport = () => {
          if (!("Notification" in window) || !Notification.requestPermission) {
            return false;
          }
          if (Notification.permission !== "granted") {
            try {
              new Notification("");
            } catch (e) {
              if (e instanceof Error && e.name === "TypeError") {
                return false;
              }
            }
          }
          return true;
        };
      }
      getDeliveredNotifications() {
        return __async(this, null, function* () {
          const deliveredSchemas = [];
          for (const notification of this.deliveredNotifications) {
            const deliveredSchema = {
              title: notification.title,
              id: parseInt(notification.tag),
              body: notification.body
            };
            deliveredSchemas.push(deliveredSchema);
          }
          return {
            notifications: deliveredSchemas
          };
        });
      }
      removeDeliveredNotifications(delivered) {
        return __async(this, null, function* () {
          for (const toRemove of delivered.notifications) {
            const found = this.deliveredNotifications.find((n) => n.tag === String(toRemove.id));
            found === null || found === void 0 ? void 0 : found.close();
            this.deliveredNotifications = this.deliveredNotifications.filter(() => !found);
          }
        });
      }
      removeDeliveredNotificationsById(options) {
        return __async(this, null, function* () {
          for (const id of options.ids) {
            const found = this.deliveredNotifications.find((n) => n.tag === String(id));
            found === null || found === void 0 ? void 0 : found.close();
            this.deliveredNotifications = this.deliveredNotifications.filter((n) => n !== found);
          }
        });
      }
      removeAllDeliveredNotifications() {
        return __async(this, null, function* () {
          for (const notification of this.deliveredNotifications) {
            notification.close();
          }
          this.deliveredNotifications = [];
        });
      }
      getByIds(options) {
        return __async(this, null, function* () {
          const ids = options.ids.map((id) => String(id));
          const scheduled = this.pending.filter((n) => ids.includes(String(n.id)));
          const delivered = this.deliveredNotifications.filter((n) => ids.includes(n.tag)).map((n) => this.deliveredToSchema(n));
          return { notifications: [...scheduled, ...delivered] };
        });
      }
      getAll(options) {
        return __async(this, null, function* () {
          const scheduled = [...this.pending];
          const delivered = this.deliveredNotifications.map((n) => this.deliveredToSchema(n));
          if ((options === null || options === void 0 ? void 0 : options.state) === "SCHEDULED") {
            return { notifications: scheduled };
          }
          if ((options === null || options === void 0 ? void 0 : options.state) === "TRIGGERED") {
            return { notifications: delivered };
          }
          return { notifications: [...scheduled, ...delivered] };
        });
      }
      deliveredToSchema(notification) {
        return {
          title: notification.title,
          id: parseInt(notification.tag),
          body: notification.body
        };
      }
      createChannel() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      deleteChannel() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      listChannels() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      schedule(options) {
        return __async(this, null, function* () {
          if (!this.hasNotificationSupport()) {
            throw this.unavailable("Notifications not supported in this browser.");
          }
          for (const notification of options.notifications) {
            this.sendNotification(notification);
          }
          return {
            notifications: options.notifications.map((notification) => ({
              id: notification.id
            }))
          };
        });
      }
      update(options) {
        return __async(this, null, function* () {
          if (!this.hasNotificationSupport()) {
            throw this.unavailable("Notifications not supported in this browser.");
          }
          const updated = [];
          for (const notification of options.notifications) {
            const index = this.pending.findIndex((n) => n.id === notification.id);
            if (index === -1) {
              continue;
            }
            this.pending.splice(index, 1);
            this.sendNotification(notification);
            updated.push(notification);
          }
          return {
            notifications: updated.map((notification) => ({ id: notification.id }))
          };
        });
      }
      getPending() {
        return __async(this, null, function* () {
          return {
            notifications: this.pending
          };
        });
      }
      cancelAll() {
        return __async(this, null, function* () {
          this.pending = [];
        });
      }
      registerActionTypes() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      cancel(pending) {
        return __async(this, null, function* () {
          this.pending = this.pending.filter((notification) => !pending.notifications.find((n) => n.id === notification.id));
        });
      }
      areEnabled() {
        return __async(this, null, function* () {
          const { display } = yield this.checkPermissions();
          return {
            value: display === "granted"
          };
        });
      }
      changeExactNotificationSetting() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      checkExactNotificationSetting() {
        return __async(this, null, function* () {
          throw this.unimplemented("Not implemented on web.");
        });
      }
      requestPermissions() {
        return __async(this, null, function* () {
          if (!this.hasNotificationSupport()) {
            throw this.unavailable("Notifications not supported in this browser.");
          }
          const display = this.transformNotificationPermission(yield Notification.requestPermission());
          return { display };
        });
      }
      checkPermissions() {
        return __async(this, null, function* () {
          if (!this.hasNotificationSupport()) {
            throw this.unavailable("Notifications not supported in this browser.");
          }
          const display = this.transformNotificationPermission(Notification.permission);
          return { display };
        });
      }
      transformNotificationPermission(permission) {
        switch (permission) {
          case "granted":
            return "granted";
          case "denied":
            return "denied";
          default:
            return "prompt";
        }
      }
      sendPending() {
        var _a;
        const toRemove = [];
        const now = (/* @__PURE__ */ new Date()).getTime();
        for (const notification of this.pending) {
          if (((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) && notification.schedule.at.getTime() <= now) {
            this.buildNotification(notification);
            toRemove.push(notification);
          }
        }
        this.pending = this.pending.filter((notification) => !toRemove.find((n) => n === notification));
      }
      sendNotification(notification) {
        var _a;
        if ((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) {
          const diff = notification.schedule.at.getTime() - (/* @__PURE__ */ new Date()).getTime();
          this.pending.push(notification);
          setTimeout(() => {
            this.sendPending();
          }, diff);
          return;
        }
        this.buildNotification(notification);
      }
      buildNotification(notification) {
        const localNotification = new Notification(notification.title, {
          body: notification.body,
          tag: String(notification.id)
        });
        localNotification.addEventListener("click", this.onClick.bind(this, notification), false);
        localNotification.addEventListener("show", this.onShow.bind(this, notification), false);
        localNotification.addEventListener("close", () => {
          this.deliveredNotifications = this.deliveredNotifications.filter(() => !this);
        }, false);
        this.deliveredNotifications.push(localNotification);
        return localNotification;
      }
      onClick(notification) {
        const data = {
          actionId: "tap",
          notification
        };
        this.notifyListeners("localNotificationActionPerformed", data);
      }
      onShow(notification) {
        this.notifyListeners("localNotificationReceived", notification);
      }
    };
  }
});
init_web();
export {
  LocalNotificationsWeb
};
//# debugId=83fa0277-e36a-57af-847b-d4239fd000f9
//# sourceMappingURL=chunk-4NKIFESB.js.map
