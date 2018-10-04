let mongoose =require('mongoose');

const server = 'localhost:27017';
const database = 'toDoDb';

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
        .then(()=> {
            console.log('database connection successful')
        })
        .catch(err => {
            console.error('database connection error')
        })
    }
}
module.exports = new Database()