module.exports = (err, response, page, data) => {
    const handler = {
        'TypeError': () => {
            response.render(page, {
                ...data,
                error: err.message,
            });
            return true
        },

        'URIError': () => {
            console.error(err.message);
            return false
        },
    }

    return handler[err.name]();
}