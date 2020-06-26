const productService = require('./product-service');
const search = require('../utils/search');

module.exports = {
    home: {
        async get(request, response) {
            try {
                const list = await productService.list();
                const data = {
                    cubes: list,
                    user: !!request.user,
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

        async post(request, response) {
            try {
                const list = await productService.list();
                const data = {
                    cubes: search(list, request.body),
                    user: !!request.user,
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
        }
    },

    about: {
        async get(request, response) {
            try {
                const data = {
                    user: !!request.user,
                }
                response.render('about', data);
                return 1
            }
            catch (err) {
                if (err.name === 'URIError') {
                    console.error(err.message);
                }
                return 0
            }
        }
    },

    notFound: {
        async get(request, response) {
            const data = {
                user: !!request.user,
            }
            response.render('404', data);
            return 1
        }
    }
}