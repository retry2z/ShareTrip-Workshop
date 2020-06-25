module.exports = class Cube {
    constructor(data) {
        this.init(data);
    }

    init(data) {
        if (!!data === false) {
            throw new TypeError('All fields are repaired');
        }

        for (const key in data) {
            this['_' + key] = data[key];
        }
    }

    set _name(data) {
        const patternLength = /^.{5,20}$/g;
        if (!patternLength.test(data)) {
            throw new TypeError('Name must be between 5 and 20 characters long');
        }

        const pattern = /^[a-zA-Z\s]+$/g;
        if (pattern.test(data)) {
            this.name = data;
        } else {
            throw new TypeError('Name must contain only Latin characters');
        }
    }

    set _imageUrl(data) {
        const pattern = /^(http|https):/g;
        if (pattern.test(data)) {
            this.imageUrl = data;
        } else {
            throw new TypeError('Invalid url');
        }
    }

    set _description(data) {
        const patternLength = /^.{20,}$/g;
        if (!patternLength.test(data)) {
            throw new TypeError('Description must be at least 20 characters long');
        }

        const pattern = /^[a-zA-Z0-9\s]+$/g;
        if (pattern.test(data)) {
            this.description = data;
        } else {
            throw new TypeError('Description must contain only Latin characters and digits');
        }
    }

    set _difficultyLevel(data) {
        const pattern = /^[1-6]$/g;
        if (pattern.test(data)) {
            this.difficultyLevel = data;
        } else {
            throw new TypeError('Difficulty level must be between 1 and 6');
        }
    }
}