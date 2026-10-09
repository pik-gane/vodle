import {
  init_index_BpRUsN_W,
  printIonWarning
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/format-Ck1cw5z7.js
function parseDate(val) {
  if (Array.isArray(val)) {
    const parsedArray = [];
    for (const valStr of val) {
      const parsedVal = parseDate(valStr);
      if (!parsedVal) {
        return void 0;
      }
      parsedArray.push(parsedVal);
    }
    return parsedArray;
  }
  let parse = null;
  if (val != null && val !== "") {
    parse = TIME_REGEXP.exec(val);
    if (parse) {
      parse.unshift(void 0, void 0);
      parse[2] = parse[3] = void 0;
    } else {
      parse = ISO_8601_REGEXP.exec(val);
    }
  }
  if (parse === null) {
    printIonWarning(`[ion-datetime] - Unable to parse date string: ${val}. Please provide a valid ISO 8601 datetime string.`);
    return void 0;
  }
  for (let i = 1; i < 8; i++) {
    parse[i] = parse[i] !== void 0 ? parseInt(parse[i], 10) : void 0;
  }
  return {
    year: parse[1],
    month: parse[2],
    day: parse[3],
    hour: parse[4],
    minute: parse[5],
    ampm: parse[4] < 12 ? "am" : "pm"
  };
}
function convertDataToISO(data) {
  if (Array.isArray(data)) {
    return data.map((parts) => convertDataToISO(parts));
  }
  let rtn = "";
  if (data.year !== void 0) {
    rtn = fourDigit(data.year);
    if (data.month !== void 0) {
      rtn += "-" + twoDigit(data.month);
      if (data.day !== void 0) {
        rtn += "-" + twoDigit(data.day);
        if (data.hour !== void 0) {
          rtn += `T${twoDigit(data.hour)}:${twoDigit(data.minute)}:00`;
        }
      }
    }
  } else if (data.hour !== void 0) {
    rtn = twoDigit(data.hour) + ":" + twoDigit(data.minute);
  }
  return rtn;
}
var isSameDay, isBefore, isAfter, warnIfValueOutOfBounds, isLeapYear, getHourCycle, is24Hour, getNumDaysInMonth, isMonthFirstLocale, isLocaleDayPeriodRTL, ISO_8601_REGEXP, TIME_REGEXP, convertToArrayOfNumbers, getPartsFromCalendarDay, clampDate, parseAmPm, parseMaxParts, parseMinParts, twoDigit, fourDigit, convert12HourTo24Hour, getStartOfWeek, getEndOfWeek, getNextDay, getPreviousDay, getPreviousWeek, getNextWeek, subtractDays, addDays, getPreviousMonth, getNextMonth, changeYear, getPreviousYear, getNextYear, getInternalHourValue, calculateHourFromAMPM, validateParts, getClosestValidDate, findClosestValue, getFormattedDayPeriod, stripTimeZone, getLocalizedTime, addTimePadding, getFormattedHour, generateDayAriaLabel, getMonthAndYear, getDay, getYear, getNormalizedDate, getLocalizedDateTime, getLocalizedDateTimeParts, getDateTimeFormat, getTodayLabel, removeDateTzOffset, DATE_AM, DATE_PM, getLocalizedDayPeriod, formatValue;
var init_format_Ck1cw5z7 = __esm({
  "node_modules/@ionic/core/dist/esm/format-Ck1cw5z7.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    isSameDay = (baseParts, compareParts) => {
      return baseParts.month === compareParts.month && baseParts.day === compareParts.day && baseParts.year === compareParts.year;
    };
    isBefore = (baseParts, compareParts) => {
      return !!(baseParts.year < compareParts.year || baseParts.year === compareParts.year && baseParts.month < compareParts.month || baseParts.year === compareParts.year && baseParts.month === compareParts.month && baseParts.day !== null && baseParts.day < compareParts.day);
    };
    isAfter = (baseParts, compareParts) => {
      return !!(baseParts.year > compareParts.year || baseParts.year === compareParts.year && baseParts.month > compareParts.month || baseParts.year === compareParts.year && baseParts.month === compareParts.month && baseParts.day !== null && baseParts.day > compareParts.day);
    };
    warnIfValueOutOfBounds = (value, min, max) => {
      const valueArray = Array.isArray(value) ? value : [value];
      for (const val of valueArray) {
        if (min !== void 0 && isBefore(val, min) || max !== void 0 && isAfter(val, max)) {
          printIonWarning(`[ion-datetime] - The value provided to ion-datetime is out of bounds.

Min: ${JSON.stringify(min)}
Max: ${JSON.stringify(max)}
Value: ${JSON.stringify(value)}`);
          break;
        }
      }
    };
    isLeapYear = (year) => {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    };
    getHourCycle = (locale, hourCycle) => {
      if (hourCycle !== void 0) {
        return hourCycle;
      }
      const formatted = new Intl.DateTimeFormat(locale, { hour: "numeric" });
      const options = formatted.resolvedOptions();
      if (options.hourCycle !== void 0) {
        return options.hourCycle;
      }
      const date = /* @__PURE__ */ new Date("5/18/2021 00:00");
      const parts = formatted.formatToParts(date);
      const hour = parts.find((p) => p.type === "hour");
      if (!hour) {
        throw new Error("Hour value not found from DateTimeFormat");
      }
      switch (hour.value) {
        case "0":
          return "h11";
        case "12":
          return "h12";
        case "00":
          return "h23";
        case "24":
          return "h24";
        default:
          throw new Error(`Invalid hour cycle "${hourCycle}"`);
      }
    };
    is24Hour = (hourCycle) => {
      return hourCycle === "h23" || hourCycle === "h24";
    };
    getNumDaysInMonth = (month, year) => {
      return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : month === 2 ? isLeapYear(year) ? 29 : 28 : 31;
    };
    isMonthFirstLocale = (locale, formatOptions = {
      month: "numeric",
      year: "numeric"
    }) => {
      const parts = new Intl.DateTimeFormat(locale, formatOptions).formatToParts(/* @__PURE__ */ new Date());
      return parts[0].type === "month";
    };
    isLocaleDayPeriodRTL = (locale) => {
      const parts = new Intl.DateTimeFormat(locale, { hour: "numeric" }).formatToParts(/* @__PURE__ */ new Date());
      return parts[0].type === "dayPeriod";
    };
    ISO_8601_REGEXP = // eslint-disable-next-line no-useless-escape
    /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
    TIME_REGEXP = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
    convertToArrayOfNumbers = (input) => {
      if (input === void 0) {
        return;
      }
      let processedInput = input;
      if (typeof input === "string") {
        processedInput = input.replace(/\[|\]|\s/g, "").split(",");
      }
      let values;
      if (Array.isArray(processedInput)) {
        values = processedInput.map((num) => parseInt(num, 10)).filter(isFinite);
      } else {
        values = [processedInput];
      }
      return values;
    };
    getPartsFromCalendarDay = (el) => {
      return {
        month: parseInt(el.getAttribute("data-month"), 10),
        day: parseInt(el.getAttribute("data-day"), 10),
        year: parseInt(el.getAttribute("data-year"), 10),
        dayOfWeek: parseInt(el.getAttribute("data-day-of-week"), 10)
      };
    };
    clampDate = (dateParts, minParts, maxParts) => {
      if (minParts && isBefore(dateParts, minParts)) {
        return minParts;
      } else if (maxParts && isAfter(dateParts, maxParts)) {
        return maxParts;
      }
      return dateParts;
    };
    parseAmPm = (hour) => {
      return hour >= 12 ? "pm" : "am";
    };
    parseMaxParts = (max, todayParts) => {
      const result = parseDate(max);
      if (result === void 0) {
        return;
      }
      const { month, day, year, hour, minute } = result;
      const yearValue = year ?? todayParts.year;
      const monthValue = month ?? 12;
      return {
        month: monthValue,
        day: day ?? getNumDaysInMonth(monthValue, yearValue),
        /**
         * Passing in "HH:mm" is a valid ISO-8601
         * string, so we just default to the current year
         * in this case.
         */
        year: yearValue,
        hour: hour ?? 23,
        minute: minute ?? 59
      };
    };
    parseMinParts = (min, todayParts) => {
      const result = parseDate(min);
      if (result === void 0) {
        return;
      }
      const { month, day, year, hour, minute } = result;
      return {
        month: month ?? 1,
        day: day ?? 1,
        /**
         * Passing in "HH:mm" is a valid ISO-8601
         * string, so we just default to the current year
         * in this case.
         */
        year: year ?? todayParts.year,
        hour: hour ?? 0,
        minute: minute ?? 0
      };
    };
    twoDigit = (val) => {
      return ("0" + (val !== void 0 ? Math.abs(val) : "0")).slice(-2);
    };
    fourDigit = (val) => {
      return ("000" + (val !== void 0 ? Math.abs(val) : "0")).slice(-4);
    };
    convert12HourTo24Hour = (hour, ampm) => {
      if (ampm === void 0) {
        return hour;
      }
      if (ampm === "am") {
        if (hour === 12) {
          return 0;
        }
        return hour;
      }
      if (hour === 12) {
        return 12;
      }
      return hour + 12;
    };
    getStartOfWeek = (refParts) => {
      const { dayOfWeek } = refParts;
      if (dayOfWeek === null || dayOfWeek === void 0) {
        throw new Error("No day of week provided");
      }
      return subtractDays(refParts, dayOfWeek);
    };
    getEndOfWeek = (refParts) => {
      const { dayOfWeek } = refParts;
      if (dayOfWeek === null || dayOfWeek === void 0) {
        throw new Error("No day of week provided");
      }
      return addDays(refParts, 6 - dayOfWeek);
    };
    getNextDay = (refParts) => {
      return addDays(refParts, 1);
    };
    getPreviousDay = (refParts) => {
      return subtractDays(refParts, 1);
    };
    getPreviousWeek = (refParts) => {
      return subtractDays(refParts, 7);
    };
    getNextWeek = (refParts) => {
      return addDays(refParts, 7);
    };
    subtractDays = (refParts, numDays) => {
      const { month, day, year } = refParts;
      if (day === null) {
        throw new Error("No day provided");
      }
      const workingParts = {
        month,
        day,
        year
      };
      workingParts.day = day - numDays;
      if (workingParts.day < 1) {
        workingParts.month -= 1;
      }
      if (workingParts.month < 1) {
        workingParts.month = 12;
        workingParts.year -= 1;
      }
      if (workingParts.day < 1) {
        const daysInMonth = getNumDaysInMonth(workingParts.month, workingParts.year);
        workingParts.day = daysInMonth + workingParts.day;
      }
      return workingParts;
    };
    addDays = (refParts, numDays) => {
      const { month, day, year } = refParts;
      if (day === null) {
        throw new Error("No day provided");
      }
      const workingParts = {
        month,
        day,
        year
      };
      const daysInMonth = getNumDaysInMonth(month, year);
      workingParts.day = day + numDays;
      if (workingParts.day > daysInMonth) {
        workingParts.day -= daysInMonth;
        workingParts.month += 1;
      }
      if (workingParts.month > 12) {
        workingParts.month = 1;
        workingParts.year += 1;
      }
      return workingParts;
    };
    getPreviousMonth = (refParts) => {
      const month = refParts.month === 1 ? 12 : refParts.month - 1;
      const year = refParts.month === 1 ? refParts.year - 1 : refParts.year;
      const numDaysInMonth = getNumDaysInMonth(month, year);
      const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
      return { month, year, day };
    };
    getNextMonth = (refParts) => {
      const month = refParts.month === 12 ? 1 : refParts.month + 1;
      const year = refParts.month === 12 ? refParts.year + 1 : refParts.year;
      const numDaysInMonth = getNumDaysInMonth(month, year);
      const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
      return { month, year, day };
    };
    changeYear = (refParts, yearDelta) => {
      const month = refParts.month;
      const year = refParts.year + yearDelta;
      const numDaysInMonth = getNumDaysInMonth(month, year);
      const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
      return { month, year, day };
    };
    getPreviousYear = (refParts) => {
      return changeYear(refParts, -1);
    };
    getNextYear = (refParts) => {
      return changeYear(refParts, 1);
    };
    getInternalHourValue = (hour, use24Hour, ampm) => {
      if (use24Hour) {
        return hour;
      }
      return convert12HourTo24Hour(hour, ampm);
    };
    calculateHourFromAMPM = (currentParts, newAMPM) => {
      const { ampm: currentAMPM, hour } = currentParts;
      let newHour = hour;
      if (currentAMPM === "am" && newAMPM === "pm") {
        newHour = convert12HourTo24Hour(newHour, "pm");
      } else if (currentAMPM === "pm" && newAMPM === "am") {
        newHour = Math.abs(newHour - 12);
      }
      return newHour;
    };
    validateParts = (parts, minParts, maxParts) => {
      const { month, day, year } = parts;
      const partsCopy = clampDate(__spreadValues({}, parts), minParts, maxParts);
      const numDays = getNumDaysInMonth(month, year);
      if (day !== null && numDays < day) {
        partsCopy.day = numDays;
      }
      if (minParts !== void 0 && isSameDay(partsCopy, minParts)) {
        if (partsCopy.hour !== void 0 && minParts.hour !== void 0) {
          if (partsCopy.hour < minParts.hour) {
            partsCopy.hour = minParts.hour;
            partsCopy.minute = minParts.minute;
          } else if (partsCopy.hour === minParts.hour && partsCopy.minute !== void 0 && minParts.minute !== void 0 && partsCopy.minute < minParts.minute) {
            partsCopy.minute = minParts.minute;
          }
        }
      }
      if (maxParts !== void 0 && isSameDay(parts, maxParts)) {
        if (partsCopy.hour !== void 0 && maxParts.hour !== void 0) {
          if (partsCopy.hour > maxParts.hour) {
            partsCopy.hour = maxParts.hour;
            partsCopy.minute = maxParts.minute;
          } else if (partsCopy.hour === maxParts.hour && partsCopy.minute !== void 0 && maxParts.minute !== void 0 && partsCopy.minute > maxParts.minute) {
            partsCopy.minute = maxParts.minute;
          }
        }
      }
      return partsCopy;
    };
    getClosestValidDate = ({ refParts, monthValues, dayValues, yearValues, hourValues, minuteValues, minParts, maxParts }) => {
      const { hour, minute, day, month, year } = refParts;
      const copyParts = __spreadProps(__spreadValues({}, refParts), { dayOfWeek: void 0 });
      if (yearValues !== void 0) {
        const filteredYears = yearValues.filter((year2) => {
          if (minParts !== void 0 && year2 < minParts.year) {
            return false;
          }
          if (maxParts !== void 0 && year2 > maxParts.year) {
            return false;
          }
          return true;
        });
        copyParts.year = findClosestValue(year, filteredYears);
      }
      if (monthValues !== void 0) {
        const filteredMonths = monthValues.filter((month2) => {
          if (minParts !== void 0 && copyParts.year === minParts.year && month2 < minParts.month) {
            return false;
          }
          if (maxParts !== void 0 && copyParts.year === maxParts.year && month2 > maxParts.month) {
            return false;
          }
          return true;
        });
        copyParts.month = findClosestValue(month, filteredMonths);
      }
      if (day !== null && dayValues !== void 0) {
        const filteredDays = dayValues.filter((day2) => {
          if (minParts !== void 0 && isBefore(__spreadProps(__spreadValues({}, copyParts), { day: day2 }), minParts)) {
            return false;
          }
          if (maxParts !== void 0 && isAfter(__spreadProps(__spreadValues({}, copyParts), { day: day2 }), maxParts)) {
            return false;
          }
          return true;
        });
        copyParts.day = findClosestValue(day, filteredDays);
      }
      if (hour !== void 0 && hourValues !== void 0) {
        const filteredHours = hourValues.filter((hour2) => {
          if (minParts?.hour !== void 0 && isSameDay(copyParts, minParts) && hour2 < minParts.hour) {
            return false;
          }
          if (maxParts?.hour !== void 0 && isSameDay(copyParts, maxParts) && hour2 > maxParts.hour) {
            return false;
          }
          return true;
        });
        copyParts.hour = findClosestValue(hour, filteredHours);
        copyParts.ampm = parseAmPm(copyParts.hour);
      }
      if (minute !== void 0 && minuteValues !== void 0) {
        const filteredMinutes = minuteValues.filter((minute2) => {
          if (minParts?.minute !== void 0 && isSameDay(copyParts, minParts) && copyParts.hour === minParts.hour && minute2 < minParts.minute) {
            return false;
          }
          if (maxParts?.minute !== void 0 && isSameDay(copyParts, maxParts) && copyParts.hour === maxParts.hour && minute2 > maxParts.minute) {
            return false;
          }
          return true;
        });
        copyParts.minute = findClosestValue(minute, filteredMinutes);
      }
      return copyParts;
    };
    findClosestValue = (reference, values) => {
      let closestValue = values[0];
      let rank = Math.abs(closestValue - reference);
      for (let i = 1; i < values.length; i++) {
        const value = values[i];
        const valueRank = Math.abs(value - reference);
        if (valueRank < rank) {
          closestValue = value;
          rank = valueRank;
        }
      }
      return closestValue;
    };
    getFormattedDayPeriod = (dayPeriod) => {
      if (dayPeriod === void 0) {
        return "";
      }
      return dayPeriod.toUpperCase();
    };
    stripTimeZone = (formatOptions) => {
      return __spreadProps(__spreadValues({}, formatOptions), {
        /**
         * Setting the time zone to UTC ensures that the value shown is always the
         * same as what was selected and safeguards against older Safari bugs with
         * Intl.DateTimeFormat.
         */
        timeZone: "UTC",
        /**
         * We do not want to display the time zone name
         */
        timeZoneName: void 0
      });
    };
    getLocalizedTime = (locale, refParts, hourCycle, formatOptions = { hour: "numeric", minute: "numeric" }) => {
      const timeParts = {
        hour: refParts.hour,
        minute: refParts.minute
      };
      if (timeParts.hour === void 0 || timeParts.minute === void 0) {
        return "Invalid Time";
      }
      return new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, stripTimeZone(formatOptions)), {
        /**
         * We use hourCycle here instead of hour12 due to:
         * https://bugs.chromium.org/p/chromium/issues/detail?id=1347316&q=hour12&can=2
         */
        hourCycle
        /**
         * Setting Z at the end indicates that this
         * date string is in the UTC time zone. This
         * prevents new Date from adding the time zone
         * offset when getting the ISO string.
         */
      })).format(/* @__PURE__ */ new Date(convertDataToISO(__spreadValues({
        /**
         * JS uses a simplified ISO 8601 format which allows for
         * date-only formats and date-time formats, but not
         * time-only formats: https://tc39.es/ecma262/#sec-date-time-string-format
         * As a result, developers who only pass a time will get
         * an "Invalid Date" error. To account for this, we make sure that
         * year/day/month values are set when passing to new Date().
         * The Intl.DateTimeFormat call above only uses the hour/minute
         * values, so passing these date values should have no impact
         * on the time output.
         */
        year: 2023,
        day: 1,
        month: 1
      }, timeParts)) + "Z"));
    };
    addTimePadding = (value) => {
      const valueToString = value.toString();
      if (valueToString.length > 1) {
        return valueToString;
      }
      return `0${valueToString}`;
    };
    getFormattedHour = (hour, hourCycle) => {
      if (hour === 0) {
        switch (hourCycle) {
          case "h11":
            return "0";
          case "h12":
            return "12";
          case "h23":
            return "00";
          case "h24":
            return "24";
          default:
            throw new Error(`Invalid hour cycle "${hourCycle}"`);
        }
      }
      const use24Hour = is24Hour(hourCycle);
      if (use24Hour) {
        return addTimePadding(hour);
      }
      return hour.toString();
    };
    generateDayAriaLabel = (locale, today, refParts) => {
      if (refParts.day === null) {
        return null;
      }
      const date = getNormalizedDate(refParts);
      const labelString = new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      }).format(date);
      return today ? `Today, ${labelString}` : labelString;
    };
    getMonthAndYear = (locale, refParts) => {
      const date = getNormalizedDate(refParts);
      return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
    };
    getDay = (locale, refParts) => {
      return getLocalizedDateTimeParts(locale, refParts, { day: "numeric" }).find((obj) => obj.type === "day").value;
    };
    getYear = (locale, refParts) => {
      return getLocalizedDateTime(locale, refParts, { year: "numeric" });
    };
    getNormalizedDate = (refParts) => {
      const timeString = refParts.hour !== void 0 && refParts.minute !== void 0 ? ` ${refParts.hour}:${refParts.minute}` : "";
      return /* @__PURE__ */ new Date(`${refParts.month ?? 1}/${refParts.day ?? 1}/${refParts.year ?? 2023}${timeString} GMT+0000`);
    };
    getLocalizedDateTime = (locale, refParts, options) => {
      const date = getNormalizedDate(refParts);
      return getDateTimeFormat(locale, stripTimeZone(options)).format(date);
    };
    getLocalizedDateTimeParts = (locale, refParts, options) => {
      const date = getNormalizedDate(refParts);
      return getDateTimeFormat(locale, options).formatToParts(date);
    };
    getDateTimeFormat = (locale, options) => {
      return new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, options), { timeZone: "UTC" }));
    };
    getTodayLabel = (locale) => {
      if ("RelativeTimeFormat" in Intl) {
        const label = new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(0, "day");
        return label.charAt(0).toUpperCase() + label.slice(1);
      } else {
        return "Today";
      }
    };
    removeDateTzOffset = (date) => {
      const tzOffset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - tzOffset);
      return date;
    };
    DATE_AM = removeDateTzOffset(/* @__PURE__ */ new Date("2022T01:00"));
    DATE_PM = removeDateTzOffset(/* @__PURE__ */ new Date("2022T13:00"));
    getLocalizedDayPeriod = (locale, dayPeriod) => {
      const date = dayPeriod === "am" ? DATE_AM : DATE_PM;
      const localizedDayPeriod = new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        timeZone: "UTC"
      }).formatToParts(date).find((part) => part.type === "dayPeriod");
      if (localizedDayPeriod) {
        return localizedDayPeriod.value;
      }
      return getFormattedDayPeriod(dayPeriod);
    };
    formatValue = (value) => {
      return Array.isArray(value) ? value.join(",") : value;
    };
  }
});

export {
  isSameDay,
  isBefore,
  isAfter,
  warnIfValueOutOfBounds,
  getHourCycle,
  is24Hour,
  getNumDaysInMonth,
  isMonthFirstLocale,
  isLocaleDayPeriodRTL,
  convertToArrayOfNumbers,
  getPartsFromCalendarDay,
  parseDate,
  clampDate,
  parseAmPm,
  parseMaxParts,
  parseMinParts,
  convertDataToISO,
  getStartOfWeek,
  getEndOfWeek,
  getNextDay,
  getPreviousDay,
  getPreviousWeek,
  getNextWeek,
  getPreviousMonth,
  getNextMonth,
  getPreviousYear,
  getNextYear,
  getInternalHourValue,
  calculateHourFromAMPM,
  validateParts,
  getClosestValidDate,
  getLocalizedTime,
  addTimePadding,
  getFormattedHour,
  generateDayAriaLabel,
  getMonthAndYear,
  getDay,
  getYear,
  getLocalizedDateTime,
  getTodayLabel,
  removeDateTzOffset,
  getLocalizedDayPeriod,
  formatValue,
  init_format_Ck1cw5z7
};
//# debugId=ecd29df6-56a2-51c5-8b0d-80f041e0de1a
//# sourceMappingURL=chunk-F3PJBULH.js.map
