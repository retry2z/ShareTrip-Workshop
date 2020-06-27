module.exports = (arr, data) => {
    return arr.filter(item => {
        const name = item.name.toLowerCase();
        const description = item.description.toLowerCase();
        const difficulty = +item.difficultyLevel;

        const search_data = data.search.toLowerCase() || '';
        const from_data = +data.from || Number.MIN_SAFE_INTEGER;
        const to_data = +data.to || Number.MAX_SAFE_INTEGER;

        if ((difficulty >= from_data && difficulty <= to_data) &&
            (name.includes(search_data))) {
            return item
        } else {
            return false
        }
    });
}