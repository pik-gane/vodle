import {
  NewsService,
  init_news_service
} from "./chunk-4BFNV2UU.js";
import {
  SettingsService,
  init_settings_service
} from "./chunk-NPENKYN7.js";
import {
  format_details,
  init_simple_format
} from "./chunk-HQCDYSGJ.js";
import {
  DataService,
  init_data_service
} from "./chunk-WCO77UR5.js";
import {
  AlertController,
  HttpClient,
  init_http,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  Storage,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
import {
  DelegationService,
  init_delegation_service
} from "./chunk-6F7MEYLU.js";
import {
  PollService,
  init_poll_service
} from "./chunk-JEJ3RYUQ.js";
import {
  LocalNotifications,
  init_esm
} from "./chunk-CHXUQIDJ.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  FactoryTarget,
  HostListener,
  Injectable,
  core_exports,
  init_core,
  signal,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __esm,
  __toESM
} from "./chunk-PKPTYHZH.js";

// node_modules/log4javascript/log4javascript.js
var require_log4javascript = __commonJS({
  "node_modules/log4javascript/log4javascript.js"(exports, module) {
    (function(factory, root) {
      if (typeof define == "function" && define.amd) {
        define(factory);
      } else if (typeof module != "undefined" && typeof exports == "object") {
        module.exports = factory();
      } else {
        root.log4javascript = factory();
      }
    })(function() {
      if (!Array.prototype.push) {
        Array.prototype.push = function() {
          for (var i2 = 0, len2 = arguments.length; i2 < len2; i2++) {
            this[this.length] = arguments[i2];
          }
          return this.length;
        };
      }
      if (!Array.prototype.shift) {
        Array.prototype.shift = function() {
          if (this.length > 0) {
            var firstItem = this[0];
            for (var i2 = 0, len2 = this.length - 1; i2 < len2; i2++) {
              this[i2] = this[i2 + 1];
            }
            this.length = this.length - 1;
            return firstItem;
          }
        };
      }
      if (!Array.prototype.splice) {
        Array.prototype.splice = function(startIndex, deleteCount) {
          var itemsAfterDeleted = this.slice(startIndex + deleteCount);
          var itemsDeleted = this.slice(startIndex, startIndex + deleteCount);
          this.length = startIndex;
          var argumentsArray = [];
          for (var i2 = 0, len2 = arguments.length; i2 < len2; i2++) {
            argumentsArray[i2] = arguments[i2];
          }
          var itemsToAppend = argumentsArray.length > 2 ? itemsAfterDeleted = argumentsArray.slice(2).concat(itemsAfterDeleted) : itemsAfterDeleted;
          for (i2 = 0, len2 = itemsToAppend.length; i2 < len2; i2++) {
            this.push(itemsToAppend[i2]);
          }
          return itemsDeleted;
        };
      }
      function isUndefined(obj2) {
        return typeof obj2 == "undefined";
      }
      function EventSupport() {
      }
      EventSupport.prototype = { eventTypes: [], eventListeners: {}, setEventTypes: function(eventTypesParam) {
        if (eventTypesParam instanceof Array) {
          this.eventTypes = eventTypesParam;
          this.eventListeners = {};
          for (var i2 = 0, len2 = this.eventTypes.length; i2 < len2; i2++) {
            this.eventListeners[this.eventTypes[i2]] = [];
          }
        } else {
          handleError("log4javascript.EventSupport [" + this + "]: setEventTypes: eventTypes parameter must be an Array");
        }
      }, addEventListener: function(eventType, listener) {
        if (typeof listener == "function") {
          if (!array_contains(this.eventTypes, eventType)) {
            handleError("log4javascript.EventSupport [" + this + "]: addEventListener: no event called '" + eventType + "'");
          }
          this.eventListeners[eventType].push(listener);
        } else {
          handleError("log4javascript.EventSupport [" + this + "]: addEventListener: listener must be a function");
        }
      }, removeEventListener: function(eventType, listener) {
        if (typeof listener == "function") {
          if (!array_contains(this.eventTypes, eventType)) {
            handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: no event called '" + eventType + "'");
          }
          array_remove(this.eventListeners[eventType], listener);
        } else {
          handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: listener must be a function");
        }
      }, dispatchEvent: function(eventType, eventArgs) {
        if (array_contains(this.eventTypes, eventType)) {
          var listeners = this.eventListeners[eventType];
          for (var i2 = 0, len2 = listeners.length; i2 < len2; i2++) {
            listeners[i2](this, eventType, eventArgs);
          }
        } else {
          handleError("log4javascript.EventSupport [" + this + "]: dispatchEvent: no event called '" + eventType + "'");
        }
      } };
      var applicationStartDate = /* @__PURE__ */ new Date();
      var uniqueId = "log4javascript_" + applicationStartDate.getTime() + "_" + Math.floor(Math.random() * 1e8);
      var emptyFunction = function() {
      };
      var newLine = "\r\n";
      var pageLoaded = false;
      function Log4JavaScript() {
      }
      Log4JavaScript.prototype = new EventSupport();
      var log4javascript = new Log4JavaScript();
      log4javascript.version = "1.4.13";
      log4javascript.edition = "log4javascript";
      function toStr(obj2) {
        if (obj2 && obj2.toString) {
          return obj2.toString();
        } else {
          return String(obj2);
        }
      }
      function getExceptionMessage(ex) {
        if (ex.message) {
          return ex.message;
        } else if (ex.description) {
          return ex.description;
        } else {
          return toStr(ex);
        }
      }
      function getUrlFileName(url) {
        var lastSlashIndex = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
        return url.substr(lastSlashIndex + 1);
      }
      function getExceptionStringRep(ex) {
        if (ex) {
          var exStr = "Exception: " + getExceptionMessage(ex);
          try {
            if (ex.lineNumber) {
              exStr += " on line number " + ex.lineNumber;
            }
            if (ex.fileName) {
              exStr += " in file " + getUrlFileName(ex.fileName);
            }
          } catch (localEx) {
            logLog.warn("Unable to obtain file and line information for error");
          }
          if (showStackTraces && ex.stack) {
            exStr += newLine + "Stack trace:" + newLine + ex.stack;
          }
          return exStr;
        }
        return null;
      }
      function bool(obj2) {
        return Boolean(obj2);
      }
      function trim(str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
      }
      function splitIntoLines(text) {
        var text2 = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        return text2.split("\n");
      }
      var urlEncode = typeof window.encodeURIComponent != "undefined" ? function(str) {
        return encodeURIComponent(str);
      } : function(str) {
        return escape(str).replace(/\+/g, "%2B").replace(/"/g, "%22").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/=/g, "%3D");
      };
      function array_remove(arr, val) {
        var index = -1;
        for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
          if (arr[i2] === val) {
            index = i2;
            break;
          }
        }
        if (index >= 0) {
          arr.splice(index, 1);
          return true;
        } else {
          return false;
        }
      }
      function array_contains(arr, val) {
        for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
          if (arr[i2] == val) {
            return true;
          }
        }
        return false;
      }
      function extractBooleanFromParam(param, defaultValue) {
        if (isUndefined(param)) {
          return defaultValue;
        } else {
          return bool(param);
        }
      }
      function extractStringFromParam(param, defaultValue) {
        if (isUndefined(param)) {
          return defaultValue;
        } else {
          return String(param);
        }
      }
      function extractIntFromParam(param, defaultValue) {
        if (isUndefined(param)) {
          return defaultValue;
        } else {
          try {
            var value = parseInt(param, 10);
            return isNaN(value) ? defaultValue : value;
          } catch (ex) {
            logLog.warn("Invalid int param " + param, ex);
            return defaultValue;
          }
        }
      }
      function extractFunctionFromParam(param, defaultValue) {
        if (typeof param == "function") {
          return param;
        } else {
          return defaultValue;
        }
      }
      function isError(err) {
        return err instanceof Error;
      }
      if (!Function.prototype.apply) {
        Function.prototype.apply = function(obj, args) {
          var methodName = "__apply__";
          if (typeof obj[methodName] != "undefined") {
            methodName += String(Math.random()).substr(2);
          }
          obj[methodName] = this;
          var argsStrings = [];
          for (var i = 0, len = args.length; i < len; i++) {
            argsStrings[i] = "args[" + i + "]";
          }
          var script = "obj." + methodName + "(" + argsStrings.join(",") + ")";
          var returnValue = eval(script);
          delete obj[methodName];
          return returnValue;
        };
      }
      if (!Function.prototype.call) {
        Function.prototype.call = function(obj2) {
          var args2 = [];
          for (var i2 = 1, len2 = arguments.length; i2 < len2; i2++) {
            args2[i2 - 1] = arguments[i2];
          }
          return this.apply(obj2, args2);
        };
      }
      var logLog = { quietMode: false, debugMessages: [], setQuietMode: function(quietMode) {
        this.quietMode = bool(quietMode);
      }, numberOfErrors: 0, alertAllErrors: false, setAlertAllErrors: function(alertAllErrors) {
        this.alertAllErrors = alertAllErrors;
      }, debug: function(message) {
        this.debugMessages.push(message);
      }, displayDebug: function() {
        alert(this.debugMessages.join(newLine));
      }, warn: function(message, exception) {
      }, error: function(message, exception) {
        if (++this.numberOfErrors == 1 || this.alertAllErrors) {
          if (!this.quietMode) {
            var alertMessage = "log4javascript error: " + message;
            if (exception) {
              alertMessage += newLine + newLine + "Original error: " + getExceptionStringRep(exception);
            }
            alert(alertMessage);
          }
        }
      } };
      log4javascript.logLog = logLog;
      log4javascript.setEventTypes(["load", "error"]);
      function handleError(message, exception) {
        logLog.error(message, exception);
        log4javascript.dispatchEvent("error", { "message": message, "exception": exception });
      }
      log4javascript.handleError = handleError;
      var enabled = !(typeof log4javascript_disabled != "undefined" && log4javascript_disabled);
      log4javascript.setEnabled = function(enable) {
        enabled = bool(enable);
      };
      log4javascript.isEnabled = function() {
        return enabled;
      };
      var useTimeStampsInMilliseconds = true;
      log4javascript.setTimeStampsInMilliseconds = function(timeStampsInMilliseconds) {
        useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds);
      };
      log4javascript.isTimeStampsInMilliseconds = function() {
        return useTimeStampsInMilliseconds;
      };
      log4javascript.evalInScope = function(expr) {
        return eval(expr);
      };
      var showStackTraces = false;
      log4javascript.setShowStackTraces = function(show) {
        showStackTraces = bool(show);
      };
      var Level = function(level, name) {
        this.level = level;
        this.name = name;
      };
      Level.prototype = { toString: function() {
        return this.name;
      }, equals: function(level) {
        return this.level == level.level;
      }, isGreaterOrEqual: function(level) {
        return this.level >= level.level;
      } };
      Level.ALL = new Level(Number.MIN_VALUE, "ALL");
      Level.TRACE = new Level(1e4, "TRACE");
      Level.DEBUG = new Level(2e4, "DEBUG");
      Level.INFO = new Level(3e4, "INFO");
      Level.WARN = new Level(4e4, "WARN");
      Level.ERROR = new Level(5e4, "ERROR");
      Level.FATAL = new Level(6e4, "FATAL");
      Level.OFF = new Level(Number.MAX_VALUE, "OFF");
      log4javascript.Level = Level;
      function Timer(name, level) {
        this.name = name;
        this.level = isUndefined(level) ? Level.INFO : level;
        this.start = /* @__PURE__ */ new Date();
      }
      Timer.prototype.getElapsedTime = function() {
        return (/* @__PURE__ */ new Date()).getTime() - this.start.getTime();
      };
      var anonymousLoggerName = "[anonymous]";
      var defaultLoggerName = "[default]";
      var nullLoggerName = "[null]";
      var rootLoggerName = "root";
      function Logger(name) {
        this.name = name;
        this.parent = null;
        this.children = [];
        var appenders = [];
        var loggerLevel = null;
        var isRoot = this.name === rootLoggerName;
        var isNull = this.name === nullLoggerName;
        var appenderCache = null;
        var appenderCacheInvalidated = false;
        this.addChild = function(childLogger) {
          this.children.push(childLogger);
          childLogger.parent = this;
          childLogger.invalidateAppenderCache();
        };
        var additive = true;
        this.getAdditivity = function() {
          return additive;
        };
        this.setAdditivity = function(additivity) {
          var valueChanged = additive != additivity;
          additive = additivity;
          if (valueChanged) {
            this.invalidateAppenderCache();
          }
        };
        this.addAppender = function(appender) {
          if (isNull) {
            handleError("Logger.addAppender: you may not add an appender to the null logger");
          } else {
            if (appender instanceof log4javascript.Appender) {
              if (!array_contains(appenders, appender)) {
                appenders.push(appender);
                appender.setAddedToLogger(this);
                this.invalidateAppenderCache();
              }
            } else {
              handleError("Logger.addAppender: appender supplied ('" + toStr(appender) + "') is not a subclass of Appender");
            }
          }
        };
        this.removeAppender = function(appender) {
          array_remove(appenders, appender);
          appender.setRemovedFromLogger(this);
          this.invalidateAppenderCache();
        };
        this.removeAllAppenders = function() {
          var appenderCount = appenders.length;
          if (appenderCount > 0) {
            for (var i2 = 0; i2 < appenderCount; i2++) {
              appenders[i2].setRemovedFromLogger(this);
            }
            appenders.length = 0;
            this.invalidateAppenderCache();
          }
        };
        this.getEffectiveAppenders = function() {
          if (appenderCache === null || appenderCacheInvalidated) {
            var parentEffectiveAppenders = isRoot || !this.getAdditivity() ? [] : this.parent.getEffectiveAppenders();
            appenderCache = parentEffectiveAppenders.concat(appenders);
            appenderCacheInvalidated = false;
          }
          return appenderCache;
        };
        this.invalidateAppenderCache = function() {
          appenderCacheInvalidated = true;
          for (var i2 = 0, len2 = this.children.length; i2 < len2; i2++) {
            this.children[i2].invalidateAppenderCache();
          }
        };
        this.log = function(level, params) {
          if (enabled && level.isGreaterOrEqual(this.getEffectiveLevel())) {
            var exception;
            var finalParamIndex = params.length - 1;
            var lastParam = params[finalParamIndex];
            if (params.length > 1 && isError(lastParam)) {
              exception = lastParam;
              finalParamIndex--;
            }
            var messages = [];
            for (var i2 = 0; i2 <= finalParamIndex; i2++) {
              messages[i2] = params[i2];
            }
            var loggingEvent = new LoggingEvent(this, /* @__PURE__ */ new Date(), level, messages, exception);
            this.callAppenders(loggingEvent);
          }
        };
        this.callAppenders = function(loggingEvent) {
          var effectiveAppenders = this.getEffectiveAppenders();
          for (var i2 = 0, len2 = effectiveAppenders.length; i2 < len2; i2++) {
            effectiveAppenders[i2].doAppend(loggingEvent);
          }
        };
        this.setLevel = function(level) {
          if (isRoot && level === null) {
            handleError("Logger.setLevel: you cannot set the level of the root logger to null");
          } else if (level instanceof Level) {
            loggerLevel = level;
          } else {
            handleError("Logger.setLevel: level supplied to logger " + this.name + " is not an instance of log4javascript.Level");
          }
        };
        this.getLevel = function() {
          return loggerLevel;
        };
        this.getEffectiveLevel = function() {
          for (var logger = this; logger !== null; logger = logger.parent) {
            var level = logger.getLevel();
            if (level !== null) {
              return level;
            }
          }
        };
        this.group = function(name2, initiallyExpanded) {
          if (enabled) {
            var effectiveAppenders = this.getEffectiveAppenders();
            for (var i2 = 0, len2 = effectiveAppenders.length; i2 < len2; i2++) {
              effectiveAppenders[i2].group(name2, initiallyExpanded);
            }
          }
        };
        this.groupEnd = function() {
          if (enabled) {
            var effectiveAppenders = this.getEffectiveAppenders();
            for (var i2 = 0, len2 = effectiveAppenders.length; i2 < len2; i2++) {
              effectiveAppenders[i2].groupEnd();
            }
          }
        };
        var timers = {};
        this.time = function(name2, level) {
          if (enabled) {
            if (isUndefined(name2)) {
              handleError("Logger.time: a name for the timer must be supplied");
            } else if (level && !(level instanceof Level)) {
              handleError("Logger.time: level supplied to timer " + name2 + " is not an instance of log4javascript.Level");
            } else {
              timers[name2] = new Timer(name2, level);
            }
          }
        };
        this.timeEnd = function(name2) {
          if (enabled) {
            if (isUndefined(name2)) {
              handleError("Logger.timeEnd: a name for the timer must be supplied");
            } else if (timers[name2]) {
              var timer = timers[name2];
              var milliseconds = timer.getElapsedTime();
              this.log(timer.level, ["Timer " + toStr(name2) + " completed in " + milliseconds + "ms"]);
              delete timers[name2];
            } else {
              logLog.warn("Logger.timeEnd: no timer found with name " + name2);
            }
          }
        };
        this.assert = function(expr2) {
          if (enabled && !expr2) {
            var args2 = [];
            for (var i2 = 1, len2 = arguments.length; i2 < len2; i2++) {
              args2.push(arguments[i2]);
            }
            args2 = args2.length > 0 ? args2 : ["Assertion Failure"];
            args2.push(newLine);
            args2.push(expr2);
            this.log(Level.ERROR, args2);
          }
        };
        this.toString = function() {
          return "Logger[" + this.name + "]";
        };
      }
      Logger.prototype = { trace: function() {
        this.log(Level.TRACE, arguments);
      }, debug: function() {
        this.log(Level.DEBUG, arguments);
      }, info: function() {
        this.log(Level.INFO, arguments);
      }, warn: function() {
        this.log(Level.WARN, arguments);
      }, error: function() {
        this.log(Level.ERROR, arguments);
      }, fatal: function() {
        this.log(Level.FATAL, arguments);
      }, isEnabledFor: function(level) {
        return level.isGreaterOrEqual(this.getEffectiveLevel());
      }, isTraceEnabled: function() {
        return this.isEnabledFor(Level.TRACE);
      }, isDebugEnabled: function() {
        return this.isEnabledFor(Level.DEBUG);
      }, isInfoEnabled: function() {
        return this.isEnabledFor(Level.INFO);
      }, isWarnEnabled: function() {
        return this.isEnabledFor(Level.WARN);
      }, isErrorEnabled: function() {
        return this.isEnabledFor(Level.ERROR);
      }, isFatalEnabled: function() {
        return this.isEnabledFor(Level.FATAL);
      } };
      Logger.prototype.trace.isEntryPoint = true;
      Logger.prototype.debug.isEntryPoint = true;
      Logger.prototype.info.isEntryPoint = true;
      Logger.prototype.warn.isEntryPoint = true;
      Logger.prototype.error.isEntryPoint = true;
      Logger.prototype.fatal.isEntryPoint = true;
      var loggers = {};
      var loggerNames = [];
      var ROOT_LOGGER_DEFAULT_LEVEL = Level.DEBUG;
      var rootLogger = new Logger(rootLoggerName);
      rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
      log4javascript.getRootLogger = function() {
        return rootLogger;
      };
      log4javascript.getLogger = function(loggerName) {
        if (typeof loggerName != "string") {
          loggerName = anonymousLoggerName;
          logLog.warn("log4javascript.getLogger: non-string logger name " + toStr(loggerName) + " supplied, returning anonymous logger");
        }
        if (loggerName == rootLoggerName) {
          handleError("log4javascript.getLogger: root logger may not be obtained by name");
        }
        if (!loggers[loggerName]) {
          var logger = new Logger(loggerName);
          loggers[loggerName] = logger;
          loggerNames.push(loggerName);
          var lastDotIndex = loggerName.lastIndexOf(".");
          var parentLogger;
          if (lastDotIndex > -1) {
            var parentLoggerName = loggerName.substring(0, lastDotIndex);
            parentLogger = log4javascript.getLogger(parentLoggerName);
          } else {
            parentLogger = rootLogger;
          }
          parentLogger.addChild(logger);
        }
        return loggers[loggerName];
      };
      var defaultLogger = null;
      log4javascript.getDefaultLogger = function() {
        if (!defaultLogger) {
          defaultLogger = createDefaultLogger();
        }
        return defaultLogger;
      };
      var nullLogger = null;
      log4javascript.getNullLogger = function() {
        if (!nullLogger) {
          nullLogger = new Logger(nullLoggerName);
          nullLogger.setLevel(Level.OFF);
        }
        return nullLogger;
      };
      log4javascript.resetConfiguration = function() {
        rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
        loggers = {};
      };
      var LoggingEvent = function(logger, timeStamp, level, messages, exception) {
        this.logger = logger;
        this.timeStamp = timeStamp;
        this.timeStampInMilliseconds = timeStamp.getTime();
        this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1e3);
        this.milliseconds = this.timeStamp.getMilliseconds();
        this.level = level;
        this.messages = messages;
        this.exception = exception;
      };
      LoggingEvent.prototype = { getThrowableStrRep: function() {
        return this.exception ? getExceptionStringRep(this.exception) : "";
      }, getCombinedMessages: function() {
        return this.messages.length == 1 ? this.messages[0] : this.messages.join(newLine);
      }, toString: function() {
        return "LoggingEvent[" + this.level + "]";
      } };
      log4javascript.LoggingEvent = LoggingEvent;
      var Layout = function() {
      };
      Layout.prototype = { defaults: { loggerKey: "logger", timeStampKey: "timestamp", millisecondsKey: "milliseconds", levelKey: "level", messageKey: "message", exceptionKey: "exception", urlKey: "url" }, loggerKey: "logger", timeStampKey: "timestamp", millisecondsKey: "milliseconds", levelKey: "level", messageKey: "message", exceptionKey: "exception", urlKey: "url", batchHeader: "", batchFooter: "", batchSeparator: "", returnsPostData: false, overrideTimeStampsSetting: false, useTimeStampsInMilliseconds: null, format: function() {
        handleError("Layout.format: layout supplied has no format() method");
      }, ignoresThrowable: function() {
        handleError("Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method");
      }, getContentType: function() {
        return "text/plain";
      }, allowBatching: function() {
        return true;
      }, setTimeStampsInMilliseconds: function(timeStampsInMilliseconds) {
        this.overrideTimeStampsSetting = true;
        this.useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds);
      }, isTimeStampsInMilliseconds: function() {
        return this.overrideTimeStampsSetting ? this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds;
      }, getTimeStampValue: function(loggingEvent) {
        return this.isTimeStampsInMilliseconds() ? loggingEvent.timeStampInMilliseconds : loggingEvent.timeStampInSeconds;
      }, getDataValues: function(loggingEvent, combineMessages) {
        var dataValues = [[this.loggerKey, loggingEvent.logger.name], [this.timeStampKey, this.getTimeStampValue(loggingEvent)], [this.levelKey, loggingEvent.level.name], [this.urlKey, window.location.href], [this.messageKey, combineMessages ? loggingEvent.getCombinedMessages() : loggingEvent.messages]];
        if (!this.isTimeStampsInMilliseconds()) {
          dataValues.push([this.millisecondsKey, loggingEvent.milliseconds]);
        }
        if (loggingEvent.exception) {
          dataValues.push([this.exceptionKey, getExceptionStringRep(loggingEvent.exception)]);
        }
        if (this.hasCustomFields()) {
          for (var i2 = 0, len2 = this.customFields.length; i2 < len2; i2++) {
            var val = this.customFields[i2].value;
            if (typeof val === "function") {
              val = val(this, loggingEvent);
            }
            dataValues.push([this.customFields[i2].name, val]);
          }
        }
        return dataValues;
      }, setKeys: function(loggerKey, timeStampKey, levelKey, messageKey, exceptionKey, urlKey, millisecondsKey) {
        this.loggerKey = extractStringFromParam(loggerKey, this.defaults.loggerKey);
        this.timeStampKey = extractStringFromParam(timeStampKey, this.defaults.timeStampKey);
        this.levelKey = extractStringFromParam(levelKey, this.defaults.levelKey);
        this.messageKey = extractStringFromParam(messageKey, this.defaults.messageKey);
        this.exceptionKey = extractStringFromParam(exceptionKey, this.defaults.exceptionKey);
        this.urlKey = extractStringFromParam(urlKey, this.defaults.urlKey);
        this.millisecondsKey = extractStringFromParam(millisecondsKey, this.defaults.millisecondsKey);
      }, setCustomField: function(name, value) {
        var fieldUpdated = false;
        for (var i2 = 0, len2 = this.customFields.length; i2 < len2; i2++) {
          if (this.customFields[i2].name === name) {
            this.customFields[i2].value = value;
            fieldUpdated = true;
          }
        }
        if (!fieldUpdated) {
          this.customFields.push({ "name": name, "value": value });
        }
      }, hasCustomFields: function() {
        return this.customFields.length > 0;
      }, formatWithException: function(loggingEvent) {
        var formatted = this.format(loggingEvent);
        if (loggingEvent.exception && this.ignoresThrowable()) {
          formatted += loggingEvent.getThrowableStrRep();
        }
        return formatted;
      }, toString: function() {
        handleError("Layout.toString: all layouts must override this method");
      } };
      log4javascript.Layout = Layout;
      var Appender = function() {
      };
      Appender.prototype = new EventSupport();
      Appender.prototype.layout = new PatternLayout();
      Appender.prototype.threshold = Level.ALL;
      Appender.prototype.loggers = [];
      Appender.prototype.doAppend = function(loggingEvent) {
        if (enabled && loggingEvent.level.level >= this.threshold.level) {
          this.append(loggingEvent);
        }
      };
      Appender.prototype.append = function(loggingEvent) {
      };
      Appender.prototype.setLayout = function(layout) {
        if (layout instanceof Layout) {
          this.layout = layout;
        } else {
          handleError("Appender.setLayout: layout supplied to " + this.toString() + " is not a subclass of Layout");
        }
      };
      Appender.prototype.getLayout = function() {
        return this.layout;
      };
      Appender.prototype.setThreshold = function(threshold) {
        if (threshold instanceof Level) {
          this.threshold = threshold;
        } else {
          handleError("Appender.setThreshold: threshold supplied to " + this.toString() + " is not a subclass of Level");
        }
      };
      Appender.prototype.getThreshold = function() {
        return this.threshold;
      };
      Appender.prototype.setAddedToLogger = function(logger) {
        this.loggers.push(logger);
      };
      Appender.prototype.setRemovedFromLogger = function(logger) {
        array_remove(this.loggers, logger);
      };
      Appender.prototype.group = emptyFunction;
      Appender.prototype.groupEnd = emptyFunction;
      Appender.prototype.toString = function() {
        handleError("Appender.toString: all appenders must override this method");
      };
      log4javascript.Appender = Appender;
      function SimpleLayout() {
        this.customFields = [];
      }
      SimpleLayout.prototype = new Layout();
      SimpleLayout.prototype.format = function(loggingEvent) {
        return loggingEvent.level.name + " - " + loggingEvent.getCombinedMessages();
      };
      SimpleLayout.prototype.ignoresThrowable = function() {
        return true;
      };
      SimpleLayout.prototype.toString = function() {
        return "SimpleLayout";
      };
      log4javascript.SimpleLayout = SimpleLayout;
      function NullLayout() {
        this.customFields = [];
      }
      NullLayout.prototype = new Layout();
      NullLayout.prototype.format = function(loggingEvent) {
        return loggingEvent.messages;
      };
      NullLayout.prototype.ignoresThrowable = function() {
        return true;
      };
      NullLayout.prototype.formatWithException = function(loggingEvent) {
        var messages = loggingEvent.messages, ex = loggingEvent.exception;
        return ex ? messages.concat([ex]) : messages;
      };
      NullLayout.prototype.toString = function() {
        return "NullLayout";
      };
      log4javascript.NullLayout = NullLayout;
      function XmlLayout(combineMessages) {
        this.combineMessages = extractBooleanFromParam(combineMessages, true);
        this.customFields = [];
      }
      XmlLayout.prototype = new Layout();
      XmlLayout.prototype.isCombinedMessages = function() {
        return this.combineMessages;
      };
      XmlLayout.prototype.getContentType = function() {
        return "text/xml";
      };
      XmlLayout.prototype.escapeCdata = function(str) {
        return str.replace(/\]\]>/, "]]>]]&gt;<![CDATA[");
      };
      XmlLayout.prototype.format = function(loggingEvent) {
        var layout = this;
        var i2, len2;
        function formatMessage(message) {
          message = typeof message === "string" ? message : toStr(message);
          return "<log4javascript:message><![CDATA[" + layout.escapeCdata(message) + "]]></log4javascript:message>";
        }
        var str = '<log4javascript:event logger="' + loggingEvent.logger.name + '" timestamp="' + this.getTimeStampValue(loggingEvent) + '"';
        if (!this.isTimeStampsInMilliseconds()) {
          str += ' milliseconds="' + loggingEvent.milliseconds + '"';
        }
        str += ' level="' + loggingEvent.level.name + '">' + newLine;
        if (this.combineMessages) {
          str += formatMessage(loggingEvent.getCombinedMessages());
        } else {
          str += "<log4javascript:messages>" + newLine;
          for (i2 = 0, len2 = loggingEvent.messages.length; i2 < len2; i2++) {
            str += formatMessage(loggingEvent.messages[i2]) + newLine;
          }
          str += "</log4javascript:messages>" + newLine;
        }
        if (this.hasCustomFields()) {
          for (i2 = 0, len2 = this.customFields.length; i2 < len2; i2++) {
            str += '<log4javascript:customfield name="' + this.customFields[i2].name + '"><![CDATA[' + this.customFields[i2].value.toString() + "]]></log4javascript:customfield>" + newLine;
          }
        }
        if (loggingEvent.exception) {
          str += "<log4javascript:exception><![CDATA[" + getExceptionStringRep(loggingEvent.exception) + "]]></log4javascript:exception>" + newLine;
        }
        str += "</log4javascript:event>" + newLine + newLine;
        return str;
      };
      XmlLayout.prototype.ignoresThrowable = function() {
        return false;
      };
      XmlLayout.prototype.toString = function() {
        return "XmlLayout";
      };
      log4javascript.XmlLayout = XmlLayout;
      function escapeNewLines(str) {
        return str.replace(/\r\n|\r|\n/g, "\\r\\n");
      }
      function JsonLayout(readable, combineMessages) {
        this.readable = extractBooleanFromParam(readable, false);
        this.combineMessages = extractBooleanFromParam(combineMessages, true);
        this.batchHeader = this.readable ? "[" + newLine : "[";
        this.batchFooter = this.readable ? "]" + newLine : "]";
        this.batchSeparator = this.readable ? "," + newLine : ",";
        this.setKeys();
        this.colon = this.readable ? ": " : ":";
        this.tab = this.readable ? "	" : "";
        this.lineBreak = this.readable ? newLine : "";
        this.customFields = [];
      }
      JsonLayout.prototype = new Layout();
      JsonLayout.prototype.isReadable = function() {
        return this.readable;
      };
      JsonLayout.prototype.isCombinedMessages = function() {
        return this.combineMessages;
      };
      JsonLayout.prototype.format = function(loggingEvent) {
        var layout = this;
        var dataValues = this.getDataValues(loggingEvent, this.combineMessages);
        var str = "{" + this.lineBreak;
        var i2, len2;
        function formatValue(val, prefix, expand) {
          var formattedValue;
          var valType = typeof val;
          if (val instanceof Date) {
            formattedValue = String(val.getTime());
          } else if (expand && val instanceof Array) {
            formattedValue = "[" + layout.lineBreak;
            for (var i3 = 0, len3 = val.length; i3 < len3; i3++) {
              var childPrefix = prefix + layout.tab;
              formattedValue += childPrefix + formatValue(val[i3], childPrefix, false);
              if (i3 < val.length - 1) {
                formattedValue += ",";
              }
              formattedValue += layout.lineBreak;
            }
            formattedValue += prefix + "]";
          } else if (valType !== "number" && valType !== "boolean") {
            formattedValue = '"' + escapeNewLines(toStr(val).replace(/\"/g, '\\"')) + '"';
          } else {
            formattedValue = val;
          }
          return formattedValue;
        }
        for (i2 = 0, len2 = dataValues.length - 1; i2 <= len2; i2++) {
          str += this.tab + '"' + dataValues[i2][0] + '"' + this.colon + formatValue(dataValues[i2][1], this.tab, true);
          if (i2 < len2) {
            str += ",";
          }
          str += this.lineBreak;
        }
        str += "}" + this.lineBreak;
        return str;
      };
      JsonLayout.prototype.ignoresThrowable = function() {
        return false;
      };
      JsonLayout.prototype.toString = function() {
        return "JsonLayout";
      };
      JsonLayout.prototype.getContentType = function() {
        return "application/json";
      };
      log4javascript.JsonLayout = JsonLayout;
      function HttpPostDataLayout() {
        this.setKeys();
        this.customFields = [];
        this.returnsPostData = true;
      }
      HttpPostDataLayout.prototype = new Layout();
      HttpPostDataLayout.prototype.allowBatching = function() {
        return false;
      };
      HttpPostDataLayout.prototype.format = function(loggingEvent) {
        var dataValues = this.getDataValues(loggingEvent);
        var queryBits = [];
        for (var i2 = 0, len2 = dataValues.length; i2 < len2; i2++) {
          var val = dataValues[i2][1] instanceof Date ? String(dataValues[i2][1].getTime()) : dataValues[i2][1];
          queryBits.push(urlEncode(dataValues[i2][0]) + "=" + urlEncode(val));
        }
        return queryBits.join("&");
      };
      HttpPostDataLayout.prototype.ignoresThrowable = function(loggingEvent) {
        return false;
      };
      HttpPostDataLayout.prototype.toString = function() {
        return "HttpPostDataLayout";
      };
      log4javascript.HttpPostDataLayout = HttpPostDataLayout;
      function formatObjectExpansion(obj2, depth, indentation) {
        var objectsExpanded = [];
        function doFormat(obj3, depth2, indentation2) {
          var i2, len2, childDepth, childIndentation, childLines, expansion, childExpansion;
          if (!indentation2) {
            indentation2 = "";
          }
          function formatString(text) {
            var lines = splitIntoLines(text);
            for (var j = 1, jLen = lines.length; j < jLen; j++) {
              lines[j] = indentation2 + lines[j];
            }
            return lines.join(newLine);
          }
          if (obj3 === null) {
            return "null";
          } else if (typeof obj3 == "undefined") {
            return "undefined";
          } else if (typeof obj3 == "string") {
            return formatString(obj3);
          } else if (typeof obj3 == "object" && array_contains(objectsExpanded, obj3)) {
            try {
              expansion = toStr(obj3);
            } catch (ex) {
              expansion = "Error formatting property. Details: " + getExceptionStringRep(ex);
            }
            return expansion + " [already expanded]";
          } else if (obj3 instanceof Array && depth2 > 0) {
            objectsExpanded.push(obj3);
            expansion = "[" + newLine;
            childDepth = depth2 - 1;
            childIndentation = indentation2 + "  ";
            childLines = [];
            for (i2 = 0, len2 = obj3.length; i2 < len2; i2++) {
              try {
                childExpansion = doFormat(obj3[i2], childDepth, childIndentation);
                childLines.push(childIndentation + childExpansion);
              } catch (ex) {
                childLines.push(childIndentation + "Error formatting array member. Details: " + getExceptionStringRep(ex));
              }
            }
            expansion += childLines.join("," + newLine) + newLine + indentation2 + "]";
            return expansion;
          } else if (Object.prototype.toString.call(obj3) == "[object Date]") {
            return obj3.toString();
          } else if (typeof obj3 == "object" && depth2 > 0) {
            objectsExpanded.push(obj3);
            expansion = "{" + newLine;
            childDepth = depth2 - 1;
            childIndentation = indentation2 + "  ";
            childLines = [];
            for (i2 in obj3) {
              try {
                childExpansion = doFormat(obj3[i2], childDepth, childIndentation);
                childLines.push(childIndentation + i2 + ": " + childExpansion);
              } catch (ex) {
                childLines.push(childIndentation + i2 + ": Error formatting property. Details: " + getExceptionStringRep(ex));
              }
            }
            expansion += childLines.join("," + newLine) + newLine + indentation2 + "}";
            return expansion;
          } else {
            return formatString(toStr(obj3));
          }
        }
        return doFormat(obj2, depth, indentation);
      }
      var SimpleDateFormat;
      (function() {
        var regex = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/;
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var TEXT2 = 0, TEXT3 = 1, NUMBER = 2, YEAR = 3, MONTH = 4, TIMEZONE = 5;
        var types = { G: TEXT2, y: YEAR, M: MONTH, w: NUMBER, W: NUMBER, D: NUMBER, d: NUMBER, F: NUMBER, E: TEXT3, a: TEXT2, H: NUMBER, k: NUMBER, K: NUMBER, h: NUMBER, m: NUMBER, s: NUMBER, S: NUMBER, Z: TIMEZONE };
        var ONE_DAY = 24 * 60 * 60 * 1e3;
        var ONE_WEEK = 7 * ONE_DAY;
        var DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK = 1;
        var newDateAtMidnight = function(year, month, day) {
          var d = new Date(year, month, day, 0, 0, 0);
          d.setMilliseconds(0);
          return d;
        };
        Date.prototype.getDifference = function(date) {
          return this.getTime() - date.getTime();
        };
        Date.prototype.isBefore = function(d) {
          return this.getTime() < d.getTime();
        };
        Date.prototype.getUTCTime = function() {
          return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
        };
        Date.prototype.getTimeSince = function(d) {
          return this.getUTCTime() - d.getUTCTime();
        };
        Date.prototype.getPreviousSunday = function() {
          var midday = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0);
          var previousSunday = new Date(midday.getTime() - this.getDay() * ONE_DAY);
          return newDateAtMidnight(previousSunday.getFullYear(), previousSunday.getMonth(), previousSunday.getDate());
        };
        Date.prototype.getWeekInYear = function(minimalDaysInFirstWeek) {
          if (isUndefined(this.minimalDaysInFirstWeek)) {
            minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
          }
          var previousSunday = this.getPreviousSunday();
          var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
          var numberOfSundays = previousSunday.isBefore(startOfYear) ? 0 : 1 + Math.floor(previousSunday.getTimeSince(startOfYear) / ONE_WEEK);
          var numberOfDaysInFirstWeek = 7 - startOfYear.getDay();
          var weekInYear = numberOfSundays;
          if (numberOfDaysInFirstWeek < minimalDaysInFirstWeek) {
            weekInYear--;
          }
          return weekInYear;
        };
        Date.prototype.getWeekInMonth = function(minimalDaysInFirstWeek) {
          if (isUndefined(this.minimalDaysInFirstWeek)) {
            minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
          }
          var previousSunday = this.getPreviousSunday();
          var startOfMonth = newDateAtMidnight(this.getFullYear(), this.getMonth(), 1);
          var numberOfSundays = previousSunday.isBefore(startOfMonth) ? 0 : 1 + Math.floor(previousSunday.getTimeSince(startOfMonth) / ONE_WEEK);
          var numberOfDaysInFirstWeek = 7 - startOfMonth.getDay();
          var weekInMonth = numberOfSundays;
          if (numberOfDaysInFirstWeek >= minimalDaysInFirstWeek) {
            weekInMonth++;
          }
          return weekInMonth;
        };
        Date.prototype.getDayInYear = function() {
          var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
          return 1 + Math.floor(this.getTimeSince(startOfYear) / ONE_DAY);
        };
        SimpleDateFormat = function(formatString) {
          this.formatString = formatString;
        };
        SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function(days) {
          this.minimalDaysInFirstWeek = days;
        };
        SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function() {
          return isUndefined(this.minimalDaysInFirstWeek) ? DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK : this.minimalDaysInFirstWeek;
        };
        var padWithZeroes = function(str, len2) {
          while (str.length < len2) {
            str = "0" + str;
          }
          return str;
        };
        var formatText = function(data, numberOfLetters, minLength) {
          return numberOfLetters >= 4 ? data : data.substr(0, Math.max(minLength, numberOfLetters));
        };
        var formatNumber = function(data, numberOfLetters) {
          var dataString = "" + data;
          return padWithZeroes(dataString, numberOfLetters);
        };
        SimpleDateFormat.prototype.format = function(date) {
          var formattedString = "";
          var result;
          var searchString = this.formatString;
          while (result = regex.exec(searchString)) {
            var quotedString = result[1];
            var patternLetters = result[2];
            var otherLetters = result[3];
            var otherCharacters = result[4];
            if (quotedString) {
              if (quotedString == "''") {
                formattedString += "'";
              } else {
                formattedString += quotedString.substring(1, quotedString.length - 1);
              }
            } else if (otherLetters) {
            } else if (otherCharacters) {
              formattedString += otherCharacters;
            } else if (patternLetters) {
              var patternLetter = patternLetters.charAt(0);
              var numberOfLetters = patternLetters.length;
              var rawData = "";
              switch (patternLetter) {
                case "G":
                  rawData = "AD";
                  break;
                case "y":
                  rawData = date.getFullYear();
                  break;
                case "M":
                  rawData = date.getMonth();
                  break;
                case "w":
                  rawData = date.getWeekInYear(this.getMinimalDaysInFirstWeek());
                  break;
                case "W":
                  rawData = date.getWeekInMonth(this.getMinimalDaysInFirstWeek());
                  break;
                case "D":
                  rawData = date.getDayInYear();
                  break;
                case "d":
                  rawData = date.getDate();
                  break;
                case "F":
                  rawData = 1 + Math.floor((date.getDate() - 1) / 7);
                  break;
                case "E":
                  rawData = dayNames[date.getDay()];
                  break;
                case "a":
                  rawData = date.getHours() >= 12 ? "PM" : "AM";
                  break;
                case "H":
                  rawData = date.getHours();
                  break;
                case "k":
                  rawData = date.getHours() || 24;
                  break;
                case "K":
                  rawData = date.getHours() % 12;
                  break;
                case "h":
                  rawData = date.getHours() % 12 || 12;
                  break;
                case "m":
                  rawData = date.getMinutes();
                  break;
                case "s":
                  rawData = date.getSeconds();
                  break;
                case "S":
                  rawData = date.getMilliseconds();
                  break;
                case "Z":
                  rawData = date.getTimezoneOffset();
                  break;
              }
              switch (types[patternLetter]) {
                case TEXT2:
                  formattedString += formatText(rawData, numberOfLetters, 2);
                  break;
                case TEXT3:
                  formattedString += formatText(rawData, numberOfLetters, 3);
                  break;
                case NUMBER:
                  formattedString += formatNumber(rawData, numberOfLetters);
                  break;
                case YEAR:
                  if (numberOfLetters <= 3) {
                    var dataString = "" + rawData;
                    formattedString += dataString.substr(2, 2);
                  } else {
                    formattedString += formatNumber(rawData, numberOfLetters);
                  }
                  break;
                case MONTH:
                  if (numberOfLetters >= 3) {
                    formattedString += formatText(monthNames[rawData], numberOfLetters, numberOfLetters);
                  } else {
                    formattedString += formatNumber(rawData + 1, numberOfLetters);
                  }
                  break;
                case TIMEZONE:
                  var isPositive = rawData > 0;
                  var prefix = isPositive ? "-" : "+";
                  var absData = Math.abs(rawData);
                  var hours = "" + Math.floor(absData / 60);
                  hours = padWithZeroes(hours, 2);
                  var minutes = "" + absData % 60;
                  minutes = padWithZeroes(minutes, 2);
                  formattedString += prefix + hours + minutes;
                  break;
              }
            }
            searchString = searchString.substr(result.index + result[0].length);
          }
          return formattedString;
        };
      })();
      log4javascript.SimpleDateFormat = SimpleDateFormat;
      function PatternLayout(pattern) {
        if (pattern) {
          this.pattern = pattern;
        } else {
          this.pattern = PatternLayout.DEFAULT_CONVERSION_PATTERN;
        }
        this.customFields = [];
      }
      PatternLayout.TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
      PatternLayout.DEFAULT_CONVERSION_PATTERN = "%m%n";
      PatternLayout.ISO8601_DATEFORMAT = "yyyy-MM-dd HH:mm:ss,SSS";
      PatternLayout.DATETIME_DATEFORMAT = "dd MMM yyyy HH:mm:ss,SSS";
      PatternLayout.ABSOLUTETIME_DATEFORMAT = "HH:mm:ss,SSS";
      PatternLayout.prototype = new Layout();
      PatternLayout.prototype.format = function(loggingEvent) {
        var regex = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/;
        var formattedString = "";
        var result;
        var searchString = this.pattern;
        while (result = regex.exec(searchString)) {
          var matchedString = result[0];
          var padding = result[1];
          var truncation = result[2];
          var conversionCharacter = result[3];
          var specifier = result[5];
          var text = result[6];
          if (text) {
            formattedString += "" + text;
          } else {
            var replacement = "";
            switch (conversionCharacter) {
              case "a":
              case "m":
                var depth = 0;
                if (specifier) {
                  depth = parseInt(specifier, 10);
                  if (isNaN(depth)) {
                    handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character '" + conversionCharacter + "' - should be a number");
                    depth = 0;
                  }
                }
                var messages = conversionCharacter === "a" ? loggingEvent.messages[0] : loggingEvent.messages;
                for (var i2 = 0, len2 = messages.length; i2 < len2; i2++) {
                  if (i2 > 0 && replacement.charAt(replacement.length - 1) !== " ") {
                    replacement += " ";
                  }
                  if (depth === 0) {
                    replacement += messages[i2];
                  } else {
                    replacement += formatObjectExpansion(messages[i2], depth);
                  }
                }
                break;
              case "c":
                var loggerName = loggingEvent.logger.name;
                if (specifier) {
                  var precision = parseInt(specifier, 10);
                  var loggerNameBits = loggingEvent.logger.name.split(".");
                  if (precision >= loggerNameBits.length) {
                    replacement = loggerName;
                  } else {
                    replacement = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
                  }
                } else {
                  replacement = loggerName;
                }
                break;
              case "d":
                var dateFormat = PatternLayout.ISO8601_DATEFORMAT;
                if (specifier) {
                  dateFormat = specifier;
                  if (dateFormat == "ISO8601") {
                    dateFormat = PatternLayout.ISO8601_DATEFORMAT;
                  } else if (dateFormat == "ABSOLUTE") {
                    dateFormat = PatternLayout.ABSOLUTETIME_DATEFORMAT;
                  } else if (dateFormat == "DATE") {
                    dateFormat = PatternLayout.DATETIME_DATEFORMAT;
                  }
                }
                replacement = new SimpleDateFormat(dateFormat).format(loggingEvent.timeStamp);
                break;
              case "f":
                if (this.hasCustomFields()) {
                  var fieldIndex = 0;
                  if (specifier) {
                    fieldIndex = parseInt(specifier, 10);
                    if (isNaN(fieldIndex)) {
                      handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - should be a number");
                    } else if (fieldIndex === 0) {
                      handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - must be greater than zero");
                    } else if (fieldIndex > this.customFields.length) {
                      handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - there aren't that many custom fields");
                    } else {
                      fieldIndex = fieldIndex - 1;
                    }
                  }
                  var val = this.customFields[fieldIndex].value;
                  if (typeof val == "function") {
                    val = val(this, loggingEvent);
                  }
                  replacement = val;
                }
                break;
              case "n":
                replacement = newLine;
                break;
              case "p":
                replacement = loggingEvent.level.name;
                break;
              case "r":
                replacement = "" + loggingEvent.timeStamp.getDifference(applicationStartDate);
                break;
              case "%":
                replacement = "%";
                break;
              default:
                replacement = matchedString;
                break;
            }
            var l;
            if (truncation) {
              l = parseInt(truncation.substr(1), 10);
              var strLen = replacement.length;
              if (l < strLen) {
                replacement = replacement.substring(strLen - l, strLen);
              }
            }
            if (padding) {
              if (padding.charAt(0) == "-") {
                l = parseInt(padding.substr(1), 10);
                while (replacement.length < l) {
                  replacement += " ";
                }
              } else {
                l = parseInt(padding, 10);
                while (replacement.length < l) {
                  replacement = " " + replacement;
                }
              }
            }
            formattedString += replacement;
          }
          searchString = searchString.substr(result.index + result[0].length);
        }
        return formattedString;
      };
      PatternLayout.prototype.ignoresThrowable = function() {
        return true;
      };
      PatternLayout.prototype.toString = function() {
        return "PatternLayout";
      };
      log4javascript.PatternLayout = PatternLayout;
      function AlertAppender() {
      }
      AlertAppender.prototype = new Appender();
      AlertAppender.prototype.layout = new SimpleLayout();
      AlertAppender.prototype.append = function(loggingEvent) {
        alert(this.getLayout().formatWithException(loggingEvent));
      };
      AlertAppender.prototype.toString = function() {
        return "AlertAppender";
      };
      log4javascript.AlertAppender = AlertAppender;
      function BrowserConsoleAppender() {
      }
      BrowserConsoleAppender.prototype = new log4javascript.Appender();
      BrowserConsoleAppender.prototype.layout = new NullLayout();
      BrowserConsoleAppender.prototype.threshold = Level.DEBUG;
      BrowserConsoleAppender.prototype.append = function(loggingEvent) {
        var appender = this;
        var getFormattedMessage = function(concatenate) {
          var formattedMessage = appender.getLayout().formatWithException(loggingEvent);
          return typeof formattedMessage == "string" ? concatenate ? formattedMessage : [formattedMessage] : concatenate ? formattedMessage.join(" ") : formattedMessage;
        };
        var console2 = window.console;
        if (console2 && console2.log) {
          var consoleMethodName;
          if (console2.debug && Level.DEBUG.isGreaterOrEqual(loggingEvent.level)) {
            consoleMethodName = "debug";
          } else if (console2.info && Level.INFO.equals(loggingEvent.level)) {
            consoleMethodName = "info";
          } else if (console2.warn && Level.WARN.equals(loggingEvent.level)) {
            consoleMethodName = "warn";
          } else if (console2.error && loggingEvent.level.isGreaterOrEqual(Level.ERROR)) {
            consoleMethodName = "error";
          } else {
            consoleMethodName = "log";
          }
          if (typeof console2[consoleMethodName].apply == "function") {
            console2[consoleMethodName].apply(console2, getFormattedMessage(false));
          } else {
            console2[consoleMethodName](getFormattedMessage(true));
          }
        } else if (typeof opera != "undefined" && opera.postError) {
          opera.postError(getFormattedMessage(true));
        }
      };
      BrowserConsoleAppender.prototype.group = function(name) {
        if (window.console && window.console.group) {
          window.console.group(name);
        }
      };
      BrowserConsoleAppender.prototype.groupEnd = function() {
        if (window.console && window.console.groupEnd) {
          window.console.groupEnd();
        }
      };
      BrowserConsoleAppender.prototype.toString = function() {
        return "BrowserConsoleAppender";
      };
      log4javascript.BrowserConsoleAppender = BrowserConsoleAppender;
      var xhrFactory = function() {
        return new XMLHttpRequest();
      };
      var xmlHttpFactories = [xhrFactory, function() {
        return new ActiveXObject("Msxml2.XMLHTTP");
      }, function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }];
      var withCredentialsSupported = false;
      var getXmlHttp = function(errorHandler) {
        var xmlHttp = null, factory;
        for (var i2 = 0, len2 = xmlHttpFactories.length; i2 < len2; i2++) {
          factory = xmlHttpFactories[i2];
          try {
            xmlHttp = factory();
            withCredentialsSupported = factory == xhrFactory && "withCredentials" in xmlHttp;
            getXmlHttp = factory;
            return xmlHttp;
          } catch (e) {
          }
        }
        if (errorHandler) {
          errorHandler();
        } else {
          handleError("getXmlHttp: unable to obtain XMLHttpRequest object");
        }
      };
      function isHttpRequestSuccessful(xmlHttp) {
        return isUndefined(xmlHttp.status) || xmlHttp.status === 0 || xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 1223;
      }
      function AjaxAppender(url, withCredentials) {
        var appender = this;
        var isSupported = true;
        if (!url) {
          handleError("AjaxAppender: URL must be specified in constructor");
          isSupported = false;
        }
        var timed = this.defaults.timed;
        var waitForResponse = this.defaults.waitForResponse;
        var batchSize = this.defaults.batchSize;
        var timerInterval = this.defaults.timerInterval;
        var requestSuccessCallback = this.defaults.requestSuccessCallback;
        var failCallback = this.defaults.failCallback;
        var postVarName = this.defaults.postVarName;
        var sendAllOnUnload = this.defaults.sendAllOnUnload;
        var contentType = this.defaults.contentType;
        var sessionId = null;
        var queuedLoggingEvents = [];
        var queuedRequests = [];
        var headers = [];
        var sending = false;
        var initialized = false;
        function checkCanConfigure(configOptionName) {
          if (initialized) {
            handleError("AjaxAppender: configuration option '" + configOptionName + "' may not be set after the appender has been initialized");
            return false;
          }
          return true;
        }
        this.getSessionId = function() {
          return sessionId;
        };
        this.setSessionId = function(sessionIdParam) {
          sessionId = extractStringFromParam(sessionIdParam, null);
          this.layout.setCustomField("sessionid", sessionId);
        };
        this.setLayout = function(layoutParam) {
          if (checkCanConfigure("layout")) {
            this.layout = layoutParam;
            if (sessionId !== null) {
              this.setSessionId(sessionId);
            }
          }
        };
        this.isTimed = function() {
          return timed;
        };
        this.setTimed = function(timedParam) {
          if (checkCanConfigure("timed")) {
            timed = bool(timedParam);
          }
        };
        this.getTimerInterval = function() {
          return timerInterval;
        };
        this.setTimerInterval = function(timerIntervalParam) {
          if (checkCanConfigure("timerInterval")) {
            timerInterval = extractIntFromParam(timerIntervalParam, timerInterval);
          }
        };
        this.isWaitForResponse = function() {
          return waitForResponse;
        };
        this.setWaitForResponse = function(waitForResponseParam) {
          if (checkCanConfigure("waitForResponse")) {
            waitForResponse = bool(waitForResponseParam);
          }
        };
        this.getBatchSize = function() {
          return batchSize;
        };
        this.setBatchSize = function(batchSizeParam) {
          if (checkCanConfigure("batchSize")) {
            batchSize = extractIntFromParam(batchSizeParam, batchSize);
          }
        };
        this.isSendAllOnUnload = function() {
          return sendAllOnUnload;
        };
        this.setSendAllOnUnload = function(sendAllOnUnloadParam) {
          if (checkCanConfigure("sendAllOnUnload")) {
            sendAllOnUnload = extractBooleanFromParam(sendAllOnUnloadParam, sendAllOnUnload);
          }
        };
        this.setRequestSuccessCallback = function(requestSuccessCallbackParam) {
          requestSuccessCallback = extractFunctionFromParam(requestSuccessCallbackParam, requestSuccessCallback);
        };
        this.setFailCallback = function(failCallbackParam) {
          failCallback = extractFunctionFromParam(failCallbackParam, failCallback);
        };
        this.getPostVarName = function() {
          return postVarName;
        };
        this.setPostVarName = function(postVarNameParam) {
          if (checkCanConfigure("postVarName")) {
            postVarName = extractStringFromParam(postVarNameParam, postVarName);
          }
        };
        this.getHeaders = function() {
          return headers;
        };
        this.addHeader = function(name, value) {
          if (name.toLowerCase() == "content-type") {
            contentType = value;
          } else {
            headers.push({ name, value });
          }
        };
        function sendAll() {
          if (isSupported && enabled) {
            sending = true;
            var currentRequestBatch;
            if (waitForResponse) {
              if (queuedRequests.length > 0) {
                currentRequestBatch = queuedRequests.shift();
                sendRequest(preparePostData(currentRequestBatch), sendAll);
              } else {
                sending = false;
                if (timed) {
                  scheduleSending();
                }
              }
            } else {
              while (currentRequestBatch = queuedRequests.shift()) {
                sendRequest(preparePostData(currentRequestBatch));
              }
              sending = false;
              if (timed) {
                scheduleSending();
              }
            }
          }
        }
        this.sendAll = sendAll;
        function sendAllRemaining() {
          var sendingAnything = false;
          if (isSupported && enabled) {
            var actualBatchSize = appender.getLayout().allowBatching() ? batchSize : 1;
            var currentLoggingEvent;
            var batchedLoggingEvents = [];
            while (currentLoggingEvent = queuedLoggingEvents.shift()) {
              batchedLoggingEvents.push(currentLoggingEvent);
              if (queuedLoggingEvents.length >= actualBatchSize) {
                queuedRequests.push(batchedLoggingEvents);
                batchedLoggingEvents = [];
              }
            }
            if (batchedLoggingEvents.length > 0) {
              queuedRequests.push(batchedLoggingEvents);
            }
            sendingAnything = queuedRequests.length > 0;
            waitForResponse = false;
            timed = false;
            sendAll();
          }
          return sendingAnything;
        }
        this.sendAllRemaining = sendAllRemaining;
        function preparePostData(batchedLoggingEvents) {
          var formattedMessages = [];
          var currentLoggingEvent;
          var postData = "";
          while (currentLoggingEvent = batchedLoggingEvents.shift()) {
            formattedMessages.push(appender.getLayout().formatWithException(currentLoggingEvent));
          }
          if (batchedLoggingEvents.length == 1) {
            postData = formattedMessages.join("");
          } else {
            postData = appender.getLayout().batchHeader + formattedMessages.join(appender.getLayout().batchSeparator) + appender.getLayout().batchFooter;
          }
          if (contentType == appender.defaults.contentType) {
            postData = appender.getLayout().returnsPostData ? postData : urlEncode(postVarName) + "=" + urlEncode(postData);
            if (postData.length > 0) {
              postData += "&";
            }
            postData += "layout=" + urlEncode(appender.getLayout().toString());
          }
          return postData;
        }
        function scheduleSending() {
          window.setTimeout(sendAll, timerInterval);
        }
        function xmlHttpErrorHandler() {
          var msg = "AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled";
          handleError(msg);
          isSupported = false;
          if (failCallback) {
            failCallback(msg);
          }
        }
        function sendRequest(postData, successCallback) {
          try {
            var xmlHttp = getXmlHttp(xmlHttpErrorHandler);
            if (isSupported) {
              xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                  if (isHttpRequestSuccessful(xmlHttp)) {
                    if (requestSuccessCallback) {
                      requestSuccessCallback(xmlHttp);
                    }
                    if (successCallback) {
                      successCallback(xmlHttp);
                    }
                  } else {
                    var msg2 = "AjaxAppender.append: XMLHttpRequest request to URL " + url + " returned status code " + xmlHttp.status;
                    handleError(msg2);
                    if (failCallback) {
                      failCallback(msg2);
                    }
                  }
                  xmlHttp.onreadystatechange = emptyFunction;
                  xmlHttp = null;
                }
              };
              xmlHttp.open("POST", url, true);
              if (withCredentials && withCredentialsSupported) {
                xmlHttp.withCredentials = true;
              }
              try {
                for (var i2 = 0, header; header = headers[i2++]; ) {
                  xmlHttp.setRequestHeader(header.name, header.value);
                }
                xmlHttp.setRequestHeader("Content-Type", contentType);
              } catch (headerEx) {
                var msg = "AjaxAppender.append: your browser's XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled";
                handleError(msg);
                isSupported = false;
                if (failCallback) {
                  failCallback(msg);
                }
                return;
              }
              xmlHttp.send(postData);
            }
          } catch (ex) {
            var errMsg = "AjaxAppender.append: error sending log message to " + url;
            handleError(errMsg, ex);
            isSupported = false;
            if (failCallback) {
              failCallback(errMsg + ". Details: " + getExceptionStringRep(ex));
            }
          }
        }
        this.append = function(loggingEvent) {
          if (isSupported) {
            if (!initialized) {
              init();
            }
            queuedLoggingEvents.push(loggingEvent);
            var actualBatchSize = this.getLayout().allowBatching() ? batchSize : 1;
            if (queuedLoggingEvents.length >= actualBatchSize) {
              var currentLoggingEvent;
              var batchedLoggingEvents = [];
              while (currentLoggingEvent = queuedLoggingEvents.shift()) {
                batchedLoggingEvents.push(currentLoggingEvent);
              }
              queuedRequests.push(batchedLoggingEvents);
              if (!timed && (!waitForResponse || waitForResponse && !sending)) {
                sendAll();
              }
            }
          }
        };
        function init() {
          initialized = true;
          if (sendAllOnUnload) {
            var oldBeforeUnload = window.onbeforeunload;
            window.onbeforeunload = function() {
              if (oldBeforeUnload) {
                oldBeforeUnload();
              }
              sendAllRemaining();
            };
          }
          if (timed) {
            scheduleSending();
          }
        }
      }
      AjaxAppender.prototype = new Appender();
      AjaxAppender.prototype.defaults = { waitForResponse: false, timed: false, timerInterval: 1e3, batchSize: 1, sendAllOnUnload: false, requestSuccessCallback: null, failCallback: null, postVarName: "data", contentType: "application/x-www-form-urlencoded" };
      AjaxAppender.prototype.layout = new HttpPostDataLayout();
      AjaxAppender.prototype.toString = function() {
        return "AjaxAppender";
      };
      log4javascript.AjaxAppender = AjaxAppender;
      function setCookie(name, value, days, path) {
        var expires;
        path = path ? "; path=" + path : "";
        if (days) {
          var date = /* @__PURE__ */ new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
          expires = "; expires=" + date.toGMTString();
        } else {
          expires = "";
        }
        document.cookie = escape(name) + "=" + escape(value) + expires + path;
      }
      function getCookie(name) {
        var nameEquals = escape(name) + "=";
        var ca = document.cookie.split(";");
        for (var i2 = 0, len2 = ca.length; i2 < len2; i2++) {
          var c = ca[i2];
          while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEquals) === 0) {
            return unescape(c.substring(nameEquals.length, c.length));
          }
        }
        return null;
      }
      function getBaseUrl() {
        var scripts = document.getElementsByTagName("script");
        for (var i2 = 0, len2 = scripts.length; i2 < len2; ++i2) {
          if (scripts[i2].src.indexOf("log4javascript") != -1) {
            var lastSlash = scripts[i2].src.lastIndexOf("/");
            return lastSlash == -1 ? "" : scripts[i2].src.substr(0, lastSlash + 1);
          }
        }
        return null;
      }
      function isLoaded(win) {
        try {
          return bool(win.loaded);
        } catch (ex) {
          return false;
        }
      }
      var ConsoleAppender;
      (function() {
        var getConsoleHtmlLines = function() {
          return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">', '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">', "<head>", "<title>log4javascript</title>", '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />', "<!-- Make IE8 behave like IE7, having gone to all the trouble of making IE work -->", '<meta http-equiv="X-UA-Compatible" content="IE=7" />', '<script type="text/javascript">var isIe = false, isIePre7 = false;<\/script>', '<!--[if IE]><script type="text/javascript">isIe = true<\/script><![endif]-->', '<!--[if lt IE 7]><script type="text/javascript">isIePre7 = true<\/script><![endif]-->', '<script type="text/javascript">', "//<![CDATA[", "var loggingEnabled=true;var logQueuedEventsTimer=null;var logEntries=[];var logEntriesAndSeparators=[];var logItems=[];var renderDelay=100;var unrenderedLogItemsExist=false;var rootGroup,currentGroup=null;var loaded=false;var currentLogItem=null;var logMainContainer;function copyProperties(obj,props){for(var i in props){obj[i]=props[i];}}", "function LogItem(){}", "LogItem.prototype={mainContainer:null,wrappedContainer:null,unwrappedContainer:null,group:null,appendToLog:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].appendToLog();}", "this.group.update();},doRemove:function(doUpdate,removeFromGroup){if(this.rendered){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].remove();}", "this.unwrappedElementContainer=null;this.wrappedElementContainer=null;this.mainElementContainer=null;}", "if(this.group&&removeFromGroup){this.group.removeChild(this,doUpdate);}", "if(this===currentLogItem){currentLogItem=null;}},remove:function(doUpdate,removeFromGroup){this.doRemove(doUpdate,removeFromGroup);},render:function(){},accept:function(visitor){visitor.visit(this);},getUnwrappedDomContainer:function(){return this.group.unwrappedElementContainer.contentDiv;},getWrappedDomContainer:function(){return this.group.wrappedElementContainer.contentDiv;},getMainDomContainer:function(){return this.group.mainElementContainer.contentDiv;}};LogItem.serializedItemKeys={LOG_ENTRY:0,GROUP_START:1,GROUP_END:2};function LogItemContainerElement(){}", 'LogItemContainerElement.prototype={appendToLog:function(){var insertBeforeFirst=(newestAtTop&&this.containerDomNode.hasChildNodes());if(insertBeforeFirst){this.containerDomNode.insertBefore(this.mainDiv,this.containerDomNode.firstChild);}else{this.containerDomNode.appendChild(this.mainDiv);}}};function SeparatorElementContainer(containerDomNode){this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="separator";this.mainDiv.innerHTML="&nbsp;";}', "SeparatorElementContainer.prototype=new LogItemContainerElement();SeparatorElementContainer.prototype.remove=function(){this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;};function Separator(){this.rendered=false;}", "Separator.prototype=new LogItem();copyProperties(Separator.prototype,{render:function(){var containerDomNode=this.group.contentDiv;if(isIe){this.unwrappedElementContainer=new SeparatorElementContainer(this.getUnwrappedDomContainer());this.wrappedElementContainer=new SeparatorElementContainer(this.getWrappedDomContainer());this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{this.mainElementContainer=new SeparatorElementContainer(this.getMainDomContainer());this.elementContainers=[this.mainElementContainer];}", 'this.content=this.formattedMessage;this.rendered=true;}});function GroupElementContainer(group,containerDomNode,isRoot,isWrapped){this.group=group;this.containerDomNode=containerDomNode;this.isRoot=isRoot;this.isWrapped=isWrapped;this.expandable=false;if(this.isRoot){if(isIe){this.contentDiv=logMainContainer.appendChild(document.createElement("div"));this.contentDiv.id=this.isWrapped?"log_wrapped":"log_unwrapped";}else{this.contentDiv=logMainContainer;}}else{var groupElementContainer=this;this.mainDiv=document.createElement("div");this.mainDiv.className="group";this.headingDiv=this.mainDiv.appendChild(document.createElement("div"));this.headingDiv.className="groupheading";this.expander=this.headingDiv.appendChild(document.createElement("span"));this.expander.className="expander unselectable greyedout";this.expander.unselectable=true;var expanderText=this.group.expanded?"-":"+";this.expanderTextNode=this.expander.appendChild(document.createTextNode(expanderText));this.headingDiv.appendChild(document.createTextNode(" "+this.group.name));this.contentDiv=this.mainDiv.appendChild(document.createElement("div"));var contentCssClass=this.group.expanded?"expanded":"collapsed";this.contentDiv.className="groupcontent "+contentCssClass;this.expander.onclick=function(){if(groupElementContainer.group.expandable){groupElementContainer.group.toggleExpanded();}};}}', 'GroupElementContainer.prototype=new LogItemContainerElement();copyProperties(GroupElementContainer.prototype,{toggleExpanded:function(){if(!this.isRoot){var oldCssClass,newCssClass,expanderText;if(this.group.expanded){newCssClass="expanded";oldCssClass="collapsed";expanderText="-";}else{newCssClass="collapsed";oldCssClass="expanded";expanderText="+";}', "replaceClass(this.contentDiv,newCssClass,oldCssClass);this.expanderTextNode.nodeValue=expanderText;}},remove:function(){if(!this.isRoot){this.headingDiv=null;this.expander.onclick=null;this.expander=null;this.expanderTextNode=null;this.contentDiv=null;this.containerDomNode=null;this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;}},reverseChildren:function(){var node=null;var childDomNodes=[];while((node=this.contentDiv.firstChild)){this.contentDiv.removeChild(node);childDomNodes.push(node);}", 'while((node=childDomNodes.pop())){this.contentDiv.appendChild(node);}},update:function(){if(!this.isRoot){if(this.group.expandable){removeClass(this.expander,"greyedout");}else{addClass(this.expander,"greyedout");}}},clear:function(){if(this.isRoot){this.contentDiv.innerHTML="";}}});function Group(name,isRoot,initiallyExpanded){this.name=name;this.group=null;this.isRoot=isRoot;this.initiallyExpanded=initiallyExpanded;this.elementContainers=[];this.children=[];this.expanded=initiallyExpanded;this.rendered=false;this.expandable=false;}', "Group.prototype=new LogItem();copyProperties(Group.prototype,{addChild:function(logItem){this.children.push(logItem);logItem.group=this;},render:function(){if(isIe){var unwrappedDomContainer,wrappedDomContainer;if(this.isRoot){unwrappedDomContainer=logMainContainer;wrappedDomContainer=logMainContainer;}else{unwrappedDomContainer=this.getUnwrappedDomContainer();wrappedDomContainer=this.getWrappedDomContainer();}", "this.unwrappedElementContainer=new GroupElementContainer(this,unwrappedDomContainer,this.isRoot,false);this.wrappedElementContainer=new GroupElementContainer(this,wrappedDomContainer,this.isRoot,true);this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{var mainDomContainer=this.isRoot?logMainContainer:this.getMainDomContainer();this.mainElementContainer=new GroupElementContainer(this,mainDomContainer,this.isRoot,false);this.elementContainers=[this.mainElementContainer];}", "this.rendered=true;},toggleExpanded:function(){this.expanded=!this.expanded;for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].toggleExpanded();}},expand:function(){if(!this.expanded){this.toggleExpanded();}},accept:function(visitor){visitor.visitGroup(this);},reverseChildren:function(){if(this.rendered){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].reverseChildren();}}},update:function(){var previouslyExpandable=this.expandable;this.expandable=(this.children.length!==0);if(this.expandable!==previouslyExpandable){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].update();}}},flatten:function(){var visitor=new GroupFlattener();this.accept(visitor);return visitor.logEntriesAndSeparators;},removeChild:function(child,doUpdate){array_remove(this.children,child);child.group=null;if(doUpdate){this.update();}},remove:function(doUpdate,removeFromGroup){for(var i=0,len=this.children.length;i<len;i++){this.children[i].remove(false,false);}", "this.children=[];this.update();if(this===currentGroup){currentGroup=this.group;}", "this.doRemove(doUpdate,removeFromGroup);},serialize:function(items){items.push([LogItem.serializedItemKeys.GROUP_START,this.name]);for(var i=0,len=this.children.length;i<len;i++){this.children[i].serialize(items);}", "if(this!==currentGroup){items.push([LogItem.serializedItemKeys.GROUP_END]);}},clear:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].clear();}}});function LogEntryElementContainer(){}", 'LogEntryElementContainer.prototype=new LogItemContainerElement();copyProperties(LogEntryElementContainer.prototype,{remove:function(){this.doRemove();},doRemove:function(){this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;this.contentElement=null;this.containerDomNode=null;},setContent:function(content,wrappedContent){if(content===this.formattedMessage){this.contentElement.innerHTML="";this.contentElement.appendChild(document.createTextNode(this.formattedMessage));}else{this.contentElement.innerHTML=content;}},setSearchMatch:function(isMatch){var oldCssClass=isMatch?"searchnonmatch":"searchmatch";var newCssClass=isMatch?"searchmatch":"searchnonmatch";replaceClass(this.mainDiv,newCssClass,oldCssClass);},clearSearch:function(){removeClass(this.mainDiv,"searchmatch");removeClass(this.mainDiv,"searchnonmatch");}});function LogEntryWrappedElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.appendChild(document.createTextNode(this.logEntry.formattedMessage));this.mainDiv.className="logentry wrapped "+this.logEntry.level;this.contentElement=this.mainDiv;}', 'LogEntryWrappedElementContainer.prototype=new LogEntryElementContainer();LogEntryWrappedElementContainer.prototype.setContent=function(content,wrappedContent){if(content===this.formattedMessage){this.contentElement.innerHTML="";this.contentElement.appendChild(document.createTextNode(this.formattedMessage));}else{this.contentElement.innerHTML=wrappedContent;}};function LogEntryUnwrappedElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="logentry unwrapped "+this.logEntry.level;this.pre=this.mainDiv.appendChild(document.createElement("pre"));this.pre.appendChild(document.createTextNode(this.logEntry.formattedMessage));this.pre.className="unwrapped";this.contentElement=this.pre;}', 'LogEntryUnwrappedElementContainer.prototype=new LogEntryElementContainer();LogEntryUnwrappedElementContainer.prototype.remove=function(){this.doRemove();this.pre=null;};function LogEntryMainElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="logentry nonielogentry "+this.logEntry.level;this.contentElement=this.mainDiv.appendChild(document.createElement("span"));this.contentElement.appendChild(document.createTextNode(this.logEntry.formattedMessage));}', "LogEntryMainElementContainer.prototype=new LogEntryElementContainer();function LogEntry(level,formattedMessage){this.level=level;this.formattedMessage=formattedMessage;this.rendered=false;}", 'LogEntry.prototype=new LogItem();copyProperties(LogEntry.prototype,{render:function(){var logEntry=this;var containerDomNode=this.group.contentDiv;if(isIe){this.formattedMessage=this.formattedMessage.replace(/\\r\\n/g,"\\r");this.unwrappedElementContainer=new LogEntryUnwrappedElementContainer(this,this.getUnwrappedDomContainer());this.wrappedElementContainer=new LogEntryWrappedElementContainer(this,this.getWrappedDomContainer());this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{this.mainElementContainer=new LogEntryMainElementContainer(this,this.getMainDomContainer());this.elementContainers=[this.mainElementContainer];}', 'this.content=this.formattedMessage;this.rendered=true;},setContent:function(content,wrappedContent){if(content!=this.content){if(isIe&&(content!==this.formattedMessage)){content=content.replace(/\\r\\n/g,"\\r");}', "for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].setContent(content,wrappedContent);}", 'this.content=content;}},getSearchMatches:function(){var matches=[];var i,len;if(isIe){var unwrappedEls=getElementsByClass(this.unwrappedElementContainer.mainDiv,"searchterm","span");var wrappedEls=getElementsByClass(this.wrappedElementContainer.mainDiv,"searchterm","span");for(i=0,len=unwrappedEls.length;i<len;i++){matches[i]=new Match(this.level,null,unwrappedEls[i],wrappedEls[i]);}}else{var els=getElementsByClass(this.mainElementContainer.mainDiv,"searchterm","span");for(i=0,len=els.length;i<len;i++){matches[i]=new Match(this.level,els[i]);}}', "return matches;},setSearchMatch:function(isMatch){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].setSearchMatch(isMatch);}},clearSearch:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].clearSearch();}},accept:function(visitor){visitor.visitLogEntry(this);},serialize:function(items){items.push([LogItem.serializedItemKeys.LOG_ENTRY,this.level,this.formattedMessage]);}});function LogItemVisitor(){}", "LogItemVisitor.prototype={visit:function(logItem){},visitParent:function(logItem){if(logItem.group){logItem.group.accept(this);}},visitChildren:function(logItem){for(var i=0,len=logItem.children.length;i<len;i++){logItem.children[i].accept(this);}},visitLogEntry:function(logEntry){this.visit(logEntry);},visitSeparator:function(separator){this.visit(separator);},visitGroup:function(group){this.visit(group);}};function GroupFlattener(){this.logEntriesAndSeparators=[];}", 'GroupFlattener.prototype=new LogItemVisitor();GroupFlattener.prototype.visitGroup=function(group){this.visitChildren(group);};GroupFlattener.prototype.visitLogEntry=function(logEntry){this.logEntriesAndSeparators.push(logEntry);};GroupFlattener.prototype.visitSeparator=function(separator){this.logEntriesAndSeparators.push(separator);};window.onload=function(){if(location.search){var queryBits=unescape(location.search).substr(1).split("&"),nameValueBits;for(var i=0,len=queryBits.length;i<len;i++){nameValueBits=queryBits[i].split("=");if(nameValueBits[0]=="log4javascript_domain"){document.domain=nameValueBits[1];break;}}}', 'logMainContainer=$("log");if(isIePre7){addClass(logMainContainer,"oldIe");}', 'rootGroup=new Group("root",true);rootGroup.render();currentGroup=rootGroup;setCommandInputWidth();setLogContainerHeight();toggleLoggingEnabled();toggleSearchEnabled();toggleSearchFilter();toggleSearchHighlight();applyFilters();checkAllLevels();toggleWrap();toggleNewestAtTop();toggleScrollToLatest();renderQueuedLogItems();loaded=true;$("command").value="";$("command").autocomplete="off";$("command").onkeydown=function(evt){evt=getEvent(evt);if(evt.keyCode==10||evt.keyCode==13){evalCommandLine();stopPropagation(evt);}else if(evt.keyCode==27){this.value="";this.focus();}else if(evt.keyCode==38&&commandHistory.length>0){currentCommandIndex=Math.max(0,currentCommandIndex-1);this.value=commandHistory[currentCommandIndex];moveCaretToEnd(this);}else if(evt.keyCode==40&&commandHistory.length>0){currentCommandIndex=Math.min(commandHistory.length-1,currentCommandIndex+1);this.value=commandHistory[currentCommandIndex];moveCaretToEnd(this);}};$("command").onkeypress=function(evt){evt=getEvent(evt);if(evt.keyCode==38&&commandHistory.length>0&&evt.preventDefault){evt.preventDefault();}};$("command").onkeyup=function(evt){evt=getEvent(evt);if(evt.keyCode==27&&evt.preventDefault){evt.preventDefault();this.focus();}};document.onkeydown=function keyEventHandler(evt){evt=getEvent(evt);switch(evt.keyCode){case 69:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){evalLastCommand();cancelKeyEvent(evt);return false;}', "break;case 75:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){focusSearch();cancelKeyEvent(evt);return false;}", "break;case 40:case 76:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){focusCommandLine();cancelKeyEvent(evt);return false;}", "break;}};setTimeout(setLogContainerHeight,20);setShowCommandLine(showCommandLine);doSearch();};window.onunload=function(){if(mainWindowExists()){appender.unload();}", 'appender=null;};function toggleLoggingEnabled(){setLoggingEnabled($("enableLogging").checked);}', "function setLoggingEnabled(enable){loggingEnabled=enable;}", "var appender=null;function setAppender(appenderParam){appender=appenderParam;}", 'function setShowCloseButton(showCloseButton){$("closeButton").style.display=showCloseButton?"inline":"none";}', 'function setShowHideButton(showHideButton){$("hideButton").style.display=showHideButton?"inline":"none";}', "var newestAtTop=false;function LogItemContentReverser(){}", "LogItemContentReverser.prototype=new LogItemVisitor();LogItemContentReverser.prototype.visitGroup=function(group){group.reverseChildren();this.visitChildren(group);};function setNewestAtTop(isNewestAtTop){var oldNewestAtTop=newestAtTop;var i,iLen,j,jLen;newestAtTop=Boolean(isNewestAtTop);if(oldNewestAtTop!=newestAtTop){var visitor=new LogItemContentReverser();rootGroup.accept(visitor);if(currentSearch){var currentMatch=currentSearch.matches[currentMatchIndex];var matchIndex=0;var matches=[];var actOnLogEntry=function(logEntry){var logEntryMatches=logEntry.getSearchMatches();for(j=0,jLen=logEntryMatches.length;j<jLen;j++){matches[matchIndex]=logEntryMatches[j];if(currentMatch&&logEntryMatches[j].equals(currentMatch)){currentMatchIndex=matchIndex;}", "matchIndex++;}};if(newestAtTop){for(i=logEntries.length-1;i>=0;i--){actOnLogEntry(logEntries[i]);}}else{for(i=0,iLen=logEntries.length;i<iLen;i++){actOnLogEntry(logEntries[i]);}}", "currentSearch.matches=matches;if(currentMatch){currentMatch.setCurrent();}}else if(scrollToLatest){doScrollToLatest();}}", '$("newestAtTop").checked=isNewestAtTop;}', 'function toggleNewestAtTop(){var isNewestAtTop=$("newestAtTop").checked;setNewestAtTop(isNewestAtTop);}', "var scrollToLatest=true;function setScrollToLatest(isScrollToLatest){scrollToLatest=isScrollToLatest;if(scrollToLatest){doScrollToLatest();}", '$("scrollToLatest").checked=isScrollToLatest;}', 'function toggleScrollToLatest(){var isScrollToLatest=$("scrollToLatest").checked;setScrollToLatest(isScrollToLatest);}', 'function doScrollToLatest(){var l=logMainContainer;if(typeof l.scrollTop!="undefined"){if(newestAtTop){l.scrollTop=0;}else{var latestLogEntry=l.lastChild;if(latestLogEntry){l.scrollTop=l.scrollHeight;}}}}', "var closeIfOpenerCloses=true;function setCloseIfOpenerCloses(isCloseIfOpenerCloses){closeIfOpenerCloses=isCloseIfOpenerCloses;}", "var maxMessages=null;function setMaxMessages(max){maxMessages=max;pruneLogEntries();}", 'var showCommandLine=false;function setShowCommandLine(isShowCommandLine){showCommandLine=isShowCommandLine;if(loaded){$("commandLine").style.display=showCommandLine?"block":"none";setCommandInputWidth();setLogContainerHeight();}}', 'function focusCommandLine(){if(loaded){$("command").focus();}}', 'function focusSearch(){if(loaded){$("searchBox").focus();}}', "function getLogItems(){var items=[];for(var i=0,len=logItems.length;i<len;i++){logItems[i].serialize(items);}", "return items;}", "function setLogItems(items){var loggingReallyEnabled=loggingEnabled;loggingEnabled=true;for(var i=0,len=items.length;i<len;i++){switch(items[i][0]){case LogItem.serializedItemKeys.LOG_ENTRY:log(items[i][1],items[i][2]);break;case LogItem.serializedItemKeys.GROUP_START:group(items[i][1]);break;case LogItem.serializedItemKeys.GROUP_END:groupEnd();break;}}", "loggingEnabled=loggingReallyEnabled;}", "function log(logLevel,formattedMessage){if(loggingEnabled){var logEntry=new LogEntry(logLevel,formattedMessage);logEntries.push(logEntry);logEntriesAndSeparators.push(logEntry);logItems.push(logEntry);currentGroup.addChild(logEntry);if(loaded){if(logQueuedEventsTimer!==null){clearTimeout(logQueuedEventsTimer);}", "logQueuedEventsTimer=setTimeout(renderQueuedLogItems,renderDelay);unrenderedLogItemsExist=true;}}}", "function renderQueuedLogItems(){logQueuedEventsTimer=null;var pruned=pruneLogEntries();var initiallyHasMatches=currentSearch?currentSearch.hasMatches():false;for(var i=0,len=logItems.length;i<len;i++){if(!logItems[i].rendered){logItems[i].render();logItems[i].appendToLog();if(currentSearch&&(logItems[i]instanceof LogEntry)){currentSearch.applyTo(logItems[i]);}}}", "if(currentSearch){if(pruned){if(currentSearch.hasVisibleMatches()){if(currentMatchIndex===null){setCurrentMatchIndex(0);}", "displayMatches();}else{displayNoMatches();}}else if(!initiallyHasMatches&&currentSearch.hasVisibleMatches()){setCurrentMatchIndex(0);displayMatches();}}", "if(scrollToLatest){doScrollToLatest();}", "unrenderedLogItemsExist=false;}", "function pruneLogEntries(){if((maxMessages!==null)&&(logEntriesAndSeparators.length>maxMessages)){var numberToDelete=logEntriesAndSeparators.length-maxMessages;var prunedLogEntries=logEntriesAndSeparators.slice(0,numberToDelete);if(currentSearch){currentSearch.removeMatches(prunedLogEntries);}", "var group;for(var i=0;i<numberToDelete;i++){group=logEntriesAndSeparators[i].group;array_remove(logItems,logEntriesAndSeparators[i]);array_remove(logEntries,logEntriesAndSeparators[i]);logEntriesAndSeparators[i].remove(true,true);if(group.children.length===0&&group!==currentGroup&&group!==rootGroup){array_remove(logItems,group);group.remove(true,true);}}", "logEntriesAndSeparators=array_removeFromStart(logEntriesAndSeparators,numberToDelete);return true;}", "return false;}", 'function group(name,startExpanded){if(loggingEnabled){initiallyExpanded=(typeof startExpanded==="undefined")?true:Boolean(startExpanded);var newGroup=new Group(name,false,initiallyExpanded);currentGroup.addChild(newGroup);currentGroup=newGroup;logItems.push(newGroup);if(loaded){if(logQueuedEventsTimer!==null){clearTimeout(logQueuedEventsTimer);}', "logQueuedEventsTimer=setTimeout(renderQueuedLogItems,renderDelay);unrenderedLogItemsExist=true;}}}", "function groupEnd(){currentGroup=(currentGroup===rootGroup)?rootGroup:currentGroup.group;}", "function mainPageReloaded(){currentGroup=rootGroup;var separator=new Separator();logEntriesAndSeparators.push(separator);logItems.push(separator);currentGroup.addChild(separator);}", "function closeWindow(){if(appender&&mainWindowExists()){appender.close(true);}else{window.close();}}", "function hide(){if(appender&&mainWindowExists()){appender.hide();}}", 'var mainWindow=window;var windowId="log4javascriptConsoleWindow_"+new Date().getTime()+"_"+(""+Math.random()).substr(2);function setMainWindow(win){mainWindow=win;mainWindow[windowId]=window;if(opener&&closeIfOpenerCloses){pollOpener();}}', "function pollOpener(){if(closeIfOpenerCloses){if(mainWindowExists()){setTimeout(pollOpener,500);}else{closeWindow();}}}", "function mainWindowExists(){try{return(mainWindow&&!mainWindow.closed&&mainWindow[windowId]==window);}catch(ex){}", "return false;}", 'var logLevels=["TRACE","DEBUG","INFO","WARN","ERROR","FATAL"];function getCheckBox(logLevel){return $("switch_"+logLevel);}', 'function getIeWrappedLogContainer(){return $("log_wrapped");}', 'function getIeUnwrappedLogContainer(){return $("log_unwrapped");}', "function applyFilters(){for(var i=0;i<logLevels.length;i++){if(getCheckBox(logLevels[i]).checked){addClass(logMainContainer,logLevels[i]);}else{removeClass(logMainContainer,logLevels[i]);}}", "updateSearchFromFilters();}", 'function toggleAllLevels(){var turnOn=$("switch_ALL").checked;for(var i=0;i<logLevels.length;i++){getCheckBox(logLevels[i]).checked=turnOn;if(turnOn){addClass(logMainContainer,logLevels[i]);}else{removeClass(logMainContainer,logLevels[i]);}}}', 'function checkAllLevels(){for(var i=0;i<logLevels.length;i++){if(!getCheckBox(logLevels[i]).checked){getCheckBox("ALL").checked=false;return;}}', 'getCheckBox("ALL").checked=true;}', "function clearLog(){rootGroup.clear();currentGroup=rootGroup;logEntries=[];logItems=[];logEntriesAndSeparators=[];doSearch();}", 'function toggleWrap(){var enable=$("wrap").checked;if(enable){addClass(logMainContainer,"wrap");}else{removeClass(logMainContainer,"wrap");}', "refreshCurrentMatch();}", "var searchTimer=null;function scheduleSearch(){try{clearTimeout(searchTimer);}catch(ex){}", "searchTimer=setTimeout(doSearch,500);}", "function Search(searchTerm,isRegex,searchRegex,isCaseSensitive){this.searchTerm=searchTerm;this.isRegex=isRegex;this.searchRegex=searchRegex;this.isCaseSensitive=isCaseSensitive;this.matches=[];}", "Search.prototype={hasMatches:function(){return this.matches.length>0;},hasVisibleMatches:function(){if(this.hasMatches()){for(var i=0;i<this.matches.length;i++){if(this.matches[i].isVisible()){return true;}}}", "return false;},match:function(logEntry){var entryText=String(logEntry.formattedMessage);var matchesSearch=false;if(this.isRegex){matchesSearch=this.searchRegex.test(entryText);}else if(this.isCaseSensitive){matchesSearch=(entryText.indexOf(this.searchTerm)>-1);}else{matchesSearch=(entryText.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1);}", "return matchesSearch;},getNextVisibleMatchIndex:function(){for(var i=currentMatchIndex+1;i<this.matches.length;i++){if(this.matches[i].isVisible()){return i;}}", "for(i=0;i<=currentMatchIndex;i++){if(this.matches[i].isVisible()){return i;}}", "return-1;},getPreviousVisibleMatchIndex:function(){for(var i=currentMatchIndex-1;i>=0;i--){if(this.matches[i].isVisible()){return i;}}", "for(var i=this.matches.length-1;i>=currentMatchIndex;i--){if(this.matches[i].isVisible()){return i;}}", 'return-1;},applyTo:function(logEntry){var doesMatch=this.match(logEntry);if(doesMatch){logEntry.group.expand();logEntry.setSearchMatch(true);var logEntryContent;var wrappedLogEntryContent;var searchTermReplacementStartTag="<span class=\\"searchterm\\">";var searchTermReplacementEndTag="<"+"/span>";var preTagName=isIe?"pre":"span";var preStartTag="<"+preTagName+" class=\\"pre\\">";var preEndTag="<"+"/"+preTagName+">";var startIndex=0;var searchIndex,matchedText,textBeforeMatch;if(this.isRegex){var flags=this.isCaseSensitive?"g":"gi";var capturingRegex=new RegExp("("+this.searchRegex.source+")",flags);var rnd=(""+Math.random()).substr(2);var startToken="%%s"+rnd+"%%";var endToken="%%e"+rnd+"%%";logEntryContent=logEntry.formattedMessage.replace(capturingRegex,startToken+"$1"+endToken);logEntryContent=escapeHtml(logEntryContent);var result;var searchString=logEntryContent;logEntryContent="";wrappedLogEntryContent="";while((searchIndex=searchString.indexOf(startToken,startIndex))>-1){var endTokenIndex=searchString.indexOf(endToken,searchIndex);matchedText=searchString.substring(searchIndex+startToken.length,endTokenIndex);textBeforeMatch=searchString.substring(startIndex,searchIndex);logEntryContent+=preStartTag+textBeforeMatch+preEndTag;logEntryContent+=searchTermReplacementStartTag+preStartTag+matchedText+', "preEndTag+searchTermReplacementEndTag;if(isIe){wrappedLogEntryContent+=textBeforeMatch+searchTermReplacementStartTag+", "matchedText+searchTermReplacementEndTag;}", "startIndex=endTokenIndex+endToken.length;}", 'logEntryContent+=preStartTag+searchString.substr(startIndex)+preEndTag;if(isIe){wrappedLogEntryContent+=searchString.substr(startIndex);}}else{logEntryContent="";wrappedLogEntryContent="";var searchTermReplacementLength=searchTermReplacementStartTag.length+', "this.searchTerm.length+searchTermReplacementEndTag.length;var searchTermLength=this.searchTerm.length;var searchTermLowerCase=this.searchTerm.toLowerCase();var logTextLowerCase=logEntry.formattedMessage.toLowerCase();while((searchIndex=logTextLowerCase.indexOf(searchTermLowerCase,startIndex))>-1){matchedText=escapeHtml(logEntry.formattedMessage.substr(searchIndex,this.searchTerm.length));textBeforeMatch=escapeHtml(logEntry.formattedMessage.substring(startIndex,searchIndex));var searchTermReplacement=searchTermReplacementStartTag+", "preStartTag+matchedText+preEndTag+searchTermReplacementEndTag;logEntryContent+=preStartTag+textBeforeMatch+preEndTag+searchTermReplacement;if(isIe){wrappedLogEntryContent+=textBeforeMatch+searchTermReplacementStartTag+", "matchedText+searchTermReplacementEndTag;}", "startIndex=searchIndex+searchTermLength;}", "var textAfterLastMatch=escapeHtml(logEntry.formattedMessage.substr(startIndex));logEntryContent+=preStartTag+textAfterLastMatch+preEndTag;if(isIe){wrappedLogEntryContent+=textAfterLastMatch;}}", "logEntry.setContent(logEntryContent,wrappedLogEntryContent);var logEntryMatches=logEntry.getSearchMatches();this.matches=this.matches.concat(logEntryMatches);}else{logEntry.setSearchMatch(false);logEntry.setContent(logEntry.formattedMessage,logEntry.formattedMessage);}", "return doesMatch;},removeMatches:function(logEntries){var matchesToRemoveCount=0;var currentMatchRemoved=false;var matchesToRemove=[];var i,iLen,j,jLen;for(i=0,iLen=this.matches.length;i<iLen;i++){for(j=0,jLen=logEntries.length;j<jLen;j++){if(this.matches[i].belongsTo(logEntries[j])){matchesToRemove.push(this.matches[i]);if(i===currentMatchIndex){currentMatchRemoved=true;}}}}", "var newMatch=currentMatchRemoved?null:this.matches[currentMatchIndex];if(currentMatchRemoved){for(i=currentMatchIndex,iLen=this.matches.length;i<iLen;i++){if(this.matches[i].isVisible()&&!array_contains(matchesToRemove,this.matches[i])){newMatch=this.matches[i];break;}}}", "for(i=0,iLen=matchesToRemove.length;i<iLen;i++){array_remove(this.matches,matchesToRemove[i]);matchesToRemove[i].remove();}", "if(this.hasVisibleMatches()){if(newMatch===null){setCurrentMatchIndex(0);}else{var newMatchIndex=0;for(i=0,iLen=this.matches.length;i<iLen;i++){if(newMatch===this.matches[i]){newMatchIndex=i;break;}}", "setCurrentMatchIndex(newMatchIndex);}}else{currentMatchIndex=null;displayNoMatches();}}};function getPageOffsetTop(el,container){var currentEl=el;var y=0;while(currentEl&&currentEl!=container){y+=currentEl.offsetTop;currentEl=currentEl.offsetParent;}", "return y;}", 'function scrollIntoView(el){var logContainer=logMainContainer;if(!$("wrap").checked){var logContainerLeft=logContainer.scrollLeft;var logContainerRight=logContainerLeft+logContainer.offsetWidth;var elLeft=el.offsetLeft;var elRight=elLeft+el.offsetWidth;if(elLeft<logContainerLeft||elRight>logContainerRight){logContainer.scrollLeft=elLeft-(logContainer.offsetWidth-el.offsetWidth)/2;}}', "var logContainerTop=logContainer.scrollTop;var logContainerBottom=logContainerTop+logContainer.offsetHeight;var elTop=getPageOffsetTop(el)-getToolBarsHeight();var elBottom=elTop+el.offsetHeight;if(elTop<logContainerTop||elBottom>logContainerBottom){logContainer.scrollTop=elTop-(logContainer.offsetHeight-el.offsetHeight)/2;}}", "function Match(logEntryLevel,spanInMainDiv,spanInUnwrappedPre,spanInWrappedDiv){this.logEntryLevel=logEntryLevel;this.spanInMainDiv=spanInMainDiv;if(isIe){this.spanInUnwrappedPre=spanInUnwrappedPre;this.spanInWrappedDiv=spanInWrappedDiv;}", "this.mainSpan=isIe?spanInUnwrappedPre:spanInMainDiv;}", 'Match.prototype={equals:function(match){return this.mainSpan===match.mainSpan;},setCurrent:function(){if(isIe){addClass(this.spanInUnwrappedPre,"currentmatch");addClass(this.spanInWrappedDiv,"currentmatch");var elementToScroll=$("wrap").checked?this.spanInWrappedDiv:this.spanInUnwrappedPre;scrollIntoView(elementToScroll);}else{addClass(this.spanInMainDiv,"currentmatch");scrollIntoView(this.spanInMainDiv);}},belongsTo:function(logEntry){if(isIe){return isDescendant(this.spanInUnwrappedPre,logEntry.unwrappedPre);}else{return isDescendant(this.spanInMainDiv,logEntry.mainDiv);}},setNotCurrent:function(){if(isIe){removeClass(this.spanInUnwrappedPre,"currentmatch");removeClass(this.spanInWrappedDiv,"currentmatch");}else{removeClass(this.spanInMainDiv,"currentmatch");}},isOrphan:function(){return isOrphan(this.mainSpan);},isVisible:function(){return getCheckBox(this.logEntryLevel).checked;},remove:function(){if(isIe){this.spanInUnwrappedPre=null;this.spanInWrappedDiv=null;}else{this.spanInMainDiv=null;}}};var currentSearch=null;var currentMatchIndex=null;function doSearch(){var searchBox=$("searchBox");var searchTerm=searchBox.value;var isRegex=$("searchRegex").checked;var isCaseSensitive=$("searchCaseSensitive").checked;var i;if(searchTerm===""){$("searchReset").disabled=true;$("searchNav").style.display="none";removeClass(document.body,"searching");removeClass(searchBox,"hasmatches");removeClass(searchBox,"nomatches");for(i=0;i<logEntries.length;i++){logEntries[i].clearSearch();logEntries[i].setContent(logEntries[i].formattedMessage,logEntries[i].formattedMessage);}', 'currentSearch=null;setLogContainerHeight();}else{$("searchReset").disabled=false;$("searchNav").style.display="block";var searchRegex;var regexValid;if(isRegex){try{searchRegex=isCaseSensitive?new RegExp(searchTerm,"g"):new RegExp(searchTerm,"gi");regexValid=true;replaceClass(searchBox,"validregex","invalidregex");searchBox.title="Valid regex";}catch(ex){regexValid=false;replaceClass(searchBox,"invalidregex","validregex");searchBox.title="Invalid regex: "+(ex.message?ex.message:(ex.description?ex.description:"unknown error"));return;}}else{searchBox.title="";removeClass(searchBox,"validregex");removeClass(searchBox,"invalidregex");}', 'addClass(document.body,"searching");currentSearch=new Search(searchTerm,isRegex,searchRegex,isCaseSensitive);for(i=0;i<logEntries.length;i++){currentSearch.applyTo(logEntries[i]);}', "setLogContainerHeight();if(currentSearch.hasVisibleMatches()){setCurrentMatchIndex(0);displayMatches();}else{displayNoMatches();}}}", "function updateSearchFromFilters(){if(currentSearch){if(currentSearch.hasMatches()){if(currentMatchIndex===null){currentMatchIndex=0;}", "var currentMatch=currentSearch.matches[currentMatchIndex];if(currentMatch.isVisible()){displayMatches();setCurrentMatchIndex(currentMatchIndex);}else{currentMatch.setNotCurrent();var nextVisibleMatchIndex=currentSearch.getNextVisibleMatchIndex();if(nextVisibleMatchIndex>-1){setCurrentMatchIndex(nextVisibleMatchIndex);displayMatches();}else{displayNoMatches();}}}else{displayNoMatches();}}}", "function refreshCurrentMatch(){if(currentSearch&&currentSearch.hasVisibleMatches()){setCurrentMatchIndex(currentMatchIndex);}}", 'function displayMatches(){replaceClass($("searchBox"),"hasmatches","nomatches");$("searchBox").title=""+currentSearch.matches.length+" matches found";$("searchNav").style.display="block";setLogContainerHeight();}', 'function displayNoMatches(){replaceClass($("searchBox"),"nomatches","hasmatches");$("searchBox").title="No matches found";$("searchNav").style.display="none";setLogContainerHeight();}', 'function toggleSearchEnabled(enable){enable=(typeof enable=="undefined")?!$("searchDisable").checked:enable;$("searchBox").disabled=!enable;$("searchReset").disabled=!enable;$("searchRegex").disabled=!enable;$("searchNext").disabled=!enable;$("searchPrevious").disabled=!enable;$("searchCaseSensitive").disabled=!enable;$("searchNav").style.display=(enable&&($("searchBox").value!=="")&&currentSearch&&currentSearch.hasVisibleMatches())?"block":"none";if(enable){removeClass($("search"),"greyedout");addClass(document.body,"searching");if($("searchHighlight").checked){addClass(logMainContainer,"searchhighlight");}else{removeClass(logMainContainer,"searchhighlight");}', 'if($("searchFilter").checked){addClass(logMainContainer,"searchfilter");}else{removeClass(logMainContainer,"searchfilter");}', '$("searchDisable").checked=!enable;}else{addClass($("search"),"greyedout");removeClass(document.body,"searching");removeClass(logMainContainer,"searchhighlight");removeClass(logMainContainer,"searchfilter");}', "setLogContainerHeight();}", 'function toggleSearchFilter(){var enable=$("searchFilter").checked;if(enable){addClass(logMainContainer,"searchfilter");}else{removeClass(logMainContainer,"searchfilter");}', "refreshCurrentMatch();}", 'function toggleSearchHighlight(){var enable=$("searchHighlight").checked;if(enable){addClass(logMainContainer,"searchhighlight");}else{removeClass(logMainContainer,"searchhighlight");}}', 'function clearSearch(){$("searchBox").value="";doSearch();}', 'function searchNext(){if(currentSearch!==null&&currentMatchIndex!==null){currentSearch.matches[currentMatchIndex].setNotCurrent();var nextMatchIndex=currentSearch.getNextVisibleMatchIndex();if(nextMatchIndex>currentMatchIndex||confirm("Reached the end of the page. Start from the top?")){setCurrentMatchIndex(nextMatchIndex);}}}', 'function searchPrevious(){if(currentSearch!==null&&currentMatchIndex!==null){currentSearch.matches[currentMatchIndex].setNotCurrent();var previousMatchIndex=currentSearch.getPreviousVisibleMatchIndex();if(previousMatchIndex<currentMatchIndex||confirm("Reached the start of the page. Continue from the bottom?")){setCurrentMatchIndex(previousMatchIndex);}}}', "function setCurrentMatchIndex(index){currentMatchIndex=index;currentSearch.matches[currentMatchIndex].setCurrent();}", 'function addClass(el,cssClass){if(!hasClass(el,cssClass)){if(el.className){el.className+=" "+cssClass;}else{el.className=cssClass;}}}', 'function hasClass(el,cssClass){if(el.className){var classNames=el.className.split(" ");return array_contains(classNames,cssClass);}', "return false;}", 'function removeClass(el,cssClass){if(hasClass(el,cssClass)){var existingClasses=el.className.split(" ");var newClasses=[];for(var i=0,len=existingClasses.length;i<len;i++){if(existingClasses[i]!=cssClass){newClasses[newClasses.length]=existingClasses[i];}}', 'el.className=newClasses.join(" ");}}', "function replaceClass(el,newCssClass,oldCssClass){removeClass(el,oldCssClass);addClass(el,newCssClass);}", "function getElementsByClass(el,cssClass,tagName){var elements=el.getElementsByTagName(tagName);var matches=[];for(var i=0,len=elements.length;i<len;i++){if(hasClass(elements[i],cssClass)){matches.push(elements[i]);}}", "return matches;}", "function $(id){return document.getElementById(id);}", "function isDescendant(node,ancestorNode){while(node!=null){if(node===ancestorNode){return true;}", "node=node.parentNode;}", "return false;}", "function isOrphan(node){var currentNode=node;while(currentNode){if(currentNode==document.body){return false;}", "currentNode=currentNode.parentNode;}", "return true;}", 'function escapeHtml(str){return str.replace(/&/g,"&amp;").replace(/[<]/g,"&lt;").replace(/>/g,"&gt;");}', "function getWindowWidth(){if(window.innerWidth){return window.innerWidth;}else if(document.documentElement&&document.documentElement.clientWidth){return document.documentElement.clientWidth;}else if(document.body){return document.body.clientWidth;}", "return 0;}", "function getWindowHeight(){if(window.innerHeight){return window.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientHeight;}else if(document.body){return document.body.clientHeight;}", "return 0;}", 'function getToolBarsHeight(){return $("switches").offsetHeight;}', 'function getChromeHeight(){var height=getToolBarsHeight();if(showCommandLine){height+=$("commandLine").offsetHeight;}', "return height;}", 'function setLogContainerHeight(){if(logMainContainer){var windowHeight=getWindowHeight();$("body").style.height=getWindowHeight()+"px";logMainContainer.style.height=""+', 'Math.max(0,windowHeight-getChromeHeight())+"px";}}', 'function setCommandInputWidth(){if(showCommandLine){$("command").style.width=""+Math.max(0,$("commandLineContainer").offsetWidth-', '($("evaluateButton").offsetWidth+13))+"px";}}', "window.onresize=function(){setCommandInputWidth();setLogContainerHeight();};if(!Array.prototype.push){Array.prototype.push=function(){for(var i=0,len=arguments.length;i<len;i++){this[this.length]=arguments[i];}", "return this.length;};}", "if(!Array.prototype.pop){Array.prototype.pop=function(){if(this.length>0){var val=this[this.length-1];this.length=this.length-1;return val;}};}", "if(!Array.prototype.shift){Array.prototype.shift=function(){if(this.length>0){var firstItem=this[0];for(var i=0,len=this.length-1;i<len;i++){this[i]=this[i+1];}", "this.length=this.length-1;return firstItem;}};}", "if(!Array.prototype.splice){Array.prototype.splice=function(startIndex,deleteCount){var itemsAfterDeleted=this.slice(startIndex+deleteCount);var itemsDeleted=this.slice(startIndex,startIndex+deleteCount);this.length=startIndex;var argumentsArray=[];for(var i=0,len=arguments.length;i<len;i++){argumentsArray[i]=arguments[i];}", "var itemsToAppend=(argumentsArray.length>2)?itemsAfterDeleted=argumentsArray.slice(2).concat(itemsAfterDeleted):itemsAfterDeleted;for(i=0,len=itemsToAppend.length;i<len;i++){this.push(itemsToAppend[i]);}", "return itemsDeleted;};}", "function array_remove(arr,val){var index=-1;for(var i=0,len=arr.length;i<len;i++){if(arr[i]===val){index=i;break;}}", "if(index>=0){arr.splice(index,1);return index;}else{return false;}}", "function array_removeFromStart(array,numberToRemove){if(Array.prototype.splice){array.splice(0,numberToRemove);}else{for(var i=numberToRemove,len=array.length;i<len;i++){array[i-numberToRemove]=array[i];}", "array.length=array.length-numberToRemove;}", "return array;}", "function array_contains(arr,val){for(var i=0,len=arr.length;i<len;i++){if(arr[i]==val){return true;}}", "return false;}", "function getErrorMessage(ex){if(ex.message){return ex.message;}else if(ex.description){return ex.description;}", 'return""+ex;}', "function moveCaretToEnd(input){if(input.setSelectionRange){input.focus();var length=input.value.length;input.setSelectionRange(length,length);}else if(input.createTextRange){var range=input.createTextRange();range.collapse(false);range.select();}", "input.focus();}", 'function stopPropagation(evt){if(evt.stopPropagation){evt.stopPropagation();}else if(typeof evt.cancelBubble!="undefined"){evt.cancelBubble=true;}}', "function getEvent(evt){return evt?evt:event;}", "function getTarget(evt){return evt.target?evt.target:evt.srcElement;}", 'function getRelatedTarget(evt){if(evt.relatedTarget){return evt.relatedTarget;}else if(evt.srcElement){switch(evt.type){case"mouseover":return evt.fromElement;case"mouseout":return evt.toElement;default:return evt.srcElement;}}}', "function cancelKeyEvent(evt){evt.returnValue=false;stopPropagation(evt);}", 'function evalCommandLine(){var expr=$("command").value;evalCommand(expr);$("command").value="";}', "function evalLastCommand(){if(lastCommand!=null){evalCommand(lastCommand);}}", 'var lastCommand=null;var commandHistory=[];var currentCommandIndex=0;function evalCommand(expr){if(appender){appender.evalCommandAndAppend(expr);}else{var prefix=">>> "+expr+"\\r\\n";try{log("INFO",prefix+eval(expr));}catch(ex){log("ERROR",prefix+"Error: "+getErrorMessage(ex));}}', "if(expr!=commandHistory[commandHistory.length-1]){commandHistory.push(expr);if(appender){appender.storeCommandHistory(commandHistory);}}", "currentCommandIndex=(expr==commandHistory[currentCommandIndex])?currentCommandIndex+1:commandHistory.length;lastCommand=expr;}", "//]]>", "<\/script>", '<style type="text/css">', "body{background-color:white;color:black;padding:0;margin:0;font-family:tahoma,verdana,arial,helvetica,sans-serif;overflow:hidden}div#switchesContainer input{margin-bottom:0}div.toolbar{border-top:solid #ffffff 1px;border-bottom:solid #aca899 1px;background-color:#f1efe7;padding:3px 5px;font-size:68.75%}div.toolbar,div#search input{font-family:tahoma,verdana,arial,helvetica,sans-serif}div.toolbar input.button{padding:0 5px;font-size:100%}div.toolbar input.hidden{display:none}div#switches input#clearButton{margin-left:20px}div#levels label{font-weight:bold}div#levels label,div#options label{margin-right:5px}div#levels label#wrapLabel{font-weight:normal}div#search label{margin-right:10px}div#search label.searchboxlabel{margin-right:0}div#search input{font-size:100%}div#search input.validregex{color:green}div#search input.invalidregex{color:red}div#search input.nomatches{color:white;background-color:#ff6666}div#search input.nomatches{color:white;background-color:#ff6666}div#searchNav{display:none}div#commandLine{display:none}div#commandLine input#command{font-size:100%;font-family:Courier New,Courier}div#commandLine input#evaluateButton{}*.greyedout{color:gray !important;border-color:gray !important}*.greyedout *.alwaysenabled{color:black}*.unselectable{-khtml-user-select:none;-moz-user-select:none;user-select:none}div#log{font-family:Courier New,Courier;font-size:75%;width:100%;overflow:auto;clear:both;position:relative}div.group{border-color:#cccccc;border-style:solid;border-width:1px 0 1px 1px;overflow:visible}div.oldIe div.group,div.oldIe div.group *,div.oldIe *.logentry{height:1%}div.group div.groupheading span.expander{border:solid black 1px;font-family:Courier New,Courier;font-size:0.833em;background-color:#eeeeee;position:relative;top:-1px;color:black;padding:0 2px;cursor:pointer;cursor:hand;height:1%}div.group div.groupcontent{margin-left:10px;padding-bottom:2px;overflow:visible}div.group div.expanded{display:block}div.group div.collapsed{display:none}*.logentry{overflow:visible;display:none;white-space:pre}span.pre{white-space:pre}pre.unwrapped{display:inline !important}pre.unwrapped pre.pre,div.wrapped pre.pre{display:inline}div.wrapped pre.pre{white-space:normal}div.wrapped{display:none}body.searching *.logentry span.currentmatch{color:white !important;background-color:green !important}body.searching div.searchhighlight *.logentry span.searchterm{color:black;background-color:yellow}div.wrap *.logentry{white-space:normal !important;border-width:0 0 1px 0;border-color:#dddddd;border-style:dotted}div.wrap #log_wrapped,#log_unwrapped{display:block}div.wrap #log_unwrapped,#log_wrapped{display:none}div.wrap *.logentry span.pre{overflow:visible;white-space:normal}div.wrap *.logentry pre.unwrapped{display:none}div.wrap *.logentry span.wrapped{display:inline}div.searchfilter *.searchnonmatch{display:none !important}div#log *.TRACE,label#label_TRACE{color:#666666}div#log *.DEBUG,label#label_DEBUG{color:green}div#log *.INFO,label#label_INFO{color:#000099}div#log *.WARN,label#label_WARN{color:#999900}div#log *.ERROR,label#label_ERROR{color:red}div#log *.FATAL,label#label_FATAL{color:#660066}div.TRACE#log *.TRACE,div.DEBUG#log *.DEBUG,div.INFO#log *.INFO,div.WARN#log *.WARN,div.ERROR#log *.ERROR,div.FATAL#log *.FATAL{display:block}div#log div.separator{background-color:#cccccc;margin:5px 0;line-height:1px}", "</style>", "</head>", '<body id="body">', '<div id="switchesContainer">', '<div id="switches">', '<div id="levels" class="toolbar">', "Filters:", '<input type="checkbox" id="switch_TRACE" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide trace messages" /><label for="switch_TRACE" id="label_TRACE">trace</label>', '<input type="checkbox" id="switch_DEBUG" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide debug messages" /><label for="switch_DEBUG" id="label_DEBUG">debug</label>', '<input type="checkbox" id="switch_INFO" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide info messages" /><label for="switch_INFO" id="label_INFO">info</label>', '<input type="checkbox" id="switch_WARN" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide warn messages" /><label for="switch_WARN" id="label_WARN">warn</label>', '<input type="checkbox" id="switch_ERROR" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide error messages" /><label for="switch_ERROR" id="label_ERROR">error</label>', '<input type="checkbox" id="switch_FATAL" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide fatal messages" /><label for="switch_FATAL" id="label_FATAL">fatal</label>', '<input type="checkbox" id="switch_ALL" onclick="toggleAllLevels(); applyFilters()" checked="checked" title="Show/hide all messages" /><label for="switch_ALL" id="label_ALL">all</label>', "</div>", '<div id="search" class="toolbar">', '<label for="searchBox" class="searchboxlabel">Search:</label> <input type="text" id="searchBox" onclick="toggleSearchEnabled(true)" onkeyup="scheduleSearch()" size="20" />', '<input type="button" id="searchReset" disabled="disabled" value="Reset" onclick="clearSearch()" class="button" title="Reset the search" />', '<input type="checkbox" id="searchRegex" onclick="doSearch()" title="If checked, search is treated as a regular expression" /><label for="searchRegex">Regex</label>', '<input type="checkbox" id="searchCaseSensitive" onclick="doSearch()" title="If checked, search is case sensitive" /><label for="searchCaseSensitive">Match case</label>', '<input type="checkbox" id="searchDisable" onclick="toggleSearchEnabled()" title="Enable/disable search" /><label for="searchDisable" class="alwaysenabled">Disable</label>', '<div id="searchNav">', '<input type="button" id="searchNext" disabled="disabled" value="Next" onclick="searchNext()" class="button" title="Go to the next matching log entry" />', '<input type="button" id="searchPrevious" disabled="disabled" value="Previous" onclick="searchPrevious()" class="button" title="Go to the previous matching log entry" />', '<input type="checkbox" id="searchFilter" onclick="toggleSearchFilter()" title="If checked, non-matching log entries are filtered out" /><label for="searchFilter">Filter</label>', '<input type="checkbox" id="searchHighlight" onclick="toggleSearchHighlight()" title="Highlight matched search terms" /><label for="searchHighlight" class="alwaysenabled">Highlight all</label>', "</div>", "</div>", '<div id="options" class="toolbar">', "Options:", '<input type="checkbox" id="enableLogging" onclick="toggleLoggingEnabled()" checked="checked" title="Enable/disable logging" /><label for="enableLogging" id="enableLoggingLabel">Log</label>', '<input type="checkbox" id="wrap" onclick="toggleWrap()" title="Enable / disable word wrap" /><label for="wrap" id="wrapLabel">Wrap</label>', '<input type="checkbox" id="newestAtTop" onclick="toggleNewestAtTop()" title="If checked, causes newest messages to appear at the top" /><label for="newestAtTop" id="newestAtTopLabel">Newest at the top</label>', '<input type="checkbox" id="scrollToLatest" onclick="toggleScrollToLatest()" checked="checked" title="If checked, window automatically scrolls to a new message when it is added" /><label for="scrollToLatest" id="scrollToLatestLabel">Scroll to latest</label>', '<input type="button" id="clearButton" value="Clear" onclick="clearLog()" class="button" title="Clear all log messages"  />', '<input type="button" id="hideButton" value="Hide" onclick="hide()" class="hidden button" title="Hide the console" />', '<input type="button" id="closeButton" value="Close" onclick="closeWindow()" class="hidden button" title="Close the window" />', "</div>", "</div>", "</div>", '<div id="log" class="TRACE DEBUG INFO WARN ERROR FATAL"></div>', '<div id="commandLine" class="toolbar">', '<div id="commandLineContainer">', `<input type="text" id="command" title="Enter a JavaScript command here and hit return or press 'Evaluate'" />`, '<input type="button" id="evaluateButton" value="Evaluate" class="button" title="Evaluate the command" onclick="evalCommandLine()" />', "</div>", "</div>", "</body>", "</html>", ""];
        };
        var defaultCommandLineFunctions = [];
        ConsoleAppender = function() {
        };
        var consoleAppenderIdCounter = 1;
        ConsoleAppender.prototype = new Appender();
        ConsoleAppender.prototype.create = function(inPage, container, lazyInit, initiallyMinimized, useDocumentWrite, width, height, focusConsoleWindow) {
          var appender = this;
          var initialized = false;
          var consoleWindowCreated = false;
          var consoleWindowLoaded = false;
          var consoleClosed = false;
          var queuedLoggingEvents = [];
          var isSupported = true;
          var consoleAppenderId = consoleAppenderIdCounter++;
          initiallyMinimized = extractBooleanFromParam(initiallyMinimized, this.defaults.initiallyMinimized);
          lazyInit = extractBooleanFromParam(lazyInit, this.defaults.lazyInit);
          useDocumentWrite = extractBooleanFromParam(useDocumentWrite, this.defaults.useDocumentWrite);
          var newestMessageAtTop = this.defaults.newestMessageAtTop;
          var scrollToLatestMessage = this.defaults.scrollToLatestMessage;
          width = width ? width : this.defaults.width;
          height = height ? height : this.defaults.height;
          var maxMessages = this.defaults.maxMessages;
          var showCommandLine = this.defaults.showCommandLine;
          var commandLineObjectExpansionDepth = this.defaults.commandLineObjectExpansionDepth;
          var showHideButton = this.defaults.showHideButton;
          var showCloseButton = this.defaults.showCloseButton;
          this.setLayout(this.defaults.layout);
          var init, createWindow, safeToAppend, getConsoleWindow, open;
          var appenderName = inPage ? "InPageAppender" : "PopUpAppender";
          var checkCanConfigure = function(configOptionName) {
            if (consoleWindowCreated) {
              handleError(appenderName + ": configuration option '" + configOptionName + "' may not be set after the appender has been initialized");
              return false;
            }
            return true;
          };
          var consoleWindowExists = function() {
            return consoleWindowLoaded && isSupported && !consoleClosed;
          };
          this.isNewestMessageAtTop = function() {
            return newestMessageAtTop;
          };
          this.setNewestMessageAtTop = function(newestMessageAtTopParam) {
            newestMessageAtTop = bool(newestMessageAtTopParam);
            if (consoleWindowExists()) {
              getConsoleWindow().setNewestAtTop(newestMessageAtTop);
            }
          };
          this.isScrollToLatestMessage = function() {
            return scrollToLatestMessage;
          };
          this.setScrollToLatestMessage = function(scrollToLatestMessageParam) {
            scrollToLatestMessage = bool(scrollToLatestMessageParam);
            if (consoleWindowExists()) {
              getConsoleWindow().setScrollToLatest(scrollToLatestMessage);
            }
          };
          this.getWidth = function() {
            return width;
          };
          this.setWidth = function(widthParam) {
            if (checkCanConfigure("width")) {
              width = extractStringFromParam(widthParam, width);
            }
          };
          this.getHeight = function() {
            return height;
          };
          this.setHeight = function(heightParam) {
            if (checkCanConfigure("height")) {
              height = extractStringFromParam(heightParam, height);
            }
          };
          this.getMaxMessages = function() {
            return maxMessages;
          };
          this.setMaxMessages = function(maxMessagesParam) {
            maxMessages = extractIntFromParam(maxMessagesParam, maxMessages);
            if (consoleWindowExists()) {
              getConsoleWindow().setMaxMessages(maxMessages);
            }
          };
          this.isShowCommandLine = function() {
            return showCommandLine;
          };
          this.setShowCommandLine = function(showCommandLineParam) {
            showCommandLine = bool(showCommandLineParam);
            if (consoleWindowExists()) {
              getConsoleWindow().setShowCommandLine(showCommandLine);
            }
          };
          this.isShowHideButton = function() {
            return showHideButton;
          };
          this.setShowHideButton = function(showHideButtonParam) {
            showHideButton = bool(showHideButtonParam);
            if (consoleWindowExists()) {
              getConsoleWindow().setShowHideButton(showHideButton);
            }
          };
          this.isShowCloseButton = function() {
            return showCloseButton;
          };
          this.setShowCloseButton = function(showCloseButtonParam) {
            showCloseButton = bool(showCloseButtonParam);
            if (consoleWindowExists()) {
              getConsoleWindow().setShowCloseButton(showCloseButton);
            }
          };
          this.getCommandLineObjectExpansionDepth = function() {
            return commandLineObjectExpansionDepth;
          };
          this.setCommandLineObjectExpansionDepth = function(commandLineObjectExpansionDepthParam) {
            commandLineObjectExpansionDepth = extractIntFromParam(commandLineObjectExpansionDepthParam, commandLineObjectExpansionDepth);
          };
          var minimized = initiallyMinimized;
          this.isInitiallyMinimized = function() {
            return initiallyMinimized;
          };
          this.setInitiallyMinimized = function(initiallyMinimizedParam) {
            if (checkCanConfigure("initiallyMinimized")) {
              initiallyMinimized = bool(initiallyMinimizedParam);
              minimized = initiallyMinimized;
            }
          };
          this.isUseDocumentWrite = function() {
            return useDocumentWrite;
          };
          this.setUseDocumentWrite = function(useDocumentWriteParam) {
            if (checkCanConfigure("useDocumentWrite")) {
              useDocumentWrite = bool(useDocumentWriteParam);
            }
          };
          function QueuedLoggingEvent(loggingEvent, formattedMessage) {
            this.loggingEvent = loggingEvent;
            this.levelName = loggingEvent.level.name;
            this.formattedMessage = formattedMessage;
          }
          QueuedLoggingEvent.prototype.append = function() {
            getConsoleWindow().log(this.levelName, this.formattedMessage);
          };
          function QueuedGroup(name, initiallyExpanded) {
            this.name = name;
            this.initiallyExpanded = initiallyExpanded;
          }
          QueuedGroup.prototype.append = function() {
            getConsoleWindow().group(this.name, this.initiallyExpanded);
          };
          function QueuedGroupEnd() {
          }
          QueuedGroupEnd.prototype.append = function() {
            getConsoleWindow().groupEnd();
          };
          var checkAndAppend = function() {
            safeToAppend();
            if (!initialized) {
              init();
            } else if (consoleClosed && reopenWhenClosed) {
              createWindow();
            }
            if (safeToAppend()) {
              appendQueuedLoggingEvents();
            }
          };
          this.append = function(loggingEvent) {
            if (isSupported) {
              var formattedMessage = appender.getLayout().formatWithException(loggingEvent);
              queuedLoggingEvents.push(new QueuedLoggingEvent(loggingEvent, formattedMessage));
              checkAndAppend();
            }
          };
          this.group = function(name, initiallyExpanded) {
            if (isSupported) {
              queuedLoggingEvents.push(new QueuedGroup(name, initiallyExpanded));
              checkAndAppend();
            }
          };
          this.groupEnd = function() {
            if (isSupported) {
              queuedLoggingEvents.push(new QueuedGroupEnd());
              checkAndAppend();
            }
          };
          var appendQueuedLoggingEvents = function() {
            while (queuedLoggingEvents.length > 0) {
              queuedLoggingEvents.shift().append();
            }
            if (focusConsoleWindow) {
              getConsoleWindow().focus();
            }
          };
          this.setAddedToLogger = function(logger) {
            this.loggers.push(logger);
            if (enabled && !lazyInit) {
              init();
            }
          };
          this.clear = function() {
            if (consoleWindowExists()) {
              getConsoleWindow().clearLog();
            }
            queuedLoggingEvents.length = 0;
          };
          this.focus = function() {
            if (consoleWindowExists()) {
              getConsoleWindow().focus();
            }
          };
          this.focusCommandLine = function() {
            if (consoleWindowExists()) {
              getConsoleWindow().focusCommandLine();
            }
          };
          this.focusSearch = function() {
            if (consoleWindowExists()) {
              getConsoleWindow().focusSearch();
            }
          };
          var commandWindow = window;
          this.getCommandWindow = function() {
            return commandWindow;
          };
          this.setCommandWindow = function(commandWindowParam) {
            commandWindow = commandWindowParam;
          };
          this.executeLastCommand = function() {
            if (consoleWindowExists()) {
              getConsoleWindow().evalLastCommand();
            }
          };
          var commandLayout = new PatternLayout("%m");
          this.getCommandLayout = function() {
            return commandLayout;
          };
          this.setCommandLayout = function(commandLayoutParam) {
            commandLayout = commandLayoutParam;
          };
          this.evalCommandAndAppend = function(expr2) {
            var commandReturnValue = { appendResult: true, isError: false };
            var commandOutput = "";
            try {
              var result, i2;
              if (!commandWindow.eval && commandWindow.execScript) {
                commandWindow.execScript("null");
              }
              var commandLineFunctionsHash = {};
              for (i2 = 0, len = commandLineFunctions.length; i2 < len; i2++) {
                commandLineFunctionsHash[commandLineFunctions[i2][0]] = commandLineFunctions[i2][1];
              }
              var objectsToRestore = [];
              var addObjectToRestore = function(name) {
                objectsToRestore.push([name, commandWindow[name]]);
              };
              addObjectToRestore("appender");
              commandWindow.appender = appender;
              addObjectToRestore("commandReturnValue");
              commandWindow.commandReturnValue = commandReturnValue;
              addObjectToRestore("commandLineFunctionsHash");
              commandWindow.commandLineFunctionsHash = commandLineFunctionsHash;
              var addFunctionToWindow = function(name) {
                addObjectToRestore(name);
                commandWindow[name] = function() {
                  return this.commandLineFunctionsHash[name](appender, arguments, commandReturnValue);
                };
              };
              for (i2 = 0, len = commandLineFunctions.length; i2 < len; i2++) {
                addFunctionToWindow(commandLineFunctions[i2][0]);
              }
              if (commandWindow === window && commandWindow.execScript) {
                addObjectToRestore("evalExpr");
                addObjectToRestore("result");
                window.evalExpr = expr2;
                commandWindow.execScript("window.result=eval(window.evalExpr);");
                result = window.result;
              } else {
                result = commandWindow.eval(expr2);
              }
              commandOutput = isUndefined(result) ? result : formatObjectExpansion(result, commandLineObjectExpansionDepth);
              for (i2 = 0, len = objectsToRestore.length; i2 < len; i2++) {
                commandWindow[objectsToRestore[i2][0]] = objectsToRestore[i2][1];
              }
            } catch (ex) {
              commandOutput = "Error evaluating command: " + getExceptionStringRep(ex);
              commandReturnValue.isError = true;
            }
            if (commandReturnValue.appendResult) {
              var message = ">>> " + expr2;
              if (!isUndefined(commandOutput)) {
                message += newLine + commandOutput;
              }
              var level = commandReturnValue.isError ? Level.ERROR : Level.INFO;
              var loggingEvent = new LoggingEvent(null, /* @__PURE__ */ new Date(), level, [message], null);
              var mainLayout = this.getLayout();
              this.setLayout(commandLayout);
              this.append(loggingEvent);
              this.setLayout(mainLayout);
            }
          };
          var commandLineFunctions = defaultCommandLineFunctions.concat([]);
          this.addCommandLineFunction = function(functionName, commandLineFunction) {
            commandLineFunctions.push([functionName, commandLineFunction]);
          };
          var commandHistoryCookieName = "log4javascriptCommandHistory";
          this.storeCommandHistory = function(commandHistory) {
            setCookie(commandHistoryCookieName, commandHistory.join(","));
          };
          var writeHtml = function(doc) {
            var lines = getConsoleHtmlLines();
            doc.open();
            for (var i2 = 0, len2 = lines.length; i2 < len2; i2++) {
              doc.writeln(lines[i2]);
            }
            doc.close();
          };
          this.setEventTypes(["load", "unload"]);
          var consoleWindowLoadHandler = function() {
            var win = getConsoleWindow();
            win.setAppender(appender);
            win.setNewestAtTop(newestMessageAtTop);
            win.setScrollToLatest(scrollToLatestMessage);
            win.setMaxMessages(maxMessages);
            win.setShowCommandLine(showCommandLine);
            win.setShowHideButton(showHideButton);
            win.setShowCloseButton(showCloseButton);
            win.setMainWindow(window);
            var storedValue = getCookie(commandHistoryCookieName);
            if (storedValue) {
              win.commandHistory = storedValue.split(",");
              win.currentCommandIndex = win.commandHistory.length;
            }
            appender.dispatchEvent("load", { "win": win });
          };
          this.unload = function() {
            logLog.debug("unload " + this + ", caller: " + this.unload.caller);
            if (!consoleClosed) {
              logLog.debug("really doing unload " + this);
              consoleClosed = true;
              consoleWindowLoaded = false;
              consoleWindowCreated = false;
              appender.dispatchEvent("unload", {});
            }
          };
          var pollConsoleWindow = function(windowTest, interval, successCallback, errorMessage) {
            function doPoll() {
              try {
                if (consoleClosed) {
                  clearInterval(poll);
                }
                if (windowTest(getConsoleWindow())) {
                  clearInterval(poll);
                  successCallback();
                }
              } catch (ex) {
                clearInterval(poll);
                isSupported = false;
                handleError(errorMessage, ex);
              }
            }
            var poll = setInterval(doPoll, interval);
          };
          var getConsoleUrl = function() {
            var documentDomainSet = document.domain != location.hostname;
            return useDocumentWrite ? "" : getBaseUrl() + "console.html" + (documentDomainSet ? "?log4javascript_domain=" + escape(document.domain) : "");
          };
          if (inPage) {
            var containerElement = null;
            var cssProperties = [];
            this.addCssProperty = function(name, value) {
              if (checkCanConfigure("cssProperties")) {
                cssProperties.push([name, value]);
              }
            };
            var windowCreationStarted = false;
            var iframeContainerDiv;
            var iframeId = uniqueId + "_InPageAppender_" + consoleAppenderId;
            this.hide = function() {
              if (initialized && consoleWindowCreated) {
                if (consoleWindowExists()) {
                  getConsoleWindow().$("command").blur();
                }
                iframeContainerDiv.style.display = "none";
                minimized = true;
              }
            };
            this.show = function() {
              if (initialized) {
                if (consoleWindowCreated) {
                  iframeContainerDiv.style.display = "block";
                  this.setShowCommandLine(showCommandLine);
                  minimized = false;
                } else if (!windowCreationStarted) {
                  createWindow(true);
                }
              }
            };
            this.isVisible = function() {
              return !minimized && !consoleClosed;
            };
            this.close = function(fromButton) {
              if (!consoleClosed && (!fromButton || confirm("This will permanently remove the console from the page. No more messages will be logged. Do you wish to continue?"))) {
                iframeContainerDiv.parentNode.removeChild(iframeContainerDiv);
                this.unload();
              }
            };
            open = function() {
              var initErrorMessage = "InPageAppender.open: unable to create console iframe";
              function finalInit() {
                try {
                  if (!initiallyMinimized) {
                    appender.show();
                  }
                  consoleWindowLoadHandler();
                  consoleWindowLoaded = true;
                  appendQueuedLoggingEvents();
                } catch (ex) {
                  isSupported = false;
                  handleError(initErrorMessage, ex);
                }
              }
              function writeToDocument() {
                try {
                  var windowTest = function(win) {
                    return isLoaded(win);
                  };
                  if (useDocumentWrite) {
                    writeHtml(getConsoleWindow().document);
                  }
                  if (windowTest(getConsoleWindow())) {
                    finalInit();
                  } else {
                    pollConsoleWindow(windowTest, 100, finalInit, initErrorMessage);
                  }
                } catch (ex) {
                  isSupported = false;
                  handleError(initErrorMessage, ex);
                }
              }
              minimized = false;
              iframeContainerDiv = containerElement.appendChild(document.createElement("div"));
              iframeContainerDiv.style.width = width;
              iframeContainerDiv.style.height = height;
              iframeContainerDiv.style.border = "solid gray 1px";
              for (var i2 = 0, len2 = cssProperties.length; i2 < len2; i2++) {
                iframeContainerDiv.style[cssProperties[i2][0]] = cssProperties[i2][1];
              }
              var iframeSrc = useDocumentWrite ? "" : " src='" + getConsoleUrl() + "'";
              iframeContainerDiv.innerHTML = "<iframe id='" + iframeId + "' name='" + iframeId + "' width='100%' height='100%' frameborder='0'" + iframeSrc + " scrolling='no'></iframe>";
              consoleClosed = false;
              var iframeDocumentExistsTest = function(win) {
                try {
                  return bool(win) && bool(win.document);
                } catch (ex) {
                  return false;
                }
              };
              if (iframeDocumentExistsTest(getConsoleWindow())) {
                writeToDocument();
              } else {
                pollConsoleWindow(iframeDocumentExistsTest, 100, writeToDocument, initErrorMessage);
              }
              consoleWindowCreated = true;
            };
            createWindow = function(show) {
              if (show || !initiallyMinimized) {
                var pageLoadHandler = function() {
                  if (!container) {
                    containerElement = document.createElement("div");
                    containerElement.style.position = "fixed";
                    containerElement.style.left = "0";
                    containerElement.style.right = "0";
                    containerElement.style.bottom = "0";
                    document.body.appendChild(containerElement);
                    appender.addCssProperty("borderWidth", "1px 0 0 0");
                    appender.addCssProperty("zIndex", 1e6);
                    open();
                  } else {
                    try {
                      var el = document.getElementById(container);
                      if (el.nodeType == 1) {
                        containerElement = el;
                      }
                      open();
                    } catch (ex) {
                      handleError("InPageAppender.init: invalid container element '" + container + "' supplied", ex);
                    }
                  }
                };
                if (pageLoaded && container && container.appendChild) {
                  containerElement = container;
                  open();
                } else if (pageLoaded) {
                  pageLoadHandler();
                } else {
                  log4javascript.addEventListener("load", pageLoadHandler);
                }
                windowCreationStarted = true;
              }
            };
            init = function() {
              createWindow();
              initialized = true;
            };
            getConsoleWindow = function() {
              var iframe = window.frames[iframeId];
              if (iframe) {
                return iframe;
              }
            };
            safeToAppend = function() {
              if (isSupported && !consoleClosed) {
                if (consoleWindowCreated && !consoleWindowLoaded && getConsoleWindow() && isLoaded(getConsoleWindow())) {
                  consoleWindowLoaded = true;
                }
                return consoleWindowLoaded;
              }
              return false;
            };
          } else {
            var useOldPopUp = appender.defaults.useOldPopUp;
            var complainAboutPopUpBlocking = appender.defaults.complainAboutPopUpBlocking;
            var reopenWhenClosed = this.defaults.reopenWhenClosed;
            this.isUseOldPopUp = function() {
              return useOldPopUp;
            };
            this.setUseOldPopUp = function(useOldPopUpParam) {
              if (checkCanConfigure("useOldPopUp")) {
                useOldPopUp = bool(useOldPopUpParam);
              }
            };
            this.isComplainAboutPopUpBlocking = function() {
              return complainAboutPopUpBlocking;
            };
            this.setComplainAboutPopUpBlocking = function(complainAboutPopUpBlockingParam) {
              if (checkCanConfigure("complainAboutPopUpBlocking")) {
                complainAboutPopUpBlocking = bool(complainAboutPopUpBlockingParam);
              }
            };
            this.isFocusPopUp = function() {
              return focusConsoleWindow;
            };
            this.setFocusPopUp = function(focusPopUpParam) {
              focusConsoleWindow = bool(focusPopUpParam);
            };
            this.isReopenWhenClosed = function() {
              return reopenWhenClosed;
            };
            this.setReopenWhenClosed = function(reopenWhenClosedParam) {
              reopenWhenClosed = bool(reopenWhenClosedParam);
            };
            this.close = function() {
              logLog.debug("close " + this);
              try {
                popUp.close();
                this.unload();
              } catch (ex) {
              }
            };
            this.hide = function() {
              logLog.debug("hide " + this);
              if (consoleWindowExists()) {
                this.close();
              }
            };
            this.show = function() {
              logLog.debug("show " + this);
              if (!consoleWindowCreated) {
                open();
              }
            };
            this.isVisible = function() {
              return safeToAppend();
            };
            var popUp;
            open = function() {
              var windowProperties = "width=" + width + ",height=" + height + ",status,resizable";
              var frameInfo = "";
              try {
                var frameEl = window.frameElement;
                if (frameEl) {
                  frameInfo = "_" + frameEl.tagName + "_" + (frameEl.name || frameEl.id || "");
                }
              } catch (e) {
                frameInfo = "_inaccessibleParentFrame";
              }
              var windowName = "PopUp_" + location.host.replace(/[^a-z0-9]/gi, "_") + "_" + consoleAppenderId + frameInfo;
              if (!useOldPopUp || !useDocumentWrite) {
                windowName = windowName + "_" + uniqueId;
              }
              var checkPopUpClosed = function(win) {
                if (consoleClosed) {
                  return true;
                } else {
                  try {
                    return bool(win) && win.closed;
                  } catch (ex) {
                  }
                }
                return false;
              };
              var popUpClosedCallback = function() {
                if (!consoleClosed) {
                  appender.unload();
                }
              };
              function finalInit() {
                getConsoleWindow().setCloseIfOpenerCloses(!useOldPopUp || !useDocumentWrite);
                consoleWindowLoadHandler();
                consoleWindowLoaded = true;
                appendQueuedLoggingEvents();
                pollConsoleWindow(checkPopUpClosed, 500, popUpClosedCallback, "PopUpAppender.checkPopUpClosed: error checking pop-up window");
              }
              try {
                popUp = window.open(getConsoleUrl(), windowName, windowProperties);
                consoleClosed = false;
                consoleWindowCreated = true;
                if (popUp && popUp.document) {
                  if (useDocumentWrite && useOldPopUp && isLoaded(popUp)) {
                    popUp.mainPageReloaded();
                    finalInit();
                  } else {
                    if (useDocumentWrite) {
                      writeHtml(popUp.document);
                    }
                    var popUpLoadedTest = function(win) {
                      return bool(win) && isLoaded(win);
                    };
                    if (isLoaded(popUp)) {
                      finalInit();
                    } else {
                      pollConsoleWindow(popUpLoadedTest, 100, finalInit, "PopUpAppender.init: unable to create console window");
                    }
                  }
                } else {
                  isSupported = false;
                  logLog.warn("PopUpAppender.init: pop-ups blocked, please unblock to use PopUpAppender");
                  if (complainAboutPopUpBlocking) {
                    handleError("log4javascript: pop-up windows appear to be blocked. Please unblock them to use pop-up logging.");
                  }
                }
              } catch (ex) {
                handleError("PopUpAppender.init: error creating pop-up", ex);
              }
            };
            createWindow = function() {
              if (!initiallyMinimized) {
                open();
              }
            };
            init = function() {
              createWindow();
              initialized = true;
            };
            getConsoleWindow = function() {
              return popUp;
            };
            safeToAppend = function() {
              if (isSupported && !isUndefined(popUp) && !consoleClosed) {
                if (popUp.closed || consoleWindowLoaded && isUndefined(popUp.closed)) {
                  appender.unload();
                  logLog.debug("PopUpAppender: pop-up closed");
                  return false;
                }
                if (!consoleWindowLoaded && isLoaded(popUp)) {
                  consoleWindowLoaded = true;
                }
              }
              return isSupported && consoleWindowLoaded && !consoleClosed;
            };
          }
          this.getConsoleWindow = getConsoleWindow;
        };
        ConsoleAppender.addGlobalCommandLineFunction = function(functionName, commandLineFunction) {
          defaultCommandLineFunctions.push([functionName, commandLineFunction]);
        };
        function PopUpAppender(lazyInit, initiallyMinimized, useDocumentWrite, width, height) {
          this.create(false, null, lazyInit, initiallyMinimized, useDocumentWrite, width, height, this.defaults.focusPopUp);
        }
        PopUpAppender.prototype = new ConsoleAppender();
        PopUpAppender.prototype.defaults = { layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"), initiallyMinimized: false, focusPopUp: false, lazyInit: true, useOldPopUp: true, complainAboutPopUpBlocking: true, newestMessageAtTop: false, scrollToLatestMessage: true, width: "600", height: "400", reopenWhenClosed: false, maxMessages: null, showCommandLine: true, commandLineObjectExpansionDepth: 1, showHideButton: false, showCloseButton: true, useDocumentWrite: true };
        PopUpAppender.prototype.toString = function() {
          return "PopUpAppender";
        };
        log4javascript.PopUpAppender = PopUpAppender;
        function InPageAppender(container, lazyInit, initiallyMinimized, useDocumentWrite, width, height) {
          this.create(true, container, lazyInit, initiallyMinimized, useDocumentWrite, width, height, false);
        }
        InPageAppender.prototype = new ConsoleAppender();
        InPageAppender.prototype.defaults = { layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"), initiallyMinimized: false, lazyInit: true, newestMessageAtTop: false, scrollToLatestMessage: true, width: "100%", height: "220px", maxMessages: null, showCommandLine: true, commandLineObjectExpansionDepth: 1, showHideButton: false, showCloseButton: false, showLogEntryDeleteButtons: true, useDocumentWrite: true };
        InPageAppender.prototype.toString = function() {
          return "InPageAppender";
        };
        log4javascript.InPageAppender = InPageAppender;
        log4javascript.InlineAppender = InPageAppender;
      })();
      function padWithSpaces(str, len2) {
        if (str.length < len2) {
          var spaces = [];
          var numberOfSpaces = Math.max(0, len2 - str.length);
          for (var i2 = 0; i2 < numberOfSpaces; i2++) {
            spaces[i2] = " ";
          }
          str += spaces.join("");
        }
        return str;
      }
      (function() {
        function dir(obj2) {
          var maxLen = 0;
          for (var p in obj2) {
            maxLen = Math.max(toStr(p).length, maxLen);
          }
          var propList = [];
          for (p in obj2) {
            var propNameStr = "  " + padWithSpaces(toStr(p), maxLen + 2);
            var propVal;
            try {
              propVal = splitIntoLines(toStr(obj2[p])).join(padWithSpaces(newLine, maxLen + 6));
            } catch (ex) {
              propVal = "[Error obtaining property. Details: " + getExceptionMessage(ex) + "]";
            }
            propList.push(propNameStr + propVal);
          }
          return propList.join(newLine);
        }
        var nodeTypes = { ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, ENTITY_REFERENCE_NODE: 5, ENTITY_NODE: 6, PROCESSING_INSTRUCTION_NODE: 7, COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_TYPE_NODE: 10, DOCUMENT_FRAGMENT_NODE: 11, NOTATION_NODE: 12 };
        var preFormattedElements = ["script", "pre"];
        var emptyElements = ["br", "img", "hr", "param", "link", "area", "input", "col", "base", "meta"];
        var indentationUnit = "  ";
        function getXhtml(rootNode, includeRootNode, indentation, startNewLine, preformatted) {
          includeRootNode = typeof includeRootNode == "undefined" ? true : !!includeRootNode;
          if (typeof indentation != "string") {
            indentation = "";
          }
          startNewLine = !!startNewLine;
          preformatted = !!preformatted;
          var xhtml;
          function isWhitespace(node) {
            return node.nodeType == nodeTypes.TEXT_NODE && /^[ \t\r\n]*$/.test(node.nodeValue);
          }
          function fixAttributeValue(attrValue) {
            return attrValue.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
          }
          function getStyleAttributeValue(el) {
            var stylePairs = el.style.cssText.split(";");
            var styleValue2 = "";
            for (var j = 0, len3 = stylePairs.length; j < len3; j++) {
              var nameValueBits = stylePairs[j].split(":");
              var props = [];
              if (!/^\s*$/.test(nameValueBits[0])) {
                props.push(trim(nameValueBits[0]).toLowerCase() + ":" + trim(nameValueBits[1]));
              }
              styleValue2 = props.join(";");
            }
            return styleValue2;
          }
          function getNamespace(el) {
            if (el.prefix) {
              return el.prefix;
            } else if (el.outerHTML) {
              var regex = new RegExp("<([^:]+):" + el.tagName + "[^>]*>", "i");
              if (regex.test(el.outerHTML)) {
                return RegExp.$1.toLowerCase();
              }
            }
            return "";
          }
          var lt = "<";
          var gt = ">";
          var i2, len2;
          if (includeRootNode && rootNode.nodeType != nodeTypes.DOCUMENT_FRAGMENT_NODE) {
            switch (rootNode.nodeType) {
              case nodeTypes.ELEMENT_NODE:
                var tagName = rootNode.tagName.toLowerCase();
                xhtml = startNewLine ? newLine + indentation : "";
                xhtml += lt;
                var prefix = getNamespace(rootNode);
                var hasPrefix = !!prefix;
                if (hasPrefix) {
                  xhtml += prefix + ":";
                }
                xhtml += tagName;
                for (i2 = 0, len2 = rootNode.attributes.length; i2 < len2; i2++) {
                  var currentAttr = rootNode.attributes[i2];
                  if (!currentAttr.specified || currentAttr.nodeValue === null || currentAttr.nodeName.toLowerCase() === "style" || typeof currentAttr.nodeValue !== "string" || currentAttr.nodeName.indexOf("_moz") === 0) {
                    continue;
                  }
                  xhtml += " " + currentAttr.nodeName.toLowerCase() + '="';
                  xhtml += fixAttributeValue(currentAttr.nodeValue);
                  xhtml += '"';
                }
                if (rootNode.style.cssText) {
                  var styleValue = getStyleAttributeValue(rootNode);
                  if (styleValue !== "") {
                    xhtml += ' style="' + getStyleAttributeValue(rootNode) + '"';
                  }
                }
                if (array_contains(emptyElements, tagName) || hasPrefix && !rootNode.hasChildNodes()) {
                  xhtml += "/" + gt;
                } else {
                  xhtml += gt;
                  var childStartNewLine = !(rootNode.childNodes.length === 1 && rootNode.childNodes[0].nodeType === nodeTypes.TEXT_NODE);
                  var childPreformatted = array_contains(preFormattedElements, tagName);
                  for (i2 = 0, len2 = rootNode.childNodes.length; i2 < len2; i2++) {
                    xhtml += getXhtml(rootNode.childNodes[i2], true, indentation + indentationUnit, childStartNewLine, childPreformatted);
                  }
                  var endTag = lt + "/" + tagName + gt;
                  xhtml += childStartNewLine ? newLine + indentation + endTag : endTag;
                }
                return xhtml;
              case nodeTypes.TEXT_NODE:
                if (isWhitespace(rootNode)) {
                  xhtml = "";
                } else {
                  if (preformatted) {
                    xhtml = rootNode.nodeValue;
                  } else {
                    var lines = splitIntoLines(trim(rootNode.nodeValue));
                    var trimmedLines = [];
                    for (i2 = 0, len2 = lines.length; i2 < len2; i2++) {
                      trimmedLines[i2] = trim(lines[i2]);
                    }
                    xhtml = trimmedLines.join(newLine + indentation);
                  }
                  if (startNewLine) {
                    xhtml = newLine + indentation + xhtml;
                  }
                }
                return xhtml;
              case nodeTypes.CDATA_SECTION_NODE:
                return "<![CDATA[" + rootNode.nodeValue + "]]>" + newLine;
              case nodeTypes.DOCUMENT_NODE:
                xhtml = "";
                for (i2 = 0, len2 = rootNode.childNodes.length; i2 < len2; i2++) {
                  xhtml += getXhtml(rootNode.childNodes[i2], true, indentation);
                }
                return xhtml;
              default:
                return "";
            }
          } else {
            xhtml = "";
            for (i2 = 0, len2 = rootNode.childNodes.length; i2 < len2; i2++) {
              xhtml += getXhtml(rootNode.childNodes[i2], true, indentation + indentationUnit);
            }
            return xhtml;
          }
        }
        function createCommandLineFunctions() {
          ConsoleAppender.addGlobalCommandLineFunction("$", function(appender, args2, returnValue2) {
            return document.getElementById(args2[0]);
          });
          ConsoleAppender.addGlobalCommandLineFunction("dir", function(appender, args2, returnValue2) {
            var lines = [];
            for (var i2 = 0, len2 = args2.length; i2 < len2; i2++) {
              lines[i2] = dir(args2[i2]);
            }
            return lines.join(newLine + newLine);
          });
          ConsoleAppender.addGlobalCommandLineFunction("dirxml", function(appender, args2, returnValue2) {
            var lines = [];
            for (var i2 = 0, len2 = args2.length; i2 < len2; i2++) {
              lines[i2] = getXhtml(args2[i2]);
            }
            return lines.join(newLine + newLine);
          });
          ConsoleAppender.addGlobalCommandLineFunction("cd", function(appender, args2, returnValue2) {
            var win, message;
            if (args2.length === 0 || args2[0] === "") {
              win = window;
              message = "Command line set to run in main window";
            } else {
              if (args2[0].window == args2[0]) {
                win = args2[0];
                message = "Command line set to run in frame '" + args2[0].name + "'";
              } else {
                win = window.frames[args2[0]];
                if (win) {
                  message = "Command line set to run in frame '" + args2[0] + "'";
                } else {
                  returnValue2.isError = true;
                  message = "Frame '" + args2[0] + "' does not exist";
                  win = appender.getCommandWindow();
                }
              }
            }
            appender.setCommandWindow(win);
            return message;
          });
          ConsoleAppender.addGlobalCommandLineFunction("clear", function(appender, args2, returnValue2) {
            returnValue2.appendResult = false;
            appender.clear();
          });
          ConsoleAppender.addGlobalCommandLineFunction("keys", function(appender, args2, returnValue2) {
            var keys = [];
            for (var k in args2[0]) {
              keys.push(k);
            }
            return keys;
          });
          ConsoleAppender.addGlobalCommandLineFunction("values", function(appender, args2, returnValue2) {
            var values = [];
            for (var k in args2[0]) {
              try {
                values.push(args2[0][k]);
              } catch (ex) {
                logLog.warn("values(): Unable to obtain value for key " + k + ". Details: " + getExceptionMessage(ex));
              }
            }
            return values;
          });
          ConsoleAppender.addGlobalCommandLineFunction("expansionDepth", function(appender, args2, returnValue2) {
            var expansionDepth = parseInt(args2[0], 10);
            if (isNaN(expansionDepth) || expansionDepth < 0) {
              returnValue2.isError = true;
              return "" + args2[0] + " is not a valid expansion depth";
            } else {
              appender.setCommandLineObjectExpansionDepth(expansionDepth);
              return "Object expansion depth set to " + expansionDepth;
            }
          });
        }
        function init() {
          createCommandLineFunctions();
        }
        init();
      })();
      function createDefaultLogger() {
        var logger = log4javascript.getLogger(defaultLoggerName);
        var a = new log4javascript.PopUpAppender();
        logger.addAppender(a);
        return logger;
      }
      log4javascript.setDocumentReady = function() {
        pageLoaded = true;
        log4javascript.dispatchEvent("load", {});
      };
      if (window.addEventListener) {
        window.addEventListener("load", log4javascript.setDocumentReady, false);
      } else if (window.attachEvent) {
        window.attachEvent("onload", log4javascript.setDocumentReady);
      } else {
        var oldOnload = window.onload;
        if (typeof window.onload != "function") {
          window.onload = log4javascript.setDocumentReady;
        } else {
          window.onload = function(evt) {
            if (oldOnload) {
              oldOnload(evt);
            }
            log4javascript.setDocumentReady();
          };
        }
      }
      return log4javascript;
    }, exports);
  }
});

// node_modules/ionic-logging-service/fesm2022/ionic-logging-service.mjs
var log4javascript2, JsonLayout3, LogLevel, LogLevelConverter, AjaxAppender3, LocalStorageAppender, Logger2, MemoryAppender, LoggingService;
var init_ionic_logging_service = __esm({
  "node_modules/ionic-logging-service/fesm2022/ionic-logging-service.mjs"() {
    init_core();
    init_core();
    log4javascript2 = __toESM(require_log4javascript(), 1);
    JsonLayout3 = class extends log4javascript2.JsonLayout {
      /**
       * Formats the log message.
       */
      format(loggingEvent) {
        const eventObj = {
          logger: loggingEvent.logger.name,
          timestamp: loggingEvent.timeStampInMilliseconds,
          level: loggingEvent.level.toString(),
          url: window.location.href,
          message: this.isCombinedMessages() ? loggingEvent.getCombinedMessages() : loggingEvent.messages
        };
        return JSON.stringify(eventObj);
      }
      /**
       * Gets the layout's name.
       * Mainly for unit testing purposes.
       *
       * @return layout's name
       */
      toString() {
        return "Ionic.Logging.JsonLayout";
      }
    };
    (function(LogLevel2) {
      LogLevel2[LogLevel2["ALL"] = 0] = "ALL";
      LogLevel2[LogLevel2["TRACE"] = 1] = "TRACE";
      LogLevel2[LogLevel2["DEBUG"] = 2] = "DEBUG";
      LogLevel2[LogLevel2["INFO"] = 3] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 4] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 5] = "ERROR";
      LogLevel2[LogLevel2["FATAL"] = 6] = "FATAL";
      LogLevel2[LogLevel2["OFF"] = 7] = "OFF";
    })(LogLevel || (LogLevel = {}));
    LogLevelConverter = class {
      /**
       * Converts log4javascript.Level to internal LogLevel.
       *
       * @param level log4javascript's data type
       * @return internal data type.
       */
      static levelFromLog4Javascript(level) {
        switch (level) {
          case log4javascript2.Level.ALL:
            return LogLevel.ALL;
          case log4javascript2.Level.DEBUG:
            return LogLevel.DEBUG;
          case log4javascript2.Level.ERROR:
            return LogLevel.ERROR;
          case log4javascript2.Level.FATAL:
            return LogLevel.FATAL;
          case log4javascript2.Level.INFO:
            return LogLevel.INFO;
          case log4javascript2.Level.OFF:
            return LogLevel.OFF;
          case log4javascript2.Level.TRACE:
            return LogLevel.TRACE;
          case log4javascript2.Level.WARN:
            return LogLevel.WARN;
          default:
            throw new Error(`invalid level ${level}`);
        }
      }
      /**
       * Converts string representation to internal LogLevel.
       *
       * @param level string representation
       * @return internal data type.
       */
      static levelFromString(level) {
        switch (level) {
          case "ALL":
            return LogLevel.ALL;
          case "DEBUG":
            return LogLevel.DEBUG;
          case "ERROR":
            return LogLevel.ERROR;
          case "FATAL":
            return LogLevel.FATAL;
          case "INFO":
            return LogLevel.INFO;
          case "OFF":
            return LogLevel.OFF;
          case "TRACE":
            return LogLevel.TRACE;
          case "WARN":
            return LogLevel.WARN;
          default:
            throw new Error(`invalid level ${level}`);
        }
      }
      /**
       * Converts internal LogLevel to log4javascript.Level.
       *
       * @param internal data type.
       * @return level log4javascript's data type
       */
      static levelToLog4Javascript(level) {
        switch (level) {
          case LogLevel.ALL:
            return log4javascript2.Level.ALL;
          case LogLevel.DEBUG:
            return log4javascript2.Level.DEBUG;
          case LogLevel.ERROR:
            return log4javascript2.Level.ERROR;
          case LogLevel.FATAL:
            return log4javascript2.Level.FATAL;
          case LogLevel.INFO:
            return log4javascript2.Level.INFO;
          case LogLevel.OFF:
            return log4javascript2.Level.OFF;
          case LogLevel.TRACE:
            return log4javascript2.Level.TRACE;
          case LogLevel.WARN:
            return log4javascript2.Level.WARN;
          default:
            throw new Error(`invalid level ${level}`);
        }
      }
    };
    AjaxAppender3 = class _AjaxAppender extends log4javascript2.Appender {
      static {
        this.batchSizeDefault = 1;
      }
      static {
        this.timerIntervalDefault = 0;
      }
      static {
        this.thresholdDefault = "WARN";
      }
      /**
       * Creates a new instance of the appender.
       *
       * @param configuration configuration for the appender.
       */
      constructor(configuration) {
        super();
        this.lastFailure = signal(
          void 0,
          ...ngDevMode ? [{ debugName: "lastFailure" }] : (
            /* istanbul ignore next */
            []
          )
        );
        if (!configuration) {
          throw new Error("configuration must be not empty");
        }
        if (!configuration.url) {
          throw new Error("url must be not empty");
        }
        this.ajaxAppender = new log4javascript2.AjaxAppender(configuration.url, configuration.withCredentials);
        this.url = configuration.url;
        this.withCredentials = configuration.withCredentials ?? false;
        this.ajaxAppender.setLayout(new JsonLayout3(false, false));
        this.ajaxAppender.addHeader("Content-Type", "application/json; charset=utf-8");
        this.ajaxAppender.setSendAllOnUnload(true);
        this.ajaxAppender.setFailCallback((message) => {
          this.lastFailure.set(message);
        });
        this.configure({
          batchSize: configuration.batchSize || _AjaxAppender.batchSizeDefault,
          threshold: configuration.threshold || _AjaxAppender.thresholdDefault,
          timerInterval: configuration.timerInterval || _AjaxAppender.timerIntervalDefault,
          url: configuration.url,
          withCredentials: configuration.withCredentials
        });
      }
      /**
       * Configures the logging depending on the given configuration.
       *
       * Only the defined properties get overwritten.
       * Neither url nor withCredentials can be modified.
       *
       * @param configuration configuration data.
       */
      configure(configuration) {
        if (configuration) {
          if (configuration.url && configuration.url !== this.url) {
            throw new Error("url must not be changed");
          }
          if (configuration.withCredentials && configuration.withCredentials !== this.withCredentials) {
            throw new Error("withCredentials must not be changed");
          }
          if (configuration.batchSize) {
            this.setBatchSize(configuration.batchSize);
          }
          if (typeof configuration.timerInterval === "number") {
            this.setTimerInterval(configuration.timerInterval);
          }
          if (configuration.threshold) {
            const convertedThreshold = LogLevelConverter.levelToLog4Javascript(LogLevelConverter.levelFromString(configuration.threshold));
            this.setThreshold(convertedThreshold);
          }
        }
      }
      /**
       * Appender-specific method to append a log message.
       *
       * @param loggingEvent event to be appended.
       */
      append(loggingEvent) {
        this.ajaxAppender.append(loggingEvent);
      }
      /**
       * Gets the appender's name.
       * Mainly for unit testing purposes.
       *
       * @return appender's name
       */
      toString() {
        return "Ionic.Logging.AjaxAppender";
      }
      /**
       * Get the internally used appender.
       * Mainly for unit testing purposes.
       */
      getInternalAppender() {
        return this.ajaxAppender;
      }
      /**
       * Returns the number of log messages sent in each request.
       */
      getBatchSize() {
        return this.ajaxAppender.getBatchSize();
      }
      /**
       * Sets the number of log messages to send in each request.
       *
       * @param batchSize new batch size
       */
      setBatchSize(batchSize) {
        this.ajaxAppender.setBatchSize(batchSize);
      }
      /**
       * Returns the appender's layout.
       */
      getLayout() {
        return this.ajaxAppender.getLayout();
      }
      /**
       * Sets the appender's layout.
       */
      setLayout(layout) {
        this.ajaxAppender.setLayout(layout);
      }
      /**
       * Returns the length of time in milliseconds between each sending of queued log messages.
       */
      getTimerInterval() {
        return this.ajaxAppender.getTimerInterval();
      }
      /**
       * Sets the length of time in milliseconds between each sending of queued log messages.
       *
       * @param timerInterval new timer interval
       */
      setTimerInterval(timerInterval) {
        this.ajaxAppender.setTimed(timerInterval > 0);
        this.ajaxAppender.setTimerInterval(timerInterval);
      }
      /**
       * Last error message when the appender could not send log messages to the server.
       * @returns error message
       */
      getLastFailure() {
        return this.lastFailure.asReadonly();
      }
    };
    LocalStorageAppender = class _LocalStorageAppender extends log4javascript2.Appender {
      static {
        this.maxMessagesDefault = 250;
      }
      static {
        this.thresholdDefault = "WARN";
      }
      /**
       * Creates a new instance of the appender.
       *
       * @param configuration configuration for the appender.
       */
      constructor(configuration) {
        super();
        this.maxMessages = _LocalStorageAppender.maxMessagesDefault;
        if (!configuration) {
          throw new Error("configuration must be not empty");
        }
        if (!configuration.localStorageKey || configuration.localStorageKey === "") {
          throw new Error("localStorageKey must be not empty");
        }
        this.localStorageKey = configuration.localStorageKey;
        this.logMessages = _LocalStorageAppender.loadLogMessages(this.localStorageKey);
        this.configure({
          localStorageKey: configuration.localStorageKey,
          maxMessages: configuration.maxMessages || _LocalStorageAppender.maxMessagesDefault,
          threshold: configuration.threshold || _LocalStorageAppender.thresholdDefault
        });
      }
      /**
       * Load log messages from local storage which are stored there under the given key.
       *
       * @param localStorageKey local storage key
       * @return stored messages
       */
      static loadLogMessages(localStorageKey) {
        let logMessages;
        if (!localStorageKey || localStorage.getItem(localStorageKey) === null) {
          logMessages = [];
        } else {
          logMessages = JSON.parse(localStorage.getItem(localStorageKey) ?? "");
          for (const logMessage of logMessages) {
            logMessage.timeStamp = new Date(logMessage.timeStamp);
          }
        }
        return logMessages;
      }
      /**
       * Remove log messages from local storage which are stored there under the given key.
       *
       * @param localStorageKey local storage key
       */
      static removeLogMessages(localStorageKey) {
        localStorage.removeItem(localStorageKey);
      }
      /**
       * Configures the logging depending on the given configuration.
       *
       * Only the defined properties get overwritten.
       * The localStorageKey cannot be modified.
       *
       * @param configuration configuration data.
       */
      configure(configuration) {
        if (configuration) {
          if (configuration.localStorageKey && configuration.localStorageKey !== this.localStorageKey) {
            throw new Error("localStorageKey must not be changed");
          }
          if (configuration.maxMessages) {
            this.setMaxMessages(configuration.maxMessages);
          }
          if (configuration.threshold) {
            const convertedThreshold = LogLevelConverter.levelToLog4Javascript(LogLevelConverter.levelFromString(configuration.threshold));
            this.setThreshold(convertedThreshold);
          }
        }
      }
      /**
       * Appender-specific method to append a log message.
       *
       * @param loggingEvent event to be appended.
       */
      append(loggingEvent) {
        while (this.logMessages.length >= this.maxMessages) {
          this.logMessages.shift();
        }
        const message = {
          level: LogLevel[LogLevelConverter.levelFromLog4Javascript(loggingEvent.level)],
          logger: typeof loggingEvent.logger !== "undefined" ? loggingEvent.logger.name : void 0,
          message: loggingEvent.messages.slice(1),
          methodName: loggingEvent.messages[0],
          timeStamp: loggingEvent.timeStamp
        };
        this.logMessages.push(message);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.logMessages));
      }
      /**
       * Gets the appender's name.
       * Mainly for unit testing purposes.
       *
       * @return appender's name
       */
      toString() {
        return "Ionic.Logging.LocalStorageAppender";
      }
      /**
       * Get the key which is used to store the messages in the local storage.
       */
      getLocalStorageKey() {
        return this.localStorageKey;
      }
      /**
       * Get the maximum number of messages which will be stored in local storage.
       */
      getMaxMessages() {
        return this.maxMessages;
      }
      /**
       * Set the maximum number of messages which will be stored in local storage.
       *
       * If the appender stores currently more messages than the new value allows, the oldest messages get removed.
       *
       * @param value new maximum number
       */
      setMaxMessages(value) {
        if (this.maxMessages !== value) {
          this.maxMessages = value;
          if (this.logMessages.length > this.maxMessages) {
            while (this.logMessages.length > this.maxMessages) {
              this.logMessages.shift();
            }
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.logMessages));
          }
        }
      }
      /**
       * Gets all messages stored in local storage.
       * Mainly for unit testing purposes.
       *
       * @return stored messages
       */
      getLogMessages() {
        return this.logMessages;
      }
      /**
       * Removes all messages from local storage.
       * Mainly for unit testing purposes.
       */
      clearLog() {
        this.logMessages = [];
        localStorage.removeItem(this.localStorageKey);
      }
    };
    Logger2 = class {
      /**
       * Creates a new instance of a logger.
       */
      constructor(logger) {
        if (typeof logger === "undefined") {
          this.logger = log4javascript2.getRootLogger();
        } else if (typeof logger === "string") {
          this.logger = log4javascript2.getLogger(logger);
        } else {
          this.logger = logger;
        }
      }
      /**
       * Get the log level.
       */
      getLogLevel() {
        return LogLevelConverter.levelFromLog4Javascript(this.logger.getLevel());
      }
      /**
       * Set the log level.
       *
       * @param level the new log level
       */
      setLogLevel(level) {
        this.logger.setLevel(LogLevelConverter.levelToLog4Javascript(level));
      }
      /**
       * Logs a message at level TRACE.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      trace(methodName2, ...params) {
        if (this.logger.isTraceEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.trace(...args2);
        }
      }
      /**
       * Logs a message at level DEBUG.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      debug(methodName2, ...params) {
        if (this.logger.isDebugEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.debug(...args2);
        }
      }
      /**
       * Logs a message at level INFO.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      info(methodName2, ...params) {
        if (this.logger.isInfoEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.info(...args2);
        }
      }
      /**
       * Logs a message at level WARN.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      warn(methodName2, ...params) {
        if (this.logger.isWarnEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.warn(...args2);
        }
      }
      /**
       * Logs a message at level ERROR.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      error(methodName2, ...params) {
        if (this.logger.isErrorEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.error(...args2);
        }
      }
      /**
       * Logs a message at level FATAL.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      fatal(methodName2, ...params) {
        if (this.logger.isFatalEnabled()) {
          const args2 = [methodName2];
          for (const param of params) {
            args2.push(this.formatArgument(param));
          }
          this.logger.fatal(...args2);
        }
      }
      /**
       * Logs the entry into a method.
       * The method name will be logged at level INFO, the parameters at level DEBUG.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      entry(methodName2, ...params) {
        if (this.logger.isInfoEnabled()) {
          const args2 = [methodName2, "entry"];
          if (this.logger.isDebugEnabled()) {
            for (const param of params) {
              args2.push(this.formatArgument(param));
            }
          }
          this.logger.info(...args2);
        }
      }
      /**
       * Logs the exit of a method.
       * The method name will be logged at level INFO, the parameters at level DEBUG.
       *
       * @param methodName name of the method
       * @param params optional parameters to be logged; objects will be formatted as JSON
       */
      exit(methodName2, ...params) {
        if (this.logger.isInfoEnabled()) {
          const args2 = [methodName2, "exit"];
          if (this.logger.isDebugEnabled()) {
            for (const param of params) {
              args2.push(this.formatArgument(param));
            }
          }
          this.logger.info(...args2);
        }
      }
      /**
       * Formats the given argument.
       */
      formatArgument(arg) {
        if (typeof arg === "string") {
          return arg;
        } else if (typeof arg === "number") {
          return arg.toString();
        } else if (arg instanceof Error) {
          return arg.toString();
        } else {
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return e.message;
          }
        }
      }
      /**
       * Returns the internal Logger (for unit tests only).
       */
      getInternalLogger() {
        return this.logger;
      }
    };
    MemoryAppender = class _MemoryAppender extends log4javascript2.Appender {
      static {
        this.maxMessagesDefault = 250;
      }
      static {
        this.thresholdDefault = "ALL";
      }
      /**
       * Creates a new instance of the appender.
       *
       * @param configuration configuration for the appender.
       */
      constructor(configuration) {
        super();
        this.logMessages = signal(
          [],
          ...ngDevMode ? [{ debugName: "logMessages" }] : (
            /* istanbul ignore next */
            []
          )
        );
        configuration = configuration || {};
        this.configure({
          maxMessages: configuration.maxMessages || _MemoryAppender.maxMessagesDefault,
          threshold: configuration.threshold || _MemoryAppender.thresholdDefault
        });
        this.maxMessages = _MemoryAppender.maxMessagesDefault;
      }
      /**
       * Configures the logging depending on the given configuration.
       * Only the defined properties get overwritten.
       *
       * @param configuration configuration data.
       */
      configure(configuration) {
        if (configuration) {
          if (configuration.maxMessages) {
            this.setMaxMessages(configuration.maxMessages);
          }
          if (configuration.threshold) {
            const convertedThreshold = LogLevelConverter.levelToLog4Javascript(LogLevelConverter.levelFromString(configuration.threshold));
            this.setThreshold(convertedThreshold);
          }
        }
      }
      /**
       * Appender-specific method to append a log message.
       *
       * @param loggingEvent event to be appended.
       */
      append(loggingEvent) {
        while (this.logMessages().length >= this.maxMessages) {
          this.logMessages.update((messages) => messages.slice(1));
        }
        const message = {
          level: LogLevel[LogLevelConverter.levelFromLog4Javascript(loggingEvent.level)],
          logger: typeof loggingEvent.logger === "object" ? loggingEvent.logger.name : void 0,
          message: loggingEvent.messages.slice(1),
          methodName: loggingEvent.messages[0],
          timeStamp: loggingEvent.timeStamp
        };
        this.logMessages.update((messages) => [...messages, message]);
      }
      /**
       * Gets the appender's name.
       * Mainly for unit testing purposes.
       *
       * @return appender's name
       */
      toString() {
        return "Ionic.Logging.MemoryAppender";
      }
      /**
       * Get the maximum number of messages which will be stored in memory.
       */
      getMaxMessages() {
        return this.maxMessages;
      }
      /**
       * Set the maximum number of messages which will be stored in memory.
       *
       * If the appender stores currently more messages than the new value allows, the oldest messages get removed.
       *
       * @param value new maximum number
       */
      setMaxMessages(value) {
        this.maxMessages = value;
        if (this.logMessages().length > this.maxMessages) {
          this.logMessages.update((messages) => messages.slice(this.logMessages().length - this.maxMessages));
        }
      }
      /**
       * Gets all messages stored in memory.
       *
       * @return stored messages
       */
      getLogMessages() {
        return this.logMessages.asReadonly();
      }
      /**
       * Remove all messages stored in memory.
       */
      removeLogMessages() {
        this.logMessages.set([]);
      }
    };
    LoggingService = class _LoggingService {
      /**
       * Creates a new instance of the service.
       */
      constructor() {
        log4javascript2.logLog.setQuietMode(true);
        const logger = log4javascript2.getRootLogger();
        logger.setLevel(log4javascript2.Level.WARN);
        this.browserConsoleAppender = new log4javascript2.BrowserConsoleAppender();
        this.browserConsoleAppender.setLayout(new log4javascript2.PatternLayout("%d{HH:mm:ss,SSS} %c %m"));
        this.browserConsoleAppender.setThreshold(log4javascript2.Level.ALL);
        logger.addAppender(this.browserConsoleAppender);
        this.memoryAppender = new MemoryAppender();
        this.memoryAppender.setLayout(new log4javascript2.PatternLayout("%d{HH:mm:ss,SSS} %c %m"));
        logger.addAppender(this.memoryAppender);
        this.configure();
      }
      /**
       * Configures the logging depending on the given configuration.
       *
       * @param configuration configuration data.
       */
      configure(configuration) {
        if (typeof configuration === "undefined") {
          configuration = {};
        }
        if (typeof configuration.logLevels !== "undefined") {
          for (const level of configuration.logLevels) {
            let logger;
            if (level.loggerName === "root") {
              logger = log4javascript2.getRootLogger();
            } else {
              logger = log4javascript2.getLogger(level.loggerName);
            }
            try {
              logger.setLevel(LogLevelConverter.levelToLog4Javascript(LogLevelConverter.levelFromString(level.logLevel)));
            } catch (e) {
              throw new Error(`invalid log level ${level.logLevel}`);
            }
          }
        }
        if (typeof configuration.ajaxAppender !== "undefined") {
          this.ajaxAppender = new AjaxAppender3(configuration.ajaxAppender);
          log4javascript2.getRootLogger().addAppender(this.ajaxAppender);
        }
        if (typeof configuration.localStorageAppender !== "undefined") {
          const localStorageAppender = new LocalStorageAppender(configuration.localStorageAppender);
          log4javascript2.getRootLogger().addAppender(localStorageAppender);
          const appenders = new Logger2().getInternalLogger().getEffectiveAppenders();
          const memoryAppender = appenders.find((a) => a.toString() === "Ionic.Logging.MemoryAppender");
          if (memoryAppender) {
            log4javascript2.getRootLogger().removeAppender(memoryAppender);
            log4javascript2.getRootLogger().addAppender(memoryAppender);
          }
        }
        if (configuration.memoryAppender) {
          this.memoryAppender.configure(configuration.memoryAppender);
        }
        if (configuration.browserConsoleAppender) {
          if (configuration.browserConsoleAppender.threshold) {
            const convertedThreshold = LogLevelConverter.levelToLog4Javascript(LogLevelConverter.levelFromString(configuration.browserConsoleAppender.threshold));
            this.browserConsoleAppender.setThreshold(convertedThreshold);
          }
        }
      }
      /**
       * Gets the root logger from which all other loggers derive.
       *
       * @return root logger
       */
      getRootLogger() {
        return new Logger2();
      }
      /**
       * Gets a logger with the specified name, creating it if a logger with that name does not already exist.
       *
       * @param loggerName name of the logger
       * @return logger
       */
      getLogger(loggerName) {
        return new Logger2(loggerName);
      }
      /**
       * Gets the last log messages.
       *
       * The log messages are retrieved from the internal [MemoryAppender](../memoryappender.html).
       * That means you will get only the most current messages. The number of the messages is limited
       * by its maxMessages value.
       *
       * @return log messages
       */
      getLogMessages() {
        return this.memoryAppender.getLogMessages();
      }
      /**
       * Loads the log messages written by the LocalStorageAppender with the given key.
       *
       * @param localStorageKey key for the local storage
       * @returns log messages
       */
      getLogMessagesFromLocalStorage(localStorageKey) {
        return LocalStorageAppender.loadLogMessages(localStorageKey);
      }
      /**
       * Remove all log messages.
       */
      removeLogMessages() {
        this.memoryAppender.removeLogMessages();
      }
      /**
       * Removes the log messages written by the LocalStorageAppender with the given key.
       *
       * @param localStorageKey key for the local storage
       */
      removeLogMessagesFromLocalStorage(localStorageKey) {
        LocalStorageAppender.removeLogMessages(localStorageKey);
      }
      /**
       * Error messages when the ajax appender could not send log messages to the server.
       * @returns error messages
       */
      getLastAjaxAppenderFailure() {
        return this.ajaxAppender ? this.ajaxAppender.getLastFailure() : signal(void 0).asReadonly();
      }
      static {
        this.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.1.3", ngImport: core_exports, type: _LoggingService, deps: [], target: FactoryTarget.Injectable });
      }
      static {
        this.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.3", ngImport: core_exports, type: _LoggingService, providedIn: "root" });
      }
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.3", ngImport: core_exports, type: LoggingService, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }], ctorParameters: () => [] });
  }
});

// src/app/global.service.ts
function escape_html(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
function web_share_broke(err) {
  return !!err && err.name !== "AbortError";
}
function web_share_available(data = { title: "vodle", text: "vodle" }) {
  const nav = typeof navigator === "undefined" ? null : navigator;
  if (!nav || typeof nav.share !== "function")
    return false;
  if (typeof nav.canShare !== "function")
    return true;
  try {
    return !!nav.canShare(data);
  } catch (err) {
    return false;
  }
}
var GlobalService_1, GlobalService;
var init_global_service = __esm({
  "src/app/global.service.ts"() {
    init_tslib_es6();
    init_core();
    init_simple_format();
    init_environment();
    init_http();
    init_ngx_translate_core();
    init_ionic_storage_angular();
    init_ionic_logging_service();
    init_lazy();
    init_esm();
    init_data_service();
    init_settings_service();
    init_poll_service();
    init_delegation_service();
    init_news_service();
    GlobalService = class GlobalService2 {
      static {
        GlobalService_1 = this;
      }
      //               1          1       1  2          3                         3   2 2                                2                                                                        11      1 1              1                              
      constructor(loggingService, http, storage, D, P, S, Del, N, translate, alertCtrl) {
        this.http = http;
        this.storage = storage;
        this.D = D;
        this.P = P;
        this.S = S;
        this.Del = Del;
        this.N = N;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.web_share_broken = false;
        this.show_spinner = false;
        this._urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        this.urlRegex = /^(?:(http|ftp)(s)?:\/\/)?(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,6}\.?|[a-zA-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\]?)(?::\d+)?(?:\/?|[\/?]\S+)$/;
        this.spinning_reasons = /* @__PURE__ */ new Set();
        this.L = loggingService.getLogger("VODLE");
        this.L.entry("GlobalService.constructor");
        D.init(this);
        P.init(this);
        S.init(this);
        Del.init(this);
        N.init(this);
        window.addEventListener("beforeunload", this.onBeforeUnload.bind(this));
        window.onbeforeunload = this.onBeforeUnload.bind(this);
        window.onunhandledrejection = (event) => {
          console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
        };
        window.onerror = function(message, source, lineNumber, colno, error) {
          console.warn(`UNHANDLED ERROR: ${error.stack}`);
        };
        this.L.exit("GlobalService.constructor");
      }
      ngOnDestroy() {
        console.log("GlobalService.ngOnDestroy entry");
        this.D.save_state();
        console.log("GlobalService.ngOnDestroy exit");
      }
      onBeforeUnload(event) {
        console.log("DATA onBeforeUnload entry");
        if (!!this.storage) {
          this.D.save_state();
          if (this.D.page) {
            if (this.D.page.ionViewWillLeave) {
              this.D.page.ionViewWillLeave();
            }
            if (this.D.page.ionViewDidLeave) {
              this.D.page.ionViewDidLeave();
            }
            if (this.D.page.ngOnDestroy) {
              this.D.page.ngOnDestroy();
            }
          }
        }
        console.log("DATA onBeforeUnload exit");
      }
      // HANDOVER OF A DEPLOYMENT (environment.handover, deployment guide §6):
      /** where new polls are started from now on, when this deployment is
       *  being retired; '' otherwise */
      get successor_url() {
        return environment.handover?.successor_url || "";
      }
      /** where the polls started before the move to this deployment live on;
       *  '' when there is no predecessor (any more) */
      get predecessor_url() {
        return environment.handover?.predecessor_url || "";
      }
      /** the host name of a URL, for a notice: "matrix.vodle.it" */
      static host_of(url) {
        try {
          return new URL(url).host;
        } catch (error) {
          return url;
        }
      }
      /** When this deployment is being retired, tells where new polls are
       *  started from now on, with a button that goes there, and resolves to
       *  true; resolves to false without a successor (nothing shown). Called
       *  wherever a poll would be started here. */
      show_successor_notice() {
        return __async(this, null, function* () {
          const url = this.successor_url;
          if (!url) {
            return false;
          }
          const host = GlobalService_1.host_of(url);
          const notice = yield this.alertCtrl.create({
            header: this.translate.instant("handover.successor-title"),
            message: this.translate.instant("handover.successor-message", { host }),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "cancel"
              },
              {
                text: this.translate.instant("handover.successor-go", { host }),
                role: "confirm",
                handler: () => {
                  window.location.assign(url);
                }
              }
            ]
          });
          yield notice.present();
          return true;
        });
      }
      // TODO: use this consistently wherever an external page is accessed:
      open_url_in_new_tab(dirty_url) {
        return __async(this, null, function* () {
          const url = this.D.fix_url(dirty_url);
          const confirm2 = yield this.alertCtrl.create({
            message: this.translate.instant("external-link.confirm", { url: escape_html(url) }),
            buttons: [
              {
                text: this.translate.instant("no"),
                role: "Cancel",
                handler: () => {
                }
              },
              {
                text: this.translate.instant("external-link.copy-link"),
                handler: () => {
                  this.copy_link_to_clipboard(url);
                }
              },
              {
                text: this.translate.instant("external-link.yes"),
                role: "Ok",
                handler: () => {
                  const a = document.createElement("a");
                  a.href = url;
                  a.target = "_blank";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              }
            ]
          });
          yield confirm2.present();
        });
      }
      copy_link_to_clipboard(url) {
        window.navigator.clipboard.writeText(url);
        LocalNotifications.schedule({
          notifications: [{
            title: this.translate.instant("external-link.notification-copied-link-title"),
            body: this.translate.instant("external-link.notification-copied-link-body"),
            id: null
          }]
        }).then((res) => {
        }).catch((err) => {
        });
      }
      format_details(text) {
        return format_details(text);
      }
      map2str(map) {
        if (map) {
          return JSON.stringify([...map.entries()].reduce((o, [key, value]) => {
            o[key] = value instanceof Set ? [...value] : value instanceof Map ? [...value.entries()] : value;
            return o;
          }, {}));
        } else
          return "#";
      }
      go_fullscreen_on_mobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          var elem = document.documentElement;
          if (!!elem.requestFullscreen) {
            elem.requestFullscreen();
          }
        }
      }
      add_spinning_reason(reason) {
        this.spinning_reasons.add(reason);
        this.show_spinner = true;
        this.L.trace("GlobalService.add_spinning_reason reasons", [...this.spinning_reasons.entries()]);
      }
      remove_spinning_reason(reason) {
        if (this.spinning_reasons.has(reason)) {
          this.spinning_reasons.delete(reason);
          if (this.spinning_reasons.size == 0) {
            this.show_spinner = false;
          }
        }
        this.L.trace("GlobalService.remove_spinning_reason reasons", [...this.spinning_reasons.entries()]);
      }
      static {
        this.ctorParameters = () => [
          { type: LoggingService },
          { type: HttpClient },
          { type: Storage },
          { type: DataService },
          { type: PollService },
          { type: SettingsService },
          { type: DelegationService },
          { type: NewsService },
          { type: TranslateService },
          { type: AlertController }
        ];
      }
      static {
        this.propDecorators = {
          onBeforeUnload: [{ type: HostListener, args: ["window:beforeunload", ["$event"]] }]
        };
      }
    };
    GlobalService = GlobalService_1 = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], GlobalService);
  }
});

export {
  escape_html,
  web_share_broke,
  web_share_available,
  GlobalService,
  init_global_service
};
//# debugId=f09aec65-ab86-52b2-bf37-be3cb18d3e64
//# sourceMappingURL=chunk-DWAKSAT2.js.map
