const productService = require('./product-service');
const ProductValidation = require('../../shared/validation/Product-validation');
const userService = require('../user/user-service');

const errorHandler = (err, request, response, page, input) => {
    if (err.name === 'TypeError') {
        const data = {
            item: input ? input : false,
            user: request.user,
            error: err.message,
        }
        response.render(page, data);
        return -1
    }
    if (err.name === 'URIError') {
        console.error(err);
    }
    return 0
}

module.exports = {
    // Create new cube
    create: {
        async get(request, response) {
            const data = {
                user: request.user,
            };
            response.render('productCreate', data);
            return 1
        },
        async post(request, response) {
            try {
                const item = new ProductValidation(request.body);
                const temp = await productService.add({ ...item, author: request.user.uid });
                await request.user.addSet('author', temp._id);
                return 1
            }
            catch (err) {
                return errorHandler(err, request, response, 'productCreate');
            }
        }
    },

    // Details about cube
    details: {
        async get(request, response) {
            try {
                const productDetails = await productService.details(request.params.id);
                const owner = productDetails.author.toString() === request.user.uid.toString();
                const author = userService.details(request.uid);

                console.log(author);

                const data = {
                    item: productDetails,
                    user: request.user,
                    owner,
                }
                response.render('productDetails', data);
                return 1
            }
            catch (err) {
                return errorHandler(err, request, response, 'productDetails');
            }
        }
    },

    // List all cubes
    list: {
        async get(request, response) {
            const list = await productService.list();
            const data = {
                user: request.user,
                list,
            };
            response.render('productList', data);
            return 1
        },
    },

    // Edit cube data
    edit: {
        async get(request, response) {
            try {
                const productDetails = await productService.details(request.params.id);
                const owner = productDetails.author.toString() === request.user.uid.toString();

                if (!owner) {
                    return 0
                }

                const data = {
                    item: productDetails,
                    user: request.user,
                }
                response.render('productEdit', data);
                return 1
            }
            catch (err) {
                return errorHandler(err, request, response, 'productEdit');
            }
        },
        async post(request, response) {
            try {
                const productDetails = await productService.details(request.params.id);
                const owner = productDetails.author.toString() === request.user.uid.toString();

                if (!owner) {
                    return 0
                }

                const item = new ProductValidation(request.body);
                await productService.edit(request.params.id, item);
                return 1
            }
            catch (err) {
                return errorHandler(err, request, response, 'productEdit', { ...request.body, _id: request.params.id });
            }
        }
    },

    //Delete cube from db
    delete: {
        async get(request, response) {
            try {
                const productDetails = await productService.details(request.params.id);
                const owner = productDetails.author.toString() === request.user.uid.toString();

                if (!owner) {
                    return 0
                }

                const data = {
                    item: productDetails,
                    user: request.user,
                }
                response.render('productDelete', data);
                return 1

            }
            catch (err) {
                return errorHandler(err, request, response, 'productDelete');
            }
        },
        async post(request, response) {
            try {
                const productDetails = await productService.details(request.params.id);
                const owner = productDetails.author.toString() === request.user.uid.toString();

                if (!owner) {
                    return 0
                }

                await productService.remove(request.params.id);
                await request.user.removeSet('cubes', request.params.id);
                return 1
            }
            catch (err) {
                return errorHandler(err, request, response, 'productDelete');
            }
        }
    },
};