//Write here the common DB CRUD functionality.

class Repository {
    constructor(collection) {
        this.collection = collection;
    }

    async add(data) {
        try {
            const product = new this.collection(data);
            return await product.save();
        }
        catch (err) {
            throw new URIError('Could not store the product.' + err.message);
        }
    }

    async remove(id) {
        try {
            return await this.collection.deleteOne({ _id: id });
        }
        catch (err) {
            throw new URIError('Could not remove the product.' + err.message);
        }
    }

    async list() {
        try {
            return await this.collection.find().lean();
        }
        catch (err) {
            throw new URIError('Could not store the product.' + err.message);
        }
    }

    async details(id) {
        try {
            return await this.collection.findById(id).lean();
        }
        catch (err) {
            throw new URIError('Could not get details about the product.' + err.message);
        }
    }

    async edit(id, data) {
        try {
            return await this.collection.updateOne({ _id: id }, data);
        }
        catch (err) {
            throw new URIError('Could not update information for the product.' + err.message);
        }
    }

    async addSet(id, relationship, data) {
        try {
            return await this.collection.updateOne({ _id: id }, { $addToSet: { [relationship]: data } });
        }
        catch (err) {
            throw new URIError('Could not add item to the relationship array' + err.message);
        }
    }

    async removeSet(id, relationship, data) {
        try {
            return await this.collection.updateOne({ _id: id }, { $addToSet: { [relationship]: data } });
        }
        catch (err) {
            throw new URIError('Could not remove item to the relationship array' + err.message);
        }
    }
}

module.exports = Repository;