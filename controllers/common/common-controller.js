module.exports = {
    home: {
        async get(request, response) {
            try {
                const data = {
                    user: request.user,
                }

                response.render('index', data);
                return 1
            }
            catch (err) {
                if (err.name === 'URIError') {
                    console.error(err.message);
                }
                return 0
            }
        },
    },

    notFound: {
        async get(request, response) {
            const data = {
                user: request.user,
            }
            response.render('404', data);
            return 1
        }
    }
}