const { authService } = require('./auth-service');

module.exports = {
    // Create new user
    register: {
        async get(request, response) {
            try {
                const data = {
                    user: !!request.user,
                }
                response.render('authRegister', data);
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
                return await authService.register(request.body);
            }
            catch (err) {
                if (err.name === 'TypeError') {
                    const data = {
                        user: !!request.user,
                        error: err.message,
                    }
                    response.render('authRegister', data);
                    return -1
                }
                if (err.name === 'URIError') {
                    console.error(err);
                }
                return 0
            }
        }
    },

    // Authenticate user 
    login: {
        async get(request, response) {
            try {
                const data = {
                    user: !!request.user,
                }
                response.render('authLogin', data);
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
                return await authService.login(request.body);
            }
            catch (err) {
                if (err.name === 'TypeError') {
                    const data = {
                        user: !!request.user,
                        error: err.message,
                    }
                    response.render('authLogin', data);
                    return -1
                }
                if (err.name === 'URIError') {
                    console.error(err);
                }
                return 0
            }
        }
    },

    // Clear user credentials
    logout: {
        async get(request, response) {
            try {

            }
            catch (err) {
                console.error(err);
            }
        },
    }
};