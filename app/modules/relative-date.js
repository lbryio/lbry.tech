"use strict";



//  P R O G R A M

const relativeDate = (undefined => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const YEAR = DAY * 365;
  const MONTH = YEAR / 12;

  const formats = [
    [ 0.7 * MINUTE, "just now" ],
    [ 1.5 * MINUTE, "a minute ago" ],
    [ 60 * MINUTE, "minutes ago", MINUTE ],
    [ 1.5 * HOUR, "an hour ago" ],
    [ DAY, "hours ago", HOUR ],
    [ 2 * DAY, "yesterday" ],
    [ 7 * DAY, "days ago", DAY ],
    [ 1.5 * WEEK, "a week ago" ],
    [ MONTH, "weeks ago", WEEK ],
    [ 1.5 * MONTH, "a month ago" ],
    [ YEAR, "months ago", MONTH ],
    [ 1.5 * YEAR, "a year ago" ],
    [ Number.MAX_VALUE, "years ago", YEAR ]
  ];

  function relativeDate(input, reference) {
    !reference && (reference = (new Date).getTime());
    reference instanceof Date && (reference = reference.getTime());
    input instanceof Date && (input = input.getTime());

    const delta = reference - input;
    const len = formats.length;

    for (let i = -1; ++i < len;) {
      const format = formats[i];

      if (delta < format[0]) {
        return format[2] === undefined ? format[1] : Math.round(delta / format[2]) + " " + format[1];
      }
    }
  }

  return relativeDate;
})();



//  E X P O R T

if (typeof module !== "undefined" && module.exports) {
  module.exports = exports = relativeDate;
}
