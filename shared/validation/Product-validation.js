module.exports = class Cube {
    constructor(data) {
        this.init(data);
    }

    init(data) {
        if (!!data === false) {
            throw new TypeError('Invalid input data.');
        }

        for (const key in data) {
            this['_' + key] = data[key].trim();
        }
    }

    set _startAndEndPoint(data) {
        const [start, end] = data.trim().split(' - ');

        if (!data.includes(' - ')) {
            throw new TypeError(`Invalid start - end format`);

        }

        if (start.length < 5) {
            throw new TypeError(`${start} should be at least 4 letters long and only latin letters`);
        }

        if (end.length < 5) {
            throw new TypeError(`${end} should be at least 4 letters long and only latin letters`);
        }

        const pattern = /^([A-Za-z]{4,}) - ([A-Za-z\s]{4,})$/g;
        if (pattern.test(data)) {
            this.start = start;
            this.end = end;
        } else {
            throw new TypeError('Invalid start - end format');
        }
    }

    set _dateTime(data) {
        const [date, time] = data.trim().split(' - ');

        if (!data.includes(' - ')) {
            throw new TypeError(`Invalid date - time format`);
        }

        if (date.length < 7) {
            throw new TypeError(`Date should be at least 6 letters long and only latin letters`);
        }

        if (time.length < 5) {
            throw new TypeError(`Time should be at least 5 letters long and only latin letters`);
        }

        const pattern = /^([A-Za-z0-9\s]{6,}) - ([A-Za-z0-9\s:]{5,})$/g;
        if (pattern.test(data)) {
            this.date = date;
            this.time = time;
        } else {
            throw new TypeError('Invalid date - time format');
        }
    }

    set _carImage(data) {
        const pattern = /^(http|https):/g;
        if (pattern.test(data)) {
            this.carImage = data;
        } else {
            throw new TypeError('Invalid url address.');
        }
    }

    set _description(data) {
        const patternLength = /^.{10,}$/g;
        if (!patternLength.test(data)) {
            throw new TypeError('Description must be at least 10 characters long');
        }

        this.description = data;
    }

    set _seats(data) {
        if (+data >= 1) {
            this.seats = data;
        } else {
            throw new TypeError('The enter number should be more than 0');
        }
    }
}