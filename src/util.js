// "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
export function dateToDayDateString(dateValue, utc = true) {
    return formatDate(dateValue, "YYYY.MM.DD", utc);
}

// "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
export function dateToDayDateTimeString(dateValue, utc = true) {
    return formatDate(dateValue, "YYYY.MM.DD HH:mm:SS", utc) + (utc ? "Z" : "");
}

/**
 * Formats date. Supports: YY.YYYY.MM.DD HH:mm:SS.
 * Default format: "YYYY.MM.DD". formatDate() -> "2022.01.07"
 * @param {Date|String|Number?} dateValue
 * @param {String?} pattern
 * @param {Boolean?} utc
 * @return {string}
 */
export function formatDate(dateValue = new Date(), pattern = "YYYY.MM.DD", utc = true) {
    function isString(input) {
        return typeof input === "string" || input instanceof String;
    }
    function firefoxDateFix(dateValue) {
        return isString(dateValue) ? dateValue.replace(/(?<y>\d{4})\.(?<m>\d{2})\.(?<d>\d{2})/, "$<y>-$<m>-$<d>") : dateValue;
    }
    function pad0(value, count = 2) {
        return value.toString().padStart(count, "0");
    }
    class DateFormatter {
        constructor(date = new Date(), utc = true) {
            this.date = date;
            this.utc = utc ? "UTC" : "";
        }
        get SS()   {return pad0(this.date[`get${this.utc}Seconds`]())}
        get mm()   {return pad0(this.date[`get${this.utc}Minutes`]())}
        get HH()   {return pad0(this.date[`get${this.utc}Hours`]())}

        get MM()   {return pad0(this.date[`get${this.utc}Month`]() + 1)}
        get DD()   {return pad0(this.date[`get${this.utc}Date`]())}
        get YYYY() {return pad0(this.date[`get${this.utc}FullYear`](), 4)}
        get YY()   {return this.YYYY.slice(2);}
    }
    dateValue = firefoxDateFix(dateValue);
    const date = new Date(dateValue);
    if (date.toString() === "Invalid Date") {
        console.warn("Invalid Date value: ", dateValue);
    }
    const formatter = new DateFormatter(date, utc);
    return pattern.replaceAll(/YYYY|YY|MM|DD|HH|mm|SS/g, (...args) => formatter[args[0]]);
}


/**
 * Formats bytes mostly like Windows does,
 * but in some rare cases the result is different.
 * Check the file with tests.
 * @see win-like-file-sizes.test.js
 * @param {Number} bytes
 * @return {string}
 */
export function bytesToSizeWinLike(bytes) {
    if (bytes < 1024) { return bytes + " B"; }
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    let result = bytes / Math.pow(1024, i);
    if (result >= 1000) {
        i++;
        result /= 1024;
    }
    return toTruncPrecision3(result) + " " + sizes[i];
}

/**
 * @param {Number} number
 * @return {string}
 */
export function toTruncPrecision3(number) {
    let result;
    if (number < 10) {
        result = Math.trunc(number * 100) / 100;
    } else if (number < 100) {
        result = Math.trunc(number * 10) / 10;
    } else if (number < 1000) {
        result = Math.trunc(number);
    }
    if (number < 0.1) {
        return result.toPrecision(1);
    } else if (number < 1) {
        return result.toPrecision(2);
    }
    return result.toPrecision(3);
}
