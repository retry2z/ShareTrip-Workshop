module.exports = (app, route, data) => {
    app.use(route, (request, response, next) => {

        if (!!request.user === data.isLogged) {
            return next()
        }

        return response.redirect('/')
    });
}

