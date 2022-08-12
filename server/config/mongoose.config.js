const mongoose = require('mongoose');
const db_name = 'travel_memories'

module.exports = (db_name) => {
    mongoose
        .connect('mongodb://localhost/' + db_name, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Established a connection to the database'))
        .catch((err) => console.log('Something went wrong when connecting to the database ', err));
}