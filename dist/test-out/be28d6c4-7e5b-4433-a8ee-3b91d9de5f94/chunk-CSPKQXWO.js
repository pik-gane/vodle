import {
  addTimePadding,
  calculateHourFromAMPM,
  clampDate,
  convertDataToISO,
  convertToArrayOfNumbers,
  formatValue,
  generateDayAriaLabel,
  getClosestValidDate,
  getDay,
  getEndOfWeek,
  getFormattedHour,
  getHourCycle,
  getInternalHourValue,
  getLocalizedDateTime,
  getLocalizedDayPeriod,
  getLocalizedTime,
  getMonthAndYear,
  getNextDay,
  getNextMonth,
  getNextWeek,
  getNextYear,
  getNumDaysInMonth,
  getPartsFromCalendarDay,
  getPreviousDay,
  getPreviousMonth,
  getPreviousWeek,
  getPreviousYear,
  getStartOfWeek,
  getTodayLabel,
  getYear,
  init_format_Ck1cw5z7,
  is24Hour,
  isAfter,
  isBefore,
  isLocaleDayPeriodRTL,
  isMonthFirstLocale,
  isSameDay,
  parseAmPm,
  parseDate,
  parseMaxParts,
  parseMinParts,
  removeDateTzOffset,
  validateParts,
  warnIfValueOutOfBounds
} from "./chunk-F3PJBULH.js";
import {
  init_focus_visible_BmVRXR1y,
  startFocusVisible
} from "./chunk-BXZ5KVKO.js";
import {
  caretDownSharp,
  caretUpSharp,
  chevronBack,
  chevronDown,
  chevronForward,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  FOCUS_TRAP_DISABLE_CLASS,
  init_overlays_DmDY_El7
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  getElementRoot,
  init_helpers_BJqKF1pr,
  raf,
  renderHiddenInput
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
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
  config,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonError,
  printIonWarning,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-datetime.entry.js
var getToday, minutes, hour11, hour12, hour23, hour24, getDaysOfWeek, getDaysOfMonth, getHourData, generateTime, generateMonths, getMonthColumnData, getDayColumnData, getYearColumnData, getAllMonthsInRange, getCombinedDateColumnData, getTimeColumnsData, isYearDisabled, isDayDisabled, getCalendarDayState, isMonthDisabled, isPrevMonthDisabled, isNextMonthDisabled, getHighlightStyles, warnIfTimeZoneProvided, checkForPresentationFormatMismatch, datetimeIosCss, datetimeMdCss, Datetime, datetimeIds, CANCEL_ROLE, CONFIRM_ROLE, WHEEL_PART, WHEEL_ITEM_PART, WHEEL_ITEM_ACTIVE_PART;
var init_ion_datetime_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-datetime.entry.js"() {
    init_index_BpRUsN_W();
    init_focus_visible_BmVRXR1y();
    init_helpers_BJqKF1pr();
    init_overlays_DmDY_El7();
    init_dir_Dojwmvde();
    init_theme_byZM6qHV();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    init_format_Ck1cw5z7();
    init_framework_delegate_CDjM1vRH();
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getToday = () => {
      return removeDateTzOffset(/* @__PURE__ */ new Date()).toISOString();
    };
    minutes = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59
    ];
    hour11 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    hour12 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    hour23 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    hour24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
    getDaysOfWeek = (locale, mode, firstDayOfWeek = 0) => {
      const weekdayFormat = mode === "ios" ? "short" : "narrow";
      const intl = new Intl.DateTimeFormat(locale, { weekday: weekdayFormat });
      const startDate = /* @__PURE__ */ new Date("11/01/2020");
      const daysOfWeek = [];
      for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        daysOfWeek.push(intl.format(currentDate));
      }
      return daysOfWeek;
    };
    getDaysOfMonth = (month, year, firstDayOfWeek, showAdjacentDays = false) => {
      const numDays = getNumDaysInMonth(month, year);
      let previousNumDays;
      if (month === 1) {
        previousNumDays = getNumDaysInMonth(12, year - 1);
      } else {
        previousNumDays = getNumDaysInMonth(month - 1, year);
      }
      const firstOfMonth = (/* @__PURE__ */ new Date(`${month}/1/${year}`)).getDay();
      const offset = firstOfMonth >= firstDayOfWeek ? firstOfMonth - (firstDayOfWeek + 1) : 6 - (firstDayOfWeek - firstOfMonth);
      let days = [];
      for (let i = 1; i <= numDays; i++) {
        days.push({ day: i, dayOfWeek: (offset + i) % 7, isAdjacentDay: false });
      }
      if (showAdjacentDays) {
        for (let i = 0; i <= offset; i++) {
          days = [{ day: previousNumDays - i, dayOfWeek: (previousNumDays - i) % 7, isAdjacentDay: true }, ...days];
        }
        const positiveOffset = 41 - (numDays + offset);
        for (let i = 0; i < positiveOffset; i++) {
          days.push({ day: i + 1, dayOfWeek: (numDays + offset + i) % 7, isAdjacentDay: true });
        }
      } else {
        for (let i = 0; i <= offset; i++) {
          days = [{ day: null, dayOfWeek: null, isAdjacentDay: false }, ...days];
        }
      }
      return days;
    };
    getHourData = (hourCycle) => {
      switch (hourCycle) {
        case "h11":
          return hour11;
        case "h12":
          return hour12;
        case "h23":
          return hour23;
        case "h24":
          return hour24;
        default:
          throw new Error(`Invalid hour cycle "${hourCycle}"`);
      }
    };
    generateTime = (locale, refParts, hourCycle = "h12", minParts, maxParts, hourValues, minuteValues) => {
      const computedHourCycle = getHourCycle(locale, hourCycle);
      const use24Hour = is24Hour(computedHourCycle);
      let processedHours = getHourData(computedHourCycle);
      let processedMinutes = minutes;
      let isAMAllowed = true;
      let isPMAllowed = true;
      if (hourValues) {
        processedHours = processedHours.filter((hour) => hourValues.includes(hour));
      }
      if (minuteValues) {
        processedMinutes = processedMinutes.filter((minute) => minuteValues.includes(minute));
      }
      if (minParts) {
        if (isSameDay(refParts, minParts)) {
          if (minParts.hour !== void 0) {
            processedHours = processedHours.filter((hour) => {
              const convertedHour = refParts.ampm === "pm" ? (hour + 12) % 24 : hour;
              return (use24Hour ? hour : convertedHour) >= minParts.hour;
            });
            isAMAllowed = minParts.hour < 13;
          }
          if (minParts.minute !== void 0) {
            let isPastMinHour = false;
            if (minParts.hour !== void 0 && refParts.hour !== void 0) {
              if (refParts.hour > minParts.hour) {
                isPastMinHour = true;
              }
            }
            processedMinutes = processedMinutes.filter((minute) => {
              if (isPastMinHour) {
                return true;
              }
              return minute >= minParts.minute;
            });
          }
        } else if (isBefore(refParts, minParts)) {
          processedHours = [];
          processedMinutes = [];
          isAMAllowed = isPMAllowed = false;
        }
      }
      if (maxParts) {
        if (isSameDay(refParts, maxParts)) {
          if (maxParts.hour !== void 0) {
            processedHours = processedHours.filter((hour) => {
              const convertedHour = refParts.ampm === "pm" ? (hour + 12) % 24 : hour;
              return (use24Hour ? hour : convertedHour) <= maxParts.hour;
            });
            isPMAllowed = maxParts.hour >= 12;
          }
          if (maxParts.minute !== void 0 && refParts.hour === maxParts.hour) {
            processedMinutes = processedMinutes.filter((minute) => minute <= maxParts.minute);
          }
        } else if (isAfter(refParts, maxParts)) {
          processedHours = [];
          processedMinutes = [];
          isAMAllowed = isPMAllowed = false;
        }
      }
      return {
        hours: processedHours,
        minutes: processedMinutes,
        am: isAMAllowed,
        pm: isPMAllowed
      };
    };
    generateMonths = (refParts, forcedDate) => {
      const current = { month: refParts.month, year: refParts.year, day: refParts.day };
      if (forcedDate !== void 0 && (refParts.month !== forcedDate.month || refParts.year !== forcedDate.year)) {
        const forced = { month: forcedDate.month, year: forcedDate.year, day: forcedDate.day };
        const forcedMonthIsBefore = isBefore(forced, current);
        return forcedMonthIsBefore ? [forced, current, getNextMonth(refParts)] : [getPreviousMonth(refParts), current, forced];
      }
      return [getPreviousMonth(refParts), current, getNextMonth(refParts)];
    };
    getMonthColumnData = (locale, refParts, minParts, maxParts, monthValues, formatOptions = {
      month: "long"
    }) => {
      const { year } = refParts;
      const months = [];
      if (monthValues !== void 0) {
        let processedMonths = monthValues;
        if (maxParts?.month !== void 0) {
          processedMonths = processedMonths.filter((month) => month <= maxParts.month);
        }
        if (minParts?.month !== void 0) {
          processedMonths = processedMonths.filter((month) => month >= minParts.month);
        }
        processedMonths.forEach((processedMonth) => {
          const date = /* @__PURE__ */ new Date(`${processedMonth}/1/${year} GMT+0000`);
          const monthString = new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, formatOptions), { timeZone: "UTC" })).format(date);
          months.push({ text: monthString, value: processedMonth });
        });
      } else {
        const maxMonth = maxParts && maxParts.year === year ? maxParts.month : 12;
        const minMonth = minParts && minParts.year === year ? minParts.month : 1;
        for (let i = minMonth; i <= maxMonth; i++) {
          const date = /* @__PURE__ */ new Date(`${i}/1/${year} GMT+0000`);
          const monthString = new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, formatOptions), { timeZone: "UTC" })).format(date);
          months.push({ text: monthString, value: i });
        }
      }
      return months;
    };
    getDayColumnData = (locale, refParts, minParts, maxParts, dayValues, formatOptions = {
      day: "numeric"
    }) => {
      const { month, year } = refParts;
      const days = [];
      const numDaysInMonth = getNumDaysInMonth(month, year);
      const maxDay = maxParts?.day !== null && maxParts?.day !== void 0 && maxParts.year === year && maxParts.month === month ? maxParts.day : numDaysInMonth;
      const minDay = minParts?.day !== null && minParts?.day !== void 0 && minParts.year === year && minParts.month === month ? minParts.day : 1;
      if (dayValues !== void 0) {
        let processedDays = dayValues;
        processedDays = processedDays.filter((day) => day >= minDay && day <= maxDay);
        processedDays.forEach((processedDay) => {
          const date = /* @__PURE__ */ new Date(`${month}/${processedDay}/${year} GMT+0000`);
          const dayString = new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, formatOptions), { timeZone: "UTC" })).format(date);
          days.push({ text: dayString, value: processedDay });
        });
      } else {
        for (let i = minDay; i <= maxDay; i++) {
          const date = /* @__PURE__ */ new Date(`${month}/${i}/${year} GMT+0000`);
          const dayString = new Intl.DateTimeFormat(locale, __spreadProps(__spreadValues({}, formatOptions), { timeZone: "UTC" })).format(date);
          days.push({ text: dayString, value: i });
        }
      }
      return days;
    };
    getYearColumnData = (locale, refParts, minParts, maxParts, yearValues) => {
      let processedYears = [];
      if (yearValues !== void 0) {
        processedYears = yearValues;
        if (maxParts?.year !== void 0) {
          processedYears = processedYears.filter((year) => year <= maxParts.year);
        }
        if (minParts?.year !== void 0) {
          processedYears = processedYears.filter((year) => year >= minParts.year);
        }
      } else {
        const { year } = refParts;
        const maxYear = maxParts?.year ?? year;
        const minYear = minParts?.year ?? year - 100;
        for (let i = minYear; i <= maxYear; i++) {
          processedYears.push(i);
        }
      }
      return processedYears.map((year) => ({
        text: getYear(locale, { year, month: refParts.month, day: refParts.day }),
        value: year
      }));
    };
    getAllMonthsInRange = (currentParts, maxParts) => {
      if (currentParts.month === maxParts.month && currentParts.year === maxParts.year) {
        return [currentParts];
      }
      return [currentParts, ...getAllMonthsInRange(getNextMonth(currentParts), maxParts)];
    };
    getCombinedDateColumnData = (locale, todayParts, minParts, maxParts, dayValues, monthValues) => {
      let items = [];
      let parts = [];
      let months = getAllMonthsInRange(minParts, maxParts);
      if (monthValues) {
        months = months.filter(({ month }) => monthValues.includes(month));
      }
      months.forEach((monthObject) => {
        const referenceMonth = { month: monthObject.month, day: null, year: monthObject.year };
        const monthDays = getDayColumnData(locale, referenceMonth, minParts, maxParts, dayValues, {
          month: "short",
          day: "numeric",
          weekday: "short"
        });
        const dateParts = [];
        const dateColumnItems = [];
        monthDays.forEach((dayObject) => {
          const isToday = isSameDay(__spreadProps(__spreadValues({}, referenceMonth), { day: dayObject.value }), todayParts);
          dateColumnItems.push({
            text: isToday ? getTodayLabel(locale) : dayObject.text,
            value: `${referenceMonth.year}-${referenceMonth.month}-${dayObject.value}`
          });
          dateParts.push({
            month: referenceMonth.month,
            year: referenceMonth.year,
            day: dayObject.value
          });
        });
        parts = [...parts, ...dateParts];
        items = [...items, ...dateColumnItems];
      });
      return {
        parts,
        items
      };
    };
    getTimeColumnsData = (locale, refParts, hourCycle, minParts, maxParts, allowedHourValues, allowedMinuteValues) => {
      const computedHourCycle = getHourCycle(locale, hourCycle);
      const use24Hour = is24Hour(computedHourCycle);
      const { hours, minutes: minutes2, am, pm } = generateTime(locale, refParts, computedHourCycle, minParts, maxParts, allowedHourValues, allowedMinuteValues);
      const hoursItems = hours.map((hour) => {
        return {
          text: getFormattedHour(hour, computedHourCycle),
          value: getInternalHourValue(hour, use24Hour, refParts.ampm)
        };
      });
      const minutesItems = minutes2.map((minute) => {
        return {
          text: addTimePadding(minute),
          value: minute
        };
      });
      const dayPeriodItems = [];
      if (am && !use24Hour) {
        dayPeriodItems.push({
          text: getLocalizedDayPeriod(locale, "am"),
          value: "am"
        });
      }
      if (pm && !use24Hour) {
        dayPeriodItems.push({
          text: getLocalizedDayPeriod(locale, "pm"),
          value: "pm"
        });
      }
      return {
        minutesData: minutesItems,
        hoursData: hoursItems,
        dayPeriodData: dayPeriodItems
      };
    };
    isYearDisabled = (refYear, minParts, maxParts) => {
      if (minParts && minParts.year > refYear) {
        return true;
      }
      if (maxParts && maxParts.year < refYear) {
        return true;
      }
      return false;
    };
    isDayDisabled = (refParts, minParts, maxParts, dayValues) => {
      if (refParts.day === null) {
        return true;
      }
      if (dayValues !== void 0 && !dayValues.includes(refParts.day)) {
        return true;
      }
      if (minParts && isBefore(refParts, minParts)) {
        return true;
      }
      if (maxParts && isAfter(refParts, maxParts)) {
        return true;
      }
      return false;
    };
    getCalendarDayState = (locale, refParts, activeParts, todayParts, minParts, maxParts, dayValues) => {
      const activePartsArray = Array.isArray(activeParts) ? activeParts : [activeParts];
      const isActive = activePartsArray.find((parts) => isSameDay(refParts, parts)) !== void 0;
      const isToday = isSameDay(refParts, todayParts);
      const disabled = isDayDisabled(refParts, minParts, maxParts, dayValues);
      return {
        disabled,
        isActive,
        isToday,
        ariaSelected: isActive ? "true" : null,
        ariaLabel: generateDayAriaLabel(locale, isToday, refParts),
        text: refParts.day != null ? getDay(locale, refParts) : null
      };
    };
    isMonthDisabled = (refParts, { minParts, maxParts }) => {
      if (isYearDisabled(refParts.year, minParts, maxParts)) {
        return true;
      }
      if (minParts && isBefore(refParts, minParts) || maxParts && isAfter(refParts, maxParts)) {
        return true;
      }
      return false;
    };
    isPrevMonthDisabled = (refParts, minParts, maxParts) => {
      const prevMonth = __spreadProps(__spreadValues({}, getPreviousMonth(refParts)), {
        day: null
      });
      return isMonthDisabled(prevMonth, {
        minParts,
        maxParts
      });
    };
    isNextMonthDisabled = (refParts, maxParts) => {
      const nextMonth = __spreadProps(__spreadValues({}, getNextMonth(refParts)), {
        day: null
      });
      return isMonthDisabled(nextMonth, {
        maxParts
      });
    };
    getHighlightStyles = (highlightedDates, dateIsoString, el) => {
      if (Array.isArray(highlightedDates)) {
        const dateStringWithoutTime = dateIsoString.split("T")[0];
        const matchingHighlight = highlightedDates.find((hd) => hd.date === dateStringWithoutTime);
        if (matchingHighlight) {
          return {
            textColor: matchingHighlight.textColor,
            backgroundColor: matchingHighlight.backgroundColor,
            border: matchingHighlight.border
          };
        }
      } else {
        try {
          return highlightedDates(dateIsoString);
        } catch (e) {
          printIonError("[ion-datetime] - Exception thrown from provided `highlightedDates` callback. Please check your function and try again.", el, e);
        }
      }
      return void 0;
    };
    warnIfTimeZoneProvided = (el, formatOptions) => {
      if (formatOptions?.date?.timeZone || formatOptions?.date?.timeZoneName || formatOptions?.time?.timeZone || formatOptions?.time?.timeZoneName) {
        printIonWarning('[ion-datetime] - "timeZone" and "timeZoneName" are not supported in "formatOptions".', el);
      }
    };
    checkForPresentationFormatMismatch = (el, presentation, formatOptions) => {
      if (!formatOptions)
        return;
      switch (presentation) {
        case "date":
        case "month-year":
        case "month":
        case "year":
          if (formatOptions.date === void 0) {
            printIonWarning(`[ion-datetime] - The '${presentation}' presentation requires a date object in formatOptions.`, el);
          }
          break;
        case "time":
          if (formatOptions.time === void 0) {
            printIonWarning(`[ion-datetime] - The 'time' presentation requires a time object in formatOptions.`, el);
          }
          break;
        case "date-time":
        case "time-date":
          if (formatOptions.date === void 0 && formatOptions.time === void 0) {
            printIonWarning(`[ion-datetime] - The '${presentation}' presentation requires either a date or time object (or both) in formatOptions.`, el);
          }
          break;
      }
    };
    datetimeIosCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;background:var(--background);overflow:hidden}:host(.datetime-size-fixed){width:auto;height:auto}:host(.datetime-size-fixed:not(.datetime-prefer-wheel)){max-width:350px}:host(.datetime-size-fixed.datetime-prefer-wheel){min-width:350px;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}:host(.datetime-size-cover){width:100%}:host .calendar-body,:host .datetime-year{opacity:0}:host(:not(.datetime-ready)) .datetime-year{position:absolute;pointer-events:none}:host(.datetime-ready) .calendar-body{opacity:1}:host(.datetime-ready) .datetime-year{display:none;opacity:1}:host .wheel-order-year-first .day-column{-ms-flex-order:3;order:3;text-align:end}:host .wheel-order-year-first .month-column{-ms-flex-order:2;order:2;text-align:end}:host .wheel-order-year-first .year-column{-ms-flex-order:1;order:1;text-align:start}:host .datetime-calendar,:host .datetime-year{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-flow:column;flex-flow:column}:host(.show-month-and-year) .datetime-year{display:-ms-flexbox;display:flex}:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{display:none}:host(.month-year-picker-open) .datetime-footer{display:none}:host(.datetime-disabled){pointer-events:none}:host(.datetime-disabled) .calendar-days-of-week,:host(.datetime-disabled) .datetime-time{opacity:0.4}:host(.datetime-readonly){pointer-events:none;}:host(.datetime-readonly) .calendar-action-buttons,:host(.datetime-readonly) .calendar-body,:host(.datetime-readonly) .datetime-year{pointer-events:initial}:host(.datetime-readonly) .calendar-day[disabled]:not(.calendar-day-constrained),:host(.datetime-readonly) .datetime-action-buttons ion-button[disabled]{opacity:1}:host .datetime-header .datetime-title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host .datetime-action-buttons.has-clear-button{width:100%}:host .datetime-action-buttons ion-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host .datetime-action-buttons ion-button{--color:var(--ion-color-primary, #0054e9)}.datetime-action-buttons .datetime-action-buttons-container{display:-ms-flexbox;display:flex}:host .calendar-action-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host .calendar-action-buttons ion-button{--background:transparent}:host .calendar-days-of-week{display:grid;grid-template-columns:repeat(7, 1fr);text-align:center}.calendar-days-of-week .day-of-week{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0}:host .calendar-body{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;overflow-x:scroll;overflow-y:hidden;scrollbar-width:none;outline:none}:host .calendar-body .calendar-month{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;scroll-snap-align:start;scroll-snap-stop:always;-ms-flex-negative:0;flex-shrink:0;width:100%}:host .calendar-body .calendar-month-disabled{scroll-snap-align:none}:host .calendar-body::-webkit-scrollbar{display:none}:host .calendar-body .calendar-month-grid{display:grid;grid-template-columns:repeat(7, 1fr)}:host .calendar-day-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-width:0;min-height:0;overflow:visible}.calendar-day{border-radius:50%;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:0px;margin-bottom:0px;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border:none;outline:none;background:none;color:currentColor;font-family:var(--ion-font-family, inherit);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;z-index:0}:host .calendar-day[disabled]{pointer-events:none;opacity:0.4}.calendar-day:not(.calendar-day-adjacent-day):focus{background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2);-webkit-box-shadow:0px 0px 0px 4px rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2);box-shadow:0px 0px 0px 4px rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2)}:host(.ion-color) .calendar-day:not(.calendar-day-adjacent-day):focus{background:rgba(var(--ion-color-base-rgb), 0.2);-webkit-box-shadow:0px 0px 0px 4px rgba(var(--ion-color-base-rgb), 0.2);box-shadow:0px 0px 0px 4px rgba(var(--ion-color-base-rgb), 0.2)}:host .datetime-time{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host(.datetime-presentation-time) .datetime-time{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host ion-popover{--height:200px}:host .time-header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .time-body{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;display:-ms-flexbox;display:flex;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .time-body-active{color:var(--ion-color-primary, #0054e9)}:host(.ion-color) .time-body-active{color:var(--ion-color-base)}:host(.in-item){position:static}:host(.show-month-and-year) .calendar-action-buttons .calendar-month-year-toggle{color:var(--ion-color-primary, #0054e9)}:host(.ion-color.show-month-and-year) .calendar-action-buttons .calendar-month-year-toggle{color:var(--ion-color-base)}.calendar-month-year{min-width:0}.calendar-month-year-toggle{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;position:relative;border:0;outline:none;background:transparent;cursor:pointer;z-index:1}.calendar-month-year-toggle::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0;-webkit-transition:opacity 15ms linear, background-color 15ms linear;transition:opacity 15ms linear, background-color 15ms linear;z-index:-1}.calendar-month-year-toggle.ion-focused::after{background:currentColor}.calendar-month-year-toggle:disabled{opacity:0.3;pointer-events:none}.calendar-month-year-toggle ion-icon{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:0;padding-inline-end:0;padding-top:0;padding-bottom:0;-ms-flex-negative:0;flex-shrink:0}.calendar-month-year-toggle #toggle-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}ion-picker{--highlight-background:var(--wheel-highlight-background);--highlight-border-radius:var(--wheel-highlight-border-radius);--fade-background-rgb:var(--wheel-fade-background-rgb)}:host{--background:var(--ion-color-light, #f4f5f8);--background-rgb:var(--ion-color-light-rgb, 244, 245, 248);--title-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}:host(.datetime-presentation-date-time:not(.datetime-prefer-wheel)),:host(.datetime-presentation-time-date:not(.datetime-prefer-wheel)),:host(.datetime-presentation-date:not(.datetime-prefer-wheel)){min-height:350px}:host .datetime-header{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:16px;padding-bottom:16px;border-bottom:0.55px solid var(--ion-color-step-200, var(--ion-background-color-step-200, #cccccc));font-size:min(0.875rem, 22.4px)}:host .datetime-header .datetime-title{color:var(--title-color)}:host .datetime-header .datetime-selected-date{margin-top:10px}.calendar-month-year-toggle{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;min-height:44px;font-size:min(1rem, 25.6px);font-weight:600}.calendar-month-year-toggle.ion-focused::after{opacity:0.15}.calendar-month-year-toggle #toggle-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:10px;margin-bottom:10px}:host .calendar-action-buttons .calendar-month-year-toggle ion-icon,:host .calendar-action-buttons ion-buttons ion-button{color:var(--ion-color-primary, #0054e9)}:host(.ion-color) .calendar-action-buttons .calendar-month-year-toggle ion-icon,:host(.ion-color) .calendar-action-buttons ion-buttons ion-button{color:var(--ion-color-base)}:host .calendar-action-buttons ion-buttons{-ms-flex-align:stretch;align-items:stretch;height:100%}:host .calendar-action-buttons ion-buttons ion-button{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host .calendar-days-of-week{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0;color:var(--ion-color-step-300, var(--ion-text-color-step-700, #b3b3b3));font-size:min(0.75rem, 19.2px);font-weight:600;line-height:24px;text-transform:uppercase}@supports (border-radius: mod(1px, 1px)){.calendar-days-of-week .day-of-week{width:clamp(20px, calc(mod(min(1rem, 24px), 24px) * 10), 100%);height:24px;overflow:hidden}.calendar-day{border-radius:max(8px, mod(min(1rem, 24px), 24px) * 10)}}@supports ((border-radius: mod(1px, 1px)) and (background: -webkit-named-image(apple-pay-logo-black)) and (not (contain-intrinsic-size: none))) or (not (border-radius: mod(1px, 1px))){.calendar-days-of-week .day-of-week{width:auto;height:auto;overflow:initial}.calendar-day{border-radius:32px}}:host .calendar-body .calendar-month .calendar-month-grid{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;-ms-flex-align:center;align-items:center;height:calc(100% - 16px)}:host .calendar-day-wrapper{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;height:0;min-height:1rem}:host .calendar-day{width:40px;min-width:40px;height:40px;font-size:min(1.25rem, 32px)}.calendar-day.calendar-day-active{background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2);font-size:min(1.375rem, 35.2px)}:host(.ion-color) .calendar-day.calendar-day-active{background:rgba(var(--ion-color-base-rgb), 0.2)}:host .calendar-day.calendar-day-today{color:var(--ion-color-primary, #0054e9)}:host(.ion-color) .calendar-day.calendar-day-today{color:var(--ion-color-base)}:host .calendar-day.calendar-day-active,:host .calendar-day.calendar-day-adjacent-day.calendar-day-active{color:var(--ion-color-primary, #0054e9);font-weight:600}:host(.ion-color) .calendar-day.calendar-day-active,:host(.ion-color) .calendar-day.calendar-day-adjacent-day.calendar-day-active{color:var(--ion-color-base)}:host .calendar-day.calendar-day-today.calendar-day-active{background:var(--ion-color-primary, #0054e9);color:var(--ion-color-primary-contrast, #fff)}:host(.ion-color) .calendar-day.calendar-day-today.calendar-day-active{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host .calendar-day.calendar-day-adjacent-day{color:var(--ion-color-step-300, var(--ion-text-color-step-700, #b3b3b3))}:host .datetime-time{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:8px;padding-bottom:16px;font-size:min(1rem, 25.6px)}:host .datetime-time .time-header{font-weight:600}:host .datetime-buttons{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;border-top:0.55px solid var(--ion-color-step-200, var(--ion-background-color-step-200, #cccccc))}:host .datetime-buttons ::slotted(ion-buttons),:host .datetime-buttons ion-buttons{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host .datetime-action-buttons{width:100%}`;
    datetimeMdCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;background:var(--background);overflow:hidden}:host(.datetime-size-fixed){width:auto;height:auto}:host(.datetime-size-fixed:not(.datetime-prefer-wheel)){max-width:350px}:host(.datetime-size-fixed.datetime-prefer-wheel){min-width:350px;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content}:host(.datetime-size-cover){width:100%}:host .calendar-body,:host .datetime-year{opacity:0}:host(:not(.datetime-ready)) .datetime-year{position:absolute;pointer-events:none}:host(.datetime-ready) .calendar-body{opacity:1}:host(.datetime-ready) .datetime-year{display:none;opacity:1}:host .wheel-order-year-first .day-column{-ms-flex-order:3;order:3;text-align:end}:host .wheel-order-year-first .month-column{-ms-flex-order:2;order:2;text-align:end}:host .wheel-order-year-first .year-column{-ms-flex-order:1;order:1;text-align:start}:host .datetime-calendar,:host .datetime-year{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-flow:column;flex-flow:column}:host(.show-month-and-year) .datetime-year{display:-ms-flexbox;display:flex}:host(.show-month-and-year) .calendar-next-prev,:host(.show-month-and-year) .calendar-days-of-week,:host(.show-month-and-year) .calendar-body,:host(.show-month-and-year) .datetime-time{display:none}:host(.month-year-picker-open) .datetime-footer{display:none}:host(.datetime-disabled){pointer-events:none}:host(.datetime-disabled) .calendar-days-of-week,:host(.datetime-disabled) .datetime-time{opacity:0.4}:host(.datetime-readonly){pointer-events:none;}:host(.datetime-readonly) .calendar-action-buttons,:host(.datetime-readonly) .calendar-body,:host(.datetime-readonly) .datetime-year{pointer-events:initial}:host(.datetime-readonly) .calendar-day[disabled]:not(.calendar-day-constrained),:host(.datetime-readonly) .datetime-action-buttons ion-button[disabled]{opacity:1}:host .datetime-header .datetime-title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host .datetime-action-buttons.has-clear-button{width:100%}:host .datetime-action-buttons ion-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host .datetime-action-buttons ion-button{--color:var(--ion-color-primary, #0054e9)}.datetime-action-buttons .datetime-action-buttons-container{display:-ms-flexbox;display:flex}:host .calendar-action-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host .calendar-action-buttons ion-button{--background:transparent}:host .calendar-days-of-week{display:grid;grid-template-columns:repeat(7, 1fr);text-align:center}.calendar-days-of-week .day-of-week{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0}:host .calendar-body{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;overflow-x:scroll;overflow-y:hidden;scrollbar-width:none;outline:none}:host .calendar-body .calendar-month{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;scroll-snap-align:start;scroll-snap-stop:always;-ms-flex-negative:0;flex-shrink:0;width:100%}:host .calendar-body .calendar-month-disabled{scroll-snap-align:none}:host .calendar-body::-webkit-scrollbar{display:none}:host .calendar-body .calendar-month-grid{display:grid;grid-template-columns:repeat(7, 1fr)}:host .calendar-day-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-width:0;min-height:0;overflow:visible}.calendar-day{border-radius:50%;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:0px;margin-bottom:0px;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border:none;outline:none;background:none;color:currentColor;font-family:var(--ion-font-family, inherit);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;z-index:0}:host .calendar-day[disabled]{pointer-events:none;opacity:0.4}.calendar-day:not(.calendar-day-adjacent-day):focus{background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2);-webkit-box-shadow:0px 0px 0px 4px rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2);box-shadow:0px 0px 0px 4px rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2)}:host(.ion-color) .calendar-day:not(.calendar-day-adjacent-day):focus{background:rgba(var(--ion-color-base-rgb), 0.2);-webkit-box-shadow:0px 0px 0px 4px rgba(var(--ion-color-base-rgb), 0.2);box-shadow:0px 0px 0px 4px rgba(var(--ion-color-base-rgb), 0.2)}:host .datetime-time{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host(.datetime-presentation-time) .datetime-time{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}:host ion-popover{--height:200px}:host .time-header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .time-body{border-radius:8px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px;display:-ms-flexbox;display:flex;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .time-body-active{color:var(--ion-color-primary, #0054e9)}:host(.ion-color) .time-body-active{color:var(--ion-color-base)}:host(.in-item){position:static}:host(.show-month-and-year) .calendar-action-buttons .calendar-month-year-toggle{color:var(--ion-color-primary, #0054e9)}:host(.ion-color.show-month-and-year) .calendar-action-buttons .calendar-month-year-toggle{color:var(--ion-color-base)}.calendar-month-year{min-width:0}.calendar-month-year-toggle{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;position:relative;border:0;outline:none;background:transparent;cursor:pointer;z-index:1}.calendar-month-year-toggle::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0;-webkit-transition:opacity 15ms linear, background-color 15ms linear;transition:opacity 15ms linear, background-color 15ms linear;z-index:-1}.calendar-month-year-toggle.ion-focused::after{background:currentColor}.calendar-month-year-toggle:disabled{opacity:0.3;pointer-events:none}.calendar-month-year-toggle ion-icon{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:0;padding-inline-end:0;padding-top:0;padding-bottom:0;-ms-flex-negative:0;flex-shrink:0}.calendar-month-year-toggle #toggle-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}ion-picker{--highlight-background:var(--wheel-highlight-background);--highlight-border-radius:var(--wheel-highlight-border-radius);--fade-background-rgb:var(--wheel-fade-background-rgb)}:host{--background:var(--ion-color-step-100, var(--ion-background-color-step-100, #ffffff));--title-color:var(--ion-color-primary-contrast, #fff)}:host(.ion-color){--title-color:var(--ion-color-contrast)}:host .datetime-header{-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:20px;padding-bottom:20px;background:var(--ion-color-primary, #0054e9);color:var(--title-color)}:host(.ion-color) .datetime-header{background:var(--ion-color-base)}:host .datetime-header .datetime-title{font-size:0.75rem;text-transform:uppercase}:host .datetime-header .datetime-selected-date{margin-top:30px;font-size:2.125rem}:host .calendar-action-buttons ion-button{--color:var(--ion-color-step-650, var(--ion-text-color-step-350, #595959))}.calendar-month-year-toggle{-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:12px;padding-bottom:12px;min-height:48px;background:transparent;color:var(--ion-color-step-650, var(--ion-text-color-step-350, #595959));z-index:1}.calendar-month-year-toggle.ion-focused::after{opacity:0.04}.calendar-month-year-toggle ion-ripple-effect{color:currentColor}@media (any-hover: hover){.calendar-month-year-toggle.ion-activatable:not(.ion-focused):hover::after{background:currentColor;opacity:0.04}}:host .calendar-days-of-week{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:0px;padding-bottom:0px;color:var(--ion-color-step-500, var(--ion-text-color-step-500, gray));font-size:0.875rem;line-height:36px}:host .calendar-body .calendar-month .calendar-month-grid{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:4px;padding-bottom:4px;grid-template-rows:repeat(6, 1fr)}:host .calendar-day{width:42px;min-width:42px;height:42px;font-size:0.875rem}:host .calendar-day.calendar-day-today{border:1px solid var(--ion-color-primary, #0054e9);color:var(--ion-color-primary, #0054e9)}:host(.ion-color) .calendar-day.calendar-day-today{border:1px solid var(--ion-color-base);color:var(--ion-color-base)}:host .calendar-day.calendar-day-active,:host .calendar-day.calendar-day-adjacent-day.calendar-day-active{color:var(--ion-color-primary-contrast, #fff)}:host(.ion-color) .calendar-day.calendar-day-active,:host(.ion-color) .calendar-day.calendar-day-adjacent-day.calendar-day-active{color:var(--ion-color-contrast)}.calendar-day.calendar-day-active,.calendar-day.calendar-day-active:focus{border:1px solid var(--ion-color-primary, #0054e9);background:var(--ion-color-primary, #0054e9)}:host(.ion-color) .calendar-day.calendar-day-active,:host(.ion-color) .calendar-day.calendar-day-active:focus{border:1px solid var(--ion-color-base);background:var(--ion-color-base)}:host .calendar-day.calendar-day-adjacent-day{color:var(--ion-color-step-500, var(--ion-text-color-step-500, gray))}:host .datetime-time{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:8px;padding-bottom:8px}:host .time-header{color:var(--ion-color-step-650, var(--ion-text-color-step-350, #595959))}:host(.datetime-presentation-month) .datetime-year,:host(.datetime-presentation-year) .datetime-year,:host(.datetime-presentation-month-year) .datetime-year{margin-top:20px;margin-bottom:20px}:host .datetime-buttons{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:10px;padding-bottom:10px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end}`;
    Datetime = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionCancel = createEvent(this, "ionCancel", 7);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionValueChange = createEvent(this, "ionValueChange", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.ionRender = createEvent(this, "ionRender", 7);
        this.inputId = `ion-dt-${datetimeIds++}`;
        this.prevPresentation = null;
        this.showMonthAndYear = false;
        this.activeParts = [];
        this.workingParts = {
          month: 5,
          day: 28,
          year: 2021,
          hour: 13,
          minute: 52,
          ampm: "pm",
          isAdjacentDay: false
        };
        this.isTimePopoverOpen = false;
        this.name = this.inputId;
        this.disabled = false;
        this.readonly = false;
        this.showAdjacentDays = false;
        this.presentation = "date-time";
        this.cancelText = "Cancel";
        this.doneText = "Done";
        this.clearText = "Clear";
        this.locale = "default";
        this.firstDayOfWeek = 0;
        this.multiple = false;
        this.showDefaultTitle = false;
        this.showDefaultButtons = false;
        this.showClearButton = false;
        this.showDefaultTimeLabel = true;
        this.size = "fixed";
        this.preferWheel = false;
        this.warnIfIncorrectValueUsage = () => {
          const { multiple, value } = this;
          if (!multiple && Array.isArray(value)) {
            printIonWarning(`[ion-datetime] - An array of values was passed, but multiple is "false". This is incorrect usage and may result in unexpected behaviors. To dismiss this warning, pass a string to the "value" property when multiple="false".

  Value Passed: [${value.map((v) => `'${v}'`).join(", ")}]
`, this.el);
          }
        };
        this.setValue = (value) => {
          this.value = value;
          this.ionChange.emit({ value });
        };
        this.getActivePartsWithFallback = () => {
          const { defaultParts } = this;
          return this.getActivePart() ?? defaultParts;
        };
        this.getActivePart = () => {
          const { activeParts } = this;
          return Array.isArray(activeParts) ? activeParts[0] : activeParts;
        };
        this.closeParentOverlay = (role) => {
          const popoverOrModal = this.el.closest("ion-modal, ion-popover");
          if (popoverOrModal) {
            popoverOrModal.dismiss(void 0, role);
          }
        };
        this.setWorkingParts = (parts) => {
          this.workingParts = __spreadValues({}, parts);
        };
        this.setActiveParts = (parts, removeDate = false) => {
          if (this.readonly) {
            return;
          }
          const { multiple, minParts, maxParts, activeParts } = this;
          const validatedParts = validateParts(parts, minParts, maxParts);
          this.setWorkingParts(validatedParts);
          if (multiple) {
            const activePartsArray = Array.isArray(activeParts) ? activeParts : [activeParts];
            if (removeDate) {
              this.activeParts = activePartsArray.filter((p) => !isSameDay(p, validatedParts));
            } else {
              this.activeParts = [...activePartsArray, validatedParts];
            }
          } else {
            this.activeParts = __spreadValues({}, validatedParts);
          }
          const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
          if (hasSlottedButtons || this.showDefaultButtons) {
            return;
          }
          this.confirm();
        };
        this.initializeKeyboardListeners = () => {
          const calendarBodyRef = this.calendarBodyRef;
          if (!calendarBodyRef) {
            return;
          }
          const root = this.el.shadowRoot;
          const currentMonth = calendarBodyRef.querySelector(".calendar-month:nth-of-type(2)");
          const checkCalendarBodyFocus = (ev) => {
            const record = ev[0];
            if (record.oldValue?.includes("ion-focused") || !calendarBodyRef.classList.contains("ion-focused")) {
              return;
            }
            this.focusWorkingDay(currentMonth);
          };
          const mo = new MutationObserver(checkCalendarBodyFocus);
          mo.observe(calendarBodyRef, { attributeFilter: ["class"], attributeOldValue: true });
          this.destroyKeyboardMO = () => {
            mo?.disconnect();
          };
          calendarBodyRef.addEventListener("keydown", (ev) => {
            const activeElement = root.activeElement;
            if (!activeElement || !activeElement.classList.contains("calendar-day")) {
              return;
            }
            const parts = getPartsFromCalendarDay(activeElement);
            let partsToFocus;
            switch (ev.key) {
              case "ArrowDown":
                ev.preventDefault();
                partsToFocus = getNextWeek(parts);
                break;
              case "ArrowUp":
                ev.preventDefault();
                partsToFocus = getPreviousWeek(parts);
                break;
              case "ArrowRight":
                ev.preventDefault();
                partsToFocus = getNextDay(parts);
                break;
              case "ArrowLeft":
                ev.preventDefault();
                partsToFocus = getPreviousDay(parts);
                break;
              case "Home":
                ev.preventDefault();
                partsToFocus = getStartOfWeek(parts);
                break;
              case "End":
                ev.preventDefault();
                partsToFocus = getEndOfWeek(parts);
                break;
              case "PageUp":
                ev.preventDefault();
                partsToFocus = ev.shiftKey ? getPreviousYear(parts) : getPreviousMonth(parts);
                break;
              case "PageDown":
                ev.preventDefault();
                partsToFocus = ev.shiftKey ? getNextYear(parts) : getNextMonth(parts);
                break;
              /**
               * Do not preventDefault here
               * as we do not want to override other
               * browser defaults such as pressing Enter/Space
               * to select a day.
               */
              default:
                return;
            }
            if (isDayDisabled(partsToFocus, this.minParts, this.maxParts)) {
              return;
            }
            this.setWorkingParts(__spreadValues(__spreadValues({}, this.workingParts), partsToFocus));
            requestAnimationFrame(() => this.focusWorkingDay(currentMonth));
          });
        };
        this.focusWorkingDay = (currentMonth) => {
          const { day, month, year } = this.workingParts;
          const firstOfMonth = (/* @__PURE__ */ new Date(`${month}/1/${year}`)).getDay();
          const offset = firstOfMonth >= this.firstDayOfWeek ? firstOfMonth - this.firstDayOfWeek : 7 - (this.firstDayOfWeek - firstOfMonth);
          if (day === null) {
            return;
          }
          const dayEl = currentMonth.querySelector(`.calendar-day-wrapper:nth-of-type(${offset + day}) .calendar-day`);
          if (dayEl) {
            dayEl.focus();
          }
        };
        this.processMinParts = () => {
          const { min, defaultParts } = this;
          if (min === void 0) {
            this.minParts = void 0;
            return;
          }
          this.minParts = parseMinParts(min, defaultParts);
        };
        this.processMaxParts = () => {
          const { max, defaultParts } = this;
          if (max === void 0) {
            this.maxParts = void 0;
            return;
          }
          this.maxParts = parseMaxParts(max, defaultParts);
        };
        this.initializeCalendarListener = () => {
          const calendarBodyRef = this.calendarBodyRef;
          if (!calendarBodyRef) {
            return;
          }
          const months = calendarBodyRef.querySelectorAll(".calendar-month");
          const startMonth = months[0];
          const workingMonth = months[1];
          const endMonth = months[2];
          const mode = getIonMode(this);
          const needsiOSRubberBandFix = mode === "ios" && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;
          writeTask(() => {
            calendarBodyRef.scrollLeft = startMonth.clientWidth * (isRTL(this.el) ? -1 : 1);
            const getChangedMonth = (parts) => {
              const box = calendarBodyRef.getBoundingClientRect();
              const condition = isRTL(this.el) ? calendarBodyRef.scrollLeft >= -2 : calendarBodyRef.scrollLeft <= 2;
              const month = condition ? startMonth : endMonth;
              const monthBox = month.getBoundingClientRect();
              if (Math.abs(monthBox.x - box.x) > 2)
                return;
              const { forceRenderDate } = this;
              if (forceRenderDate !== void 0) {
                return { month: forceRenderDate.month, year: forceRenderDate.year, day: forceRenderDate.day };
              }
              if (month === startMonth) {
                return getPreviousMonth(parts);
              } else if (month === endMonth) {
                return getNextMonth(parts);
              } else {
                return;
              }
            };
            const updateActiveMonth = () => {
              if (needsiOSRubberBandFix) {
                calendarBodyRef.style.removeProperty("pointer-events");
                appliediOSRubberBandFix = false;
              }
              const newDate = getChangedMonth(this.workingParts);
              if (!newDate)
                return;
              const { month, day, year } = newDate;
              if (isMonthDisabled({ month, year, day: null }, {
                minParts: __spreadProps(__spreadValues({}, this.minParts), { day: null }),
                maxParts: __spreadProps(__spreadValues({}, this.maxParts), { day: null })
              })) {
                return;
              }
              calendarBodyRef.style.setProperty("overflow", "hidden");
              writeTask(() => {
                this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
                  month,
                  day,
                  year
                }));
                calendarBodyRef.scrollLeft = workingMonth.clientWidth * (isRTL(this.el) ? -1 : 1);
                calendarBodyRef.style.removeProperty("overflow");
                if (this.resolveForceDateScrolling) {
                  this.resolveForceDateScrolling();
                }
                const activeEl = this.el.shadowRoot.activeElement;
                if (activeEl && activeEl.classList.contains("calendar-day")) {
                  activeEl.closest(".calendar-body")?.focus();
                }
              });
            };
            let scrollTimeout;
            let appliediOSRubberBandFix = false;
            const scrollCallback = () => {
              if (scrollTimeout) {
                clearTimeout(scrollTimeout);
              }
              if (!appliediOSRubberBandFix && needsiOSRubberBandFix) {
                calendarBodyRef.style.setProperty("pointer-events", "none");
                appliediOSRubberBandFix = true;
              }
              scrollTimeout = setTimeout(updateActiveMonth, 50);
            };
            calendarBodyRef.addEventListener("scroll", scrollCallback);
            this.destroyCalendarListener = () => {
              calendarBodyRef.removeEventListener("scroll", scrollCallback);
            };
          });
        };
        this.destroyInteractionListeners = () => {
          const { destroyCalendarListener, destroyKeyboardMO } = this;
          if (destroyCalendarListener !== void 0) {
            destroyCalendarListener();
          }
          if (destroyKeyboardMO !== void 0) {
            destroyKeyboardMO();
          }
        };
        this.ensureReadyIfVisible = () => {
          if (this.el.classList.contains("datetime-ready")) {
            return;
          }
          if (!this.hasLayoutBox()) {
            return;
          }
          this.markReady();
        };
        this.hasLayoutBox = () => {
          const { width, height } = this.el.getBoundingClientRect();
          return width > 0 && height > 0;
        };
        this.markReady = () => {
          if (this.el.classList.contains("datetime-ready")) {
            return;
          }
          this.initializeListeners();
          writeTask(() => {
            this.el.classList.add("datetime-ready");
          });
        };
        this.loadTimeoutCleanup = () => {
          if (this.loadTimeout) {
            clearTimeout(this.loadTimeout);
            this.loadTimeout = void 0;
          }
        };
        this.processValue = (value) => {
          const hasValue = value !== null && value !== void 0 && value !== "" && (!Array.isArray(value) || value.length > 0);
          const valueToProcess = hasValue ? parseDate(value) : this.defaultParts;
          const { minParts, maxParts, workingParts, el } = this;
          this.warnIfIncorrectValueUsage();
          if (!valueToProcess) {
            return;
          }
          if (hasValue) {
            warnIfValueOutOfBounds(valueToProcess, minParts, maxParts);
          }
          const singleValue = Array.isArray(valueToProcess) ? valueToProcess[valueToProcess.length - 1] : valueToProcess;
          const targetValue = clampDate(singleValue, minParts, maxParts);
          const { month, day, year, hour, minute } = targetValue;
          const ampm = parseAmPm(hour);
          if (hasValue) {
            if (Array.isArray(valueToProcess)) {
              this.activeParts = [...valueToProcess];
            } else {
              this.activeParts = {
                month,
                day,
                year,
                hour,
                minute,
                ampm
              };
            }
          } else {
            this.activeParts = [];
          }
          const didChangeMonth = month !== void 0 && month !== workingParts.month || year !== void 0 && year !== workingParts.year;
          const bodyIsVisible = el.classList.contains("datetime-ready");
          const { isGridStyle, showMonthAndYear } = this;
          if (isGridStyle && didChangeMonth && bodyIsVisible && !showMonthAndYear) {
            this.animateToDate(targetValue);
          } else {
            this.setWorkingParts({
              month,
              day,
              year,
              hour,
              minute,
              ampm
            });
          }
        };
        this.animateToDate = (targetValue) => __async(this, null, function* () {
          const { workingParts } = this;
          this.forceRenderDate = targetValue;
          const forceDateScrollingPromise = new Promise((resolve) => {
            this.resolveForceDateScrolling = resolve;
          });
          const targetMonthIsBefore = isBefore(targetValue, workingParts);
          targetMonthIsBefore ? this.prevMonth() : this.nextMonth();
          yield forceDateScrollingPromise;
          this.resolveForceDateScrolling = void 0;
          this.forceRenderDate = void 0;
        });
        this.onFocus = () => {
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.ionBlur.emit();
        };
        this.hasValue = () => {
          return this.value != null;
        };
        this.nextMonth = () => {
          const calendarBodyRef = this.calendarBodyRef;
          if (!calendarBodyRef) {
            return;
          }
          const nextMonth = calendarBodyRef.querySelector(".calendar-month:last-of-type");
          if (!nextMonth) {
            return;
          }
          const left = nextMonth.offsetWidth * 2;
          const scrollMode = config.getBoolean("animated", true) ? "smooth" : "instant";
          calendarBodyRef.scrollTo({
            top: 0,
            left: left * (isRTL(this.el) ? -1 : 1),
            behavior: scrollMode
          });
        };
        this.prevMonth = () => {
          const calendarBodyRef = this.calendarBodyRef;
          if (!calendarBodyRef) {
            return;
          }
          const prevMonth = calendarBodyRef.querySelector(".calendar-month:first-of-type");
          if (!prevMonth) {
            return;
          }
          const left = prevMonth.offsetWidth * 2;
          const scrollMode = config.getBoolean("animated", true) ? "smooth" : "instant";
          calendarBodyRef.scrollTo({
            top: 0,
            left: left * (isRTL(this.el) ? 1 : -1),
            behavior: scrollMode
          });
        };
        this.toggleMonthAndYearView = () => {
          this.showMonthAndYear = !this.showMonthAndYear;
        };
      }
      formatOptionsChanged() {
        const { el, formatOptions, presentation } = this;
        checkForPresentationFormatMismatch(el, presentation, formatOptions);
        warnIfTimeZoneProvided(el, formatOptions);
      }
      disabledChanged() {
        this.emitStyle();
      }
      minChanged() {
        this.processMinParts();
      }
      maxChanged() {
        this.processMaxParts();
      }
      presentationChanged() {
        const { el, formatOptions, presentation } = this;
        checkForPresentationFormatMismatch(el, presentation, formatOptions);
      }
      get isGridStyle() {
        const { presentation, preferWheel } = this;
        const hasDatePresentation = presentation === "date" || presentation === "date-time" || presentation === "time-date";
        return hasDatePresentation && !preferWheel;
      }
      yearValuesChanged() {
        this.parsedYearValues = convertToArrayOfNumbers(this.yearValues);
      }
      monthValuesChanged() {
        this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues);
      }
      dayValuesChanged() {
        this.parsedDayValues = convertToArrayOfNumbers(this.dayValues);
      }
      hourValuesChanged() {
        this.parsedHourValues = convertToArrayOfNumbers(this.hourValues);
      }
      minuteValuesChanged() {
        this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues);
      }
      /**
       * Update the datetime value when the value changes
       */
      valueChanged() {
        return __async(this, null, function* () {
          const { value } = this;
          if (this.hasValue()) {
            this.processValue(value);
          }
          this.emitStyle();
          this.ionValueChange.emit({ value });
        });
      }
      /**
       * Confirms the selected datetime value, updates the
       * `value` property, and optionally closes the popover
       * or modal that the datetime was presented in.
       *
       * @param closeOverlay If `true`, closes the parent overlay. Defaults to `false`.
       */
      confirm(closeOverlay = false) {
        return __async(this, null, function* () {
          const { isCalendarPicker, activeParts, preferWheel, workingParts } = this;
          if (activeParts !== void 0 || !isCalendarPicker) {
            const activePartsIsArray = Array.isArray(activeParts);
            if (activePartsIsArray && activeParts.length === 0) {
              if (preferWheel) {
                this.setValue(convertDataToISO(workingParts));
              } else {
                this.setValue(void 0);
              }
            } else {
              this.setValue(convertDataToISO(activeParts));
            }
          }
          if (closeOverlay) {
            this.closeParentOverlay(CONFIRM_ROLE);
          }
        });
      }
      /**
       * Resets the internal state of the datetime but does not update the value.
       * Passing a valid ISO-8601 string will reset the state of the component to the provided date.
       * If no value is provided, the internal state will be reset to the clamped value of the min, max and today.
       *
       * @param startDate A valid [ISO-8601 string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) to reset the datetime state to.
       */
      reset(startDate) {
        return __async(this, null, function* () {
          this.processValue(startDate);
        });
      }
      /**
       * Emits the ionCancel event and
       * optionally closes the popover
       * or modal that the datetime was
       * presented in.
       *
       * @param closeOverlay If `true`, closes the parent overlay. Defaults to `false`.
       */
      cancel(closeOverlay = false) {
        return __async(this, null, function* () {
          this.ionCancel.emit();
          if (closeOverlay) {
            this.closeParentOverlay(CANCEL_ROLE);
          }
        });
      }
      /**
       * Returns the default parts the datetime falls back to when no value is set:
       * today's date and time snapped to the closest value allowed by the
       * component's constraints (`min`, `max`, and the `*Values` props).
       *
       * @internal
       */
      getDefaultPart() {
        return __async(this, null, function* () {
          return this.defaultParts;
        });
      }
      get isCalendarPicker() {
        const { presentation } = this;
        return presentation === "date" || presentation === "date-time" || presentation === "time-date";
      }
      connectedCallback() {
        this.clearFocusVisible = startFocusVisible(this.el).destroy;
        this.loadTimeout = setTimeout(() => {
          this.ensureReadyIfVisible();
        }, 100);
      }
      disconnectedCallback() {
        if (this.clearFocusVisible) {
          this.clearFocusVisible();
          this.clearFocusVisible = void 0;
        }
        this.loadTimeoutCleanup();
      }
      initializeListeners() {
        this.initializeCalendarListener();
        this.initializeKeyboardListeners();
      }
      componentDidLoad() {
        const { el, intersectionTrackerRef } = this;
        const visibleCallback = (entries) => {
          const ev = entries[entries.length - 1];
          if (!ev.isIntersecting) {
            return;
          }
          this.markReady();
        };
        const visibleIO = new IntersectionObserver(visibleCallback, { threshold: 0.01, root: el });
        raf(() => visibleIO?.observe(intersectionTrackerRef));
        this.loadTimeoutCleanup();
        this.loadTimeout = setTimeout(() => {
          this.ensureReadyIfVisible();
        }, 100);
        const hiddenCallback = (entries) => {
          const ev = entries[entries.length - 1];
          if (ev.isIntersecting) {
            return;
          }
          if (this.hasLayoutBox()) {
            return;
          }
          this.destroyInteractionListeners();
          this.showMonthAndYear = false;
          writeTask(() => {
            this.el.classList.remove("datetime-ready");
          });
        };
        const hiddenIO = new IntersectionObserver(hiddenCallback, { threshold: 0, root: el });
        raf(() => hiddenIO?.observe(intersectionTrackerRef));
        const root = getElementRoot(this.el);
        root.addEventListener("ionFocus", (ev) => ev.stopPropagation());
        root.addEventListener("ionBlur", (ev) => ev.stopPropagation());
      }
      /**
       * When the presentation is changed, all calendar content is recreated,
       * so we need to re-init behavior with the new elements.
       */
      componentDidRender() {
        const { presentation, prevPresentation, calendarBodyRef, minParts, preferWheel, forceRenderDate } = this;
        const hasCalendarGrid = !preferWheel && ["date-time", "time-date", "date"].includes(presentation);
        if (minParts !== void 0 && hasCalendarGrid && calendarBodyRef) {
          const workingMonth = calendarBodyRef.querySelector(".calendar-month:nth-of-type(1)");
          if (workingMonth && forceRenderDate === void 0) {
            calendarBodyRef.scrollLeft = workingMonth.clientWidth * (isRTL(this.el) ? -1 : 1);
          }
        }
        if (prevPresentation === null) {
          this.prevPresentation = presentation;
          return;
        }
        if (presentation === prevPresentation) {
          return;
        }
        this.prevPresentation = presentation;
        this.destroyInteractionListeners();
        this.initializeListeners();
        this.showMonthAndYear = false;
        raf(() => {
          this.ionRender.emit();
        });
      }
      componentWillLoad() {
        const { el, formatOptions, highlightedDates, multiple, presentation, preferWheel } = this;
        if (multiple) {
          if (presentation !== "date") {
            printIonWarning('[ion-datetime] - Multiple date selection is only supported for presentation="date".', el);
          }
          if (preferWheel) {
            printIonWarning('[ion-datetime] - Multiple date selection is not supported with preferWheel="true".', el);
          }
        }
        if (highlightedDates !== void 0) {
          if (presentation !== "date" && presentation !== "date-time" && presentation !== "time-date") {
            printIonWarning("[ion-datetime] - The highlightedDates property is only supported with the date, date-time, and time-date presentations.", el);
          }
          if (preferWheel) {
            printIonWarning('[ion-datetime] - The highlightedDates property is not supported with preferWheel="true".', el);
          }
        }
        if (formatOptions) {
          checkForPresentationFormatMismatch(el, presentation, formatOptions);
          warnIfTimeZoneProvided(el, formatOptions);
        }
        const hourValues = this.parsedHourValues = convertToArrayOfNumbers(this.hourValues);
        const minuteValues = this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues);
        const monthValues = this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues);
        const yearValues = this.parsedYearValues = convertToArrayOfNumbers(this.yearValues);
        const dayValues = this.parsedDayValues = convertToArrayOfNumbers(this.dayValues);
        const todayParts = this.todayParts = parseDate(getToday());
        this.processMinParts();
        this.processMaxParts();
        this.defaultParts = getClosestValidDate({
          refParts: todayParts,
          monthValues,
          dayValues,
          yearValues,
          hourValues,
          minuteValues,
          minParts: this.minParts,
          maxParts: this.maxParts
        });
        this.processValue(this.value);
        this.emitStyle();
      }
      emitStyle() {
        this.ionStyle.emit({
          interactive: true,
          datetime: true,
          "interactive-disabled": this.disabled
        });
      }
      /**
       * Universal render methods
       * These are pieces of datetime that
       * are rendered independently of presentation.
       */
      renderFooter() {
        const { disabled, readonly, showDefaultButtons, showClearButton } = this;
        const isButtonDisabled = disabled || readonly;
        const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
        if (!hasSlottedButtons && !showDefaultButtons && !showClearButton) {
          return;
        }
        const clearButtonClick = () => {
          this.reset();
          this.setValue(void 0);
        };
        return h("div", { class: "datetime-footer" }, h("div", { class: "datetime-buttons" }, h("div", { class: {
          ["datetime-action-buttons"]: true,
          ["has-clear-button"]: this.showClearButton
        } }, h("slot", { name: "buttons" }, h("ion-buttons", null, showDefaultButtons && h("ion-button", { id: "cancel-button", color: this.color, onClick: () => this.cancel(true), disabled: isButtonDisabled }, this.cancelText), h("div", { class: "datetime-action-buttons-container" }, showClearButton && h("ion-button", { id: "clear-button", color: this.color, onClick: () => clearButtonClick(), disabled: isButtonDisabled }, this.clearText), showDefaultButtons && h("ion-button", { id: "confirm-button", color: this.color, onClick: () => this.confirm(true), disabled: isButtonDisabled }, this.doneText)))))));
      }
      /**
       * Wheel picker render methods
       */
      renderWheelPicker(forcePresentation = this.presentation) {
        const renderArray = forcePresentation === "time-date" ? [this.renderTimePickerColumns(forcePresentation), this.renderDatePickerColumns(forcePresentation)] : [this.renderDatePickerColumns(forcePresentation), this.renderTimePickerColumns(forcePresentation)];
        return h("ion-picker", { class: FOCUS_TRAP_DISABLE_CLASS }, renderArray);
      }
      renderDatePickerColumns(forcePresentation) {
        return forcePresentation === "date-time" || forcePresentation === "time-date" ? this.renderCombinedDatePickerColumn() : this.renderIndividualDatePickerColumns(forcePresentation);
      }
      renderCombinedDatePickerColumn() {
        const { defaultParts, disabled, workingParts, locale, minParts, maxParts, todayParts, isDateEnabled } = this;
        const monthsToRender = generateMonths(workingParts);
        const lastMonth = monthsToRender[monthsToRender.length - 1];
        monthsToRender[0].day = 1;
        lastMonth.day = getNumDaysInMonth(lastMonth.month, lastMonth.year);
        const min = minParts !== void 0 && isAfter(minParts, monthsToRender[0]) ? minParts : monthsToRender[0];
        const max = maxParts !== void 0 && isBefore(maxParts, lastMonth) ? maxParts : lastMonth;
        const result = getCombinedDateColumnData(locale, todayParts, min, max, this.parsedDayValues, this.parsedMonthValues);
        let items = result.items;
        const parts = result.parts;
        if (isDateEnabled) {
          items = items.map((itemObject, index) => {
            const referenceParts = parts[index];
            let disabled2;
            try {
              disabled2 = !isDateEnabled(convertDataToISO(referenceParts));
            } catch (e) {
              printIonError("[ion-datetime] - Exception thrown from provided `isDateEnabled` function. Please check your function and try again.", e);
            }
            return __spreadProps(__spreadValues({}, itemObject), {
              disabled: disabled2
            });
          });
        }
        const todayString = workingParts.day !== null ? `${workingParts.year}-${workingParts.month}-${workingParts.day}` : `${defaultParts.year}-${defaultParts.month}-${defaultParts.day}`;
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a date", class: "date-column", color: this.color, disabled, value: todayString, onIonChange: (ev) => {
          const { value } = ev.detail;
          const findPart = parts.find(({ month, day, year }) => value === `${year}-${month}-${day}`);
          const activePart = this.getActivePartsWithFallback();
          this.setWorkingParts(__spreadValues(__spreadValues({}, this.workingParts), findPart));
          this.setActiveParts(__spreadValues(__spreadValues({}, activePart), findPart));
          ev.stopPropagation();
        } }, items.map((item) => h("ion-picker-column-option", { color: this.color, part: item.value === todayString ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: item.value, disabled: item.disabled, value: item.value }, item.text)));
      }
      renderIndividualDatePickerColumns(forcePresentation) {
        const { workingParts, isDateEnabled } = this;
        const shouldRenderMonths = forcePresentation !== "year" && forcePresentation !== "time";
        const months = shouldRenderMonths ? getMonthColumnData(this.locale, workingParts, this.minParts, this.maxParts, this.parsedMonthValues) : [];
        const shouldRenderDays = forcePresentation === "date";
        let days = shouldRenderDays ? getDayColumnData(this.locale, workingParts, this.minParts, this.maxParts, this.parsedDayValues) : [];
        if (isDateEnabled) {
          days = days.map((dayObject) => {
            const { value } = dayObject;
            const valueNum = typeof value === "string" ? parseInt(value) : value;
            const referenceParts = {
              month: workingParts.month,
              day: valueNum,
              year: workingParts.year
            };
            let disabled;
            try {
              disabled = !isDateEnabled(convertDataToISO(referenceParts));
            } catch (e) {
              printIonError("[ion-datetime] - Exception thrown from provided `isDateEnabled` function. Please check your function and try again.", e);
            }
            return __spreadProps(__spreadValues({}, dayObject), {
              disabled
            });
          });
        }
        const shouldRenderYears = forcePresentation !== "month" && forcePresentation !== "time";
        const years = shouldRenderYears ? getYearColumnData(this.locale, this.defaultParts, this.minParts, this.maxParts, this.parsedYearValues) : [];
        const showMonthFirst = isMonthFirstLocale(this.locale, { month: "numeric", day: "numeric" });
        let renderArray = [];
        if (showMonthFirst) {
          renderArray = [
            this.renderMonthPickerColumn(months),
            this.renderDayPickerColumn(days),
            this.renderYearPickerColumn(years)
          ];
        } else {
          renderArray = [
            this.renderDayPickerColumn(days),
            this.renderMonthPickerColumn(months),
            this.renderYearPickerColumn(years)
          ];
        }
        return renderArray;
      }
      renderDayPickerColumn(days) {
        if (days.length === 0) {
          return [];
        }
        const { disabled, workingParts } = this;
        const pickerColumnValue = (workingParts.day !== null ? workingParts.day : this.defaultParts.day) ?? void 0;
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a day", class: "day-column", color: this.color, disabled, value: pickerColumnValue, onIonChange: (ev) => {
          const activePart = this.getActivePartsWithFallback();
          this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
            day: ev.detail.value
          }));
          this.setActiveParts(__spreadProps(__spreadValues({}, activePart), {
            day: ev.detail.value
          }));
          ev.stopPropagation();
        } }, days.map((day) => h("ion-picker-column-option", { color: this.color, part: day.value === pickerColumnValue ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: day.value, disabled: day.disabled, value: day.value }, day.text)));
      }
      renderMonthPickerColumn(months) {
        if (months.length === 0) {
          return [];
        }
        const { disabled, workingParts } = this;
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a month", class: "month-column", color: this.color, disabled, value: workingParts.month, onIonChange: (ev) => {
          const activePart = this.getActivePartsWithFallback();
          this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
            month: ev.detail.value
          }));
          if (!this.multiple) {
            this.setActiveParts(__spreadProps(__spreadValues({}, activePart), {
              month: ev.detail.value
            }));
          }
          ev.stopPropagation();
        } }, months.map((month) => h("ion-picker-column-option", { color: this.color, part: month.value === workingParts.month ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: month.value, disabled: month.disabled, value: month.value }, month.text)));
      }
      renderYearPickerColumn(years) {
        if (years.length === 0) {
          return [];
        }
        const { disabled, workingParts } = this;
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a year", class: "year-column", color: this.color, disabled, value: workingParts.year, onIonChange: (ev) => {
          const activePart = this.getActivePartsWithFallback();
          this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
            year: ev.detail.value
          }));
          if (!this.multiple) {
            this.setActiveParts(__spreadProps(__spreadValues({}, activePart), {
              year: ev.detail.value
            }));
          }
          ev.stopPropagation();
        } }, years.map((year) => h("ion-picker-column-option", { color: this.color, part: year.value === workingParts.year ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: year.value, disabled: year.disabled, value: year.value }, year.text)));
      }
      renderTimePickerColumns(forcePresentation) {
        if (["date", "month", "month-year", "year"].includes(forcePresentation)) {
          return [];
        }
        const activePart = this.getActivePart();
        const userHasSelectedDate = activePart !== void 0;
        const { hoursData, minutesData, dayPeriodData } = getTimeColumnsData(this.locale, this.workingParts, this.hourCycle, userHasSelectedDate ? this.minParts : void 0, userHasSelectedDate ? this.maxParts : void 0, this.parsedHourValues, this.parsedMinuteValues);
        return [
          this.renderHourPickerColumn(hoursData),
          this.renderMinutePickerColumn(minutesData),
          this.renderDayPeriodPickerColumn(dayPeriodData)
        ];
      }
      renderHourPickerColumn(hoursData) {
        const { disabled } = this;
        if (hoursData.length === 0)
          return [];
        const activePart = this.getActivePartsWithFallback();
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select an hour", color: this.color, disabled, value: activePart.hour, numericInput: true, onIonChange: (ev) => {
          this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
            hour: ev.detail.value
          }));
          this.setActiveParts(__spreadProps(__spreadValues({}, this.getActivePartsWithFallback()), {
            hour: ev.detail.value
          }));
          ev.stopPropagation();
        } }, hoursData.map((hour) => h("ion-picker-column-option", { color: this.color, part: hour.value === activePart.hour ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: hour.value, disabled: hour.disabled, value: hour.value }, hour.text)));
      }
      renderMinutePickerColumn(minutesData) {
        const { disabled } = this;
        if (minutesData.length === 0)
          return [];
        const activePart = this.getActivePartsWithFallback();
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a minute", color: this.color, disabled, value: activePart.minute, numericInput: true, onIonChange: (ev) => {
          this.setWorkingParts(__spreadProps(__spreadValues({}, this.workingParts), {
            minute: ev.detail.value
          }));
          this.setActiveParts(__spreadProps(__spreadValues({}, this.getActivePartsWithFallback()), {
            minute: ev.detail.value
          }));
          ev.stopPropagation();
        } }, minutesData.map((minute) => h("ion-picker-column-option", { color: this.color, part: minute.value === activePart.minute ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: minute.value, disabled: minute.disabled, value: minute.value }, minute.text)));
      }
      renderDayPeriodPickerColumn(dayPeriodData) {
        const { disabled } = this;
        if (dayPeriodData.length === 0) {
          return [];
        }
        const activePart = this.getActivePartsWithFallback();
        const isDayPeriodRTL = isLocaleDayPeriodRTL(this.locale);
        return h("ion-picker-column", { part: WHEEL_PART, "aria-label": "Select a day period", style: isDayPeriodRTL ? { order: "-1" } : {}, color: this.color, disabled, value: activePart.ampm, onIonChange: (ev) => {
          const currentParts = this.workingParts;
          const hour = calculateHourFromAMPM(currentParts, ev.detail.value);
          this.setWorkingParts(__spreadProps(__spreadValues({}, currentParts), {
            ampm: ev.detail.value,
            hour
          }));
          this.setActiveParts(__spreadProps(__spreadValues({}, this.getActivePartsWithFallback()), {
            ampm: ev.detail.value,
            hour
          }));
          ev.stopPropagation();
        } }, dayPeriodData.map((dayPeriod) => h("ion-picker-column-option", { color: this.color, part: dayPeriod.value === activePart.ampm ? `${WHEEL_ITEM_PART} ${WHEEL_ITEM_ACTIVE_PART}` : WHEEL_ITEM_PART, key: dayPeriod.value, disabled: dayPeriod.disabled, value: dayPeriod.value }, dayPeriod.text)));
      }
      renderWheelView(forcePresentation) {
        const { locale } = this;
        const showMonthFirst = isMonthFirstLocale(locale);
        const columnOrder = showMonthFirst ? "month-first" : "year-first";
        return h("div", { class: {
          [`wheel-order-${columnOrder}`]: true
        } }, this.renderWheelPicker(forcePresentation));
      }
      /**
       * Grid Render Methods
       */
      renderCalendarHeader(mode) {
        const { disabled } = this;
        const expandedIcon = mode === "ios" ? chevronDown : caretUpSharp;
        const collapsedIcon = mode === "ios" ? chevronForward : caretDownSharp;
        const prevMonthDisabled = disabled || isPrevMonthDisabled(this.workingParts, this.minParts, this.maxParts);
        const nextMonthDisabled = disabled || isNextMonthDisabled(this.workingParts, this.maxParts);
        const hostDir = this.el.getAttribute("dir") || void 0;
        return h("div", { class: "calendar-header", part: "calendar-header" }, h("div", { class: "calendar-action-buttons" }, h("div", { class: "calendar-month-year" }, h("button", { class: {
          "calendar-month-year-toggle": true,
          "ion-activatable": true,
          "ion-focusable": true
        }, part: "month-year-button", disabled, "aria-label": this.showMonthAndYear ? "Hide year picker" : "Show year picker", onClick: () => this.toggleMonthAndYearView() }, h("span", { id: "toggle-wrapper" }, getMonthAndYear(this.locale, this.workingParts), h("ion-icon", { "aria-hidden": "true", icon: this.showMonthAndYear ? expandedIcon : collapsedIcon, lazy: false, flipRtl: true })), mode === "md" && h("ion-ripple-effect", null))), h("div", { class: "calendar-next-prev" }, h("ion-buttons", null, h("ion-button", { "aria-label": "Previous month", disabled: prevMonthDisabled, onClick: () => this.prevMonth(), part: "navigation-button previous-button" }, h("ion-icon", { dir: hostDir, "aria-hidden": "true", slot: "icon-only", icon: chevronBack, lazy: false, flipRtl: true })), h("ion-button", { "aria-label": "Next month", disabled: nextMonthDisabled, onClick: () => this.nextMonth(), part: "navigation-button next-button" }, h("ion-icon", { dir: hostDir, "aria-hidden": "true", slot: "icon-only", icon: chevronForward, lazy: false, flipRtl: true }))))), h("div", { class: "calendar-days-of-week", "aria-hidden": "true", part: "calendar-days-of-week" }, getDaysOfWeek(this.locale, mode, this.firstDayOfWeek % 7).map((d) => {
          return h("div", { class: "day-of-week" }, d);
        })));
      }
      renderMonth(month, year) {
        const { disabled, readonly } = this;
        const yearAllowed = this.parsedYearValues === void 0 || this.parsedYearValues.includes(year);
        const monthAllowed = this.parsedMonthValues === void 0 || this.parsedMonthValues.includes(month);
        const isCalMonthDisabled = !yearAllowed || !monthAllowed;
        const isDatetimeDisabled = disabled || readonly;
        const swipeDisabled = disabled || isMonthDisabled({
          month,
          year,
          day: null
        }, {
          // The day is not used when checking if a month is disabled.
          // Users should be able to access the min or max month, even if the
          // min/max date is out of bounds (e.g. min is set to Feb 15, Feb should not be disabled).
          minParts: __spreadProps(__spreadValues({}, this.minParts), { day: null }),
          maxParts: __spreadProps(__spreadValues({}, this.maxParts), { day: null })
        });
        const isWorkingMonth = this.workingParts.month === month && this.workingParts.year === year;
        const activePart = this.getActivePartsWithFallback();
        return h("div", { "aria-hidden": !isWorkingMonth ? "true" : null, class: {
          "calendar-month": true,
          // Prevents scroll snap swipe gestures for months outside of the min/max bounds
          "calendar-month-disabled": !isWorkingMonth && swipeDisabled
        } }, h("div", { class: "calendar-month-grid" }, getDaysOfMonth(month, year, this.firstDayOfWeek % 7, this.showAdjacentDays).map((dateObject, index) => {
          const { day, dayOfWeek, isAdjacentDay } = dateObject;
          const { el, highlightedDates, isDateEnabled, multiple, showAdjacentDays } = this;
          let _month = month;
          let _year = year;
          if (showAdjacentDays && isAdjacentDay && day !== null) {
            if (day > 20) {
              if (month === 1) {
                _year = year - 1;
                _month = 12;
              } else {
                _month = month - 1;
              }
            } else if (day < 15) {
              if (month === 12) {
                _year = year + 1;
                _month = 1;
              } else {
                _month = month + 1;
              }
            }
          }
          const referenceParts = { month: _month, day, year: _year, isAdjacentDay };
          const isCalendarPadding = day === null;
          const { isActive, isToday, ariaLabel, ariaSelected, disabled: isDayDisabled2, text } = getCalendarDayState(this.locale, referenceParts, this.activeParts, this.todayParts, this.minParts, this.maxParts, this.parsedDayValues);
          const dateIsoString = convertDataToISO(referenceParts);
          let isCalDayDisabled = isCalMonthDisabled || isDayDisabled2;
          if (!isCalDayDisabled && isDateEnabled !== void 0) {
            try {
              isCalDayDisabled = !isDateEnabled(dateIsoString);
            } catch (e) {
              printIonError("[ion-datetime] - Exception thrown from provided `isDateEnabled` function. Please check your function and try again.", el, e);
            }
          }
          const isCalDayConstrained = isCalDayDisabled && isDatetimeDisabled;
          const isButtonDisabled = isCalDayDisabled || isDatetimeDisabled;
          let dateStyle = void 0;
          if (highlightedDates !== void 0 && !isActive && day !== null && !isAdjacentDay) {
            dateStyle = getHighlightStyles(highlightedDates, dateIsoString, el);
          }
          let dateParts = void 0;
          if (!isCalendarPadding && !isAdjacentDay) {
            dateParts = `calendar-day${isActive ? " active" : ""}${isToday ? " today" : ""}${isCalDayDisabled ? " disabled" : ""}`;
          } else if (isAdjacentDay) {
            dateParts = `calendar-day${isCalDayDisabled ? " disabled" : ""}`;
          }
          return h("div", { class: "calendar-day-wrapper" }, h("button", {
            // We need to use !important for the inline styles here because
            // otherwise the CSS shadow parts will override these styles.
            // See https://github.com/WICG/webcomponents/issues/847
            // Both the CSS shadow parts and highlightedDates styles are
            // provided by the developer, but highlightedDates styles should
            // always take priority.
            ref: (el2) => {
              if (el2) {
                el2.style.setProperty("color", `${dateStyle ? dateStyle.textColor : ""}`, "important");
                el2.style.setProperty("background-color", `${dateStyle ? dateStyle.backgroundColor : ""}`, "important");
                el2.style.setProperty("border", `${dateStyle ? dateStyle.border : ""}`, "important");
              }
            },
            tabindex: "-1",
            "data-day": day,
            "data-month": _month,
            "data-year": _year,
            "data-index": index,
            "data-day-of-week": dayOfWeek,
            disabled: isButtonDisabled,
            class: {
              "calendar-day-padding": isCalendarPadding,
              "calendar-day": true,
              "calendar-day-active": isActive,
              "calendar-day-constrained": isCalDayConstrained,
              "calendar-day-today": isToday,
              "calendar-day-adjacent-day": isAdjacentDay
            },
            part: dateParts,
            "aria-hidden": isCalendarPadding ? "true" : null,
            "aria-selected": ariaSelected,
            "aria-label": ariaLabel,
            onClick: () => {
              if (isCalendarPadding) {
                return;
              }
              if (isAdjacentDay) {
                this.el.blur();
                this.activeParts = __spreadValues(__spreadValues({}, activePart), referenceParts);
                this.animateToDate(referenceParts);
                this.confirm();
              } else {
                this.setWorkingParts(__spreadValues(__spreadValues({}, this.workingParts), referenceParts));
                if (multiple) {
                  this.setActiveParts(referenceParts, isActive);
                } else {
                  this.setActiveParts(__spreadValues(__spreadValues({}, activePart), referenceParts));
                }
              }
            }
          }, text));
        })));
      }
      renderCalendarBody() {
        return h("div", { class: "calendar-body ion-focusable", ref: (el) => this.calendarBodyRef = el, tabindex: "0" }, generateMonths(this.workingParts, this.forceRenderDate).map(({ month, year }) => {
          return this.renderMonth(month, year);
        }));
      }
      renderCalendar(mode) {
        return h("div", { class: "datetime-calendar", key: "datetime-calendar" }, this.renderCalendarHeader(mode), this.renderCalendarBody());
      }
      renderTimeLabel() {
        const hasSlottedTimeLabel = this.el.querySelector('[slot="time-label"]') !== null;
        if (!hasSlottedTimeLabel && !this.showDefaultTimeLabel) {
          return;
        }
        return h("slot", { name: "time-label" }, "Time");
      }
      renderTimeOverlay() {
        const { disabled, hourCycle, isTimePopoverOpen, locale, formatOptions } = this;
        const computedHourCycle = getHourCycle(locale, hourCycle);
        const activePart = this.getActivePartsWithFallback();
        return [
          h("div", { class: "time-header" }, this.renderTimeLabel()),
          h("button", { class: {
            "time-body": true,
            "time-body-active": isTimePopoverOpen
          }, part: `time-button${isTimePopoverOpen ? " active" : ""}`, "aria-expanded": "false", "aria-haspopup": "true", disabled, onClick: (ev) => __async(this, null, function* () {
            const { popoverRef } = this;
            if (popoverRef) {
              this.isTimePopoverOpen = true;
              popoverRef.present(new CustomEvent("ionShadowTarget", {
                detail: {
                  ionShadowTarget: ev.target
                }
              }));
              yield popoverRef.onWillDismiss();
              this.isTimePopoverOpen = false;
            }
          }) }, getLocalizedTime(locale, activePart, computedHourCycle, formatOptions?.time)),
          h("ion-popover", {
            alignment: "center",
            translucent: true,
            overlayIndex: 1,
            arrow: false,
            onWillPresent: (ev) => {
              const cols = ev.target.querySelectorAll("ion-picker-column");
              cols.forEach((col) => col.scrollActiveItemIntoView());
            },
            style: {
              "--offset-y": "-10px",
              "--min-width": "fit-content"
            },
            // Allow native browser keyboard events to support up/down/home/end key
            // navigation within the time picker.
            keyboardEvents: true,
            ref: (el) => this.popoverRef = el
          }, this.renderWheelPicker("time"))
        ];
      }
      getHeaderSelectedDateText() {
        const { activeParts, formatOptions, multiple, titleSelectedDatesFormatter } = this;
        const isArray = Array.isArray(activeParts);
        let headerText;
        if (multiple && isArray && activeParts.length !== 1) {
          headerText = `${activeParts.length} days`;
          if (titleSelectedDatesFormatter !== void 0) {
            try {
              headerText = titleSelectedDatesFormatter(convertDataToISO(activeParts));
            } catch (e) {
              printIonError("[ion-datetime] - Exception in provided `titleSelectedDatesFormatter`:", e);
            }
          }
        } else {
          headerText = getLocalizedDateTime(this.locale, this.getActivePartsWithFallback(), formatOptions?.date ?? { weekday: "short", month: "short", day: "numeric" });
        }
        return headerText;
      }
      renderHeader(showExpandedHeader = true) {
        const hasSlottedTitle = this.el.querySelector('[slot="title"]') !== null;
        if (!hasSlottedTitle && !this.showDefaultTitle) {
          return;
        }
        return h("div", { class: "datetime-header", part: "datetime-header" }, h("div", { class: "datetime-title", part: "datetime-title" }, h("slot", { name: "title" }, "Select Date")), showExpandedHeader && h("div", { class: "datetime-selected-date", part: "datetime-selected-date" }, this.getHeaderSelectedDateText()));
      }
      /**
       * Render time picker inside of datetime.
       * Do not pass color prop to segment on
       * iOS mode. MD segment has been customized and
       * should take on the color prop, but iOS
       * should just be the default segment.
       */
      renderTime() {
        const { presentation } = this;
        const timeOnlyPresentation = presentation === "time";
        return h("div", { class: "datetime-time" }, timeOnlyPresentation ? this.renderWheelPicker() : this.renderTimeOverlay());
      }
      /**
       * Renders the month/year picker that is
       * displayed on the calendar grid.
       * The .datetime-year class has additional
       * styles that let us show/hide the
       * picker when the user clicks on the
       * toggle in the calendar header.
       */
      renderCalendarViewMonthYearPicker() {
        return h("div", { class: "datetime-year" }, this.renderWheelView("month-year"));
      }
      /**
       * Render entry point
       * All presentation types are rendered from here.
       */
      renderDatetime(mode) {
        const { presentation, preferWheel } = this;
        const hasWheelVariant = presentation === "date" || presentation === "date-time" || presentation === "time-date";
        if (preferWheel && hasWheelVariant) {
          return [this.renderHeader(false), this.renderWheelView(), this.renderFooter()];
        }
        switch (presentation) {
          case "date-time":
            return [
              this.renderHeader(),
              this.renderCalendar(mode),
              this.renderCalendarViewMonthYearPicker(),
              this.renderTime(),
              this.renderFooter()
            ];
          case "time-date":
            return [
              this.renderHeader(),
              this.renderTime(),
              this.renderCalendar(mode),
              this.renderCalendarViewMonthYearPicker(),
              this.renderFooter()
            ];
          case "time":
            return [this.renderHeader(false), this.renderTime(), this.renderFooter()];
          case "month":
          case "month-year":
          case "year":
            return [this.renderHeader(false), this.renderWheelView(), this.renderFooter()];
          default:
            return [
              this.renderHeader(),
              this.renderCalendar(mode),
              this.renderCalendarViewMonthYearPicker(),
              this.renderFooter()
            ];
        }
      }
      render() {
        const { name, value, disabled, el, color, readonly, showMonthAndYear, preferWheel, presentation, size, isGridStyle } = this;
        const mode = getIonMode(this);
        const isMonthAndYearPresentation = presentation === "year" || presentation === "month" || presentation === "month-year";
        const shouldShowMonthAndYear = showMonthAndYear || isMonthAndYearPresentation;
        const monthYearPickerOpen = showMonthAndYear && !isMonthAndYearPresentation;
        const hasDatePresentation = presentation === "date" || presentation === "date-time" || presentation === "time-date";
        const hasWheelVariant = hasDatePresentation && preferWheel;
        renderHiddenInput(true, el, name, formatValue(value), disabled);
        return h(Host, { key: "a9128b5c55464e30a269daf9d725bf430c8c655c", "aria-disabled": disabled ? "true" : null, onFocus: this.onFocus, onBlur: this.onBlur, class: __spreadValues({}, createColorClasses(color, {
          [mode]: true,
          ["datetime-readonly"]: readonly,
          ["datetime-disabled"]: disabled,
          "show-month-and-year": shouldShowMonthAndYear,
          "month-year-picker-open": monthYearPickerOpen,
          [`datetime-presentation-${presentation}`]: true,
          [`datetime-size-${size}`]: true,
          [`datetime-prefer-wheel`]: hasWheelVariant,
          [`datetime-grid`]: isGridStyle
        })) }, h("div", { key: "b49f3a98db2b7cf535d7ea894d518f75f8a1fefb", class: "intersection-tracker", ref: (el2) => this.intersectionTrackerRef = el2 }), this.renderDatetime(mode));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "formatOptions": [{
            "formatOptionsChanged": 0
          }],
          "disabled": [{
            "disabledChanged": 0
          }],
          "min": [{
            "minChanged": 0
          }],
          "max": [{
            "maxChanged": 0
          }],
          "presentation": [{
            "presentationChanged": 0
          }],
          "yearValues": [{
            "yearValuesChanged": 0
          }],
          "monthValues": [{
            "monthValuesChanged": 0
          }],
          "dayValues": [{
            "dayValuesChanged": 0
          }],
          "hourValues": [{
            "hourValuesChanged": 0
          }],
          "minuteValues": [{
            "minuteValuesChanged": 0
          }],
          "value": [{
            "valueChanged": 0
          }]
        };
      }
    };
    datetimeIds = 0;
    CANCEL_ROLE = "datetime-cancel";
    CONFIRM_ROLE = "datetime-confirm";
    WHEEL_PART = "wheel";
    WHEEL_ITEM_PART = "wheel-item";
    WHEEL_ITEM_ACTIVE_PART = `active`;
    Datetime.style = {
      ios: datetimeIosCss(),
      md: datetimeMdCss()
    };
  }
});
init_ion_datetime_entry();
export {
  Datetime as ion_datetime
};
//# debugId=427572ad-dd50-5872-ab09-d1586a669b21
//# sourceMappingURL=chunk-CSPKQXWO.js.map
