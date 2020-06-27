const { authService } = require('./auth-service');

module.exports = {
    // Create new user
    register: {
        async get(request, response) {
            try {
                const data = {
                    user: !!request.user,
                }
                return response.render('authRegister', data);
            }
            catch (err) {
                if (err.name === 'URIError') {
                    console.error(err.message);
                }
                return false
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
                    return response.render('authRegister', data);
                }
                if (err.name === 'URIError') {
                    console.error(err);
                }
                return false
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
                return response.render('authLogin', data);
            }
            catch (err) {
                if (err.name === 'URIError') {
                    console.error(err.message);
                }
                return false
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
                    return response.render('authLogin', data);
                }
                if (err.name === 'URIError') {
                    console.error(err);
                }
                return false
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