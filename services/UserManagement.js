const user = require('../models/User');

class UserManagement {
    constructor(data) {
        if (data) {
            this.uid = data._id;
            this.name = data.name || '';
            this.imageUrl = data.imageUrl || '';
            this.email = data.email;
        }
        this.collection = user;
    }

    async add(data) {
        try {
            return await new this.collection(data).save()
        }
        catch (err) {
            throw new URIError('Could not create account.');
        }
    }

    async remove() {
        try {
            return await this.collection.deleteOne({ _id: this.uid });
        }
        catch (err) {
            throw new URIError('Could not remove account.');
        }
    }

    async details() {
        try {
            return await this.collection.findById(this.uid).lean();
        }
        catch (err) {
            throw new URIError('Could account you are looking for may be not exist.');
        }
    }

    async edit(data) {
        try {
            return await this.collection.updateOne({ _id: this.uid }, data);
        }
        catch (err) {
            throw new URIError('Could not update information of the account.');
        }
    }

    async addSet(relationship, data) {
        try {
            return await this.collection.updateOne({ _id: this.uid }, { $addToSet: { [relationship]: data } });
        }
        catch (err) {
            throw new URIError('Could not add item to relationship array.');
        }
    }

    async removeSet(relationship, data) {
        try {
            return await this.collection.updateOne({ _id: this.uid }, { $pull: { [relationship]: data } });
        }
        catch (err) {
            throw new URIError('Could not remove item from relationship array.');

        }
    }
}

module.exports = UserManagement;