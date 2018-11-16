import * as Sequalise from 'sequelize';

const db = new Sequalise('çonduitDatabase', 'conduitadmin', 'Ankita', {
    dialect: 'sqlite',
    storage: __dirname + '/conduit.db'    
});

db.sync()
    .then(() => {
        console.log("Database Synchronised");
    })
    .catch((err) => {
        console.log("Error setting up Database");
        console.error(err);
    });

module.exports = db;

